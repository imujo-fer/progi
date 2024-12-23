import { createRoute } from "@tanstack/react-router";
import { layoutRoute } from "../../../routes/router";
import ReviewTrips from "../pages/ReviewTrips/ReviewTrips.page";
import Statistics, {
  StatisticsTabEnum,
} from "@/features/statistics/Statistics.page";
import { z } from "zod";

export const reviewTripsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/review-trips",
  component: ReviewTrips,
});

const statisticsRouteSearchValidate = z.object({
  tab: z
    .nativeEnum(StatisticsTabEnum)
    .default(StatisticsTabEnum.COST_PER_MONTH)
    .optional(),
});

export const directorStatisticsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/statistics",
  component: Statistics,
  validateSearch: statisticsRouteSearchValidate,
});
