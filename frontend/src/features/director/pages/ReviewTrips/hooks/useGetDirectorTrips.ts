import { useQuery } from "@tanstack/react-query";
import { tripApi } from "../../../../../apiClient";

export default function useGetDirectorTrips() {
  return useQuery({
    queryKey: ["trips", "director"],
    queryFn: async () => {
      const resposne = await tripApi.getDirectorApprovalTrips();
      return resposne.data;
    },
  });
}
