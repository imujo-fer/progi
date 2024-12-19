package com.progi.expensecategory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expense-categories")
public class ExpenseCategoryController {

    @Autowired
    private ExpenseCategoryService expenseCategoryService;

    @GetMapping
    public ResponseEntity<List<ExpenseCategory>> getAllExpenseCategories() {
        return ResponseEntity.ok(expenseCategoryService.getAllExpenseCategories());
    }

    @PostMapping
    public ResponseEntity<ExpenseCategory> createExpenseCategory(@RequestParam String name) {
        return ResponseEntity.ok(expenseCategoryService.createExpenseCategory(name));
    }

}
