import React, { useRef } from "react";
import { useSummaryReports } from "@/hooks/reports/useSummaryReport";
import ComboBox, { ComboBoxRef } from "@/components/utils/comboBox";
import Button from "@/components/ui/Buttons";

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
  <div className="w-full max-w-xl mx-auto p-6">
    <form className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
        <label className="w-full sm:w-auto text-sm font-semibold text-bodytext2">
          Client:
        </label>
        <div className="w-full">
          <ComboBox
            ref={comboRef}
            items={clients.length > 0 ? clients : [{ CMP_CON_NAM: "No clients found", CMP_CON_COD: "" }]}
            displayKey="CMP_CON_NAM"
            valueKey="CMP_CON_COD"
            selectedValue={selectedClient}
            setSelectedValue={(val) => {
                if (val !== "") setSelectedClient(val);
              }}
              showValueKeyInList={false}
            className="w-full bg-inputField1 border border-inputField2 text-sm rounded-lg focus:ring-2 focus:ring-main1 focus:outline-none text-sm px-3 py-2"
          />
        </div>
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label
            htmlFor="entryDateFrom"
            className="text-sm font-semibold text-bodytext2 mb-1"
          >
            Entry Date From:
          </label>
          <input
            id="entryDateFrom"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full bg-inputField1 border border-inputField2 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-main1 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="entryDateTo"
            className="text-sm font-semibold text-bodytext2 mb-1"
          >
            Entry Date To:
          </label>
          <input
            id="entryDateTo"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full bg-inputField1 border border-inputField2 text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-main1 focus:outline-none"
          />
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Button
          onClick={fetchAndExportReport}
          disabled={loading}
          variant="primary"
          className="w-full sm:w-auto flex justify-center"
        >
          {loading ? "LOADING..." : "GENERATE"}
        </Button>

        <Button
          onClick={handleClear}
          disabled={loading}
          variant="secondary"
          className="w-full sm:w-auto flex justify-center"
        >
          CLEAR
        </Button>
      </div>
    </form>
  </div>
);

}
