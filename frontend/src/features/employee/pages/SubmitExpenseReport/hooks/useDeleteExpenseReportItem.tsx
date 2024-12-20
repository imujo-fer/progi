import { expenseReportItemApi } from "@/apiClient";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteExpenseReportItem() {
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await expenseReportItemApi.deleteExpenseReportItem({
        id: id,
      });
      return response.data;
    },
  });
}
