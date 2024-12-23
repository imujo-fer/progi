import { createRoute } from "@tanstack/react-router";
import { layoutRoute } from "../../../routes/router";
import ReviewTrips from "../pages/ReviewTrips/ReviewTrips.page";

export const reviewTripsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/review-trips",
  component: ReviewTrips,
});
