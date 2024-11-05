package com.progi.expensereport;


import com.progi.expensereportitem.ExpenseReportItem;
import com.progi.expensereportitem.ExpenseReportItemWithSubcategoryDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expense-reports")
public class ExpenseReportController {

    @Autowired
    private ExpenseReportService expenseReportService;


    @GetMapping("/{id}/items")
    public ResponseEntity<List<ExpenseReportItemWithSubcategoryDTO>> getExpenseReportItems(@PathVariable Integer id) {
        ExpenseReport expenseReport = expenseReportService.getExpenseReportById(id);
        List<ExpenseReportItemWithSubcategoryDTO> expenseReportItems = expenseReport.getExpenseReportItems().stream().map(ExpenseReportItemWithSubcategoryDTO::new).toList();
        return ResponseEntity.ok(expenseReportItems);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteExpenseReport(@RequestParam Integer id) {
        expenseReportService.deleteExpenseReport(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<ExpenseReport> createExpenseReport(@RequestParam Integer tripId) {
        return ResponseEntity.ok(expenseReportService.createExpenseReport(tripId));
    }
}
