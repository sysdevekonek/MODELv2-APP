import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { saveAs } from  "file-saver";
import { formatDateToMMDDYYYY } from "@/components/data";
import { exportToExcel } from "@/components/utils/exportExcel";
import api from "@/common/config";
import ExcelJS from "exceljs";

export const useSummaryReports = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<any[]>([]);

  const getClients = async () => {
    if (clients.length > 0) return; // optional caching

    try {
      const res = await api.get("/reference/clients");
      setClients(res.data.CLIENTS || []);
    } catch (err) {
      console.error("Client fetch error:", err);
      toast.error("Failed to fetch clients");
    }
  }

  const clearForm = () => {
    setFromDate("");
    setToDate("");
    setReportData([]);

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

    await exportToExcel(data, `Summary Report`);
    toast.success("Excel downloaded!");
  } catch (err) {
    console.error("Fetch or export error:", err);
    toast.error("Failed to export report");
  } finally {
    setLoading(false);
  }
};

  return {
    getClients,
    clients,
    selectedClient,
    setSelectedClient,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    loading,
    setLoading,
    clearForm,
    reportData,
    fetchAndExportReport
  };
};
