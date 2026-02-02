"use client"
import Button from "@/components/ui/Buttons";

function DashboardPage() {

  return (
    <div className="bg-bgContainer w-full">
      <div className="bg-main1 text-titlebodytext1 font-semibold p-4 inline-block rounded-[5px] mb-4 -translate-y-1/4 -top-6 shadow-lg">
        <h1>DASHBOARD</h1>
      </div>
      <h5 className='text-bodytext2 text-sm p-5'> Hello this is a sample text</h5>
      

       <div className="flex gap-[.25rem] justify-center align-center p-5">
                            <Button
                                type="submit"
                                variant="primary"
                            >
                                LOGIN
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                            >
                                CLEAR
                            </Button>
                             <Button
                                type="button"
                                variant="delete"
                            >
                                DELETE
                            </Button>
                        </div>
    </div>
   
  );
}

export default DashboardPage;
