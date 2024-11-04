package com.progi.mockdata;

import com.progi.Enum.Currency;
import com.progi.Model.ExpenseReportItem;

import java.util.ArrayList;
import java.util.List;

public class MockExpenseReportItem {
    public static List<ExpenseReportItem> generateMockExpenseReportItems() {
        List<ExpenseReportItem> items = new ArrayList<>();
        items.add(new ExpenseReportItem(1, MockExpenseReport.generateMockExpenseReports().getFirst(), MockReceipt.generateMockReceipts().getFirst(), MockExpenseSubcategory.generateMockExpenseSubcategories().getFirst(), "Taxi", Currency.EUR, 50.0, 50.0));
        items.add(new ExpenseReportItem(1, MockExpenseReport.generateMockExpenseReports().getLast(), MockReceipt.generateMockReceipts().getLast(), MockExpenseSubcategory.generateMockExpenseSubcategories().getLast(), "Hotel", Currency.GBP, 54.0, 50.0));
        return items;
    }
}
