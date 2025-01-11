import { Card } from "antd";
import useGetApprovalRequirements from "../hooks/useGetApprovalRequirements";

type ApprovalRequirementsProps = {
  tripId: number;
};

export default function ApprovalRequirements({
  tripId,
}: ApprovalRequirementsProps) {
  const { data } = useGetApprovalRequirements({ tripId });
  console.log(data?.message);
  if (!data?.message) return null;

  return (
    <Card
      title="Approval Requirements"
      bordered={false}
      className="lg:mx-auto max-h-fit max-w-md min-w-[350px] "
    >
      <p className="break-words">{data?.message}</p>
    </Card>
  );
}
