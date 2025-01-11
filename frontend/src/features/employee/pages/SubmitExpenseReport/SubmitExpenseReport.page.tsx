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
    <div className="flex flex-col justify-between h-full p-10 py-20">
      <div className="flex flex-wrap gap-20">
        <ExpenseReport />
        <ApprovalRequirements tripId={Number(tripId)} />
      </div>
      <Button size="large" onClick={handleSubmit} loading={isPending}>
        Submit for review
      </Button>
    </div>
  );
}
