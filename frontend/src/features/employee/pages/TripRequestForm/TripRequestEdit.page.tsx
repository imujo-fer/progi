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
import {
  departmentApprovalRequestReviewRoute,
  departmentApprovalRequestsRoute,
} from "@/features/departmentHead/routes/departmentHead.routes";
import useApproveTripRequest from "@/features/departmentHead/hooks/useApproveTripRequest";
import useRequestRevision from "@/features/departmentHead/hooks/useRequestRevision";

interface TripRequestEditPageProps {
  disabled?: boolean;
}

export default function TripRequestEditPage({
  disabled,
}: TripRequestEditPageProps) {
  const navigate = tripRequestsRoute.useNavigate();

  let tripId = 0;
  if (!disabled) {
    tripId = tripRequestsEditRoute.useRouteContext().tripId;
  } else {
    tripId = departmentApprovalRequestReviewRoute.useRouteContext().tripId;
  }

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

  const { mutate: approveTrip } = useApproveTripRequest();

  function handleSubmit(values: TripRequestFormType) {
    if (!disabled) {
      const destination = JSON.parse(values.destination) as LocationInfo;
      mutate({
        city: destination.city,
        coordinatesLat: destination.coordinates.lat,
        coordinatesLon: destination.coordinates.lng,
        countryCode: destination.country.code,
        datetimeFrom: values.duration[0].toString(),
        datetimeTo: values.duration[1].toString(),
        reason: values.purpose,
        address: destination.address,
      });
    } else {
      approveTrip(trip?.id || 0, {
        onSuccess: () => {
          navigate({
            to: departmentApprovalRequestsRoute.to,
          });
          message.success(
            `Trip request ${trip?.requestNumber} approved successfully`
          );
        },
        onError: () => {
          message.error(
            `Failed to approve trip request ${trip?.requestNumber}`
          );
        },
      });
    }
  }

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

  const { mutate: requestRevision, isPending } = useRequestRevision();
  function handleDiscard() {
    if (!disabled) {
      navigate({
        to: tripRequestsRoute.to,
      });
    } else {
      requestRevision(trip?.id || 0, {
        onSuccess: () => {
          navigate({
            to: departmentApprovalRequestsRoute.to,
          });
          message.success(
            `Trip request ${trip?.requestNumber} revision requested successfully`
          );
        },
        onError: () => {
          message.error(
            `Failed to request revision for trip request ${trip?.requestNumber}`
          );
        },
      });
    }
  }

  if (isLoadingGetTrip) return <Skeleton />;

  if (trip)
    return (
      <TripRequestForm
        title={
          disabled
            ? `Review trip request ${trip.requestNumber
                .toString()
                .padStart(3, "0")}`
            : `Edit trip request ${trip.requestNumber
                .toString()
                .padStart(3, "0")}`
        }
        form={form}
        onSubmit={handleSubmit}
        isPending={isPending}
        onDiscard={handleDiscard}
        disabled={disabled ? true : false}
      />
    );
}
