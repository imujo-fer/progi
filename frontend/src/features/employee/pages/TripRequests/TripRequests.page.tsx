import { Link } from "@tanstack/react-router";
import { tripRequestsCreateRoute } from "../../routes/employee.routes";

export default function TripRequests() {
  return (
    <div>
      <Link to={tripRequestsCreateRoute.to}>Create trip request</Link>
    </div>
  );
}
