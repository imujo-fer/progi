import { Button, message } from "antd";
import { expenseReportRoute } from "../../routes/employee.routes";
import ApprovalRequirements from "./components/ApprovalRequirementsCard";
import ExpenseReport from "./components/ExpenseReport.component";
import usePostExpenseReport from "./hooks/usePostExpenseReport";

export default function SubmitExpenseReport() {
  const { tripId } = expenseReportRoute.useParams();

  const { mutate: postExpenseReport } = usePostExpenseReport();

  const handleSubmit = () => {
    postExpenseReport(Number(tripId), {
      onSuccess: () => {
        message.success("Expense report submitted successfully!");
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
        <ApprovalRequirements />
      </div>
      <Button size="large" onClick={handleSubmit}>
        Submit for review
      </Button>
    </div>
  );
}
