package com.progi.trip;

import java.sql.Timestamp;

import com.progi.Enum.Status;
import com.progi.country.CountryDTO;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TripResponseDTO {
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
    @NotNull
    private Status status;
    @NotNull
    private Integer expenseReportId;

    public TripResponseDTO(Trip trip) {
        this.id = trip.getId();
        this.requestNumber = trip.getRequestNumber();
        this.dateFrom = trip.getDatetimeFrom();
        this.dateTo = trip.getDatetimeTo();
        this.city = trip.getCity();
        this.country = new CountryDTO(trip.getCountry());
        this.status = trip.getTripStatuses().isEmpty() ? null : trip.getTripStatuses().get(trip.getTripStatuses().size() - 1).getStatus();
        this.expenseReportId = trip.getExpenseReport() != null ? trip.getExpenseReport().getId() : null;
    }
}
