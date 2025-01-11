import { departmentApprovalRequestReviewRoute } from "@/features/departmentHead/routes/departmentHead.routes";
import { Link } from "@tanstack/react-router";
import { Button, Table } from "antd";
import { format } from "date-fns";
import useGetDepartmentApprovalRequests from "../hooks/useGetDepartmentApprovalRequests";

export default function DepartmentApprovalRequestsTable() {
  const { data } = useGetDepartmentApprovalRequests();
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

  const extractedData = data?.content?.map((trip) => {
    return {
      requestNumber: trip.requestNumber.padStart(3, "0"),
      employee: trip.user?.firstName + " " + trip.user?.lastName,
      dateRange: `${format(new Date(trip.dateFrom), "dd.MM.yyyy")} - ${format(
        new Date(trip.dateTo),
        "dd.MM.yyyy"
      )}`,
      location: `${trip.address}, ${trip.city}, ${trip.country?.name || ""}`,
      action: (
        <Link
          to={departmentApprovalRequestReviewRoute.to}
          params={{ tripId: trip.id.toString() }}
        >
          <Button>Review request</Button>
        </Link>
      ),
      export: <Button>Export</Button>,
    };
  });

  return <Table dataSource={extractedData} columns={columns} />;
}
