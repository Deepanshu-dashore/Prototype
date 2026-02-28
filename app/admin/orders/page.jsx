"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import {
    DocumentTextIcon,
    ShoppingBagIcon,
    CheckBadgeIcon,
    XCircleIcon,
    TruckIcon,
    ArchiveBoxIcon,
    PencilSquareIcon,
    MagnifyingGlassIcon,
    ArrowPathIcon,
    EyeIcon,
    TrashIcon,
    CubeIcon,
    ClipboardDocumentListIcon,
    FunnelIcon
} from "@heroicons/react/24/outline";
import ConfirmationModal from "@/src/components/ui/ConfirmationModal";

const STATUS_OPTIONS = [
    // "PENDING",
    "PROCESSED",
    "SHIPMENT",
    "DELIVERED",
    "RECEIVED",
    "CANCELLED",
];

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        limit: 10
    });

    const [updateModal, setUpdateModal] = useState({
        isOpen: false,
        orderId: null,
        po: "",
        invoice: "",
        type: "info" // 'info' for PO/Invoice update
    });
    const [isUpdating, setIsUpdating] = useState(false);

    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        orderId: null
    });
    const [isDeleting, setIsDeleting] = useState(false);

    // New state for inline status editing
    const [editingStatusOrderId, setEditingStatusOrderId] = useState(null);
    const [tempStatus, setTempStatus] = useState("");
    const [statusUpdatingId, setStatusUpdatingId] = useState(null);

    const [filterStatus, setFilterStatus] = useState("ALL");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        fetchOrders(pagination.currentPage);
    }, [pagination.currentPage]);

    const fetchOrders = async (page = 1) => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            params.append("page", page);
            params.append("limit", pagination.limit);
            if (searchQuery) params.append("search", searchQuery);
            if (filterStatus && filterStatus !== "ALL") params.append("status", filterStatus);
            if (startDate) params.append("startDate", startDate);
            if (endDate) params.append("endDate", endDate);

            const res = await axios.get(`/api/order?${params.toString()}`);
            if (res.data?.success) {
                const data = res.data.data;
                setOrders(data.orders || []);
                setPagination((prev) => ({
                    ...prev,
                    totalItems: data.totalItems || 0,
                    totalPages: data.totalPages || 1,
                    currentPage: data.currentPage || page,
                }));
            } else {
                setError(res.data?.message || "Failed to fetch orders");
            }
            console.trace("Order details", res.data.data)
        } catch (err) {
            console.log("Order list error", err)
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            if (!orderId || !newStatus) return;
            const findOrder = orders.find(o => o._id === orderId);
            if (findOrder?.status === newStatus) {
                alert("Order status is already " + newStatus);
                return
            };
            if (findOrder?.status === "DELIVERED") {
                alert("Order is already DELIVERED, cannot update to " + newStatus);
                return
            };
            setStatusUpdatingId(orderId);
            const res = await axios.patch(`/api/order/update-status/${orderId}`, {
                status: newStatus
            });
            if (res.data?.success) {
                setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
                setEditingStatusOrderId(null);
            } else {
                alert(res.data?.message || "Failed to update status");
            }
        } catch (err) {
            alert(err.response?.data?.message || err.message || "Error updating status");
        } finally {
            setStatusUpdatingId(null);
        }
    };

    const openUpdateModal = (order) => {
        setUpdateModal({
            isOpen: true,
            orderId: order._id,
            po: order.po || "",
            invoice: order.invoice || "",
            type: "info"
        });
    };

    const handleUpdateDetails = async () => {
        try {
            const findOrder = orders.find(o => o._id === updateModal.orderId);
            if (findOrder?.status === "PENDING") {
                alert("Order status is PENDING, Before updating details, please update the status to PROCESSED");
                return
            };
            setIsUpdating(true);
            const res = await axios.patch(`/api/order/${updateModal.orderId}`, {
                po: updateModal.po,
                invoice: updateModal.invoice
            });
            if (res.data?.success) {
                setOrders(prev => prev.map(o => o._id === updateModal.orderId ? { ...o, po: updateModal.po, invoice: updateModal.invoice } : o));
                setUpdateModal({ ...updateModal, isOpen: false });
            } else {
                alert(res.data?.message || "Failed to update details");
            }
        } catch (err) {
            alert(err.response?.data?.message || err.message || "Error updating details");
        } finally {
            setIsUpdating(false);
        }
    };

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            const res = await axios.delete(`/api/order/${deleteModal.orderId}`);
            if (res.data?.success) {
                setOrders(prev => prev.filter(o => o._id !== deleteModal.orderId));
                setDeleteModal({ isOpen: false, orderId: null });
            } else {
                alert(res.data?.message || "Failed to delete order");
            }
        } catch (err) {
            alert(err.response?.data?.message || err.message || "Error deleting order");
        } finally {
            setIsDeleting(false);
        }
    };

    const getStatusColor = (status) => {
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

    return (
        <div className="min-h-screen py-8 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                            Order Management
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">Monitor and manage distributor orders, track status and update documents.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="bg-white border border-indigo-100 rounded-lg px-4 py-2.5 flex items-center gap-2">
                            <ClipboardDocumentListIcon className="w-5 h-5 text-indigo-600" />
                            <div className="flex items-center gap-2">
                                <p className="text-xs text-indigo-600 font-medium">
                                    Total Orders
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
                    </div>
                </div>

                {/* Filters Bar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col lg:flex-row gap-4 justify-between items-end lg:items-center mb-8">
                    {/* Search */}
                    <div className="relative w-full lg:w-72">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="block w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && fetchOrders(1)}
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                        {/* Status Filter */}
                        <div className="relative">
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 pl-3 pr-8 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary cursor-pointer w-36"
                            >
                                <option value="ALL">All Status</option>
                                {STATUS_OPTIONS.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                            <FunnelIcon className="w-4 h-4 text-gray-400 absolute right-2.5 top-3.5 pointer-events-none" />
                        </div>

                        {/* Date Filters */}
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 min-w-fit">
                            <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
                                Date:
                            </span>
                            <input
                                type="date"
                                className="bg-transparent text-xs border-none p-0 focus:ring-0 text-gray-700 w-24"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                            <span className="text-gray-300">-</span>
                            <input
                                type="date"
                                className="bg-transparent text-xs border-none p-0 focus:ring-0 text-gray-700 w-24"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    setFilterStatus("ALL");
                                    setStartDate("");
                                    setEndDate("");
                                    setSearchQuery("");
                                    fetchOrders(1);
                                }}
                                className="p-2.5 text-gray-400 hover:text-red-500 transition-colors border border-gray-200 rounded-lg hover:border-red-200 hover:bg-red-50"
                                title="Reset Filters"
                            >
                                <ArrowPathIcon className={`w-4 h-4 ${loading && 'animate-spin'}`} />
                            </button>
                            <button
                                onClick={() => fetchOrders(1)}
                                disabled={loading}
                                className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 shadow-sm transition-all text-sm font-medium disabled:opacity-50"
                            >
                                <FunnelIcon className="w-4 h-4" />
                                Apply
                            </button>
                        </div>
                    </div>
                </div>

                {/* Orders Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden min-h-[400px]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-100/70 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">Order Info</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">Order Date</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">Distributor</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">PO / Invoice</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                                                <span className="text-sm text-gray-500">Loading orders...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-red-500">{error}</td>
                                    </tr>
                                ) : orders.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-12 text-center text-gray-500">No orders found.</td>
                                    </tr>
                                ) : (
                                    orders.map((order, index) => (
                                        <tr key={order._id} className={`hover:bg-gray-50/60 transition-colors ${index % 2 !== 0 ? 'bg-slate-50' : 'bg-white'}`}>
                                            <td className="px-6 py-4 flex items-center gap-2 font-mono text-sm text-gray-800 hover:text-primary">
                                                <div className="p-2 bg-primary/10 rounded-md">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-primary" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9z" className="duoicon-secondary-layer" opacity={0.3}></path>
                                                        <path fill="currentColor" d="M20 3a2 2 0 0 1 2 2v3H2V5a2 2 0 0 1 2-2zm-6 10h-4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2" className="duoicon-primary-layer"></path>
                                                    </svg>
                                                </div>
                                                <Link href={`/admin/orders/${order._id}`} className="font-semibold text-gray-800 underline-offset-2 hover:text-primary hover:underline">
                                                    #{order._id.slice(-6).toUpperCase()}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-900 line-clamp-1">{order.orderBy?.companyName || "Unknown"}</span>
                                                    <span className="text-xs text-gray-500">{order.orderItems?.length || 0} items</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {editingStatusOrderId === order._id ? (
                                                    <div className="flex items-center gap-2">
                                                        <select
                                                            value={tempStatus}
                                                            onChange={(e) => setTempStatus(e.target.value)}
                                                            className={`text-xs font-semibold px-2 py-1 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary outline-none`}
                                                        >
                                                            {STATUS_OPTIONS.map(opt => (
                                                                <option key={opt} value={opt}>{opt}</option>
                                                            ))}
                                                        </select>
                                                        <button
                                                            onClick={() => handleStatusUpdate(order._id, tempStatus)}
                                                            disabled={statusUpdatingId === order._id}
                                                            className="p-1 text-green-600 hover:bg-green-100 border border-green-200 bg-green-50 rounded-md transition-colors disabled:opacity-50"
                                                        >
                                                            <CheckBadgeIcon className="w-5 h-5" />
                                                        </button>
                                                        <button
                                                            onClick={() => setEditingStatusOrderId(null)}
                                                            className="p-1 text-red-600 hover:bg-red-100 border border-red-200 bg-red-50 rounded-md transition-colors"
                                                        >
                                                            <XCircleIcon className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <span className={`inline-flex justify-center min-w-22 text-center items-center px-2.5 py-0.5 rounded-sm text-[10px] font-semibold ${getStatusColor(order.status)} border shadow-xs`}>
                                                            {order.status}
                                                        </span>
                                                        <button
                                                            onClick={() => {
                                                                setEditingStatusOrderId(order._id);
                                                                setTempStatus(order.status);
                                                            }}
                                                            className="p-1 text-gray-400 hover:text-primary transition-colors hover:bg-gray-100 rounded-md"
                                                        >
                                                            <PencilSquareIcon className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    {order.po ? (
                                                        <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100 w-fit font-mono">PO: {order.po}</span>
                                                    ) : (
                                                        <span className="text-xs text-gray-400 italic">No PO</span>
                                                    )}
                                                    {order.invoice ? (
                                                        <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-100 w-fit font-mono">INV: {order.invoice}</span>
                                                    ) : (
                                                        <span className="text-xs text-gray-400 italic">No Invoice</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/admin/orders/${order._id}`}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary border border-primary text-white text-[12.25px] rounded-md hover:bg-primary/80 hover:border-primary/20 transition-all shadow-sm"
                                                        title="View Details"
                                                    >
                                                        View
                                                        <EyeIcon className="w-3.5 h-3.5" />
                                                    </Link>
                                                    <button
                                                        onClick={() => openUpdateModal(order)}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-700 border border-emerald-700 text-white text-[12.25px] rounded-md hover:bg-emerald-800 hover:border-emerald-800 transition-all shadow-sm"
                                                        title="Edit Order"
                                                    >
                                                        Edit
                                                        <PencilSquareIcon className="w-3.5 h-3.5" />
                                                    </button>
                                                    {/* <button
                                                        onClick={() => setDeleteModal({ isOpen: true, orderId: order._id })}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-600 border border-red-600 text-white text-[12.25px] rounded-md hover:bg-red-500 hover:border-red-200 transition-all shadow-sm"
                                                        title="Delete Order"
                                                    >
                                                        Delete
                                                        <TrashIcon className="w-3.5 h-3.5" />
                                                    </button> */}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Simple Pagination */}
                    {!loading && orders.length > 0 && (
                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
                            <span className="text-sm text-gray-500">Showing {orders.length} orders</span>
                            <div className="flex gap-2">
                                <button
                                    disabled={pagination.currentPage === 1}
                                    onClick={() => setPagination(p => ({ ...p, currentPage: p.currentPage - 1 }))}
                                    className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-white disabled:opacity-50"
                                >
                                    Previous
                                </button>
                                <button
                                    onClick={() => setPagination(p => ({ ...p, currentPage: p.currentPage + 1 }))}
                                    disabled={10 >= pagination.totalItems}
                                    className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-white disabled:opacity-50"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* PO / Invoice Update Modal */}
            {updateModal.isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500/20 backdrop-blur-[2px]">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                        {/* <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div> */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-10 z-50">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                        <div className="flex items-center gap-2">
                                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <DocumentTextIcon className="h-6 w-6 text-indigo-600" />
                                            </div>
                                            <h3 className="text-lg leading-6 font-medium text-gray-900">Update Order Details</h3>
                                        </div>
                                        <div className="mt-4 space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Order (PO)</label>
                                                <input
                                                    type="text"
                                                    value={updateModal.po}
                                                    onChange={(e) => setUpdateModal({ ...updateModal, po: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                                                    placeholder="Enter PO number"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
                                                <input
                                                    type="text"
                                                    value={updateModal.invoice}
                                                    onChange={(e) => setUpdateModal({ ...updateModal, invoice: e.target.value })}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                                                    placeholder="Enter invoice number"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={handleUpdateDetails}
                                    disabled={isUpdating}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                                >
                                    {isUpdating ? "Updating..." : "Save Changes"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setUpdateModal({ ...updateModal, isOpen: false })}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Confirmation Modal for Delete */}
            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, orderId: null })}
                onConfirm={handleDelete}
                title="Delete Order"
                message="Are you sure you want to delete this order? This action cannot be undone."
                type="delete"
                confirmText="Delete"
                isLoading={isDeleting}
            />
        </div>
    );
}
