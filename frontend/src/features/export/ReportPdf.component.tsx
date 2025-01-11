import { ExpenseReportItemCurrencyEnum } from "@/api_gen";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subheading: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  infoRow: {
    fontSize: 12,
    marginBottom: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  expenseCategory: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  expenseItem: {
    fontSize: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  expenseSummary: {
    marginTop: 20,
    borderTop: "1px solid #000",
    paddingTop: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 12,
    marginVertical: 4,
  },
  total: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    borderTop: "1px solid #000",
    paddingTop: 5,
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

export default function ReportPdf({
  user,
  trip,
  expenseCategories,
  dailyWage,
  eurExpensesSum,
}: ReportPdfProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Title */}
        <Text style={styles.title}>Trip report</Text>

        {/* Trip info */}
        <View style={styles.section}>
          <Text style={styles.subheading}>Info</Text>
          <View style={styles.infoRow}>
            <Text>Employee name:</Text>
            <Text>
              {user.firstName} {user.lastName}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text>Employee email:</Text>
            <Text>{user.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text>Trip dates:</Text>
            <Text>
              {trip.from.toLocaleDateString("hr-HR")} -{" "}
              {trip.to.toLocaleDateString("hr-HR")}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text>Reason:</Text>
            <Text style={{ marginLeft: 250, marginRight: 20 }}>
              {trip.reason}
            </Text>
          </View>
        </View>

        {/* Expenses */}
        <View style={styles.section}>
          <Text style={styles.subheading}>Expenses</Text>
          {expenseCategories.map((category) => (
            <View key={category.id}>
              <Text style={styles.expenseCategory}>{category.name}</Text>
              {category.expenseReportItems.map((item) => (
                <View key={item.id} style={styles.expenseItem}>
                  <Text>{item.description}</Text>
                  <Text>
                    {item.currencyValue} {item.currency} = {item.eurValue} EUR
                  </Text>
                  <Text>{item.expenseReportSubcategory.name}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* Expense summary*/}
        <View style={[styles.section, styles.expenseSummary]}>
          <Text style={styles.subheading}>Expense summary</Text>
          {expenseCategories.map((category) => (
            <View key={category.id} style={styles.summaryRow}>
              <Text>{category.name}</Text>
              <Text>{category.eurTotalCost.toFixed(2)} EUR</Text>
            </View>
          ))}
          <View style={styles.summaryRow}>
            <Text>Daily wage</Text>
            <Text>
              {dailyWage.tripLengthInDays} day/s x {dailyWage.euroDailyWage} EUR
              = {dailyWage.eurTotalWage} EUR
            </Text>
          </View>
          <View style={styles.total}>
            <Text>Total: {eurExpensesSum.toFixed(2)} EUR</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
