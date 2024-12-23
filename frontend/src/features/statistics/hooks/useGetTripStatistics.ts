import { statisticsApi } from "@/apiClient";
import { useQuery } from "@tanstack/react-query";

type UseGetTripStatisticsProps = {
  year: number;
};
export default function useGetTripStatistics({
  year,
}: UseGetTripStatisticsProps) {
  return useQuery({
    queryKey: ["trip-statistics", year],
    queryFn: async () => {
      const response = await statisticsApi.getNumberOfTripsStatisticsByYear({
        year,
      });
      return response.data;
    },
  });
}
