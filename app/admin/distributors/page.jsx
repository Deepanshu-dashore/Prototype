"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
    MagnifyingGlassIcon,
    UserGroupIcon,
    CheckBadgeIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";

export default function DistributorsPage() {
    const [distributors, setDistributors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [verifyingId, setVerifyingId] = useState(null);

    useEffect(() => {
        fetchDistributors();
    }, []);

    const fetchDistributors = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (searchQuery) params.append("search", searchQuery);

            const res = await axios.get(`/api/distributor?${params.toString()}`);
            if (res.data?.success) {
                setDistributors(res.data.data || []);
            } else {
                setError(res.data?.message || "Failed to fetch distributors");
            }
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (id) => {
        try {
            setVerifyingId(id);
            const res = await axios.patch(`/api/distributor/${id}`, {
                verification: {
                    isVerified: true,
                    verifiedDate: new Date()
                }
            });
            if (res.data?.success) {
                // Update local state
                setDistributors(distributors.map(d =>
                    d._id === id ? { ...d, verification: { ...d.verification, isVerified: true, verifiedDate: new Date() } } : d
                ));
            } else {
                alert(res.data?.message || "Failed to verify distributor");
            }
        } catch (err) {
            alert(err.message || "Something went wrong during verification");
        } finally {
            setVerifyingId(null);
        }
    };

    const formatDate = (date) =>
        date ? new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit", month: "short", year: "numeric"
        }) : "—";

    return (
        <div className="min-h-screen py-8 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Distributor Management</h1>
                        <p className="text-sm text-gray-500 mt-1">Manage and verify registered distributors.</p>
                    </div>
                </div>

                {/* Stats & Search */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <UserGroupIcon className="w-5 h-5 text-gray-400" />
                        <span className="font-semibold">{distributors.length}</span> Total Distributors
                    </div>

                    <div className="relative w-full md:w-72">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search distributors..."
                            className="block w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && fetchDistributors()}
                        />
                        <button
                            onClick={fetchDistributors}
                            className="absolute right-1 top-1 bottom-1 px-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md text-xs font-medium transition-colors"
                            type="button"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px]">
                    {loading ? (
                        <div className="flex items-center justify-center h-40">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                        </div>
                    ) : error ? (
                        <div className="p-8 text-center text-red-500">{error}</div>
                    ) : distributors.length === 0 ? (
                        <div className="p-12 text-center text-gray-500">No distributors found.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50/50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact Person</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Registered</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {distributors.map((dist) => (
                                        <tr key={dist._id} className="hover:bg-gray-50/60 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-gray-900">{dist.companyName}</span>
                                                    <span className="text-xs text-gray-500">{dist.companyEmail}</span>
                                                    <span className="text-xs text-gray-400">{dist.companyNumber}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-gray-700">{dist.contactPersonName}</span>
                                                    <span className="text-xs text-gray-500">{dist.contactPersonNumber}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {dist.verification?.isVerified ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                                        Verified
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-50 text-yellow-700 border border-yellow-100">
                                                        Pending
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {formatDate(dist.createdAt)}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {!dist.verification?.isVerified && (
                                                    <button
                                                        onClick={() => handleVerify(dist._id)}
                                                        disabled={verifyingId === dist._id}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
                                                    >
                                                        {verifyingId === dist._id ? 'Verifying...' : 'Verify'}
                                                        <CheckBadgeIcon className="w-3.5 h-3.5" />
                                                    </button>
                                                )}
                                                {dist.verification?.isVerified && (
                                                    <span className="text-xs text-gray-400 italic">Verified</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
