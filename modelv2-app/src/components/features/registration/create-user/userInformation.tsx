import React, { useRef, useCallback } from "react";
import ComboBox, { ComboBoxRef } from "@/components/comboBox";
import { useClientRoleDropdown } from "@/components/dropdownAPI";
import { useRegistrationContext } from "@/hooks/registration/RegistrationContext";
import { UserData } from "@/components/data/dataTypes";
import { ArrowRight } from "lucide-react";

function useDebounce<F extends (...args: any[]) => void>(func: F, delay: number) {
  const timer = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Parameters<F>) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        func(...args);
      }, delay);
    },
    [func, delay]
  );
}

interface UserInformationProps {
  goNext: () => void;
  errors: Record<string, string>; 
  clearError: (field: keyof UserData) => void;
}

const UserInformation: React.FC<UserInformationProps> = ({ goNext, errors, clearError }) => {
  const companyComboRef = useRef<ComboBoxRef>(null);
  const roleComboRef = useRef<ComboBoxRef>(null);
  const { clientDropdown, profileDropdown } = useClientRoleDropdown();

  const { userData, updateField, validateLive } = useRegistrationContext();

  const debouncedValidate = useDebounce(
    (field: keyof UserData, value: string) => {
      validateLive(field, value);
    },
    400
  );

  const handleUsernameField = (field: keyof UserData, value: string) => {
    updateField(field, value);
    debouncedValidate(field, value);
  };

  const handleRoleSelect = (val: string) => {
    if (!val) return;
    if (userData.profile.includes(val)) return;
    if (userData.profile.length >= 5) return;
    updateField("profile", [...userData.profile, val]);
    clearError("profile");
    roleComboRef.current?.clear();
  };

  return (
    <div>
      <form
        className="pl-5"
        onSubmit={(e) => {
          e.preventDefault();
          goNext();
        }}
      >
          <div className="mb-[3px] relative flex items-center">
          <label htmlFor="username" className="block text-medium mb-1 w-56">
            Username: <span className="text-red-500">*</span>
            {errors?.username && (
              <p className="text-xs text-red-500 mt-1">{errors.username}</p>
            )}
          </label>
          <div className="flex flex-col">
            <input
              id="username"
              type="text"
              maxLength={32}
              placeholder="Insert Username"
              value={userData.username}
              onChange={(e) => handleUsernameField("username", e.target.value)}
              className={`bg-inputField1 w-96 text-xs h-10 px-4 border rounded-lg focus:outline-none focus:ring-2 
                ${errors?.username ? "border-red-500 ring-1 ring-red-500" : "border-inputField2 focus:ring-mainDef3"}`}
            />
          </div>
        </div>
                <div className="mb-[3px] flex items-center">
                    <label htmlFor="accNumRef" className="block text-medium mb-1 w-56">
                        Account Number Reference: <span className="text-red-500">*</span>
                        {errors?.account_reference && (<p className="text-xs text-red-500 mt-1">{errors.account_reference}</p>)}
                    </label>
                    <input
                        id="accNumRef"
                        type="text"
                        maxLength={17}
                        placeholder="Insert Account Number Reference"
                        value={userData.account_reference}
                        onChange={(e) => { updateField("account_reference", e.target.value); clearError("account_reference"); }}
                        className={`bg-inputField1 w-96 text-xs h-10 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 focus:border-transparent placeholder:subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs ${
                            errors?.account_reference
                                ? "border-red-500 ring-1 ring-red-500" : "border-inputField2"
                        }`}
                    />
                </div>

                <div className="mb-[3px] flex items-center">
                    <label htmlFor="accHolder" className="block text-medium mb-1 w-56">
                        Account Holder
                        {errors?.account_holder && <p className="text-xs text-red-500 mt-1">{errors.account_holder}</p>}
                    </label>
                    <input
                        id="accHolder"
                        type="text"
                        maxLength={15}
                        placeholder="Insert Account Holder"
                        value={userData.account_holder ?? ""}
                        onChange={(e) => { updateField("account_holder", e.target.value); clearError("account_holder"); }}
                        className={`bg-inputField1 w-96 text-xs h-10 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 focus:border-transparent placeholder:subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs ${
                            errors?.account_holder 
                            ? "border-red-500 ring-1 ring-red-500" : "border-inputField2"
                        }`} />
                </div>

                <div className="mb-[3px] flex items-center">
                    <label htmlFor="company" className="block text-medium mb-1 w-56">
                        Company: <span className="text-red-500">*</span>
                        {errors?.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
                    </label>
                    <ComboBox
                        ref={companyComboRef}
                        items={clientDropdown}
                        displayKey="CLIENT_NAME"
                        valueKey="CLIENT_CODE"
                        placeholder="Select Company"
                        selectedValue={userData.company}
                        setSelectedValue={(val) => { updateField("company", val); clearError("company"); }}
                        className={`bg-inputField1 w-96 text-xs h-10 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 focus:border-transparent placeholder:subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs ${
                            errors?.company 
                            ? "border-red-500 ring-1 ring-red-500" : "border-inputField2"
                        }`}
                    />
                </div>

                <div className="mb-4 flex items-start">
                    <label className="block object-top pt-2 text-medium mb-1 w-56">
                        Business Unit/s: <span className="text-red-500">*</span>
                        {errors?.profile && <p className="text-xs text-red-500 mt-1">{errors.profile}</p>}
                    </label>
                    <div className="flex flex-col">
                        <ComboBox
                            ref={roleComboRef}
                            items={profileDropdown}
                            displayKey="PROFILE_NAME"
                            valueKey="PROFILE_NAME"
                            placeholder="Select up to 5 Business Units"
                            selectedValue=""
                            setSelectedValue={handleRoleSelect}
                            className={`bg-inputField1 w-96 text-xs h-10 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mainDef3 focus:border-transparent placeholder:subtext text-bodytext2 placeholder:font-titleFont placeholder:text-xs ${
                                errors?.profile 
                                ? "border-red-500 ring-1 ring-red-500" : "border-inputField2"
                            }`}
                        />

                        <div className="flex flex-col mt-2 gap-2">
                            {userData.profile.map((role: string) => {
                                const roleObj = profileDropdown.find((r) => r.PROFILE_CODE === role);
                                return (
                                    <span
                                        key={role}
                                        className="flex items-center text-xs w-96 justify-between bg-gray-50 border border-gray-200 rounded px-3 py-2"
                                    >
                                        {roleObj?.PROFILE_NAME || role}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                updateField("profile", userData.profile.filter((r: string) => r !== role));

                                            }}
                                            className="ml-1 text-xs text-red-200 hover:text-red-400"
                                        >
                                            ✕
                                        </button>
                                    </span>
                                );
                            })}
                        </div>

                        {userData.profile.length >= 5 && (
                            <p className="text-xs text-bodyText2 mt-1">Maximum of 5 business units allowed.</p>
                        )}

                    </div>
                </div>

                <div className="mb-4 flex items-center">
                    <label htmlFor="enableClientAccess" className="block text-medium mb-1 w-56">
                        Enable Client Access
                    </label>
                    <input
                        id="enableClientAccess"
                        type="checkbox"
                        checked={!!userData.enable_client_access}
                        onChange={(e) => updateField("enable_client_access", e.target.checked)}
                        className="ml-2 h-5 w-5 bg-inputField1 border-inputField2"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
                    >
                        Next
                        <ArrowRight size={18} />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UserInformation;
