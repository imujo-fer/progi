import { NotificationDTO } from "@/api_gen";
import actionBasedOnTripStatus from "@/utils/actionBasedOnTripStatus";
import formatStatus from "@/utils/formatStatus";
import { Button, Card, Flex } from "antd";
import { format } from "date-fns";

interface NotificationProps {
  notification: NotificationDTO;
}

export default function Notification({ notification }: NotificationProps) {
  const action = actionBasedOnTripStatus(notification.nextTripStatus.status);

  return (
    <Card className="w-full">
      <Flex justify="space-between" className="mb-7">
        <div className="max-w-3/4">
          {`Status changed from `}
          <span className="font-bold">
            {formatStatus(notification.previousTripStatusStatus)}
          </span>
          {` to `}
          <span className="font-bold">
            {formatStatus(notification.nextTripStatus.status)}
          </span>
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
        {action && <Button>{action}</Button>}
      </Flex>
    </Card>
  );
}
