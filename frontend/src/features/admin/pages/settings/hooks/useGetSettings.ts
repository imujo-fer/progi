import { companyApi } from "@/apiClient";
import { useSuspenseQuery } from "@tanstack/react-query";

export function useGetSettings() {
  return useSuspenseQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const res = await companyApi.getCompanyDetailsWithDailyWages();
      return res.data;
    },
  });
}
