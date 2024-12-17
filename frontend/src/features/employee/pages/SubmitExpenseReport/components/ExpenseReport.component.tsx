import Title from "antd/es/typography/Title";
import useGetExpenseReportItems from "../hooks/useGetExpenseReportItems";
import ExpenseReportItem from "./ExpenseReportItem";
import { Button, Flex, List } from "antd";

export default function ExpenseReport() {
  const { data } = useGetExpenseReportItems();

  if (!data || !Array.isArray(data)) {
    return <></>;
  }

  return (
    <div className="w-1/2 min-w-96">
      <Flex justify="space-between" align="center">
        <Title>Submit expense report</Title>
        <Button>Add</Button>
      </Flex>

      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.receiptId}>
            <ExpenseReportItem item={item} />
          </List.Item>
        )}
      />
    </div>
  );
}
