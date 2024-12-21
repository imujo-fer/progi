import { createRoute } from "@tanstack/react-router";
import { layoutRoute } from "../../../routes/router";
import DepartmentStatistics from "../pages/DepartmentStatistics/DepartmentStatistics.page";
import DepartmentApprovalRequests from "../pages/DepartmentApprovalRequests/DepartmentApprovalRequests.page";
import DepartmentApprovalRequestReview from "../pages/DepartmentApprovalRequests/DepartmentApprovalRequestReview/DepartmentApprovalRequestReview.page";

export const departmentApprovalRequestsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/department-approval-requests",
  component: DepartmentApprovalRequests,
});

export const departmentApprovalRequestReviewRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/department-approval-requests/$id/review",
  component: DepartmentApprovalRequestReview,
});

export const departmentStatisticsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/department-statistics",
  component: DepartmentStatistics,
});
