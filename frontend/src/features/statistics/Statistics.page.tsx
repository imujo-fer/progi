import { Tabs, TabsProps } from "antd";
import { directorStatisticsRoute } from "../director/routes/director.routes";
import { Link } from "@tanstack/react-router";
import CostStatistics from "./CostStatistics.component";
import TripStatistics from "./TripStatistics.component";
import EmployeeStatistics from "./EmployeeStatistics.component";

export const StatisticsTabEnum = {
  COST_PER_MONTH: "cost-per-month",
  TRIPS_PER_MONTH: "trips-per-month",
  PER_EMPLOYEE: "per-employee",
} as const;

export type StatisticsTabEnum =
  (typeof StatisticsTabEnum)[keyof typeof StatisticsTabEnum];

export default function Statistics() {
  const { tab } = directorStatisticsRoute.useSearch();

  const tabItems: TabsProps["items"] = [
    {
      key: StatisticsTabEnum.COST_PER_MONTH,
      label: (
        <Link
          from={directorStatisticsRoute.id}
          replace
          search={{ tab: StatisticsTabEnum.COST_PER_MONTH }}
        >
          Cost per month
        </Link>
      ),
      children: <CostStatistics />,
    },
    {
      key: StatisticsTabEnum.TRIPS_PER_MONTH,
      label: (
        <Link
          from={directorStatisticsRoute.id}
          replace
          search={{ tab: StatisticsTabEnum.TRIPS_PER_MONTH }}
        >
          Trips per month
        </Link>
      ),
      children: <TripStatistics />,
    },
    {
      key: StatisticsTabEnum.PER_EMPLOYEE,
      label: (
        <Link
          from={directorStatisticsRoute.id}
          replace
          search={{ tab: StatisticsTabEnum.PER_EMPLOYEE }}
        >
          Per employee
        </Link>
      ),
      children: <EmployeeStatistics />,
    },
  ];
  return (
    <div>
      <h1>Statistics</h1>
      <Tabs activeKey={tab} items={tabItems} />
    </div>
  );
}
