import { useState } from "react";
import useGetEmployeeStatistics from "./hooks/useGetEmployeeStatistics";
import { DatePicker, Table } from "antd";
import { UserStatisticsDTO } from "@/api_gen";
import { ColumnsType } from "antd/es/table";
import FormItem from "antd/es/form/FormItem";

export default function EmployeeStatistics() {
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const { data: employeeStatistics } = useGetEmployeeStatistics({
    dateFrom,
    dateTo,
  });

  const columns: ColumnsType<UserStatisticsDTO> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, item) => `${item.user?.firstName} ${item.user?.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "user",
      key: "email",
      render: (_, item) => item.user?.email,
    },
    {
      title: "Number of trips",
      dataIndex: "numberOfTrips",
      key: "numberOfTrips",
    },
    {
      title: "Total cost",
      dataIndex: "eurTotalCost",
      key: "eurTotalCost",
      render: (_, item) => `${item.eurTotalCost?.toFixed(2)}€`,
    },
  ];

  return (
    <div>
      <div className="flex gap-2">
        <FormItem layout="vertical" label="From">
          <DatePicker value={dateFrom} onChange={setDateFrom} />
        </FormItem>
        <FormItem layout="vertical" label="To">
          <DatePicker value={dateTo} onChange={setDateTo} />
        </FormItem>
      </div>
      <Table columns={columns} dataSource={employeeStatistics} />
    </div>
  );
}
