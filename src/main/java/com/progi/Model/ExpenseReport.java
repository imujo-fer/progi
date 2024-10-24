package com.progi.Model;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "expense_reports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExpenseReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    @JoinColumn(name = "trip_id", referencedColumnName = "id")
    private Trip trip;

    private Double eurTotalCost;//nullable

    @Column(nullable = false)
    @NotNull
    private Timestamp createdAt;

    @OneToMany(mappedBy = "expenseReport")
    private List<ExpenseReportItem> expenseReportItems;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }

}
