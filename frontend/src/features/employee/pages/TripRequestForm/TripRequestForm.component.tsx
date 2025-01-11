import { LoadingOutlined } from "@ant-design/icons";
import { DatePicker, Form, Spin } from "antd";
import { FormInstance, FormProps } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import Select, { DefaultOptionType } from "antd/es/select";
import { useMemo, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { FormLayout } from "../../../../components/FormLayout.component";
import GoogleMapsDirections from "../../../googleMaps/GoogleMapsDirections";
import useGetLocationInfo from "./hooks/useGetLocationInfo";
import {
  geoLocationToLocationInfo,
  LocationInfo,
} from "./utils/geoLocationToLocationInfo";
import dayjs from "dayjs";
import useCompany from "@/providers/CompanyProvider";

export type TripRequestFormType = {
  destination: string;
  duration: [dayjs.Dayjs, dayjs.Dayjs];
  purpose: string;
};

type TripRequestFormProps = {
  title: string;
  form: FormInstance<TripRequestFormType>;
  onSubmit: NonNullable<FormProps<TripRequestFormType>["onFinish"]>;
  isPending: boolean;
  onDiscard?: () => void;
  disabled?: boolean;
  onCancel?: () => void;
};

export default function TripRequestForm({
  isPending,
  form,
  onDiscard,
  onSubmit,
  title,
  onCancel,
  disabled,
}: TripRequestFormProps) {
  const destination: string | undefined = Form.useWatch("destination", form);
  const destinationLocationInfo = useMemo(() => {
    if (!destination) return undefined;
    return JSON.parse(destination) as LocationInfo;
  }, [destination]);

  const company = useCompany();

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
        label: locationInfo.address,
        value: JSON.stringify(locationInfo),
      })) || [];

  return (
    <FormLayout
      onSubmit={onSubmit}
      submitLabel={disabled ? "Approve" : "Save"}
      title={title}
      onDiscard={onDiscard}
      onCancel={onCancel}
      discardLabel={disabled ? "Request revision" : "Cancel"}
      form={form}
      isPending={isPending}
    >
      <Form.Item
        label="Destination"
        name="destination"
        rules={[{ required: true, message: "Destination is required" }]}
      >
        <Select
          showSearch
          filterOption={false}
          onSearch={setDestinationSearch}
          placeholder="Destination"
          options={destinationOptions}
          labelRender={(item) => JSON.parse(item.value as string).address}
          notFoundContent={
            isLoading ? (
              <Spin indicator={<LoadingOutlined spin />} size="small" />
            ) : undefined
          }
          loading={isLoading}
          disabled={disabled}
        />
      </Form.Item>

      <Form.Item
        label="Duration"
        name="duration"
        rules={[{ required: true, message: "Duration is required" }]}
      >
        <DatePicker.RangePicker showTime disabled={disabled} />
      </Form.Item>

      <Form.Item
        label="Purpose"
        name="purpose"
        rules={[{ required: true, message: "Purpose is required" }]}
      >
        <TextArea placeholder="Purpose" rows={6} disabled={disabled} />
      </Form.Item>

      {destinationLocationInfo && (
        <GoogleMapsDirections
          destination={destinationLocationInfo.coordinates}
          origin={{
            lat: company.locationCoordLat,
            lng: company.locationCoordLon,
          }}
        />
      )}
    </FormLayout>
  );
}
