package com.progi.mockdata;

import com.progi.Model.Receipt;

import java.util.ArrayList;
import java.util.List;

public class MockReceipt {
    public static List<Receipt> generateMockReceipts() {
        List<Receipt> receipts = new ArrayList<>();
        receipts.add(new Receipt(1, "path/to/receipt1.pdf", MockExpenseReportItem.generateMockExpenseReportItems().getFirst()));
        receipts.add(new Receipt(2, "path/to/receipt2.pdf", MockExpenseReportItem.generateMockExpenseReportItems().getFirst()));
        return receipts;
    }
}
