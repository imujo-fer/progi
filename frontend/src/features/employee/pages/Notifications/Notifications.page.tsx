import { List } from "antd";
import useGetNotifications from "./hooks/useGetNotifications";
import { NotificationDTO } from "@/api_gen";
import Notification from "./components/Notification.component";
import Title from "antd/es/typography/Title";

export default function Notifications() {
  const { data } = useGetNotifications();

  return (
    <div>
      <Title>Notifications</Title>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(notification: NotificationDTO) => (
          <List.Item className="border-b">
            <Notification notification={notification} />
          </List.Item>
        )}
      ></List>
    </div>
  );
}
