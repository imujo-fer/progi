package com.progi.company.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateCompanyDTO {
    private Integer id;
    private Double eurCostPerKm;
    private Double locationCoordLat;
    private Double locationCoordLon;
    private String address;
    private String city;
    private String countryCode;  // Code of the country for PATCH
    private String iban;
    private List<CountryDailyWageDTO> dailyWages;
}
