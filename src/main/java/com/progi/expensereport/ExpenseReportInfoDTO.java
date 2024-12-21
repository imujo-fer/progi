package com.progi.expensereport;

import com.progi.expensecategory.ExpenseCategoryDTO;

import com.progi.trip.TripDTO;
import com.progi.user.dto.UserDetailsDTO;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class ExpenseReportInfoDTO {
    @NotNull
    private UserDetailsDTO user;
    @NotNull
    private TripDTO trip;
    @NotNull
    private List<ExpenseCategoryDTO> expenseCategory;
    @NotNull
    private DailyWageDTO dailyWage;

    @NotNull
    private Double eurExpenseSum;

    public ExpenseReportInfoDTO(UserDetailsDTO user, TripDTO trip, List<ExpenseCategoryDTO> expenseCategory, DailyWageDTO dailyWage, Double eurExpenseSum) {
        this.user = user;
        this.trip = trip;
        this.expenseCategory = expenseCategory;
        this.dailyWage = dailyWage;
        this.eurExpenseSum = eurExpenseSum;
    }
}
