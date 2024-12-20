import { ExpenseReportItemWithSubcategoryDTO } from "@/api_gen";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "@tanstack/react-router";
import { Card, Flex } from "antd";
import CreateEditExpenseReportItemModal from "./CreateEditExpenseReportItemModal";
import { useState } from "react";

interface ExpenseReportItemProps {
  item: ExpenseReportItemWithSubcategoryDTO;
}

export default function ExpenseReportItem({ item }: ExpenseReportItemProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const actions = [
    <EditOutlined key="edit" onClick={() => setIsOpen(true)} />,
    <DeleteOutlined key="delete" />,
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
