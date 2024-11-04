package com.progi.mockcontroller;

import com.progi.Model.ExpenseReportItem;
import com.progi.mockdata.MockExpenseReportItem;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expense-reports")
public class ExpenseReportMockController {

    @GetMapping("/{id}/items")
    public ResponseEntity<List<ExpenseReportItem>> getExpenseReportItems(@PathVariable int id) {
        return ResponseEntity.ok(MockExpenseReportItem.generateMockExpenseReportItems());
    }

}
