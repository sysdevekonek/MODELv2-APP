"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { UserData } from "@/components/data/dataTypes";
import { validateForm, validateFieldAsync } from "@/hooks/registration/RegistrationValidation";

const initialUserData: UserData = {
  username: "",
  account_reference: "",
  account_holder: "",
  company: "",
  profile: [],
  enable_client_access: false,
  name: "",
  address: "",
  country: "",
  city: "",
  zip: "",
  phone_no: "",
  cellphone_no: "",
  fax: "",
  email: "",
  password: "",
  confirm_password: "",
  auto_submit_capable: false,
  auto_submit_capable2: false,
  properties: [],
};

type RegistrationContextType = {
  userData: UserData;
  errors: Record<string, string>;
  updateField: (field: keyof UserData, value: any) => void;
  setCurrentTab: (tab: number) => void;
  validateTab: (tab: number) => void;
  validateLive: (field: keyof UserData, value: any) => void;
  clearData: () => void;
  clearError: (field: keyof UserData) => void;
  hasErrors: (tab: number) => boolean;
  isFormComplete: (values: UserData) => boolean;
};

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentTab, setCurrentTab] = useState(0);

  // console.log("UserData:", userData);
  const updateField = (field: keyof UserData, value: any) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const validateTab = (tab: number) => {
    const newErrors = validateForm(userData, tab);
    setErrors((prev) => ({ ...prev, ...newErrors }));
  };

  const validateLive = async (field: keyof UserData, value: any) => {
    const error = await validateFieldAsync(field, value, {
      ...userData,
      [field]: value,
    });
    if (error) {
      setErrors((prev) => ({ ...prev, [field]: error }));
    } else {
      clearError(field);
    }
  };

  const clearData = () => {
    setUserData(initialUserData);
    setErrors({});
    setCurrentTab(0);
  };

  const clearError = (field: keyof UserData) => {
    setErrors((prev) => {
      const { [field]: _, ...rest } = prev;
      return rest;
    });
  };

  const hasErrors = (tab: number) => {
    const newErrors = validateForm(userData, tab);
    return Object.keys(newErrors).some((f) => errors[f]);
  };

  const isFormComplete = (data: UserData): boolean => {
    return Boolean(
      data.username?.trim() &&
      data.account_reference?.trim() &&
      data.company?.trim() &&
      data.profile?.length > 0 &&
      data.name?.trim() &&
      data.email?.trim() &&
      data.password?.trim() &&
      data.confirm_password?.trim()
    );
  };

  return (
    <RegistrationContext.Provider
      value={{
        userData,
        errors,
        updateField,
        setCurrentTab,
        validateTab,
        validateLive,
        clearData,
        clearError,
        hasErrors,
        isFormComplete,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistrationContext = () => {
  const ctx = useContext(RegistrationContext);
  if (!ctx) throw new Error("useRegistrationContext must be used within provider");
  return ctx;
};