"use client";

import { useState, useEffect, use } from "react";
import axios from "axios";
import Link from "next/link";
import {
    ArrowLeftIcon,
    BuildingOfficeIcon,
    EnvelopeIcon,
    PhoneIcon,
    UserIcon,
    MapPinIcon,
    CheckBadgeIcon,
    ClockIcon,
    EyeIcon
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

export default function WarehouseDistributorDetailsPage({ params }) {
    const { id } = use(params);
    const [distributor, setDistributor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalItems: 0,
        limit: 10
    });

    useEffect(() => {
        fetchDistributor(pagination.currentPage);
    }, [id, pagination.currentPage]);

    const fetchDistributor = async (page = 1) => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/distributor/admin/${id}?page=${page}&limit=${pagination.limit}`);
            if (res.data?.success) {
                setDistributor(res.data.data);
                setPagination(prev => ({
                    ...prev,
                    totalItems: res.data.data.totalOrders || 0,
                    currentPage: page
                }));
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
                <Link href="/warehouse/distributors" className="text-primary hover:underline inline-flex items-center gap-2">
                    <ArrowLeftIcon className="w-4 h-4" /> Back to List
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-8 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/warehouse/distributors" className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all group">
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
                                            <th className="px-6 py-4">Order ID</th>
                                            <th className="px-6 py-4">Order Date</th>
                                            <th className="px-6 py-4">Items</th>
                                            <th className="px-6 py-4">PO Number</th>
                                            <th className="px-6 py-4">Invoice</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {distributor.history && distributor.history.length > 0 ? (
                                            distributor.history.map((order, idx) => (
                                                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                                    <td className="px-6 py-4 font-mono text-xs font-semibold text-gray-900 capitalize">
                                                        <Link href={`/warehouse/orders/${order._id}`} className="hover:text-primary hover:underline">
                                                            #{order._id?.slice(-6).toUpperCase()}
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                                                        {formatDate(order.createdAt)}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs text-gray-600 font-medium">
                                                        {order.orderItems?.length || 0} Products
                                                    </td>
                                                    <td className="px-6 py-4 text-xs text-gray-500">
                                                        {order.po || "N/A"}
                                                    </td>
                                                    <td className="px-6 py-4 text-xs text-gray-500">
                                                        {order.invoice || "N/A"}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${order.status === 'RECEIVED' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                                            order.status === 'READY-TO-SHIP' ? 'bg-purple-50 text-purple-700 border border-purple-100' :
                                                                order.status === 'IN PROCESS' ? 'bg-sky-50 text-sky-700 border border-sky-100' :
                                                                    order.status === 'CANCELLED' ? 'bg-rose-50 text-rose-700 border border-rose-100' :
                                                                        order.status === 'PENDING' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                                                                            'bg-gray-50 text-gray-700 border border-gray-100'
                                                            }`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <Link
                                                            href={`/warehouse/orders/${order._id}`}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary border border-primary text-white text-[11px] rounded-md hover:bg-primary/80 transition-all shadow-sm"
                                                            title="View Order Details"
                                                        >
                                                            View
                                                            <EyeIcon className="w-3 h-3" />
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="px-6 py-12 text-center text-gray-400 text-sm italic">
                                                    No orders recorded yet.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination Controls */}
                            {distributor.history && distributor.history.length > 0 && (
                                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
                                    <span className="text-sm text-gray-500">
                                        Showing {distributor.history.length} of {pagination.totalItems} orders
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            disabled={pagination.currentPage === 1}
                                            onClick={() => setPagination(p => ({ ...p, currentPage: p.currentPage - 1 }))}
                                            className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md hover:bg-white disabled:opacity-50 transition-colors"
                                        >
                                            Previous
                                        </button>
                                        <button
                                            disabled={pagination.currentPage * pagination.limit >= pagination.totalItems}
                                            onClick={() => setPagination(p => ({ ...p, currentPage: p.currentPage + 1 }))}
                                            className="px-3 py-1.5 text-xs font-medium border border-gray-300 rounded-md hover:bg-white disabled:opacity-50 transition-colors"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
