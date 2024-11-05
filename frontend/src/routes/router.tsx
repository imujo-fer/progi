import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  createRouter,
  Outlet,
} from "@tanstack/react-router";

const queryClient = new QueryClient();

export const rootRoute = createRootRouteWithContext<RootRouteContext>()({
  component: () => (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  ),
});

export const routeTree = rootRoute.addChildren([]);

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
