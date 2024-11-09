import { companyApi } from "@/apiClient";
import { useQuery } from "@tanstack/react-query";

export default function useGetCompanyDetails() {
  return useQuery({
    queryKey: ["company"],
    queryFn: async () => {
      const response = await companyApi.getCompanyDetails();
      return response.data;
    },
  });
}
