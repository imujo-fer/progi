import { expenseReportApi } from "@/apiClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetExpenseReportItems() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await expenseReportApi.getExpenseReportItems({ id: 1 });
      return response.data;
    },
    retry: (failureCount) => {
      return failureCount < 1;
    },
  });
}
