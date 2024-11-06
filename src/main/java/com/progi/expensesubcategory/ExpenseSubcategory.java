package com.progi.expensesubcategory;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.progi.expensecategory.ExpenseCategory;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "expense_subcategories")
@Getter
@Setter
@NoArgsConstructor
public class ExpenseSubcategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    @NotNull
    private String name;

    @ManyToOne
    @JoinColumn(name = "expense_category_id")
    @JsonBackReference
    private ExpenseCategory expenseCategory;

    public ExpenseSubcategory(Integer id, String name, ExpenseCategory expenseCategory) {
        this.id = id;
        this.name = name;
        this.expenseCategory = expenseCategory;
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

    public ExpenseCategory getExpenseCategory() {
        return expenseCategory;
    }

    public void setExpenseCategory(ExpenseCategory expenseCategory) {
        this.expenseCategory = expenseCategory;
    }
}


