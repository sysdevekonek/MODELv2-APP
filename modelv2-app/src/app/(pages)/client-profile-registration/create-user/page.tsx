"use client";

import { useState } from 'react';

import UserInformation from '@/components/features/registration/create-user/userInformation';
import PersonalData from '@/components/features/registration/create-user/personalData';
import UserAuthentication from '@/components/features/registration/create-user/userAuthentication';
import UserSpecificProperties from '@/components/features/registration/create-user/userProperties';

const tabs = ['User Information', 'Personal Data', 'User Authentication', 'User Specific Properties'];

export default function CreateUserPage() {
    const [activeTab, setActiveTab] = useState(0);

    const renderTab = () => {
        switch (activeTab) {
            case 0: return <UserInformation />;
            case 1: return <PersonalData />;
            case 2: return <UserAuthentication />;
            case 3: return <UserSpecificProperties />;
            default: return null;
        }
    };

    return (
            <div className="bg-bgContainer w-full h-full rounded-[5px] shadow-lg relative">
                <div className="bg-main1 text-titlebodytext1 font-semibold p-4 inline-block rounded-[5px] -translate-y-1/4 -top-6 ">
                    <h1>CREATE USER</h1>
                </div>
                <div>
                    <div className="flex space-x-4 border-b-8 border-main1 shadow-lg mb-4 justify-center">
                        {tabs.map((tab, index) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(index)}
                                className={`px-4 py-2 font-medium ${activeTab === index ? ' bg-main1 text-titlebodytext1' : 'text-subtext'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className=" flex justify-center p-4">
                        {renderTab()}
                    </div>
                </div>


            </div>


    )

}