import { Link } from "@tanstack/react-router";
import { Button, Table } from "antd";
import Title from "antd/es/typography/Title";
import { format } from "date-fns";
import useGetDirectorTrips from "./hooks/useGetDirectorTrips";
import { directorApproveTripRoute } from "../../routes/director.routes";
import { useExportTrip } from "@/features/export/useExportTrip";

export default function ReviewTripsTable() {
  const { mutate: exportTrip, isPending: isPendingExportTrip } =
    useExportTrip();
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

  const { data } = useGetDirectorTrips();

  const extractedData = data?.content?.map((trip) => {
    return {
      requestNumber: trip.requestNumber,
      employee: trip.user?.firstName + " " + trip.user?.lastName,
      dateRange: `${format(new Date(trip.dateFrom), "dd.MM.yyyy")} - ${format(
        new Date(trip.dateTo),
        "dd.MM.yyyy"
      )}`,
      location: `${trip.address}, ${trip.city}, ${trip.country?.name || ""}`,
      cost: trip.eurTotalCost && trip.eurTotalCost?.toFixed(2) + "€",
      action: (
        <Link
          to={directorApproveTripRoute.to}
          params={{
            expenseReportId: trip.expenseReportId?.toString(),
            tripId: trip.id.toString(),
          }}
        >
          <Button type="primary">Review Request</Button>
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

  return (
    <>
      <Title level={2}>Director Trip Approval</Title>
      <Table
        dataSource={extractedData}
        columns={columns}
        locale={{ emptyText: "There are no trips to review" }}
        scroll={{ x: 'max-content' }}
      ></Table>
    </>
  );
}
