"use client";
import { userLogin } from "@/hooks/userLogin";
import { Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/Buttons";
import LoadingScreen from "@/components/loadingScreen";
import Image from "next/image";

export default function LoginPage() {
  const {
          username,
          setUsername,
          password,
          setPassword,
          error,
          setError,
          showPassword,
          setShowPassword,
          handleClear,
          togglePasswordVisibility,
          handleLogin,
          loading,
          submitted
      } = userLogin();
  
      if (loading){
          return <LoadingScreen/>
      }

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
          <form
                        className="rounded-[5px] shadow-2xl p-4 sm:p-5 bg-white"
                    >
                        <div className="mb-2">
                            <label htmlFor="username" className="block text-xs mb-1  text-mainTextDef1 ">
                                <h3>Username</h3>
                            </label>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                maxLength={32}
                                required
                                className="w-full text-xs h-10 px-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 
                                focus:border-transparent placeholder:text-slate-400 text-slate-700 placeholder:font-titleFont placeholder:text-xs"
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="password" className="block text-xs mb-1 text-mainTextDef1 font-titleFont">
                                <h3>Password</h3>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    maxLength={32}
                                    required
                                    className="w-full text-xs h-10 px-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 
                                    focus:border-transparent placeholder:text-slate-400 text-slate-700 placeholder:font-titleFont placeholder:text-xs"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="mb-10 text-left font-titleFont">
                            <span className="text-xs text-slate-600">
                                Forgot Password?{" "}
                                <a href="#" className="text-mainDef3 hover:text-slate-800 underline font-bold font-titleFont">
                                    Click Here
                                </a>
                            </span>
                        </div>

                        <div className="flex gap-2 flex flex-col sm:flex-row justify-center align-center">
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={loading || submitted}
                                onClick={handleLogin}
                                className=" flex justify-center"
                            >
                                LOGIN
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleClear}
                                className=" flex justify-center"
                            >
                                CLEAR
                            </Button>
                        </div>
        </form>
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
