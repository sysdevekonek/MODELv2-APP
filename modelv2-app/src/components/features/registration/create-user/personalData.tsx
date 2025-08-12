import React from 'react'

const personalData = () => {
    return (
        <div>
          
            <form className="pl-5">
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="fullName" className="block text-medium mb-1 text-mainTextDef1 w-32">
                        <label>Full Name:</label>
                    </label>
                    <input
                        id="fullName"
                        type="text"
                        placeholder="Full Name"
                        className="w-96 text-xs h-10 px-4 border border-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-slate-400 text-slate-700 placeholder:font-titleFont placeholder:text-xs
                                  "
                    />
                </div>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="address" className="block text-medium mb-1 text-mainTextDef1 w-32">
                        <label>Address:</label>
                    </label>
                    <input
                        id="address"
                        type="address"
                        placeholder="Address"
                        className="w-96 text-xs h-20 px-4 border border-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-slate-400 text-slate-700 placeholder:font-titleFont placeholder:text-xs"
                    />
                </div>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="country" className="block text-medium mb-1 text-mainTextDef1 w-32">
                        <label>Country</label>
                    </label>
                    <input
                        id="country"
                        type="country"
                        placeholder="Account Holder"
                        className="w-96 text-xs h-10 px-4 border border-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-slate-400 text-slate-700 placeholder:font-titleFont placeholder:text-xs"
                    />
                </div>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="city" className="block text-medium mb-1 text-mainTextDef1 w-32">
                        <label>City:</label>
                    </label>
                    <input
                        id="city"
                        type="city"
                        placeholder="City"
                        className="w-96 text-xs h-10 px-4 border border-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-slate-400 text-slate-700 placeholder:font-titleFont placeholder:text-xs"
                    />
                </div>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="zipCode" className="block text-medium mb-1 text-mainTextDef1 w-32">
                        <label>Zip Code:</label>
                    </label>
                    <input
                        id="zipCode"
                        type="zipCode"
                        placeholder="Zip Code"
                        className="w-96 text-xs h-10 px-4 border border-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-slate-400 text-slate-700 placeholder:font-titleFont placeholder:text-xs"
                    />
                </div>

                <div className="mb-[3px] flex items-center">
                    <label htmlFor="phoneNum" className="block text-medium mb-1 text-mainTextDef1 w-32">
                        <label>Phone #:</label>
                    </label>
                    <input
                        id="phoneNum"
                        type="phoneNum"
                        placeholder="Phone #"
                        className="w-96 text-xs h-10 px-4 border border-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-slate-400 text-slate-700 placeholder:font-titleFont placeholder:text-xs"
                    />
                </div>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="cellNum" className="block text-medium mb-1 text-mainTextDef1 w-32">
                        <label>Cell #:</label>
                    </label>
                    <input
                        id="cellNum"
                        type="cellNum"
                        placeholder="Cell #"
                        className="w-96 text-xs h-10 px-4 border border-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-slate-400 text-slate-700 placeholder:font-titleFont placeholder:text-xs"
                    />
                </div>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="fax" className="block text-medium mb-1 text-mainTextDef1 w-32">
                        <label>Fax:</label>
                    </label>
                    <input
                        id="fax"
                        type="fax"
                        placeholder="Fax"
                        className="w-96 text-xs h-10 px-4 border border-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-slate-400 text-slate-700 placeholder:font-titleFont placeholder:text-xs"
                    />
                </div>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="email" className="block text-medium mb-1 text-mainTextDef1 w-32">
                        <label>Email:</label>
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="w-96 text-xs h-10 px-4 border border-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-slate-400 text-slate-700 placeholder:font-titleFont placeholder:text-xs"
                    />
                </div>


            </form>
        </div>
    )
}

export default personalData;