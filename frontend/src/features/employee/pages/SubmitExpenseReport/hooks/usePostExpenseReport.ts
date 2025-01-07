import { expenseReportApi } from "@/apiClient";
import { useMutation } from "@tanstack/react-query";

export default function usePostExpenseReport() {
  return useMutation({
    mutationFn: async (tripId: number) => {
        console.log("tripId", tripId);
      const response = await expenseReportApi.createExpenseReport({tripId: tripId});
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Mutation successful:", data);
    },
  });
}