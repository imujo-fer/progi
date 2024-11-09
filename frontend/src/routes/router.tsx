import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";

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
import { AuthedProviders, Providers, queryClient } from "@/providers/Providers";

export const rootRoute = createRootRouteWithContext<RootRouteContext>()({
  component: () => (
    <Providers>
      <Outlet />
    </Providers>
  ),
});

export const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
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
]);

type RootRouteContext = {
  queryClient: QueryClient;
};

export const router = createRouter({
  routeTree,
  context: { queryClient },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
