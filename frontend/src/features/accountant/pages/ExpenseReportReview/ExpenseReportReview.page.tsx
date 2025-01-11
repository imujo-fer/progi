import TripReview from "@/components/TripReview/TripReview.component";
import { Button, Form, Modal, Space } from "antd";
import {
  expenseReviewRequestRoute,
  expenseReviewRequestsRoute,
} from "../../routes/accountant.routes";
import usePostTripStatus from "@/hooks/usePostTripStatus";
import useModal from "@/hooks/useModal";
import { useNavigate } from "@tanstack/react-router";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { TripStatusDTOStatusEnum } from "@/api_gen";

export default function ExpenseReportReview() {
  const navigate = useNavigate();
  const [reviewMessage, setReviewMessage] = useState("");
  const { expenseReportId, tripId } =
    expenseReviewRequestRoute.useRouteContext();

  const { mutate: postTripStatus, isPending } = usePostTripStatus();

  const requestRevisionModal = useModal();

  return (
    <>
      <TripReview
        title="Review Expense Report"
        expenseReportId={expenseReportId}
        actions={
          <Space>
            <Button onClick={requestRevisionModal.openModal} danger>
              Request revision
            </Button>
            <Button
              loading={isPending}
              onClick={() => {
                postTripStatus(
                  {
                    tripId,
                    status: TripStatusDTOStatusEnum.PendingDirectorApproval,
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
              Approve
            </Button>
          </Space>
        }
      />

      <Modal
        title={"Request Revision"}
        open={requestRevisionModal.isModalOpen}
        onOk={() => {
          postTripStatus(
            {
              tripId,
              status: TripStatusDTOStatusEnum.ExpenseApprovalRejected,
              message: reviewMessage,
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
        onCancel={requestRevisionModal.closeModal}
        okText={"Request revision"}
        okType="danger"
        cancelText={"Review again"}
        okButtonProps={{ type: "primary", loading: isPending }}
      >
        <Form.Item
          name="revisionMessage"
          rules={[
            {
              required: true,
              message: "Please input the required changes!",
            },
          ]}
        >
          <TextArea
            value={reviewMessage}
            onChange={(e) => setReviewMessage(e.target.value)}
            placeholder="Input required changes"
          />
        </Form.Item>
      </Modal>
    </>
  );
}
