import { Card } from "antd";
import useGetApprovalRequirements from "../hooks/useGetApprovalRequirements";

export default function ApprovalRequirements() {
  const { data } = useGetApprovalRequirements();
  return data?.message ? (
    <Card
      title="Approval Requirements"
      bordered={false}
      className="lg:mx-auto max-h-fit max-w-md"
    >
      <p className="break-words">{data?.message}</p>
    </Card>
  ) : null;
}
