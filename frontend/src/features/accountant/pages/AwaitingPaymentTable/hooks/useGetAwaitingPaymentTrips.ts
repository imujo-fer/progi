import { useQuery } from "@tanstack/react-query";
import { tripApi } from "../../../../../apiClient";

export default function useGetAwaitingPaymentTrips() {
  return useQuery({
    queryKey: ["waiting payment trips"],
    queryFn: async () => {
      const resposne = await tripApi.getPaymentApprovalTrips();
      return resposne.data;
    },
  });
}