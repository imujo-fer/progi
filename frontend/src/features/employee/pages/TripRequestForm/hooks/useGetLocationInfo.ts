import { useQuery } from "@tanstack/react-query";
import { googleMapsApi } from "../../../../../apiClient";

type UseGetLocationInfoProps = {
  location: string;
};

export default function useGetLocationInfo({
  location,
}: UseGetLocationInfoProps) {
  return useQuery({
    queryKey: ["location", location],
    queryFn: async () => {
      const response = await googleMapsApi.getLocationInfo({ location });
      return response.data;
    },
    enabled: !!location && !!location.length,
  });
}
