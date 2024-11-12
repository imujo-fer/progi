import "@tanstack/react-query";
import { AxiosError } from "axios";

// Define the shape of the error object returned by the API
declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError;
  }
}
