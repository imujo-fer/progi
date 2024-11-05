package com.progi.expensereportitem;

import com.progi.Enum.Currency;
import lombok.Data;

@Data
public class ExpenseReportItemDTO {

    private Integer expenseReportId;
    private Integer receiptId;
    private Integer expenseSubcategoryId;
    private String description;
    private Currency currency;
    private Double currencyValue;
    private Double eurValue;
}
