import { createRoute } from "@tanstack/react-router";
import { layoutRoute } from "../../../routes/router";
import InviteUserForm from "../pages/Invite/InviteUserForm";

export const inviteUserRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/invite-user",
  component: InviteUserForm,
});
