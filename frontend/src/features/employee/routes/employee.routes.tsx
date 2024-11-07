import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../../routes/router";
import tripRequests from "../../../pages/TripRequests/TripRequests.page";
import pastTrips from "../../../pages/PastTrips/PastTrips.page";
import Notifications from "../../../pages/Notifications/Notifications.page";

export const tripRequestsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/trip-requests",
  component: tripRequests,
});

export const pastTripsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/past-trips",
  component: pastTrips,
});

export const notificationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/notifications",
  component: Notifications,
});
