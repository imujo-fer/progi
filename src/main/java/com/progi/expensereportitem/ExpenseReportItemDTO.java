package com.progi.expensereportitem;

import com.progi.Enum.Currency;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ExpenseReportItemDTO {
    @NotNull
    private Integer expenseReportId;
    @NotNull
    private Integer expenseSubcategoryId;
    @NotNull
    private String description;
    @NotNull
    private Currency currency;
    @NotNull
    private Double currencyValue;
    @NotNull
    private Double eurValue;
}
