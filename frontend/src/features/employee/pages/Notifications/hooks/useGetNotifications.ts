import { tripStatusApi } from "@/apiClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetNotifications() {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await tripStatusApi.getNotifications();
      return response.data;
    },
    retry: (failureCount) => {
      return failureCount < 1;
    },
  });
}
