import { Link } from "@tanstack/react-router";
import { Button, Flex, Select, Table } from "antd";
import Title from "antd/es/typography/Title";
import { tripRequestsCreateRoute } from "../routes/employee.routes";
import useGetTripsByStatus from "@/hooks/useGetTripsByStatus";
import { useEffect, useState } from "react";
import { GetEmployeeTripsByStatusStatusEnum } from "@/api_gen/apis/trip-controller-api";

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

  const { data } = useGetTripsByStatus(status);

  useEffect(() => {
    console.log(data);
  }, [status, data]);

  return (
    <>
      <Title>Active Trip Requests</Title>
      <Flex className="justify-between items-center pb-10">
        <div className="flex flex-col">
          <div>Status</div>
          <Select
            onChange={(value: GetEmployeeTripsByStatusStatusEnum) => {
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
      <Table></Table>
    </>
  );
}
