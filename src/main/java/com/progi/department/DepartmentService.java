package com.progi.department;

import com.progi.Enum.RoleType;
import com.progi.user.User;
import com.progi.user.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

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
                .filter(user -> user.getRoles().stream().anyMatch(role -> role.getName().equals(RoleType.DEPARTMENT_HEAD)))
                .collect(Collectors.toList());
    }
}