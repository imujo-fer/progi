import { Skeleton } from "antd";
import Title from "antd/es/typography/Title";
import { useGetExpenseReportInfo } from "./hooks/useGetExpenseReportInfo";
import TripReviewSidebar from "./TripReviewSidebar.component";
import ExpenseReportItem from "@/features/employee/pages/SubmitExpenseReport/components/ExpenseReportItem";

type TripReviewProps = {
  expenseReportId: number;
  actions?: React.ReactNode;
  title: string;
};

export default function TripReview({
  expenseReportId,
  title,
  actions,
}: TripReviewProps) {
  const { data: expenseReportInfo } = useGetExpenseReportInfo({
    expenseReportId,
  });

  if (!expenseReportInfo) return <Skeleton />;

  // const a = expenseReportInfo.expenseCategory[0]?.expenseReportItemInfo[0];

  return (
    <div className="w-full">
      <div className="w-full gap-16 flex">
        <div className="w-full">
          <Title level={2}>{title}</Title>
          {expenseReportInfo.expenseCategory.map((category) => (
            <div key={`category-${category.id}`}>
              <div className="flex justify-between">
                <Title level={4}>{category.name}</Title>
                <span className="text-lg">
                  {category.eurTotalCost.toFixed(2)} EUR
                </span>
              </div>
              {category.expenseReportItemInfo.map((item) => (
                <ExpenseReportItem
                  key={`item-${item.id}`}
                  item={{
                    ...item,
                    expenseReportId: expenseReportId,
                  }}
                  hideActions
                />
              ))}
            </div>
          ))}
        </div>
        <TripReviewSidebar expenseReportInfo={expenseReportInfo} />
      </div>
      <div className="flex justify-end mt-8">{actions}</div>
    </div>
  );
}
