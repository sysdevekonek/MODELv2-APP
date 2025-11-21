"use client"
import ComboBox, { ComboBoxRef } from "@/components/utils/comboBox";
import toast from "react-hot-toast";
import { useRef, useEffect } from "react";
import { columns } from "../../utils/nslDatatable/columns"
import { DataTable } from "../../ui/datatable/datatable"
import { usenslreport } from "@/hooks/reports/usenslreport";
import { CirclePlus } from 'lucide-react';
import { Settings } from 'lucide-react';
import { RotateCcw } from 'lucide-react';
import { Download } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/datatable/dropdown-menu"

const nslreport = () => {
const state = usenslreport();
  const {
    comboRef,
    data,
    updateRow,
    removeRow,
    handleAddField,
    handleResetRows,
    handleTemplateSelect,
    handleSaveTemplate,
    showSaveDialog,
    handleCancelTemplate,
    handleOpenDialog,
    templateName,
    setTemplateName,
    saving,
    templateDropdown,
    selectedTemplate,
    consigneeDropdown,
    selectedConsignee,
    setSelectedConsignee,
    fetchConsignee,
    fetchNextPage,
    consolidatorDropdown,
    selectedConsolidator,
    setSelectedConsolidator,
    fetchConsolidator,
    fetchNextPageConsi,
    warehouseDropdown,
    selectedWarehouse,
    setSelectedWarehouse,
    fetchWarehouse,
    fetchNextPageWarehouse,
    departmentDropdown,
    selectedDepartment,
    setSelectedDepartment,
    detailedInvoice,
    setDetailedInvoice,
    checking,
    isValid,
    exportToExcel,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    validateForm,
    dateError,
    rowError,
    fetchAndExportReport
  } = state;

  const dateErrorRef = useRef<HTMLDivElement | null>(null);
  const rowErrorRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (dateError && dateErrorRef.current) {
      dateErrorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (rowError && Object.keys(rowError).length > 0 && rowErrorRef.current) {
      rowErrorRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [dateError, rowError]);
  

  
  return (
    <>
      <div className='border border-red-700 mt-6 w-full h-auto flex flex-col items-center justify-center bg-bgContainer shadow rounded-md'>
            <div className='w-full'>
              <div className='mt-[-1.5em] bg-main1 text-titlebodytext1 font-bold w-2/5 lg:w-1/4 h-[3em] flex justify-center items-center rounded'>
                  <h1>NSL REPORT</h1>
              </div>
            </div>
            <div className='mt-5 w-[95%] h-[30em] flex flex-col'>
                <div className='pl-5 bg-main1 text-titlebodytext1 font-bold h-[8%] flex items-center'>
                    <h3>NSL REPORT EXTRACTION</h3>
                </div>
                {/* start of form */}
                <div className='{border border-red-700} flex flex-col justify-center items-center w-full h-[90%]'>
                  <div className='{border border-blue-700} h-full w-full lg:w-[70%] flex flex-col justify-center'>
                    <form>
                        <div className='gap-1 p-4 flex flex-col w-full'>
                          <div className='w-full flex flex-row justify-around items-center'>
                            <label className='text-sm font-semibold w-[20%] h-full'>Template:</label>
                            <div className="w-3/5">
                              <ComboBox
                                ref={comboRef}
                                items={templateDropdown}
                                displayKey="TEMPLATE_NAME"
                                valueKey="TEMPLATE_ID"
                                placeholder="Search Template..."
                                selectedValue={selectedTemplate}
                                showValueKeyInList={false}
                                setSelectedValue={(val) => handleTemplateSelect(val)}
                                className="text-xs bg-inputField1 h-10 px-4 w-full border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-bodytext2"
                              />
                          </div>
                          </div>
                          <br />
                          <div className='w-full flex flex-row items-center0'>
                            <div className="w-full flex flex-row justify-around items-center">
                              <label className='text-sm font-semibold w-[20%]'>Date from:</label>
                              <div ref={dateErrorRef} className='w-[60.2%] flex flex-row justify-between items-center'>
                                <input  type="date"
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                        className={`rounded-md pl-3 p-1 w-[40%] h-10 text-xs bg-inputField1
                                        border ${!fromDate && dateError ? "border-red-500 text-red-500" : " text-[#858585]"}`} />
                                <label>To: </label>
                                <input  type="date"
                                        value={toDate}
                                        onChange={(e) => setToDate(e.target.value)}
                                        className={`rounded-md pl-3 p-1 w-[40%] h-10 text-xs bg-inputField1
                                        border ${!toDate && dateError ? "border-red-500 text-red-500" : " text-[#858585]"}`} />
                              </div>
                            </div>
                          </div>
                          {dateError && (!fromDate || !toDate) && (
                            <div className="w-full flex justify-around">
                              <p className="text-red-500 text-xs mt-1">{dateError}</p>
                            </div>
                          )}

                          <div>
                            <div className='flex flex-col gap-1 w-full'>
                              <div className='w-full flex justify-around items-center'>
                                <label className='text-sm font-semibold w-[20%]'>Consignee:</label>
                                <div className=" w-3/5">
                                  <ComboBox
                                    ref={comboRef}
                                    items={consigneeDropdown}
                                    displayKey="CNEE_NAM"
                                    valueKey="CNEE_COD"
                                    placeholder="Search Consignee..."
                                    selectedValue={selectedConsignee}
                                    setSelectedValue={setSelectedConsignee}
                                    onInputChange={(val) => fetchConsignee(val, true)}
                                    onScrollEnd={fetchNextPage} 
                                    className="text-xs bg-inputField1 h-10 px-4 w-full border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-bodytext2"
                                  />
                                </div>
                              </div>
                              <div className='w-full flex justify-around items-center'>
                                <label className='text-sm font-semibold w-[20%]'>Consolidator:</label>
                                <div className="w-3/5">
                                  <ComboBox
                                    ref={comboRef}
                                    items={consolidatorDropdown}
                                    displayKey="NAME"
                                    valueKey="CODE"
                                    placeholder="Search Consolidator..."
                                    selectedValue={selectedConsolidator}
                                    setSelectedValue={setSelectedConsolidator}
                                    onInputChange={(val) => fetchConsolidator(val, true)}
                                    onScrollEnd={fetchNextPageConsi} 
                                    className="text-xs bg-inputField1 h-10 px-4 w-full border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-bodytext2"
                                  />
                                </div>
                              </div>
                              <div className='w-full flex justify-around items-center'>
                                <label className='text-sm font-semibold w-[20%]'>Warehouse:</label>
                                <div className="w-3/5">
                                  <ComboBox
                                    ref={comboRef}
                                    items={warehouseDropdown}
                                    displayKey="NAME"
                                    valueKey="CODE"
                                    placeholder="Search Warehouse..."
                                    selectedValue={selectedWarehouse}
                                    setSelectedValue={setSelectedWarehouse}
                                    onInputChange={(val) => fetchWarehouse(val, true)}
                                    onScrollEnd={fetchNextPageWarehouse}
                                    className="text-xs bg-inputField1 h-10 px-4 w-full border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-bodytext2"
                                  />
                                </div>
                              </div>
                              <div className='w-full flex justify-around items-center'>
                                <label className='text-sm font-semibold w-[20%]'>Department:</label>
                                <div className="w-3/5">
                                  <ComboBox
                                    ref={comboRef}
                                    items={departmentDropdown}
                                    displayKey="DEPT_NAME"
                                    valueKey="DEPT_CODE"
                                    placeholder="Search Department..."
                                    selectedValue={selectedDepartment}
                                    setSelectedValue={setSelectedDepartment}
                                    className="text-xs bg-inputField1 h-10 px-4 w-full border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 text-bodytext2"
                                  />
                              </div>
                              </div>
                              <br />
                              <div className='w-full flex justify-start items-center'>
                                <div className="w-[30%] flex justify-between">
                                  <label className=' text-sm font-semibold w-full pl-[20px]'>Detailed Invoice:</label>
                                  <input type="checkbox"
                                        checked={detailedInvoice}
                                        onChange={(e) => setDetailedInvoice(e.target.checked)}
                                        className="w-[20px] h-[20px]"/>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                  </div>
                </div>
            </div>
            {/* end of form */}
            <div className='mt-5 w-[95%] h-full flex flex-col mb-5'>
                <div className='pl-5 bg-main1 text-titlebodytext1 font-bold h-[2.5em] flex items-center'>
                    <h3>REPORT TABLE</h3>
                </div>
                <div className="flex flex-row w-full h-[2.5em] gap-2 my-2">
                  <button 
                    onClick={handleAddField}
                    title="Add Rows"
                    className="transition font-medium w-32 h-full bg-main1 text-titlebodytext1 rounded-sm flex justify-center items-center gap-3 hover:bg-buttonHover">
                      Add Field <CirclePlus height={20} width={20}/>
                  </button>
                  <button 
                    onClick={() => {
                      if (!validateForm(data, fromDate, toDate)) return;

                      toast.promise(
                        fetchAndExportReport(data, {
                          fromDate,
                          toDate,
                          ConsigneeCode: selectedConsignee,
                          Invoice: detailedInvoice,
                          ConsolidatorCode: selectedConsolidator,
                          WarehouseCode: selectedWarehouse,
                          DepartmentCode: selectedDepartment,
                        }),
                        {
                          loading: "Generating report...",
                          success: <b>Report generated successfully!</b>,
                          error: <b>Failed to generate report.</b>,
                        }
                      );
                    }}
                    title="Download Rows"
                    className="transition hover:bg-buttonHover hover:text-white font-medium w-10 h-full bg-button2 text-bodytext2 rounded-sm flex justify-center items-center gap-3">
                      <Download height={20} width={20}/>
                  </button>
                  <button 
                    onClick={handleResetRows}
                    title="Reset Rows"
                    className="transition hover:bg-buttonHover hover:text-white font-medium w-10 h-full bg-button2 text-bodytext2 rounded-sm flex justify-center items-center gap-3">
                      <RotateCcw height={20} width={20}/>
                  </button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="transition font-medium w-10 h-full bg-button2 text-bodytext2 rounded-sm flex justify-center items-center hover:bg-buttonHover hover:text-white" title="Options">
                        <Settings height={20} width={20}/>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={handleOpenDialog}>
                        Save
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => {/* your print logic */}}>
                        Generate All
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {/* start of form */}
                <div ref={rowErrorRef} className='w-full h-full'>
                    <DataTable
                      columns={columns({
                        updateRow,
                        removeRow,
                        rowError,
                      })}
                      data={data}
                    />
                </div>
            </div>
        </div>
        {showSaveDialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-opacity-40">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <div className="flex justify-center items-center w-2/3 h-[3em] bg-main1 mb-4 rounded -my-12 -ml-6">
                <h2 className="text-lg font-bold text-white">Save Template</h2>
              </div>
              <div className="flex flex-col w-full">
                {/* Input wrapper */}
                <div className="relative w-full">
                  <input
                    type="text"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="Enter template name"
                    className="w-full border rounded px-3 py-2 pr-10"
                  />

                  {/* Status Icon positioned inside input */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {checking && (
                      <svg
                        className="animate-spin h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                    )}
                    {isValid === true && (
                      <svg className="w-6 h-6 me-1 text-green-500 dark:text-green-400 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                      </svg>
                    )}
                    {isValid === false && !checking && (
                      <svg className="w-6 h-6 me-2 text-gray-800 dark:text-white shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 20">
                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </div>
                </div>

                {isValid === false && (
                  <p className="text-sm text-red-600 mt-1">
                    Template name already exists.
                  </p>
                )}
                {isValid === true && (
                  <p className="text-sm text-green-600 mt-1">
                    Template name is available.
                  </p>
                )}
                {/* {isValid === null && templateName.trim() && !checking && (
                  <p className="text-sm text-gray-500 mt-1">
                    Couldn’t validate template name. Please try again.
                  </p>
                )} */}

              </div>

              <div className="mt-4 flex justify-end gap-2 h-[2.5em]">
                <button
                  onClick={handleCancelTemplate}
                  className="px-4 py-2 border rounded border-none bg-button2 text-bodytext2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveTemplate}
                  disabled={saving || checking || isValid !== true || !templateName.trim()}
                  className="px-4 py-2 bg-main1 text-white rounded border-none disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default nslreport