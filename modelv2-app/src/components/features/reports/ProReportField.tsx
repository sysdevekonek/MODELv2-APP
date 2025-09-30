// components/report/pro-report/DynamicInputFields.tsx
'use client';
import react, { useState } from 'react';
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
    <div className='w-full h-full flex justify-center items-center'>
    <div className='w-[100%] h-[85%] flex flex-col justify-between'>
      <div className='border-b-4 border-mainDef3 flex w-full h-12 items-center text-mainTextDef3'>
      <button 
        className={`w-1/5 h-full flex items-center justify-center font-bold ${
          activeTab === 'airwaybill' ? 'bg-mainDef3' : 'bg-bgDef text-mainTextDef1'
        }`}
        onClick={() => setActiveTab('airwaybill')}
      >
        <h6>Airwaybill</h6>
      </button>

      <button
        className={`w-1/5 h-full flex items-center justify-center font-bold ${
          activeTab === 'pronumber' ? 'bg-mainDef3' : 'bg-bgDef text-mainTextDef1'
        }`}
        onClick={() => setActiveTab('pronumber')}
      >
        <h6>Pro Number</h6>
      </button>
      </div>
      {/* Content */}
      <div className='{border border-purple-900} py-5 w-full flex flex-col justify-start items-center max-h-[240px] overflow-y-auto bg-bgDefcont scrollbar-thin scrollbar-thumb-mainDef3 scrollbar-track-bgDef'>
        <div className="{border border-pink-700} h-full w-full flex flex-col justify-start items-center">
        <div className="{border border-red-700} flex flex-col h-full w-6/12 justify-center items-center">
          <div className='{border border-green-700} w-[90%] font-bold text-[1.1vw] flex pl-7'>
            <div className='{border border-blue-700} font-semibold w-2/4 flex justify-start items-center'>
              <p>
                {activeTab === 'airwaybill' ? 'Insert AIRWAYBILL' : 'Insert PRO NUMBER'}
              </p>
            </div>
            <div className='{border border-yellow-700} w-1/5 h-full flex justify-center items-center'>
              <button className='hover:underline text-mainTextDef2 hover:text-red-500'
                onClick={clearFields}>Clear</button>
            </div> 
          </div>
        <div className='w-full max-h-[250px] overflow-y-auto flex flex-col justify-around gap-2 scrollbar-thin scrollbar-thumb-mainDef3 scrollbar-track-bgDef p-5'>
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
              className="{border border-red-700} flex flex-row items-center gap-2 text-mainTextDef3 w-full h-full"
            >   
            <span className="w-6 h-6 flex justify-center items-center">
                {isLoading && (
                  <div role="status">
                    <svg aria-hidden="true" className="w-5 h-5 me-2 text-gray-400 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
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
                className={`pl-3 pr-10 text-[1vw] h-full rounded border text-mainTextDef1 ${
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
                    className="flex justify-center items-center w-[10%] h-full rounded bg-mainDef3 hover:bg-[#353B55] transition font-bold"
                  >
                    <h3 className="text-[1.5vw]">+</h3>
                  </button>
                ) : (
                  <button
                    onClick={() => handleRemove(index)}
                    className="flex justify-center items-center w-[10%] h-[100%] rounded bg-mainDef3 hover:bg-[#353B55] transition font-bold"
                  >
                    <h3 className="text-[1.5vw]">-</h3>
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
      <div className='w-full h-auto text-mainTextDef3 flex justify-center items-center gap-4'>
        <button className={`flex flex-row justify-center items-center h-8 w-36 rounded gap-1 transition
          ${areAllValid() && !isGenerating 
          ? 'bg-mainDef3 text-mainTextDef3 hover:bg-[#353B55]'
          : 'bg-[#cccccc] text-[#848484] cursor-not-allowed'}`}
          onClick={() => handleGenerate('PRO')}
          disabled={!areAllValid() || isGenerating}
          title={!areAllValid() ? 'All fields must be valid to proceed' : ''}
          >
          <span className="text-[1vw]">
            {isGenerating && activeReport === "PRO" ? "Generating..." : "PRO Report"}
          </span>
          <Download size={16} strokeWidth={2} />
        </button>
        <button className={`flex flex-row justify-center items-center h-8 w-36 rounded gap-1 transition
          ${areAllValid() && !isGenerating 
          ? 'bg-mainDef3 text-mainTextDef3 hover:bg-[#353B55]'
          : 'bg-[#cccccc] text-[#848484] cursor-not-allowed'}`}
          onClick={() => handleGenerate('BRC')}
          disabled={!areAllValid()}
          title={!areAllValid() ? 'All fields must be valid to proceed' : ''}
          >
          <span className="text-[1vw]">
            {isGenerating && activeReport === "BRC" ? "Generating..." : "BRC Report"}
          </span>
          <Download size={16} strokeWidth={2} />
        </button>
        <button className={`flex flex-row justify-center items-center h-8 w-40 rounded gap-1 transition
          ${areAllValid() && !isGenerating 
          ? 'bg-mainDef3 text-mainTextDef3 hover:bg-[#353B55]'
          : 'bg-[#cccccc] text-[#848484] cursor-not-allowed'}`}
          onClick={() => handleGenerate('MNF')}
          disabled={!areAllValid()}
          title={!areAllValid() ? 'All fields must be valid to proceed' : ''}
          >
          <span className="text-[1vw]">
            {isGenerating && activeReport === "MNF" ? "Generating..." : "Manifest Report"}
          </span>
          <Download size={16} strokeWidth={2} />
        </button>
      </div>
    </div>
  </div>

    
  );
};

export default ProReportField;

