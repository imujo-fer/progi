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
    <div className="flex justify-between flex-col w-full min-h-full gap-16">
      <div className="w-full gap-16 flex [@media(min-width:1300px)]:flex-row flex-col h-auto min-h-full items-center">
        <div className="w-full">
          <ExpenseReport />
        </div>
        
        <ApprovalRequirements tripId={Number(tripId)} />
      </div>
      <div className="flex justify-end my-8">
        <Button type="primary" onClick={handleSubmit} loading={isPending}>
          Submit for review
        </Button>
      </div>
    </div>
  );
}
