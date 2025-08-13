import React, {useRef, useState} from 'react'
import ComboBox, { ComboBoxRef } from '@/components/comboBox';
import { useDepartmentDropdown, useConsigneeDropdown } from '@/components/dropdownAPI';

const userProperties = () => {
    const comboRef = useRef<ComboBoxRef>(null);
    const {departmentDropdown} = useDepartmentDropdown();
    const {consigneeDropdown, fetchConsignee} = useConsigneeDropdown();
    const [selectedDepartment, setSelectedDepartment] = React.useState<string>("");
    const [selectedConsignee, setSelectedConsignee] = React.useState<string>("");
    const [propertyName, setPropertyName] = useState("");
    const [properValue, setPropertyValue] = useState("");
    
    return (
        <div>

            <form className="pl-5">

                <div className="mb-[3px] flex items-center">
                    <label htmlFor="propertyName" className="block text-medium mb-1 text-mainTextDef1 w-56">
                        <label>Property Name:</label>
                    </label>
                    <select
                        value={propertyName}
                        onChange={(e) => {setPropertyName(e.target.value); setPropertyValue("")}}
                        className="w-96 text-xs h-10 px-4 border border-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-slate-400 text-slate-700 placeholder:font-titleFont placeholder:text-medium">
                            <option value="">Select an option</option>
                            <option value="TIN"> Tax Identification Number (TIN) </option>
                            <option value="DEPARTMENT"> Department </option>
                            <option value="CONSIGNEE"> Consignee </option>
                    </select>
                </div>
                <div className="mb-4 flex items-center">
                    <label htmlFor="propertyValue" className="block text-medium mb-1 text-mainTextDef1 w-56">
                        <label>Property Value:</label>
                    </label>
                    { propertyName === "DEPARTMENT" && (
                        <ComboBox
                        ref={comboRef}
                        items={departmentDropdown}
                        displayKey="DEPT_NAME"
                        valueKey="DEPT_CODE"
                        selectedValue={selectedDepartment}
                        setSelectedValue={setSelectedDepartment}
                        className="w-96 text-xs h-10 px-4 border border-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-slate-400 text-slate-700 placeholder:font-titleFont placeholder:text-xs"
                     />
                    )}
                    {propertyName === "CONSIGNEE" && (
                    <ComboBox
                        ref={comboRef}
                        items={consigneeDropdown}
                        displayKey="CNEE_NAM"
                        valueKey="CNEE_COD"
                        selectedValue={selectedConsignee}
                        setSelectedValue={setSelectedConsignee}
                        onInputChange={(val) => fetchConsignee(val)} // Trigger API only on input
                        placeholder="Type to search consignee..."
                        className="w-96 text-xs h-10 px-4 border border-slate-400 rounded-lg 
                                    focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-slate-400 
                                    text-slate-700 placeholder:font-titleFont placeholder:text-xs"
                        />

                    )}
                </div>
            </form>

        </div>
    )
}

export default userProperties
