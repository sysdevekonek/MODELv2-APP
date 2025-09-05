import React, { useRef } from "react";
import ComboBox, { ComboBoxRef } from "@/components/comboBox";
import { useRegistrationContext } from "@/hooks/registration/RegistrationContext";
import { useCountryDropdown } from "@/components/dropdownAPI";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { UserData } from "@/components/data/dataTypes";

interface PersonalDataProps {
  goNext: () => void;
  goBack: () => void;
  errors?: Record<string, string>;
  clearError: (field: keyof UserData) => void;
}

const personalData: React.FC<PersonalDataProps> = ({ goNext, goBack, errors, clearError }) => {
    const comboRef = useRef<ComboBoxRef>(null);
    const { countryDropdown } = useCountryDropdown();
    const { userData, updateField } = useRegistrationContext();
   
    return (
        <div>
            <form className="pl-5" onSubmit={(e) => {e.preventDefault(); goNext();}}>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="fullName" className="block text-medium mb-1 w-32">
                        <label>Full Name: <span className="text-red-500">*</span></label>
                        {errors?.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                    </label>
                    <input
                        id="fullName"
                        type="text"
                        maxLength={80}
                        value={userData.name}
                        onChange={(e) => {updateField("name", e.target.value); clearError("name");}}
                        placeholder="Insert Full Name"
                        className={`bg-inputField1 w-96 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs 
                                    ${errors?.name ? "border-red-500 ring-1 ring-red-500" : "border-inputField2"}`}
                    />
                </div>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="address" className="block text-medium mb-1 w-32">
                        <label>Address: <span className="text-red-500">*</span></label>
                        {errors?.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                    </label>
                    <input
                        id="address"
                        type="address"
                        maxLength={255}
                        value={userData.address}
                        onChange={(e) => {updateField("address", e.target.value); clearError("address");}}
                        placeholder="Insert Full Address"
                        className={`bg-inputField1 w-96 text-xs h-20 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs 
                                    ${errors?.address ? "border-red-500 ring-1 ring-red-500" : "border-inputField2"}`}
                    />
                </div>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="country" className="block text-medium mb-1 w-32">
                        <label>Country <span className="text-red-500">*</span></label>
                        {errors?.country && <p className="text-xs text-red-500 mt-1">{errors.country}</p>}
                    </label>
                    <ComboBox
                        ref={comboRef}
                        items={countryDropdown}
                        displayKey="COUNTRY_NAME"
                        valueKey="COUNTRY_CODE"
                        placeholder="Select Country"
                        selectedValue={userData.country}
                        setSelectedValue={(val) => {updateField("country", val); clearError("country"); }}
                        className={`bg-inputField1 w-96 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs
                                    ${errors?.country ? "border-red-500 ring-1 ring-red-500" : "border-inputField2"}`}
                     />
                </div>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="city" className="block text-medium mb-1 w-32">
                        <label>City:</label>
                        {errors?.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                    </label>
                    <input
                        id="city"
                        type="city"
                        maxLength={50}
                        value={userData.city}
                        onChange={(e) => {updateField("city", e.target.value); clearError("city");}}
                        placeholder="Insert City"
                        className={`bg-inputField1 w-96 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs
                                    ${errors?.city ? "border-red-500 ring-1 ring-red-500" : "border-inputField2"}`}
                    />
                </div>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="zipCode" className="block text-medium mb-1 w-32">
                        <label>Zip Code:</label>
                        {errors?.zip && <p className="text-xs text-red-500 mt-1">{errors.zip}</p>}
                    </label>
                    <input
                        id="zipCode"
                        type="zipCode"
                        maxLength={10}
                        value={userData.zip}
                        onChange={(e) => {updateField("zip", e.target.value); clearError("zip");}}
                        placeholder="Insert Zip Code"
                        className={`bg-inputField1 w-96 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs
                                    ${errors?.zip ? "border-red-500 ring-1 ring-red-500" : "border-inputField2"}`}
                    />
                </div>

                <div className="mb-[3px] flex items-center">
                    <label htmlFor="phoneNum" className="block text-medium mb-1 w-32">
                        <label>Phone #:</label>
                        {errors?.phone_no && <p className="text-xs text-red-500 mt-1">{errors.phone_no}</p>}
                    </label>
                    <input
                        id="phoneNum"
                        type="phoneNum"
                        maxLength={32}
                        value={userData.phone_no}
                        onChange={(e) =>{ updateField("phone_no", e.target.value); clearError("phone_no");}}
                        placeholder="Insert Phone #"
                        className={`bg-inputField1 w-96 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs
                                    ${errors?.phone_no ? "border-red-500 ring-1 ring-red-500" : "border-inputField2"}`}
                    />
                </div>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="cellNum" className="block text-medium mb-1 w-32">
                        <label>Cell #:</label>
                        {errors?.cellphone_no && <p className="text-xs text-red-500 mt-1">{errors.cellphone_no}</p>}
                    </label>
                    <input
                        id="cellNum"
                        type="cellNum"
                        maxLength={32}
                        value={userData.cellphone_no}
                        onChange={(e) => {updateField("cellphone_no", e.target.value); clearError("cellphone_no");}}
                        placeholder="Insert Cell #"
                        className={`bg-inputField1 w-96 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs
                                    ${errors?.cellphone_no ? "border-red-500 ring-1 ring-red-500" : "border-inputField2"}`}
                    />
                </div>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="fax" className="block text-medium mb-1 w-32">
                        <label>Fax:</label>
                        {errors?.fax && <p className="text-xs text-red-500 mt-1">{errors.fax}</p>}
                    </label>
                    <input
                        id="fax"
                        type="fax"
                        maxLength={32}
                        value={userData.fax}
                        onChange={(e) => {updateField("fax", e.target.value); clearError("fax");}}
                        placeholder="Insert Fax"
                        className={`bg-inputField1 w-96 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs
                                    ${errors?.fax ? "border-red-500 ring-1 ring-red-500" : "border-inputField2"}`}
                    />
                </div>
                <div className="mb-4 flex items-center">
                    <label htmlFor="email" className="block text-medium mb-1 w-32">
                        <label>Email: <span className="text-red-500">*</span></label>
                        {errors?.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                    </label>
                    <input
                        id="email"
                        type="email"
                        maxLength={50}
                        value={userData.email}
                        onChange={(e) => {updateField("email", e.target.value); clearError("email");}}
                        placeholder="Insert Email"
                        className={`bg-inputField1 w-96 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs
                                    ${errors?.email ? "border-red-500 ring-1 ring-red-500" : "border-inputField2"}`}
                    />
                </div>

                 <div className='flex justify-between'>
                    <button
                        type="button"
                        onClick={goBack}
                        className="flex items-center gap-2 px-5 py-2 rounded-lg bg-button2 text-bodytext2 font-medium hover:bg-gray-300 transition"
                    >
                        <ArrowLeft size={18} />
                        Back
                    </button>
                     <button
                        type="submit"
                        className="flex items-center gap-2 px-5 py-2 rounded-lg bg-button2 text-bodytext2 font-medium hover:bg-gray-300 transition"
                    >
                        Next
                        <ArrowRight size={18} />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default personalData;