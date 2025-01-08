import { useMutation } from "@tanstack/react-query";
import { UserInviteDTO } from "../../../../../api_gen";
import { userApi } from "../../../../../apiClient";
type UseInviteUserProps = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};
export default function useInviteUser({
  onSuccess,
  onError,
}: UseInviteUserProps = {}) {
  return useMutation({
    mutationFn: async (userInvite: UserInviteDTO) => {
      const response = await userApi.inviteUser({ userInviteDTO: userInvite });
      return response.data;
    },
    onSuccess,
    onError,
  });
}
