import { createRoute } from "@tanstack/react-router";
import { layoutRoute } from "../../../routes/router";
import DepartmentApprovalRequests from "../pages/DepartmentApprovalRequests/DepartmentApprovalRequests.page";

export const departmentApprovalRequestsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/department-approval-requests",
  component: DepartmentApprovalRequests,
});
