import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../../routes/router";
import SidebarNav from "../../../components/SidebarNav.component";

export const employeeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/employee",
  component: SidebarNav,
});

export const newTripRoute = createRoute({
  getParentRoute: () => employeeRoute,
  path: "/trip",
});
