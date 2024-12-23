import { Select } from "antd";
import useGetCostStatistics from "./hooks/useGetCostStatistics";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useState } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function CostStatistics() {
  const [year, setYear] = useState(
    parseInt(new Date().getFullYear().toString())
  );
  const { data: costStatistics } = useGetCostStatistics({ year });

  return (
    <div>
      <Select
        className="mb-8"
        value={year}
        onChange={setYear}
        style={{ width: 120 }}
        options={Array.from({ length: 26 }, (_, i) => ({
          value: 2000 + i,
          label: 2000 + i,
        }))}
      />
      <div className="overflow-x-auto">
        <ChartContainer
          config={chartConfig}
          className="min-h-[200px] w-full sm:max-w-[90%] min-w-[400px]"
        >
          <BarChart accessibilityLayer data={costStatistics}>
            <ChartTooltip
              content={
                <ChartTooltipContent formatter={(label) => `${label}€`} />
              }
            />

            <Bar dataKey="eurCost" fill="var(--color-desktop)" radius={4} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              dataKey="eurCost"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => `${value}€`}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
