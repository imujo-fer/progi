import { TripStatusStatusEnum } from "@/api_gen";
import {
  expenseReportRoute,
  tripRequestsEditRoute,
} from "@/features/employee/routes/employee.routes";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "antd";

interface ActionButtonProps {
  status: TripStatusStatusEnum;
  tripId: number | undefined;
  expenseReportId?: number;
}

export default function ActionButton({
  status,
  tripId,
  expenseReportId,
}: ActionButtonProps) {
  const navigate = useNavigate();
  const statusList = [
    {
      status: "DepartmentApprovalRejected",
      action: "Edit Trip",
      onClick: () =>
        navigate({
          to: tripRequestsEditRoute.to,
          params: { tripId: tripId?.toString() || "" },
        }),
    },
    {
      status: "TravelApproved",
      action: "Create Expense Report",
      onClick: () =>
        navigate({
          to: expenseReportRoute.to,
          params: {
            tripId: tripId?.toString() || "",
            expenseReportId: expenseReportId?.toString() || "",
          },
        }),
    },
    {
      status: "ExpenseApprovalRejected",
      action: "Edit Expense Report",
      onClick: () =>
        navigate({
          to: expenseReportRoute.to,
          params: {
            tripId: tripId?.toString() || "",
            expenseReportId: expenseReportId?.toString() || "",
          },
        }),
    },
    {
      status: "DirectorApprovalRejected",
      action: "Edit Expense Report",
      onClick: () =>
        navigate({
          to: expenseReportRoute.to,
          params: {
            tripId: tripId?.toString() || "",
            expenseReportId: expenseReportId?.toString() || "",
          },
        }),
    },
  ];

  const statusItem =
    statusList.find(
      (actionItem) =>
        TripStatusStatusEnum[
          actionItem.status as keyof typeof TripStatusStatusEnum
        ] == status
    ) || undefined;

  if (!statusItem) return null;

  return <Button onClick={statusItem.onClick}>{statusItem.action}</Button>;
}
