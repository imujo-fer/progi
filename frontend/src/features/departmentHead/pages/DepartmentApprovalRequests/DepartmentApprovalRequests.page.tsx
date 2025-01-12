import Title from "antd/es/typography/Title";
import DepartmentApprovalRequestsTable from "./components/DepartmentApprovalRequestsTable.component";

export default function DepartmentApprovalRequests() {
  return (
    <>
      <Title level={2}>Department Approval Requests</Title>
      <DepartmentApprovalRequestsTable />
    </>
  );
}
