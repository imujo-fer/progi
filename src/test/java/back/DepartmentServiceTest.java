package com.progi.department;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import com.progi.user.User;
import com.progi.user.UserService;
import org.hibernate.validator.internal.util.stereotypes.Lazy;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class DepartmentServiceTest {

    @Mock
    private DepartmentRepository departmentRepository;

    @Mock
    @Lazy
    private UserService userService;

    @InjectMocks
    private DepartmentService departmentService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    //creates two departments and checks if it correctly returns all departments
    //checks if it correctly returns number of employees for a department
    @Test
    void testGetAllDepartments() {
        // Arrange
        Department department1 = new Department();
        department1.setId(1);
        department1.setName("Finance");

        Department department2 = new Department();
        department2.setId(2);
        department2.setName("HR");

        List<Department> departments = List.of(department1, department2);

        when(departmentRepository.findAll()).thenReturn(departments);
        when(userService.countUsersByDepartment(anyInt())).thenReturn(5);

        // Act
        List<DepartmentDTO> result = departmentService.getAllDepartments();

        // Assert
        assertNotNull(result);
        assertEquals(2, result.size());
        assertEquals("Finance", result.get(0).getName());
        assertEquals(5, result.get(0).getEmployeeCount());
    }

    //checks if it successfully returns a department and
    @Test
    void testGetDepartmentById_Success() {
        // Arrange
        Department department = new Department();
        department.setId(1);
        department.setName("Finance");

        when(departmentRepository.findById(1)).thenReturn(Optional.of(department));

        // Act
        Department result = departmentService.getDepartmentById(1);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals("Finance", result.getName());
    }

    @Test
    //throws an exception when department doesn't exist
    void testGetDepartmentById_NotFound() {
        // Arrange
        when(departmentRepository.findById(1)).thenReturn(Optional.empty());

        // Act & Assert
        Exception exception = assertThrows(NoSuchElementException.class, () -> {
            departmentService.getDepartmentById(1);
        });
        assertEquals("Department not found with id 1", exception.getMessage());
    }

    //creates a department and tests if it was successfull
    //checks if the id is correct
    @Test
    void testCreateDepartment() {
        // Arrange
        CreateDepartmentDTO createDepartmentDTO = new CreateDepartmentDTO();
        createDepartmentDTO.setName("IT");

        Department department = new Department();
        department.setId(1);
        department.setName("IT");

        when(departmentRepository.save(any(Department.class))).thenReturn(department);

        // Act
        Department result = departmentService.createDepartment(createDepartmentDTO);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.getId());
        assertEquals("IT", result.getName());
    }

    //checks if it successfully deleted a userless department
    @Test
    void testDeleteDepartmentWithoutEmployees() {
        // Arrange
        Department department = new Department();
        department.setId(1);
        department.setUsers(new ArrayList<>());

        when(departmentRepository.findById(1)).thenReturn(Optional.of(department));
        doNothing().when(departmentRepository).delete(department);

        // Act
        departmentService.deleteDepartment(1);

        // Assert
        verify(departmentRepository, times(1)).delete(department);
    }

    //checks if it throws error when trying to delete a department with users in it
    @Test
    void testDeleteDepartmentWithEmployees() {
        // Arrange
        Department department = new Department();
        department.setId(1);

        User user = new User();
        user.setId(1);
        department.setUsers(List.of(user));

        when(departmentRepository.findById(1)).thenReturn(Optional.of(department));

        // Act & Assert
        Exception exception = assertThrows(IllegalStateException.class, () -> {
            departmentService.deleteDepartment(1);
        });
        assertEquals("Cannot delete a department with employees.", exception.getMessage());
    }

    //tests if name update works correctly
    @Test
    void testUpdateDepartmentName() {
        // Arrange
        Department department = new Department();
        department.setId(1);
        department.setName("Old Name");

        when(departmentRepository.findById(1)).thenReturn(Optional.of(department));
        when(departmentRepository.save(any(Department.class))).thenReturn(department);

        // Act
        Department result = departmentService.updateDepartmentName(1, "New Name");

        // Assert
        assertNotNull(result);
        assertEquals("New Name", result.getName());
    }
}
