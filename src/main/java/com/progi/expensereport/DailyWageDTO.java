package com.progi.expensereport;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
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
