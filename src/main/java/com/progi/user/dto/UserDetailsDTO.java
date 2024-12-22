package com.progi.user.dto;

import java.util.List;

import com.progi.Enum.RoleType;
import com.progi.department.Department;
import com.progi.user.User;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDetailsDTO {
    @NotNull
    private Integer id;

    @NotNull
    private String email;

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    @NotNull
    private String iban;

    private List<RoleType> roles;

    private Department department;

    public UserDetailsDTO(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.iban = user.getIban();
        this.roles = user.getRoles().stream().map(role -> role.getRoleType()).toList();
        this.department = user.getDepartment();
    }

    public UserDetailsDTO(Integer id, String email, String firstName, String lastName, String iban, Integer departmentId, String departmentName) {
        this.id = id;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.iban = iban;
        this.department = new Department(departmentId, departmentName);
    }
}
