import { message, Skeleton } from "antd";
import { useForm } from "antd/es/form/Form";
import {
  tripRequestsEditRoute,
  tripRequestsRoute,
} from "../../routes/employee.routes";
import TripRequestForm, {
  TripRequestFormType,
} from "./TripRequestForm.component";
import useGetTripRequest from "./hooks/useGetTripRequest";
import useUpdateTrip from "./hooks/useUpdateTripRequest";
import { LocationInfo } from "./utils/geoLocationToLocationInfo";
import dayjs from "dayjs";
import { departmentApprovalRequestReviewRoute } from "@/features/departmentHead/routes/departmentHead.routes";

interface TripRequestEditPageProps {
    disabled?: boolean;
  }
export default function TripRequestEditPage({disabled}: TripRequestEditPageProps) {
  
  const navigate = tripRequestsRoute.useNavigate();

  var tripId = 0;
  if(!disabled) {  tripId = tripRequestsEditRoute.useRouteContext().tripId;} else
  {  tripId = departmentApprovalRequestReviewRoute.useRouteContext().tripId;}

  const [form] = useForm<TripRequestFormType>();

  const { data: trip, isLoading: isLoadingGetTrip } = useGetTripRequest({
    tripId,
    onSuccess: (data) => {
      const defaultDestination: LocationInfo | undefined = data && {
        city: data.city,
        country: {
          code: data.country.code,
          label: data.country.name,
        },
        coordinates: {
          lat: data.coordinatesLat,
          lng: data.coordinatesLon,
        },
        address: data.address,
      };

      const defaultValues = {
        destination: JSON.stringify(defaultDestination),
        duration: [dayjs(data.datetimeFrom), dayjs(data.datetimeTo)],
        purpose: data.reason,
      };

      form.setFieldsValue(defaultValues);
    },
  });

  const { mutate } = useUpdateTrip({
    tripId,
    onSuccess: () => {
      message.success(
        `Trip request ${trip?.requestNumber} updated successfully`
      );
      navigate({
        to: tripRequestsRoute.to,
      });
    },
  });

  if (isLoadingGetTrip) return <Skeleton />;

  if (trip)
    return (
      <TripRequestForm
      title={disabled ? `Review trip request #${trip.requestNumber.toString().padStart(3, '0')}` : `Edit trip request #${trip.requestNumber.toString().padStart(3, '0')}`}
      form={form}
      onSubmit={(data) => {
      const destination = JSON.parse(data.destination) as LocationInfo;
      mutate({
      city: destination.city,
      coordinatesLat: destination.coordinates.lat,
      coordinatesLon: destination.coordinates.lng,
      countryCode: destination.country.code,
      datetimeFrom: data.duration[0].toString(),
      datetimeTo: data.duration[1].toString(),
      reason: data.purpose,
      address: destination.address,
      });
      }}
      isPending={false}
      onDiscard={() => {
      navigate({
      to: tripRequestsRoute.to,
      });
      }}
      disabled={disabled ? true : false}
      />
    );
}
