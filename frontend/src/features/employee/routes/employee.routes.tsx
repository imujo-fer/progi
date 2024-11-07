import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../../routes/router";
import SidebarNav from "../../../components/SidebarNav.component";
import tripRequests from "../pages/TripRequests.page";
import pastTrips from "../pages/PastTrips.page";
import Notifications from "../pages/Notifications.page";

export const employeeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/employee",
  component: SidebarNav,
});

export const newTripRoute = createRoute({
  getParentRoute: () => employeeRoute,
  path: "/trip",
  component: SidebarNav,
});

export const tripRequestsRoute = createRoute({
  getParentRoute: () => employeeRoute,
  path: "/trip-requests",
  component: tripRequests,
});

export const pastTripsRoute = createRoute({
  getParentRoute: () => employeeRoute,
  path: "/past-trips",
  component: pastTrips,
});

export const notificationsRoute = createRoute({
  getParentRoute: () => employeeRoute,
  path: "/notifications",
  component: Notifications,
});
