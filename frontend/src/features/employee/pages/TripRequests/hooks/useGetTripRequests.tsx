import { useQuery } from "@tanstack/react-query";
import { tripApi } from "../../../../../apiClient";

export default function useGetTripRequests() {
  return useQuery({
    queryKey: ["tripRequests"],
    queryFn: async () => {
      const resposne = await tripApi.tmpGetAllTrips();
      return resposne.data;
    },
  });
}
