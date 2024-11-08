package com.progi.Statistics.dto;

import java.time.Month;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CostStatisticsDTO {
    @NotNull
    private Month month;
    @NotNull
    private Double eurCost;

    public CostStatisticsDTO(Integer month, Double eurCost) {
        this.month = Month.of(month);
        this.eurCost = eurCost;
    }
}
