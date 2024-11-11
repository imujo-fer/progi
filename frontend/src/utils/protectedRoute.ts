import { loginRoute, RootRouteContext } from "@/routes/router";
import { redirect } from "@tanstack/react-router";

type ProtectedRouteProps = {
  context: RootRouteContext;
};
export function protectedRoute({ context }: ProtectedRouteProps) {
  if (!context.user) {
    throw redirect({
      to: loginRoute.to,
    });
  }
}
