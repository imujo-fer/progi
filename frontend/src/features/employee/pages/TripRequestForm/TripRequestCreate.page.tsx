import { LoadingOutlined } from "@ant-design/icons";
import { DatePicker, Form, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import Select, { DefaultOptionType } from "antd/es/select";
import { useMemo, useState } from "react";
import GoogleMapsDirections from "../../../googleMaps/GoogleMapsDirections";
import { useDebounceValue } from "usehooks-ts";
import { FormLayout } from "../../../../components/FormLayout.component";
import {
  tripRequestsCreateRoute,
  tripRequestsRoute,
} from "../../routes/employee.routes";
import useGetLocationInfo from "./hooks/useGetLocationInfo";
import {
  geoLocationToLocationInfo,
  LocationInfo,
} from "./utils/geoLocationToLocationInfo";

export default function TripRequestCreatePage() {
  const navigate = tripRequestsCreateRoute.useNavigate();
  const [form] = useForm();
  const destination: string | undefined = Form.useWatch("destination", form);
  const destinationLocationInfo = useMemo(
    () => destination && (JSON.parse(destination) as LocationInfo),
    [destination]
  );

  const [destinationSearch, setDestinationSearch] = useState("");

  const [debouncedDestination] = useDebounceValue(destinationSearch, 500);

  const { data, isLoading } = useGetLocationInfo({
    location: debouncedDestination || "",
  });

  const locationsInfo = data?.map((location) =>
    geoLocationToLocationInfo(location)
  );

  const destinationOptions: DefaultOptionType[] =
    locationsInfo
      ?.filter((locationInfo) => !!locationInfo)
      .map((locationInfo) => ({
        label: locationInfo.formattedAddress,
        value: JSON.stringify(locationInfo),
      })) || [];

  const companyCoordinates = { lat: 45.8003692, lng: 15.9713773 };

  return (
    <FormLayout
      onSubmit={() => {}}
      title="Create Trip Request"
      onDiscard={() => navigate({ to: tripRequestsRoute.to })}
      form={form}
    >
      <Form.Item
        label="Destination"
        name="destination"
        rules={[{ required: true }]}
      >
        <Select
          showSearch
          filterOption={false}
          onSearch={setDestinationSearch}
          placeholder="Destination"
          options={destinationOptions}
          notFoundContent={
            isLoading ? (
              <Spin indicator={<LoadingOutlined spin />} size="small" />
            ) : undefined
          }
          loading={isLoading}
        />
      </Form.Item>

      <Form.Item label="Duration" name="duration" rules={[{ required: true }]}>
        <DatePicker.RangePicker showTime />
      </Form.Item>

      <Form.Item label="Purpose" name="purpose" rules={[{ required: true }]}>
        <TextArea placeholder="Purpose" rows={6} />
      </Form.Item>

      {destinationLocationInfo && (
        <GoogleMapsDirections
          destination={destinationLocationInfo.coordinates}
          origin={companyCoordinates}
        />
      )}
    </FormLayout>
  );
}
