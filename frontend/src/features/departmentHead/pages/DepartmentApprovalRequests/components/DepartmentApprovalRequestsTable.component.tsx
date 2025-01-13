import { departmentApprovalRequestReviewRoute } from "@/features/departmentHead/routes/departmentHead.routes";
import { Link } from "@tanstack/react-router";
import { Button, Table } from "antd";
import { format } from "date-fns";
import useGetDepartmentApprovalRequests from "../hooks/useGetDepartmentApprovalRequests";
import { useExportTrip } from "@/features/export/useExportTrip";

export default function DepartmentApprovalRequestsTable() {
  const { mutate: exportTrip, isPending: isPendingExportTrip } =
    useExportTrip();
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
          <Button type="primary">Review request</Button>
        </Link>
      ),
      export: trip.expenseReportId && (
        <Button
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
      ),
    };
  });

  return <Table 
          dataSource={extractedData} 
          columns={columns} 
          locale={{ emptyText: "There are no requests to review" }}
          scroll={{ x: 'max-content' }}
           />;
}
