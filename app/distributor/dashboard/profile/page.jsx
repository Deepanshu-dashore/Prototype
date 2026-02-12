"use client";

import { useState, useEffect } from "react";
import axios from "@/app/lib/utils/axiosConfig";
import Link from "next/link";
import Image from "next/image";
import {
    PencilSquareIcon,
    UserIcon,
    MapPinIcon,
    EnvelopeIcon,
    PhoneIcon,
    BuildingOfficeIcon,
    CalendarDaysIcon
} from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function DistributorProfile() {
    const [distributor, setDistributor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await axios.get("/api/distributor/me");
            if (res.data?.success) {
                setDistributor(res.data.data);
            } else {
                setError(res.data?.message || "Failed to fetch profile");
            }
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
    );

    if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
    if (!distributor) return <div className="p-8 text-center">No profile data found.</div>;

    const showShipping = !!distributor.shippingAddress;
    const showBilling = !!distributor.billingAddress;

    return (
        <div className="max-w-7xl mx-auto pb-10 space-y-8">
            {/* Banner & Header Section */}
            <div className="relative rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-200">
                {/* Banner Image */}
                <div className="relative h-64 w-full bg-gray-900">
                    <Image
                        src="/distributor_profile_banner_1770291446716.png"
                        alt="Profile Banner"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                </div>

                {/* Profile Info Overlay */}
                <div className="absolute top-0 left-0 w-full h-64 p-8 flex flex-col justify-end">
                    <div className="flex items-end gap-6">
                        {/* Profile Picture */}
                        <div className="relative w-32 h-32 rounded-full border-4 border-white bg-white shadow-xl overflow-hidden flex items-center justify-center shrink-0 mb-[-10px]">
                            <div className="pointer-events-none absolute z-10 inset-0 bg-[url('/square.svg')] bg-repeat opacity-[0.08]" aria-hidden />
                            <div className="w-full h-full rounded-full bg-linear-to-br from-indigo-400 to-blue-600 text-white flex items-center justify-center text-4xl font-bold">
                                {distributor.companyName.charAt(0).toUpperCase()}
                            </div>
                        </div>

                        {/* Text Info */}
                        <div className="flex-1 pb-2 text-white shadow-black/50 drop-shadow-md">
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold">{distributor.companyName}</h1>
                                {distributor.verification.isVerified && (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 bg-blue-500 rounded-full p-1" viewBox="0 0 256 256">
                                        <path fill="currentColor" d="M228.75 100.05c-3.52-3.67-7.15-7.46-8.34-10.33c-1.06-2.56-1.14-7.83-1.21-12.47c-.15-10-.34-22.44-9.18-31.27s-21.27-9-31.27-9.18c-4.64-.07-9.91-.15-12.47-1.21c-2.87-1.19-6.66-4.82-10.33-8.34C148.87 20.46 140.05 12 128 12s-20.87 8.46-27.95 15.25c-3.67 3.52-7.46 7.15-10.33 8.34c-2.56 1.06-7.83 1.14-12.47 1.21c-10 .2-22.44.34-31.25 9.2s-9 21.25-9.2 31.25c-.07 4.64-.15 9.91-1.21 12.47c-1.19 2.87-4.82 6.66-8.34 10.33C20.46 107.13 12 116 12 128s8.46 20.87 15.25 28c3.52 3.67 7.15 7.46 8.34 10.33c1.06 2.56 1.14 7.83 1.21 12.47c.15 10 .34 22.44 9.18 31.27s21.27 9 31.27 9.18c4.64.07 9.91.15 12.47 1.21c2.87 1.19 6.66 4.82 10.33 8.34C107.13 235.54 116 244 128 244s20.87-8.46 27.95-15.25c3.67-3.52 7.46-7.15 10.33-8.34c2.56-1.06 7.83-1.14 12.47-1.21c10-.15 22.44-.34 31.27-9.18s9-21.27 9.18-31.27c.07-4.64.15-9.91 1.21-12.47c1.19-2.87 4.82-6.66 8.34-10.33c6.79-7.08 15.25-15.9 15.25-27.95s-8.46-20.87-15.25-27.95m-17.32 39.29c-4.82 5-10.28 10.72-13.19 17.76c-2.82 6.8-2.93 14.16-3 21.29c-.08 5.36-.19 12.71-2.15 14.66s-9.3 2.07-14.66 2.15c-7.13.11-14.49.22-21.29 3c-7 2.91-12.73 8.37-17.76 13.19c-3.6 3.45-8.98 8.61-11.38 8.61s-7.78-5.16-11.34-8.57c-5-4.82-10.72-10.28-17.76-13.19c-6.8-2.82-14.16-2.93-21.29-3c-5.36-.08-12.71-.19-14.66-2.15s-2.07-9.3-2.15-14.66c-.11-7.13-.22-14.49-3-21.29c-2.91-7-8.37-12.73-13.19-17.76C41.16 135.78 36 130.4 36 128s5.16-7.78 8.57-11.34c4.82-5 10.28-10.72 13.19-17.76c2.82-6.8 2.93-14.16 3-21.29C60.88 72.25 61 64.9 63 63s9.3-2.07 14.66-2.15c7.13-.11 14.49-.22 21.29-3c7-2.91 12.73-8.37 17.76-13.19C120.22 41.16 125.6 36 128 36s7.78 5.16 11.34 8.57c5 4.82 10.72 10.28 17.76 13.19c6.8 2.82 14.16 2.93 21.29 3c5.36.08 12.71.19 14.66 2.15s2.07 9.3 2.15 14.66c.11 7.13.22 14.49 3 21.29c2.91 7 8.37 12.73 13.19 17.76c3.41 3.56 8.57 8.94 8.57 11.34s-5.12 7.82-8.53 11.38m-34.94-43.83a12 12 0 0 1 0 17l-56 56a12 12 0 0 1-17 0l-24-24a12 12 0 1 1 17-17L112 143l47.51-47.52a12 12 0 0 1 16.98.03" stroke="currentColor"></path>
                                    </svg>
                                )}
                                <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-medium text-white">
                                    Distributor
                                </span>
                            </div>
                            <p className="text-white/90 font-medium mt-1">{distributor.companyEmail}</p>
                        </div>

                        {/* Edit Button */}
                        <div className="pb-4">
                            <Link
                                href="/distributor/dashboard/profile/edit"
                                className="flex items-center gap-2 bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                <PencilSquareIcon className="w-4 h-4" />
                                Edit
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Areas */}
            <div className="space-y-6">

                {/* Two Column Row: Company Details & Primary Contact */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* 1. Company Information */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col h-full">
                        <h3 className="font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Company Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                    <BuildingOfficeIcon className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-gray-900">Company Name</p>
                                    <p className="text-sm text-gray-500">{distributor.companyName}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                    <CalendarDaysIcon className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-gray-900">Establishment Year</p>
                                    <p className="text-sm text-gray-500">{distributor.yearOfEstablishment}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                    <EnvelopeIcon className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-gray-900">Official Email</p>
                                    <p className="text-sm text-gray-500">{distributor.companyEmail}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                    <PhoneIcon className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-gray-900">Official Phone</p>
                                    <p className="text-sm text-gray-500">{distributor.companyNumber}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Contact Information */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col h-full">
                        <h3 className="font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Primary Contact</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                                    <UserIcon className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-gray-900">Contact Person</p>
                                    <p className="text-sm text-gray-500">{distributor.contactPersonName}</p>
                                    <p className="text-xs text-indigo-500 font-medium">{distributor.contactPersonDesignation}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                                    <EnvelopeIcon className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-gray-900">Email</p>
                                    <p className="text-sm text-gray-500 truncate">{distributor.contactPersonEmail}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center shrink-0">
                                    <PhoneIcon className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-gray-900">Phone</p>
                                    <p className="text-sm text-gray-500">{distributor.contactPersonNumber}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Locations (Stacked 1 by 1) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Locations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 items-start">
                            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm mt-1">
                                <MapPinIcon className="w-5 h-5 text-gray-700" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 mb-1">Registered Address</h4>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {distributor.registeredAddress.street}, {distributor.registeredAddress.additionalInfo && `${distributor.registeredAddress.additionalInfo}, `}
                                    {distributor.registeredAddress.city}, {distributor.registeredAddress.state}, {distributor.registeredAddress.country} - {distributor.registeredAddress.pinCode}
                                </p>
                            </div>
                        </div>

                        {showShipping && (
                            <div className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 items-start">
                                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm mt-1">
                                    <MapPinIcon className="w-5 h-5 text-gray-700" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 mb-1">Shipping Address</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {distributor.shippingAddress.street || distributor.registeredAddress.street}, {distributor.shippingAddress.additionalInfo || distributor.registeredAddress.additionalInfo ? `${distributor.shippingAddress.additionalInfo || distributor.registeredAddress.additionalInfo}, ` : ""}
                                        {distributor.shippingAddress.city || distributor.registeredAddress.city}, {distributor.shippingAddress.state || distributor.registeredAddress.state}, {distributor.shippingAddress.country || distributor.registeredAddress.country} - {distributor.shippingAddress.pinCode || distributor.registeredAddress.pinCode}
                                    </p>
                                </div>
                            </div>
                        )}

                        {showBilling && (
                            <div className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100 items-start">
                                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm mt-1">
                                    <MapPinIcon className="w-5 h-5 text-gray-700" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold text-gray-900 mb-1">Billing Address</h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {distributor.billingAddress.street || distributor.registeredAddress.street}, {distributor.billingAddress.additionalInfo || distributor.registeredAddress.additionalInfo ? `${distributor.billingAddress.additionalInfo || distributor.registeredAddress.additionalInfo}, ` : ""}
                                        {distributor.billingAddress.city || distributor.registeredAddress.city}, {distributor.billingAddress.state || distributor.registeredAddress.state}, {distributor.billingAddress.country || distributor.registeredAddress.country} - {distributor.billingAddress.pinCode || distributor.registeredAddress.pinCode}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
