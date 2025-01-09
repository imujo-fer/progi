import { useMutation } from "@tanstack/react-query";
import { departmentApi } from "../../../apiClient";
import { DepartmentControllerApiUpdateDepartmentRequest } from "@/api_gen";

type UseEditDepartmentProps = {
  onSuccess?: (data: any) => void;
  onError?: (error: unknown) => void;
};

type EditDepartmentParams = {
  id: number;
  name: string;
};

export default function useEditDepartment({
  onSuccess,
  onError,
}: UseEditDepartmentProps = {}) {
  return useMutation({
    mutationFn: async ({ id, name }: EditDepartmentParams) => {
      const requestParams: DepartmentControllerApiUpdateDepartmentRequest = {
        id,
        name,
      };
      const response = await departmentApi.updateDepartment(requestParams);
      return response.data;
    },
    onSuccess,
    onError,
  });
}
