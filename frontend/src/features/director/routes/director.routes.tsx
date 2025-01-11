import { coerceToNumber } from "@/utils/coerceToNumber";
import { createRoute } from "@tanstack/react-router";
import { layoutRoute } from "../../../routes/router";
import ReviewTrip from "../pages/ReviewTrip/ReviewTrip.page";
import ReviewTrips from "../pages/ReviewTrips/ReviewTrips.page";

export const reviewTripsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/review-trips",
  component: ReviewTrips,
});

export const directorApproveTripRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/review-trips/$tripId/$expenseReportId",
  beforeLoad: ({ params }) => {
    const expenseReportId = coerceToNumber(params.expenseReportId);
    const tripId = coerceToNumber(params.tripId);

    return {
      expenseReportId,
      tripId,
    };
  },
  component: ReviewTrip,
});
