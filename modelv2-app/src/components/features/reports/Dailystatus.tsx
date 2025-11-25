'use client';
import { Download } from 'lucide-react';
import Buttons from '@/components/ui/Buttons';

const Dailystatus = () => {
    return (
        <>
            <div className="w-full h-auto md:h-[75vh] sm:h-[60vh] xs:h-[70vh] min-h-[60vh]
                            mt-6 flex flex-col items-center justify-start bg-bgContainer shadow rounded-md">
               <div className="w-full">
                    <div className='w-2/6 h-[3em] min-w-60 
                                    mt-[-1.5em] bg-main1 text-titlebodytext1 font-bold flex justify-center items-center rounded'>
                        <h1 className='text-xs md:text-base lg:text-lg'>DAILY STATUS REPORT</h1>
                    </div>
               </div>
                <div className="mt-5 w-[95%] h-auto flex flex-col">
                    <div className='pl-5 py-2 bg-main1 w-full text-titlebodytext1 font-bold flex items-center'>
                        <h3>DAILY STATUS FORM</h3>
                    </div>
                    <div className="p-8">
                        <form className="space-y-4">
                            <div className=" flex justify-center items-end gap-6">
                                <div className="w-full lg:w-[18%]">
                                    <label className="text-sm font-semibold block mb-2">Date From:</label>
                                    <input type="date" className="px-3 py-2 bg-inputField1 text-xs rounded w-full border border-inputField2 focus:outline-none focus:ring-2 focus:ring-slate-400 text-bodytext2"/>
                                </div>
                                <div className="w-full lg:w-[18%]">
                                    <label className="text-sm font-semibold block mb-2">To:</label>
                                    <input type="date" className="px-3 py-2 bg-inputField1 text-xs rounded w-full border border-inputField2 focus:outline-none focus:ring-2 focus:ring-slate-400 text-bodytext2"/>
                                </div>
                            </div>
                            <div className="w-full lg:w-[38%] justify-self-center">
                                <label className="text-sm font-semibold block mb-2">Consginee: </label>
                                <input type="text" className="px-3 py-2 bg-inputField1 text-xs rounded w-full border border-inputField2 focus:outline-none focus:ring-2 focus:ring-slate-400 text-bodytext2"
                                placeholder="Select Consignee"/>
                            </div>
                            <div className="w-full lg:w-[38%] justify-self-center">
                                <label className="text-sm font-semibold block mb-2">Port of Destination: </label>
                                <input type="text" className="px-3 py-2 bg-inputField1 text-xs rounded p-1 w-full border border-inputField2 focus:outline-none focus:ring-2 focus:ring-slate-400 text-bodytext2"
                                placeholder="Select Port"/>
                            </div>
                            <div className="w-full lg:w-[38%] justify-self-center">
                                <label className="text-sm font-semibold block mb-2">Department: </label>
                                <input type="text" className="px-3 py-2 bg-inputField1 text-xs rounded p-1 w-full border border-inputField2 focus:outline-none focus:ring-2 focus:ring-slate-400 text-bodytext2"
                                placeholder="Select Department"/>
                            </div>
                            <div className="flex justify-center">
                                <Buttons className=""
                                    variant="primary">
                                    <Download size={16} strokeWidth={2} />
                                    <span>Generate Report</span>
                                </Buttons>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Dailystatus;