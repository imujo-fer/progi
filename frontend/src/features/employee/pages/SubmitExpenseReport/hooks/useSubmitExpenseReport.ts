import { TripStatusDTOStatusEnum } from "@/api_gen";
import { tripStatusApi } from "@/apiClient";
import { useMutation } from "@tanstack/react-query";

export default function useSubmitExpenseReport() {
  return useMutation({
    mutationFn: async (tripId: number) => {
      const response = await tripStatusApi.createTripStatus({
        tripStatusDTO: {
          tripId,
          status: TripStatusDTOStatusEnum.PendingExpenseApproval,
        },
      });
      return response.data;
    },
  });
}
