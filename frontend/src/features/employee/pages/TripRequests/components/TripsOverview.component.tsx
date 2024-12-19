import { Link } from "@tanstack/react-router";
import { Button, Flex, Select, Table } from "antd";
import Title from "antd/es/typography/Title";
import { tripRequestsCreateRoute } from "../../../routes/employee.routes";
import useGetTripsByStatus from "@/hooks/useGetTripsByStatus";
import { useState } from "react";
import { GetEmployeeTripsByStatusStatusEnum } from "@/api_gen/apis/trip-controller-api";
import { format } from "date-fns";

export default function TripsOverview() {
  const [status, setStatus] = useState<
    GetEmployeeTripsByStatusStatusEnum | undefined
  >(undefined);

  const options: {
    value: GetEmployeeTripsByStatusStatusEnum;
    label: string;
  }[] = [
    {
      value: GetEmployeeTripsByStatusStatusEnum.PendingDepartmentApproval,
      label: "Pending Department Approval",
    },
    {
      value: GetEmployeeTripsByStatusStatusEnum.DepartmentApprovalRejected,
      label: "Department Approval Rejected",
    },
    {
      value: GetEmployeeTripsByStatusStatusEnum.TravelApproved,
      label: "Travel Approved",
    },
    {
      value: GetEmployeeTripsByStatusStatusEnum.PendingExpenseApproval,
      label: "Pending Expense Approval",
    },
    {
      value: GetEmployeeTripsByStatusStatusEnum.ExpenseApprovalRejected,
      label: "Expense Approval Rejected",
    },
    {
      value: GetEmployeeTripsByStatusStatusEnum.PendingDirectorApproval,
      label: "Pending Director Approval",
    },
    {
      value: GetEmployeeTripsByStatusStatusEnum.DirectorApprovalRejected,
      label: "Director Approval Rejected",
    },
    {
      value: GetEmployeeTripsByStatusStatusEnum.AwaitingPayment,
      label: "Awaiting Payment",
    },
    { value: GetEmployeeTripsByStatusStatusEnum.Paid, label: "Paid" },
  ];
  const columns = [
    {
      title: "Request number",
      dataIndex: "requestNumber",
      key: "requestNumber",
    },
    {
      title: "Date range",
      dataIndex: "dateRange",
      key: "dateRange",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const { data } = useGetTripsByStatus(status);

  const extractedData = data?.content?.map((trip) => {
    return {
      requestNumber: trip.requestNumber,
      dateRange: `${format(new Date(trip.dateFrom), "dd.MM.yyyy")} - ${format(
        new Date(trip.dateTo),
        "dd.MM.yyyy"
      )}`,
      location: `${trip.address}, ${trip.city}, ${trip.country?.name || ""}`,
      status: trip.status,
    };
  });

  return (
    <>
      <Title>Active Trip Requests</Title>
      <Flex className="justify-between items-center pb-10">
        <div className="flex flex-col">
          <div>Status</div>
          <Select
            onChange={(value) => {
              setStatus(value);
            }}
            options={options}
            className="w-64"
          />
        </div>
        <Link to={tripRequestsCreateRoute.to}>
          <Button>Create trip request</Button>
        </Link>
      </Flex>
      <Table dataSource={extractedData} columns={columns}></Table>
    </>
  );
}
