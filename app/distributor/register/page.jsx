"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "@/app/lib/utils/axiosConfig";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BuildingOfficeIcon } from "@heroicons/react/24/solid";

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
            }, 10000);
            return () => clearInterval(timer);
        }
    }, [resendTimer]);

    const [formData, setFormData] = useState({
        companyName: "",
        companyEmail: "",
        companyNumber: "",
        website: "",
        linkedin: "",
        contactPersonName: "",
        contactPersonEmail: "",
        contactPersonNumber: "",
        contactPersonDesignation: "",
        registeredAddress: {
            street: "",
            city: "",
            state: "",
            country: "",
            pinCode: "",
            additionalInfo: "",
        },
        question1: false,
        question2: "",
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
                name: formData.companyName || "Distributor"
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


    return (
        <div className="min-h-screen relative font-sans text-gray-900 bg-neutral-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            {success && (
                <div className="min-h-screen flex items-center justify-center bg-gray-50/50 backdrop-blur-sm px-4 fixed w-full h-dvh top-0 z-50 overflow-hidden">
                    {/* Background Elements */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
                    </div>

                    <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center relative z-10">
                        <div className="flex items-center justify-center mx-auto mb-6 overflow-hidden">
                            <Image
                                src="/requestSubmit.png"
                                alt="Success"
                                width={420}
                                height={420}
                                className="object-contain scale-105"
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Your distributor application has been submitted successfully. After verification, our team will contact you shortly.
                        </p>
                        <Link href="/" className="inline-block w-full bg-[#160258] text-white py-3.5 rounded-xl font-bold hover:bg-[#1a006d] transition-colors shadow-lg shadow-indigo-900/20">
                            Back to home
                        </Link>
                    </div>
                </div>)}
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
                    <div className="p-8 sm:p-12 sm:pt-8">
                        <div className="text-center mb-10 flex justify-between items-center">
                            <div>
                                <div className="flex items-center justify-start gap-3 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary/80 p-1 bg-primary/10 rounded-md" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M11.792 20.712q-.367 0-.645-.25q-.278-.248-.278-.654q0-.194.085-.43t.254-.405l3.683-3.682l-.552-.552l-3.677 3.682q-.17.17-.383.254q-.213.085-.433.085q-.386 0-.655-.269t-.268-.654q0-.231.094-.451q.095-.22.239-.365l3.683-3.682l-.547-.547L8.71 16.47q-.15.15-.373.245t-.448.094q-.381 0-.652-.271t-.271-.652q0-.22.084-.433t.254-.383l3.452-3.452l-.552-.546l-3.446 3.452q-.144.144-.367.239q-.224.094-.454.094q-.406 0-.665-.259q-.258-.258-.258-.664q0-.22.084-.433q.085-.213.254-.383l4.94-4.94l2.154 2.16q.275.275.621.389q.347.115.702.115q.723 0 1.208-.476t.485-1.217q0-.35-.135-.706q-.135-.355-.421-.642l-2.648-2.648l.98-.98q.33-.324.797-.507q.467-.184.934-.184q.497 0 .97.184q.473.183.807.518L21.03 8.47q.315.316.499.77q.184.453.184 1.005q0 .5-.187.945q-.186.445-.496.755l-8.421 8.427q-.162.162-.38.25q-.216.089-.436.089m-7.594-7.539l-1.035-1.035q-.425-.419-.64-1.007q-.215-.589-.215-1.15q0-.592.192-1.075t.49-.781l3.937-3.942q.323-.323.72-.513q.395-.19.863-.19q.502 0 .92.179q.42.178.766.524l4.164 4.163q.15.15.244.373t.094.423q0 .4-.261.672q-.262.27-.662.27q-.225 0-.433-.081q-.207-.082-.382-.257l-2.674-2.661z"></path>
                                    </svg>
                                    <h1 className="text-2xl leading-5 text-nowrap font-extrabold text-primary/60 border-l-4 bg-linear-to-r from-primary/10 to-transparent border-primary/30 p-2 py-3 tracking-tight uppercase">
                                        Become a Distributor
                                    </h1>
                                </div>
                                <p className="mt-2 text-sm text-gray-500 max-w-2xl mx-auto">
                                    Join our global network of partners. Fill in your details below to get started.
                                </p>
                            </div>
                            <Image
                                src="/CCMate-Logo.jpg"
                                alt="Logo"
                                width={100}
                                height={200}
                                className="object-contain h-16 w-auto"
                            />
                        </div>
                        {error && (
                            <div className="mb-8 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
                                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Section 1: Company Details */}
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                                            <path fill="currentColor" fillRule="evenodd" d="M13 3a2 2 0 0 1 1.995 1.85L15 5v14h1V9.5a.5.5 0 0 1 .41-.492L16.5 9H18a2 2 0 0 1 1.995 1.85L20 11v8h1a1 1 0 0 1 .117 1.993L21 21H3a1 1 0 0 1-.117-1.993L3 19h1V5a2 2 0 0 1 1.85-1.995L6 3z" className="duoicon-secondary-layer" opacity={0.3}></path>
                                            <path fill="currentColor" fillRule="evenodd" d="M11 7H8v2h3zm0 4H8v2h3zm0 4H8v2h3z" className="duoicon-primary-layer"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">Company Information</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 border p-5 rounded-xl">
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
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Company Website</label>
                                        <input
                                            type="url"
                                            name="website"
                                            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            placeholder="https://www.company.com"
                                            value={formData.website}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="email"
                                                name="companyEmail"
                                                required
                                                disabled={isVerified}
                                                className={`w-full h-12 px-4 bg-gray-50 border ${isVerified ? 'border-blue-600 border-2 bg-blue-50 text-blue-700' : 'border-gray-200'} rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none`}
                                                placeholder="contact@company.com"
                                                value={formData.companyEmail}
                                                onChange={handleChange}
                                            />
                                            {!isVerified ? (
                                                <button
                                                    type="button"
                                                    onClick={handleSendOtp}
                                                    disabled={otpLoading || !formData.companyEmail || resendTimer > 0}
                                                    className="px-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 whitespace-nowrap min-w-[110px]"
                                                >
                                                    {otpLoading ? "Sending..." : resendTimer > 0 ? `Resend ${resendTimer}s` : otpSent ? "Resend OTP" : "Verify"}
                                                </button>
                                            ) : (
                                                <span className="flex items-center justify-center px-4 text-white text-sm gap-1 font-semibold bg-blue-600 rounded-xl">

                                                    Verified
                                                    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16">
                                                        <path fill="currentColor" fillRule="evenodd" d="M15 8c0 .982-.472 1.854-1.202 2.402a3 3 0 0 1-.848 2.547a3 3 0 0 1-2.548.849A3 3 0 0 1 8 15a3 3 0 0 1-2.402-1.202a3 3 0 0 1-2.547-.848a3 3 0 0 1-.849-2.548A3 3 0 0 1 1 8c0-.982.472-1.854 1.202-2.402a3 3 0 0 1 .848-2.547a3 3 0 0 1 2.548-.849A3 3 0 0 1 8 1c.982 0 1.854.472 2.402 1.202a3 3 0 0 1 2.547.848c.695.695.978 1.645.849 2.548A3 3 0 0 1 15 8m-3.291-2.843a.75.75 0 0 1 .135 1.052l-4.25 5.5a.75.75 0 0 1-1.151.043l-2.25-2.5a.75.75 0 1 1 1.114-1.004l1.65 1.832l3.7-4.789a.75.75 0 0 1 1.052-.134" clipRule="evenodd"></path>
                                                    </svg>
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
                                            <p className={`text-xs mt-1 ${isVerified ? 'text-emerald-500' : 'text-blue-600'}`}>
                                                {otpMessage}
                                            </p>
                                        )}
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone No. *</label>
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
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20">
                                            <path fill="currentColor" d="M10 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-4.991 9A2 2 0 0 0 3 13c0 1.691.833 2.966 2.135 3.797C6.417 17.614 8.145 18 10 18q.536 0 1.056-.043a2.2 2.2 0 0 1 .516-1.975l.545-.607a2.07 2.07 0 0 1 2.009-.629l.785.186c.378-.312.607-.68.712-1.121l-.518-.506a1.94 1.94 0 0 1-.457-2.077l.086-.228zm10.575.582l.283-.75c.258-.681 1.062-1.017 1.74-.728l.388.166c.473.202.864.568.947 1.06c.457 2.725-1.908 6.601-4.63 7.59c-.492.178-1.023.04-1.445-.246l-.346-.235a1.184 1.184 0 0 1-.204-1.79l.545-.607a1.07 1.07 0 0 1 1.034-.323l1.225.29q1.457-.91 1.562-2.56l-.878-.859a.94.94 0 0 1-.221-1.008"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">Primary Contact Person</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6  border p-5 rounded-xl">
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
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
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
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone No. *</label>
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
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn Profile</label>
                                        <input
                                            type="url"
                                            name="linkedin"
                                            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            placeholder="https://www.linkedin.com/company/..."
                                            value={formData.linkedin}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-100" />

                            {/* Section 4: Address */}
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center font-bold text-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20">
                                            <path fill="currentColor" d="M9 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-4.991 9A2 2 0 0 0 2 13c0 1.691.833 2.966 2.135 3.797C5.417 17.614 7.145 18 9 18q.617 0 1.21-.057A5.48 5.48 0 0 1 9 14.5c0-1.33.472-2.55 1.257-3.5zM14.5 19a4.5 4.5 0 1 0 0-9a4.5 4.5 0 0 0 0 9m0-7a.5.5 0 0 1 .5.5V14h1.5a.5.5 0 0 1 0 1H15v1.5a.5.5 0 0 1-1 0V15h-1.5a.5.5 0 0 1 0-1H14v-1.5a.5.5 0 0 1 .5-.5"></path>
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900">Registered Address</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6 border p-5 rounded-xl">
                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address *</label>
                                        <input
                                            type="text"
                                            name="registeredAddress.street"
                                            required
                                            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            placeholder="123 Main St, Apt 4B"
                                            value={formData.registeredAddress.street}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-span-1 md:col-span-2">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Info</label>
                                        <input
                                            type="text"
                                            name="registeredAddress.additionalInfo"
                                            className="w-full h-12 px-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            placeholder="Landmark, building name, etc."
                                            value={formData.registeredAddress.additionalInfo}
                                            onChange={handleChange}
                                        />
                                    </div>
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
                            <div className="text-gray-600 mt-5">
                                <div className="flex gap-16">
                                    <p>
                                        <span className="h-2 w-2 bg-primary rounded-full inline-block mr-2"></span>
                                        Is your company currently active in the cleanroom and/or contamination control industry?</p>
                                    <div className="flex gap-10">
                                        <label className="flex gap-2">
                                            <input onChange={handleChange} id="question1-yes" type="radio" name="question1" value={true} />
                                            <label htmlFor="question1-yes" className="cursor-pointer">Yes</label>
                                        </label>
                                        <label className="flex gap-2">
                                            <input onChange={handleChange} id="question1-no" type="radio" name="question1" value={false} />
                                            <label htmlFor="question1-no" className="cursor-pointer">No</label>
                                        </label>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <p>
                                        <span className="h-2 w-2 bg-primary rounded-full inline-block mr-2"></span>
                                        Please provide a brief overview of your company, including your experience in the industry, target markets, and how you see CCMatting products adding value to your business.</p>
                                    <div className="flex gap-10">
                                        <textarea
                                            onChange={handleChange}
                                            value={formData.question2}
                                            required
                                            className="w-full px-4 py-2 mt-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                            name="question2" id="question2" cols="30" rows="5"></textarea>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-4 border-t border-gray-100">
                                <p className="text-[13px] text-gray-500 text-center leading-relaxed">
                                    By submitting this application, you agree to CC Matting's{" "}
                                    <a
                                        href="/Ts-Cs-2026.pdf"
                                        target="_blank"
                                        className="text-primary hover:text-[#160258] transition-colors underline underline-offset-4 decoration-primary/20"
                                    >
                                        Terms and Conditions
                                    </a>{" "}
                                    and{" "}
                                    <a
                                        href="/privacy-policy"
                                        target="_blank"
                                        className="text-primary hover:text-[#160258] transition-colors underline underline-offset-4 decoration-primary/20"
                                    >
                                        Privacy Policy
                                    </a>
                                    .
                                </p>
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
                                        Already a distributor?{" "}
                                        <Link href="/distributor/login" className="font-semibold text-primary hover:text-[#160258] transition-colors">
                                            Log in
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Footer Copyright */}
                <div className="mt-12 text-center text-sm text-white pb-8">
                    &copy; {new Date().getFullYear()} CC Matting. All rights reserved.
                </div>
            </div>
        </div>
    );
}
