package com.progi.expensereport;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.progi.expensereportitem.ExpenseReportItem;
import com.progi.trip.Trip;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "expense_reports")
@Getter
@Setter

public class ExpenseReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private Integer id;

    @OneToOne
    @JoinColumn(name = "trip_id", referencedColumnName = "id", nullable = false)
    @NotNull
    private Trip trip;

    private Double eurTotalCost;

    @Column(nullable = false)
    @NotNull
    private Timestamp createdAt;

    @OneToMany(mappedBy = "expenseReport")
    @JsonManagedReference
    @NotNull
    private List<ExpenseReportItem> expenseReportItems;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }

    public ExpenseReport(Integer id, Trip trip, Double eurTotalCost, Timestamp createdAt, List<ExpenseReportItem> expenseReportItems) {
        this.id = id;
        this.trip = trip;
        this.eurTotalCost = eurTotalCost;
        this.createdAt = createdAt;
        this.expenseReportItems = expenseReportItems;
    }

    public ExpenseReport() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }

    public Double getEurTotalCost() {
        return eurTotalCost;
    }

    public void setEurTotalCost(Double eurTotalCost) {
        this.eurTotalCost = eurTotalCost;
    }

    public @NotNull Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(@NotNull Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public List<ExpenseReportItem> getExpenseReportItems() {
        return expenseReportItems;
    }

    public void setExpenseReportItems(List<ExpenseReportItem> expenseReportItems) {
        this.expenseReportItems = expenseReportItems;
    }
}
