'use client';
import React, { useRef } from "react";
import ComboBox, { ComboBoxRef } from "@/components/comboBox";
import { useRegistrationContext } from "@/hooks/registration/RegistrationContext";
import { useCountryDropdown } from "@/components/dropdownAPI";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { UserData } from "@/components/data/dataTypes";
import Button from "@/components/ui/Buttons";

interface PersonalDataProps {
  goNext: () => void;
  goBack: () => void;
  errors?: Record<string, string>;
  clearError: (field: keyof UserData) => void;
}

const PersonalData: React.FC<PersonalDataProps> = ({ goNext, goBack, errors, clearError }) => {
  const comboRef = useRef<ComboBoxRef>(null);
  const { countryDropdown, loading, countriesChange } = useCountryDropdown();
  const { userData, updateField } = useRegistrationContext();

  // 🔹 Reusable renderer for regular inputs
  const renderInputField = (
    id: keyof UserData,
    label: string,
    placeholder: string,
    isRequired = false,
    maxLength = 80,
    type = "text"
  ) => (
    <div className="mb-1 flex flex-col justify-center md:flex-row md:items-center gap-2">
      <label htmlFor={String(id)} className="block text-sm md:w-40">
        {label} {isRequired && <span className="text-red-500">*</span>}
        {errors?.[id] && <p className="text-xs text-red-500 mt-1">{errors[id]}</p>}
      </label>

      <input
        id={String(id)}
        type={type}
        maxLength={maxLength}
        value={userData[id] as string}
        onChange={(e) => {
          updateField(id, e.target.value);
          clearError(id);
        }}
        placeholder={placeholder}
        className={`bg-inputField1 w-full md:w-96 text-xs h-10 px-4 border rounded-lg focus:outline-none focus:ring-2 ${
          errors?.[id] ? "border-red-500 ring-1 ring-red-500" : "border-inputField2 focus:ring-mainDef3"
        }`}
      />
    </div>
  );

  const renderComboBoxField = (
    id: keyof UserData,
    label: string,
    placeholder: string,
    isRequired = false
  ) => (
    <div className="mb-1 flex flex-col justify-center md:flex-row md:items-center gap-2">
      <label htmlFor={String(id)} className="block text-sm md:w-40">
        {label} {isRequired && <span className="text-red-500">*</span>}
        {errors?.[id] && <p className="text-xs text-red-500 mt-1">{errors[id]}</p>}
      </label>

      <ComboBox
        ref={comboRef}
        items={countryDropdown}
        displayKey="COUNTRY_NAME"
        valueKey="COUNTRY_CODE"
        placeholder={placeholder}
        loading={loading}
        onInputChange={countriesChange}
        selectedValue={userData.country}
        setSelectedValue={(val) => {
          updateField("country", val);
          clearError("country");
        }}
        className={`bg-inputField1 w-full md:w-96 text-xs h-10 px-4 border rounded-lg focus:outline-none focus:ring-2 ${
          errors?.[id] ? "border-red-500 ring-1 ring-red-500" : "border-inputField2 focus:ring-mainDef3"
        }`}
      />
    </div>
  );

  // 🔹 Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    goNext();
  };

  return (
    <div className="flex justify-center">
      <form className="px-4 md:px-6 w-full max-w-3xl" onSubmit={handleSubmit}>
        {renderInputField("name", "Full Name:", "Insert Full Name", true)}
        {renderInputField("address", "Address:", "Insert Full Address", true, 255)}
        {renderComboBoxField("country", "Country", "Select Country", true)}
        {renderInputField("city", "City:", "Insert City", false, 50)}
        {renderInputField("zip", "Zip Code:", "Insert Zip Code", false, 10)}
        {renderInputField("phone_no", "Phone #:", "Insert Phone #", false, 32)}
        {renderInputField("cellphone_no", "Cell #:", "Insert Cell #", false, 32)}
        {renderInputField("fax", "Fax:", "Insert Fax", false, 32)}
        {renderInputField("email", "Email:", "Insert Email", true, 50, "email")}

        <div className="py-6 flex flex-col sm:flex-row justify-between gap-4">
          <Button
            type="button"
            onClick={goBack}
            variant="secondary"
            className="w-full sm:w-auto justify-start"
          >
            <ArrowLeft size={18} /> Back
          </Button>

          <Button type="submit" variant="secondary" className="w-full sm:w-auto justify-end">
            Next <ArrowRight size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalData;
