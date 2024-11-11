import { ReactNode, createContext, useContext } from "react";
import { UserDetailsDTO } from "@/api_gen";
import useGetCurrentUserInfo from "@/hooks/useGetCurrentUserInfo";

const UserContext = createContext<UserDetailsDTO | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const { data: user, error } = useGetCurrentUserInfo();

  if (error) return <div>Error loading user details</div>;
  if (user)
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export default function useUser() {
  const userContext = useContext(UserContext);

  if (!userContext)
    throw new Error("useUser can only be used inside UserProvider");

  return userContext;
}
