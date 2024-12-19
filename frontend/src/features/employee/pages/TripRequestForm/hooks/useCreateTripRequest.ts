import { useMutation } from "@tanstack/react-query";
import { TripDTO } from "../../../../../api_gen";
import { tripApi } from "../../../../../apiClient";

type UseCreateTripProps = {
  onSuccess?: () => void;
};

export default function useCreateTrip({
  onSuccess,
}: UseCreateTripProps | undefined = {}) {
  return useMutation({
    mutationFn: async (trip: TripDTO) => {
      const response = await tripApi.createTrip({
        tripDTO: trip,
      });

      return response.data;
    },
    onSuccess,
  });
}
