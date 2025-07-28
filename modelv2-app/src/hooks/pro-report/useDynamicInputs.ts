import { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import debounce from 'lodash.debounce';
import { validCode } from '../../components/data'
import api from "@/common/config";

export function useDynamicInputs(activeTab: 'airwaybill' | 'pronumber') {
  const [fields, setFields] = useState<string[]>(['']);
  const [validationResults, setValidationResults] = useState<(boolean | undefined)[]>([undefined]);
  const [loadingStates, setLoadingStates] = useState<boolean[]>([false]);


  const MAX_FIELDS = 10; 
  const debounceMap = useRef<{ [key: number]: ReturnType<typeof debounce> }>({});
  // useEffect(() => {
  //   api
  //     .get("/reference/check/pro-exist", { withCredentials: true })
  //     .then((res) => {
  //       console.log("Fetched value:", res.data.STATUS);
  //       setFields(res.data.STATUS || []);
  //     })
  //     .catch((err) => {
  //       console.error("Value list fetch error:", err);
  //       toast.error("Failed to fetch value");
  //     });
  // }, []);


  useEffect(() => {
    setFields(['']);
    setValidationResults([undefined]);
    setLoadingStates([false]);
    Object.values(debounceMap.current).forEach((fn) => fn.cancel?.());
    debounceMap.current = {};
  }, [activeTab]);

  const isFieldValid = useCallback(
    (value: string) => {
      return validCode.some(
        (entry) =>
          entry.val_type === activeTab &&
          entry.val_list.toUpperCase() === value.trim().toUpperCase()
      );
    },
    [activeTab]
  );

  // const isFieldValid = useCallback(
  //   async (value: string): Promise<boolean> => {
  //     if (!value.trim()) return false;
  //     try {
  //       const response = await api.get("/reference/check/pro-exist", {
  //         params: {
  //           val_type: activeTab,
  //           value: value.trim(),
  //         },
  //       });
  
  //       return response.data.STATUS === "Valid";
  //     } catch (error) {
  //       console.error("Validation failed:", error);
  //       toast.error("Validation failed!");
  //       return false;
  //     }
  //   },
  //   [activeTab]
  // );
  
  const getDebouncedValidator = (index: number) => {
    if (!debounceMap.current[index]) {
      debounceMap.current[index] = debounce(async(val: string) => {
        console.log('Validating:', val); 
        // setTimeout(() => {
          const valid = await isFieldValid(val);
          setValidationResults((prev) => {
            const updated = [...prev];
            updated[index] = valid;
            return updated;
          });
          setLoadingStates((prev) => {
            const updated = [...prev];
            updated[index] = false;
            return updated;
          });
        // }, 200);
      }, 500);
    }
  
    return debounceMap.current[index];
  };
  
  // const handleChange = (value: string, index: number) => {
  //   const updatedFields = [...fields];
  //   const trimmed = value.trim();
  //   updatedFields[index] = value;
  //   setFields(updatedFields);
    
  //   // const isDuplicate = updatedFields.some((field, i) => {
  //   //   return i !== index && field.trim() === trimmed;
  //   // });

  //   const normalizedValue = trimmed.toLowerCase();
  //   const isDuplicate = updatedFields.some((field, i) => {
  //     return i !== index && field.trim().toLowerCase() === normalizedValue;
  //   });


  //   if (isDuplicate) {
  //   console.warn(`Field ${index} has duplicate input`);
  //   // Optional: set validation result or warning
  //   setValidationResults((prev) => {
  //     const updated = [...prev];
  //     updated[index] = false;
  //     return updated;
  //   });
  //   setLoadingStates((prev) => {
  //     const updated = [...prev];
  //     updated[index] = false;
  //     return updated;
  //   });
  //   return;
  // } 
  
  
  //   if (trimmed.length >= 2) {
  //     // Show loading while debounce is waiting
  //       setLoadingStates((prev) => {
  //       const updated = [...prev];
  //       updated[index] = true;
  //       return updated;
  //     });
  //       getDebouncedValidator(index)(trimmed);
  //   } else {
  //     // Input too short — no validation yet
  //       setValidationResults((prev) => {
  //       const updated = [...prev];
  //       updated[index] = undefined;
  //       return updated;
  //     });
  //       setLoadingStates((prev) => {
  //       const updated = [...prev];
  //       updated[index] = false;
  //       return updated;
  //     });
  //   }
  // };

  const handleChange = (value: string, index: number) => {
    const updatedFields = [...fields];
    updatedFields[index] = value;
    setFields(updatedFields);
  
    const normalizedFields = updatedFields.map((f) => f.trim().toLowerCase());
  
    const newValidationResults: (boolean | undefined)[] = [];
    const newLoadingStates: boolean[] = [];
  
    normalizedFields.forEach((val, i) => {
      const isDuplicate = normalizedFields.filter((v, j) => v === val && v && i !== j).length > 0;
      const originalInput = updatedFields[i].trim();
  
      if (val.length < 2) {
        newValidationResults[i] = undefined;
        newLoadingStates[i] = false;
      } else if (isDuplicate) {
        newValidationResults[i] = false;
        newLoadingStates[i] = false;
      } else {
        newLoadingStates[i] = true;
        getDebouncedValidator(i)(originalInput);
        // Keep previous validation while waiting
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
    };

    setFields((prev) => [...prev, '']);
    // setTouchedFields((prev) => [...prev, false]);
      setValidationResults((prev) => [...prev, undefined]);
      setLoadingStates((prev) => [...prev, false]);
  };

  const handleRemove = (index: number) => {
    setFields((prev) => prev.filter((_, i) => i !== index));
    // setTouchedFields((prev) => prev.filter((_, i) => i !== index));
    setValidationResults((prev) => prev.filter((_, i) => i !== index));
    setLoadingStates((prev) => prev.filter((_, i) => i !== index));
    debounceMap.current[index]?.cancel?.();
    delete debounceMap.current[index];
  };

  const clearFields = () => {
    setFields(['']);
    // setTouchedFields([false]);
    setValidationResults([undefined]);
    setLoadingStates([false]);
    Object.values(debounceMap.current).forEach((fn) => fn.cancel?.());
    debounceMap.current = {};
  };

  const areAllValid = () => {
    return (
      validationResults.length === fields.length &&
      validationResults.every((result) => result)
    );
  };

  // const generateValList = () => {
  //   if (!areAllValid()) {
  //     console.log('Not all valid yet!');
  //     return;
  //   }
  //   const valList = fields.map((f) => f.trim()).join(',');
  //   console.log(`All valid for ${activeTab}: ${valList}`);
  // };

  const generateValList = async () => {
    if (!areAllValid()) {
      toast.error('Not all fields are valid!');
      return;
    }
  
    try {
      const payload = {
        val_type: activeTab,
        val_list: fields.map((f) => f.trim()),
        generate_type: 'detailed'  // or 'summary' if that’s an option
      };
  
      const res = await api.post("/report/pro-info", payload);
      console.log("Report:", res.data.PRO_INFO_REPORT);
      toast.success("Report generated!");
      // Store or use the report data as needed
    } catch (err) {
      console.error("Report fetch failed:", err);
      toast.error("Failed to generate report");
    }
  };
  

  // PRO REPORT API FETCH

  return {
    fields,
    // touchedFields,
    validationResults,
    loadingStates,
    handleAdd,
    handleRemove,
    handleChange,
    areAllValid,
    generateValList,
    clearFields,
  };
}
