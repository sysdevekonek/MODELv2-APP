'use client'
import React, { useState } from 'react'
import Layout from '@/components/layout/layout';
import DynamicInputFields from '@/hooks/pro-report/DynamicInputField';

//ICON
import { Download } from 'lucide-react';

const proReport = () => {
    const [activeTab, setActivetab] = useState<'airwaybill' | 'pronumber'>('airwaybill');
  
  return (
    <Layout>
        <div className='w-full h-[70vh] flex flex-col justify-center items-center p-8 mt-5 bg-bgDefcont shadow-2xl rounded-[10px]'>
            <div className='w-96 h-12 flex items-center justify-center absolute top-5 left-[280px] rounded text-[1.5vw] text-mainTextDef3 bg-mainDef3 font-semibold shadow-md'>
              <h3>PRO INFORMATION REPORT</h3>
            </div>
            <div className='w-full h-full flex justify-center items-center'>
              <div className='w-[80%] h-[85%] flex flex-col justify-between'>
                <div className='border-b-4 border-mainDef3 flex w-full h-12 items-center text-mainTextDef3'>
                  <button className={`w-1/5 h-full flex items-center justify-center font-bold ${activeTab === 'airwaybill' ? 'bg-mainDef3' : 'bg-bgDef text-mainTextDef1'}`} onClick={() => setActivetab('airwaybill')}>
                    <h6>Airwaybill</h6>
                  </button>
                  <button className={`w-1/5 h-full flex items-center justify-center font-bold ${activeTab === 'pronumber' ? 'bg-mainDef3' : 'bg-bgDef text-mainTextDef1'}`} onClick={() => setActivetab('pronumber')}>
                    <h6>Pro Number</h6>
                  </button>
                </div>
                {/* Content */}
                <div className='py-10 w-full flex flex-col justify-start items-center max-h-[240px] overflow-y-auto bg-bgDefcont scrollbar-thin scrollbar-thumb-mainDef3 scrollbar-track-bgDef'>
                      <DynamicInputFields activeTab={activeTab} />
                </div>
                {/* Buttons */}
                <div className='w-full h-auto text-mainTextDef3 flex justify-center items-center gap-4'>
                  <button className='flex flex-row justify-center items-center h-8 w-36 bg-mainDef3 rounded hover:bg-[#353B55] gap-1 transition'>
                    <span className='text-[1vw]'>PRO Report</span>
                    <Download size={16} strokeWidth={2} />
                  </button>
                  <button className='flex flex-row justify-center items-center h-8 w-36 bg-mainDef3 rounded hover:bg-[#353B55] gap-1 transition'>
                    <span className='text-[1vw]'>BRC Report</span>
                    <Download size={16} strokeWidth={2} />
                  </button>
                  <button className='flex flex-row justify-center items-center h-8 w-40 bg-mainDef3 rounded hover:bg-[#353B55] gap-1 transition'>
                    <span className='text-[1vw]'>Manifest Report</span>
                    <Download size={16} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
        </div>
    </Layout>
  )
}

export default proReport