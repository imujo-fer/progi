import { DatePicker, Form, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import Select, { DefaultOptionType } from "antd/es/select";
import { useDebounceValue } from "usehooks-ts";
import { FormLayout } from "../../../../components/FormLayout.component";
import {
  tripRequestsCreateRoute,
  tripRequestsRoute,
} from "../../routes/employee.routes";
import useGetLocationInfo from "./hooks/useGetLocationInfo";
import { geoLocationToLocationInfo } from "./utils/geolocationToLocationInfo";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

export default function TripRequestCreatePage() {
  const navigate = tripRequestsCreateRoute.useNavigate();
  const [form] = useForm();
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
      .map((locationInfo, index) => ({
        label: locationInfo.formattedAddress,
        value: index,
      })) || [];

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
    </FormLayout>
  );
}
