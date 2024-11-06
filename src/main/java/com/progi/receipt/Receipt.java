package com.progi.receipt;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.progi.expensereportitem.ExpenseReportItem;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "receipts")
@Getter
@Setter
@NoArgsConstructor
public class Receipt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    @NotNull
    private String path;

    @OneToOne(mappedBy = "receipt")
    @JsonIgnore
    private ExpenseReportItem expenseReportItem;

    public Receipt(Integer id, String path, ExpenseReportItem expenseReportItem) {
        this.id = id;
        this.path = path;
        this.expenseReportItem = expenseReportItem;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public @NotNull String getPath() {
        return path;
    }

    public void setPath(@NotNull String path) {
        this.path = path;
    }

    public ExpenseReportItem getExpenseReportItem() {
        return expenseReportItem;
    }

    public void setExpenseReportItem(ExpenseReportItem expenseReportItem) {
        this.expenseReportItem = expenseReportItem;
    }
}
