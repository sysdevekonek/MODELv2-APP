import React, { useState }from "react";
import { useRegistrationContext } from "@/hooks/registration/RegistrationContext";
import { ArrowLeft, ArrowRight, Eye, EyeOff } from "lucide-react";
import { UserData } from "@/components/data/dataTypes";
import { validateField } from "@/hooks/registration/RegistrationValidation";

interface UserAuthenticationProps {
  goNext: () => void;
  goBack: () => void;
  errors: Record<string, string>;
  clearError: (field: keyof UserData) => void;
}

const UserAuthentication: React.FC<UserAuthenticationProps> = ({ goNext, goBack, errors, clearError }) => {
  const { userData, updateField } = useRegistrationContext();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (field: keyof UserData, value: string) => {
    updateField(field, value);
    const error = validateField(field, value, { ...userData, [field]: value });
    if (error) {
      errors[field] = error;
    } else {
      clearError(field);
    }
  };

  const handlePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!errors.password && !errors.confirm_password) {
      goNext();
    }
  };

  return (
    <div>
      <form className="pl-5" onSubmit={handlePassword}>
        <div className="mb-[3px] flex flex-col">
          <label htmlFor="password" className="block text-medium mb-1">
            Password: <span className="text-red-500">*</span>
          </label>
          <div className="relative w-96">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              maxLength={32}
              placeholder="Set Password"
              value={userData.password || ""}
              onChange={(e) => handleChange("password", e.target.value)}
              className={`bg-inputField1 w-full text-xs h-10 px-4 pr-10 border rounded-lg focus:outline-none focus:ring-2 
                ${errors.password ? "border-red-500 ring-1 ring-red-500" : "border-inputField2 focus:ring-mainDef3"}`}
            />
            {userData.password && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700 text-opacity-50"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}
          </div>
          {errors.password && (
            <p className="text-xs text-red-500 mt-1">{errors.password}</p>
          )}
        </div>

        <div className="mb-4 flex flex-col">
          <label htmlFor="confirm_password" className="block text-medium mb-1">
            Confirm Password: <span className="text-red-500">*</span>
          </label>
          <div className="relative w-96">
            <input
              id="confirm_password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={userData.confirm_password || ""}
              onChange={(e) => handleChange("confirm_password", e.target.value)}
              className={`bg-inputField1 w-full text-xs h-10 px-4 pr-10 border rounded-lg focus:outline-none focus:ring-2 
                ${errors.confirm_password ? "border-red-500 ring-1 ring-red-500" : "border-inputField2 focus:ring-mainDef3"}`}
            />
            {userData.confirm_password && (
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700 text-opacity-50"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            )}
          </div>
          {errors.confirm_password && (
            <p className="text-xs text-red-500 mt-1">{errors.confirm_password}</p>
          )}
        </div>

        <div className="mb-4 flex items-center">
          <label htmlFor="asc" className="block text-medium mb-1 w-72">
            Automatic Submission Capable
          </label>
          <input
            id="asc"
            type="checkbox"
            checked={userData.auto_submit_capable}
            onChange={(e) =>
              updateField("auto_submit_capable", e.target.checked)
            }
            className="ml-2 h-5 w-5 bg-inputField1 border-inputField2"
          />
        </div>
        <div className="mb-4 flex items-center">
          <label htmlFor="asc2" className="block text-medium mb-1 w-72">
            Automatic Submission Capable 2
          </label>
          <input
            id="asc2"
            type="checkbox"
            checked={userData.auto_submit_capable2}
            onChange={(e) =>
              updateField("auto_submit_capable2", e.target.checked)
            }
            className="ml-2 h-5 w-5 bg-inputField1 border-inputField2"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={goBack}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition"
          >
            <ArrowLeft size={18} />
            Back
          </button>
          <button
            type="submit"
            disabled={!!errors.password || !!errors.confirm_password}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium 
              hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserAuthentication;