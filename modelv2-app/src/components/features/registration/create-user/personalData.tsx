import React, { useRef, useState } from "react";
import ComboBox, { ComboBoxRef } from "@/components/comboBox";
import { useCountryDropdown } from "@/components/dropdownAPI";

const personalData = () => {
    const comboRef = useRef<ComboBoxRef>(null);
    const { countryDropdown } = useCountryDropdown();
    const [ selectedCountry, setSelectedCountry ] = React.useState<string>("");


    
    return (
        <div>
          
            <form className="pl-5">
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="fullName" className="block text-medium mb-1 w-32">
                        <label>Full Name:</label>
                    </label>
                    <input
                        id="fullName"
                        type="text"
                        placeholder="Insert Full Name"
                        className="bg-inputField1 w-96 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs"
                    />
                </div>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="address" className="block text-medium mb-1 w-32">
                        <label>Address:</label>
                    </label>
                    <input
                        id="address"
                        type="address"
                        placeholder="Insert Full Address"
                        className="bg-inputField1 w-96 text-xs h-20 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs"
                    />
                </div>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="country" className="block text-medium mb-1 w-32">
                        <label>County</label>
                    </label>
                    <ComboBox
                        ref={comboRef}
                        items={countryDropdown}
                        displayKey="COUNTRY_NAME"
                        valueKey="COUNTRY_CODE"
                        placeholder="Select Country"
                        selectedValue={selectedCountry}
                        setSelectedValue={setSelectedCountry}
                        className="bg-inputField1 w-96 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs"
                     />
                </div>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="city" className="block text-medium mb-1 w-32">
                        <label>City:</label>
                    </label>
                    <input
                        id="city"
                        type="city"
                        placeholder="Insert City"
                        className="bg-inputField1 w-96 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs"
                    />
                </div>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="zipCode" className="block text-medium mb-1 w-32">
                        <label>Zip Code:</label>
                    </label>
                    <input
                        id="zipCode"
                        type="zipCode"
                        placeholder="Insert Zip Code"
                        className="bg-inputField1 w-96 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs"
                    />
                </div>

                <div className="mb-[3px] flex items-center">
                    <label htmlFor="phoneNum" className="block text-medium mb-1 w-32">
                        <label>Phone #:</label>
                    </label>
                    <input
                        id="phoneNum"
                        type="phoneNum"
                        placeholder="Insert Phone #"
                        className="bg-inputField1 w-96 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs"
                    />
                </div>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="cellNum" className="block text-medium mb-1 w-32">
                        <label>Cell #:</label>
                    </label>
                    <input
                        id="cellNum"
                        type="cellNum"
                        placeholder="Insert Cell #"
                        className="bg-inputField1 w-96 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs"
                    />
                </div>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="fax" className="block text-medium mb-1 w-32">
                        <label>Fax:</label>
                    </label>
                    <input
                        id="fax"
                        type="fax"
                        placeholder="Insert Fax"
                        className="bg-inputField1 w-96 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs"
                    />
                </div>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="email" className="block text-medium mb-1 w-32">
                        <label>Email:</label>
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Insert Email"
                        className="bg-inputField1 w-96 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs"
                    />
                </div>


            </form>
        </div>
    )
}

export default personalData;