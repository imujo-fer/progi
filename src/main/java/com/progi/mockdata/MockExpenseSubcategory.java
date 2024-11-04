package com.progi.mockdata;

import com.progi.Model.ExpenseSubcategory;

import java.util.ArrayList;
import java.util.List;

public class MockExpenseSubcategory {
    public static List<ExpenseSubcategory> generateMockExpenseSubcategories() {
        List<ExpenseSubcategory> subcategories = new ArrayList<>();
        subcategories.add(new ExpenseSubcategory(1, "Transportation", MockExpenseCategory.generateMockExpenseCategories().get(0)));
        subcategories.add(new ExpenseSubcategory(2, "Food", MockExpenseCategory.generateMockExpenseCategories().get(0)));
        return subcategories;
    }
}
