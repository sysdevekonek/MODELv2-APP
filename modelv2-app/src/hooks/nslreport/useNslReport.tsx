import api from "@/common/config";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import React, { useRef } from "react";

type DropdownItem = { label: string; value: string };

const dropdownConfig = {
  template: { endpoint: "/reference/templates/NSL", labelKey: "TEMPLATE_NAME", valueKey: "TEMPLATE_ID" },
  consignee: { endpoint: "/reference/consignees/range?start=1&end=20", labelKey: "CNEE_NAM", valueKey: "CNEE_COD" },
  consolidator: { endpoint: "/reference/consolidators/range?start=1&end=20", labelKey: "NAME", valueKey: "CODE" },
  warehouse: { endpoint: "/reference/warehouse/range?start=1&end=20", labelKey: "NAME", valueKey: "CODE" },
  department: { endpoint: "/reference/department/range?start=1&end=20", labelKey: "NAME", valueKey: "CODE" },
};

export const useTemplateDropdown = () => {
  const [dropdowns, setDropdowns] = useState<Record<string, DropdownItem[]>>({});
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDropdowns = async () => {
      setLoading(true);
      try {
        const results = await Promise.all(
          Object.entries(dropdownConfig).map(async ([key, { endpoint, labelKey, valueKey }]) => {
            const response = await api.get(endpoint);
            const data = (response.data || []).map((item: any) => ({
              label: item[labelKey],
              value: item[valueKey],
            }));
            return [key, data] as const;
          })
        );

        setDropdowns(Object.fromEntries(results));
      } catch (err) {
        console.error("Error fetching dropdowns:", err);
        toast.error("Failed to load dropdown data");
      } finally {
        setLoading(false);
      }
    };

    fetchDropdowns();
  }, []);

  const setSelectedValue = (key: string, value: string) => {
    setSelected((prev) => ({ ...prev, [key]: value }));
  };

  return {
    templateDropdown: dropdowns.template || [],
    consigneeDropdown: dropdowns.consignee || [],
    consolidatorDropdown: dropdowns.consolidator || [],
    warehouseDropdown: dropdowns.warehouse || [],
    departmentDropdown: dropdowns.department || [],

    selectedTemplate: selected.template || "",
    selectedConsignee: selected.consignee || "",
    selectedConsilidator: selected.consolidator || "",
    selectedWarehouse: selected.warehouse || "",
    selectedDepartment: selected.department || "",

    setSelectedTemplate: (value: string) => setSelectedValue("template", value),
    setSelectedConsignee: (value: string) => setSelectedValue("consignee", value),
    setSelectedConsilidator: (value: string) => setSelectedValue("consolidator", value),
    setSelectedWarehouse: (value: string) => setSelectedValue("warehouse", value),
    setSelectedDepartment: (value: string) => setSelectedValue("department", value),

    loading,
  };
};


