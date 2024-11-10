import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../../routes/router";
import Login from "./Login.page";

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});
