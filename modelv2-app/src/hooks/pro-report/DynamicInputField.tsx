// components/report/pro-report/DynamicInputFields.tsx
'use client';

import { useDynamicInputs } from './useDynamicInputs';

const DynamicInputFields = ({ activeTab }: { activeTab: 'airwaybill' | 'pronumber' }) => {
  const { fields, handleAdd, handleRemove, handleChange } = useDynamicInputs(activeTab);

  return (
    <div className="h-full w-full flex flex-col justify-start items-center">
      <div className="flex flex-col h-full w-[50%] justify-center items-center gap-2">
        <p className="font-bold w-[62%] text-[1.1vw]">
          {activeTab === 'airwaybill' ? 'Insert AIRWAYBILL' : 'Insert PRO NUMBER'}
        </p>
      <div className='w-full max-h-[250px] overflow-y-auto flex flex-col gap-2 scrollbar-thin scrollbar-thumb-mainDef3 scrollbar-track-bgDef'>
          {fields.map((field, index) => (
            <div
              key={index}
              className="flex flex-row justify-center gap-2 text-mainTextDef3 w-full h-full"
            >
              <input
                type="text"
                className="w-[50%] pl-3 text-[1vw] rounded border border-mainDef3 text-mainTextDef1"
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default DynamicInputFields;
