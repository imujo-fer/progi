import {
  CompanyControllerApi,
  Configuration,
  GoogleMapsControllerApi,
  TripControllerApi,
} from "./api_gen";

export const baseApiRoute = window.location.origin;
export const apiConfig = new Configuration({
  basePath: baseApiRoute,
  baseOptions: {
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  },
});

export const tripApi = new TripControllerApi(apiConfig);
export const googleMapsApi = new GoogleMapsControllerApi(apiConfig);
export const companyApi = new CompanyControllerApi(apiConfig);
