import { ExpenseReportItemControllerApiCreateExpenseReportItemRequest } from "@/api_gen";
import { expenseReportItemApi } from "@/apiClient";
import { useMutation } from "@tanstack/react-query";

export default function usePostExpenseReportItem() {
  return useMutation({
    mutationFn: async (
      item: ExpenseReportItemControllerApiCreateExpenseReportItemRequest
    ) => {
      const response = await expenseReportItemApi.createExpenseReportItem(item);
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Mutation successful:", data);
    },
  });
}
