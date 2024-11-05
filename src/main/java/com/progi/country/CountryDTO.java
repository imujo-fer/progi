package com.progi.country;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CountryDTO {
    private String code;

    private String name;

    public CountryDTO(Country country) {
        this.code = country.getCode();
        this.name = country.getName();
    }
}
