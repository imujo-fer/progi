import { Button } from "antd";
import ExpenseReport from "./components/ExpenseReport.component";
import ApprovalRequirements from "./components/ApprovalRequirementsCard";
import { useMatch } from "@tanstack/react-router";
import usePostExpenseReport from "./hooks/usePostExpenseReport";

export default function SubmitExpenseReport() {
  const match = useMatch({ from: "/expense-report/$id" });
  const id = match?.params.id;

  const { mutate: postExpenseReport } = usePostExpenseReport();

  return (
    <div className="flex flex-col justify-between h-full p-10 py-20">
      <div className="flex flex-wrap gap-20">
        <ExpenseReport />
        <ApprovalRequirements />
      </div>
      <Button size="large" onClick={() => {postExpenseReport(Number(id))}}>Submit for review</Button>
    </div>
  );
}
