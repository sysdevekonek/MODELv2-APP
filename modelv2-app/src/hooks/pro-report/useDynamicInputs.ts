// components/report/pro-report/hooks/useDynamicInputs.ts
import { useEffect, useState } from 'react';

export const useDynamicInputs = (activeTab: string) => {
  const [fields, setFields] = useState<string[]>(['']);

  useEffect(() => {
    setFields(['']); 
  }, [activeTab]);

  const handleAdd = () => {
    setFields([...fields, '']);
  };

  const handleRemove = (index: number) => {
    const updated = [...fields];
    updated.splice(index, 1);
    setFields(updated);
  };

  const handleChange = (value: string, index: number) => {
    const updated = [...fields];
    updated[index] = value;
    setFields(updated);
  };

  return {
    fields,
    handleAdd,
    handleRemove,
    handleChange,
  };
};
