import { useMutation } from "@tanstack/react-query";
import { departmentApi } from "../../../apiClient";
import {
  DepartmentControllerApiCreateDepartmentRequest,
  CreateDepartmentDTO,
} from "@/api_gen";

type UseCreateDepartmentProps = {
  onSuccess?: (data: any) => void;
  onError?: (error: unknown) => void;
};

export default function useCreateDepartment({
  onSuccess,
  onError,
}: UseCreateDepartmentProps = {}) {
  return useMutation({
    mutationFn: async (departmentData: CreateDepartmentDTO) => {
      const requestParams: DepartmentControllerApiCreateDepartmentRequest = {
        createDepartmentDTO: departmentData,
      };
      const response = await departmentApi.createDepartment(requestParams);
      return response.data;
    },
    onSuccess,
    onError,
  });
}
