package com.progi.receipt;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.progi.expensereportitem.ExpenseReportItem;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "receipts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
}
