package com.progi.expensereportitem;


import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.progi.Enum.Currency;
import com.progi.expensesubcategory.ExpenseSubcategory;
import com.progi.receipt.Receipt;
import com.progi.expensereport.ExpenseReport;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "expense_report_items")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseReportItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "expense_report_id", nullable = false)
    @JsonBackReference
    @NotNull
    private ExpenseReport expenseReport;

    @OneToOne
    @JoinColumn(name = "receipt_id", referencedColumnName = "id", nullable = false)
    @NotNull
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Receipt receipt;

    @ManyToOne
    @JoinColumn(name = "expense_subcategory_id", nullable = false)
    @JsonBackReference
    @NotNull
    private ExpenseSubcategory expenseSubcategory;

    @Column(nullable = false)
    @NotNull
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull
    private Currency currency;

    @Column(nullable = false)
    @NotNull
    private Double currencyValue;

    @Column(nullable = false)
    @NotNull
    private Double eurValue;

}
