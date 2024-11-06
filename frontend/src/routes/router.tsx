import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import {
  employeeRoute,
  newTripRoute,
} from "../features/employee/routes/employee.routes";

const queryClient = new QueryClient();

export const rootRoute = createRootRouteWithContext<RootRouteContext>()({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  ),
});

export const routeTree = rootRoute.addChildren([
  employeeRoute.addChildren([newTripRoute]),
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
