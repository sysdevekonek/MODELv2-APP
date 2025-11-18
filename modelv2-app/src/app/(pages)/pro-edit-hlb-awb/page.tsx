import React from 'react';
import PROEditHBLAWBPage from '@/components/features/ProEditHBLAWB';

export default function PROEditHBLAWB() {
  return (
    <div className='bg-bgContainer w-full shadow-lg'>
      <div className='bg-main1 text-titlebodytext1 font-semibold p-4 inline-block rounded-[5px] -translate-y-1/4 -top-6 shadow-lg'>
        <h1>PRO EDIT HBL/AWB</h1>
      </div>
      <div className='p-4'>
        <div className="bg-main1 text-titlebodytext1 font-semibold w-full p-3 pl-6 mb-1">
          <label>Edit HBL/AWB</label>
        </div>
        <PROEditHBLAWBPage/>
      </div>
    </div>
  );
}
