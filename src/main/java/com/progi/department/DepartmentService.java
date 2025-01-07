package com.progi.department;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import com.progi.user.UserService;
import com.progi.user.dto.UserDetailsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.progi.user.User;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private UserService userService;

    public List<DepartmentDTO> getAllDepartments() {
        return departmentRepository.findAll().stream()
                .map(department -> new DepartmentDTO(
                        department.getId(),
                        department.getName(),
                        userService.countUsersByDepartment(department.getId()))) // Delegate user-related logic to UserService
                .collect(Collectors.toList());
    }

    public Department getDepartmentById(Integer id) {
        return departmentRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Department not found with id " + id));
    }

    public List<UserDetailsDTO> getEmployeesByDepartmentId(Integer departmentId) {
        Department department = getDepartmentById(departmentId);

        return department.getUsers().stream()
                .map(UserDetailsDTO::new)  // Convert User entity to UserDetailsDTO
                .collect(Collectors.toList());
    }

    public Department createDepartment(Department department) {
            return departmentRepository.save(department);
    }


    public void deleteDepartment(Integer id) {
        Department department = getDepartmentById(id);

        if(!department.getUsers().isEmpty()) {
            throw new IllegalStateException("Cannot delete a department with employees.");
        }
        departmentRepository.delete(department);
    }


    public Department updateDepartmentName(Integer id, String name) {
        Department department = getDepartmentById(id);

        department.setName(name);

        return departmentRepository.save(department);
    }

    public void deleteEmployeeFromDepartment(Integer departmentId, Integer employeeId) {
        // Fetch the department by ID
        Department department = getDepartmentById(departmentId);

        // Find and validate the employee in the department
        User user = department.getUsers().stream()
                .filter(emp -> emp.getId().equals(employeeId))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Employee not found in the department"));

        department.getUsers().remove(user);

        departmentRepository.save(department);

        userService.deleteUser(employeeId);
    }



}
