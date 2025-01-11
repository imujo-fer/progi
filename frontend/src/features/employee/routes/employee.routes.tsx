import { createRoute } from "@tanstack/react-router";
import { layoutRoute, rootRoute } from "../../../routes/router";
import { coerceToNumber } from "../../../utils/coerceToNumber";
import Notifications from "../pages/Notifications/Notifications.page";
import SubmitExpenseReport from "../pages/SubmitExpenseReport/SubmitExpenseReport.page";
import ExpenseReportItemReceipt from "../pages/SubmitExpenseReport/components/ExpenseReportItemReceipt";
import TripRequestCreatePage from "../pages/TripRequestForm/TripRequestCreate.page";
import TripRequestEditPage from "../pages/TripRequestForm/TripRequestEdit.page";
import TripRequests from "../pages/TripRequests/TripRequests.page";

export const _tripRequestsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/trip-requests",
});

export const tripRequestsRoute = createRoute({
  getParentRoute: () => _tripRequestsRoute,
  path: "/",
  component: TripRequests,
});

export const tripRequestsCreateRoute = createRoute({
  getParentRoute: () => _tripRequestsRoute,
  path: "/create",
  component: TripRequestCreatePage,
});

export const tripRequestsEditRoute = createRoute({
  getParentRoute: () => _tripRequestsRoute,
  path: "/$tripId/edit",
  beforeLoad: async ({ params }) => {
    const tripId = coerceToNumber(params.tripId);
    return { tripId };
  },
  component: TripRequestEditPage,
});

export const notificationsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/notifications",
  component: Notifications,
});

export const expenseReportRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "$tripId/expense-report/$expenseReportId",
  component: SubmitExpenseReport,
});

export const expenseReportItemReceiptRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "receipts/$receiptFileName",
  component: ExpenseReportItemReceipt,
});
