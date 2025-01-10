import { createRoute } from "@tanstack/react-router";
import { layoutRoute } from "../../../routes/router";
import AwaitingPayment from "../pages/Awaiting payment/AwaitingPayment";
import ExpenseReivewRequests from "../pages/Expense reivew requests/ExpenseReivewRequests.page";

export const awaitingPaymentRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/awaiting-payment",
  component: AwaitingPayment,
});

export const expenseReviewRequestsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: "/expense-review-requests",
  component: ExpenseReivewRequests,
});
