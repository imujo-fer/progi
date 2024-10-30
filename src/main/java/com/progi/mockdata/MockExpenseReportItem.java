package com.progi.mockdata;

import com.progi.Model.ExpenseReportItem;

import java.util.ArrayList;
import java.util.List;

public class MockExpenseReportItem {
    public static List<ExpenseReportItem> generateMockExpenseReportItems() {
        List<ExpenseReportItem> items = new ArrayList<>();
        items.add(new ExpenseReportItem(1, null, null, null, "Taxi", null, 50.0, 50.0));
        items.add(new ExpenseReportItem(2, null, null, null, "Hotel", null, 100.0, 100.0));
        return items;
    }
}
