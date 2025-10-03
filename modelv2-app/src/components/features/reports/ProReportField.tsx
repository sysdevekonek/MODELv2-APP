// components/report/pro-report/DynamicInputFields.tsx
'use client';
import react, { useState } from 'react';
import Button from "@/components/ui/Buttons";
import { useDynamicInputs } from '../../../hooks/pro-report/useDynamicInputs';
import { Download } from 'lucide-react';



const ProReportField = () => {
  const [activeTab, setActiveTab] = useState<'airwaybill' | 'pronumber'>('airwaybill');
  
  const {
    fields,
    validationResults,
    loadingStates,
    isGenerating,
    activeReport,
    handleGenerate,
    handleAdd,
    handleRemove,
    handleChange,
    areAllValid,
    clearFields,
  } = useDynamicInputs(activeTab);

  return (
    <>
    <div className='w-full h-auto md:h-[75vh] sm:h-[60vh] xs:h-[70vh] min-h-[60vh]
                    mt-6 flex flex-col items-center justify-start bg-bgContainer shadow rounded-md'>
    <div className='w-full'>
      <div className='w-2/5 h-[3em] min-w-60
                      mt-[-1.5em] bg-main1 text-titlebodytext1 font-bold flex justify-center items-center rounded'>
        <h1 className='text-xs md:text-base lg:text-lg'>PRO INFORMATION REPORT</h1>
      </div>
    </div>
    {/* Tabs */}
    <div className='w-[95%] md:w-[90%] h-10 md:h-12
                    mt-6 border-b-4 border-mainDef3 flex items-center text-mainTextDef3'>
      <button 
        className={`w-1/5 md:w-1/4 h-full text-xs md:text-sm xs:w-6/12
                    flex items-center justify-center font-bold ${
          activeTab === 'airwaybill' ? 'bg-mainDef3' : 'bg-bgDef text-mainTextDef1'
        }`}
        onClick={() => setActiveTab('airwaybill')}>
        <h6>Airwaybill</h6>
      </button>
      <button
        className={`w-1/5 md:w-1/4 h-full text-xs md:text-sm xs:w-6/12
                    flex items-center justify-center font-bold ${
          activeTab === 'pronumber' ? 'bg-mainDef3' : 'bg-bgDef text-mainTextDef1'
        }`}
        onClick={() => setActiveTab('pronumber')}>
        <h6>Pro Number</h6>
      </button>
      </div>
      {/* Content */}
      <div className='mt-2 {border border-purple-900} py-5 w-full flex flex-col justify-start items-center bg-bgDefcont'>
        <div className="{border border-pink-700} h-full w-full xs:w-5/6 flex flex-col justify-start items-center">
        {/* header row */}
        <div className="{border border-red-700} flex flex-col w-full justify-start items-center">
          <div className='{border border-green-700} w-2/4 md:w-4/5 xs:w-full font-bold text-[1.1vw] flex justify-around'>
          <div className='{border border-teal-500} flex w-[90%] lg:w-[72%] md:ml-6 justify-between '>
            <div className='{border border-blue-700} font-semibold flex justify-start items-center'>
              <p className='text-xs md:text-sm'>
                {activeTab === 'airwaybill' ? 'Insert AIRWAYBILL' : 'Insert PRO NUMBER'}
              </p>
            </div>
            <div className='{border border-purple-700} h-full flex justify-center items-center'>
              <button className='hover:underline text-mainTextDef2 hover:text-red-500 text-xs md:text-sm'
                onClick={clearFields}>Clear</button>
            </div> 
          </div>
          </div>

        {/* Input Fields */}
        <div className="{border border-yellow-700} w-full md:w-4/5 max-h-[150px] md:max-h-[200px]
                        overflow-y-auto flex flex-col items-center gap-2
                        scrollbar-thin scrollbar-thumb-mainDef3 scrollbar-track-bgDef">
        {fields.map((field, index) => {
          const trimmed = field.trim();
          const showValidation = trimmed.length >= 2;
          const isLoading = loadingStates[index];
          const isValid = showValidation && validationResults[index] === true && !isLoading;
          const isInvalid =
            showValidation &&
            validationResults[index] === false &&
            !isLoading; 
          return (
            <div
              key={index}
              className="min-h-8 w-full {border border-red-700} flex flex-row justify-center items-center gap-2 text-mainTextDef3"
            >   
            <span className="w-6 h-6 flex justify-center items-center">
                {isLoading && (
                  <div role="status">
                      <svg className="animate-spin h-4 w-4 md:h-5 md:w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/></svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
                {isValid && (
                  <svg className="w-6 h-6 me-1 text-green-500 dark:text-green-400 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                  </svg>
                )}
                {isInvalid && (
                  <svg className="w-6 h-6 me-2 text-gray-800 dark:text-white shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 20">
                    <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" clipRule="evenodd"/>
                  </svg>
                )}
              </span>
              <input
                type="text"
                className={`lg:w-[65%] md:w-4/5 xs:w-[65%] md:text-sm sm:text-xs xs:text-[0.7rem]
                  pl-3 pr-10 text-base h-full rounded border text-mainTextDef1 ${
                  isValid
                    ? 'border-green-500'
                    : isInvalid
                    ? 'border-red-500'
                    : 'border-mainDef3'
                }`}
                placeholder="e.g JBSDFI123"
                value={field}
                onChange={(e) => handleChange(e.target.value, index)}
              />
                {index === 0 ? (
                  <button
                    onClick={handleAdd}
                    className="flex justify-center items-center w-10 h-full min-h-full rounded bg-mainDef3 hover:bg-[#353B55] transition text-bold"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                  </button>
                ) : (
                  <button
                    onClick={() => handleRemove(index)}
                    className="flex justify-center items-center w-10 h-full min-h-full rounded bg-mainDef3 hover:bg-[#353B55] transition font-bold"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus-icon lucide-minus"><path d="M5 12h14"/></svg>
                  </button>
                )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>

      {/* Buttons */}
      <div className='w-full flex flex-wrap justify-center items-center gap-2 md:gap-4'>
        <Button
          onClick={() => handleGenerate('PRO')}
          disabled={!areAllValid() || isGenerating}
          title={!areAllValid() ? 'All fields must be valid to proceed' : ''}
          variant='primary'
          >
          <span className="text-base md:text-sm sm:text-xs xs:text-[0.6rem]">
            {isGenerating && activeReport === "PRO" ? "Generating..." : "PRO Report"}
          </span>
          <Download size={16} strokeWidth={2} />
        </Button>
        <Button
          onClick={() => handleGenerate('BRC')}
          disabled={!areAllValid() || isGenerating}
          title={!areAllValid() ? 'All fields must be valid to proceed' : ''}
          variant='primary'
          >
          <span className="text-base md:text-sm sm:text-xs xs:text-[0.6rem]">
            {isGenerating && activeReport === "BRC" ? "Generating..." : "BRC Report"}
          </span>
          <Download size={16} strokeWidth={2} />
        </Button>
        <Button
          onClick={() => handleGenerate('MNF')}
          disabled={!areAllValid() || isGenerating}
          title={!areAllValid() ? 'All fields must be valid to proceed' : ''}
          variant='primary'
          >
          <span className="text-base md:text-sm sm:text-xs xs:text-[0.6rem]">
            {isGenerating && activeReport === "MNF" ? "Generating..." : "Manifest Report"}
          </span>
          <Download size={16} strokeWidth={2} />
        </Button>
      </div>
    </div>
    </>
  );
};

export default ProReportField;

