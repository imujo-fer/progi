import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { departmentApi } from "../../../../../apiClient"; // Adjust the path if necessary
import { DepartmentDTO } from "@/api_gen";

type UseGetDepartmentsProps = {
  onSuccess?: (data: DepartmentDTO[]) => void;
};

export default function useGetDepartments({
  onSuccess,
}: UseGetDepartmentsProps) {
  const query = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const response = await departmentApi.getAllDepartments();
      return response.data;
    },
  });

  useEffect(() => {
    if (!query.data) return;

    onSuccess?.(query.data);
  }, [query.data]);

  return query;
}
