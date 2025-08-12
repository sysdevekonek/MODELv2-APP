import React from 'react'

const userProperties = () => {
    return (
        <div>

            <form className="pl-5">

                <div className="mb-[3px] flex items-center">
                    <label htmlFor="propertyName" className="block text-medium mb-1 text-mainTextDef1 w-56">
                        <label>Property Name:</label>
                    </label>
                    <input
                        id="propertyName"
                        type="propertyName"
                        placeholder="Set Property Name"
                        className="w-96 text-xs h-10 px-4 border border-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-slate-400 text-slate-700 placeholder:font-titleFont placeholder:text-medium"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <label htmlFor="propertyValue" className="block text-medium mb-1 text-mainTextDef1 w-56">
                        <label>Property Value:</label>
                    </label>
                    <input
                        id="propertyValue"
                        type="propertyValue"
                        placeholder="Set Property Value"
                        className="w-96 text-xs h-10 px-4 border border-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-slate-400 text-slate-700 placeholder:font-titleFont placeholder:text-medium"
                    />
                </div>
            </form>

        </div>
    )
}

export default userProperties
