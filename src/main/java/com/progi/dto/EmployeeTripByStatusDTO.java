package com.progi.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.progi.Enum.Status;
import com.progi.Model.Country;
import com.progi.Model.ExpenseReport;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeTripByStatusDTO {
    private Integer id;

    private String requestNumber;

    private double coordinatesLon;

    private double coordinatesLat;

    private String city;

    private Country country;

    private Timestamp datetimeFrom;

    private Timestamp datetimeTo;

    private Status status;

    private ExpenseReport expenseReport;
}
