import { GeocodingResult } from "src/api_gen";

export const geoLocationToLocationInfo = (geoLocation: GeocodingResult) => {
  const coordinates = {
    lat: geoLocation.geometry?.location?.lat || 0,
    lng: geoLocation.geometry?.location?.lng || 0,
  };

  const countryComponent = geoLocation.addressComponents?.find((component) =>
    // @ts-expect-error incorrect types from backend
    component.types?.includes("COUNTRY")
  );

  const cityComponent = geoLocation.addressComponents?.find((component) =>
    // @ts-expect-error incorrect types from backend
    component.types?.includes("LOCALITY")
  );

  if (!countryComponent || !cityComponent) return null;

  return {
    coordinates,
    country: {
      label: countryComponent.longName || "-",
      code: countryComponent.shortName || "-",
    },
    city: cityComponent.longName || "-",
    address: geoLocation.formattedAddress || "-",
  };
};

export type LocationInfo = NonNullable<
  ReturnType<typeof geoLocationToLocationInfo>
>;
