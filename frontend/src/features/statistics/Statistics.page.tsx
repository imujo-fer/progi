import { Link } from "@tanstack/react-router";
import { Tabs, TabsProps } from "antd";
import CostStatistics from "./CostStatistics.component";
import { statisticsRoute } from "./statistics.routes";
import TripStatistics from "./TripStatistics.component";
import EmployeeStatistics from "./EmployeeStatistics.component";
import Title from "antd/es/typography/Title";

export const StatisticsTabEnum = {
  COST_PER_MONTH: "cost-per-month",
  TRIPS_PER_MONTH: "trips-per-month",
  PER_EMPLOYEE: "per-employee",
} as const;

export type StatisticsTabEnum =
  (typeof StatisticsTabEnum)[keyof typeof StatisticsTabEnum];

export default function Statistics() {
  const { tab } = statisticsRoute.useSearch();

  const tabItems: TabsProps["items"] = [
    {
      key: StatisticsTabEnum.COST_PER_MONTH,
      label: (
        <Link
          from={statisticsRoute.id}
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
          from={statisticsRoute.id}
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
          from={statisticsRoute.id}
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
      <Title level={2}>Statistics</Title>
      <Tabs activeKey={tab} items={tabItems} />
    </div>
  );
}
