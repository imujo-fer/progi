import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../../routes/router";
import Sidebar from "../components/Sidebar";

export const employeeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/employee",
  component: Sidebar,
});

export const newTripRoute = createRoute({
  getParentRoute: () => employeeRoute,
  path: "/trip",
  component: Sidebar,
});
