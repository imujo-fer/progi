package com.progi.company;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;
    
    public Company getCompanyDetails() {
        return companyRepository.findAll().get(0);
    }
}
