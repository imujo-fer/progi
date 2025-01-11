import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { message } from "antd";
import { ReactNode } from "react";
import { CompanyProvider } from "./CompanyProvider";

type ProvidersProps = {
  children: ReactNode;
};

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (err) => {
      let errorMessage = err.message;

      if (typeof err.response?.data === "string") {
        errorMessage = err.response.data;
      }

      if (
        !!err.response?.data &&
        typeof err.response.data === "object" &&
        "message" in err.response.data &&
        typeof err.response.data.message === "string"
      ) {
        errorMessage = err.response.data.message;
      }

      message.error(errorMessage);
    },
  }),
});

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export function AuthedProviders({ children }: ProvidersProps) {
  return <CompanyProvider>{children}</CompanyProvider>;
}
