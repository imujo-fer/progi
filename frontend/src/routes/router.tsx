import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import SidebarNav from "../components/SidebarNav.component";
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

const queryClient = new QueryClient();

export const rootRoute = createRootRouteWithContext<RootRouteContext>()({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  ),
});

export const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: SidebarNav,
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
