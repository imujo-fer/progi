import { RoleRoleTypeEnum } from "@/api_gen";
import { departmentApprovalRequestReviewRoute } from "@/features/departmentHead/routes/departmentHead.routes";
import useGetTripRequest from "@/features/employee/pages/TripRequestForm/hooks/useGetTripRequest";
import TripRequestEditPage from "@/features/employee/pages/TripRequestForm/TripRequestEdit.page";
import { Card } from "antd";

export default function DepartmentApprovalRequestReview() {
  const tripId = departmentApprovalRequestReviewRoute.useRouteContext().tripId;
  const { data } = useGetTripRequest({ tripId });

  const userRoleFormat: Record<RoleRoleTypeEnum, string> = {
    EMPLOYEE: "Employee",
    DEPARTMENT_HEAD: "Department Head",
    DIRECTOR: "Director",
    ACCOUNTANT: "Accountant",
    ADMINISTRATOR: "Administrator",
  }
  
  return (
    <div className="flex lg:flex-row flex-col lg:gap-12 gap-4">
      <div className="lg:w-1/2 w-full min-w-[300px]">
        <TripRequestEditPage disabled={true} />
      </div>
      <div className="max-w-1/2 min-w-fit-content mx-auto py-8">
        <Card
          title="Employee Information"
          bordered={false}
          className="lg:mx-auto max-h-fit max-w-md min-w-[200px] w-full"
        >
          <div className="flex justify-between">
            <p>Employee</p>
            <p className="w-2/3 text-right">
              <b>{`${data?.user.firstName} ${data?.user.lastName}`}</b>
              -{data?.user.email}
            </p>
          </div>
          <hr className="mt-4" />
          <div className="flex justify-between">
            <p>Roles</p>
            <ul className="mt-2 pl-5 text-right">
              {data?.user.roles?.map((role: string, index: number) => {
                const roleLabel = userRoleFormat[role as RoleRoleTypeEnum] || role;
                return <li key={index}>{roleLabel}</li>
              })}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
