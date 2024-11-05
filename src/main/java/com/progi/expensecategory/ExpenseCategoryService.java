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
}
