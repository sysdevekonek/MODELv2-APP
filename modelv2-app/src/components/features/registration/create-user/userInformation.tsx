import React from 'react'

const userInformation = () => {
    return (

        <div>
            <form className="pl-5">
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="username" className="block text-medium mb-1 text-mainTextDef1 w-56">
                        <label>Username:</label>
                    </label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Username"
                        className="w-96 text-xs h-10 px-4 border border-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-slate-400 text-slate-700 placeholder:font-titleFont placeholder:text-xs"
                    />
                </div>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="accNumRef" className="block text-medium mb-1 text-mainTextDef1 w-56">
                        <label>Account Number Reference:</label>
                    </label>
                    <input
                        id="accNumRef"
                        type="accNumRef"
                        placeholder="Account Number Reference"
                        className="w-96 text-xs h-10 px-4 border border-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-slate-400 text-slate-700 placeholder:font-titleFont placeholder:text-xs"
                    />
                </div>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="accHolder" className="block text-medium mb-1 text-mainTextDef1 w-56">
                        <label>Account Holder</label>
                    </label>
                    <input
                        id="accHolder"
                        type="accHolder"
                        placeholder="Account Holder"
                        className="w-96 text-xs h-10 px-4 border border-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-slate-400 text-slate-700 placeholder:font-titleFont placeholder:text-xs"
                    />
                </div>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="company" className="block text-medium mb-1 text-mainTextDef1 w-56">
                        <label>Company:</label>
                    </label>
                    <input
                        id="company"
                        type="company"
                        placeholder="Company"
                        className="w-96 text-xs h-10 px-4 border border-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-slate-400 text-slate-700 placeholder:font-titleFont placeholder:text-xs"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <label htmlFor="zipCode" className="block text-medium mb-1 text-mainTextDef1 w-56">
                        <label>Business Unit/s:</label>
                    </label>
                    <input
                        id="businessUnit"
                        type="businessUnit"
                        placeholder="Business Unit/s"
                        className="w-96 text-xs h-10 px-4 border border-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-slate-400 text-slate-700 placeholder:font-titleFont placeholder:text-xs"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <label htmlFor="enableClientAccess" className="block text-medium mb-1 text-mainTextDef1 w-56">
                        Enable Client Access
                    </label>
                    <input
                        id="enableClientAccess"
                        type="checkbox"
                        className="ml-2 h-5 w-5 accent-mainDef3"
                    />
                </div>

            </form>
        </div>
    )
}

export default userInformation;
