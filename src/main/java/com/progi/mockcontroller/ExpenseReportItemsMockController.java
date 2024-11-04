package com.progi.mockcontroller;

import com.progi.Model.ExpenseReportItem;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/expense-reports-items")
public class ExpenseReportItemsMockController {

    @DeleteMapping("/{id}")
    public void delete(@PathVariable int id) {
    }

    @PostMapping
    public ExpenseReportItem create(@RequestBody ExpenseReportItem item) {
        return null;
    }

    @PatchMapping
    public ExpenseReportItem update(@RequestBody ExpenseReportItem item) {
        return null;
    }

}
