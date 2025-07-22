"use client";
import SummaryReportFields from "@/components/features/reports/SummaryReportFields";

export default function SummaryReportPage() {
  return (
    <div className="bg-bgDefcont w-full h-full rounded-[5px] shadow-lg relative">
      <div className="bg-mainDef3 text-white font-semibold p-4 inline-block rounded-[5px] mb-4 -translate-y-1/4 -top-6">
        <h1>SUMMARY REPORT</h1>
      </div>

      <div className="p-4">
        <div className="bg-mainDef3 text-white font-semibold w-full p-3 pl-6 mb-1">
          <label>Generate Report</label>
        </div>

        <SummaryReportFields />
      </div>
    </div>
  );
}
