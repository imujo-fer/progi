package com.progi.trip;

import com.progi.Enum.Status;
import com.progi.country.CountryDTO;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class TripNotificationDTO {
    @NotNull
    private Integer id;
    @NotNull
    private String requestNumber;
    @NotNull
    private Timestamp dateFrom;
    @NotNull
    private Timestamp dateTo;
    @NotNull
    private String city;
    @NotNull
    private CountryDTO country;

    public TripNotificationDTO(Trip trip) {
        this.id = trip.getId();
        this.requestNumber = trip.getRequestNumber();
        this.dateFrom = trip.getDatetimeFrom();
        this.dateTo = trip.getDatetimeTo();
        this.city = trip.getCity();
        this.country = new CountryDTO(trip.getCountry());
    }
}
