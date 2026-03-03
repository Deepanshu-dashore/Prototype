"use client";

import { useState } from "react";
import Image from "next/image";
import {
    EyeIcon,
    EyeSlashIcon,
} from "@heroicons/react/24/outline";

export default function UnifiedLogin({
    title = "Login",
    subtitle,
    Logo = null,
    showSocials = false, // If needed in future
    fields = [
        { name: "email", type: "email", placeholder: "you@example.com", label: "Email" },
        { name: "password", type: "password", placeholder: "********", label: "Password" },
    ],
    onSubmit,
    loading = false,
    error = "",
    rememberMeIdx = true,
    links = {
        forgotPassword: "#",
        register: null
    },
    bgColor = "bg-neutral-900",
    bgImage = "/AdminBg.png"
}) {
    const [formState, setFormState] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formState);
    };

    return (
        <div className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden ${bgColor}`}>
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                {bgImage && (
                    <>
                        <Image
                            src={bgImage}
                            alt="Background"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/10" />
                    </>
                )}
            </div>

            {/* Login Form Card */}
            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-2xl border border-white/20">
                    <div className="flex items-center gap-2 mb-6">
                        <Image
                            src="/CCMate-Logo.jpg"
                            alt="Logo"
                            width={100}
                            height={200}
                            className="object-contain h-13 w-auto"
                        />
                        <h1 className="text-lg leading-5 text-nowrap font-extrabold text-primary/50 border-l-3 bg-linear-to-r from-primary/10 to-transparent border-primary/30 p-2 py-2.5 tracking-tight uppercase">
                            {title}
                        </h1>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {fields.map((field) => (
                            <div key={field.name} className="space-y-2">
                                <label className="text-sm font-semibold text-neutral-700 ml-1">
                                    {field.label}
                                </label>
                                <div className="relative">
                                    {field.type === "select" ? <select
                                        name={field.name}
                                        value={field.state || formState[field.name] || ""}
                                        onChange={field.onChange || handleChange}
                                        placeholder={field.placeholder}
                                        required
                                        className="w-full h-12 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                    >
                                        {field.options.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select> : <input
                                        type={field.name === "password" && showPassword ? "text" : field.type}
                                        name={field.name}
                                        value={field.state || formState[field.name] || ""}
                                        onChange={field.onChange || handleChange}
                                        placeholder={field.placeholder}
                                        required
                                        className="w-full h-12 px-4 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                    />}
                                    {field.name === "password" && (
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-neutral-400 hover:text-neutral-600 transition-colors"
                                        >
                                            {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}

                        <div className="flex items-center justify-between px-1 mt-10">
                            {rememberMeIdx && (
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-neutral-300 bg-white transition-all checked:bg-primary checked:border-primary"
                                        />
                                        <svg
                                            className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-semibold text-neutral-600 group-hover:text-neutral-900 transition-colors">
                                        Remember Me
                                    </span>
                                </label>
                            )}
                            {links.forgotPassword && (
                                <a href={links.forgotPassword} className="text-sm font-semibold text-primary hover:underline">Forgot?</a>
                            )}
                        </div>

                        {error && (
                            <div className="text-red-600 text-sm text-center px-2 py-1 bg-red-50 rounded-lg border border-red-100">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-2 h-12 bg-[#160258] text-white font-bold rounded-xl hover:bg-[#1a006d] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    <span>Loading...</span>
                                </div>
                            ) : (
                                "Login"
                            )}
                        </button>

                        {links.register && (
                            <div className="text-center text-sm text-gray-600 mt-2">
                                <span className="mr-1">Don't have an account?</span>
                                <a href={links.register} className="font-semibold text-primary hover:underline">Register</a>
                            </div>
                        )}
                    </form>

                    <div className="mt-2 pt-5 border-t border-neutral-100">
                        <p className="text-[11px] text-neutral-400 text-center leading-relaxed">
                            By continuing, you agree to CC Matting's{" "}
                            <a
                                href="/terms-and-conditions"
                                className="text-neutral-500 hover:text-primary transition-colors underline underline-offset-2 decoration-neutral-200"
                            >
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a
                                href="/privacy-policy"
                                className="text-neutral-500 hover:text-primary transition-colors underline underline-offset-2 decoration-neutral-200"
                            >
                                Privacy Policy
                            </a>
                            .
                        </p>
                    </div>
                </div>
            </div>

            {/* Bottom Right Branding */}
            <div className="absolute bottom-6 right-8 z-20 pointer-events-none">
                <Image
                    src="/CCMate-Logo.jpg"
                    alt="CC Matting"
                    width={140}
                    height={36}
                    className="h-10 w-auto object-contain opacity-40 p-1.5 bg-white rounded shadow-sm"
                />
            </div>
        </div>
    );
}
