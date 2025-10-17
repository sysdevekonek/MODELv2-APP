// components/report/pro-report/DynamicInputFields.tsx
'use client';
import react, { useState } from 'react';
import Button from "@/components/ui/Buttons";
import { useDynamicInputs } from '../../../hooks/pro-report/useDynamicInputs';
import { Download } from 'lucide-react';
import { Plus } from 'lucide-react';
import { Minus } from 'lucide-react';
import { CircleCheck } from 'lucide-react';




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
                    mt-6 border-b-4 border-themebutton1 flex items-center text-mainTextDef3'>
      <button 
        className={`w-1/5 md:w-1/4 h-full text-xs md:text-sm xs:w-6/12
                    flex items-center justify-center font-bold ${
          activeTab === 'airwaybill' ? 'bg-themebutton1' : 'bg-bgContainer text-bodytext2'
        }`}
        onClick={() => setActiveTab('airwaybill')}>
        <h6>Airwaybill</h6>
      </button>
      <button
        className={`w-1/5 md:w-1/4 h-full text-xs md:text-sm xs:w-6/12
                    flex items-center justify-center font-bold ${
          activeTab === 'pronumber' ? 'bg-themebutton1' : 'bg-bgContainer text-bodytext2'
        }`}
        onClick={() => setActiveTab('pronumber')}>
        <h6>Pro Number</h6>
      </button>
      </div>
      {/* Content */}
      <div className='mt-2 {border border-purple-900} py-5 w-full flex flex-col justify-start items-center bg-main'>
        <div className="{border border-pink-700} h-full w-full xs:w-5/6 flex flex-col justify-start items-center">
        
        <div className="flex flex-col w-full items-center {border border-red-700} p-2">
          <div className="flex flex-wrap justify-between items-center w-full md:w-3/5 p-2 gap-2">
            <p className="font-semibold text-sm md:text-base">
              {activeTab === 'airwaybill' ? 'Insert AIRWAYBILL' : 'Insert PRO NUMBER'}
            </p>
            <Button
              onClick={clearFields}
              variant='secondary'
              className='bg-main1 text-titlebodytext1'
            >
              Clear
            </Button>
          </div>

          {/* Input Fields */}
          <div className="w-full p-2 md:w-3/5 mt-2 flex flex-col gap-2 overflow-y-auto max-h-[200px] scrollbar-thin scrollbar-thumb-main1 scrollbar-track-main1">
            {fields.map((field, index) => {
              const trimmed = field.trim();
              const showValidation = trimmed.length >= 2;
              const isLoading = loadingStates[index];
              const isValid = showValidation && validationResults[index] === true && !isLoading;
              const isInvalid = showValidation && validationResults[index] === false && !isLoading;

              return (
                <div
                  key={index}
                  className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-2 w-full"
                >
                 <div className="relative flex-1 min-w-[60%]">
                    <input
                      type="text"
                      className={`bg-inputField1 w-full pl-3 pr-10 py-1 text-sm rounded border border-inputField2 ${
                        isValid
                          ? 'border-green-500'
                          : isInvalid
                          ? 'border-red-500'
                          : 'border-main1'
                      }`}
                      placeholder="e.g JBSDFI123"
                      value={field}
                      onChange={(e) => handleChange(e.target.value, index)}
                    />

                    {/* Icon inside input */}
                    <span className="absolute inset-y-0 right-2 flex items-center">
                      {isLoading && (
                        <svg
                          className="animate-spin h-4 w-4 text-gray-400"
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
                      {isValid && (
                        <svg
                          className="w-5 h-5 text-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 20"
                        >
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                        </svg>
                      )}
                      {isInvalid && (
                        <svg
                          className="w-5 h-5 text-main1"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </span>
                  </div>

                  {/* Add/Remove */}
                  <Button
                    onClick={index === 0 ? handleAdd : () => handleRemove(index)}
                    variant='primary'
                    className="text-titlebodytext1">
                    {index === 0 ? (
                      <Plus height={15} width={15} strokeWidth={3}/>
                    ) : (
                      <Minus height={15} width={15} strokeWidth={3}/>
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>

      {/* Buttons */}
      <div className='{border border-red-700} w-full flex flex-wrap justify-center items-center gap-2 md:gap-4 xs:flex-col md:flex-row '>
        <Button
          onClick={() => handleGenerate('PRO')}
          disabled={!areAllValid() || isGenerating}
          title={!areAllValid() ? 'All fields must be valid to proceed' : ''}
          variant='primary'
          className='bg-main1'
          >
          <span className="text-sm">
            {isGenerating && activeReport === "PRO" ? "Generating..." : "PRO Report"}
          </span>
          <Download size={16} strokeWidth={2} />
        </Button>
        <Button
          onClick={() => handleGenerate('BRC')}
          disabled={!areAllValid() || isGenerating}
          title={!areAllValid() ? 'All fields must be valid to proceed' : ''}
          variant='primary'
          className='bg-main1'
          >
          <span className="text-sm">
            {isGenerating && activeReport === "BRC" ? "Generating..." : "BRC Report"}
          </span>
          <Download size={16} strokeWidth={2} />
        </Button>
        <Button
          onClick={() => handleGenerate('MNF')}
          disabled={!areAllValid() || isGenerating}
          title={!areAllValid() ? 'All fields must be valid to proceed' : ''}
          variant='primary'
          className='bg-main1'
          >
          <span className="text-sm">
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

