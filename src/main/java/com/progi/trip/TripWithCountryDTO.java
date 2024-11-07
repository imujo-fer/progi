package com.progi.trip;

import com.progi.country.CountryDTO;
import com.progi.user.dto.UserDetailsDTO;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class TripWithCountryDTO {
    @NotNull
    Integer id;
    @NotNull
    private Double coordinatesLat;
    @NotNull
    private Double coordinatesLon;
    @NotNull
    private String city;
    @NotNull
    private CountryDTO country;
    @NotNull
    private Timestamp datetimeFrom;
    @NotNull
    private Timestamp datetimeTo;
    @NotNull
    private String reason;
    @NotNull
    private UserDetailsDTO user;

    public TripWithCountryDTO(Trip trip) {
        this.id = trip.getId();
        this.coordinatesLat = trip.getCoordinatesLat();
        this.coordinatesLon = trip.getCoordinatesLon();
        this.city = trip.getCity();
        this.country = new CountryDTO(trip.getCountry());
        this.datetimeFrom = trip.getDatetimeFrom();
        this.datetimeTo = trip.getDatetimeTo();
        this.reason = trip.getReason();
        this.user = new UserDetailsDTO(trip.getUser());
    }
}
