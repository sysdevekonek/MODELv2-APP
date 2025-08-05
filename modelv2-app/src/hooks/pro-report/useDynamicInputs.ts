import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "react-hot-toast";
import debounce from "lodash.debounce";
import api from "@/common/config";
import ExcelJS from "exceljs";

export function useDynamicInputs(activeTab: "airwaybill" | "pronumber") {
  const [fields, setFields] = useState<string[]>([""]);
  const [validationResults, setValidationResults] = useState<(boolean | undefined)[]>([undefined]);
  const [loadingStates, setLoadingStates] = useState<boolean[]>([false]);
  const debounceMap = useRef<{ [key: number]: ReturnType<typeof debounce> }>({});
  const MAX_FIELDS = 10;

  useEffect(() => {
    setFields([""]);
    setValidationResults([undefined]);
    setLoadingStates([false]);
    Object.values(debounceMap.current).forEach((fn) => fn.cancel?.());
    debounceMap.current = {};
  }, [activeTab]);

  const isCodeValid = async (val: string): Promise<boolean> => {
    const cleaned = val?.trim().toUpperCase();
    if (!cleaned) {
      toast.error("Please enter a value.");
      return false;
    }
    try {
      const res = await api.get("/reference/check/pro-exist", {
        params: { val_type: activeTab, value: cleaned },
        withCredentials: true,
      });
      return res.data.STATUS === "Valid";
    } catch (err) {
      toast.error("Validation request failed");
      return false;
    }
  };

  const getDebouncedValidator = useCallback(
    (idx: number) => {
      if (!debounceMap.current[idx]) {
        debounceMap.current[idx] = debounce(async (val: string) => {
          const valid = await isCodeValid(val);
          setValidationResults((prev) => {
            const arr = [...prev];
            arr[idx]  = valid;
            return arr;
          });
          setLoadingStates((prev) => {
            const arr = [...prev];
            arr[idx]  = false;
            return arr;
          });
        }, 500);
      }
      return debounceMap.current[idx];
    },
    [activeTab, isCodeValid]
  );

  const handleChange = (value: string, index: number) => {
    const updatedFields   = [...fields];
    updatedFields[index]  = value;
    setFields(updatedFields);

    const normalizedFields = updatedFields.map((f) => f.trim().toLowerCase());
    const newValidationResults: (boolean | undefined)[] = [];
    const newLoadingStates: boolean[] = [];

    normalizedFields.forEach((val, i) => {
      const isDuplicate   = normalizedFields.filter((v, j) => v === val && v && i !== j).length > 0;
      const originalInput = updatedFields[i].trim();

      if (val.length < 2 || !val.trim()) {
        newValidationResults[i] = undefined;
        newLoadingStates[i]     = false;
      } else if (isDuplicate) {
        newValidationResults[i] = false;
        newLoadingStates[i]     = false;
      } else {
        newLoadingStates[i] = true;
        getDebouncedValidator(i)(originalInput);
        newValidationResults[i] = validationResults[i];
      }
    });

    setValidationResults(newValidationResults);
    setLoadingStates(newLoadingStates);
  };

  const handleAdd = () => {
    if (fields.length >= MAX_FIELDS) {
      toast.error(`Maximum ${MAX_FIELDS} fields allowed`);
      return;
    }
    setFields((prev)            => [...prev, ""]);
    setValidationResults((prev) => [...prev, undefined]);
    setLoadingStates((prev)     => [...prev, false]);
  };

  const handleRemove = (index: number) => {
    setFields((prev) => prev.filter((_, i) => i !== index));
    setValidationResults((prev) => prev.filter((_, i) => i !== index));
    setLoadingStates((prev) => prev.filter((_, i) => i !== index));
    debounceMap.current[index]?.cancel?.();
    delete debounceMap.current[index];
  };

  const clearFields = () => {
    setValidationResults([undefined]);
    setLoadingStates([false]);
    setFields([""]);
    Object.values(debounceMap.current).forEach((fn) => fn.cancel?.());
    debounceMap.current = {};
  };

  const areAllValid = () => {
    return (
      validationResults.length === fields.length &&
      validationResults.every((result) => result)
    );
  };

  const generateValList = async (generateType: "PRO" | "BRC" | "MNF") => {
    const workbook      = new ExcelJS.Workbook();
    const worksheet     = workbook.addWorksheet("PRO_INFO_REPORT");
    
    if (!areAllValid()) {
      toast.error("Not all fields are valid!");
      return;
    }

    try {
      const payload = {
        val_type: activeTab,
        val_list: fields.map((f) => f.trim()).join(","),
        generate_type: generateType,
      };

      const res        = await api.post("/reports/pro-info", payload);
      const reportData = res.data.PRO_INFO_REPORT;

      if (!Array.isArray(reportData) || reportData.length === 0) {
        toast.error("No data received.");
        return;
      }


      // Create header row
      const headerKeys  = Object.keys(reportData[0]);
      worksheet.columns = headerKeys.map((key) => ({
        header: key,
        key,
        width: 20,
      }));

      // Add rows
      reportData.forEach((item) => {
        const row = worksheet.addRow(item);

        // Add borders to each cell in the row
        row.eachCell((cell) => {
          cell.border = {
            top:    { style: "thin" },
            left:   { style: "thin" },
            bottom: { style: "thin" },
            right:  { style: "thin" },
          };
        });
        worksheet.getRow(1).eachCell((cell) => {
          cell.font = { bold: true };
          cell.border = {
            top:    { style: "thin" },
            left:   { style: "thin" },
            bottom: { style: "thin" },
            right:  { style: "thin" },
          };
        });
      });

      // Create a Blob and download
      const buffer = await workbook.xlsx.writeBuffer();
      const blob   = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = "pro_info_report.xlsx";
      a.click();
      URL.revokeObjectURL(url);

      toast.success("Excel file downloaded!");
    } catch (err) {
      console.error("Report fetch or Excel generation failed:", err);
      toast.error("Failed to generate Excel report");
    }
  };

  return {
    fields,
    validationResults,
    loadingStates,
    handleAdd,
    handleRemove,
    handleChange,
    areAllValid,
    generateValList,
    clearFields,
    isCodeValid,
  };
}
