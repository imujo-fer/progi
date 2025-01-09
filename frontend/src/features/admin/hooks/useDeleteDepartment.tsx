import { useMutation } from "@tanstack/react-query";
import { departmentApi } from "../../../apiClient";
import { DepartmentControllerApiDeleteDepartmentRequest } from "@/api_gen";

type UseDeleteDepartmentProps = {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
};

type DeleteDepartmentParams = {
  id: number;
};

export default function useDeleteDepartment({
  onSuccess,
  onError,
}: UseDeleteDepartmentProps = {}) {
  return useMutation({
    mutationFn: async ({ id }: DeleteDepartmentParams) => {
      const requestParams: DepartmentControllerApiDeleteDepartmentRequest = {
        id,
      };
      const response = await departmentApi.deleteDepartment(requestParams);
      return response.data;
    },
    onSuccess,
    onError,
  });
}
