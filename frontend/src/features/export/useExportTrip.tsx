import { expenseReportApi } from "@/apiClient";
import { pdf } from "@react-pdf/renderer";
import { useMutation } from "@tanstack/react-query";
import { saveAs } from "file-saver";
import ReportPdf from "./ReportPdf.component";

export function useExportTrip() {
  return useMutation({
    mutationFn: async ({
      expenseReportId,
    }: {
      expenseReportId: number;
      fileName: string;
    }) => {
      const response = await expenseReportApi.getExpenseReportInfo({
        id: expenseReportId,
      });
      return response.data;
    },
    onSuccess: async (expenseReportInfo, { fileName }) => {
      const blob = await pdf(
        <ReportPdf expenseReportInfo={expenseReportInfo} />
      ).toBlob();
      saveAs(blob, fileName);
    },
  });
}
