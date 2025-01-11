package com.progi.expensereport;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.progi.expensereportitem.ExpenseReportItemWithSubcategoryDTO;

@RestController
@RequestMapping("/api/expense-reports")
public class ExpenseReportController {

    @Autowired
    private ExpenseReportService expenseReportService;

    @GetMapping("/{id}/items")
    public ResponseEntity<List<ExpenseReportItemWithSubcategoryDTO>> getExpenseReportItems(@PathVariable Integer id) {
        return ResponseEntity.ok(expenseReportService.getExpenseReportItems(id));
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

    @GetMapping("/{id}/info")
    public ResponseEntity<ExpenseReportInfoDTO> getExpenseReportInfo(@PathVariable Integer id) {
        return ResponseEntity.ok(expenseReportService.getExpenseReportItemInfo(id));
    }
}
