package com.progi.user.dto;

import java.util.List;

import com.progi.Enum.RoleType;
import com.progi.department.Department;
import com.progi.role.Role;
import com.progi.user.User;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserEditDTO {
    @NotNull
    private String firstName;
    @NotNull
    private String lastName;
    @NotNull
    private String iban;
    @NotNull
    private Integer departmentId;
    @NotNull 
    private List<RoleType> roles;

    public User toUser() {
        Department department = new Department();
        department.setId(departmentId);

        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setIban(iban);
        user.setRoles(roles.stream().map(roleType -> {
            Role role = new Role();
            role.setRoleType(roleType);
            return role;
        }).toList());
        user.setDepartment(department);

        return user;
    }
}
