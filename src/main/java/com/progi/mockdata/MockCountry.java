package com.progi.mockdata;

import com.progi.Model.Country;
import com.progi.Enum.Continent;

import java.util.ArrayList;
import java.util.List;

public class MockCountry {
    public static List<Country> generateMockCountries() {
        List<Country> countries = new ArrayList<>();
        countries.add(new Country("HR", "Croatia", 100.0, new ArrayList<>(), Continent.EUROPE));
        countries.add(new Country("DE", "Germany", 150.0, new ArrayList<>(), Continent.EUROPE));
        countries.add(new Country("US", "USA", 200.0, new ArrayList<>(), Continent.AFRICA));
        return countries;
    }
}
