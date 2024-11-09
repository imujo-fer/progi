import { useForm } from "antd/es/form/Form";
import {
  tripRequestsCreateRoute,
  tripRequestsRoute,
} from "../../routes/employee.routes";
import TripRequestForm from "./TripRequestForm.component";
import useCreateTrip from "./hooks/useCreateTripRequest";
import { message } from "antd";
import { LocationInfo } from "./utils/geoLocationToLocationInfo";

export default function TripRequestCreatePage() {
  const navigate = tripRequestsCreateRoute.useNavigate();
  const [form] = useForm();

  const { mutate } = useCreateTrip({
    onSuccess: () => {
      message.success("Trip request created successfully");
      navigate({
        to: tripRequestsRoute.to,
      });
    },
  });

  return (
    <TripRequestForm
      title={"Create trip request"}
      form={form}
      onSubmit={(data) => {
        const destination = JSON.parse(data.destination) as LocationInfo;
        mutate({
          city: destination.city,
          coordinatesLat: destination.coordinates.lat,
          coordinatesLon: destination.coordinates.lng,
          countryCode: destination.country.code,
          datetimeFrom: data.duration[0],
          datetimeTo: data.duration[1],
          reason: data.purpose,
        });
      }}
      isPending={false}
      onDiscard={() => {
        navigate({
          to: tripRequestsRoute.to,
        });
      }}
    />
  );
}
