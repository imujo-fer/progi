
package com.progi.user.dto;

import java.util.List;

import com.progi.Enum.RoleType;
import com.progi.role.Role;
import com.progi.user.User;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserInviteDetailsDTO {
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
    @NotNull
    private Integer departmentId;
    @NotNull 
    private List<RoleType> roles;

    public UserInviteDetailsDTO(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.iban = user.getIban();
        this.departmentId = user.getDepartment().getId();
        this.roles = user.getRoles().stream().map(Role::getRoleType).toList();
    }
}
