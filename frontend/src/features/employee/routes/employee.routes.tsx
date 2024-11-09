import { createRoute } from "@tanstack/react-router";
import { layoutRoute } from "../../../routes/router";
import TripRequests from "../pages/TripRequests/TripRequests.page";
import pastTrips from "../pages/PastTrips/PastTrips.page";
import Notifications from "../pages/Notifications/Notifications.page";
import TripRequestCreatePage from "../pages/TripRequestForm/TripRequestCreate.page";

export const _tripRequestsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/trip-requests",
});

export const tripRequestsRoute = createRoute({
  getParentRoute: () => _tripRequestsRoute,
  path: "/",
  component: TripRequests,
});

export const tripRequestsCreateRoute = createRoute({
  getParentRoute: () => _tripRequestsRoute,
  path: "/create",
  component: TripRequestCreatePage,
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
