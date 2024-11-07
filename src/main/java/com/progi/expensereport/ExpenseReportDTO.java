package com.progi.expensereport;

import com.progi.trip.Trip;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ExpenseReportDTO {
    @NotNull
    private Integer tripId;
}
