import { ExpenseReportInfoDTO } from "@/api_gen";
import { Card } from "antd";
import { differenceInDays, format } from "date-fns";

type TripReviewSidebarProps = {
  expenseReportInfo: ExpenseReportInfoDTO;
};

export default function TripReviewSidebar({
  expenseReportInfo,
}: TripReviewSidebarProps) {
  const tripLength = differenceInDays(
    expenseReportInfo.trip.datetimeTo,
    expenseReportInfo.trip.datetimeFrom
  );
  return (
    <div className="flex flex-col gap-16 items-center">
      <Card
        title="Info"
        bordered={false}
        className="lg:mx-auto max-h-fit max-w-md min-w-[350px] w-full"
      >
        <div className="flex  justify-between">
          <p>Employee</p>
          <p className="w-2/3 text-right">
            <b>{`${expenseReportInfo.user.firstName} ${expenseReportInfo.user.lastName}`}</b>
            -{expenseReportInfo.user.email}
          </p>
        </div>
        <hr className="mt-4"/>
        <div className="flex  justify-between">
          <p>Date</p>
          <p className="w-2/3 text-right">
            {format(
              new Date(expenseReportInfo.trip.datetimeFrom),
              "dd.MM.yyyy"
            )}{" "}
            -{" "}
            {format(new Date(expenseReportInfo.trip.datetimeTo), "dd.MM.yyyy")}
          </p>
        </div>
        <hr className="mt-4"/>
        <div className="flex  justify-between">
          <p>Trip location</p>
          <p className="w-2/3 text-right">{expenseReportInfo.trip.address}</p>
        </div>
        <hr className="mt-4"/>  
        <div className="flex  justify-between">
          <p>Reason</p>
          <p className="w-2/3 text-right">{expenseReportInfo.trip.reason}</p>
        </div>
      </Card>
      <Card
        title="Expense summary"
        bordered={false}
        className="lg:mx-auto max-h-fit max-w-md min-w-[350px] w-full"
      >
        {expenseReportInfo.expenseCategory.map((category) => (
          <div className="flex  justify-between">
            <p>{category.name}</p>
            <p>{category.eurTotalCost.toFixed(2)} EUR</p>
          </div>
        ))}

        <div className="flex  justify-between">
          <p>Daily wage</p>
          <p>
            <span className="text-xs text-gray-400">
              {tripLength} days x {expenseReportInfo.dailyWage.eurDailyWage} EUR
              =
            </span>{" "}
            <span>{expenseReportInfo.dailyWage.eurTotalWage} EUR</span>
          </p>
        </div>

        <div className="flex justify-between mt-4 font-bold">
          <p>Total</p>
          <p>{expenseReportInfo.eurExpenseSum.toFixed(2)} EUR</p>
        </div>
      </Card>
    </div>
  );
}
