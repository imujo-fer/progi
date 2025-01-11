import useGetDepartments from "@/features/admin/hooks/useGetDepartments";
import {
  departmentEmployeesRoute,
  departmentRoute,
  inviteUserRoute,
} from "@/features/admin/routes/admin.rutes";
import { statisticsRoute } from "@/features/statistics/statistics.routes";
import useUser from "@/providers/UserProvider";
import { layoutRoute } from "@/routes/router";
import { AnyRoute, Link, Navigate, useMatches } from "@tanstack/react-router";
import { Menu } from "antd";
import { ItemType } from "antd/es/menu/interface";
import { UserDetailsDTORolesEnum } from "../../api_gen/models/user-details-dto";
import {
  awaitingPaymentRoute,
  expenseReviewRequestsRoute,
} from "../../features/accountant/routes/accountant.routes";
import { departmentApprovalRequestsRoute } from "../../features/departmentHead/routes/departmentHead.routes";
import { reviewTripsRoute } from "../../features/director/routes/director.routes";
import {
  notificationsRoute,
  tripRequestsRoute,
} from "../../features/employee/routes/employee.routes";

export default function Sidebar() {
  const user = useUser();
  const roleList = user?.roles || [];

  const matches = useMatches();

  const { data: departments, isLoading: isLoadingDepartments } =
    useGetDepartments({
      onSuccess: () => {},
    });

  const roles: (ItemType & { route?: AnyRoute })[] = [
    {
      key: "1",
      label: <Link to={tripRequestsRoute.to}>Trips requests</Link>,
      route: tripRequestsRoute,
    },
  ];

  if (roleList.includes(UserDetailsDTORolesEnum.DepartmentHead)) {
    roles.push({
      key: "4",
      label: (
        <Link to={departmentApprovalRequestsRoute.to}>
          Department approval requests
        </Link>
      ),
      route: departmentApprovalRequestsRoute,
    });
  }

  if (roleList.includes(UserDetailsDTORolesEnum.Accountant)) {
    roles.push({
      key: "6",
      label: (
        <Link to={expenseReviewRequestsRoute.to}>Expense review requests</Link>
      ),
      route: expenseReviewRequestsRoute,
    });
    roles.push({
      key: "7",
      label: <Link to={awaitingPaymentRoute.to}>Awaiting payment</Link>,
      route: awaitingPaymentRoute,
    });
  }

  if (roleList.includes(UserDetailsDTORolesEnum.Director)) {
    roles.push({
      key: "8",
      label: <Link to={reviewTripsRoute.to}>Review trips</Link>,
      route: reviewTripsRoute,
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
      route: statisticsRoute,
    });
  }

  if (roleList.includes(UserDetailsDTORolesEnum.Administrator)) {
    roles.push({
      key: "10",
      label: <Link to={inviteUserRoute.to}>Invite User</Link>,
      route: inviteUserRoute,
    });

    roles.push({
      key: "11",
      label: (
        <Link to={departmentRoute.to}>
          <span>Departments</span>
        </Link>
      ),
      route: departmentRoute,
      children:
        isLoadingDepartments || !departments
          ? [
              {
                key: "loading",
                label: <span>Loading...</span>,
              },
            ]
          : departments.map((department) => ({
              key: `department-${department.id}`,
              label: (
                <Link
                  to={departmentEmployeesRoute.to}
                  params={{ id: department.id?.toString() || "" }}
                >
                  {department.name}
                </Link>
              ),
            })),
    });
  }

  roles.push({
    key: "3",
    label: <Link to={notificationsRoute.to}>Notifications</Link>,
    route: notificationsRoute,
  });

  const currentRoute = matches[matches.length - 1];
  const firstMenuRoute = roles[0]?.route;

  const currentSelectedRouteKey = roles.find(
    (role) => role.route?.id === currentRoute?.id
  )?.key;

  if (currentRoute?.id === layoutRoute.id) {
    return <Navigate to={firstMenuRoute?.to || tripRequestsRoute.to} replace />;
  }

  return (
    <Menu
      theme="light"
      mode="inline"
      items={roles}
      selectedKeys={
        currentSelectedRouteKey ? [currentSelectedRouteKey.toString()] : []
      }
    />
  );
}
