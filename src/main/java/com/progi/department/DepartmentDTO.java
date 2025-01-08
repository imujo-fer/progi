package com.progi.department;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DepartmentDTO {
    private Integer id;
    private String name;
    private Integer employeeCount;
}
