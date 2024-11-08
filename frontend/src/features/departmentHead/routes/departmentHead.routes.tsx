import { createRoute } from "@tanstack/react-router";
import { layoutRoute } from "../../../routes/router";
import DepartmentStatistics from "../pages/DepartmentStatistics/DepartmentStatistics.page";
import DepartmentApprovalRequests from "../pages/DepartmentApprovalRequests/DepartmentApprovalRequests.page";

export const departmentApprovalRequestsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/department-approval-requests",
  component: DepartmentApprovalRequests,
});

export const departmentStatisticsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/department-statistics",
  component: DepartmentStatistics,
});
