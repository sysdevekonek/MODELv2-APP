"use client"
import React from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useRegistrationContext } from "@/hooks/registration/RegistrationContext"
import { useRegistration } from "@/hooks/registration/useRegistration";
import Button from "@/components/ui/Buttons";
import { Eye, EyeOff } from "lucide-react";
import { useClientRoleDropdown, useCountryDropdown } from "@/components/dropdownAPI";

interface reviewSubmitProps {
  goBack: () => void;
  resetTab: () => void
}

const ReviewAndSave: React.FC<reviewSubmitProps> = ({ goBack, resetTab }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { userData } = useRegistrationContext();
  const { handleSubmit, loading } = useRegistration();
  const { clientDropdown } = useClientRoleDropdown();
  const { countryDropdown } = useCountryDropdown();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await handleSubmit();
    if (success) {
      resetTab();
    }
  };
  const displayValue = (val?: string | number | null) =>
    val && String(val).trim() !== "" ? val : "None";

  return (
    <div className="w-full max-w-8xl mx-auto overflow-hidden">
      <div className=" py-4 border-b border-gray-200 dark:border-gray-700">
        <label className="text-xl font-bold text-bodytext2">Review & Submit</label>
        <p className="text-bodytext2 mt-1">
          Review and verify the information below before submition.
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="py-4 border-b border-gray-200 dark:border-gray-700">
          <label className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            User Information
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Username</span>
                <p className="text-gray-900 dark:text-white font-medium">{userData.username}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Reference</span>
                <p className="text-gray-900 dark:text-white font-medium">{userData.account_reference}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Holder</span>
                <p className="text-gray-900 dark:text-white font-medium">{displayValue(userData.account_holder)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Company</span>
                <p className="text-gray-900 dark:text-white font-medium"> {clientDropdown.find(c => c.CLIENT_CODE === userData.company)?.CLIENT_NAME || userData.company}</p>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">Profile</label>
              {userData.profile.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {userData.profile.map((p, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center bg-inputField1 px-3 py-2 rounded-md shadow-sm border border-inputField2"
                    >
                      <span className="text-gray-900 dark:text-white font-medium text-sm flex text-center">{p}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-900 dark:text-white font-medium">No profiles assigned.</p>
              )}
            </div>
          </div>
        </div>

        <div className="py-4 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          <label className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            Personal Data
          </label>
          <div className="min-w-[600px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              ["Name", userData.name],
              ["Address", userData.address],
              ["Country", countryDropdown.find((c: { COUNTRY_CODE: string; }) => c.COUNTRY_CODE === userData.country)?.COUNTRY_NAME || userData.country],
              ["City", userData.city],
              ["ZIP", userData.zip],
              ["Phone No", userData.phone_no],
              ["Cell No", userData.cellphone_no],
              ["Fax", userData.fax],
              ["Email", userData.email],
            ].map(([label, value], idx) => (
              <div key={idx}>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</span>
                <p className="text-gray-900 dark:text-white font-medium">{displayValue(value)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="py-4 border-b border-gray-200 dark:border-gray-700">
          <label className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            Authentication
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Password
                </span>
                <div className="flex items-center gap-2">
                  <p className="text-gray-900 dark:text-white font-mono">
                    {showPassword
                      ? userData.password
                      : "•".repeat(userData.password?.length || 8)}
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Enable Client Access</span>
                <p className="text-gray-900 dark:text-white">{userData.enable_client_access ? "Yes" : "No"}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Auto Submit Capable</span>
                <p className="text-gray-900 dark:text-white">{userData.auto_submit_capable ? "Yes" : "No"}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Auto Submit Capable 2</span>
                <p className="text-gray-900 dark:text-white">{userData.auto_submit_capable2 ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="py-4 border-b border-gray-200 dark:border-gray-700">
          <label className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            Properties
          </label>
          {userData.properties.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {userData.properties.map((p, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between bg-inputField1 border border-inputField2 rounded px-3 py-2"
                >
                  <span className="flex flex-row md:flex-col items-center md:items-start gap-2 md:gap-0">
                    <span className="font-semibold text-sm">{p.name}:</span> {p.displayValue}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-900 dark:text-white font-medium">No properties assigned.</p>
          )}
        </div>

        <div className="py-6 flex flex-col sm:flex-row justify-between gap-4">
          <Button type="button" onClick={goBack} variant="secondary" className="w-full sm:w-auto justify-start">
            <ArrowLeft size={18} /> Back
          </Button>
          <Button type="submit" disabled={loading} variant="primary" className="w-full sm:w-auto justify-end">
            Submit <ArrowRight size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ReviewAndSave;