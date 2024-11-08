package com.progi.Statistics.dto;

import com.progi.Enum.Month;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CostStatisticsDTO {
    @NotNull
    private Month month;
    @NotNull
    private Float eur_cost;
}
