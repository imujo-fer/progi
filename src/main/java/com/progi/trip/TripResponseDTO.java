package com.progi.trip;

import com.progi.Enum.Status;
import com.progi.country.Country;
import com.progi.country.CountryDTO;
import com.progi.tripstatus.TripStatus;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class TripResponseDTO {
    private Integer id;
    private String requestNumber;
    private Timestamp dateFrom;
    private Timestamp dateTo;
    private String city;
    private CountryDTO country;
    private Status status;
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
