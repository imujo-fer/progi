package com.progi.expensereport;


import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.progi.expensereportitem.ExpenseReportItem;
import com.progi.trip.Trip;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "expense_reports")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    private List<ExpenseReportItem> expenseReportItems;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }

}
