package com.progi.company.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyDetailsDTO {
    private Integer id;
    private Double eurCostPerKm;
    private Double locationCoordLat;
    private Double locationCoordLon;
    private String address;
    private String city;
    private String country;  // Name of the country for GET
    private String iban;
    private List<CountryDailyWageDTO> dailyWages;
}
