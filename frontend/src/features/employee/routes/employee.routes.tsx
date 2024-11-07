import { createRoute } from "@tanstack/react-router";
import { layoutRoute } from "../../../routes/router";
import tripRequests from "../../../pages/TripRequests/TripRequests.page";
import pastTrips from "../../../pages/PastTrips/PastTrips.page";
import Notifications from "../../../pages/Notifications/Notifications.page";

export const tripRequestsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/trip-requests",
  component: tripRequests,
});

export const pastTripsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/past-trips",
  component: pastTrips,
});

export const notificationsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/notifications",
  component: Notifications,
});
