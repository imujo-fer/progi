import {
  CompanyControllerApi,
  Configuration,
  ExpenseReportControllerApi,
  ExpenseReportItemControllerApi,
  GoogleMapsControllerApi,
  StatisticsControllerApi,
  TripControllerApi,
  TripStatusControllerApi,
  UserControllerApi,
  DepartmentControllerApi
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
export const expenseReportApi = new ExpenseReportControllerApi(apiConfig);
export const expenseReportItemApi = new ExpenseReportItemControllerApi(
  apiConfig
);

export const userApi = new UserControllerApi(apiConfig);
export const tripStatusApi = new TripStatusControllerApi(apiConfig);
export const statisticsApi = new StatisticsControllerApi(apiConfig);
export const departmentApi = new DepartmentControllerApi(apiConfig);