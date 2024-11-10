import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";

import { UserDetailsDTO } from "@/api_gen";
import { AuthedProviders, queryClient } from "@/providers/Providers";
import { protectedRoute } from "@/utils/protectedRoute";
import AppLayout from "../components/Layout/AppLayout.component";
import {
  awaitingPaymentRoute,
  expenseReviewRequestsRoute,
} from "../features/accountant/routes/accountant.routes";
import {
  departmentApprovalRequestsRoute,
  departmentStatisticsRoute,
} from "../features/departmentHead/routes/departmentHead.routes";
import {
  reviewTripsRoute,
  statisticsRoute,
} from "../features/director/routes/director.routes";
import {
  _tripRequestsRoute,
  notificationsRoute,
  pastTripsRoute,
  tripRequestsCreateRoute,
  tripRequestsEditRoute,
  tripRequestsRoute,
} from "../features/employee/routes/employee.routes";
import { loginRoute } from "@/pages/Login/login.routes";

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
    pastTripsRoute,
    notificationsRoute,
    departmentApprovalRequestsRoute,
    departmentStatisticsRoute,
    awaitingPaymentRoute,
    expenseReviewRequestsRoute,
    reviewTripsRoute,
    statisticsRoute,
  ]),
  loginRoute,
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
