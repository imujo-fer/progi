import { expenseCategoryApi } from "@/apiClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetExpenseReportCategories() {
  return useQuery({
    queryKey: ["expense report categories"],
    queryFn: async () => {
      const response = await expenseCategoryApi.getAllExpenseCategories();
      return response.data;
    },
    retry: (failureCount) => {
      return failureCount < 1;
    },
  });
}
