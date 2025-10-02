"use client";

import React, { useRef, useState } from "react";
import ComboBox, { ComboBoxRef } from "@/components/comboBox";
import { useDepartmentDropdown, useConsigneeDropdown } from "@/components/dropdownAPI";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRegistrationContext } from "@/hooks/registration/RegistrationContext";
import Button from "@/components/ui/Buttons";

interface UserPropertiesProps {
  goNext?: () => void;
  goBack: () => void;
  errors: Record<string, string>;
}

const UserProperties: React.FC<UserPropertiesProps> = ({ goNext, goBack, errors }) => {
  const comboRef = useRef<ComboBoxRef>(null);
  const { departmentDropdown } = useDepartmentDropdown();
  const { consigneeDropdown, fetchConsignee, fetchNextPage } = useConsigneeDropdown();

  const [propertyName, setPropertyName] = useState("");
  const [propertyValue, setPropertyValue] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedConsignee, setSelectedConsignee] = useState("");

  const { userData, updateField, isFormComplete } = useRegistrationContext();
  const isReviewDisabled = !isFormComplete(userData) || Object.keys(errors).length > 0;

  const handleProperties = (e: React.FormEvent) => {
    e.preventDefault();

    if (!propertyName) return;

    let value = propertyValue;
    if (propertyName === "DEPARTMENT") value = selectedDepartment;
    if (propertyName === "CONSIGNEE") value = selectedConsignee;

    if (!value) return;

    updateField("properties", [...userData.properties, { name: propertyName, value }]);

    setPropertyName("");
    setPropertyValue("");
    setSelectedDepartment("");
    setSelectedConsignee("");
  };

  return (
    <div className="flex justify-center">
      <form onSubmit={handleProperties} className="w-full max-w-lg">
        
        {/* Property Name */}
        <div className="mb-4 flex flex-col">
          <label htmlFor="propertyName" className="text-sm font-medium mb-1">
            Property Name:
          </label>
          <select
            id="propertyName"
            value={propertyName}
            onChange={(e) => {
              setPropertyName(e.target.value);
              setPropertyValue("");
            }}
            className="w-full bg-inputField1 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3"
          >
            <option value="">Select an option</option>
            <option value="TIN">Tax Identification Number (TIN)</option>
            <option value="DEPARTMENT">Department</option>
            <option value="CONSIGNEE">Consignee</option>
          </select>
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
              required
              placeholder="Select Department..."
              selectedValue={selectedDepartment}
              setSelectedValue={setSelectedDepartment}
              className="w-full bg-inputField1 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3"
            />
          )}
          {propertyName === "CONSIGNEE" && (
            <ComboBox
              ref={comboRef}
              items={consigneeDropdown}
              displayKey="CNEE_NAM"
              valueKey="CNEE_COD"
              required
              selectedValue={selectedConsignee}
              setSelectedValue={setSelectedConsignee}
              onInputChange={(val) => fetchConsignee(val, true)}
              onScrollEnd={fetchNextPage}
              placeholder="Type to search consignee..."
              className="w-full bg-inputField1 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3"
            />
          )}
        </div>

        {/* Add Property Button */}
        <div className="mb-6">
          <Button type="submit" variant="secondary" className="w-full">
            Add Property
          </Button>
        </div>

        {/* Added Properties List */}
        <div className="mb-6">
          <label className="font-sm">Added Properties</label>
          {userData.properties.length === 0 ? (
            <div className="text-xs text-gray-400 w-full py-2 px-3 bg-inputField1 border border-gray-300 rounded">No Properties selected</div>
          ) : (
            <ul className="space-y-2 text-sm mt-2">
              {userData.properties.map((p, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between bg-inputField1 border border-gray-300 rounded px-3 py-2"
                >
                  <span>
                    <span className="font-semibold">{p.name}:</span> {p.value}
                  </span>
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
          <Button type="button" onClick={goBack} variant="secondary" className="w-full sm:w-auto justify-center">
            <ArrowLeft size={18} /> Back
          </Button>
          <Button
            type="button"
            onClick={goNext}
            variant="secondary"
            disabled={isReviewDisabled}
            className={"flex w-full sm:w-auto justify-center"}
          >
            Next <ArrowRight size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserProperties;
