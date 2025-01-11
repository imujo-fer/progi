import { UpdateCompanyDTO } from "@/api_gen";
import { companyApi } from "@/apiClient";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd";

export function usePatchSettings() {
  return useMutation({
    mutationFn: async (data: UpdateCompanyDTO) => {
      const response = await companyApi.updateCompanySettings({
        updateCompanyDTO: data,
      });
      return response.data;
    },
    onSuccess: () => {
      message.success("Settings updated successfully");
    },
  });
}
