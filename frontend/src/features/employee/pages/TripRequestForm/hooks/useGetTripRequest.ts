import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { tripApi } from "../../../../../apiClient";
import { TripWithCountryDTO } from "@/api_gen";

type UseGetTripRequestProps = {
  tripId: number;
  onSuccess?: (data: TripWithCountryDTO) => void;
};

export default function useGetTripRequest({
  tripId,
  onSuccess,
}: UseGetTripRequestProps) {
  const query = useQuery({
    queryKey: ["tripRequest", tripId],
    queryFn: async () => {
      const response = await tripApi.getTripById({
        id: tripId,
      });
      return response.data;
    },
  });

  useEffect(() => {
    if (!query.data) return;

    onSuccess?.(query.data);
  }, [query.data]);

  return query;
}
