package com.progi.department;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import com.progi.user.UserRepository;
import com.progi.user.dto.UserDetailsDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.progi.Enum.RoleType;
import com.progi.user.User;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private UserRepository userRepository;

    public List<DepartmentDTO> getAllDepartments() {
        return departmentRepository.findAll().stream()
                .map(department -> new DepartmentDTO(
                        department.getId(),
                        department.getName(),
                        department.getUsers().size()))
                .collect(Collectors.toList());
    }

    public Department getDepartmentById(Integer id) {
        return departmentRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Department not found with id " + id));
    }

    public List<UserDetailsDTO> getEmployeesByDepartmentId(Integer departmentId) {
        Department department = departmentRepository.findById(departmentId)
                .orElseThrow(() -> new IllegalStateException("Department not found with id " + departmentId));

        return department.getUsers().stream()
                .map(UserDetailsDTO::new)  // Convert User entity to UserDetailsDTO
                .collect(Collectors.toList());
    }

    public Department updateDepartment(Integer id, Department updateDepartment) {
        Department department = getDepartmentById(id);

        if(updateDepartment.getName() != null) {
            department.setName(updateDepartment.getName());
        }
        return departmentRepository.save(department);
    }

    public Department createDepartment(Department department) {
            return departmentRepository.save(department);
    }


    public void deleteEmployeeById(Integer employeeId) {
        // Fetch the user by ID
        User user = userRepository.findById(Long.valueOf(employeeId))
                .orElseThrow(() -> new NoSuchElementException("Employee not found with id " + employeeId));

        // Check if the user belongs to a department
        Department department = user.getDepartment();
        if (department == null) {
            throw new IllegalStateException("Employee does not belong to any department.");
        }

        // Remove the user from the department's user list (optional, depending on cascade settings)
        department.getUsers().remove(user);

        // Delete the user
        userRepository.delete(user);
    }


    public void deleteDepartment(Integer id) {
        Department department = getDepartmentById(id);

        if(!department.getUsers().isEmpty()) {
            throw new IllegalStateException("Cannot delete a department with employees.");
        }
        departmentRepository.delete(department);
    }

    public List<User> getDepartmentHeadsByDepartmentId(Integer departmentId) {
        Department department = getDepartmentById(departmentId);

        return department.getUsers().stream()
                .filter(user -> user.getRoles().stream().anyMatch(role -> role.getRoleType().equals(RoleType.DEPARTMENT_HEAD)))
                .collect(Collectors.toList());
    }
}
