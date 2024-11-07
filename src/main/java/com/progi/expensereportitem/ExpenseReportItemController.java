package com.progi.expensereportitem;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
