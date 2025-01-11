import { ExpenseReportInfoDTO } from "@/api_gen";
import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { format } from "date-fns";

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
  expenseReportInfo: ExpenseReportInfoDTO;
};

export default function ReportPdf({
  expenseReportInfo: { user, trip, expenseCategory, dailyWage, eurExpenseSum },
}: ReportPdfProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Trip report</Text>

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
              {format(trip.datetimeFrom, "dd.MM.yyyy")} -{" "}
              {format(trip.datetimeTo, "dd.MM.yyyy")}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text>Reason:</Text>
            <Text style={{ marginLeft: 250, marginRight: 20 }}>
              {trip.reason}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subheading}>Expenses</Text>
          {expenseCategory.map((category) => (
            <View key={category.id}>
              <Text style={styles.expenseCategory}>{category.name}</Text>
              {category.expenseReportItemInfo.map((item) => (
                <View key={item.id} style={styles.expenseItem}>
                  <Text>{item.description}</Text>
                  <Text>
                    {item.currencyValue.toFixed(2)} {item.currency} ={" "}
                    {item.eurValue.toFixed(2)} EUR
                  </Text>
                  <Text>{item.expenseSubcategory.name}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={[styles.section, styles.expenseSummary]}>
          <Text style={styles.subheading}>Expense summary</Text>
          {expenseCategory.map((category) => (
            <View key={category.id} style={styles.summaryRow}>
              <Text>{category.name}</Text>
              <Text>{category.eurTotalCost.toFixed(2)} EUR</Text>
            </View>
          ))}
          <View style={styles.summaryRow}>
            <Text>Daily wage</Text>
            <Text>
              {dailyWage.tripLengthInDays} day/s x{" "}
              {dailyWage.eurDailyWage.toFixed(2)} EUR ={" "}
              {dailyWage.eurTotalWage.toFixed(2)} EUR
            </Text>
          </View>
          <View style={styles.total}>
            <Text>Total: {eurExpenseSum.toFixed(2)} EUR</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
