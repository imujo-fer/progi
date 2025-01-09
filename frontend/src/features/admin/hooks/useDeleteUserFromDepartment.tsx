import { useMutation } from "@tanstack/react-query";
import { departmentApi } from "../../../apiClient";

type UseDeleteUserProps = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

export default function useDeleteUser({
  onSuccess,
  onError,
}: UseDeleteUserProps = {}) {
  return useMutation({
    mutationFn: async ({
      userId,
      departmentId,
    }: {
      userId: number;
      departmentId: number;
    }) => {
      const requestParams = {
        departmentId,
        id: userId, // `id` odgovara `userId`
      };
      const response = await departmentApi.deleteEmployeeById(requestParams);
      return response.data;
    },
    onSuccess,
    onError,
  });
}
