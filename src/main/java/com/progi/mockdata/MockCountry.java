package com.progi.mockdata;

import com.progi.Model.Country;
import com.progi.Enum.Continent;

import java.util.ArrayList;
import java.util.List;

public class MockCountry {
    public static List<Country> generateMockCountries() {
        List<Country> countries = new ArrayList<>();
        countries.add(new Country("HR", "Hrvatska", 100.0, null, Continent.EUROPE));
        countries.add(new Country("DE", "Germany", 150.0, null, Continent.EUROPE));
        countries.add(new Country("US", "USA", 200.0, null, Continent.AFRICA));
        return countries;
    }
}
