import { useQuery } from "@tanstack/react-query";
import { userApi } from "../apiClient";
import { UserControllerApiGetUserDetailsByRegistrationHashRequest } from "src/api_gen/apis/user-controller-api";

export default function useGetUserRegisterInfo(
  registrationHashRequest: UserControllerApiGetUserDetailsByRegistrationHashRequest
) {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await userApi.getUserDetailsByRegistrationHash(
        registrationHashRequest
      );
      return response.data;
    },
  });
}
