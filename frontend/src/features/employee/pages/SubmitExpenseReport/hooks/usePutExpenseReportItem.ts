import { ExpenseReportItemControllerApiUpdateExpenseReportItemRequest } from "@/api_gen";
import { expenseReportItemApi } from "@/apiClient";
import { useMutation } from "@tanstack/react-query";

export default function usePutExpenseReportItem() {
  return useMutation({
    mutationFn: async (
      item: ExpenseReportItemControllerApiUpdateExpenseReportItemRequest
    ) => {
      const response = await expenseReportItemApi.updateExpenseReportItem(item);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Mutation successful:", data);
    },
  });
}
