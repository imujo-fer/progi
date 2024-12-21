import { createRoute } from "@tanstack/react-router";
import { layoutRoute } from "../../../routes/router";
import DepartmentApprovalRequests from "../pages/DepartmentApprovalRequests/DepartmentApprovalRequests.page";
import DepartmentApprovalRequestReview from "../pages/DepartmentApprovalRequests/DepartmentApprovalRequestReview/DepartmentApprovalRequestReview.page";
import Statistics from "@/features/statistics/Statistics.page";

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

export const statisticsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/department-statistics",
  component: Statistics,
});
