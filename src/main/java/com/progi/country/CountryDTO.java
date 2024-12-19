package com.progi.country;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CountryDTO {
    @NotNull
    private String code;
    @NotNull
    private String name;

    public CountryDTO(Country country) {
        this.code = country.getCode();
        this.name = country.getName();
    }
}
