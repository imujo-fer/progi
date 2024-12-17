import { Button, Card } from "antd";
import ExpenseReport from "./components/ExpenseReport.component";

export default function SubmitExpenseReport() {
  const comment =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s";
  return (
    <div className="flex flex-col justify-between h-full p-10 py-20">
      <div className="flex lg:flex-row flex-col">
        <ExpenseReport />
        <Card
          title="Approval Requirements"
          bordered={false}
          className="lg:mx-auto max-h-fit max-w-md"
        >
          <p className="break-words">{comment}</p>
        </Card>
      </div>
      <Button size="large">Submit for review</Button>
    </div>
  );
}
