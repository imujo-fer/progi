package com.progi.expensereport;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ExpenseReportRepository extends JpaRepository<ExpenseReport, Integer> {
}
