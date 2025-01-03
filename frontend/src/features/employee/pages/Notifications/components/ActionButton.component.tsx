import { TripStatusStatusEnum } from "@/api_gen";
import { Link } from "@tanstack/react-router";
import { Button } from "antd";

interface ActionButtonProps {
  status: TripStatusStatusEnum;
  tripId: number | undefined;
}

export default function ActionButton({ status, tripId }: ActionButtonProps) {
  const statusList = [
    {
      status: "DepartmentApprovalRejected",
      action: "Edit Trip",
      link: `/trip-requests/${tripId}/edit`,
    },
    {
      status: "TravelApproved",
      action: "Create Expense Report",
      link: "../expense-review-requests",
    },
    {
      status: "ExpenseApprovalRejected",
      action: "Edit Expense Report",
      link: "../expense-review-requests",
    },
    {
      status: "DirectorApprovalRejected",
      action: "Edit Expense Report",
      link: "../expense-review-requests",
    },
  ];

  const statusItem =
    statusList.find(
      (actionItem) =>
        TripStatusStatusEnum[
          actionItem.status as keyof typeof TripStatusStatusEnum
        ] == status
    ) || undefined;

  return (
    <>
      {statusItem ? (
        <Link to={statusItem.link}>
          <Button className="w-48">{statusItem.action}</Button>
        </Link>
      ) : (
        <></>
      )}
    </>
  );
}
