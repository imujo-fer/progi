package com.progi.expensereportitem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;

import static com.progi.receipt.ReceiptService.RECEIPT_DIRECTORY;

@RestController
@RequestMapping("/api/expense-report-items")
public class ExpenseReportItemController {

    @Autowired
    private ExpenseReportItemService expenseReportItemService;

    @PostMapping
    public ResponseEntity<ExpenseReportItem> createExpenseReportItem(@RequestBody ExpenseReportItemDTO expenseReportItemDTO) {
        return ResponseEntity.ok(expenseReportItemService.createExpenseReportItem(expenseReportItemDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ExpenseReportItem> updateExpenseReportItem(
            @PathVariable Integer id,
            @RequestBody ExpenseReportItemDTO expenseReportItemDTO) {
        return ResponseEntity.ok(expenseReportItemService.updateExpenseReportItem(id, expenseReportItemDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpenseReportItem(@PathVariable Integer id) {
        expenseReportItemService.deleteExpenseReportItem(id);

        return ResponseEntity.noContent().build();
    }



}
