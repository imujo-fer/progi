import { statisticsRoute } from "@/features/statistics/statistics.routes";
import useUser from "@/providers/UserProvider";
import { Link } from "@tanstack/react-router";
import { Menu } from "antd";
import { UserDetailsDTORolesEnum } from "../../api_gen/models/user-details-dto";
import {
  awaitingPaymentRoute,
  expenseReviewRequestsRoute,
} from "../../features/accountant/routes/accountant.routes";
import { departmentApprovalRequestsRoute } from "../../features/departmentHead/routes/departmentHead.routes";
import { reviewTripsRoute } from "../../features/director/routes/director.routes";
import {
  notificationsRoute,
  pastTripsRoute,
  tripRequestsRoute,
} from "../../features/employee/routes/employee.routes";

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
  }

  if (
    roleList.includes(
      UserDetailsDTORolesEnum.Director || UserDetailsDTORolesEnum.DepartmentHead
    )
  ) {
    roles.push({
      key: "9",
      label: <Link to={statisticsRoute.to}>Statistics</Link>,
    });
  }

  roles.push({
    key: "3",
    label: <Link to={notificationsRoute.to}>Notifications</Link>,
  });

  return <Menu theme="light" items={roles} />;
}
