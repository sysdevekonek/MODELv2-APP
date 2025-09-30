import { userLogin } from "../../hooks/userLogin";
import { Eye, EyeOff } from "lucide-react";
import Button from "../ui/Buttons";

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
        handleLogin,
        loading
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

                        <div className="flex gap-[.25rem] justify-center align-center">
                            <Button
                                type="submit"
                                variant="primary"
                                disabled={loading}
                                className={`${loading ? "bg-gray-300 cursor-not-allowed" : ""}`}
                                onClick={handleLogin}
                            >
                                LOGIN
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={handleClear}
                            >
                                CLEAR
                            </Button>
                        </div>
        </form>
    )
}