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
      console.log({ location });
      if (!location) return;
      const response = await googleMapsApi.getLocationInfo({ location });
      return response.data;
    },
  });
}
