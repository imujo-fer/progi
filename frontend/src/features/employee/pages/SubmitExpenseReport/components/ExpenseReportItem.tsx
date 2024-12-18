import { ExpenseReportItemWithSubcategoryDTO } from "@/api_gen";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "@tanstack/react-router";
import { Card, Flex } from "antd";

interface ExpenseReportItemProps {
  item: ExpenseReportItemWithSubcategoryDTO;
  onEdit: (item: ExpenseReportItemWithSubcategoryDTO) => void;
}

export default function ExpenseReportItem({
  item,
  onEdit,
}: ExpenseReportItemProps) {
  const actions = [
    <EditOutlined
      key="edit"
      onClick={() => {
        onEdit(item);
      }}
    />,
    <DeleteOutlined key="delete" />,
    <Link>View bill</Link>,
  ];
  return (
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
  );
}
