"use client";
import React from "react";
import Button from "../ui/Buttons";

export default function PROEditHBLAWBPage() {
  const handleClear = () => {
    // clearForm();
    // comboRef.current?.clear(); 
  };

  const renderInputField = (
    id: string,
    type: "text",
    label: string,
    placeholder: string,
    isRequired: boolean,
  ) => (
    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-x-4">
      <label className="text-sm font-medium text-bodytext1 w-40 shrink-0">
        {label} {isRequired && <span className="text-red-500">*</span>}
        {/* {errors?.[id] && <p className="text-xs text-red-500 mt-1">{errors[id]}</p>} */}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="flex-1 text-sm h-10 px-4 bg-inputField1 border border-inputField2 
        rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
        text-bodytext2 transition-all duration-150"
      />
    </div>
  )

  return (
    <>
      <form className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-6">
        <div className="w-full space-y-4">
          {renderInputField("proNumber", "text", "PRO No:", "Enter PRO number", false)}
          {renderInputField("currentHBL", "text", "Current HBL/AWB No:", "Enter current HBL/AWB number", true)}
          {renderInputField("newHBL", "text", "New HBL/AWB No:", "Enter new HBL/AWB number", true)}

          <div className="pt-4 flex justify-center gap-4">
            <Button onClick={handleClear} variant="secondary"> Clear </Button>
            <Button type="submit" variant="primary"> Update HBL/AWB </Button>
          </div>
        </div>
      </form>
    </>
  );
}
