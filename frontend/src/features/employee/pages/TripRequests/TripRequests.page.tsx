import { Link } from "@tanstack/react-router";
import {
  tripRequestsCreateRoute,
  tripRequestsEditRoute,
} from "../../routes/employee.routes";
import useGetTripRequests from "./hooks/useGetTripRequests";
import { Button } from "antd";

export default function TripRequests() {
  const { data } = useGetTripRequests();
  return (
    <div>
      <Link to={tripRequestsCreateRoute.to}>
        <Button>Create trip request</Button>
      </Link>
      <br />
      {data?.map((trip) => (
        <div className="flex gap-4">
          <span>{trip.requestNumber}</span>
          <span>{trip.address}</span>
          <span>{trip.dateFrom}</span>
          <span>{trip.dateTo}</span>

          <Link
            to={tripRequestsEditRoute.to}
            params={{ tripId: trip.id.toString() }}
          >
            <Button>Edit</Button>
          </Link>
        </div>
      ))}
    </div>
  );
}
