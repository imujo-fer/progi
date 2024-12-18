package com.progi.expensereportitem;

import com.progi.Enum.Currency;
import com.progi.expensesubcategory.ExpenseSubcategory;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ExpenseReportItemWithSubcategoryDTO {
    @NotNull
    private Integer id;
    @NotNull
    private Integer expenseReportId;
    @NotNull
    private Integer receiptId;
    @NotNull
    private ExpenseSubcategory expenseSubcategory;
    @NotNull
    private String description;
    @NotNull
    private Currency currency;
    @NotNull
    private Double currencyValue;
    @NotNull
    private Double eurValue;

    public ExpenseReportItemWithSubcategoryDTO(ExpenseReportItem expenseReportItem) {
        this.id = expenseReportItem.getId();
        this.expenseReportId = expenseReportItem.getExpenseReport().getId();
        this.receiptId = expenseReportItem.getReceipt().getId();
        this.expenseSubcategory = expenseReportItem.getExpenseSubcategory();
        this.description = expenseReportItem.getDescription();
        this.currency = expenseReportItem.getCurrency();
        this.currencyValue = expenseReportItem.getCurrencyValue();
        this.eurValue = expenseReportItem.getEurValue();
    }
}
