import { tripStatusApi } from "@/apiClient";
import { useMutation } from "@tanstack/react-query";

export default function useRequestRevision() {
  return useMutation({
    mutationFn: async (tripId: number) => {
      const response = await tripStatusApi.createTripStatus({tripStatusDTO: {tripId, status: "DEPARTMENT_APPROVAL_REJECTED", message: ""}});
      return response.data;
    }
  });
}