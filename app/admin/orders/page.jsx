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
    FunnelIcon,
    ChevronDownIcon,
    ChatBubbleBottomCenterTextIcon
} from "@heroicons/react/24/outline";
import { TableEmptyState, TableLoadingSkeleton } from "@/src/components/ui/TableState";
import ConfirmationModal from "@/src/components/ui/ConfirmationModal";
import AdminHeader from "@/src/components/admin/AdminHeader";

const STATUS_OPTIONS = [
    "PENDING",
    "IN PROCESS",
    "READY-TO-SHIP",
    "RECEIVED",
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
    const [statusUpdatingId, setStatusUpdatingId] = useState(null);


    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        orderId: null
    });
    const [editModal, setEditModal] = useState({
        isOpen: false,
        orderId: null,
        status: null,
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // New state for inline status editing
    const [editingStatusOrderId, setEditingStatusOrderId] = useState(null);
    const [tempStatus, setTempStatus] = useState("");

    const [filterStatus, setFilterStatus] = useState("ALL");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [productList, setProductList] = useState(null);

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
            setIsUpdating(true);
            if (!orderId || !newStatus) return;
            const findOrder = orders.find(o => o._id === orderId);
            if (findOrder?.status === newStatus) {
                alert("Order status is already " + newStatus);
                return;
            }

            setStatusUpdatingId(orderId);
            const res = await axios.patch(`/api/order/update-status/${orderId}`, {
                status: newStatus
            });
            if (res.data?.success) {
                setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
                setEditingStatusOrderId(null);
                setIsUpdating(false);
            } else {
                alert(res.data?.message || "Failed to update status");
            }
        } catch (err) {
            alert(err.response?.data?.message || err.message || "Error updating status");
        } finally {
            setStatusUpdatingId(null);
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
                // Reference: Yellow/Orange for Pending
                return "bg-[#fdf3e1] text-[#b67319] border-[#fdf3e1]";

            case "IN PROCESS":
                // Soft Blue for Processed
                return "bg-[#e1f0fd] text-[#1974b6] border-[#e1f0fd]";

            case "READY-TO-SHIP":
                // Soft Purple for Ready to Ship
                return "bg-[#f3e1fd] text-[#8b19b6] border-[#f3e1fd]";

            case "RECEIVED":
                // Reference: Green for Completed/Received
                return "bg-[#dff5e9] text-[#00865a] border-[#dff5e9]";



            default:
                return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    return (
        <div className="min-h-screen py-8 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <AdminHeader
                    title="Order Management"
                    subtitle="Monitor and manage distributor orders, track status and update documents."
                    addOn={
                        <div className="bg-white border border-indigo-100 rounded-lg px-4 py-2.5 flex items-center gap-2">
                            <ClipboardDocumentListIcon className="w-5 h-5 sm:inline-block hidden text-indigo-600" />
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
                    }
                />

                {/* Filters Bar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center mb-8">
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

                    <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 w-full lg:w-auto">
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
                        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 w-full sm:w-auto min-w-fit">
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
                    <div className="overflow-x-auto w-[calc(100vw-3.5rem)] md:w-[calc(100vw-2rem)] lg:w-auto relative">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-100/70 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">Order Info</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">Distributor</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">Products</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider text-nowrap">Order Date</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">PO</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider">Invoice</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-700 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <TableLoadingSkeleton rows={5} columns={8} />
                                ) : error ? (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-12 text-center text-red-500">{error}</td>
                                    </tr>
                                ) : orders.length === 0 ? (
                                    <TableEmptyState
                                        colSpan={8}
                                        title="No Orders Found"
                                        message="We couldn't find any orders matching your filters. Try search or adjust dates."
                                    />
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
                                                <Link href={`/admin/orders/${order._id}`} className="font-semibold text-gray-600 underline-offset-2 hover:text-primary hover:underline">
                                                    #{order._id.slice(-6).toUpperCase()}
                                                </Link>
                                                {order.instructions && (
                                                    <span title="Instruction" className="text-[9px] text-orange-600 animate-pulse font-bold bg-orange-100 px-1.5 py-0.5 rounded border border-orange-300 w-fit flex items-center gap-1">
                                                        <ChatBubbleBottomCenterTextIcon className="w-3 h-3" strokeWidth={2} />
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium text-gray-600 line-clamp-1">{order.orderBy?.companyName || "Unknown"}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1.5">
                                                    <span onClick={() => setProductList(order._id === productList ? null : order._id)} className="text-xs cursor-pointer flex gap-2 items-center text-gray-600 font-medium">
                                                        {order.orderItems?.length || 0} Items <ChevronDownIcon className={`h-4 w-4 p-0.5 border border-gray-300 rounded-sm transition-transform duration-300 ease-in-out ${order._id === productList && "rotate-180"}`} />
                                                    </span>
                                                </div>
                                                {productList === order._id && <div className="flex absolute flex-col gap-2 mt-2 bg-white border rounded-sm p-2 w-52 ease-in z-50 shadow-lg">
                                                    {order?.orderItems.map(item => (<span key={item._id} className="text-[10px] text-gray-500"><span className="w-1.5 my-auto aspect-square rounded-full bg-primary/60 inline-block mx-2"></span>{item.product.code}</span>))
                                                    }
                                                </div>}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-medium text-gray-600 text-nowrap">{new Date(order.createdAt).toDateString()}</span>
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
                                                            onClick={() => setEditModal({ isOpen: true, orderId: order._id, status: tempStatus })}
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
                                                        <span className={`inline-flex text-nowrap justify-center min-w-22 text-center items-center px-2 py-0.5 rounded-sm text-[10px] font-bold ${getStatusColor(order.status)} border shadow-xs`}>
                                                            {order.status}
                                                        </span>
                                                        <button
                                                            onClick={() => {
                                                                setTempStatus(order.status)
                                                                setEditingStatusOrderId(order._id);
                                                            }}
                                                            className="p-1 text-gray-400 hover:text-primary transition-colors hover:bg-gray-100 rounded-md"
                                                        >
                                                            <PencilSquareIcon className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-2 py-4">
                                                <div className="flex flex-col gap-1">
                                                    {order.po ? (
                                                        <>
                                                            <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100 w-fit font-mono">#{order.po}</span>
                                                            {order.poLink?.url && (
                                                                <a
                                                                    href={order.poLink.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-[9px] text-indigo-600 font-bold hover:underline flex items-center gap-1"
                                                                >
                                                                    <EyeIcon className="w-3 h-3" /> View PO
                                                                </a>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <span className="text-xs text-gray-400 italic"># Not added</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-2 py-4">
                                                <div className="flex flex-col gap-1">
                                                    {order.invoice ? (
                                                        <>
                                                            <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-100 w-fit font-mono">#{order.invoice}</span>
                                                            {order.invoiceLink?.url && (
                                                                <a
                                                                    href={order.invoiceLink.url}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-[9px] text-green-600 font-bold hover:underline flex items-center gap-1"
                                                                >
                                                                    <EyeIcon className="w-3 h-3" /> View Invoice
                                                                </a>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <span className="text-xs text-gray-400 italic"># Not added</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/admin/orders/${order._id}`}
                                                        className="inline-flex items-center gap-1.5 px-2 py-2 bg-primary border border-primary text-white text-[12.25px] rounded-md hover:bg-primary/80 hover:border-primary/20 transition-all shadow-sm"
                                                        title="View Details"
                                                    >

                                                        <EyeIcon className="w-4 h-4" />
                                                    </Link>
                                                    {/* 
                                                    <button
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
            <ConfirmationModal
                isOpen={editModal.isOpen}
                icon={({ className }) => (
                    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M5.616 20q-.672 0-1.144-.472T4 18.385V7.486q0-.292.093-.55t.28-.475l1.558-1.87q.217-.293.543-.442T7.173 4h9.616q.372 0 .708.149t.553.441l1.577 1.91q.187.217.28.485q.093.267.093.56v2.32q-.613.039-1.14.268q-.525.229-.985.656L15 13.664V7.808H9v6.788l3-1.5l2.383 1.185l-2.537 2.511V20zm8.615 0v-2.21l5.333-5.307q.148-.13.307-.19q.16-.062.32-.062q.165 0 .334.064q.17.065.298.194l.925.944q.123.148.188.308q.064.159.064.319t-.052.322t-.2.31L16.44 20zm5.96-4.985l.925-.956l-.925-.943l-.95.95zM5.38 6.808H18.6l-1.33-1.596q-.097-.096-.222-.154T16.788 5H7.192q-.134 0-.26.058t-.22.154z"></path>
                    </svg>
                )}
                onClose={() => setEditModal({ isOpen: false, orderId: null, status: null })}
                onConfirm={() => {
                    handleStatusUpdate(editModal.orderId, editModal.status);
                    setEditModal({ isOpen: false, orderId: null, status: null });
                    // setEditingStatusOrderId(null);
                    // setTempStatus(null);
                }}
                title="Status Update"
                message="Are you sure you want to update status of this order?"
                type="edit"
                confirmText="Update Status"
                isLoading={isUpdating}
            />
        </div>
    );
}
