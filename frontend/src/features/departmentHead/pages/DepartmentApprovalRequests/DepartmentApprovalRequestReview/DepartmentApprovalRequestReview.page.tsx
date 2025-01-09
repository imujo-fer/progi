import { departmentApprovalRequestReviewRoute } from "@/features/departmentHead/routes/departmentHead.routes";
import useGetTripRequest from "@/features/employee/pages/TripRequestForm/hooks/useGetTripRequest";
import TripRequestEditPage from "@/features/employee/pages/TripRequestForm/TripRequestEdit.page";
import { Card } from "antd";

export default function DepartmentApprovalRequestReview() {
  const tripId = departmentApprovalRequestReviewRoute.useRouteContext().tripId;
  const { data } = useGetTripRequest({ tripId });

  return (
    <div className="flex lg:flex-row flex-col gap-4">
      <div className="lg:w-1/2 w-full">
        <TripRequestEditPage disabled={true} />
      </div>
      <div className="lg:w-1/2 w-full px-20">
        <Card title="Employee Information">
          <div className="w-3/4 flex flex-col gap-2">
            <p><strong>Name:</strong></p>
            <p>{data?.user.firstName} {data?.user.lastName}</p>
            <div></div>
            <p><strong>Email:</strong></p>
            <p>{data?.user.email}</p>
            <div></div>
            <p><strong>Roles:</strong></p>
            <ul>
              {data?.user.roles?.map((role: string, index: number) => (
                <li key={index}>{role}</li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
