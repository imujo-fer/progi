import { GetEmployeeTripsByStatusStatusEnum } from "@/api_gen/apis/trip-controller-api";
import { tripApi } from "@/apiClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetTripsByStatus(
  status?: GetEmployeeTripsByStatusStatusEnum | undefined
) {
  return useQuery({
    queryKey: ["trips", "status"],
    queryFn: async () => {
      if (status) {
        const response = await tripApi.getEmployeeTripsByStatus({
          status: status as GetEmployeeTripsByStatusStatusEnum,
        });

        return response.data;
      } else {
        const response = await tripApi.getEmployeeTripsByStatus();
        return response.data;
      }
    },
    retry(failureCount) {
      return failureCount < 2;
    },
  });
}
