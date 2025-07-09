"use client";

import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
    const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});

    const toggleDropdown = (key: string) => {
        setOpenDropdowns((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <aside className="fixed top-32 left-0 w-64 h-[calc(100vh-4rem)] bg-gray-800 text-white p-4 shadow-lg z-30">
            <nav>
                <ul className="space-y-4">
                    {/* put here the buttons for navigations*/}
                </ul>
            </nav>
            <div className="absolute bottom-0 left-0 w-full h-64 pointer-events-none z-0">
                <div
                    className="absolute bottom-0 w-full h-full bg-mainDef2"
                    style={{
                        clipPath: 'polygon(67.4% 52%, 100% 25.5%, 100% 100%, 0% 100%, 0% 21.5%)',
                    }}
                ></div>
                <div
                    className="absolute bottom-0 w-full h-full bg-mainDef1"
                    style={{
                        clipPath: 'polygon(79.2% 69%, 100% 52.8%, 100% 100%, 0% 100%, 0% 46.5%)',
                    }}
                ></div>
            </div>
        </aside>
    );
}