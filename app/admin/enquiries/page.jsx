"use client";

import { useState, useEffect } from "react";
import { useApiClient } from "@/src/config/axios";
import Link from "next/link";
import {
    DocumentTextIcon,
    MagnifyingGlassIcon,
    EyeIcon,
    TrashIcon,
    ClipboardDocumentListIcon,
    ArrowPathIcon,
    EnvelopeIcon
} from "@heroicons/react/24/outline";
import { TableEmptyState, TableLoadingSkeleton } from "@/src/components/ui/TableState";
import ConfirmationModal from "@/src/components/ui/ConfirmationModal";
import AdminHeader from "@/src/components/admin/AdminHeader";
import ViewEnquiryModal from "@/src/components/admin/ViewEnquiryModal";

export default function AdminEnquiriesPage() {
    const api = useApiClient();
    const [searchQuery, setSearchQuery] = useState("");
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        limit: 10
    });

    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        enquiryId: null
    });

    const [viewModal, setViewModal] = useState({
        isOpen: false,
        enquiry: null
    });

    const params = new URLSearchParams();
    params.append("page", pagination.currentPage);
    params.append("limit", pagination.limit);
    if (searchQuery) params.append("search", searchQuery);

    const queryKey = ["enquiries", pagination.currentPage, searchQuery];
    const { data: enquiriesData, isLoading: loading, error: fetchError } = api.useGet(
        queryKey,
        `/enquiry?${params.toString()}`
    );

    const enquiries = enquiriesData?.data?.enquiries || [];
    const error = fetchError?.message || "";

    useEffect(() => {
        if (enquiriesData?.data) {
            const data = enquiriesData.data;
            setPagination(prev => ({
                ...prev,
                totalItems: data.totalItems || 0,
                totalPages: data.totalPages || 1,
                currentPage: data.currentPage || prev.currentPage
            }));
        }
    }, [enquiriesData]);

    const deleteMutation = api.useDelete(queryKey, "/enquiry", {
        onSuccess: () => {
            setDeleteModal({ isOpen: false, enquiryId: null });
        },
        onError: (err) => alert(err.response?.data?.message || err.message || "Error deleting enquiry")
    });

    const isDeleting = deleteMutation.isPending;

    const handleDelete = () => {
        if (!deleteModal.enquiryId) return;
        deleteMutation.mutate(deleteModal.enquiryId);
    };

    return (
        <div className="min-h-screen pb-8 font-sans">
            <div className="max-w-7xl mx-auto">
                <AdminHeader
                    title="Enquiries Management"
                    subtitle="Monitor and manage all customer enquiries from the contact form."
                    addOn={
                        <div className="bg-white border border-indigo-100 rounded-lg px-4 py-2.5 flex items-center gap-2">
                            <EnvelopeIcon className="w-5 h-5 sm:inline-block hidden text-indigo-600" />
                            <div className="flex items-center gap-2">
                                <p className="text-xs text-indigo-600 font-medium">
                                    Total Enquiries
                                </p>
                                <p className="text-base font-bold bg-indigo-900 text-white rounded px-2">
                                    {loading ? (
                                        <span className="inline-block w-8 h-5 bg-indigo-200 rounded animate-pulse"></span>
                                    ) : (
                                        pagination.totalItems
                                    )}
                                </p>
                            </div>
                        </div>
                    }
                />

                <div className=" px-4 sm:px-6 lg:px-8">
                    {/* Filters Bar */}
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center mb-8">
                        <div className="flex gap-4">
                            {/* Search */}
                            <div className="relative w-full lg:w-96">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by name, email or product..."
                                    className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && setPagination(p => ({ ...p, currentPage: 1 }))}
                                />
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setPagination(p => ({ ...p, currentPage: 1 }))}
                                disabled={loading}
                                className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 shadow-sm transition-all text-sm font-medium disabled:opacity-50"
                            >
                                <MagnifyingGlassIcon className="w-4 h-4" />
                                Search
                            </button>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setPagination(p => ({ ...p, currentPage: 1 }));
                                }}
                                className="p-2.5 text-gray-400 hover:text-red-500 transition-colors border border-gray-200 rounded-lg hover:border-red-200 hover:bg-red-50"
                                title="Reset filters"
                            >
                                <ArrowPathIcon className={`w-4 h-4 ${loading && 'animate-spin'}`} />
                            </button>
                        </div>
                    </div>

                    {/* Enquiries Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px]">
                        <div className="overflow-x-auto w-[calc(100vw-3.5rem)] md:w-[calc(100vw-2rem)] lg:w-auto relative">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-100/70 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">Phone</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">Product</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">Message</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider text-nowrap">Date</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {loading ? (
                                        <TableLoadingSkeleton rows={5} columns={7} />
                                    ) : error ? (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-12 text-center text-red-500">{error}</td>
                                        </tr>
                                    ) : enquiries.length === 0 ? (
                                        <TableEmptyState
                                            colSpan={7}
                                            title="No Enquiries Found"
                                            message="We couldn't find any enquiries matching your search."
                                        />
                                    ) : (
                                        enquiries.map((enquiry, index) => (
                                            <tr key={enquiry._id} className={`hover:bg-gray-50/60 transition-colors ${index % 2 !== 0 ? 'bg-slate-50' : 'bg-white'}`}>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-semibold text-gray-800 capitalize">{enquiry.fullName}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-sm text-gray-700">{enquiry.email}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-sm text-gray-700">{enquiry.phone}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm text-gray-700 line-clamp-2 max-w-[200px]" title={enquiry.productOfInterest}>{enquiry.productOfInterest}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-sm text-gray-700 line-clamp-2 max-w-[250px]" title={enquiry.message}>{enquiry.message || "No message"}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-xs font-medium text-gray-700 text-nowrap">
                                                            {new Date(enquiry.createdAt || new Date()).toDateString()}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => setViewModal({ isOpen: true, enquiry })}
                                                            className="inline-flex items-center gap-1.5 px-2 py-2 bg-primary border border-primary text-white text-[12.25px] rounded-md hover:bg-primary/80 hover:border-primary/20 transition-all shadow-sm"
                                                            title="View Details"
                                                        >
                                                            <EyeIcon className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => setDeleteModal({ isOpen: true, enquiryId: enquiry._id })}
                                                            className="inline-flex items-center gap-1.5 px-2 py-2 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded-md transition-colors"
                                                            title="Delete Enquiry"
                                                        >
                                                            <TrashIcon className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Simple Pagination */}
                        {!loading && enquiries.length > 0 && (
                            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
                                <span className="text-sm text-gray-500">Showing {enquiries.length} of {pagination.totalItems} enquiries</span>
                                <div className="flex gap-2">
                                    <button
                                        disabled={pagination.currentPage === 1}
                                        onClick={() => setPagination(p => ({ ...p, currentPage: p.currentPage - 1 }))}
                                        className="px-3 py-1 text-xs border border-gray-300 bg-white rounded hover:bg-gray-50 hover:shadow-sm disabled:opacity-50 disabled:hover:bg-white"
                                    >
                                        Previous
                                    </button>
                                    <span className="flex items-center px-1 text-xs text-gray-600 font-medium whitespace-nowrap">
                                        Page {pagination.currentPage} of {pagination.totalPages}
                                    </span>
                                    <button
                                        onClick={() => setPagination(p => ({ ...p, currentPage: p.currentPage + 1 }))}
                                        disabled={pagination.currentPage >= pagination.totalPages}
                                        className="px-3 py-1 text-xs border border-gray-300 bg-white rounded hover:bg-gray-50 hover:shadow-sm disabled:opacity-50 disabled:hover:bg-white"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Confirmation Modal for Delete */}
                <ConfirmationModal
                    isOpen={deleteModal.isOpen}
                    onClose={() => setDeleteModal({ isOpen: false, enquiryId: null })}
                    onConfirm={handleDelete}
                    title="Delete Enquiry"
                    message="Are you sure you want to delete this enquiry? This action cannot be undone."
                    type="delete"
                    confirmText="Delete"
                    isLoading={isDeleting}
                />

                {/* View Enquiry Details Modal */}
                <ViewEnquiryModal
                    isOpen={viewModal.isOpen}
                    onClose={() => setViewModal({ isOpen: false, enquiry: null })}
                    enquiry={viewModal.enquiry}
                />
            </div>
        </div>
    );
}
