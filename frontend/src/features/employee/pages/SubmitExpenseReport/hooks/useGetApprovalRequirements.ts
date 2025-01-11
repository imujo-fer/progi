import { tripApi } from "@/apiClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetApprovalRequirements({
  tripId,
}: {
  tripId: number;
}) {
  return useQuery({
    queryKey: ["approval requirements"],
    queryFn: async () => {
      const response = await tripApi.getTripStatus({ id: tripId });
      return response.data;
    },
  });
}
