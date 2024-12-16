import { ExpenseReportItemCurrencyEnum } from "@/api_gen";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export type ReportPdfProps = {
  expenseCategories: {
    id: number;
    name: string;
    eurTotalCost: number;
    expenseReportItems: {
      id: number;
      description: string;
      currency: ExpenseReportItemCurrencyEnum;
      currencyValue: number;
      eurValue: number;
      expenseReportSubcategory: {
        id: number;
        name: string;
      };
    }[];
  }[];
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  trip: {
    from: Date;
    to: Date;
    city: string;
    country: {
      name: string;
      eurDailyWage: number;
      code: string;
    };
    reason: string;
  };
  dailyWage: {
    tripLengthInDays: number; // broj dana na putovanju
    euroDailyWage: number; // dnevnica u eurima
    eurTotalWage: number; // ukupno isplaceno zbog dnevnica
  };
  eurExpensesSum: number; // ukupni troskovi putovanja
};

export default function ReportPdf({ user }: ReportPdfProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{user.firstName}</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );
}
