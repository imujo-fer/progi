import { layoutRoute } from "@/routes/router";
import { createRoute } from "@tanstack/react-router";
import { z } from "zod";
import Statistics, { StatisticsTabEnum } from "./Statistics.page";

const statisticsRouteSearchValidate = z.object({
  tab: z
    .nativeEnum(StatisticsTabEnum)
    .default(StatisticsTabEnum.COST_PER_MONTH)
    .optional(),
});

export const statisticsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/statistics",
  component: Statistics,
  validateSearch: statisticsRouteSearchValidate,
});
