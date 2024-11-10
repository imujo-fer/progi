import { ReactNode, createContext, useContext } from "react";
import useGetCompanyDetails from "./hooks/useGetCompanyDetails";
import { Company } from "@/api_gen";

const CompanyContext = createContext<Company | null>(null);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const { data: company, error } = useGetCompanyDetails();

  if (error) return <div>Error loading company details</div>;
  if (company)
    return (
      <CompanyContext.Provider value={company}>
        {children}
      </CompanyContext.Provider>
    );
}

export default function useCompany() {
  const companyContext = useContext(CompanyContext);

  if (!companyContext)
    throw new Error("useCompany can only be used inside CompanyProvider");

  return companyContext;
}