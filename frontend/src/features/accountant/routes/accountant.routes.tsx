import { createRoute } from "@tanstack/react-router";
import { layoutRoute } from "../../../routes/router";

import ExpenseReivewRequests from "../pages/Expense reivew requests/ExpenseReivewRequests.page";
import { coerceToNumber } from "@/utils/coerceToNumber";
import ExpenseReportReview from "../pages/ExpenseReportReview/ExpenseReportReview.page";
import AwaitingPaymentTable from "../pages/AwaitingPaymentTable/AwaitingPaymentTable.page";
import AwaitingPayment from "../pages/AwaitingPayment/AwaitingPayment.page";

export const awaitingPaymentTableRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/awaiting-payment",
  component: AwaitingPaymentTable,
});

export const expenseReviewRequestsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/expense-review-requests",
  component: ExpenseReivewRequests,
});

export const expenseReviewRequestRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/expense-review-request/$tripId/$expenseReportId",
  beforeLoad: ({ params }) => {
    const expenseReportId = coerceToNumber(params.expenseReportId);
    const tripId = coerceToNumber(params.tripId);

    return {
      expenseReportId,
      tripId,
    };
  },
  component: ExpenseReportReview,
});

export const awaitingPaymentRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/awaiting-payment/$tripId/$expenseReportId",
  beforeLoad: ({ params }) => {
    const expenseReportId = coerceToNumber(params.expenseReportId);
    const tripId = coerceToNumber(params.tripId);

    return {
      expenseReportId,
      tripId,
    };
  },
  component: AwaitingPayment,
});
