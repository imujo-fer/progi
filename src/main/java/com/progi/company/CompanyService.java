package com.progi.company;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.progi.company.dto.CompanyDetailsDTO;
import com.progi.company.dto.CountryDailyWageDTO;
import com.progi.company.dto.UpdateCompanyDTO;
import com.progi.country.Country;
import com.progi.country.CountryService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CountryService countryService;

    public Company getCompanyDetails() {
        return companyRepository.findAll().get(0);
    }

    
    public CompanyDetailsDTO getCompanyDetailsWithDailyWages() {
        Company company = companyRepository.findAll().get(0); // 
        List<CountryDailyWageDTO> dailyWages = countryService.getAllCountries().stream()
                .map(country -> new CountryDailyWageDTO(
                        country.getName(),              // Country name
                        country.getCode(),              // Country code
                        country.getContinent().toString(), // Continent name (you may want to adjust this depending on the Continent enum)
                        country.getEurDailyWage()       // EUR daily wage
                ))
                .collect(Collectors.toList());

        return new CompanyDetailsDTO(
                company.getId(),
                company.getEurCostPerKm(),
                company.getLocationCoordLat(),
                company.getLocationCoordLon(),
                company.getAddress(),
                company.getCity(),
                company.getCountry().getName(), // Get the country name for response
                company.getCountry().getCode(), // Get the country code for response
                company.getIban(),
                dailyWages // Pass the modified dailyWages list with country name, continent, and EUR daily wage
        );
    }




    // PATCH: Update company details
    @Transactional
    public Company updateCompanySettings(UpdateCompanyDTO updatedCompanyDTO) {
        Company company = companyRepository.findById(updatedCompanyDTO.getId())
                .orElseThrow(() -> new IllegalStateException("Company not found"));

        // Update only the provided fields
        if (updatedCompanyDTO.getEurCostPerKm() != null) {
            company.setEurCostPerKm(updatedCompanyDTO.getEurCostPerKm());
        }
        if (updatedCompanyDTO.getLocationCoordLat() != null) {
            company.setLocationCoordLat(updatedCompanyDTO.getLocationCoordLat());
        }
        if (updatedCompanyDTO.getLocationCoordLon() != null) {
            company.setLocationCoordLon(updatedCompanyDTO.getLocationCoordLon());
        }
        if (updatedCompanyDTO.getAddress() != null) {
            company.setAddress(updatedCompanyDTO.getAddress());
        }
        if (updatedCompanyDTO.getCity() != null) {
            company.setCity(updatedCompanyDTO.getCity());
        }
        if (updatedCompanyDTO.getIban() != null) {
            company.setIban(updatedCompanyDTO.getIban());
        }
        if (updatedCompanyDTO.getCountryCode() != null) {
            // Update the country using the code
            Country newCountry = countryService.getCountryByCode(updatedCompanyDTO.getCountryCode());
            company.setCountry(newCountry);
        }

        // Update daily wages
        if (updatedCompanyDTO.getDailyWages() != null) {
            for (CountryDailyWageDTO wageDTO : updatedCompanyDTO.getDailyWages()) {
                // Use countryCode to fetch the country and update daily wage
                Country country = countryService.getCountryByCode(wageDTO.getCountryCode());
                country.setEurDailyWage(wageDTO.getEurDailyWage());
                countryService.updateCountry(country);
            }
        }

        // Save and return the updated company
        return companyRepository.save(company);
    }
}
