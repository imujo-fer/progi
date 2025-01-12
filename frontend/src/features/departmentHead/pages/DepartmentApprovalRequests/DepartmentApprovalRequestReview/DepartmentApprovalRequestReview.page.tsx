import { departmentApprovalRequestReviewRoute } from "@/features/departmentHead/routes/departmentHead.routes";
import useGetTripRequest from "@/features/employee/pages/TripRequestForm/hooks/useGetTripRequest";
import TripRequestEditPage from "@/features/employee/pages/TripRequestForm/TripRequestEdit.page";
import { Card } from "antd";

export default function DepartmentApprovalRequestReview() {
  const tripId = departmentApprovalRequestReviewRoute.useRouteContext().tripId;
  const { data } = useGetTripRequest({ tripId });

  return (
    <div className="flex lg:flex-row flex-col gap-12">
      <div className="lg:w-1/2 w-full">
        <TripRequestEditPage disabled={true} />
      </div>
      <div className="max-w-[450px] min-w-fit-content mx-auto">
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
