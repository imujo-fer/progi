import { Button, message } from "antd";
import {
  expenseReportRoute,
  tripRequestsRoute,
} from "../../routes/employee.routes";
import ApprovalRequirements from "./components/ApprovalRequirementsCard";
import ExpenseReport from "./components/ExpenseReport.component";
import useSubmitExpenseReport from "./hooks/useSubmitExpenseReport";

export default function SubmitExpenseReport() {
  const { tripId } = expenseReportRoute.useParams();
  const navigate = expenseReportRoute.useNavigate();

  const { mutate: submitExpenseReport, isPending } = useSubmitExpenseReport();

  const handleSubmit = () => {
    submitExpenseReport(Number(tripId), {
      onSuccess: () => {
        message.success("Expense report submitted successfully!");
        navigate({
          to: tripRequestsRoute.to,
        });
      },
      onError: () => {
        message.error("Failed to submit expense report.");
      },
    });
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex gap-20">
        <ExpenseReport />
        <ApprovalRequirements tripId={Number(tripId)} />
      </div>
      <div className="flex justify-end pb-12">
        <Button type="primary" onClick={handleSubmit} loading={isPending}>
          Submit for review
        </Button>
      </div>
    </div>
  );
}
