"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import {
    MagnifyingGlassIcon,
    UserGroupIcon,
    CheckBadgeIcon,
    XCircleIcon,
    EyeIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import ConfirmationModal from "@/src/components/ui/ConfirmationModal";

export default function DistributorsPage() {
    const [distributors, setDistributors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [verifyingId, setVerifyingId] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, distId: null });
    const [isDeleting, setIsDeleting] = useState(false);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        limit: 10
    });

    useEffect(() => {
        fetchDistributors(pagination.currentPage);
    }, [pagination.currentPage]);

    const fetchDistributors = async (page = 1) => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (searchQuery) params.append("search", searchQuery);
            params.append("page", page);
            params.append("limit", pagination.limit);
            params.append("paginate", "true");

            const res = await axios.get(`/api/distributor?${params.toString()}`);
            if (res.data?.success) {
                setDistributors(res.data.data.distributors || []);
                setPagination(prev => ({
                    ...prev,
                    totalPages: res.data.data.totalPages,
                    totalItems: res.data.data.totalItems,
                    currentPage: res.data.data.currentPage
                }));
            } else {
                setError(res.data?.message || "Failed to fetch distributors");
            }
        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (pagination.currentPage === 1) {
            fetchDistributors(1);
        } else {
            setPagination(prev => ({ ...prev, currentPage: 1 }));
        }
    };

    const handleVerify = async (id) => {
        try {
            setVerifyingId(id);
            const res = await axios.patch(`/api/distributor/verify/${id}`);
            if (res.data?.success) {
                // Update local state
                setDistributors(distributors.map(d =>
                    d._id === id ? { ...d, verification: { ...d.verification, isVerified: true, verifiedDate: new Date() } } : d
                ));
            } else {
                alert(res.data?.message || "Failed to verify distributor");
            }
        } catch (err) {
            alert(err.response?.data?.message || err.message || "Something went wrong during verification");
        } finally {
            setVerifyingId(null);
        }
    };

    const handleDelete = (id) => {
        setDeleteModal({ isOpen: true, distId: id });
    };

    const confirmDelete = async () => {
        if (!deleteModal.distId) return;
        try {
            setIsDeleting(true);
            const res = await axios.delete(`/api/distributor/${deleteModal.distId}`);
            if (res.data?.success) {
                fetchDistributors(pagination.currentPage);
                setDeleteModal({ isOpen: false, distId: null });
            } else {
                alert(res.data?.message || "Failed to delete distributor");
            }
        } catch (err) {
            alert(err.response?.data?.message || err.message || "Something went wrong during deletion");
        } finally {
            setIsDeleting(false);
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
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-2.5 flex items-center gap-2">
                            <UserGroupIcon className="w-5 h-5 text-blue-600" />
                            <div className="flex items-center gap-2">
                                <p className="text-xs text-blue-600 font-medium">Total Distributors</p>
                                <p className="text-base font-bold bg-blue-900 text-white rounded px-2">
                                    {loading ? (
                                        <span className="inline-block w-8 h-5 bg-blue-200 rounded animate-pulse"></span>
                                    ) : (
                                        pagination.totalItems
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats & Search */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 justify-end items-center mb-6">

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
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <button
                            onClick={handleSearch}
                            className="absolute right-1 top-1 bottom-1 px-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md text-xs font-medium transition-colors"
                            type="button"
                        >
                            Search
                        </button>
                    </div>
                </div>

                {/* List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px]">
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
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                                                <span className="text-sm text-gray-500">Loading distributors...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-red-500">
                                            {error}
                                        </td>
                                    </tr>
                                ) : distributors.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                                            No distributors found.
                                        </td>
                                    </tr>
                                ) : (
                                    distributors.map((dist) => (
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
                                            <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                                                {!dist.verification?.isVerified && (
                                                    <button
                                                        onClick={() => handleVerify(dist._id)}
                                                        disabled={verifyingId === dist._id}
                                                        className="inline-flex items-center w-22 justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
                                                    >
                                                        {verifyingId === dist._id ? 'Verifying...' : 'Verify'}
                                                        <CheckBadgeIcon className="w-3.5 h-3.5" />
                                                    </button>
                                                )}
                                                {dist.verification?.isVerified && (
                                                    <button
                                                        disabled={true}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-gray-300 text-gray-600 hover:bg-gray-400 transition-colors disabled:opacity-50"
                                                    >
                                                        Verified
                                                        <CheckBadgeIcon className="w-3.5 h-3.5" />
                                                    </button>
                                                )}
                                                <Link
                                                    href={`/admin/distributors/${dist._id}`}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary border border-primary text-white text-[12.25px] rounded-md hover:bg-primary/80 hover:border-primary/20 transition-all shadow-sm"
                                                    title="View Details">
                                                    View
                                                    <EyeIcon className="w-3.5 h-3.5" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(dist._id)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
                                                    title="Delete Distributor"
                                                >
                                                    Delete
                                                    <TrashIcon className="w-3.5 h-3.5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Controls */}
                    {!loading && distributors.length > 0 && (
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="text-sm text-gray-500">
                                Showing <span className="font-medium text-gray-900">{(pagination.currentPage - 1) * pagination.limit + 1}</span> to <span className="font-medium text-gray-900">{Math.min(pagination.currentPage * pagination.limit, pagination.totalItems)}</span> of <span className="font-medium text-gray-900">{pagination.totalItems}</span> results
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setPagination(prev => ({ ...prev, currentPage: Math.max(1, prev.currentPage - 1) }))}
                                    disabled={pagination.currentPage === 1}
                                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Previous
                                </button>
                                <div className="flex items-center gap-1">
                                    {[...Array(pagination.totalPages)].map((_, i) => {
                                        const pageNum = i + 1;
                                        // Show current page, first, last, and pages around current
                                        if (
                                            pageNum === 1 ||
                                            pageNum === pagination.totalPages ||
                                            (pageNum >= pagination.currentPage - 1 && pageNum <= pagination.currentPage + 1)
                                        ) {
                                            return (
                                                <button
                                                    key={pageNum}
                                                    onClick={() => setPagination(prev => ({ ...prev, currentPage: pageNum }))}
                                                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${pagination.currentPage === pageNum
                                                        ? 'bg-primary text-white shadow-md'
                                                        : 'text-gray-600 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        } else if (
                                            (pageNum === pagination.currentPage - 2 && pageNum > 1) ||
                                            (pageNum === pagination.currentPage + 2 && pageNum < pagination.totalPages)
                                        ) {
                                            return <span key={pageNum} className="px-1 text-gray-400">...</span>;
                                        }
                                        return null;
                                    })}
                                </div>
                                <button
                                    onClick={() => setPagination(prev => ({ ...prev, currentPage: Math.min(prev.totalPages, prev.currentPage + 1) }))}
                                    disabled={pagination.currentPage === pagination.totalPages}
                                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, distId: null })}
                onConfirm={confirmDelete}
                title="Delete Distributor"
                message="Are you sure you want to permanently delete this distributor? This action cannot be undone."
                type="delete"
                confirmText="Delete Distributor"
                isLoading={isDeleting}
            />
        </div>
    );
}
