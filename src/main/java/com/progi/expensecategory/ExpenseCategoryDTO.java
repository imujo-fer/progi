package com.progi.expensecategory;

import com.progi.expensereportitem.ExpenseReportItemInfoDTO;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
@NoArgsConstructor
public class ExpenseCategoryDTO {
    @NotNull
    private int id;
    @NotNull
    private String name;
    @NotNull
    private Double eurTotalCost;
    @NotNull
    private List<ExpenseReportItemInfoDTO> expenseReportItemInfo;

    public ExpenseCategoryDTO(int id, String name, Double eurTotalCost,
            List<ExpenseReportItemInfoDTO> expenseReportItemInfo) {
        this.id = id;
        this.name = name;
        this.eurTotalCost = eurTotalCost;
        this.expenseReportItemInfo = expenseReportItemInfo;
    }
}