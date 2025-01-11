import { TripStatusStatusEnum } from "@/api_gen";
import {
  expenseReportRoute,
  tripRequestsEditRoute,
} from "@/features/employee/routes/employee.routes";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "antd";
import usePostExpenseReport from "../../SubmitExpenseReport/hooks/usePostExpenseReport";

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
  const { mutate: postExpenseReport, isPending } = usePostExpenseReport();

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
      onClick: () => {
        if (expenseReportId) {
          navigate({
            to: expenseReportRoute.to,
            params: {
              tripId: tripId?.toString() || "",
              expenseReportId: expenseReportId?.toString() || "",
            },
          });
          return;
        }

        postExpenseReport(tripId || 0, {
          onSuccess: (expenseReport) => {
            navigate({
              to: expenseReportRoute.to,
              params: {
                tripId: tripId?.toString() || "",
                expenseReportId: expenseReport.id?.toString() || "",
              },
            });
          },
        });
      },
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

  return (
    <Button loading={isPending} onClick={statusItem.onClick}>
      {statusItem.action}
    </Button>
  );
}
