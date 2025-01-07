import { Button } from "antd";
import ExpenseReport from "./components/ExpenseReport.component";
import ApprovalRequirements from "./components/ApprovalRequirementsCard";
import { useMatch } from "@tanstack/react-router";
import usePostExpenseReport from "./hooks/usePostExpenseReport";
import { message } from "antd";

export default function SubmitExpenseReport() {
  const match = useMatch({ from: "/$tripId/expense-report/$id" });
  const tripId = match?.params.tripId;

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
      <Button size="large" onClick={handleSubmit}>Submit for review</Button>
    </div>
  );
}
