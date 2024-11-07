package com.progi.user.dto;

import com.progi.user.User;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
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

    public UserDetailsDTO(User user) {
        this.id = user.getId();
        this.email = user.getEmail();
        this.firstName = user.getFirstName();
        this.lastName = user.getLastName();
        this.iban = user.getIban();
    }
}
