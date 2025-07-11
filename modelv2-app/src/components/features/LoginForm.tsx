import { userLogin } from "../../hooks/userLogin";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
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
        handleLogin
    } = userLogin();

    return(
        <form
                        className=" rounded-[5px] shadow-2xl p-5 sm:p-4 bg-white"
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
                                onClick={handleLogin}
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
    )
}