package com.progi.expensecategory;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.progi.expensecategory.dto.ExpenseCategoryWithSubcategories;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ExpenseCategoryService {
    @Autowired
    private ExpenseCategoryRepository expenseCategoryRepository;

    public List<ExpenseCategoryWithSubcategories> getAllExpenseCategories() {
        List<ExpenseCategory> categories = expenseCategoryRepository.findAllWithSubcategories();
        return categories.stream()
                .map(category -> new ExpenseCategoryWithSubcategories(
                        category.getId(),
                        category.getName(),
                        category.getExpenseSubcategories()))
                .collect(Collectors.toList());
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
