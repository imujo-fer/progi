import { useMutation } from "@tanstack/react-query";
import { TripDTO } from "../../../../../api_gen";
import { tripApi } from "../../../../../apiClient";

type UseUpdateTripProps = {
  tripId: number;
  onSuccess?: () => void;
};

export default function useUpdateTrip({
  onSuccess,
  tripId,
}: UseUpdateTripProps) {
  return useMutation({
    mutationFn: async (trip: TripDTO) => {
      const response = await tripApi.updateTrip({
        id: tripId,
        tripDTO: trip,
      });

      return response.data;
    },
    onSuccess,
  });
}
