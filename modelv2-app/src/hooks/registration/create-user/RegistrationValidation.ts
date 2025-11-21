import { UserData } from "@/components/data/dataTypes";
import api from "@/common/config";

async function checkUsernameExists(username: string): Promise<string | undefined> {
  try {
    const trimmed = username.trim();
    if (trimmed.length < 4 || trimmed.length > 32) {
      return;
    }

    const { data } = await api.get("/utilities/registration/check/username", {
      params: { value: trimmed },
    });

    if (data?.STATUS === "Invalid") {
      return "Username already exists!";
    }
    return;
  } catch (err) {
    console.error("checkUsernameExists error:", err);
    return;
  }
}

export const validateField = ( field: keyof UserData, value: string, allData: UserData ): string | undefined => {
  switch (field) {
    case "username":
      if (!value) return "Username is required";
      if (value.length < 4) return "Minimum 4 characters required";
      if (value.length > 32) return "Maximum 32 characters";
      return;
    case "account_reference":
      if (!value) return "Customer Account ID is required";
      if (value.length > 17) return "Max 17 characters";
      return;
    case "account_holder":
      if (value && value.length > 15) return "Account Holder max 15 characters";
      return;
    case "company":
      if (!value) return "Customer Account Name is required";
      if (value.length > 35) return "Max 35 characters";
      return;
    case "profile":
      if (!allData.profile || allData.profile.length < 1) return "At least one profile must be selected";
      if (allData.profile.length > 5) return "Maximum 5 profiles allowed";
      return;
    case "name":
      if (!value) return "Full name is required";
      if (value.length > 80) return "Max 80 characters";
      return;
    case "address":
      if (!value) return "Address is required";
      if (value.length > 255) return "Max 255 characters";
      return;
    case "country":
      if (!value) return "Country code is required";
      return;
    case "city":
      if (value && value.length > 50) return "Max 50 characters";
      return;
    case "zip":
      if (value && value.length > 10) return "Max 10 characters";
      return;
    case "phone_no":
    case "cellphone_no":
    case "fax":
      if (value && value.length > 32) return "Max 32 characters";
      return;
    case "email":
      if (!value) return "Email is required";
      if (value.length > 50) return "Max 50 characters";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email format";
      return;
    case "password":
      if (!value) return "Password is required";
      if (value.length < 8) return "Minimum 8 characters required";
      if (value.length > 32) return "Maximum 32 characters allowed";
      if (!/[A-Z]/.test(value)) return "Must include at least one uppercase";
      if (!/[a-z]/.test(value)) return "Must include at least one lowercase";
      if (!/[0-9]/.test(value)) return "Must include at least one number";
      if (!/[!@#$%^&*(),.?\":{}|<>_\-\\[\];'/+=~`]/.test(value)) return "Must include at least one special character";
      return;
    case "confirm_password":
      if (!value) return "Please confirm your password";
      if (value !== allData.password) return "Passwords do not match";
      return;
    default:
      return;
  }
};

export async function validateFieldAsync(field: keyof UserData, value: any, allValues: UserData) {
  const syncError = validateField(field, value, allValues);
  if (syncError) return syncError;

  if (field === "username") {
    const exists = await checkUsernameExists(value);
    if (exists) return "Username already taken";
  }

  return null;
}

export function validateForm(values: UserData, tab: number) {
  const errors: Record<string, string> = {};

  if (tab === 1) {
    if (!values.username) errors.username = "Username is required";
    if (!values.account_reference) errors.account_reference = "Account Reference is required"
    if (!values.company) errors.company = "Company is required"
    if (!values.profile || values.profile.length === 0) errors.profile = "At least one (1) Business Unit is required";
  }
  if (tab === 2) {
    if (!values.name) errors.name = "Full Name is required";
    if (!values.address) errors.address = "Address is required"
    if (!values.country) errors.country = "Country is required";
    if (!values.email) errors.email = "Account Reference is required"
  }
  if (tab === 3) {
    if (!values.password) errors.password = "Password is required"
    if (!values.confirm_password) errors.confirm_password = "Please Confirm your Password"
  }

  return errors;
}
