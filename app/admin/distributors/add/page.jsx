"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApiClient } from "@/src/config/axios";
import {
    ArrowLeftIcon,
    BuildingOfficeIcon,
    UserIcon,
    MapPinIcon,
    ChatBubbleLeftEllipsisIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function AddDistributorPage() {
    const router = useRouter();
    const api = useApiClient();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

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

    const addMutation = api.usePost(null, "/distributor", {
        onSuccess: () => {
            setSuccess(true);
            setTimeout(() => {
                router.push("/admin/distributors");
            }, 1500);
        },
        onError: (err) => {
            setError(err.response?.data?.message || err.message || "Failed to create distributor");
            setLoading(false);
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const payload = {
            ...formData,
            shippingAddress: formData.registeredAddress,
            billingAddress: formData.registeredAddress,
        };

        addMutation.mutate(payload);
    };

    return (
        <div className="min-h-screen pb-12 font-sans bg-gray-50/50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex items-center gap-4 pt-8">
                    <Link
                        href="/admin/distributors"
                        className="inline-flex items-center justify-center p-2 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-gray-700 hover:shadow-sm transition-all"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                    </Link>
                    <div>
                        <span className="text-xs font-bold text-primary/60 uppercase tracking-widest">Administration</span>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">Add New Distributor</h1>
                    </div>
                </div>

                {success && (
                    <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-emerald-600 shrink-0">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <p className="font-bold text-sm">Distributor Created Successfully!</p>
                            <p className="text-xs text-emerald-600 mt-0.5">Redirecting to distributors list...</p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600 shrink-0">
                            <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                        </svg>
                        <p className="font-medium text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {/* Section 1: Company Details */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                            <BuildingOfficeIcon className="w-5 h-5 text-indigo-600" />
                            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Company Information</h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Company Name *</label>
                                <input
                                    type="text"
                                    name="companyName"
                                    required
                                    className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                                    placeholder="e.g. Cleanroom Supplies Ltd."
                                    value={formData.companyName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Company Website</label>
                                <input
                                    type="url"
                                    name="website"
                                    className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                                    placeholder="https://www.website.com"
                                    value={formData.website}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Company Email *</label>
                                <input
                                    type="email"
                                    name="companyEmail"
                                    required
                                    className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                                    placeholder="info@company.com"
                                    value={formData.companyEmail}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Company Phone *</label>
                                <input
                                    type="tel"
                                    name="companyNumber"
                                    required
                                    className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                                    placeholder="+353 (0) 1234567"
                                    value={formData.companyNumber}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Contact Person */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                            <UserIcon className="w-5 h-5 text-indigo-600" />
                            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Primary Contact Person</h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    name="contactPersonName"
                                    required
                                    className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                                    placeholder="John Doe"
                                    value={formData.contactPersonName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Designation *</label>
                                <input
                                    type="text"
                                    name="contactPersonDesignation"
                                    required
                                    className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                                    placeholder="e.g. Sales Manager"
                                    value={formData.contactPersonDesignation}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Direct Email *</label>
                                <input
                                    type="email"
                                    name="contactPersonEmail"
                                    required
                                    className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                                    placeholder="john.doe@company.com"
                                    value={formData.contactPersonEmail}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Direct Phone *</label>
                                <input
                                    type="tel"
                                    name="contactPersonNumber"
                                    required
                                    className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                                    placeholder="+353 (87) 1234567"
                                    value={formData.contactPersonNumber}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">LinkedIn Profile</label>
                                <input
                                    type="url"
                                    name="linkedin"
                                    className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                                    placeholder="https://linkedin.com/in/username"
                                    value={formData.linkedin}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Registered Address */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                            <MapPinIcon className="w-5 h-5 text-indigo-600" />
                            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Registered Address</h2>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Street Address *</label>
                                <input
                                    type="text"
                                    name="registeredAddress.street"
                                    required
                                    className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                                    placeholder="Unit 5, Business Park"
                                    value={formData.registeredAddress.street}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Additional Info</label>
                                <input
                                    type="text"
                                    name="registeredAddress.additionalInfo"
                                    className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                                    placeholder="Near landmark, building name, etc."
                                    value={formData.registeredAddress.additionalInfo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">City *</label>
                                <input
                                    type="text"
                                    name="registeredAddress.city"
                                    required
                                    className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                                    placeholder="Dublin"
                                    value={formData.registeredAddress.city}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">State/Province *</label>
                                <input
                                    type="text"
                                    name="registeredAddress.state"
                                    required
                                    className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                                    placeholder="Leinster"
                                    value={formData.registeredAddress.state}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Country *</label>
                                <input
                                    type="text"
                                    name="registeredAddress.country"
                                    required
                                    className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                                    placeholder="Ireland"
                                    value={formData.registeredAddress.country}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Zip/Pin Code *</label>
                                <input
                                    type="text"
                                    name="registeredAddress.pinCode"
                                    required
                                    className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                                    placeholder="D02 YV58"
                                    value={formData.registeredAddress.pinCode}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Industry details */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                            <ChatBubbleLeftEllipsisIcon className="w-5 h-5 text-indigo-600" />
                            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Industry & Business Info</h2>
                        </div>
                        <div className="p-6 space-y-5">
                            <div>
                                <p className="text-sm text-gray-700 font-medium mb-3">
                                    Is the company currently active in the cleanroom/contamination control industry?
                                </p>
                                <div className="flex gap-8">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="question1"
                                            checked={formData.question1 === true}
                                            onChange={() => setFormData(prev => ({ ...prev, question1: true }))}
                                            className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-primary focus:ring-2"
                                        />
                                        <span className="text-sm text-gray-700">Yes</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="question1"
                                            checked={formData.question1 === false}
                                            onChange={() => setFormData(prev => ({ ...prev, question1: false }))}
                                            className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-primary focus:ring-2"
                                        />
                                        <span className="text-sm text-gray-700">No</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-gray-700 font-medium mb-2">
                                    Brief overview of the company, experience and targets
                                </label>
                                <textarea
                                    name="question2"
                                    rows="4"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm placeholder:text-gray-400"
                                    placeholder="Enter details about experience, target markets, value add, etc."
                                    value={formData.question2}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-4 pt-2">
                        <Link
                            href="/admin/distributors"
                            className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={loading || success}
                            className="px-8 py-3 bg-[#160258] text-white rounded-xl text-sm font-bold hover:bg-[#1a006d] hover:-translate-y-0.5 active:scale-98 transition-all shadow-md shadow-indigo-900/20 disabled:opacity-50 disabled:transform-none"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Creating...
                                </span>
                            ) : (
                                "Create Distributor"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
