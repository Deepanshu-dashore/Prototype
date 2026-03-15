"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { use } from "react";
import {
    ChevronLeftIcon,
    PrinterIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function EnquiryDetailsPage({ params }) {
    const router = useRouter();
    const resolvedParams = use(params);
    const { id } = resolvedParams;

    const [enquiry, setEnquiry] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (id) fetchEnquiryDetails();
    }, [id]);

    const fetchEnquiryDetails = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/enquiry/${id}`);
            if (res.data?.success) {
                setEnquiry(res.data.data);
            } else {
                setError(res.data?.message || "Failed to fetch enquiry details");
            }
        } catch (err) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center flex-col gap-3 items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-primary"></div>
            <p className="text-gray-400 text-sm animate-pulse">Loading enquiry details...</p>
        </div>
    );

    if (error || !enquiry) return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="text-center">
                <p className="text-red-500 text-sm mb-4">{error || "Enquiry not found"}</p>
                <button onClick={() => router.back()} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    &larr; Go Back
                </button>
            </div>
        </div>
    );

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleString("en-US", {
            day: 'numeric', month: 'short', year: 'numeric',
            hour: 'numeric', minute: '2-digit', hour12: true
        });
    };

    return (
        <div className="min-h-screen py-8 font-sans bg-gray-50 md:bg-gray-50">
            <div className="max-w-2xl mx-auto px-4 sm:px-6">

                {/* Header Actions */}
                <div className="mb-6 flex items-center justify-between">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                    >
                        <ChevronLeftIcon className="w-5 h-5" strokeWidth={2.5} />
                        Back to Enquiries
                    </button>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-white border border-gray-200 text-gray-600 rounded-md shadow-sm">
                        ID #{id?.slice(-6).toUpperCase()}
                    </span>
                </div>

                {/* Clean Tabular Data Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
                        <h1 className="text-lg font-bold text-gray-900 tracking-tight flex items-center justify-between">
                            Customer Enquiry Details
                            <span className="text-xs font-medium text-gray-500">{formatDate(enquiry.createdAt)}</span>
                        </h1>
                    </div>

                    <div className="p-0">
                        <table className="w-full text-left border-collapse">
                            <tbody className="divide-y divide-gray-100">
                                <tr className="hover:bg-gray-50/30 transition-colors">
                                    <th className="w-1/3 px-6 py-4 text-sm font-semibold text-gray-500 bg-gray-50/30 border-r border-gray-100 align-top">
                                        Full Name
                                    </th>
                                    <td className="w-2/3 px-6 py-4 text-sm font-semibold text-gray-900 capitalize">
                                        {enquiry.fullName || "N/A"}
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50/30 transition-colors">
                                    <th className="w-1/3 px-6 py-4 text-sm font-semibold text-gray-500 bg-gray-50/30 border-r border-gray-100 align-top">
                                        Phone Number
                                    </th>
                                    <td className="w-2/3 px-6 py-4 text-sm font-medium text-gray-900 font-mono">
                                        {enquiry.phone || "N/A"}
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50/30 transition-colors">
                                    <th className="w-1/3 px-6 py-4 text-sm font-semibold text-gray-500 bg-gray-50/30 border-r border-gray-100 align-top">
                                        Email Address
                                    </th>
                                    <td className="w-2/3 px-6 py-4 text-sm font-medium text-indigo-600">
                                        <a href={`mailto:${enquiry.email}`} className="hover:underline">
                                            {enquiry.email || "N/A"}
                                        </a>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50/30 transition-colors">
                                    <th className="w-1/3 px-6 py-4 text-sm font-semibold text-gray-500 bg-gray-50/30 border-r border-gray-100 align-top">
                                        Product of Interest
                                    </th>
                                    <td className="w-2/3 px-6 py-4 text-sm text-gray-700">
                                        <span className="inline-block px-2.5 py-1 bg-gray-100 rounded-md border border-gray-200">
                                            {enquiry.productOfInterest || "N/A"}
                                        </span>
                                    </td>
                                </tr>
                                <tr className="hover:bg-gray-50/30 transition-colors">
                                    <th className="w-1/3 px-6 py-4 text-sm font-semibold text-gray-500 bg-gray-50/30 border-r border-gray-100 align-top">
                                        Message
                                    </th>
                                    <td className="w-2/3 px-6 py-4 text-sm font-medium text-gray-700 whitespace-pre-wrap leading-relaxed min-h-[100px]">
                                        {enquiry.message || <span className="text-gray-400 italic">No message provided</span>}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
