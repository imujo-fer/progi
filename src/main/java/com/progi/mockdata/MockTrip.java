package com.progi.mockdata;

import com.progi.Model.Country;
import com.progi.Model.Trip;
import com.progi.Model.TripStatus;
import com.progi.Model.User;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class MockTrip {
    public static List<Trip> generateMockTrips() {

        List<Trip> trips = new ArrayList<>();
        trips.add(new Trip(1, "#0001", 15.0, 45.0, "Zagreb", new Country(), new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()), "Business Meeting", new User(), new Timestamp(System.currentTimeMillis()), new ArrayList<>()));
        trips.add(new Trip(2, "#0002", 20.0, 46.0, "Split",new Country(), new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()), "Conference", new User(), new Timestamp(System.currentTimeMillis()), new ArrayList<>()));
        return trips;
    }
}
