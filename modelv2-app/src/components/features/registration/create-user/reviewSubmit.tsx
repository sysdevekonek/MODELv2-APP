"use client"
import React, { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useRegistrationContext } from "@/hooks/registration/RegistrationContext"
import { useRegistration } from "@/hooks/registration/useRegistration";

interface reviewSubmitProps {
  goBack: () => void;
  resetTab: () => void
}

const ReviewAndSave: React.FC<reviewSubmitProps> = ({ goBack, resetTab }) => {
  const { userData } = useRegistrationContext();
  const { handleSubmit, loading } = useRegistration();
  
  const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const success = await handleSubmit();
      if (success) {
        resetTab();
      }
    };

  return (
    <div className="w-full max-w-5xl mx-auto overflow-hidden">
      <div className=" px-8 py-4 border-b border-gray-200 dark:border-gray-700">
        <label className="text-xl font-bold text-bodytext2">Review & Submit</label>
        <p className="text-black mt-1">
          Review and verify the information below before submition.
        </p>
      </div>
      <form onSubmit={onSubmit}>
        <div className="px-8 py-4 space-y-4">
          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <label className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              User Information
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400"> Username </span>
                  <p className="text-gray-900 dark:text-white font-medium">{userData.username}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400"> Account Reference </span>
                  <p className="text-gray-900 dark:text-white font-mono text-sm">{userData.account_reference}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400"> Account Holder </span>
                  <p className="text-gray-900 dark:text-white font-medium">{userData.account_holder}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Company</span>
                  <p className="text-gray-900 dark:text-white font-medium">{userData.company}</p>
                </div>
              </div>

              <div className="  md:col-span-2">
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">Profile</label>
                {userData.profile.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {userData.profile.map((p, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center bg-gray-50  px-4 py-2 rounded-md shadow-sm border border-none"
                      >
                        <span className="text-gray-900 dark:text-white font-medium">{p}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-900 dark:text-white font-medium">No profiles assigned.</p>
                )}
              </div>

            </div>
          </div>

          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <label className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              Personal Data
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</span>
                <p className="text-gray-900 dark:text-white font-medium">{userData.name}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Address</span>
                <p className="text-gray-900 dark:text-white">{userData.address}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Country</span>
                <p className="text-gray-900 dark:text-white">{userData.country}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">City</span>
                <p className="text-gray-900 dark:text-white">{userData.city}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">ZIP</span>
                <p className="text-gray-900 dark:text-white font-mono">{userData.zip}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone No</span>
                <p className="text-gray-900 dark:text-white">{userData.phone_no}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Cell No</span>
                <p className="text-gray-900 dark:text-white">{userData.cellphone_no}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Fax</span>
                <p className="text-gray-900 dark:text-white">{userData.fax}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</span>
                <p className="text-gray-900 dark:text-white">{userData.email}</p>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <label className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              Authentication
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Password</span>
                  <p className="text-gray-900 dark:text-white font-mono">{userData.password}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Enable Client Access</span>
                  <p className="text-gray-900 dark:text-white">{userData.enable_client_access ? "yes" : "no"}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Auto Submit Capable</span>
                  <p className="text-gray-900 dark:text-white">{userData.auto_submit_capable ? "yes" : "no"}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Auto Submit Capable 2</span>
                  <p className="text-gray-900 dark:text-white">{userData.auto_submit_capable2 ? "yes" : "no"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
            <label className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              Properties
            </label>
            {userData.properties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {userData.properties.map((p, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded px-3 py-2"
                  >
                    <span>
                      <span className="font-semibold">{p.name}:</span> {p.value}
                    </span>
                  </li>
                ))}
              </div>
            ) : (
              <p className="text-gray-900 dark:text-white font-medium">No properties assigned.</p>
            )}
          </div>
        </div>

        <div className="px-8 py-6">
          <div className='flex justify-between'>
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-2 px-5 py-2 rounded-lg bg-button2 text-bodytext2 font-medium hover:bg-gray-300 transition"
            >
              <ArrowLeft size={18} />
              Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`flex items-center gap-2 px-5 py-2 rounded-lg bg-button1 text-titlebodytext1 font-medium hover:bg-gray-300 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Submit
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ReviewAndSave;