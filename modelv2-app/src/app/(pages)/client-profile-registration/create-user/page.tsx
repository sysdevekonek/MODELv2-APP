"use client";

import { useState } from "react";
import { AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import UserInformation from "@/components/features/registration/create-user/userInformation";
import PersonalData from "@/components/features/registration/create-user/personalData";
import UserAuthentication from "@/components/features/registration/create-user/userAuthentication";
import UserProperties from "@/components/features/registration/create-user/userProperties";
import ReviewAndSave from "@/components/features/registration/create-user/reviewSubmit";

import { RegistrationProvider, useRegistrationContext } from "@/hooks/registration/RegistrationContext";

const tabs = ["User Information", "Personal Data", "User Authentication", "User Specific Properties", "Review & Submit"];

export default function CreateUserPage() {
  return (
    <RegistrationProvider>
      <CreateUserContent />
    </RegistrationProvider>
  );
}

function CreateUserContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(0);
  const { userData, errors, validateTab, clearError, hasErrors, isFormComplete } = useRegistrationContext();
  const isReviewDisabled = !isFormComplete(userData) || Object.keys(errors).length > 0;

  const handleTabChange = (nextTab: number) => {
    setDirection(nextTab > activeTab ? 1 : -1);
    validateTab(activeTab + 1);
    setActiveTab(nextTab);
  };

  const goNext = () => {
    setDirection(1);
    validateTab(activeTab + 1);
    setActiveTab((prev) => Math.min(prev + 1, tabs.length - 1));
  };
  const goBack = () => {
    setDirection(-1);
    setActiveTab((prev) => Math.max(prev - 1, 0));
  };

  const resetTab = () => setActiveTab(0);

  const renderTab = () => {
    switch (activeTab) {
      case 0: return <UserInformation goNext={goNext} errors={errors} clearError={clearError} />;
      case 1: return <PersonalData goNext={goNext} goBack={goBack} errors={errors} clearError={clearError} />;
      case 2: return <UserAuthentication goNext={goNext} goBack={goBack} errors={errors} clearError={clearError} />;
      case 3: return <UserProperties goNext={goNext} goBack={goBack} errors={errors} />;
      case 4: return <ReviewAndSave goBack={goBack} resetTab={resetTab} />;
      default: return null;
    }
  };

  return (
    <div className="bg-bgContainer w-full h-full rounded-[5px] shadow-lg relative max-w-6xl mx-auto">
      <div className="bg-main1 text-titlebodytext1 font-semibold p-4 inline-block rounded-[5px] -translate-y-1/4 -top-6">
        <h1>CREATE USER</h1>
      </div>

      <div className="px-4 flex overflow-x-auto md:overflow-visible md:flex-wrap border-b-8 border-main1 mb-4 justify-start md:justify-center scrollbar-thin scrollbar-thumb-gray-400">
        {tabs.map((tab, index) => {
          const isDisabled = index === 4 && isReviewDisabled;
          return (
            <button
              key={tab}
              onClick={() => !isDisabled && handleTabChange(index)}
              disabled={isDisabled}
              className={`px-2 py-2 min-w-max md:min-w-0 font-medium flex items-center space-x-2
                ${activeTab === index ? "bg-main1 rounded-t-md text-titlebodytext1" : "text-subtext"}
                ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              <span className={`whitespace-nowrap ${hasErrors(index + 1) ? "text-red-500 font-bold" : ""}`}>{tab}</span>
              {hasErrors(index + 1) && <AlertCircle className="w-4 h-4 text-red-500" />}
            </button>
          );
        })}
      </div>

      <div className="flex justify-center pt-4 pb-8 w-full relative overflow-hidden h-auto min-h-[400px]">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeTab}
              custom={direction}
              initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -100 : 100, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            > 
              {renderTab()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
