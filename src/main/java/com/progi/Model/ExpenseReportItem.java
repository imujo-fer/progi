package com.progi.Model;


import com.progi.Enum.Currency;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "expense_report_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseReportItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "expense_report_id")
    private ExpenseReport expenseReport;

    @ManyToOne
    @JoinColumn(name = "receipt_id")
    private Receipt receipt;

    @ManyToOne
    @JoinColumn(name = "expense_subcategory_id")
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
