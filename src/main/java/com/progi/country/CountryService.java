package com.progi.country;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CountryService {

    @Autowired
    private CountryRepository countryRepository;

    // Method to get country by code
    public Country getCountryByCode(String code) {
        return countryRepository.findById(code)
                .orElseThrow(() -> new IllegalStateException("Country not found with code " + code));
    }

    // Method to update country details
    public void updateCountry(Country country) {
        countryRepository.save(country); // Save updated country
    }

    // Optional: Fetch all countries
    public List<Country> getAllCountries() {
        return countryRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
    }
}

