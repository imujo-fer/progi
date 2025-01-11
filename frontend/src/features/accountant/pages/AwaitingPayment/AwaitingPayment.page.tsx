import { TripStatusDTOStatusEnum } from "@/api_gen";
import TripReview from "@/components/TripReview/TripReview.component";
import usePostTripStatus from "@/hooks/usePostTripStatus";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "antd";
import {
  awaitingPaymentRoute,
  expenseReviewRequestsRoute,
} from "../../routes/accountant.routes";

export default function AwaitingPayment() {
  const navigate = useNavigate();
  const { expenseReportId, tripId } = awaitingPaymentRoute.useRouteContext();

  const { mutate: postTripStatus, isPending } = usePostTripStatus();

  return (
    <>
      <TripReview
        title="Review Expense Report"
        expenseReportId={expenseReportId}
        actions={
          <Button
            loading={isPending}
            onClick={() => {
              postTripStatus(
                {
                  tripId,
                  status: TripStatusDTOStatusEnum.Paid,
                },
                {
                  onSuccess: () => {
                    navigate({
                      to: expenseReviewRequestsRoute.to,
                    });
                  },
                }
              );
            }}
            type="primary"
          >
            Pay
          </Button>
        }
      />
    </>
  );
}
