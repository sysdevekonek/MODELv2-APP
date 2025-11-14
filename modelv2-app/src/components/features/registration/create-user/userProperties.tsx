"use client";

import React, { useRef, useState, useEffect } from "react";
import ComboBox, { ComboBoxRef } from "@/components/comboBox";
import { Button as AriaButton, Label, ListBox, ListBoxItem, Popover, Select, SelectValue } from 'react-aria-components';
import { useDepartmentDropdown, useConsigneeDropdown } from "@/components/dropdownAPI";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { useRegistrationContext } from "@/hooks/registration/RegistrationContext";
import Button from "@/components/ui/Buttons";

interface UserPropertiesProps {
  goNext?: () => void;
  goBack: () => void;
  errors: Record<string, string>;
}

const UserProperties: React.FC<UserPropertiesProps> = ({ goNext, goBack, errors }) => {
  const comboRef = useRef<ComboBoxRef>(null);
  const { consigneeDropdown, fetchConsignee, fetchNextPage, loading: consigneeLoading } = useConsigneeDropdown();
  const { departmentDropdown, loading: deptLoading, departmentChange } = useDepartmentDropdown();
  const { userData, updateField, isFormComplete } = useRegistrationContext();

  const [propertyName, setPropertyName] = useState("");
  const [propertyValue, setPropertyValue] = useState("");

  const isReviewDisabled = !isFormComplete(userData) || Object.keys(errors).length > 0;

  useEffect(() => {
    setPropertyValue("");
  }, [propertyName]);

  const handleProperties = (e: React.FormEvent) => {
    e.preventDefault();

    if (!propertyName) return;

    let newProperty;

    if (propertyName === "TIN") {
      if (!propertyValue.trim()) return;
      newProperty = {
        name: propertyName,
        value: propertyValue.trim(),
        displayValue: propertyValue.trim(),
      };
    } else {
      if (!propertyValue) return;

      let displayValue = propertyValue;

      if (propertyName === "DEPARTMENT") {
        const selectedItem = departmentDropdown.find(item => item.DEPT_CODE === propertyValue);
        displayValue = selectedItem ? selectedItem.DEPT_NAME : propertyValue;
      } else if (propertyName === "CONSIGNEE") {
        const selectedItem = consigneeDropdown.find(item => item.CNEE_COD === propertyValue);
        displayValue = selectedItem ? selectedItem.CNEE_NAM : propertyValue;
      }
      newProperty = { name: propertyName, value: propertyValue, displayValue };
    }

    const alreadyExists = userData.properties.some(p => p.name === newProperty.name && p.value === newProperty.value);

    if (alreadyExists) {
      setPropertyName("");
      setPropertyValue("");
      return;
    }
    updateField("properties", [...userData.properties, newProperty]);
    setPropertyName("");
    setPropertyValue("");
  };


  return (
    <div className="flex justify-center px-4">
      <form onSubmit={handleProperties} className="w-full max-w-lg">

        {/* Property Name */}
        <div className="mb-4 flex flex-col">
          <Select
            selectedKey={propertyName}
            onSelectionChange={(key) => setPropertyName(String(key))}
            className="w-full"
          >
            <Label id="propertyName-label" className="text-sm font-medium mb-1">Property Name:</Label>
            <AriaButton className={`flex justify-between items-center bg-inputField1 text-xs h-10 w-full px-4 border border-inputField2 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-mainDef3 transition-all`}>
              <SelectValue className={({ isPlaceholder }) => `truncate ${isPlaceholder ? "text-subtext" : "text-bodytext2"}`}>
                {propertyName || "Select an option"}
              </SelectValue>
              <ChevronDown className="w-4 h-4 text-gray-400" aria-hidden="true" />
            </AriaButton>
            <Popover className="w-[--trigger-width] bg-bgContainer border border-tableBorder rounded-lg shadow-lg mt-1 z-50" placement="bottom start">
              <ListBox className="max-h-60 overflow-auto text-xs" aria-label="Property name options">
                <ListBoxItem id="TIN" className="px-3 py-2 hover:bg-button3 cursor-pointer">
                  Tax Identification Number (TIN)
                </ListBoxItem>
                <ListBoxItem id="DEPARTMENT" className="px-3 py-2 hover:bg-button3 cursor-pointer">
                  Department
                </ListBoxItem>
                <ListBoxItem id="CONSIGNEE" className="px-3 py-2 hover:bg-button3 cursor-pointer">
                  Consignee
                </ListBoxItem>
              </ListBox>
            </Popover>
          </Select>
        </div>

        {/* Property Value */}
        <div className="mb-4 flex flex-col">
          <label htmlFor="propertyValue" className="text-sm font-medium mb-1">
            Property Value:
          </label>
          {propertyName === "TIN" && (
            <input
              id="propertyValue"
              type="text"
              placeholder="Insert TIN"
              maxLength={11}
              required
              value={propertyValue}
              onChange={(e) => setPropertyValue(e.target.value)}
              className="w-full bg-inputField1 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3"
            />
          )}
          {propertyName === "DEPARTMENT" && (
            <ComboBox
              ref={comboRef}
              items={departmentDropdown}
              displayKey="DEPT_NAME"
              valueKey="DEPT_CODE"
              placeholder="Search or select department..."
              selectedValue={propertyValue}
              setSelectedValue={setPropertyValue}
              onInputChange={departmentChange}
              showValueKeyInList={false}
              loading={deptLoading}
              className="w-full bg-inputField1 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3"
            />
          )}
          {propertyName === "CONSIGNEE" && (
            <ComboBox
              ref={comboRef}
              items={consigneeDropdown}
              displayKey="CNEE_NAM"
              valueKey="CNEE_COD"
              selectedValue={propertyValue}
              setSelectedValue={setPropertyValue}
              onInputChange={(val) => fetchConsignee(val, true)}
              onScrollEnd={fetchNextPage}
              loading={consigneeLoading}
              placeholder="Search or select consignee..."
              className="w-full bg-inputField1 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3"
            />
          )}
        </div>

        <div className="mb-4">
          <Button
            type="submit"
            variant="secondary"
            className="w-full justify-center transition-all duration-200"
          >
            Add Property
          </Button>
        </div>

        {/* Added Properties List */}
        <div className="mb-6">
          <label className="text-sm">Added Properties</label>
          {userData.properties.length === 0 ? (
            <div className="text-xs text-bodytext2 w-full py-2 px-3 bg-inputField1 border border-inputField2 rounded">
              No Properties selected
            </div>
          ) : (
            <ul className="space-y-2 text-sm mt-2">
              {userData.properties.map((p, idx) => (
                <li key={idx} className="flex items-center justify-between bg-inputField1 border border-tableBorder rounded px-3 py-2">
                  <span> <span className="font-semibold">{p.name}:</span> {p.displayValue || p.value} </span>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = userData.properties.filter((_, i) => i !== idx);
                      updateField("properties", updated);
                    }}
                    className="ml-4 text-red-500 hover:text-red-700 transition"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="py-6 flex flex-col sm:flex-row justify-between gap-4">
          <Button type="button" onClick={goBack} variant="secondary" className="w-full sm:w-auto justify-start">
            <ArrowLeft size={18} /> Back
          </Button>
          <Button type="button" onClick={goNext} variant="secondary" disabled={isReviewDisabled} className={"flex w-full sm:w-auto justify-end"}>
            Next <ArrowRight size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserProperties;