import { TripStatusStatusEnum } from "@/api_gen";
import { GetEmployeeTripsByStatusStatusEnum } from "@/api_gen/apis/trip-controller-api";
import useGetTripsByStatus from "@/hooks/useGetTripsByStatus";
import { Link } from "@tanstack/react-router";
import { Button, Flex, Select, Table } from "antd";
import Title from "antd/es/typography/Title";
import { format } from "date-fns";
import { useState } from "react";
import { tripRequestsCreateRoute } from "../../../routes/employee.routes";
import ActionButton from "../../Notifications/components/ActionButton.component";
import { useExportTrip } from "@/features/export/useExportTrip";

export default function TripsOverview() {
  const { mutate: exportTrip, isPending: isPendingExportTrip } =
    useExportTrip();
  const [status, setStatus] = useState<
    GetEmployeeTripsByStatusStatusEnum | "all"
  >("all");

  const options: {
    value: GetEmployeeTripsByStatusStatusEnum | "all";
    label: string;
  }[] = [
    { value: "all", label: "All statuses" },
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
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Export",
      dataIndex: "export",
      key: "export",
    },
  ];

  const tripStatusFormat: Record<TripStatusStatusEnum, string> = {
    PENDING_DEPARTMENT_APPROVAL: "Pending Department Approval",
    DEPARTMENT_APPROVAL_REJECTED: "Department Approval Rejected",
    TRAVEL_APPROVED: "Travel Approved",
    PENDING_EXPENSE_APPROVAL: "Pending Expense Approval",
    EXPENSE_APPROVAL_REJECTED: "Expense Approval Rejected",
    PENDING_DIRECTOR_APPROVAL: "Pending Director Approval",
    DIRECTOR_APPROVAL_REJECTED: "Director Approval Rejected",
    AWAITING_PAYMENT: "Awaiting Payment",
    PAID: "Paid",
  };

  const { data } = useGetTripsByStatus(status === "all" ? undefined : status);

  const extractedData = data?.content?.map((trip) => {
    const status = tripStatusFormat[trip.status];
    return {
      requestNumber: trip.requestNumber,
      dateRange: `${format(new Date(trip.dateFrom), "dd.MM.yyyy")} - ${format(
        new Date(trip.dateTo),
        "dd.MM.yyyy"
      )}`,
      location: `${trip.address}, ${trip.city}, ${trip.country?.name || ""}`,
      status: status,
      action: (
        <ActionButton
          expenseReportId={trip.expenseReportId}
          status={trip.status}
          tripId={trip.id}
        />
      ),
      export: trip.expenseReportId ? (
        <Button
          type="default"
          onClick={() =>
            exportTrip({
              fileName: `Trip ${trip.requestNumber} export`,
              expenseReportId: trip.expenseReportId,
            })
          }
          loading={isPendingExportTrip}
        >
          Export
        </Button>
      ): <div className="text-center">-</div>
    };
  });

  return (
    <>
      <Title level={2}>Trip Requests</Title>
      <Flex className="flex flex-wrap justify-between items-end pb-10 gap-4">
        <div className="flex flex-col">
          <div>Status</div>
          <Select
            onChange={(value) => {
              setStatus(value);
            }}
            value={status}
            options={options}
            className="w-64"
          />
        </div>
        <Link to={tripRequestsCreateRoute.to}>
          <Button type="primary">Create trip request</Button>
        </Link>
      </Flex>
      <Table
        dataSource={extractedData}
        columns={columns}
        locale={{ emptyText: "There are no trips with this status" }}
        scroll={{ x: 'max-content' }}
      ></Table>
    </>
  );
}
