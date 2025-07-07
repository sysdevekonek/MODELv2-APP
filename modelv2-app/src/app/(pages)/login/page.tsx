"use client"

import Image from "next/image"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

import api from "@/common/config"

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const handleClear = () => {
        setUsername("")
        setPassword("")
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { 
        username,
        password });

      const token = res.data.token;
      localStorage.setItem('token', token); 
      router.push('/dashboard'); 
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

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
                <div className="mb-8">
                    <Image
                        src="/modellogo.png"
                        alt="MODEL Logo"
                        width={480}
                        height={120}
                        className="w-[30rem] h-auto"
                        priority
                    />
                </div>

                <div className="w-full max-w-sm scale-90 sm:scale-95 md:scale-100 transition-transform">
                    <form 
                        onSubmit={handleLogin}
                        className=" rounded-[5px] shadow-2xl p-5 sm:p-4 bg-white"
                    >
                        <div className="mb-2">
                            <label htmlFor="username" className="block text-xs mb-1  text-mainTextDef1 ">
                                <h3>Username</h3>
                            </label>
                            <input 
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Username"
                                autoComplete="username"
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
                                    id="password"
                                    type={ showPassword ? "text" : "password" }
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    autoComplete="current-password"
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

                        <div className="flex gap-[.25rem] justify-center align-center">
                            <button
                                type="submit" 
                                className="px-6 h-8 bg-mainDef3 hover:bg-subDef text-white font-semibold text-xs rounded-[5px] transition-colors duration-200 
                                focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 font-titleFont"
                            >
                                LOGIN
                            </button>
                            <button
                                type="button"
                                onClick={handleClear}
                                className="px-6 h-8 bg-mainDef2 hover:bg-slate-500 text-white font-semibold text-xs rounded-[5px] transition-colors duration-200 
                                focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2 font-titleFont"
                            >
                                CLEAR
                            </button>
                            {error && <p className="text-red-500">{error}</p>}
                        </div>
                    </form>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-white text-sm font-medium mb-3 font-titleFont">POWERED BY:</p>
                    <div className="flex items-center justify-center">
                        <Image
                            src="/ekonek_logo.png"
                            alt="e-KONEK PILIPINAS INC Logo"
                            width={128}
                            height={40}
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