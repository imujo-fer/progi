package com.progi.expensecategory;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class ExpenseCategoryService {
    @Autowired
    private ExpenseCategoryRepository expenseCategoryRepository;

    public List<ExpenseCategory> getAllExpenseCategories() {
        return expenseCategoryRepository.findAll();
    }

    public ExpenseCategory getExpenseCategoryById(int id) {
        return expenseCategoryRepository.findById(id).orElseThrow();
    }

    public ExpenseCategory createExpenseCategory(String name) {
        ExpenseCategory expenseCategory = new ExpenseCategory();
        expenseCategory.setName(name);
        return expenseCategoryRepository.save(expenseCategory);
    }
}
