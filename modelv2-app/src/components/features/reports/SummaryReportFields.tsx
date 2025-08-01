import React, { useRef } from "react";
import { useSummaryReports } from "@/hooks/useSummaryReport";
import ComboBox, { ComboBoxRef } from "@/components/comboBox";

export default function SummaryReportFields() {
  const comboRef = useRef<ComboBoxRef>(null);
  const {
    clients,
    selectedClient,
    fromDate,
    toDate,
    loading,
    setSelectedClient,
    setFromDate,
    setToDate,
    fetchAndExportReport,
    clearForm,
  } = useSummaryReports();

  const handleClear = () => {
    clearForm();
    comboRef.current?.clear(); 
  };

  return (
    <>
      <form className="flex items-center justify-center flex-col my-4">
        <div className="flex items-center gap-x-4 mb-4">
          <label className="text-medium text-bodytext1 w-32">
            <span className="font-semibold">Client:</span>
          </label>
          <ComboBox
            ref={comboRef}
            items={clients}
            displayKey="CMP_CON_NAM"
            valueKey="CMP_CON_COD"
            selectedValue={selectedClient}
            setSelectedValue={setSelectedClient}
            className="text-xs bg-inputField1 h-10 px-4 w-full border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-bodytext2"

          />
        </div>

        <div className="flex items-center gap-x-4 mb-2">
          <label htmlFor="entryDateFrom" className="text-medium text-bodytext2 w-32">
            <span className="font-semibold">Entry Date From:</span>
          </label>
          <input
            id="entryDateFrom"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-80 text-xs h-10 px-4 bg-inputField1 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-bodytext2"
          />
        </div>

        <div className="flex items-center gap-x-4 mb-4">
          <label htmlFor="entryDateTo" className="text-medium text-bodytext2 w-32">
            <span className="font-semibold">Entry Date To:</span>
          </label>
          <input
            id="entryDateTo"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-80 text-xs h-10 px-4 bg-inputField1 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-bodytext2"
          />
        </div>
      </form>

      <div className="flex items-center justify-center gap-4">
        <button
          onClick={fetchAndExportReport}
          disabled={loading}
          className={loading ? "pointer-events-none opacity-50" : ""}
        >
          <div className="h-10 w-40 bg-button1 rounded flex justify-center items-center hover:bg-mainDef2 hover:text-mainTextDef2 transition">
        <span className="text-white font-semibold">
          {loading ? "LOADING..." : "GENERATE"}
        </span>
          </div>
        </button>

        <button
          onClick={handleClear}
          disabled={loading}
          className={loading ? "pointer-events-none opacity-50" : ""}
        >
          <div className="h-10 w-40 bg-button2 rounded flex justify-center items-center hover:bg-mainDef2 text-bodytext2 font-semibold">
        CLEAR
          </div>
        </button>
      </div>
    </>
  );
}
