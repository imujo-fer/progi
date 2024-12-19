import { NotificationDTO, TripStatusStatusEnum } from "@/api_gen";
import { Card, Flex } from "antd";
import { format } from "date-fns";
import ActionButton from "./ActionButton.component";

interface NotificationProps {
  notification: NotificationDTO;
}

export default function Notification({ notification }: NotificationProps) {
  const tripStatusFormat: Record<TripStatusStatusEnum, string> = {
    PENDING_DEPARTMENT_APPROVAL: "Pending Department Approval",
    DEPARTMENT_APPROVAL_REJECTED: "Department Approval Rejected",
    TRAVEL_APPROVED: "Travel Approved",
    PENDING_EXPENSE_APPROVAL: "Pending Expense Approval",
    EXPENSE_APPROVAL_REJECTED: "Expense Approval Rejected",
    PENDING_DIRECTOR_APPROVAL: "Pending Director Approval",
    DIRECTOR_APPROVAL_REJECTED: "Director Approval Rejected",
    AWAITING_PAYMENT: "Awaiting Payment",
    PAID: "Paid",
  };

  const previousStatusLabel =
    tripStatusFormat[notification.previousTripStatusStatus] ||
    notification.previousTripStatusStatus;
  const nextStatusLabel =
    tripStatusFormat[notification.nextTripStatus.status] ||
    notification.nextTripStatus.status;

  return (
    <Card className="w-full">
      <Flex justify="space-between" className="mb-7">
        <div className="max-w-3/4">
          {`Status changed from `}
          <span className="font-bold">{previousStatusLabel}</span>
          {` to `}
          <span className="font-bold">{nextStatusLabel}</span>
          {` on request #`}
          {String(notification.trip.requestNumber).padStart(3, "0")}
        </div>
        <div>
          {format(
            new Date(notification.nextTripStatus.createdAt),
            "dd.MM.yyyy HH:mm"
          )}
        </div>
      </Flex>
      <Flex justify="space-between">
        <div className="max-w-3/4 text-gray-500">
          {`${format(
            new Date(notification.trip.dateFrom),
            "dd.MM.yyyy"
          )} - ${format(new Date(notification.trip.dateTo), "dd.MM.yyyy")} | ${
            notification.trip.city
          }, ${notification.trip.country.name}`}
        </div>
        <ActionButton
          status={notification.nextTripStatus.status}
          tripId={notification.trip.id}
        />
      </Flex>
    </Card>
  );
}
