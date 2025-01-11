import Title from "antd/es/typography/Title";
import useGetExpenseApprovalTrips from "./hooks/useGetExpenseApprovalTrips";
import { Button, Table } from "antd";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";

export default function ExpenseReivewRequests() {
  const columns = [
    {
      title: "Request number",
      dataIndex: "requestNumber",
      key: "requestNumber",
    },
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
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
      title: "Cost",
      dataIndex: "cost",
      key: "cost",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "",
      dataIndex: "export",
      key: "export",
    },
  ];
  const { data } = useGetExpenseApprovalTrips();

  const extractedData = data?.content?.map((trip) => {
    return {
      requestNumber: trip.requestNumber,
      employee: `${trip.user.firstName} ${trip.user.lastName}`,
      dateRange: `${format(new Date(trip.dateFrom), "dd.MM.yyyy")} - ${format(
        new Date(trip.dateTo),
        "dd.MM.yyyy"
      )}`,
      location: `${trip.address}, ${trip.city}, ${trip.country?.name || ""}`,
      cost: trip.eurTotalCost + "€",
      action: (
        <Link>
          <Button>Review Request</Button>
        </Link>
      ),
      export: <Button>Export</Button>,
    };
  });

  return (
    <>
      <Title>Expense Review Requests</Title>
      <Table
        dataSource={extractedData}
        columns={columns}
        locale={{ emptyText: "There are no expense requests to review" }}
      ></Table>
    </>
  );
}
