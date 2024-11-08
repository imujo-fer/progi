import { Menu } from "antd";

export default function Sidebar() {
  return (
    <Menu
      theme="light"
      items={[
        { key: "1", label: "Trip request" },
        { key: "2", label: "Past Trips" },
        { key: "3", label: "Notifications" },
        { key: "4", label: "Department approval requests" },
        { key: "5", label: "Department statistics" },
        { key: "6", label: "Expense review requests" },
        { key: "7", label: "Awaiting payment" },
        { key: "8", label: "Review trips" },
        { key: "9", label: "Statistics" },
      ]}
    />
  );
}
