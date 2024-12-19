package com.progi.expensesubcategory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/expense-subcategories")
public class ExpenseSubcategoryController {

    @Autowired
    private ExpenseSubcategoryService expenseSubcategoryService;

    @GetMapping("{id}")
    public ResponseEntity<ExpenseSubcategory> getExpenseSubcategory(@PathVariable int id) {
        return ResponseEntity.ok(expenseSubcategoryService.getExpenseSubcategoryById(id));
    }

    @PostMapping
    public ResponseEntity<ExpenseSubcategory> createExpenseSubcategory(@RequestBody ExpenseSubcategoryDTO expenseSubcategory) {
        return ResponseEntity.ok(expenseSubcategoryService.createExpenseSubcategory(expenseSubcategory));
    }
}
