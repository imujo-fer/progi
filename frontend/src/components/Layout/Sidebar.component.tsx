import { Menu } from "antd";
import useGetCurrentUserInfo from "../../hooks/currentUser";

export default function Sidebar() {
  const { data } = useGetCurrentUserInfo();
  const roleList = data?.roles || [];

  const roles = [
    { key: "1", label: "Trip request" },
    { key: "2", label: "Past Trips" },
  ];

  if (roleList.includes("DEPARTMENT_HEAD")) {
    roles.push({ key: "4", label: "Department approval requests" });
    roles.push({ key: "5", label: "Department statistics" });
  }

  if (roleList.includes("ACCOUNTANT")) {
    roles.push({ key: "6", label: "Expense review requests" });
    roles.push({ key: "7", label: "Awaiting payment" });
  }

  if (roleList.includes("DIRECTOR")) {
    roles.push({ key: "8", label: "Review trips" });
    roles.push({ key: "9", label: "Statistics" });
  }

  roles.push({ key: "3", label: "Notifications" });

  return <Menu theme="light" items={roles} />;
}
