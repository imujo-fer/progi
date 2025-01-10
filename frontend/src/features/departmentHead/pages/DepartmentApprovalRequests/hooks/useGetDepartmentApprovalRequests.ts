import { tripApi } from "@/apiClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetDepartmentApprovalRequests() {
  return useQuery({
    queryKey: ["department approval requests"],
    queryFn: async () => {
      const response = await tripApi.getDepartmentApprovalTrips();
      return response.data;
    },
  });
}
