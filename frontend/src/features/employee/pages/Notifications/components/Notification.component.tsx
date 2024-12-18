import { NotificationDTO } from "@/api_gen";
import { Button, Card, Flex } from "antd";
import { format } from "date-fns";

interface NotificationProps {
  notification: NotificationDTO;
}

export default function Notification({ notification }: NotificationProps) {
  return (
    <Card className="w-full">
      <Flex justify="space-between">
        <div className="max-w-3/4">
          {`Status changed from `}
          <span className="font-bold">
            {notification.previousTripStatusStatus}
          </span>
          {` to `}
          <span className="font-bold">
            {notification.nextTripStatus.status}
          </span>
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
        <Button>action</Button>
      </Flex>
    </Card>
  );
}
