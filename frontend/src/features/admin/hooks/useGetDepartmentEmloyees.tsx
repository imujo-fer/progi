import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { departmentApi } from "../../../../../apiClient";
import { User } from "@/api_gen";

type UseGetDepartmentEmployeesProps = {
  departmentId: number;
  onSuccess?: (data: User[]) => void;
};

export default function useGetDepartmentEmployees({
  departmentId,
  onSuccess,
}: UseGetDepartmentEmployeesProps) {
  const query = useQuery({
    queryKey: ["departmentEmployees", departmentId],
    queryFn: async () => {
      const response = await departmentApi.getEmployeesByDepartmentId({
        id: departmentId,
      });
      return response.data.map((employee: any) => ({
        ...employee,
        registrationHash: employee.registrationHash || "", // Ensure compatibility with `User`
      }));
    },
    enabled: !!departmentId,
  });

  useEffect(() => {
    if (!query.data) return;

    onSuccess?.(query.data);
  }, [query.data]);

  return query;
}
