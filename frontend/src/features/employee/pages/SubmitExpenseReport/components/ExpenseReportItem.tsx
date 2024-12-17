import { ExpenseReportItemWithSubcategoryDTO } from "@/api_gen";
import { EditOutlined, SettingOutlined } from "@ant-design/icons";
import { Link } from "@tanstack/react-router";
import { Card, Flex } from "antd";

interface ExpenseReportItemProps {
  item: ExpenseReportItemWithSubcategoryDTO;
}

export default function ExpenseReportItem({ item }: ExpenseReportItemProps) {
  const actions = [
    <EditOutlined key="edit" />,
    <SettingOutlined key="setting" />,
    <Link>View bill</Link>,
  ];
  return (
    <Card actions={actions} className="my-3">
      <Card.Meta
        description={
          <Flex justify="space-between" align="center" className="text-black">
            <div className="w-2/3">{item.description}</div>
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
