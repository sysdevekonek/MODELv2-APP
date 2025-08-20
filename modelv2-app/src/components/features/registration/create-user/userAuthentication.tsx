import React from 'react'

const userAuthentication = () => {
    return (
        <div>
   
            <form className="pl-5">

                <div className="mb-[3px] flex items-center">
                    <label htmlFor="password" className="block text-medium mb-1 w-72">
                        <label>Password:</label>
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Set Password"
                        className="bg-inputField1 w-96 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-subtext text-slate-700 placeholder:font-titleFont placeholder:text-xs"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <label htmlFor="confirmPassword" className="block text-medium mb-1 w-72">
                        <label>Confirm Password:</label>
                    </label>
                    <input
                        id="comfirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        className="bg-inputField1 w-96 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-subtext text-slate-700 placeholder:font-titleFont placeholder:text-xs"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <label htmlFor="asc" className="block textmedium mb-1 w-72">
                        Authentic Submission Capable
                    </label>
                    <input
                        id="asc"
                        type="checkbox"
                        className="ml-2 h-5 w-5 bg-inputField1 border-inputField2"
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <label htmlFor="asc2" className="block text-medium mb-1 w-72">
                        Authentic Submission Capable 2
                    </label>
                    <input
                        id="asc2"
                        type="checkbox"
                        className="ml-2 h-5 w-5 bg-inputField1 border-inputField2"
                    />
                </div>
            </form>

        </div>
    )
}

export default userAuthentication;
