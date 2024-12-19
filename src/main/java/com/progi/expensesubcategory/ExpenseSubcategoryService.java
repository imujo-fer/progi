package com.progi.expensesubcategory;

import com.progi.expensecategory.ExpenseCategoryService;
import com.progi.receipt.Receipt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import java.util.NoSuchElementException;

@Service
@Transactional
public class ExpenseSubcategoryService {

    @Autowired
    private ExpenseSubcategoryRepository expenseSubcategoryRepository;

    @Autowired
    private ExpenseCategoryService expenseCategoryService;

    public ExpenseSubcategory getExpenseSubcategoryById(Integer id) {
        return expenseSubcategoryRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Expense subcategory not found with id " + id));
    }

    public ExpenseSubcategory createExpenseSubcategory(ExpenseSubcategoryDTO expenseSubcategoryDTO) {
        ExpenseSubcategory expenseSubcategory = new ExpenseSubcategory();
        expenseSubcategory.setName(expenseSubcategoryDTO.getName());
        expenseSubcategory.setExpenseCategory(
                expenseCategoryService.getExpenseCategoryById(expenseSubcategoryDTO.getExpenseCategoryId())
        );

        return expenseSubcategoryRepository.save(expenseSubcategory);
    }
}
