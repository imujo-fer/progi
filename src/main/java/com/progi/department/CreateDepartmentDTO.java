package com.progi.department;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CreateDepartmentDTO {
    @NotNull
    private String name;

}
