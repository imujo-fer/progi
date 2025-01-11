package com.progi.company.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CountryDailyWageDTO {
    private String countryName;
    private String countryCode;
    private String continentName;
    private double eurDailyWage;

}
