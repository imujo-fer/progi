package com.progi.mockdata;

import com.progi.Model.ExpenseCategory;

import java.util.ArrayList;
import java.util.List;

public class MockExpenseCategory {
    public static List<ExpenseCategory> generateMockExpenseCategories() {
        List<ExpenseCategory> categories = new ArrayList<>();
        categories.add(new ExpenseCategory(1, "Travel", new ArrayList<>()));
        categories.add(new ExpenseCategory(2, "Food", new ArrayList<>()));
        categories.add(new ExpenseCategory(3, "Accommodation", new ArrayList<>()));
        return categories;
    }
}
