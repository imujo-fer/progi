import { createRoute } from "@tanstack/react-router";
import { layoutRoute } from "../../../routes/router";
import AwaitingPayment from "../pages/Awaiting payment/AwaitingPayment.page";
import ExpenseReivewRequests from "../pages/Expense reivew requests/ExpenseReivewRequests";

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
