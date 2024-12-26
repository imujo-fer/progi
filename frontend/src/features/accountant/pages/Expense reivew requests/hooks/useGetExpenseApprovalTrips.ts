import { useQuery } from "@tanstack/react-query";
import { tripApi } from "../../../../../apiClient";

export default function useGetExpenseApprovalTrips() {
  return useQuery({
    queryKey: ["expense approval trips"],
    queryFn: async () => {
      const resposne = await tripApi.getExpenseApprovalTrips();
      return resposne.data;
    },
  });
}