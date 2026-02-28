"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import {
    ChevronLeftIcon,
    CubeIcon,
    PencilIcon,
    PrinterIcon,
    CheckCircleIcon,
    BuildingOfficeIcon,
    DocumentTextIcon,
    ClipboardDocumentListIcon
} from "@heroicons/react/24/outline";

export default function AdminOrderDetailsPage() {
    const params = useParams();
    const id = params?.id;
    const router = useRouter();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (id) fetchOrderDetails();
    }, [id]);

    const fetchOrderDetails = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/order/${id}`);
            if (res.data?.success) {
                setOrder(res.data.data);
            } else {
                setError(res.data?.message || "Failed to fetch order details");
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "PENDING":
                return "bg-amber-50 text-amber-700 border-amber-200";

            case "PROCESSED":
                return "bg-sky-50 text-sky-700 border-sky-200";

            case "SHIPMENT":
                return "bg-purple-50 text-purple-700 border-purple-200";

            case "DELIVERED":
                return "bg-emerald-50 text-emerald-700 border-emerald-200";

            case "RECEIVED":
                return "bg-teal-50 text-teal-700 border-teal-200";

            case "CANCELLED":
                return "bg-rose-50 text-rose-700 border-rose-200";

            default:
                return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleString("en-US", {
            day: 'numeric', month: 'short', year: 'numeric',
            hour: 'numeric', minute: '2-digit', hour12: true
        });
    };

    if (loading) return (
        <div className="flex justify-center flex-col gap-3 items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-primary"></div>
            <p className="text-gray-400 text-sm animate-pulse">Loading details...</p>
        </div>
    );

    if (error) return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="text-center">
                <p className="text-red-500 text-sm mb-4">{error}</p>
                <button onClick={() => router.back()} className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                    &larr; Go Back
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen py-8 font-sans pb-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">

                {/* Header Section */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <button
                            onClick={() => router.back()}
                            className="mt-1 p-1 text-gray-500 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-200"
                        >
                            <ChevronLeftIcon className="w-5 h-5" strokeWidth={2.5} />
                        </button>
                        <div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                                    Order #{order?._id?.slice(-6).toUpperCase()}
                                </h1>
                                <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold ${getStatusStyle(order?.status)}`}>
                                    {order?.status || "UNKNOWN"}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">
                                {formatDate(order?.createdAt)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Fake Dropdown for status to match design */}
                        {/* <div className="px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-bold text-gray-700 flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
                            {order?.status || "Status"}
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        <button className="px-4 py-2 border border-gray-200 bg-white rounded-lg text-sm font-bold text-gray-700 flex items-center gap-2 hover:bg-gray-50 transition-colors">
                            <PrinterIcon className="w-4 h-4" /> Print
                        </button> */}
                        {/* <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors">
                            <PencilIcon className="w-4 h-4" /> Edit
                        </button> */}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Details Card */}
                        <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 p-6">
                            <div className="flex items-center gap-2 border-b border-dashed border-gray-200 pb-2.5">
                                <div>
                                    <CubeIcon className="w-7 h-7 text-primary/50 bg-primary/10 p-1 rounded-md" />
                                </div>
                                <h3 className="text-base font-bold text-gray-800">Product Details</h3>
                                <p className="text-sm text-gray-500 ml-auto">Total Items: {order?.orderItems?.length}</p>
                            </div>
                            <div className="flex items-center justify-between py-2.5 px-3 bg-gray-100">
                                <p className="text-sm text-gray-600 font-semibold">Product Code</p>
                                <p className="text-sm text-gray-600 font-semibold">Product Description</p>
                            </div>
                            <div className="space-y-2.5">
                                {order?.orderItems?.map((item, index) => (
                                    <div key={index} className="flex items-start justify-between pt-2.5 border-t border-dashed border-gray-200">
                                        <div className="flex gap-4 items-center">
                                            <div className="w-8 h-8 rounded-md bg-primary/10 p-0.5 flex flex-col items-center justify-center shrink-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary/60" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9z" className="duoicon-secondary-layer" opacity={0.3}></path>
                                                    <path fill="currentColor" d="M20 3a2 2 0 0 1 2 2v3H2V5a2 2 0 0 1 2-2zm-6 10h-4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2" className="duoicon-primary-layer"></path>
                                                </svg>
                                            </div>
                                            <p className="font-semibold text-gray-700 text-xs">{item.product?.code || "Unknown Product"}</p>
                                        </div>
                                        <div className="text-left flex items-center gap-6">
                                            <p className="text-xs text-gray-400 mt-1 line-clamp-1">{item.product?.description || "No description provided"}</p>
                                        </div>
                                    </div>
                                ))}
                                {(!order?.orderItems || order.orderItems.length === 0) && (
                                    <p className="text-sm text-gray-500 py-4">No items found in this order.</p>
                                )}
                            </div>

                        </div>

                        {/* History Card */}
                        <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 p-6">
                            <div className="flex items-center gap-2 mb-6 border-b border-dashed border-gray-200 pb-2.5">
                                <div>
                                    <ClipboardDocumentListIcon className="w-7 h-7 text-primary/50 bg-primary/10 p-1 rounded-md" />
                                </div>
                                <h3 className="text-base font-bold text-gray-800">History</h3>
                            </div>
                            <div className="space-y-6 pl-2">
                                {/* Last Updated */}
                                <div className="relative pl-6">
                                    <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50"></div>
                                    <div className="absolute -left-px top-5 w-px h-full bg-gray-200"></div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">Order {order?.status?.toLowerCase() || "updated"}</p>
                                        <p className="text-xs text-gray-400 mt-1">{formatDate(order?.updatedAt)}</p>
                                    </div>
                                </div>

                                {/* Order Placed */}
                                <div className="relative pl-6">
                                    <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-300 ring-4 ring-gray-50"></div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-600">Order placed</p>
                                        <p className="text-xs text-gray-400 mt-1">{formatDate(order?.createdAt)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">

                        {/* Customer / Distributor Card */}
                        <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 p-6">
                            <div className="flex items-center gap-2 mb-6 border-b border-dashed border-gray-200 pb-2.5">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-primary/50 bg-primary/10 p-1 rounded-md" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M18 15h-2v2h2m0-6h-2v2h2m2 6h-8v-2h2v-2h-2v-2h2v-2h-2V9h8M10 7H8V5h2m0 6H8V9h2m0 6H8v-2h2m0 6H8v-2h2M6 7H4V5h2m0 6H4V9h2m0 6H4v-2h2m0 6H4v-2h2m6-10V3H2v18h20V7z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-base font-bold text-gray-800">Distributor</h3>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="space-y-1">
                                    <p className="font-semibold text-sm text-gray-600 border-b border-dashed border-gray-200 py-2.5"><span className="mr-2 text-gray-800 font-semibold">Name:</span>{order?.orderBy?.companyName || "Unknown"}</p>
                                    <p className="text-sm text-gray-600 border-b border-dashed border-gray-200 py-2.5"><span className="mr-2 text-gray-800 font-semibold">Email:</span>{order?.orderBy?.companyEmail || "No email"}</p>
                                    {order?.orderBy?.companyNumber && (
                                        <p className="text-xs text-gray-600 mt-1 border-b border-dashed border-gray-200 py-2.5"><span className="mr-2 text-gray-800 font-semibold">Phone:</span>{order.orderBy.companyNumber}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Delivery / Documents Card */}
                        <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 p-6">
                            <div className="flex items-center gap-2 mb-6 border-b border-dashed border-gray-200 pb-2.5">
                                <div>
                                    <DocumentTextIcon className="w-7 h-7 text-primary/50 bg-primary/10 p-1 rounded-md" />
                                </div>
                                <h3 className="text-base font-bold text-gray-800">Documents</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <span className="text-sm text-gray-800 font-semibold">PO Number:</span>
                                    <span className="text-sm col-span-2 text-gray-600">{order?.po || "N/A"}</span>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <span className="text-sm text-gray-800 font-semibold">Invoice:</span>
                                    <span className="text-sm col-span-2 text-gray-600">{order?.invoice || "N/A"}</span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div >
    );
}
