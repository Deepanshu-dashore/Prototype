"use client";

import { useState, useEffect } from "react";
import { useApiClient } from "@/src/config/axios";
import Link from "next/link";
import {
    MagnifyingGlassIcon,
    UserGroupIcon,
    CheckBadgeIcon,
    XCircleIcon,
    EyeIcon,
    TrashIcon,
    KeyIcon,
} from "@heroicons/react/24/outline";
import ConfirmationModal from "@/src/components/ui/ConfirmationModal";
import { TableEmptyState, TableLoadingSkeleton } from "@/src/components/ui/TableState";
import AdminHeader from "@/src/components/admin/AdminHeader";

export default function DistributorsPage() {
    const api = useApiClient();
    const [searchQuery, setSearchQuery] = useState("");
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        limit: 10
    });

    const [deleteModal, setDeleteModal] = useState({ isOpen: false, distId: null });
    const [resetModal, setResetModal] = useState({ isOpen: false, dist: null });

    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    params.append("page", pagination.currentPage);
    params.append("limit", pagination.limit);
    params.append("paginate", "true");

    const queryKey = ["distributors", pagination.currentPage, searchQuery];
    const { data: distributorsData, isLoading: loading, error: fetchError } = api.useGet(
        queryKey,
        `/distributor?${params.toString()}`
    );

    const distributors = distributorsData?.data?.distributors || [];
    const error = fetchError?.message || "";

    useEffect(() => {
        if (distributorsData?.data) {
            setPagination(prev => ({
                ...prev,
                totalPages: distributorsData.data.totalPages,
                totalItems: distributorsData.data.totalItems,
                currentPage: distributorsData.data.currentPage
            }));
        }
    }, [distributorsData]);

    const verifyMutation = api.usePatch(queryKey, "/distributor/verify", {
        onError: (err) => alert(err.response?.data?.message || err.message || "Something went wrong during verification")
    });

    const deleteMutation = api.useDelete(queryKey, "/distributor", {
        onSuccess: () => {
            setDeleteModal({ isOpen: false, distId: null });
        },
        onError: (err) => alert(err.response?.data?.message || err.message || "Something went wrong during deletion")
    });

    const verifyingId = verifyMutation.isPending ? verifyMutation.variables?.id : null;
    const isDeleting = deleteMutation.isPending;

    const resetMutation = api.usePost(queryKey, "/distributor/forget/password-reset", {
        onSuccess: () => {
            setResetModal({ isOpen: false, dist: null });
        },
        onError: (err) => alert(err.response?.data?.message || err.message || "Something went wrong during reset")
    });

    const isResetting = resetMutation.isPending;

    const handleSearch = () => {
        setPagination(prev => ({ ...prev, currentPage: 1 }));
    };

    const handleVerify = (id) => {
        verifyMutation.mutate({ id, data: {} });
    };

    const handleDelete = (id) => {
        setDeleteModal({ isOpen: true, distId: id });
    };

    const confirmDelete = () => {
        if (!deleteModal.distId) return;
        deleteMutation.mutate(deleteModal.distId);
    };

    const confirmReset = (newPassword) => {
        if (!resetModal.dist?._id) return;
        resetMutation.mutate({ id: resetModal.dist._id, data: { password: newPassword } });
    };

    const formatDate = (date) =>
        date ? new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit", month: "short", year: "numeric"
        }) : "—";

    return (
        <div className="min-h-screen pb-8 font-sans">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <AdminHeader
                    title="Distributor Management"
                    subtitle="Manage and verify registered distributors."
                    addOn={
                        <div className="bg-white border border-indigo-100 rounded-lg px-4 py-2.5 flex items-center gap-2">
                            <UserGroupIcon className="w-5 h-5 sm:inline-block hidden text-indigo-600" />
                            <div className="flex items-center gap-2">
                                <p className="text-xs text-indigo-600 font-medium flex items-center gap-1"><span>Total</span>Distributors</p>
                                <p className="text-base font-bold bg-indigo-900 text-white rounded px-2">
                                    {loading ? (
                                        <span className="inline-block w-8 h-5 bg-blue-200 rounded animate-pulse"></span>
                                    ) : (
                                        pagination.totalItems
                                    )}
                                </p>
                            </div>
                        </div>
                    }
                />

                <div className="px-4 sm:px-6 lg:px-8">
                    {/* Stats & Search */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-4 justify-start items-center mb-6">

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
                        <div className="overflow-x-auto w-[calc(100vw-3.5rem)] md:w-[calc(100vw-2rem)] lg:w-auto relative">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-50/50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-nowrap">Contact Person</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Registered</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {loading ? (
                                        <TableLoadingSkeleton rows={5} columns={5} />
                                    ) : error ? (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-12 text-center text-red-500">
                                                {error}
                                            </td>
                                        </tr>
                                    ) : distributors.length === 0 ? (
                                        <TableEmptyState
                                            colSpan={5}
                                            title="No Distributors"
                                            message="No distributor records were found. Try searching with a different term."
                                        />
                                    ) : (
                                        distributors.map((dist) => (
                                            <tr key={dist._id} className="hover:bg-gray-50/60 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium sm:text-base text-sm text-gray-900 text-nowrap">{dist.companyName}</span>
                                                        <span className="text-xs text-gray-500">{dist.companyEmail}</span>
                                                        <span className="text-xs text-gray-400">{dist.companyNumber}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col text-nowrap">
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
                                                <td className="px-6 py-4 text-sm text-gray-500 text-nowrap">
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
                                                        onClick={() => setResetModal({ isOpen: true, dist })}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-amber-500 text-white hover:bg-amber-600 transition-colors"
                                                        title="Update Password"
                                                    >
                                                        Password
                                                        <KeyIcon className="w-3.5 h-3.5" />
                                                    </button>
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
                            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex flex-row items-center justify-between gap-4">
                                <div className="text-sm  sm:inline hidden text-gray-500">
                                    Showing <span className="font-medium text-gray-900">{(pagination.currentPage - 1) * pagination.limit + 1}</span> to <span className="font-medium text-gray-900 sm:inline hidden">{Math.min(pagination.currentPage * pagination.limit, pagination.totalItems)}</span> of <span className="font-medium text-gray-900 sm:inline hidden">{pagination.totalItems}</span> <span className="sm:inline hidden">results</span>
                                </div>
                                <div className="text-sm inline sm:hidden text-gray-500">
                                    Page <span className="font-medium text-gray-900">{pagination.currentPage}</span> of <span className="font-medium text-gray-900">{pagination.totalPages}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setPagination(prev => ({ ...prev, currentPage: Math.max(1, prev.currentPage - 1) }))}
                                        disabled={pagination.currentPage === 1}
                                        className="px-4 py-2 border border-gray-200 rounded-lg sm:text-sm text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                                                        className={`w-10 sm:block hidden h-10 rounded-lg text-sm font-medium transition-all ${pagination.currentPage === pageNum
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
                                        className="px-4 py-2 border border-gray-200 rounded-lg sm:text-sm text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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

                <ResetPasswordModal
                    isOpen={resetModal.isOpen}
                    onClose={() => setResetModal({ isOpen: false, dist: null })}
                    onConfirm={confirmReset}
                    dist={resetModal.dist}
                    isLoading={isResetting}
                />
            </div>
        </div>
    );
}

function ResetPasswordModal({ isOpen, onClose, onConfirm, dist, isLoading }) {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (newPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (newPassword.length < 6) {
            alert("Password must be at least 6 characters");
            return;
        }
        onConfirm(newPassword);
        setNewPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4 transition-all duration-300">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 flex flex-col animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="px-6 py-4 bg-gray-50/80 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-600">
                        <KeyIcon className="w-5 h-5" />
                        <h3 className="text-base font-bold text-gray-900">
                            Update Password
                        </h3>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-5">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-[13px] text-blue-700 leading-relaxed font-medium">
                            Setting a new password for <span className="font-bold">{dist?.companyName}</span>. 
                            <span className="block mt-1 font-normal opacity-80 text-xs">The distributor will be notified of this change by email.</span>
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none transition-all placeholder:text-gray-400"
                                placeholder="Enter new password"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 focus:outline-none transition-all placeholder:text-gray-400"
                                placeholder="Repeat new password"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-100 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-bold text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={isLoading || !newPassword}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold hover:bg-indigo-700 active:scale-95 transition-all shadow-md shadow-indigo-200 disabled:opacity-50 disabled:active:scale-100"
                    >
                        {isLoading ? "Updating..." : "Update Password"}
                    </button>
                </div>
            </div>
        </div>
    );
}
