import { tripApi } from "@/apiClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetApprovalRequirements() {
  return useQuery({
    queryKey: ["approval requirements"],
    queryFn: async () => {
      const response = await tripApi.getTripStatus({ id: 5 });
      return response.data;
    },
  });
}
