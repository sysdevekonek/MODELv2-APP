"use client";
import { useRef, useState, useEffect } from "react";
import { toast } from 'react-hot-toast';
import { ComboBoxRef } from "@/components/comboBox";
import { NSLdata } from "../../components/utils/nslDatatable/columns";
import { exportToExcel } from "@/components/utils/exportExcel"; 
import ExcelJS from "exceljs";
import api from '../../common/config';
import { 
  useTemplateDropdown, 
  useConsigneeDropdown, 
  useDepartmentDropdown, 
  useConsolidatorDropdown, 
  useWarehouseDropdown, 
  useSADDropdown 
} from "@/components/utils/dropdownAPI";
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
  const [checking, setChecking] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null); 
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [dateError, setDateError] = useState("");
  const [detailedInvoice, setDetailedInvoice] = useState(false);
  const [rowError, setRowError] = useState<Record<string, boolean>>({});

  // dropdown hooks
  const { departmentDropdown } = useDepartmentDropdown();
  const { consigneeDropdown, fetchConsignee, fetchNextPage  } = useConsigneeDropdown();
  const [ selectedDepartment, setSelectedDepartment ] = useState("");
  const [ selectedConsignee, setSelectedConsignee, ] = useState("");
  const { templateDropdown, selectedTemplate, setSelectedTemplate, descValue, fetchTemplateDropdown } = useTemplateDropdown();
  const { consolidatorDropdown, selectedConsolidator, setSelectedConsolidator, fetchConsolidator, fetchNextPageConsi } = useConsolidatorDropdown();
  const { warehouseDropdown, selectedWarehouse, setSelectedWarehouse, fetchWarehouse, fetchNextPageWarehouse } = useWarehouseDropdown();
  const { SADDropdown, fetchSAD, fetchNextPageSAD  } = useSADDropdown();
  const lastToastRef = useRef<number>(0);


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
      setChecking(false);
      return;
    }
  
    setIsValid(null);
    setChecking(true);
  
    const controller = new AbortController();
    const id = setTimeout(async () => {
      try {
        const res = await api.get("/search/template/check/name", {
          params: { value: templateName },
          signal: controller.signal, // axios supports AbortSignal
        });
        setIsValid(res.data.STATUS === "Valid");
      } catch (err: any) {
        // Ignore cancellations
        if (axios.isAxiosError(err) && err.code === "ERR_CANCELED") return;
        console.error("Check name error:", err);
        setIsValid(null);
      } finally {
        setChecking(false);
      }
    }, 600);
  
    return () => {
      clearTimeout(id);
      controller.abort(); // cancel in-flight request if still running
    };
  }, [templateName]);
  

  useEffect(() => {
    // whenever data changes, check if there are still empty descriptions
    const hasEmptyDescriptions = data.some(row => !row.description || row.description === "--- Select SAD ---");
    if (!hasEmptyDescriptions) {
      setRowError({}); // clear error automatically
    }
  }, [data]);

  function formatDateForOracle(dateStr: string): string {
    if (!dateStr) return "";
  
    // If ISO date 'YYYY-MM-DD', treat as local date (avoid UTC parse quirks)
    const isoDateMatch = /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
    let d: Date;
    if (isoDateMatch) {
      const [y, m, day] = dateStr.split("-").map(Number);
      d = new Date(y, m - 1, day); // local midnight
    } else {
      d = new Date(dateStr);
    }
  
    if (Number.isNaN(d.getTime())) return "";
  
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${mm}/${dd}/${yyyy}`; // MM/DD/YYYY
  }

const fetchAndExportReport = async (columns: NSLdata[], filtersFromState: any) => {
  setSaving(true);
  try {
    const normalizedLabels = columns.map(c => c.label.replace(/\s+/g, "_"));
    const payload = {
      ...filtersFromState,
      Invoice: filtersFromState.Invoice ? "1" : "0",
      fromDate: formatDateForOracle(filtersFromState.fromDate),
      toDate: formatDateForOracle(filtersFromState.toDate),
      columns: normalizedLabels.join(";"),
    };
    
    const res = await api.post("/reports/nsl", payload);
    const responseData = res.data?.data ?? [];

    // Transform the API response to work with our reusable export
    let excelData: any[] = [];
    const headers = columns.map(c => c.label);

    if (Array.isArray(responseData) && responseData.length > 0) {
      const first = responseData[0];
      
      if (Array.isArray(first)) {
        // Convert array of arrays to array of objects
        excelData = responseData.map((rowArray: any[]) => {
          const rowObject: any = {};
          headers.forEach((header, index) => {
            rowObject[header] = rowArray[index] ?? "";
          });
          return rowObject;
        });
      } else if (typeof first === "object" && first !== null) {
        // Data is already array of objects - ensure it has all column keys
        excelData = (responseData as Record<string, any>[]).map(obj => {
          const processedObj: any = {};
          headers.forEach(header => {
            processedObj[header] = obj[header] ?? "";
          });
          return processedObj;
        });
      } else {
        // Single value response
        excelData = [{ [headers[0]]: String(responseData) }];
      }
    }

    // Prepare columns for the reusable export
    const excelColumns = headers.map(header => ({
      key: header,
      header: header,
      width: 20,
    }));
    
    await exportToExcel(
      excelData,
      `NSL_Report_${Date.now()}`,
      excelColumns
    );

    // toast.success("Report generated successfully!");

  } catch (err) {
    console.error("Excel export failed", err);
    toast.error("Failed exporting report");
  } finally {
    setSaving(false);
  }
};
  
  
  const updateRow = (id: string, updates: Partial<NSLdata>) => {
    setData(prev =>
      prev.map(row => (row.id === id ? { ...row, ...updates } : row))
    );
  
    if (updates.description && updates.description !== "--- Select SAD ---") {
      setRowError(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleAddField = () => {
    const hasEmpty = data.some(
      row => !row.description || row.description === "--- Select SAD ---"
    );
    
    if (hasEmpty) {
      const now = Date.now();
      if (now - lastToastRef.current > 3000) {
        lastToastRef.current = now;
        toast("Please fill out all rows before adding a new one", {
          icon: "⚠️",
        });
      }
      return;
    }
  
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
    setSaving(true);
    try {
      const columns = data.map(r => r.label).join(";");
      const res = await api.post("/reports/nsl/save/template", { templateName, columns });
      toast.success(res.data.STATUS || "Template saved!");
      setTemplateName("");
      setShowSaveDialog(false);
      setData([{ ...defaultRow, id: crypto.randomUUID() }]);
      setSelectedTemplate("");
      setRowError({});
      setFromDate("");
      setToDate("");

    // Refresh dropdown to include the new template
    await fetchTemplateDropdown();

    const newTemplate = res.data?.TEMPLATE_ID;
    if (newTemplate) {
      setSelectedTemplate(newTemplate);
    }
  
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        toast.error(err.response.data.message || "Failed to save template");
      } else {
        console.error("Unexpected save error:", err);
        toast.error("Unexpected error occurred");
      }
    } finally {
      setSaving(false);
    }
  };
  
  const handleOpenDialog = () => {
    const hasEmpty = data.some(
      (row) => !row.description || row.description === "--- Select SAD ---"
    );
  
    if (hasEmpty) {
      const now = Date.now();
      // prevent toast spam: show only every 3 seconds
      if (now - lastToastRef.current > 3000) {
        lastToastRef.current = now;
        toast("Please fill out all columns before saving a template", {
          icon: "⚠️",
        });
      }
      return; 
    }
  
    setShowSaveDialog(true);
  };
  
  const handleCancelTemplate = () => {
    setShowSaveDialog(false);
    setTemplateName("");
  };

  const validateForm = (data: NSLdata[], fromDate: string, toDate: string) => {
    let valid = true;
  
    if (!fromDate || !toDate) {
      setDateError("Both dates are required.");
      valid = false;
    } else {
      setDateError("");
    }
  
    const newErrors: Record<string, boolean> = {};
    data.forEach(row => {
      if (!row.description || row.description === "--- Select SAD ---") {
        newErrors[row.id] = true;
        valid = false;
      }
    });

    setRowError(newErrors);
    return valid;
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
    detailedInvoice,
    setDetailedInvoice,
    exportToExcel,

    // SAD DROPDOWN & DATA TABLE
    SADDropdown,
    fetchSAD,
    fetchNextPageSAD,

    checking,
    isValid,

    // EXCEL EXPORT
    fetchAndExportReport,
    fromDate,
    setFromDate,
    toDate,
    setToDate,

    validateForm,
    dateError,
    setDateError,
    rowError,
    setRowError,
  };
};