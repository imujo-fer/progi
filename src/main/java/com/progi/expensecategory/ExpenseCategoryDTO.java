package com.progi.expensecategory;

import com.progi.expensereportitem.ExpenseReportItemInfoDTO;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class ExpenseCategoryDTO {
    @NotNull
    private int id;
    @NotNull
    private String name;
    @NotNull
    private Double eurTotalCost;
    @NotNull
    private List<ExpenseReportItemInfoDTO> expenseReportItemInfo;

    public ExpenseCategoryDTO(int id, String name, Double eurTotalCost, List<ExpenseReportItemInfoDTO> expenseReportItemInfo) {
        this.id = id;
        this.name = name;
        this.eurTotalCost = eurTotalCost;
        this.expenseReportItemInfo = expenseReportItemInfo;
    }
}