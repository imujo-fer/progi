package com.progi.expensesubcategory;

import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ExpenseSubcategoryService {

    @Autowired
    private ExpenseSubcategoryRepository expenseSubcategoryRepository;

    public ExpenseSubcategory getExpenseSubcategoryById(Integer id) {
        return expenseSubcategoryRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Expense subcategory not found with id " + id));
    }
}
