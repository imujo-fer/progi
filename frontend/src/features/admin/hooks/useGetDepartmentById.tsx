import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { departmentApi } from "../../../apiClient";
import { DepartmentDTO } from "@/api_gen";

type UseGetDepartmentByIdProps = {
  id: number;
  onSuccess?: (data: DepartmentDTO) => void;
};

export default function useGetDepartmentById({
  id,
  onSuccess,
}: UseGetDepartmentByIdProps) {
  const query = useQuery({
    queryKey: ["department", id],
    queryFn: async () => {
      const response = await departmentApi.getDepartmentById({ id }); // Prosleđivanje objekta
      return response.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (!query.data) return;

    onSuccess?.(query.data);
  }, [query.data, onSuccess]);

  return query;
}
