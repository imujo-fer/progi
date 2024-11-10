import { useQuery } from "@tanstack/react-query";
import { userApi } from "../apiClient";

export default function useGetCurrentUserInfo() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await userApi.getUser();
      return response.data;
    },
  });
}
