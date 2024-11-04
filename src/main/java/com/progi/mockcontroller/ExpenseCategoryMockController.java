package com.progi.mockcontroller;


import com.progi.Model.ExpenseCategory;
import com.progi.mockdata.MockExpenseCategory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/expense-categories")
public class ExpenseCategoryMockController {

    @GetMapping
    public ResponseEntity<List<ExpenseCategory>> getCategories() {
        return ResponseEntity.ok(MockExpenseCategory.generateMockExpenseCategories());
    }


}
