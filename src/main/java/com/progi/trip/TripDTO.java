package com.progi.trip;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class TripDTO {
    @NotNull
    private Double coordinatesLat;
    @NotNull
    private Double coordinatesLon;
    @NotNull
    private String address;
    @NotNull
    private String city;
    @NotNull
    private String countryCode;
    @NotNull
    private Timestamp datetimeFrom;
    @NotNull
    private Timestamp datetimeTo;
    @NotNull
    private String reason;

    public TripDTO(Double coordinatesLat, Double coordinatesLon, String address, String city, String countryCode, Timestamp datetimeFrom, Timestamp datetimeTo, String reason) {
        this.coordinatesLat = coordinatesLat;
        this.coordinatesLon = coordinatesLon;
        this.address = address;
        this.city = city;
        this.countryCode = countryCode;
        this.datetimeFrom = datetimeFrom;
        this.datetimeTo = datetimeTo;
        this.reason = reason;
    }
}
