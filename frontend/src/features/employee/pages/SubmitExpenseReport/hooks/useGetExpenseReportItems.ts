import { expenseReportApi } from "@/apiClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetExpenseReportItems(id: number) {
  return useQuery({
    queryKey: ["expense report items", id],
    queryFn: async () => {
      const response = await expenseReportApi.getExpenseReportItems({ id: id });
      return response.data;
    },
  });
}
