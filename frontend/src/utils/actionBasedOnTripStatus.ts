import { TripStatusStatusEnum } from "@/api_gen";

export default function actionBasedOnTripStatus(status: TripStatusStatusEnum) {
  const actionList = [
    { status: "DepartmentApprovalRejected", action: "edit trip" },
    { status: "TravelApproved", action: "create expense report" },
    { status: "ExpenseApprovalRejected", action: "edit expense report" },
    { status: "DirectorApprovalRejected", action: "edit expense report" },
  ];

  const action =
    actionList.find(
      (actionItem) =>
        TripStatusStatusEnum[
          actionItem.status as keyof typeof TripStatusStatusEnum
        ] == status
    )?.action || null;
  return action;
}
