import { ExpenseReportItemWithSubcategoryDTO } from "@/api_gen";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "@tanstack/react-router";
import { Card, Flex, message } from "antd";
import CreateEditExpenseReportItemModal from "./CreateEditExpenseReportItemModal";
import { useState } from "react";
import useDeleteExpenseReportItem from "../hooks/useDeleteExpenseReportItem";
import { queryClient } from "@/providers/Providers";

interface ExpenseReportItemProps {
  item: ExpenseReportItemWithSubcategoryDTO;
}

export default function ExpenseReportItem({ item }: ExpenseReportItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutate } = useDeleteExpenseReportItem();

  const actions = [
    <EditOutlined key="edit" onClick={() => setIsOpen(true)} />,
    <DeleteOutlined
      key="delete"
      onClick={() => {
        mutate(item.id, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["expense report items"],
            });
            message.success("Expense item deleted successfully!");
          },
          onError: () => {
            message.error("Failed to delete expense item.");
          },
        });
      }}
    />,
    <Link>View bill</Link>,
  ];
  console.log(item);
  return (
    <>
      <Card actions={actions} className="my-3 w-full">
        <Card.Meta
          description={
            <Flex justify="space-between" align="center" className="text-black">
              <div className="w-2/3 break-words">{item.description}</div>
              <div className="flex flex-col w-1/4">
                <div className="ml-auto">
                  {`${item.currencyValue} ${item.currency} =   `}
                  <span className="font-semibold text-lg">{`${item.eurValue} EUR`}</span>
                </div>
                <div className="ml-auto">{item.expenseSubcategory.name}</div>
              </div>
            </Flex>
          }
        />
      </Card>
      <CreateEditExpenseReportItemModal
        open={isOpen}
        setOpen={setIsOpen}
        item={item}
      />
    </>
  );
}
