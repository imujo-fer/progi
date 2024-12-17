import Title from "antd/es/typography/Title";
import useGetExpenseReportItems from "../hooks/useGetExpenseReportItems";
import ExpenseReportItem from "./ExpenseReportItem";
import { Button, Flex, List } from "antd";
import CreateEditExpenseReportItemModal from "./CreateEditExpenseReportItemModal";
import { useState } from "react";

export default function ExpenseReport() {
  const { data } = useGetExpenseReportItems();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (!data || !Array.isArray(data)) {
    return <></>;
  }

  return (
    <div className="w-1/2 min-w-96">
      <Flex justify="space-between" align="center">
        <Title>Submit expense report</Title>
        <Button onClick={() => setIsOpen(true)}>Add</Button>
      </Flex>

      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.receiptId}>
            <ExpenseReportItem item={item} />
          </List.Item>
        )}
      />
      <CreateEditExpenseReportItemModal open={isOpen} setOpen={setIsOpen} />
    </div>
  );
}
