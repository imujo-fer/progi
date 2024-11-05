package com.progi.trip;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class TripDTO {

    private Double coordinatesLat;
    private Double coordinatesLon;
    private String city;
    private String countryCode;
    private Timestamp datetimeFrom;
    private Timestamp datetimeTo;
    private String reason;
}
