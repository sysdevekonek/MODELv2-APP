import React, { useRef, useState } from "react";
import ComboBox, { ComboBoxRef } from "@/components/comboBox";
import { useClientRoleDropdown } from "@/components/dropdownAPI";

const userInformation = () => {
    const comboRef = useRef<ComboBoxRef>(null);
    const { clientDropdown, roleDropdown } = useClientRoleDropdown();
    const [ selectedRole, setSelectedRole ] = React.useState<string>("");
    const [ selectedClient, setSelectedClient ] = React.useState<string>("");

    return (

        <div>
            <form className="pl-5">
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="username" className="block text-medium mb-1 w-56">
                        <label>Username:</label>
                    </label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Insert Username"
                        className="bg-inputField1 w-96 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs"
                    />
                </div>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="accNumRef" className="block text-medium mb-1 w-56">
                        <label>Account Number Reference:</label>
                    </label>
                    <input
                        id="accNumRef"
                        type="accNumRef"
                        placeholder="Insert Account Number Reference"
                        className="bg-inputField1 w-96 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs"
                    />
                </div>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="accHolder" className="block text-medium mb-1 w-56">
                        <label>Account Holder</label>
                    </label>
                    <input
                        id="accHolder"
                        type="accHolder"
                        placeholder="Insert Account Holder"
                        className="bg-inputField1 w-96 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs"
                    />
                </div>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="company" className="block text-medium mb-1 w-56">
                        <label>Company:</label>
                    </label>
                     <ComboBox
                        ref={comboRef}
                        items={clientDropdown}
                        displayKey="CLIENT_NAME"
                        valueKey="CLIENT_CODE"
                        placeholder="Select Company"
                        selectedValue={selectedClient}
                        setSelectedValue={setSelectedClient}
                        className="bg-inputField1 w-96 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs"
                     />
                </div>
                <div className="mb-4 flex items-center">
                    <label htmlFor="zipCode" className="block text-medium mb-1 w-56">
                        <label>Business Unit/s:</label>
                    </label>
                     <ComboBox
                        ref={comboRef}
                        items={roleDropdown}
                        displayKey="PROFILE_NAME"
                        valueKey="PROFILE_CODE"
                        placeholder="Select Business Unit/s"
                        selectedValue={selectedRole}
                        setSelectedValue={setSelectedRole}
                        className="bg-inputField1 w-96 text-xs h-10 px-4 border border-inputField2 rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 
                                    focus:border-transparent placeholder:subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs"
                     />
                </div>
                <div className="mb-4 flex items-center">
                    <label htmlFor="enableClientAccess" className="block text-medium mb-1 w-56">
                        Enable Client Access
                    </label>
                    <input
                        id="enableClientAccess"
                        type="checkbox"
                        className="ml-2 h-5 w-5 bg-inputField1 border-inputField2"
                    />
                </div>

            </form>
        </div>
    )
}

export default userInformation;
