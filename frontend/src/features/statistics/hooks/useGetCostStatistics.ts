import { statisticsApi } from "@/apiClient";
import { useQuery } from "@tanstack/react-query";

type UseGetCostStatisticsProps = {
  year: number;
};
export default function useGetCostStatistics({
  year,
}: UseGetCostStatisticsProps) {
  return useQuery({
    queryKey: ["cost-statistics", year],
    queryFn: async () => {
      const response = await statisticsApi.getCostStatisticsByYear({ year });
      return response.data;
    },
  });
}
