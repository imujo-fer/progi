import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";

import { UserDetailsDTO } from "@/api_gen";
import { loginRoute } from "@/features/auth/Login/login.routes";
import { registerRoute } from "@/features/auth/Register/register.routes";
import Export from "@/features/export/Export.page";
import { AuthedProviders, queryClient } from "@/providers/Providers";
import { protectedRoute } from "@/utils/protectedRoute";
import AppLayout from "../components/Layout/AppLayout.component";
import {
  awaitingPaymentRoute,
  expenseReviewRequestsRoute,
} from "../features/accountant/routes/accountant.routes";
import { departmentApprovalRequestsRoute } from "../features/departmentHead/routes/departmentHead.routes";
import { reviewTripsRoute } from "../features/director/routes/director.routes";
import {
  _tripRequestsRoute,
  notificationsRoute,
  pastTripsRoute,
  tripRequestsCreateRoute,
  tripRequestsEditRoute,
  tripRequestsRoute,
} from "../features/employee/routes/employee.routes";
import { statisticsRoute } from "@/features/statistics/statistics.routes";
import { inviteUserRoute } from "@/features/admin/routes/admin.rutes";
import { departmentEmployeesRoute } from "@/features/admin/routes/admin.rutes";

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

const exportRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pdf",
  component: Export,
});

export const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([
    _tripRequestsRoute.addChildren([
      tripRequestsRoute,
      tripRequestsCreateRoute,
      tripRequestsEditRoute,
    ]),
    pastTripsRoute,
    notificationsRoute,
    departmentApprovalRequestsRoute,
    awaitingPaymentRoute,
    expenseReviewRequestsRoute,
    reviewTripsRoute,
    statisticsRoute,
    inviteUserRoute,
    departmentEmployeesRoute,
  ]),
  exportRoute,
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
