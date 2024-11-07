package com.progi.country;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@Transactional
public class CountryService {

    @Autowired
    private CountryRepository countryRepository;

    public Country getCountryByCode(String code){
        return countryRepository.findByCode(code).orElseThrow(() -> new NoSuchElementException("Country not found with code " + code));
    }
}
