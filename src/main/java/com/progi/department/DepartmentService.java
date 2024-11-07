package com.progi.department;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.progi.Enum.RoleType;
import com.progi.user.User;
import com.progi.user.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private UserRepository userRepository;

    public Department getDepartmentById(Integer id) {
        return departmentRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Department not found with id " + id));
    }

    public List<User> getDepartmentHeadsByDepartmentId(Integer departmentId) {
        Department department = getDepartmentById(departmentId);

        return department.getUsers().stream()
                .filter(user -> user.getRoles().stream().anyMatch(role -> role.getRoleType().equals(RoleType.DEPARTMENT_HEAD)))
                .collect(Collectors.toList());
    }
}
