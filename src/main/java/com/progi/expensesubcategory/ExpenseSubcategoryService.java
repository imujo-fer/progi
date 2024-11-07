package com.progi.expensesubcategory;

import com.progi.receipt.Receipt;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
@Transactional
public class ExpenseSubcategoryService {

    @Autowired
    private ExpenseSubcategoryRepository expenseSubcategoryRepository;

    public ExpenseSubcategory getExpenseSubcategoryById(Integer id) {
        return expenseSubcategoryRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Expense subcategory not found with id " + id));
    }
}
