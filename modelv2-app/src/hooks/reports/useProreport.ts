import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "react-hot-toast";
import debounce from "lodash.debounce";
import api from "@/common/config";
import { toastInfo } from "@/components/utils/customToasts";
import { exportToExcel } from "@/components/utils/exportExcel";

export function useDynamicInputs(activeTab: "airwaybill" | "pronumber") {
  const [fields, setFields] = useState<string[]>([""]);
  const [validationResults, setValidationResults] = useState<(boolean | undefined)[]>([undefined]);
  const [loadingStates, setLoadingStates] = useState<boolean[]>([false]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeReport, setActiveReport] = useState<"PRO" | "BRC" | "MNF" | null>(null);
  const [maxFieldsWarned, setMaxFieldsWarned] = useState(false);
  const debounceMap = useRef<{ [key: number]: ReturnType<typeof debounce> }>({});
  const [lengthWarned, setLengthWarned] = useState(false);
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
    const trimmedValue = value.trim();

    if (trimmedValue.length > 20) {
      if (!lengthWarned) {
        toastInfo("Maximum 20 characters allowed.");
        setLengthWarned(true);
      }
      return;
    } else if (lengthWarned && trimmedValue.length <= 20) {
      // Reset warning when user goes back under limit
      setLengthWarned(false);
    }

    const updatedFields = [...fields];
    updatedFields[index] = value;
    setFields(updatedFields);
  
    const normalizedValue = value.trim().toLowerCase();
    const originalInput = value.trim();
  
    // Check duplicates
    const isDuplicate = updatedFields.some(
      (f, i) => f.trim().toLowerCase() === normalizedValue && i !== index
    );
  
    // Prepare new states
    const newValidationResults = [...validationResults];
    const newLoadingStates = [...loadingStates];
  
    if (normalizedValue.length < 2 || !normalizedValue) {
      newValidationResults[index] = undefined;
      newLoadingStates[index] = false;
    } else if (isDuplicate) {
      newValidationResults[index] = false;
      newLoadingStates[index] = false;
    } else {
      newValidationResults[index] = undefined;
      newLoadingStates[index] = true;
      getDebouncedValidator(index)(originalInput);
    }
  
    setValidationResults(newValidationResults);
    setLoadingStates(newLoadingStates);
  };
  
  const handleAdd = () => {
    if (fields.length >= MAX_FIELDS) {
      if (!maxFieldsWarned) {
         toastInfo(`Maximum ${MAX_FIELDS} fields allowed`);
        setMaxFieldsWarned(true);
      }
      return;
    }
  
    setMaxFieldsWarned(false); // reset once user goes below max again
    setFields((prev) => [...prev, ""]);
    setValidationResults((prev) => [...prev, undefined]);
    setLoadingStates((prev) => [...prev, false]);
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

  const handleGenerate = async (generateType: "PRO" | "BRC" | "MNF") => {
    if (isGenerating) return; // block spamming
  
    setIsGenerating(true);
    setActiveReport(generateType);
  
    try {
      await toast.promise(generateValList(generateType), {
        loading: `Generating ${generateType} report...`,
        success: `${generateType} report downloaded!`,
        error: "Failed to generate report",
      });
    } finally {
      setIsGenerating(false);
      setActiveReport(null);
    }
  };

  const generateValList = async (generateType: "PRO" | "BRC" | "MNF") => {
    if (isGenerating) return;
    setIsGenerating(true);

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
      
      exportToExcel(reportData, `${generateType}_Report`);
      clearFields();
    } catch (err) {
      console.error("Report fetch or Excel generation failed:", err);
      toast.error("Failed to generate Excel report");
    }
  };

  return {
    fields,
    validationResults,
    loadingStates,
    isGenerating,
    activeReport,
    handleGenerate,
    handleAdd,
    handleRemove,
    handleChange,
    areAllValid,
    generateValList,
    clearFields,
    isCodeValid,
  };
}
