import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { saveAs } from  "file-saver";
import { formatDateToMMDDYYYY } from "@/components/utils/formatDate";
import api from "@/common/config";
import ExcelJS from "exceljs";

export const useSummaryReports = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    api
      .get("/reference/clients")
      .then((res) => {
        setClients(res.data.CLIENTS || []);
      })
      .catch((err) => {
        console.error("Client fetch error:", err);
        toast.error("Failed to fetch clients");
      });
  }, []);

  const clearForm = () => {
    setFromDate("");
    setToDate("");

  };

  const fetchAndExportReport = async () => {
      if (!selectedClient || !fromDate || !toDate) {
        toast.error("Please fill all fields");
        return;
      }
  
      setLoading(true);
  
      try {
        const res = await api.get("/reports/summary", {
          params: {
            client_code: selectedClient,
            from_date: formatDateToMMDDYYYY(fromDate),
            to_date: formatDateToMMDDYYYY(toDate),
          },
        });
  
        const data = res.data.SUMMARY_REPORT || [];
  
        if (data.length === 0) {
          toast.error("No report data found");
          return;
        }
  
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Summary Report");
  
        const headers = Object.keys(data[0]);
  
        worksheet.addRow(headers);
        worksheet.getRow(1).font = { bold: true };
  
        data.forEach((row: Record<string, any>) => {
          worksheet.addRow(Object.values(row));
        });
  
        worksheet.columns.forEach((column) => {
          let maxLength = 10;
          column.eachCell?.((cell) => {
            const cellLength = String(cell.value).length;
            if (cellLength > maxLength) maxLength = cellLength;
          });
          column.width = maxLength + 2;
        });
  
        const buffer = await workbook.xlsx.writeBuffer();
        saveAs(new Blob([buffer]), "Summary_Report.xls");
        toast.success("Excel downloaded!");
      } catch (err) {
        console.error("Fetch or export error:", err);
        toast.error("Failed to export report");
      } finally {
        setLoading(false);
      }
    };

  return {
    clients,
    selectedClient,
    setSelectedClient,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    loading,
    setLoading,
    fetchAndExportReport,
    clearForm,
  };
};
