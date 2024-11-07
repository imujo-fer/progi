import { createRoute } from "@tanstack/react-router";
import Register from "./Register.page";
import { rootRoute } from "../../routes/router";

export const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: Register,
});
