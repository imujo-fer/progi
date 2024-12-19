import { ReactNode, createContext, useContext } from "react";
import { UserDetailsDTO } from "@/api_gen";
import useGetCurrentUserInfo from "@/hooks/useGetCurrentUserInfo";

const UserContext = createContext<UserDetailsDTO | undefined | null>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading } = useGetCurrentUserInfo();

  if (isLoading) return null;

  return (
    <UserContext.Provider value={user || null}>{children}</UserContext.Provider>
  );
}

export default function useUser(options: {
  optional: true;
}): UserDetailsDTO | null;
export default function useUser(options: { optional: false }): UserDetailsDTO;
export default function useUser(options?: undefined): UserDetailsDTO;

export default function useUser(options?: { optional: boolean }) {
  const userContext = useContext(UserContext);

  const optional = !options || options.optional;

  if (userContext === undefined)
    throw new Error("useUser can only be used inside UserProvider");

  if (!optional && userContext === null)
    throw new Error("User is not logged in");

  return userContext;
}
