package com.progi.expensecategory;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.progi.expensesubcategory.ExpenseSubcategory;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "expense_categories")
@NoArgsConstructor
public class ExpenseCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    @NotNull
    private String name;

    @OneToMany(mappedBy = "expenseCategory")
    @JsonManagedReference
    @JsonIgnore
    private List<ExpenseSubcategory> expenseSubcategories;

    public ExpenseCategory(Integer id, String name, List<ExpenseSubcategory> expenseSubcategories) {
        this.id = id;
        this.name = name;
        this.expenseSubcategories = expenseSubcategories;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public @NotNull String getName() {
        return name;
    }

    public void setName(@NotNull String name) {
        this.name = name;
    }

    public List<ExpenseSubcategory> getExpenseSubcategories() {
        return expenseSubcategories;
    }

    public void setExpenseSubcategories(List<ExpenseSubcategory> expenseSubcategories) {
        this.expenseSubcategories = expenseSubcategories;
    }
}
