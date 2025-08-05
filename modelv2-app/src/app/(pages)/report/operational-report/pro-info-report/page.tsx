'use client'
import React, { useState } from 'react'
import ProReportField from '@/components/features/reports/ProReportField'

const page = () => {
  return (
    <div className='w-full h-[70vh] flex flex-col justify-center items-center p-8 mt-5 bg-bgContainer shadow-2xl rounded-[10px] overflow-auto'>
        <div className='w-96 h-12 flex items-center justify-center absolute top-5 left-[310px] rounded text-[1.5vw] text-titlebodytext1 bg-main1 font-semibold shadow-md'>
          <h3>PRO INFORMATION REPORT</h3>
        </div>
        <ProReportField />

    </div>
  );
}

export default page;
