"use client";

import Image from "next/image";
import LoginForm from "@/components/features/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-bgDef">
      {/* Background shapes */}
      <div className="absolute inset-0 z-0 border border-slate-200 border-solid">
        <div
          className="absolute bottom-0 w-full h-full bg-mainDef1"
          style={{
            clipPath:
              "polygon(73.1% 43.3%, 100% 0%, 100% 100%, 0% 100%, 0% 16.3%)",
          }}
        />
        <div
          className="absolute bottom-0 w-full h-full bg-mainDef2"
          style={{
            clipPath:
              "polygon(70.7% 56.3%, 100% 14.5%, 100% 100%, 0% 100%, 0% 16.3%)",
          }}
        />
        <div
          className="absolute bottom-0 w-full h-full bg-mainDef3"
          style={{
            clipPath:
              "polygon(85.5% 80.8%, 100% 49.5%, 100% 100%, 0% 100%, 0% 40%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Logo */}
        <div className="relative w-[30rem] sm:w-[30rem] md:w-[30rem] lg:w-[30rem] h-[4rem] sm:h-[5rem] md:h-[6rem] lg:h-[7.5rem] mb-6 md:mb-8">
          <Image
            src="/modellogo.png"
            alt="MODEL Logo"
            fill
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 60vw, 30rem"
            className="object-contain"
            priority
          />
        </div>

        {/* Login Form */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md scale-95 sm:scale-100 transition-transform">
          <LoginForm />
        </div>

        {/* Powered By */}
        <div className="mt-8 md:mt-10 text-center">
          <p className="text-white text-xs sm:text-sm font-medium mb-2 sm:mb-3 font-titleFont">
            POWERED BY:
          </p>
          <div className="relative w-[6rem] sm:w-[8rem] h-[2rem] sm:h-[2.5rem] mx-auto">
            <Image
              src="/ekonek_logo_white.png"
              alt="e-KONEK PILIPINAS INC Logo"
              fill
              sizes="(max-width: 640px) 50vw, 8rem"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Contact info */}
        <div className="absolute bottom-3 sm:bottom-4 left-2 sm:left-4 text-white text-[0.65rem] sm:text-xs font-italic font-titleFont leading-tight sm:leading-normal">
          <p>For inquiries or other concerns</p>
          <p>Tel No. (02) - 6592133</p>
          <p>email: support@ekonek.com</p>
        </div>
      </div>
    </div>
  );
}
