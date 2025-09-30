"use client"

function DashboardPage() {

  return (
    <div className="bg-bgContainer w-full">
      <div className="bg-main1 text-titlebodytext1 font-semibold p-4 inline-block rounded-[5px] mb-4 -translate-y-1/4 -top-6 shadow-lg">
        <h1>DASHBOARD</h1>
      </div>
      <h5 className='text-bodytext2 text-sm p-5'> Hello this is a sample text</h5>
      

       <div className="flex gap-[.25rem] justify-center align-center p-5">
                            <button
                                type="submit"
                                className="px-6 h-8 bg-button1 hover:bg-buttonHover hover:text-white text-titlebodytext1 font-semibold text-sm rounded-[5px] transition-colors duration-200 
                                focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 font-titleFont"
                            >
                                LOGIN
                            </button>
                            <button
                                type="button"
                                className="px-6 h-8 bg-button2 hover:bg-buttonHover  hover:text-white text-bodytext2 font-semibold text-sm rounded-[5px] transition-colors duration-200 
                                focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 font-titleFont"
                            >
                                CLEAR
                            </button>
                             <button
                                type="button"
                                className="px-6 h-8 bg-deleteButton hover:bg-deleteButtonHover hover:text-white text-white font-semibold text-sm rounded-[5px] transition-colors duration-200 
                                focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 font-titleFont"
                            >
                                DELETE
                            </button>
                        </div>
    </div>
   
  );
}

export default DashboardPage;
