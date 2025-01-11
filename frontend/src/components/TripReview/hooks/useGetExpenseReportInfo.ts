import { expenseReportApi } from "@/apiClient";
import { useQuery } from "@tanstack/react-query";

type UseGetExpenseReportInfoProps = {
  expenseReportId: number;
};

export function useGetExpenseReportInfo({
  expenseReportId,
}: UseGetExpenseReportInfoProps) {
  return useQuery({
    queryKey: ["expenseReport", expenseReportId, "info"],
    queryFn: async () => {
      const response = await expenseReportApi.getExpenseReportInfo({
        id: expenseReportId,
      });
      return response.data;
    },
  });
}
