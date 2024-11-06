package com.progi.expensereportitem;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.progi.Enum.Currency;
import com.progi.expensesubcategory.ExpenseSubcategory;
import com.progi.receipt.Receipt;
import com.progi.expensereport.ExpenseReport;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "expense_report_items")
@Getter
@Setter

public class ExpenseReportItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "expense_report_id", nullable = false)
    @JsonBackReference
    @NotNull
    private ExpenseReport expenseReport;

    @OneToOne
    @JoinColumn(name = "receipt_id", referencedColumnName = "id", nullable = false)
    @NotNull
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

    public ExpenseReportItem(Integer id, ExpenseReport expenseReport, Receipt receipt, ExpenseSubcategory expenseSubcategory, String description, Currency currency, Double currencyValue, Double eurValue) {
        this.id = id;
        this.expenseReport = expenseReport;
        this.receipt = receipt;
        this.expenseSubcategory = expenseSubcategory;
        this.description = description;
        this.currency = currency;
        this.currencyValue = currencyValue;
        this.eurValue = eurValue;
    }

    public ExpenseReportItem() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ExpenseReport getExpenseReport() {
        return expenseReport;
    }

    public void setExpenseReport(ExpenseReport expenseReport) {
        this.expenseReport = expenseReport;
    }

    public Receipt getReceipt() {
        return receipt;
    }

    public void setReceipt(Receipt receipt) {
        this.receipt = receipt;
    }

    public ExpenseSubcategory getExpenseSubcategory() {
        return expenseSubcategory;
    }

    public void setExpenseSubcategory(ExpenseSubcategory expenseSubcategory) {
        this.expenseSubcategory = expenseSubcategory;
    }

    public @NotNull String getDescription() {
        return description;
    }

    public void setDescription(@NotNull String description) {
        this.description = description;
    }

    public @NotNull Currency getCurrency() {
        return currency;
    }

    public void setCurrency(@NotNull Currency currency) {
        this.currency = currency;
    }

    public @NotNull Double getCurrencyValue() {
        return currencyValue;
    }

    public void setCurrencyValue(@NotNull Double currencyValue) {
        this.currencyValue = currencyValue;
    }

    public @NotNull Double getEurValue() {
        return eurValue;
    }

    public void setEurValue(@NotNull Double eurValue) {
        this.eurValue = eurValue;
    }
}