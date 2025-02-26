import { ExpenseReportItemWithSubcategoryDTO } from "@/api_gen";
import { queryClient } from "@/providers/Providers";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card, Flex, message } from "antd";
import { useState } from "react";
import useDeleteExpenseReportItem from "../hooks/useDeleteExpenseReportItem";
import CreateEditExpenseReportItemModal from "./CreateEditExpenseReportItemModal";

interface ExpenseReportItemProps {
  item: ExpenseReportItemWithSubcategoryDTO;
  hideActions?: boolean;
}

export default function ExpenseReportItem({
  item,
  hideActions,
}: ExpenseReportItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { mutate } = useDeleteExpenseReportItem();

  const actions = [
    !hideActions && <EditOutlined key="edit" onClick={() => setIsOpen(true)} />,
    !hideActions && (
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
      />
    ),
    <a key="view-bill" href={`/api/receipts/${item.receiptId}`} target="_blank">
      Download bill
    </a>,
  ];

  return (
    <>
      <Card actions={actions.filter((a) => !!a)} className="my-3 w-full min-w-[400px]">
        <Card.Meta
          description={
            <Flex justify="space-between" align="center" className="text-black">
              <div className="w-2/3 break-words">{item.description}</div>
              <div className="flex flex-col w-1/4">
                <div className="ml-auto">
                  {`${item.currencyValue} ${item.currency} =   `}
                  <span className="font-semibold text-lg">{`${item.eurValue.toFixed(
                    2
                  )} EUR`}</span>
                </div>
                <div className="ml-auto">{item.expenseSubcategory.name}</div>
              </div>
            </Flex>
          }
        />
      </Card>
      {!hideActions && (
        <CreateEditExpenseReportItemModal
          open={isOpen}
          setOpen={setIsOpen}
          item={item}
        />
      )}
    </>
  );
}
