package com.progi.expensereport;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ExpenseReportDTO {
    @NotNull
    private Integer tripId;
}
