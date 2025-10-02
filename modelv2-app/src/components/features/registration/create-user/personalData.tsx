import React, { useRef } from "react";
import ComboBox, { ComboBoxRef } from "@/components/comboBox";
import { useRegistrationContext } from "@/hooks/registration/RegistrationContext";
import { useCountryDropdown } from "@/components/dropdownAPI";
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { UserData } from "@/components/data/dataTypes";
import Button from "@/components/ui/Buttons";

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
        <div className="flex justify-center">
            <form className="px-4 md:px-6 w-full max-w-3xl" onSubmit={(e) => {e.preventDefault(); goNext();}}>
                 <div className="mb-1 flex flex-col justify-center md:flex-row md:items-center gap-2">
                    <label htmlFor="fullName" className="block text-sm md:w-40">
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
                        className={`bg-inputField1 w-full md:w-96 text-xs h-10 px-4 border rounded-lg focus:outline-none focus:ring-2 
                            ${errors?.name ? "border-red-500 ring-1 ring-red-500" : "border-inputField2 focus:ring-mainDef3"}`}
                    />
                </div>
                 <div className="mb-1 flex flex-col justify-center md:flex-row md:items-center gap-2">
                    <label htmlFor="address"  className="block text-sm md:w-40">
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
                        className={`bg-inputField1 w-full md:w-96 text-xs h-10 px-4 border rounded-lg focus:outline-none focus:ring-2 
                            ${errors?.address ? "border-red-500 ring-1 ring-red-500" : "border-inputField2 focus:ring-mainDef3"}`}
                    />
                </div>
                 <div className="mb-1 flex flex-col justify-center md:flex-row md:items-center gap-2">
                    <label htmlFor="country"  className="block text-sm md:w-40">
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
                        className={`bg-inputField1 w-full md:w-96 text-xs h-10 px-4 border rounded-lg focus:outline-none focus:ring-2 
                            ${errors?.country ? "border-red-500 ring-1 ring-red-500" : "border-inputField2 focus:ring-mainDef3"}`}
                    />
                </div>
                 <div className="mb-1 flex flex-col justify-center md:flex-row md:items-center gap-2">
                    <label htmlFor="city"  className="block text-sm md:w-40">
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
                        className={`bg-inputField1 w-full md:w-96 text-xs h-10 px-4 border rounded-lg focus:outline-none focus:ring-2 
                            ${errors?.city ? "border-red-500 ring-1 ring-red-500" : "border-inputField2 focus:ring-mainDef3"}`}
                    />
                </div>
                 <div className="mb-1 flex flex-col justify-center md:flex-row md:items-center gap-2">
                    <label htmlFor="zipCode"  className="block text-sm md:w-40">
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
                        className={`bg-inputField1 w-full md:w-96 text-xs h-10 px-4 border rounded-lg focus:outline-none focus:ring-2 
                            ${errors?.zip ? "border-red-500 ring-1 ring-red-500" : "border-inputField2 focus:ring-mainDef3"}`}
                    />
                </div>

                 <div className="mb-1 flex flex-col justify-center md:flex-row md:items-center gap-2">
                    <label htmlFor="phoneNum"  className="block text-sm md:w-40">
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
                        className={`bg-inputField1 w-full md:w-96 text-xs h-10 px-4 border rounded-lg focus:outline-none focus:ring-2 
                            ${errors?.phone_no ? "border-red-500 ring-1 ring-red-500" : "border-inputField2 focus:ring-mainDef3"}`}
                    />
                </div>
                 <div className="mb-1 flex flex-col justify-center md:flex-row md:items-center gap-2">
                    <label htmlFor="cellNum"  className="block text-sm md:w-40">
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
                        className={`bg-inputField1 w-full md:w-96 text-xs h-10 px-4 border rounded-lg focus:outline-none focus:ring-2 
                            ${errors?.cellphone_no ? "border-red-500 ring-1 ring-red-500" : "border-inputField2 focus:ring-mainDef3"}`}
                    />
                </div>
                 <div className="mb-1 flex flex-col justify-center md:flex-row md:items-center gap-2">
                    <label htmlFor="fax"  className="block text-sm md:w-40">
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
                        className={`bg-inputField1 w-full md:w-96 text-xs h-10 px-4 border rounded-lg focus:outline-none focus:ring-2 
                            ${errors?.fax ? "border-red-500 ring-1 ring-red-500" : "border-inputField2 focus:ring-mainDef3"}`}
                    />
                </div>
                 <div className="mb-6 flex flex-col justify-center md:flex-row md:items-center gap-2">
                    <label htmlFor="email"  className="block text-sm md:w-40">
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
                        className={`bg-inputField1 w-full md:w-96 text-xs h-10 px-4 border rounded-lg focus:outline-none focus:ring-2 
                            ${errors?.email ? "border-red-500 ring-1 ring-red-500" : "border-inputField2 focus:ring-mainDef3"}`}
                    />
                </div>

                 <div className='py-6 flex flex-col sm:flex-row justify-between gap-4'>
                    <Button type="button" onClick={goBack} variant="secondary" className="w-full sm:w-auto justify-center">
                        <ArrowLeft size={18} /> Back
                    </Button>
                     <Button type="submit" variant="secondary" className="w-full sm:w-auto justify-center">
                        Next <ArrowRight size={18} />
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default personalData;