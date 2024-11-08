import { createRoute } from "@tanstack/react-router";
import { layoutRoute } from "../../../routes/router";
import ReviewTrips from "../pages/ReviewTrips/ReviewTrips.page";
import Statistics from "../pages/Statistics/Statistics.page";

export const reviewTripsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/review-trips",
  component: ReviewTrips,
});

export const statisticsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/statistics",
  component: Statistics,
});
