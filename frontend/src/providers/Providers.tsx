import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { CompanyProvider } from "./CompanyProvider";

type ProvidersProps = {
  children: ReactNode;
};

export const queryClient = new QueryClient();

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export function AuthedProviders({ children }: ProvidersProps) {
  return <CompanyProvider>{children}</CompanyProvider>;
}
