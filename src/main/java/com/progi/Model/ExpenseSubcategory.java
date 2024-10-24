package com.progi.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "expense_subcategories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseSubcategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    @NotNull
    private String name;

    @ManyToOne
    @JoinColumn(name = "expense_category_id")
    private ExpenseCategory expenseCategory;
}


