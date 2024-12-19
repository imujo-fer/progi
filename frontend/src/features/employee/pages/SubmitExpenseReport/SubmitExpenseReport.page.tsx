import { Button } from "antd";
import ExpenseReport from "./components/ExpenseReport.component";
import ApprovalRequirements from "./components/ApprovalRequirementsCard";

export default function SubmitExpenseReport() {
  return (
    <div className="flex flex-col justify-between h-full p-10 py-20">
      <div className="flex lg:flex-row flex-col">
        <ExpenseReport />
        <ApprovalRequirements />
      </div>
      <Button size="large">Submit for review</Button>
    </div>
  );
}
