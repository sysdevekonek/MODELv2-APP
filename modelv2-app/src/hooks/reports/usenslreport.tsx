"use client";
import { useRef, useState, useEffect } from "react";
import { toast } from 'react-hot-toast';
import { ComboBoxRef } from "@/components/comboBox";
import { NSLdata } from "../../components/utils/nslDatatable/columns";
import ExcelJS from "exceljs";
import api from '../../common/config';
import { 
  useTemplateDropdown, 
  useConsigneeDropdown, 
  useDepartmentDropdown, 
  useConsolidatorDropdown, 
  useWarehouseDropdown, 
  useSADDropdown 
} from "@/components/dropdownAPI";
import axios from "axios";

const defaultRow: NSLdata = {
  id: "default-1",
  number: 1,
  label: "---",
  description: "--- Select SAD ---",
  button: ``,
};

async function getData(): Promise<NSLdata[]> {
  return [
    {
      id: "728ed52f",
      number: 1,
      label: "---",
      description: "--- Select SAD ---",
      button: "",
    },
  ];
}

const parseColumns = (input?: string) =>
  (input ?? "")
    .split(";")
    .map((s) => s.trim())
    .filter(Boolean);

export const usenslreport = () => {
  const comboRef = useRef<ComboBoxRef>(null);
  const [data, setData] = useState<NSLdata[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [saving, setSaving] = useState(false);

  // dropdown hooks
  const { templateDropdown, selectedTemplate, setSelectedTemplate, descValue } = useTemplateDropdown();
  const { consigneeDropdown, selectedConsignee, setSelectedConsignee, fetchConsignee, fetchNextPage } = useConsigneeDropdown();
  const { consolidatorDropdown, selectedConsolidator, setSelectedConsolidator, fetchConsolidator, fetchNextPageConsi } = useConsolidatorDropdown();
  const { warehouseDropdown, selectedWarehouse, setSelectedWarehouse, fetchWarehouse, fetchNextPageWarehouse } = useWarehouseDropdown();
  const { departmentDropdown, selectedDepartment, setSelectedDepartment } = useDepartmentDropdown();
  const { SADDropdown, fetchSAD, fetchNextPageSAD  } = useSADDropdown();
  const [checking, setChecking] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null); 
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  useEffect(() => {
    getData().then(setData);
  }, []);

  useEffect(() => {
    if (!SADDropdown.length) return;
  
    setData(prevRows =>
      prevRows.map(row => {
        const match = SADDropdown.find(item => item.COLUMN_CODE === row.label);
        return match
          ? { ...row, description: match.PARAMETER_DESC }
          : row;
      })
    );
  }, [SADDropdown]);
  
  useEffect(() => {
    if (!templateName.trim()) {
      setIsValid(null);
      return;
    }
    setIsValid(null);
    const delayDebounce = setTimeout(async () => {
      setChecking(true);
      try {
        const res = await api.get("/search/template/check/name", {
          params: { value: templateName },
        });
        setIsValid(res.data.STATUS === "Valid");
      } catch (err) {
        console.error("Check name error:", err);
        setIsValid(null); 
      } finally {
        setChecking(false);
      }
    }, 600);
  
    return () => clearTimeout(delayDebounce);
  }, [templateName]);

  function formatDateForOracle(dateStr: string): string {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${mm}/${dd}/${yyyy}`; // MM/DD/YYYY
  }
  
  const useExcelExport = async (data: any[], filtersFromState: any) => {
    try {
      const filters = {
        ...filtersFromState,
        fromDate: formatDateForOracle(filtersFromState.fromDate),
        toDate: formatDateForOracle(filtersFromState.toDate),
        columns: data.map((row) => row.label).join(";"),
      };
  
      console.log("📤 Filters sent to backend:", filters);
  
      const res = await api.post("/reports/nsl", filters);
      const responseData = res.data.data || [];
      console.log("📥 First row from backend:", responseData[0]);
  
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("NSL Report");
  
      worksheet.columns = data.map((row) => ({
        header: row.label, 
        key: row.label,  
        width: 20,
      }));

      worksheet.addRows(responseData);
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
  
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `NSL_Report_${Date.now()}.xlsx`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("❌ Export failed:", err);
      alert("Failed to generate report");
    }
  };
  
  
  const updateRow = (id: string, updates: Partial<NSLdata>) => {
    setData((prev) => prev.map((row) => (row.id === id ? { ...row, ...updates } : row)));
  };

  const handleAddField = () => {
    setData((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        number: prev.length + 1,
        label: "---",
        description: "--- Select SAD ---",
        button: "",
      },
    ]);
  };

  const handleResetRows = () => {
    setData([{ ...defaultRow, id: crypto.randomUUID() }]);
  };

  const removeRow = (id: string) => {
    setData((prev) =>
      prev
        .filter((row) => row.id !== id)
        .map((row, index) => ({ ...row, number: index + 1 }))
    );
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  
    const selected = templateDropdown.find(t => t.TEMPLATE_ID === templateId);
    if (!selected) return;
  
    const codes = parseColumns(String(selected.COLUMNS));
    const newRows: NSLdata[] = codes.map((code, idx) => {
      const match = descValue.find(d => d.COLUMN_CODE === code);
      console.log('description', match)
      return {
        id: crypto.randomUUID(),
        number: idx + 1,
        label: code,
        description: match ? match.PARAMETER_DESC : "", 
        button: "",
      };
    });
    setData(newRows);
  };

  const handleSaveTemplate = async () => {
    if (!templateName.trim()) {
      toast.error("Please enter a template name");
      return;
    }
  
    const columns = data.map((row) => row.label).join(";");
  
    try {
      const res = await api.post("/reports/nsl/save/template", {
        templateName,
        columns,
      });
    
      toast.success(res.data.STATUS || "Template saved successfully!");
      setTemplateName("");
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data.message || "Failed to save template");
      } else {
        // unexpected error
        console.error("Unexpected save error:", err);
        toast.error("Unexpected error occurred");
      }
    }
    
  };

  const handleOpenDialog = () => {
    setShowSaveDialog(true);
  }
  const handleCancelTemplate = () => {
    setShowSaveDialog(false);
    setTemplateName("");
  };

  return {
    comboRef,
    data,
    setData,
    updateRow,
    handleAddField,
    handleResetRows,
    removeRow,
    handleTemplateSelect,
    handleSaveTemplate,
    showSaveDialog,
    setShowSaveDialog,
    handleCancelTemplate,
    handleOpenDialog,
    templateName,
    setTemplateName,
    saving,

    // TEMPLATE DROPDOWN
    templateDropdown,
    selectedTemplate,
    setSelectedTemplate,

    // DROP DOWNS
    consigneeDropdown,
    selectedConsignee,
    setSelectedConsignee,
    fetchConsignee,
    fetchNextPage,
    consolidatorDropdown,
    selectedConsolidator,
    setSelectedConsolidator,
    fetchConsolidator,
    fetchNextPageConsi,
    warehouseDropdown,
    selectedWarehouse,
    setSelectedWarehouse,
    fetchWarehouse,
    fetchNextPageWarehouse,
    departmentDropdown,
    selectedDepartment,
    setSelectedDepartment,

    // SAD DROPDOWN & DATA TABLE
    SADDropdown,
    fetchSAD,
    fetchNextPageSAD,

    checking,
    isValid,

    useExcelExport,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
  };
};
