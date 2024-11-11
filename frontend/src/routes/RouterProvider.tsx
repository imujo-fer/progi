import { RouterProvider as TanstackRouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import useUser from "@/providers/UserProvider";

export default function RouterProvider() {
  const user = useUser({ optional: true });

  return <TanstackRouterProvider router={router} context={{ user }} />;
}
