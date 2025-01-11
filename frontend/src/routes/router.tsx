import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";

import { UserDetailsDTO } from "@/api_gen";
import {
  departmentEmployeesRoute,
  departmentRoute,
  inviteUserRoute,
} from "@/features/admin/routes/admin.rutes";
import { loginRoute } from "@/features/auth/Login/login.routes";
import { registerRoute } from "@/features/auth/Register/register.routes";
import { statisticsRoute } from "@/features/statistics/statistics.routes";
import { AuthedProviders, queryClient } from "@/providers/Providers";
import { protectedRoute } from "@/utils/protectedRoute";
import AppLayout from "../components/Layout/AppLayout.component";
import {
  awaitingPaymentRoute,
  awaitingPaymentTableRoute,
  expenseReviewRequestRoute,
  expenseReviewRequestsRoute,
} from "../features/accountant/routes/accountant.routes";
import {
  departmentApprovalRequestReviewRoute,
  departmentApprovalRequestsRoute,
} from "../features/departmentHead/routes/departmentHead.routes";
import {
  directorApproveTripRoute,
  reviewTripsRoute,
} from "../features/director/routes/director.routes";
import {
  _tripRequestsRoute,
  expenseReportRoute,
  notificationsRoute,
  tripRequestsCreateRoute,
  tripRequestsEditRoute,
  tripRequestsRoute,
} from "../features/employee/routes/employee.routes";

export const rootRoute = createRootRouteWithContext<RootRouteContext>()();

export const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: ({ context }) => {
    protectedRoute({ context });
  },
  component: () => (
    <AuthedProviders>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </AuthedProviders>
  ),
});

export const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([
    _tripRequestsRoute.addChildren([
      tripRequestsRoute,
      tripRequestsCreateRoute,
      tripRequestsEditRoute,
    ]),
    notificationsRoute,
    departmentApprovalRequestsRoute.addChildren([
      departmentApprovalRequestReviewRoute,
    ]),
    awaitingPaymentTableRoute,
    expenseReviewRequestsRoute,
    reviewTripsRoute,
    directorApproveTripRoute,
    statisticsRoute,
    inviteUserRoute,
    departmentEmployeesRoute,
    departmentRoute,
    expenseReportRoute,
    expenseReviewRequestRoute,
    awaitingPaymentRoute,
  ]),
  loginRoute,
  registerRoute,
]);

export type RootRouteContext = {
  queryClient: QueryClient;
  user: UserDetailsDTO | null;
};

export const router = createRouter({
  routeTree,
  context: { queryClient, user: null },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
