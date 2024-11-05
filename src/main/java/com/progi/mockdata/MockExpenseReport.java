package com.progi.mockdata;

import com.progi.Model.ExpenseReport;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

public class MockExpenseReport {
    public static List<ExpenseReport> generateMockExpenseReports() {
        List<ExpenseReport> reports = new ArrayList<>();
        reports.add(new ExpenseReport(1, null, 150.0, new Timestamp(System.currentTimeMillis()), new ArrayList<>()));
        reports.add(new ExpenseReport(2, null, 200.0, new Timestamp(System.currentTimeMillis()), new ArrayList<>()));
        return reports;
    }
}
