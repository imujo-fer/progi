import { Menu } from "antd";
import { UserDetailsDTORolesEnum } from "../../api_gen/models/user-details-dto";
import { Link } from "@tanstack/react-router";
import {
  notificationsRoute,
  pastTripsRoute,
  tripRequestsRoute,
} from "../../features/employee/routes/employee.routes";
import {
  departmentApprovalRequestsRoute,
  departmentStatisticsRoute,
} from "../../features/departmentHead/routes/departmentHead.routes";
import {
  awaitingPaymentRoute,
  expenseReviewRequestsRoute,
} from "../../features/accountant/routes/accountant.routes";
import {
  reviewTripsRoute,
  directorStatisticsRoute,
} from "../../features/director/routes/director.routes";
import useUser from "@/providers/UserProvider";

export default function Sidebar() {
  const user = useUser();
  const roleList = user?.roles || [];

  const roles = [
    {
      key: "1",
      label: <Link to={tripRequestsRoute.to}> Trips requests </Link>,
    },
    { key: "2", label: <Link to={pastTripsRoute.to}> Past Trips </Link> },
  ];

  if (roleList.includes(UserDetailsDTORolesEnum.DepartmentHead)) {
    roles.push({
      key: "4",
      label: (
        <Link to={departmentApprovalRequestsRoute.to}>
          Department approval requests
        </Link>
      ),
    });
    roles.push({
      key: "5",
      label: (
        <Link to={departmentStatisticsRoute.to}>Department statistics</Link>
      ),
    });
  }

  if (roleList.includes(UserDetailsDTORolesEnum.Accountant)) {
    roles.push({
      key: "6",
      label: (
        <Link to={expenseReviewRequestsRoute.to}>Expense review requests</Link>
      ),
    });
    roles.push({
      key: "7",
      label: <Link to={awaitingPaymentRoute.to}>Awaiting payment</Link>,
    });
  }

  if (roleList.includes(UserDetailsDTORolesEnum.Director)) {
    roles.push({
      key: "8",
      label: <Link to={reviewTripsRoute.to}>Review trips</Link>,
    });
    roles.push({
      key: "9",
      label: <Link to={directorStatisticsRoute.to}>Statistics</Link>,
    });
  }

  roles.push({
    key: "3",
    label: <Link to={notificationsRoute.to}>Notifications</Link>,
  });

  return <Menu theme="light" items={roles} />;
}
