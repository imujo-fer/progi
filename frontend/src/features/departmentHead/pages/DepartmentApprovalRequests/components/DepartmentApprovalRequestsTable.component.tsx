import { Table } from "antd";
import useGetDepartmentApprovalRequests from "../hooks/useGetDepartmentApprovalRequests";
import { format } from "date-fns";
import { Link } from "@tanstack/react-router";
import DepartmentHeadActionButton from "./DepartmentHeadActionButton";

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
      requestNumber: trip.requestNumber,
      employee: "",
      dateRange: `${format(new Date(trip.dateFrom), "dd.MM.yyyy")} - ${format(
        new Date(trip.dateTo),
        "dd.MM.yyyy"
      )}`,
      location: `${trip.address}, ${trip.city}, ${trip.country?.name || ""}`,
      action: <DepartmentHeadActionButton requestNumber={trip.requestNumber} />,
      export: <Link>export</Link>,
    };
  });

  console.log(data);

  return <Table dataSource={extractedData} columns={columns} />;
}
