"use client";

import React, { useRef, useState } from "react";
import ComboBox, { ComboBoxRef } from "@/components/comboBox";
import { useDepartmentDropdown, useConsigneeDropdown } from "@/components/dropdownAPI";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRegistrationContext } from "@/hooks/registration/RegistrationContext"; // ✅ Use context

interface UserPropertiesProps {
  goNext?: () => void;
  goBack: () => void;
  errors: Record<string, string>;
}

const UserProperties: React.FC<UserPropertiesProps> = ({ goNext, goBack, errors }) => {
  const comboRef = useRef<ComboBoxRef>(null);
  const { departmentDropdown } = useDepartmentDropdown();
  const { consigneeDropdown, fetchConsignee, fetchNextPage } = useConsigneeDropdown();
  const [selectedDepartment, setSelectedDepartment] = React.useState<string>(" ");
  const [selectedConsignee, setSelectedConsignee] = React.useState<string>(" ");
  const [propertyName, setPropertyName] = useState(" ");
  const [propertyValue, setPropertyValue] = useState(" ");

  const { userData, updateField, isFormComplete } = useRegistrationContext();

  const isReviewDisabled = !isFormComplete(userData) || Object.keys(errors).length > 0;

  const handleProperties = (e: React.FormEvent) => {
    e.preventDefault();

    if (!propertyName) return;

    let value = propertyValue;
    if (propertyName === "DEPARTMENT") value = selectedDepartment;
    if (propertyName === "CONSIGNEE") value = selectedConsignee;

    if (!value) return;

    updateField("properties", [...userData.properties,
      { name: propertyName, value },
    ]);

    setPropertyName("");
    setPropertyValue("");
    setSelectedDepartment("");
    setSelectedConsignee("");
  };

  return (
    <div>
      <form onSubmit={handleProperties} className="pl-5">
        <div className="mb-[3px] flex items-center">
          <label htmlFor="propertyName" className="block text-medium mb-1 w-56">
            <label>Property Name:</label>
          </label>
          <select
            value={propertyName}
            onChange={(e) => {
              setPropertyName(e.target.value);
              setPropertyValue("");
            }}
            className="bg-inputField1 w-96 text-xs font-titleFont h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 focus:border-transparent text-subtext"
          >
            <option value="" className="text-bodytext2"> Select an option</option>
            <option value="TIN" className="text-bodytext2">Tax Identification Number (TIN)</option>
            <option value="DEPARTMENT" className="text-bodytext2">Department</option>
            <option value="CONSIGNEE" className="text-bodytext2">Consignee</option>
          </select>
        </div>

        <div className="mb-4 flex items-center">
          <label htmlFor="propertyValue" className="block text-medium mb-1 w-56">
            <label>Property Value:</label>
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
              className="bg-inputField1 w-96 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 focus:border-transparent placeholder:text-subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs"
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
              className="bg-inputField1 w-96 text-xs text-bodytext2 h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 focus:border-transparent placeholder:text-subtext placeholder:font-titleFont placeholder:text-xs"
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
              className="bg-inputField1 w-96 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 focus:border-transparent placeholder:text-subtext placeholder:font-titleFont placeholder:text-xs"
            />
          )}
        </div>
        <div>
          <button type="submit" className="w-full justify-center flex items-center gap-2 px-5 py-2 rounded bg-main1 text-white font-medium hover:bg-mainDef2 transition">
            Add Property
          </button>
        </div>
        <div className="my-4">
          <label className="font-medium">ADDED PROPERTIES </label>
          <ul className="space-y-2 text-sm">
            {userData.properties.map((p, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded px-3 py-2"
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
        </div>

      </form>
      <div className='flex justify-between'>
        <button
          type="button"
          onClick={goBack}
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={isReviewDisabled}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg font-medium transition ${isReviewDisabled
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          Next
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default UserProperties;
