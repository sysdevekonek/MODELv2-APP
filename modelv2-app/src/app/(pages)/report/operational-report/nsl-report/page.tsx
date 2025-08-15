import React from 'react'

const page = () => {
  return (
    <>
        <div className='mt-10 w-full h-[100vh] flex flex-col items-center justify-center bg-bgContainer shadow rounded-md'>
            <div className='w-full'>
              <div className='mt-[-1.5em] bg-main1 text-titlebodytext1 font-bold w-[15%] h-[3em] flex justify-center items-center rounded'>
                  <h1>NSL REPORT</h1>
              </div>
            </div>
            <div className='mt-5 border border-blue-700 w-[95%] h-[30em] flex flex-col'>
                <div className='pl-5 bg-main1 text-titlebodytext1 font-bold h-full flex items-center'>
                    <h3>NSL REPORT EXTRACTION</h3>
                </div>
                {/* start of form */}
                <div className='border border-red-700 flex flex-col justify-center items-center w-full h-[90%]'>
                  <div className='h-full w-[70%] flex flex-col justify-center border border-purple-700'>
                    <form>
                        <div className='gap-1 p-4 flex flex-col w-full'>
                          <div className='w-full flex flex-row justify-between items-center'>
                            <label className='text-sm font-semibold w-[20%]'>Template:</label>
                            <select className='border border-gray-500 rounded pl-3 p-1 w-[70%] '>
                              <option value="nsl">NSL Report</option>
                              <option value="nsl-summary">NSL Summary Report</option>
                              <option value="pro-summary">Pro Report</option>
                            </select>
                          </div>
                          <br />
                          <div className='w-full flex flex-row justify-between items-center gap-4 '>
                            <label className='text-sm font-semibold w-[20%]'>Date from:</label>
                            <div className='w-[70%] flex flex-row justify-between items-center'>
                              <input type="date" className='border border-gray-500 rounded pl-3 p-1 w-[42%]' />
                              <label>To: </label>
                              <input type="date" className='border border-gray-500 rounded pl-3 p-1 w-[42%]' />
                            </div>
                          </div>
                          <div>
                            <div className='flex flex-col gap-1'>
                              <div className='w-full flex justify-between items-center'>
                                <label className='text-sm font-semibold w-[20%]'>Consignee:</label>
                                <input className='border border-gray-500 rounded pl-3 p-1 w-[70%]'/>
                              </div>
                              <div className='w-full flex justify-between items-center'>
                                <label className='text-sm font-semibold w-[20%]'>Consolidator:</label>
                                <input className='border border-gray-500 rounded pl-3 p-1 w-[70%]'/>
                              </div>
                              <div className='w-full flex justify-between items-center'>
                                <label className='text-sm font-semibold w-[20%]'>Warehouse:</label>
                                <input className='border border-gray-500 rounded pl-3 p-1 w-[70%]'/>
                              </div>
                              <div className='w-full flex justify-between items-center'>
                                <label className='text-sm font-semibold w-[20%]'>Department:</label>
                                <input className='border border-gray-500 rounded pl-3 p-1 w-[70%]'/>
                              </div>
                              <br />
                              <div className='w-full flex items-center gap-20'>
                                <label className='text-sm font-semibold w-[20%]'>Detailed Invoice:</label>
                                <input type="checkbox" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                  </div>
                </div>
            </div>
            {/* end of form */}
            <div className='mt-5 border border-green-700 w-[95%] h-[30em] flex flex-col mb-5'>
                <div className='pl-5 bg-main1 text-titlebodytext1 font-bold h-[15%] flex items-center'>
                    <h3>REPORT TABLE</h3>
                </div>
                {/* start of form */}
                <div className='border border-red-700 flex flex-col justify-center items-center w-full h-[90%]'>
                
                </div>
            </div>
        </div>
    </>
  )
}

export default page