import { useMutation } from "@tanstack/react-query";
import { userApi } from "../../../apiClient";
import {
  UserEditDTO,
  UserControllerApiUpdateUserRequest,
} from "../../../api_gen";

type UseUpdateUserProps = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

export default function useUpdateUser({
  onSuccess,
  onError,
}: UseUpdateUserProps = {}) {
  return useMutation({
    mutationFn: async (userUpdate: { userId: number; data: UserEditDTO }) => {
      const { userId, data } = userUpdate;
      const requestParams: UserControllerApiUpdateUserRequest = {
        userId,
        userEditDTO: data,
      };
      const response = await userApi.updateUser(requestParams);
      return response.data;
    },
    onSuccess,
    onError,
  });
}
