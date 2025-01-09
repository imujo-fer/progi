import { createRoute } from "@tanstack/react-router";
import { layoutRoute } from "../../../routes/router";
import InviteUserForm from "../pages/inviteUser/InviteUserForm";
import DepartmentEmployeesTable from "../pages/employees/DepartmentEmployeesTable";
import { coerceToNumber } from "@/utils/coerceToNumber";
import DepartmentsTable from "../pages/departments/DepartmentsTable";

export const inviteUserRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/invite-user",
  component: InviteUserForm,
});

export const departmentRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/departments",
  component: DepartmentsTable,
});

export const departmentEmployeesRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/departments/$id",
  beforeLoad: async ({ params }) => {
    const id = coerceToNumber(params.id);
    return { id };
  },
  component: DepartmentEmployeesTable,
});
