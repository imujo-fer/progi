package com.progi.Model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "expense_categories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(unique = true, nullable = false)
    @NotNull
    private String name;

    @OneToMany(mappedBy = "expenseCategory")
    @JsonManagedReference
    private List<ExpenseSubcategory> expenseSubcategories;

}
