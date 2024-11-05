package com.progi.expensecategory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
