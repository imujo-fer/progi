import { CountryDailyWageDTO } from "@/api_gen";
import { FormLayout } from "@/components/FormLayout.component";
import useGetLocationInfo from "@/features/employee/pages/TripRequestForm/hooks/useGetLocationInfo";
import {
  geoLocationToLocationInfo,
  LocationInfo,
} from "@/features/employee/pages/TripRequestForm/utils/geoLocationToLocationInfo";
import { LoadingOutlined } from "@ant-design/icons";
import { Collapse, Form, InputNumber, Select, Spin } from "antd";
import { DefaultOptionType } from "antd/es/select";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import { entries, groupBy } from "remeda";
import { useDebounceValue } from "usehooks-ts";
import { useGetSettings } from "./hooks/useGetSettings";
import { usePatchSettings } from "./hooks/usePatchSettings";

export default function Settings() {
  const { data: companySettings } = useGetSettings();
  const { mutate: patchSettings, isPending: isPendingPatchSettings } =
    usePatchSettings();

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

  const [pricePerKm, setPricePerKm] = useState(
    companySettings.eurCostPerKm || 0
  );
  const [companyAddress, setCompanyAddress] = useState<LocationInfo>({
    address: companySettings.address || "",
    city: companySettings.city || "",
    country: {
      code: companySettings.countryCode || "",
      label: companySettings.countryName || "",
    },
    coordinates: {
      lat: companySettings.locationCoordLat || 0,
      lng: companySettings.locationCoordLon || 0,
    },
  });
  const [iban, setIban] = useState(companySettings.iban || "");
  const [dailyWages, setDailyWages] = useState<CountryDailyWageDTO[]>(
    companySettings.dailyWages || []
  );

  const groupedDailyWages = groupBy(
    dailyWages,
    (dailyWage) => dailyWage.continentName
  );

  const onSave = () => {
    console.log({ companyAddress });
    patchSettings({
      id: companySettings.id,
      address: companyAddress.address,
      city: companyAddress.city,
      countryCode: companyAddress.country.code,
      locationCoordLat: companyAddress.coordinates.lat,
      locationCoordLon: companyAddress.coordinates.lng,
      eurCostPerKm: pricePerKm,
      iban,
      dailyWages,
    });
  };

  return (
    <FormLayout
      title={"Settings"}
      onSubmit={onSave}
      isPending={isPendingPatchSettings}
      hideCancel
    >
      <Form.Item
        label="Destination"
        name="destination"
        // rules={[{ required: true, message: "Destination is required" }]}
      >
        <Select
          showSearch
          filterOption={false}
          onSearch={setDestinationSearch}
          defaultValue={JSON.stringify(companyAddress)}
          value={JSON.stringify(companyAddress)}
          placeholder="Destination"
          options={destinationOptions}
          labelRender={(item) => JSON.parse(item.value as string).address}
          notFoundContent={
            isLoading ? (
              <Spin indicator={<LoadingOutlined spin />} size="small" />
            ) : undefined
          }
          onChange={(value) => {
            const locationInfo = JSON.parse(value as string) as LocationInfo;
            setCompanyAddress(locationInfo);
          }}
          loading={isLoading}
        />
      </Form.Item>
      <Form.Item label="Price per km">
        <InputNumber
          value={pricePerKm}
          onChange={(value) => setPricePerKm(value || 0)}
          className="min-w-[200px]"
          placeholder="Price per km"
          suffix="€"
        />
      </Form.Item>

      <Form.Item label="IBAN">
        <InputNumber
          value={iban}
          onChange={(value) => setIban(value?.toString() || "")}
          className="min-w-[200px]"
          placeholder="IBAN"
        />
      </Form.Item>

      <Title level={4}>Daily wages</Title>
      {entries(groupedDailyWages).map(([continentName, dailyWages]) => {
        return (
          <Collapse
            key={continentName}
            expandIconPosition="right"
            className="mb-4"
          >
            <Collapse.Panel header={continentName} key="0">
              {dailyWages.map((dailyWage, index) => {
                return (
                  <div>
                    <Form.Item label={dailyWage.countryName}>
                      <InputNumber
                        value={dailyWage.eurDailyWage}
                        onChange={(value) => {
                          setDailyWages((prevDailyWages) => {
                            const newDailyWages = [...prevDailyWages];
                            newDailyWages[index] = {
                              continentName: dailyWage.continentName,
                              countryName: dailyWage.countryName,
                              countryCode: dailyWage.countryCode,
                              eurDailyWage: value || 0,
                            };
                            return newDailyWages;
                          });
                        }}
                        className="min-w-[200px]"
                        placeholder="Daily wage"
                        suffix="€"
                      />
                    </Form.Item>
                  </div>
                );
              })}
            </Collapse.Panel>
          </Collapse>
        );
      })}
    </FormLayout>
  );
}
