import { TripStatusDTO } from "@/api_gen";
import { tripStatusApi } from "@/apiClient";
import { useMutation } from "@tanstack/react-query";

export default function usePostTripStatus() {
  return useMutation({
    mutationFn: async (body: TripStatusDTO) => {
      const response = await tripStatusApi.createTripStatus({
        tripStatusDTO: body,
      });
      return response.data;
    },
  });
}
