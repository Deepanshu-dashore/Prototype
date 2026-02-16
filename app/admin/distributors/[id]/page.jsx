"use client";

import { useState, useEffect, use } from "react";
import axios from "axios";
import Link from "next/link";
import {
    ArrowLeftIcon,
    BuildingOfficeIcon,
    CalendarIcon,
    EnvelopeIcon,
    PhoneIcon,
    UserIcon,
    MapPinIcon,
    CheckBadgeIcon,
    ClockIcon,
    ChatBubbleLeftEllipsisIcon,
    PlusIcon
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

export default function DistributorDetailsPage({ params }) {
    const { id } = use(params);
    const [distributor, setDistributor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchDistributor();
    }, [id]);

    const fetchDistributor = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/distributor/${id}`);
            if (res.data?.success) {
                setDistributor(res.data.data);
            } else {
                setError(res.data?.message || "Failed to fetch distributor");
            }
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) =>
        date ? new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit", month: "short", year: "numeric", hour: '2-digit', minute: '2-digit'
        }) : "—";

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error || !distributor) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-12 text-center">
                <h1 className="text-2xl font-bold text-red-500 mb-4">{error || "Distributor not found"}</h1>
                <Link href="/admin/distributors" className="text-primary hover:underline inline-flex items-center gap-2">
                    <ArrowLeftIcon className="w-4 h-4" /> Back to List
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 font-sans bg-gray-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/admin/distributors" className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all group">
                            <ArrowLeftIcon className="w-5 h-5 text-gray-500 group-hover:text-primary" />
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{distributor.companyName}</h1>
                            <div className="flex items-center gap-2 mt-1">
                                {distributor.verification?.isVerified ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                        <CheckBadgeIcon className="w-3 h-3 mr-1" /> Verified
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-100">
                                        Pending Approval
                                    </span>
                                )}
                                <span className="text-xs text-gray-500">• Registered on {formatDate(distributor.createdAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    {/* Details Column */}
                    <div className="space-y-8">
                        {/* Company & Contact Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Company Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
                            >
                                <div className="flex items-center gap-2 mb-4 text-primary font-semibold text-sm uppercase tracking-wider">
                                    <BuildingOfficeIcon className="w-5 h-5" />
                                    Company Details
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs text-gray-400 font-medium block">Email</label>
                                        <div className="flex items-center gap-2 text-sm text-gray-700 mt-1">
                                            <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                                            {distributor.companyEmail}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 font-medium block">Phone</label>
                                        <div className="flex items-center gap-2 text-sm text-gray-700 mt-1">
                                            <PhoneIcon className="w-4 h-4 text-gray-400" />
                                            {distributor.companyNumber}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 font-medium block">Website</label>
                                        <div className="flex items-center gap-2 text-sm text-gray-700 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                            </svg>
                                            {distributor.website ? (
                                                <a href={distributor.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                                    {distributor.website.replace(/^https?:\/\//, '')}
                                                </a>
                                            ) : "—"}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 font-medium block">LinkedIn</label>
                                        <div className="flex items-center gap-2 text-sm text-gray-700 mt-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                            </svg>
                                            {distributor.linkedin ? (
                                                <a href={distributor.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                                    View Profile
                                                </a>
                                            ) : "—"}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Contact Person Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
                            >
                                <div className="flex items-center gap-2 mb-4 text-blue-600 font-semibold text-sm uppercase tracking-wider">
                                    <UserIcon className="w-5 h-5" />
                                    Contact Person
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs text-gray-400 font-medium block">Name</label>
                                        <div className="flex items-center gap-2 text-sm text-gray-900 font-medium mt-1">
                                            {distributor.contactPersonName}
                                        </div>
                                        <span className="text-xs text-gray-500">{distributor.contactPersonDesignation}</span>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 font-medium block">Email</label>
                                        <div className="flex items-center gap-2 text-sm text-gray-700 mt-1">
                                            <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                                            {distributor.contactPersonEmail}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-400 font-medium block">Phone</label>
                                        <div className="flex items-center gap-2 text-sm text-gray-700 mt-1">
                                            <PhoneIcon className="w-4 h-4 text-gray-400" />
                                            {distributor.contactPersonNumber}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Addresses Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200"
                        >
                            <div className="flex items-center gap-2 mb-6 text-indigo-600 font-semibold text-sm uppercase tracking-wider">
                                <MapPinIcon className="w-5 h-5" />
                                Registered & Shipping Address
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900 mb-3">Registered Address</h4>
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <p>{distributor.registeredAddress?.city}, {distributor.registeredAddress?.state}</p>
                                        <p>{distributor.registeredAddress?.country} - {distributor.registeredAddress?.pinCode}</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900 mb-3">Shipping Address</h4>
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <p>{distributor.shippingAddress?.city}, {distributor.shippingAddress?.state}</p>
                                        <p>{distributor.shippingAddress?.country} - {distributor.shippingAddress?.pinCode}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Order History Table */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-gray-900 font-semibold text-sm uppercase tracking-wider">
                                    <ClockIcon className="w-5 h-5 text-amber-500" />
                                    Order History
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-gray-50/50 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4">Order Date</th>
                                            <th className="px-6 py-4">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {distributor.history && distributor.history.length > 0 ? (
                                            [...distributor.history].reverse().map((item, idx) => (
                                                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                                                        {formatDate(item.date)}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-700 italic">
                                                        "{item.note}"
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="2" className="px-6 py-12 text-center text-gray-400 text-sm italic">
                                                    No orders recorded yet.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
