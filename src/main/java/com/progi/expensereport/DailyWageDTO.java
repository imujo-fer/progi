package com.progi.expensereport;

import jakarta.validation.constraints.NotNull;

public class DailyWageDTO {
    @NotNull
    private int tripLengthInDays;
    @NotNull
    private double eurDailyWage;
    @NotNull
    private double eurTotalWage;

    public DailyWageDTO(int tripLengthInDays, double eurDailyWage, double eurTotalWage) {
        this.tripLengthInDays = tripLengthInDays;
        this.eurDailyWage = eurDailyWage;
        this.eurTotalWage = eurTotalWage;
    }
}
