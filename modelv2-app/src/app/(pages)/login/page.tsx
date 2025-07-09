"use client"

import Image from "next/image"
import LoginForm from "@/components/forms/LoginForm";

export default function LoginPage() {

    return (
        <div className="min-h-screen relative overflow-hidden bg-bgDef">
            <div className="absolute inset-0 z-0 border border-slate-200 border-solid">
                <div
                    className="abosolute bottom-0 w-full h-full bg-mainDef1"
                    style={{
                        clipPath: 'polygon(73.1% 43.3%, 100% 0%, 100% 100%, 0% 100%, 0% 16.3%)',
                    }}>
                </div>
                <div
                    className="absolute bottom-0 w-full h-full bg-mainDef2"
                    style={{
                        clipPath: 'polygon(70.7% 56.3%, 100% 14.5%, 100% 100%, 0% 100%, 0% 16.3%)',
                    }}>
                </div>
                <div
                    className="absolute bottom-0 w-full h-full bg-mainDef3"
                    style={{
                        clipPath: 'polygon(85.5% 80.8%, 100% 49.5%, 100% 100%, 0% 100%, 0% 40%)',
                    }}>
                </div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px4">
                <div className="relative w-[30rem] h-[7.5rem] mb-8">
                    <Image
                        src="/modellogo.png"
                        alt="MODEL Logo"
                        fill
                        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 60vw, 30rem"
                        className="w-[30rem] h-auto"
                        priority
                    />
                </div>

                <div className="w-full max-w-sm scale-90 sm:scale-95 md:scale-100 transition-transform">
                  <LoginForm />
                </div>

                <div className="mt-10 text-center">
                    <p className="text-white text-sm font-medium mb-3 font-titleFont">POWERED BY:</p>
                    <div className="relative w-[8rem] h-[2.5rem]">
                        <Image
                            src="/ekonek_logo.png"
                            alt="e-KONEK PILIPINAS INC Logo"
                            fill
                            sizes="(max-width: 640px) 50vw, 8rem"
                            className="w-32 h-auto"
                            priority
                        />
                    </div>
                </div>

                <div className="absolute bottom-4 left-4 text-white text-xs font-italic font-titleFont">
                    <p>For inquiries or other concerns</p>
                    <p>Tel No. (02) - 6592133</p>
                    <p>email: support@ekonek.com</p>
                </div>
            </div>
        </div>
    )
}