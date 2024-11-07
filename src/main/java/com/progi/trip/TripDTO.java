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
    private String city;
    @NotNull
    private String countryCode;
    @NotNull
    private Timestamp datetimeFrom;
    @NotNull
    private Timestamp datetimeTo;
    @NotNull
    private String reason;
}
