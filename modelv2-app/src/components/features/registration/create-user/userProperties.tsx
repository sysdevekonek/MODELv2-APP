import React, {useRef, useState} from 'react'
import ComboBox, { ComboBoxRef } from '@/components/comboBox';
import { useDepartmentDropdown, useConsigneeDropdown } from '@/components/dropdownAPI';

const userProperties = () => {
    const comboRef = useRef<ComboBoxRef>(null);
    const {departmentDropdown} = useDepartmentDropdown();
    const {consigneeDropdown, fetchConsignee, fetchNextPage} = useConsigneeDropdown();
    const [selectedDepartment, setSelectedDepartment] = React.useState<string>("");
    const [selectedConsignee, setSelectedConsignee] = React.useState<string>("");
    const [propertyName, setPropertyName] = useState("");
    const [properValue, setPropertyValue] = useState("");

    return (
        <div>

            <form className="pl-5">

                <div className="mb-[3px] flex items-center">
                    <label htmlFor="propertyName" className="block text-medium mb-1 w-56">
                        <label>Property Name:</label>
                    </label>
                    <select
                        value={propertyName}
                        onChange={(e) => {setPropertyName(e.target.value); setPropertyValue("")}}
                        className="bg-inputField1 w-96 text-xs font-titleFont h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent text-subtext">
                            <option value="" className="text-bodytext2">Select an option</option>
                            <option value="TIN" className="text-bodytext2"> Tax Identification Number (TIN) </option>
                            <option value="DEPARTMENT" className="text-bodytext2"> Department </option>
                            <option value="CONSIGNEE" className="text-bodytext2"> Consignee </option>
                    </select>
                </div>
                <div className="mb-4 flex items-center">
                    <label htmlFor="propertyValue" className="block text-medium mb-1 w-56">
                        <label>Property Value:</label>
                    </label>
                    { propertyName === "DEPARTMENT" && (
                        <ComboBox
                        ref={comboRef}
                        items={departmentDropdown}
                        displayKey="DEPT_NAME"
                        valueKey="DEPT_CODE"
                        placeholder='Select Department...'
                        selectedValue={selectedDepartment}
                        setSelectedValue={setSelectedDepartment}
                        className="bg-inputField1 w-96 text-xs text-bodytext2 h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-subtext placeholder:font-titleFont placeholder:text-xs"
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
                        onInputChange={(val) => fetchConsignee(val, true)}
                        onScrollEnd={fetchNextPage}                     
                        placeholder="Type to search consignee..."
                        className="bg-inputField1 w-96 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:text-subtext placeholder:font-titleFont placeholder:text-xs"
                        />
                    )}
                </div>
            </form>

        </div>
    )
}

export default userProperties
