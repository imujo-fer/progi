package com.progi.country;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

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
        return countryRepository.findAll();
    }
}

