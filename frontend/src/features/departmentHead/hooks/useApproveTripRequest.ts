import { tripStatusApi } from "@/apiClient";
import { useMutation } from "@tanstack/react-query";

export default function useApproveTripRequest() {
  return useMutation({
    mutationFn: async (tripId: number) => {
      const response = await tripStatusApi.createTripStatus({tripStatusDTO: {tripId, status: "TRAVEL_APPROVED"}});
      return response.data;
    }
  });
}