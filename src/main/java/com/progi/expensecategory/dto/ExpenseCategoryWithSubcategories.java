package com.progi.expensecategory.dto;

import java.util.List;

import com.progi.expensesubcategory.ExpenseSubcategory;

public class ExpenseCategoryWithSubcategories {
    private Integer id;
    private String name;
    private List<ExpenseSubcategory> expenseSubcategories;

    public ExpenseCategoryWithSubcategories(Integer id, String name, List<ExpenseSubcategory> expenseSubcategories) {
        this.id = id;
        this.name = name;
        this.expenseSubcategories = expenseSubcategories;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<ExpenseSubcategory> getExpenseSubcategories() {
        return expenseSubcategories;
    }
}
