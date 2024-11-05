package com.progi.expensereportitem;

import com.progi.Enum.Currency;
import com.progi.expensesubcategory.ExpenseSubcategory;
import lombok.Data;

@Data
public class ExpenseReportItemWithSubcategoryDTO {
    private Integer expenseReportId;
    private Integer receiptId;
    private ExpenseSubcategory expenseSubcategory;
    private String description;
    private Currency currency;
    private Double currencyValue;
    private Double eurValue;

    public ExpenseReportItemWithSubcategoryDTO(ExpenseReportItem expenseReportItem) {
        this.expenseReportId = expenseReportItem.getExpenseReport().getId();
        this.receiptId = expenseReportItem.getReceipt().getId();
        this.expenseSubcategory = expenseReportItem.getExpenseSubcategory();
        this.description = expenseReportItem.getDescription();
        this.currency = expenseReportItem.getCurrency();
        this.currencyValue = expenseReportItem.getCurrencyValue();
        this.eurValue = expenseReportItem.getEurValue();
    }
}
