package com.progi.company;


import com.progi.company.dto.CompanyDetailsDTO;
import com.progi.company.dto.UpdateCompanyDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    // GET request to fetch company details
    @GetMapping("/settings")
    public CompanyDetailsDTO getCompanyDetailsWithDailyWages() {
        return companyService.getCompanyDetailsWithDailyWages();
    }

    // PATCH request to update company details
    @PatchMapping("/settings")
    public Company updateCompanySettings(@RequestBody UpdateCompanyDTO updatedCompany) {
        return companyService.updateCompanySettings(updatedCompany);
    }
}