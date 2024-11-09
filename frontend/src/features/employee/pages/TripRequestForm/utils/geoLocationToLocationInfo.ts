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

  const streetComponent = geoLocation.addressComponents?.find((component) =>
    // @ts-expect-error incorrect types from backend
    component.types?.includes("ROUTE")
  );

  const streetNumberComponent = geoLocation.addressComponents?.find(
    (component) =>
      // @ts-expect-error incorrect types from backend
      component.types?.includes("STREET_NUMBER")
  );

  const address =
    streetComponent &&
    `${streetComponent?.longName || ""} ${
      streetNumberComponent?.longName || ""
    }`;

  if (!countryComponent || !cityComponent) return null;

  return {
    coordinates,
    country: {
      label: countryComponent.longName || "-",
      code: countryComponent.shortName || "-",
    },
    city: cityComponent.longName || "-",
    address,
    formattedAddress: geoLocation.formattedAddress || "-",
  };
};
