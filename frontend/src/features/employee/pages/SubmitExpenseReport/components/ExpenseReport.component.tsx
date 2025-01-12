import { expenseReportRoute } from "@/features/employee/routes/employee.routes";
import { Button, Flex, List } from "antd";
import Title from "antd/es/typography/Title";
import { useState } from "react";
import useGetExpenseReportItems from "../hooks/useGetExpenseReportItems";
import CreateEditExpenseReportItemModal from "./CreateEditExpenseReportItemModal";
import ExpenseReportItem from "./ExpenseReportItem";

export default function ExpenseReport() {
  const { expenseReportId } = expenseReportRoute.useParams();

  const { data } = useGetExpenseReportItems(Number(expenseReportId));

  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (!data || !Array.isArray(data)) {
    return <></>;
  }

  return (
    <div className="w-full min-w-96 m-auto">
      <Flex justify="space-between" align="center">
        <Title level={2}>Expense report</Title>
        <Button onClick={() => setIsOpen(true)}>Add</Button>
      </Flex>

      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <ExpenseReportItem item={item} />
          </List.Item>
        )}
      />
      <CreateEditExpenseReportItemModal open={isOpen} setOpen={setIsOpen} />
    </div>
  );
}
