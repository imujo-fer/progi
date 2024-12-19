package com.progi.Statistics.dto;

import java.time.Month;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class NumberOfTripsStatisticsDTO {
    @NotNull
    private Month month;
    @NotNull
    private Long numberOfTrips;

    public NumberOfTripsStatisticsDTO(Integer month, Long numberOfTrips) {
        this.month = Month.of(month);
        this.numberOfTrips = numberOfTrips;
    }
}
