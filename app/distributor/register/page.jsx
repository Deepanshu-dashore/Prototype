"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DistributorRegister() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // OTP Verification State
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [otpMessage, setOtpMessage] = useState("");
    const [resendTimer, setResendTimer] = useState(0);

    useEffect(() => {
        // Check for existing cooldown cookie
        const cooldownCookie = document.cookie
            .split("; ")
            .find((row) => row.startsWith("otp_cooldown="));

        if (cooldownCookie) {
            const nextResend = parseInt(cooldownCookie.split("=")[1]);
            const now = Date.now();
            if (nextResend > now) {
                setResendTimer(Math.ceil((nextResend - now) / 1000));
            }
        }
    }, []);

    useEffect(() => {
        if (resendTimer > 0) {
            const timer = setInterval(() => {
                setResendTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [resendTimer]);

    const [formData, setFormData] = useState({
        companyName: "",
        companyEmail: "",
        companyNumber: "",
        yearOfEstablishment: "",
        contactPersonName: "",
        contactPersonEmail: "",
        contactPersonNumber: "",
        contactPersonAlterNumber: "",
        contactPersonDesignation: "",
        password: "",
        confirmPassword: "",
        registeredAddress: {
            city: "",
            state: "",
            country: "",
            pinCode: "",
        },
        sameAddress: true,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes(".")) {
            const [parent, child] = name.split(".");
            setFormData((prev) => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value,
                },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSendOtp = async () => {
        if (!formData.companyEmail) {
            setError("Please enter a company email first.");
            return;
        }
        setOtpLoading(true);
        setError("");
        setOtpMessage("");
        try {
            const res = await axios.post("/api/distributor/otp", {
                email: formData.companyEmail,
                name: formData.companyName || "Distributor Request"
            });
            if (res.data?.success) {
                setOtpSent(true);
                setOtpMessage("OTP sent to your email.");

                // Set Cooldown
                const cooldownTime = 60; // 60 seconds
                setResendTimer(cooldownTime);
                const expires = new Date(Date.now() + cooldownTime * 1000).toUTCString();
                document.cookie = `otp_cooldown=${Date.now() + cooldownTime * 1000}; path=/; expires=${expires}`;
            } else {
                setError(res.data?.message || "Failed to send OTP");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send OTP");
        } finally {
            setOtpLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        if (!otp) {
            setError("Please enter the OTP.");
            return;
        }
        setOtpLoading(true);
        setError("");
        try {
            const res = await axios.post("/api/distributor/otp/verify", {
                email: formData.companyEmail,
                otp: otp
            });
            if (res.data?.success) {
                setIsVerified(true);
                setOtpMessage("Email verified successfully!");
                setOtpSent(false); // Hide OTP input after success
            } else {
                setError(res.data?.message || "Verification failed");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Verification failed");
        } finally {
            setOtpLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!isVerified) return;

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const payload = {
                ...formData,
                shippingAddress: formData.sameAddress ? formData.registeredAddress : formData.registeredAddress,
                billingAddress: formData.sameAddress ? formData.registeredAddress : formData.registeredAddress,
            };

            const res = await axios.post("/api/distributor", payload);

            if (res.data?.success) {
                setSuccess(true);
            } else {
                setError(res.data?.message || "Registration failed");
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
                </div>

                <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center relative z-10">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Your distributor application has been submitted successfully. Our team will review your details and contact you shortly.
                    </p>
                    <Link href="/distributor/login" className="inline-block w-full bg-[#160258] text-white py-3.5 rounded-xl font-bold hover:bg-[#1a006d] transition-colors shadow-lg shadow-indigo-900/20">
                        Back to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative font-sans text-gray-900 bg-neutral-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            {/* Background Image */}
            <div className="fixed inset-0 z-0">
                <Image
                    src="/AdminBg.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/10" />
            </div>

            <div className="relative z-10 w-full max-w-5xl">
                <div className="bg-white rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
                    <div className="p-8 sm:p-12">
                        <div className="text-center mb-10">
                            <div className="flex items-center justify-center gap-3 mb-6">
                                <Image
                                    src="/CCMate-Logo.jpg"
                                    alt="Logo"
                                    width={100}
                                    height={200}
                                    className="object-contain h-16 w-auto"
                                />
                                <h1 className="text-2xl leading-5 text-nowrap font-extrabold text-primary/50 border-l-4 bg-linear-to-r from-primary/10 to-transparent border-primary/30 p-2 py-3 tracking-tight uppercase">
                                    Become a Distributor
                                </h1>
                            </div>
                            <p className="mt-2 text-lg text-gray-600 max-w-2xl mx-auto">
                                Join our global network of partners. Fill in your details below to get started.
                            </p>
                        </div>
                        {error && (
                            <div className="mb-8 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
                                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-10">
                            {/* Section 1: Company Details */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">1</div>
                                    <h3 className="text-xl font-bold text-gray-900">Company Information</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="col-span-1">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
                                        <input
                                            type="text"
                                            name="companyName"
                                            required
                                            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            placeholder="e.g. Acme Solutions Ltd."
                                            value={formData.companyName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Year of Establishment *</label>
                                        <input
                                            type="number"
                                            name="yearOfEstablishment"
                                            required
                                            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            placeholder="YYYY"
                                            value={formData.yearOfEstablishment}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Official Email *</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="email"
                                                name="companyEmail"
                                                required
                                                disabled={isVerified}
                                                className={`w-full h-12 px-4 bg-gray-50 border ${isVerified ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200'} rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none`}
                                                placeholder="contact@company.com"
                                                value={formData.companyEmail}
                                                onChange={handleChange}
                                            />
                                            {!isVerified ? (
                                                <button
                                                    type="button"
                                                    onClick={handleSendOtp}
                                                    disabled={otpLoading || !formData.companyEmail || resendTimer > 0}
                                                    className="px-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 whitespace-nowrap min-w-[100px]"
                                                >
                                                    {otpLoading ? "Sending..." : resendTimer > 0 ? `Resend In ${resendTimer}s` : otpSent ? "Resend OTP" : "Verify"}
                                                </button>
                                            ) : (
                                                <span className="flex items-center justify-center px-4 text-green-600 font-bold bg-green-100 rounded-xl">
                                                    Verified
                                                </span>
                                            )}
                                        </div>
                                        {otpSent && !isVerified && (
                                            <div className="mt-3 flex gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="Enter OTP"
                                                    className="w-full h-10 px-4 bg-white border border-gray-300 rounded-lg outline-none focus:border-blue-500"
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value)}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleVerifyOtp}
                                                    disabled={otpLoading}
                                                    className="px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
                                                >
                                                    {otpLoading ? "..." : "Confirm"}
                                                </button>
                                            </div>
                                        )}
                                        {otpMessage && (
                                            <p className={`text-xs mt-1 ${isVerified ? 'text-green-600' : 'text-blue-600'}`}>
                                                {otpMessage}
                                            </p>
                                        )}
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Official Phone *</label>
                                        <input
                                            type="tel"
                                            name="companyNumber"
                                            required
                                            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            placeholder="+1 (555) 000-0000"
                                            value={formData.companyNumber}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-100" />

                            {/* Section 2: Contact Person */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">2</div>
                                    <h3 className="text-xl font-bold text-gray-900">Primary Contact Person</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="col-span-1">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            name="contactPersonName"
                                            required
                                            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            placeholder="John Doe"
                                            value={formData.contactPersonName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Designation *</label>
                                        <input
                                            type="text"
                                            name="contactPersonDesignation"
                                            required
                                            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            placeholder="e.g. Procurement Manager"
                                            value={formData.contactPersonDesignation}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Personal Email *</label>
                                        <input
                                            type="email"
                                            name="contactPersonEmail"
                                            required
                                            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            placeholder="john.doe@company.com"
                                            value={formData.contactPersonEmail}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Direct Phone *</label>
                                        <input
                                            type="tel"
                                            name="contactPersonNumber"
                                            required
                                            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            placeholder="Direct mobile or extension"
                                            value={formData.contactPersonNumber}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Alternate Phone</label>
                                        <input
                                            type="tel"
                                            name="contactPersonAlterNumber"
                                            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            placeholder="Optional"
                                            value={formData.contactPersonAlterNumber}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-100" />

                            {/* Section 3: Password / Security */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-700 flex items-center justify-center font-bold text-sm">3</div>
                                    <h3 className="text-xl font-bold text-gray-900">Security</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="col-span-1">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
                                        <input
                                            type="password"
                                            name="password"
                                            required
                                            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            placeholder="Min. 6 characters"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password *</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            required
                                            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            placeholder="Re-enter password"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-100" />

                            {/* Section 4: Address */}
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm">4</div>
                                    <h3 className="text-xl font-bold text-gray-900">Registered Address</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                                    <div className="col-span-1">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">City *</label>
                                        <input
                                            type="text"
                                            name="registeredAddress.city"
                                            required
                                            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            value={formData.registeredAddress.city}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">State/Province *</label>
                                        <input
                                            type="text"
                                            name="registeredAddress.state"
                                            required
                                            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            value={formData.registeredAddress.state}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Country *</label>
                                        <input
                                            type="text"
                                            name="registeredAddress.country"
                                            required
                                            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            value={formData.registeredAddress.country}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Zip/Pin Code *</label>
                                        <input
                                            type="text"
                                            name="registeredAddress.pinCode"
                                            required
                                            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            value={formData.registeredAddress.pinCode}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8">
                                <button
                                    type="submit"
                                    disabled={loading || !isVerified}
                                    className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-900/20 transition-all transform 
                                        ${!isVerified ? 'bg-gray-400 cursor-not-allowed opacity-70' : 'bg-[#160258] hover:bg-[#1a006d] hover:-translate-y-0.5 active:scale-[0.99] text-white'}
                                    `}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-3">
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Submitting Application...
                                        </span>
                                    ) : (
                                        "Submit Distributor Application"
                                    )}
                                </button>
                                <div className="mt-8 text-center">
                                    <p className="text-gray-600">
                                        Already a partner?{" "}
                                        <Link href="/distributor/login" className="font-semibold text-primary hover:text-[#160258] transition-colors">
                                            Log in to Dashboard
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Footer Copyright */}
                <div className="mt-12 text-center text-sm text-gray-500 pb-8">
                    &copy; {new Date().getFullYear()} CC Matting. All rights reserved.
                </div>
            </div>
        </div>
    );
}
