import { statisticsApi } from "@/apiClient";
import { useQuery } from "@tanstack/react-query";

type UseGetEmployeeStatisticsProps = {
  dateFrom?: Date;
  dateTo?: Date;
};
export default function useGetEmployeeStatistics({
  dateFrom,
  dateTo,
}: UseGetEmployeeStatisticsProps) {
  return useQuery({
    queryKey: ["employee-statistics", dateFrom, dateTo],
    queryFn: async () => {
      const response = await statisticsApi.getUserStatistics({
        dateFrom: dateFrom?.toString(),
        dateTo: dateTo?.toString(),
      });
      return response.data;
    },
  });
}
