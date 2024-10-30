package com.progi.mockdata;

import com.progi.Model.Trip;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class MockTrip {
    public static List<Trip> generateMockTrips() {
        List<Trip> trips = new ArrayList<>();
        trips.add(new Trip(1, "TRIP001", 15.0, 45.0, "Zagreb", null, new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()), "Business Meeting", null, null, new ArrayList<>()));
        trips.add(new Trip(2, "TRIP002", 20.0, 46.0, "Split", null, new Timestamp(System.currentTimeMillis()), new Timestamp(System.currentTimeMillis()), "Conference", null, null, new ArrayList<>()));
        return trips;
    }
}
