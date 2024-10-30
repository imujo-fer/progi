package com.progi.mockdata;

import com.progi.Model.Company;

import java.util.ArrayList;
import java.util.List;

public class MockCompany {
    public static List<Company> generateMockCompanies() {
        List<Company> companies = new ArrayList<>();
        companies.add(new Company(1, 0.5, 45.8150, 15.9819, "Some Address 1", "Zagreb", MockCountry.generateMockCountries().get(0), "HR1234567890123456789"));
        companies.add(new Company(2, 0.75, 45.8475, 15.9819, "Some Address 2", "Zagreb", MockCountry.generateMockCountries().get(1), "HR1234567890123456788"));
        companies.add(new Company(3, 1.0, 45.8125, 15.9782, "Some Address 3", "Zagreb", MockCountry.generateMockCountries().get(2), "HR1234567890123456787"));
        return companies;
    }
}
