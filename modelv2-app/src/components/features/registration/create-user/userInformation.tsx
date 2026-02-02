import React, { useRef, useCallback } from "react";
import ComboBox, { ComboBoxRef } from "@/components/utils/comboBox";
import { useClientRoleDropdown } from "@/components/utils/dropdownAPI";
import { useRegistrationContext } from "@/hooks/registration/RegistrationContext";
import { UserData } from "@/components/data/dataTypes";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Buttons";

function useDebounce<F extends (...args: any[]) => void>(func: F, delay: number) {
  const timer = useRef<NodeJS.Timeout | null>(null);
  return useCallback(
    (...args: Parameters<F>) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => func(...args), delay);
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
  const { clientDropdown, profileDropdown, loading, clientRoleChange } = useClientRoleDropdown();
  const { userData, updateField, validateLive } = useRegistrationContext();

  const debouncedValidate = useDebounce((field: keyof UserData, value: string) => validateLive(field, value), 400);

  const handleUsernameField = (field: keyof UserData, value: string) => {
    updateField(field, value);
    debouncedValidate(field, value);
  };

  const handleRoleSelect = (val: string) => {
    if (!val) return;
    if (userData.profile.includes(val)) {
      roleComboRef.current?.clear();
      return;
    }
    if (userData.profile.length >= 5) return;

    updateField("profile", [...userData.profile, val]);
    clearError("profile");
    roleComboRef.current?.clear();
  };

  const renderInputField = (
    id: keyof UserData,
    label: string,
    placeholder: string,
    required = false,
    maxLength = 50,
    type = "text",
    onChangeHandler?: (value: string) => void
  ) => (
    <div className="mb-1 flex flex-col justify-center md:flex-row md:items-center gap-2">
      <label htmlFor={String(id)} className="block text-sm md:w-56">
        {label} {required && <span className="text-red-500">*</span>}
        {errors?.[id] && <p className="text-xs text-red-500 mt-1">{errors[id]}</p>}
      </label>

      <input
        id={String(id)}
        type={type}
        maxLength={maxLength}
        placeholder={placeholder}
        value={userData[id] as string}
        onChange={(e) => {
          const value = e.target.value;
          if (onChangeHandler) onChangeHandler(value);
          else {
            updateField(id, value);
            clearError(id);
          }
        }}
        className={`bg-inputField1 w-full md:w-96 text-xs h-10 px-4 border rounded-lg focus:outline-none focus:ring-2
          ${errors?.[id] ? "border-red-500 ring-1 ring-red-500" : "border-inputField2 focus:ring-mainDef3"}`}
      />
    </div>
  );

  const renderComboBoxField = (
    id: keyof UserData,
    label: string,
    placeholder: string,
    ref: React.RefObject<ComboBoxRef | null>,
    items: any[],
    displayKey: string,
    valueKey: string,
    selectedValue: string,
    onSelect: (val: string) => void,
    onInputChange: (val: string) => void,
    required = false
  ) => (
    <div className="mb-1 flex flex-col justify-center md:flex-row md:items-center gap-2">
      <label htmlFor={String(id)} className="block text-sm md:w-56">
        {label} {required && <span className="text-red-500">*</span>}
        {errors?.[id] && <p className="text-xs text-red-500 mt-1">{errors[id]}</p>}
      </label>
      <ComboBox
        ref={ref}
        items={items}
        displayKey={displayKey}
        valueKey={valueKey}
        placeholder={placeholder}
        loading={loading}
        onInputChange={onInputChange}
        selectedValue={selectedValue}
        setSelectedValue={onSelect}
        showValueKeyInList={false}
        className={`bg-inputField1 w-full md:w-96 text-xs h-10 px-4 border rounded-lg focus:outline-none focus:ring-2
          ${errors?.[id] ? "border-red-500 ring-1 ring-red-500" : "border-inputField2 focus:ring-mainDef3"}`}
      />
    </div>
  );

  const renderCheckboxField = (id: keyof UserData, label: string) => (
    <div className="mb-1 flex flex-col justify-center md:flex-row md:items-center gap-2">
      <label htmlFor={String(id)} className="block text-sm md:w-56">{label}</label>
      <div className="w-96 flex items-center">
        <input
          id={String(id)}
          type="checkbox"
          checked={!!userData[id]}
          onChange={(e) => updateField(id, e.target.checked)}
          className="h-5 w-5 bg-inputField1 border-inputField2"
        />
      </div>
    </div>
  );

  return (
    <div className="flex justify-center">
      <form
        className="w-full max-w-3xl px-4 md:px-6"
        onSubmit={(e) => {
          e.preventDefault();
          goNext();
        }}
      >
        {renderInputField("username", "Username:", "Insert Username", true, 32, "text", (val) => handleUsernameField("username", val))}
        {renderInputField("account_reference", "Account Number Reference:", "Insert Account Number Reference", true, 17)}
        {renderInputField("account_holder", "Account Holder:", "Insert Account Holder", false, 15)}
        {renderComboBoxField("company", "Company:", "Select Company", companyComboRef, clientDropdown, "CLIENT_NAME", "CLIENT_CODE", userData.company, (val) => { updateField("company", val); clearError("company"); }, clientRoleChange, true)}

        <div className="mb-1 flex flex-col justify-center md:flex-row md:items-start gap-2">
          <label className="block text-sm md:w-56">
            Business Unit/s: <span className="text-red-500">*</span>
            {errors.profile && (
              <p className="text-xs text-red-500 mt-1">{errors.profile}</p>
            )}
          </label>
          <div className="flex flex-col">
            <ComboBox
              ref={roleComboRef}
              items={profileDropdown}
              displayKey="PROFILE_NAME"
              valueKey="PROFILE_NAME"
              placeholder="Select up to 5 Business Units"
              loading={loading}
              onInputChange={clientRoleChange}
              selectedValue=""
              showValueKeyInList={false}
              setSelectedValue={handleRoleSelect}
              className={`bg-inputField1 w-full md:w-96 text-xs h-10 px-4 border rounded-lg focus:outline-none focus:ring-2 
                ${errors?.profile ? "border-red-500 ring-1 ring-red-500" : "border-inputField2 focus:ring-mainDef3"}`}
            />

            <div className="mb-4 flex flex-col md:flex-col md:items-center gap-2">
              {userData.profile.length === 0 ? (
                <span className="text-xs text-gray-400 w-full py-2 px-3 bg-inputField1 border border-inputField2 rounded">
                  No Business Selected
                </span>
     
              ) : (
                userData.profile.map((role: string) => {
                  const roleObj = profileDropdown.find(
                    (r) => r.PROFILE_CODE === role || r.PROFILE_NAME === role
                  );
                  return (
                    <span
                      key={role}
                      className="flex items-center text-xs md:w-96 justify-between bg-inputField1 border border-inputField2 rounded px-3 py-2"
                    >
                      {roleObj?.PROFILE_NAME || role}
                      <button
                        type="button"
                        onClick={() =>
                          updateField(
                            "profile",
                            userData.profile.filter((r: string) => r !== role)
                          )
                        }
                        className="ml-1 text-xs text-red-200 hover:text-red-400"
                      >
                        ✕
                      </button>
                    </span>
                  );
                })
              )}
              {userData.profile.length >= 5 && (
                <p className="text-xs text-bodyText2 mt-1">
                  Maximum of 5 business units allowed.
                </p>
              )}
            </div>
          </div>
        </div>

        {renderCheckboxField("enable_client_access", "Enable Client Access")}

        <div className="flex justify-end mt-6">
          <Button type="submit" variant="secondary" className="w-full sm:w-auto justify-end">
            Next <ArrowRight size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserInformation;
