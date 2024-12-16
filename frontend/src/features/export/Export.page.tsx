import { PDFViewer } from "@react-pdf/renderer";
import ReportPdf, { ReportPdfProps } from "./ReportPdf.component";
import { ExpenseReportItemCurrencyEnum } from "@/api_gen";

const defaultPdfProps: ReportPdfProps = {
  user: {
    firstName: "Pero",
    lastName: "Peric",
    email: "pero@peric.com",
  },
  trip: {
    from: new Date(),
    to: new Date(),
    city: "Zagreb",
    country: {
      name: "Croatia",
      eurDailyWage: 30,
      code: "HR",
    },
    reason:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s...",
  },
  expenseCategories: [
    {
      id: 1,
      eurTotalCost: 100,
      expenseReportItems: [
        {
          id: 1,
          description: "Hotel",
          currency: ExpenseReportItemCurrencyEnum.Eur,
          currencyValue: 100,
          eurValue: 100,
          expenseReportSubcategory: {
            id: 1,
            name: "Hotel",
          },
        },
        {
          id: 2,
          description: "Hostel",
          currency: ExpenseReportItemCurrencyEnum.Eur,
          currencyValue: 100,
          eurValue: 100,
          expenseReportSubcategory: {
            id: 1,
            name: "Hotel",
          },
        },
      ],
      name: "Accommodation",
    },
    {
      id: 2,
      eurTotalCost: 200,
      expenseReportItems: [
        {
          id: 3,
          description: "Breakfast",
          currency: ExpenseReportItemCurrencyEnum.Eur,
          currencyValue: 100,
          eurValue: 100,
          expenseReportSubcategory: {
            id: 2,
            name: "Food",
          },
        },
        {
          id: 4,
          description: "Lunch",
          currency: ExpenseReportItemCurrencyEnum.Eur,
          currencyValue: 100,
          eurValue: 100,
          expenseReportSubcategory: {
            id: 2,
            name: "Food",
          },
        },
      ],
      name: "Food",
    },
    {
      id: 3,
      eurTotalCost: 300,
      expenseReportItems: [
        {
          id: 5,
          description: "Bus",
          currency: ExpenseReportItemCurrencyEnum.Eur,
          currencyValue: 100,
          eurValue: 100,
          expenseReportSubcategory: {
            id: 3,
            name: "Transport",
          },
        },
        {
          id: 6,
          description: "Train",
          currency: ExpenseReportItemCurrencyEnum.Eur,
          currencyValue: 100,
          eurValue: 100,
          expenseReportSubcategory: {
            id: 3,
            name: "Transport",
          },
        },
      ],
      name: "Transport",
    },
    {
      id: 4,
      eurTotalCost: 400,
      expenseReportItems: [
        {
          id: 7,
          description: "Museum",
          currency: ExpenseReportItemCurrencyEnum.Eur,
          currencyValue: 100,
          eurValue: 100,
          expenseReportSubcategory: {
            id: 4,
            name: "Culture",
          },
        },
        {
          id: 8,
          description: "Cinema",
          currency: ExpenseReportItemCurrencyEnum.Eur,
          currencyValue: 100,
          eurValue: 100,
          expenseReportSubcategory: {
            id: 4,
            name: "Culture",
          },
        },
        {
          id: 9,
          description: "Theater",
          currency: ExpenseReportItemCurrencyEnum.Eur,
          currencyValue: 100,
          eurValue: 100,
          expenseReportSubcategory: {
            id: 4,
            name: "Culture",
          },
        },
      ],
      name: "Other",
    },
  ],

  dailyWage: {
    tripLengthInDays: 2,
    euroDailyWage: 30,
    eurTotalWage: 60,
  },
  eurExpensesSum: 589,
};

export default function Export() {
  return (
    <PDFViewer width="100%" className="h-screen">
      <ReportPdf {...defaultPdfProps} />
    </PDFViewer>
  );
}
