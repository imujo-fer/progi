package com.progi.expensesubcategory;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseSubcategoryDTO {
    @NotNull
    private String name;
    @NotNull
    private Integer expenseCategoryId;

    public ExpenseSubcategoryDTO(ExpenseSubcategory expenseSubcategory) {
        this.name = expenseSubcategory.getName();
        this.expenseCategoryId = expenseSubcategory.getExpenseCategory().getId();
    }
}
