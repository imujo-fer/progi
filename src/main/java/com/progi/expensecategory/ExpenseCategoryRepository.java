package com.progi.expensecategory;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ExpenseCategoryRepository extends JpaRepository<ExpenseCategory, Integer> {

    @Query("SELECT ec FROM ExpenseCategory ec LEFT JOIN FETCH ec.expenseSubcategories")
    List<ExpenseCategory> findAllWithSubcategories();

}
