package com.progi.expensecategory;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.progi.expensesubcategory.ExpenseSubcategory;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "expense_categories")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
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
}
