package com.progi.expensereportitem;

import com.progi.Enum.Currency;
import com.progi.expensesubcategory.ExpenseSubcategoryDTO;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
public class ExpenseReportItemInfoDTO {
    @NotNull
    private Integer id;
    @NotNull
    private Integer receiptId;
    @NotNull
    private ExpenseSubcategoryDTO expenseSubcategory;
    @NotNull
    private String description;
    @NotNull
    private Currency currency;
    @NotNull
    private Double currencyValue;
    @NotNull
    private Double eurValue;

    public ExpenseReportItemInfoDTO(Integer id, Integer receiptId, ExpenseSubcategoryDTO expenseSubcategory,
            String description, Currency currency, Double currencyValue, Double eurValue) {
        this.id = id;
        this.receiptId = receiptId;
        this.expenseSubcategory = expenseSubcategory;
        this.description = description;
        this.currency = currency;
        this.currencyValue = currencyValue;
        this.eurValue = eurValue;
    }
}
