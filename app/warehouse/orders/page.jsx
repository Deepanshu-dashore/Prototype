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
    ChatBubbleBottomCenterTextIcon
} from "@heroicons/react/24/outline";
import { TableEmptyState, TableLoadingSkeleton } from "@/src/components/ui/TableState";
import ConfirmationModal from "@/src/components/ui/ConfirmationModal";


const STATUS_OPTIONS = [
    "IN PROCESS",
    "READY-TO-SHIP",
    "RECEIVED",
];

export default function WarehouseOrdersPage() {
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
    const [statusCounts, setStatusCounts] = useState({
        PENDING: 0,
        "IN PROCESS": 0,
        "READY-TO-SHIP": 0,
        RECEIVED: 0,

        TOTAL: 0
    });

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
                if (data.statusCounts) {
                    setStatusCounts(data.statusCounts);
                }
            } else {
                setError(res.data?.message || "Failed to fetch orders");
            }
        } catch (err) {
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
                alert("Order status is PENDING, Before updating details, please update the status to IN PROCESS");
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

            case "IN PROCESS":
                return "bg-sky-50 text-sky-700 border-sky-200";

            case "READY-TO-SHIP":
                return "bg-purple-50 text-purple-700 border-purple-200";

            case "RECEIVED":
                return "bg-emerald-50 text-emerald-700 border-emerald-200";



            default:
                return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    const statCards = [
        {
            label: "Pending",
            count: statusCounts.PENDING,
            icon: ({ className, style }) => (
                <svg xmlns="http://www.w3.org/2000/svg" className={className} style={style} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M18.65 19.35L16.5 17.2V14h1v2.79l1.85 1.85zM17 10c.34 0 .67.03 1 .08V5h-2v3H8V5H6v15h4.68A6.995 6.995 0 0 1 17 10m-5-5c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1" opacity={0.3}></path>
                    <path fill="currentColor" d="M17 12c-2.76 0-5 2.24-5 5s2.24 5 5 5s5-2.24 5-5s-2.24-5-5-5m1.65 7.35L16.5 17.2V14h1v2.79l1.85 1.85zM18 3h-3.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H6c-1.1 0-2 .9-2 2v15c0 1.1.9 2 2 2h6.11a6.7 6.7 0 0 1-1.42-2H6V5h2v3h8V5h2v5.08c.71.1 1.38.31 2 .6V5c0-1.1-.9-2-2-2m-6 2c-.55 0-1-.45-1-1s.45-1 1-1s1 .45 1 1s-.45 1-1 1"></path>
                </svg>
            ),
            colorClass: "amber"
        },
        {
            label: "Processed",
            count: statusCounts["IN PROCESS"],
            icon: ({ className, style }) => (
                <svg xmlns="http://www.w3.org/2000/svg" className={className} style={style} viewBox="0 0 256 256">
                    <path fill="currentColor" d="M225.86 102.82c-3.77-3.94-7.67-8-9.14-11.57c-1.36-3.27-1.44-8.69-1.52-13.94c-.15-9.76-.31-20.82-8-28.51s-18.75-7.85-28.51-8c-5.25-.08-10.67-.16-13.94-1.52c-3.56-1.47-7.63-5.37-11.57-9.14C146.28 23.51 138.44 16 128 16s-18.27 7.51-25.18 14.14c-3.94 3.77-8 7.67-11.57 9.14c-3.25 1.36-8.69 1.44-13.94 1.52c-9.76.15-20.82.31-28.51 8s-7.8 18.75-8 28.51c-.08 5.25-.16 10.67-1.52 13.94c-1.47 3.56-5.37 7.63-9.14 11.57C23.51 109.72 16 117.56 16 128s7.51 18.27 14.14 25.18c3.77 3.94 7.67 8 9.14 11.57c1.36 3.27 1.44 8.69 1.52 13.94c.15 9.76.31 20.82 8 28.51s18.75 7.85 28.51 8c5.25.08 10.67.16 13.94 1.52c3.56 1.47 7.63 5.37 11.57 9.14c6.9 6.63 14.74 14.14 25.18 14.14s18.27-7.51 25.18-14.14c3.94-3.77 8-7.67 11.57-9.14c3.27-1.36 8.69-1.44 13.94-1.52c9.76-.15 20.82-.31 28.51-8s7.85-18.75 8-28.51c.08-5.25.16-10.67 1.52-13.94c1.47-3.56 5.37-7.63 9.14-11.57c6.63-6.9 14.14-14.74 14.14-25.18s-7.51-18.27-14.14-25.18m-52.2 6.84l-56 56a8 8 0 0 1-11.32 0l-24-24a8 8 0 0 1 11.32-11.32L112 148.69l50.34-50.35a8 8 0 0 1 11.32 11.32"></path>
                </svg>
            ),
            colorClass: "sky"
        },
        {
            label: "Ready-to-Ship",
            count: statusCounts["READY-TO-SHIP"],
            icon: ({ className, style }) => (
                <svg xmlns="http://www.w3.org/2000/svg" className={className} style={style} viewBox="0 0 24 24">
                    <path fill="currentColor" fillRule="evenodd" d="M6 4.5h3.5v6.625a.75.75 0 0 0 1.5 0V4.5h3.75c.6 0 1 .4 1 1v8.837a3.5 3.5 0 0 0-2 3.163h-1a3.5 3.5 0 0 0-5.5-2.873a3.5 3.5 0 0 0-5.5 2.873c-.6 0-1-.5-1-1v-11c0-.6.4-1 1-1H4.5v6.625a.75.75 0 0 0 1.5 0zm1.25 13a2 2 0 1 1-4 0a2 2 0 0 1 4 0m0 0a2 2 0 1 1 4 0a2 2 0 0 1-4 0m10 2a2 2 0 1 0 0-4a2 2 0 0 0 0 4m0-12V14a3.5 3.5 0 0 1 3.5 3.5h1.5c.6 0 1-.5 1-1v-4.3c0-.4-.3-.8-.7-.9l-2.3-.8l-1.7-2.6c-.2-.2-.5-.4-.8-.4z" clipRule="evenodd"></path>
                </svg>
            ),
            colorClass: "purple"
        },
        {
            label: "Received",
            count: statusCounts.RECEIVED,
            icon: ({ className, style }) => (
                <svg xmlns="http://www.w3.org/2000/svg" className={className} style={style} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M19 6H5a3 3 0 0 0-3 3v2.72L8.837 14h6.326L22 11.72V9a3 3 0 0 0-3-3" opacity={0.5}></path>
                    <path fill="currentColor" d="M10 6V5h4v1h2V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1zm-1.163 8L2 11.72V18a3.003 3.003 0 0 0 3 3h14a3.003 3.003 0 0 0 3-3v-6.28L15.163 14z"></path>
                </svg>
            ),
            colorClass: "emerald"
        },

    ];

    return (
        <div className="min-h-screen py-8 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                                Warehouse Order Management
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">Monitor and manage distributor orders, track status and update documents.</p>
                        </div>

                        {/* Total Orders Card - Separate Style */}
                        <div className="flex items-center gap-3 shrink-0">
                            <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-xs group hover:shadow-md transition-all">
                                <ClipboardDocumentListIcon className="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                                <div className="flex items-center gap-2">
                                    <p className="text-xs text-indigo-600 font-bold uppercase tracking-wider">
                                        Total Orders
                                    </p>
                                    <p className="text-base font-black bg-indigo-900 text-white rounded-md px-2.5 py-0.5 shadow-sm min-w-[32px] text-center">
                                        {loading ? (
                                            <span className="inline-block w-6 h-5 bg-white/20 rounded animate-pulse"></span>
                                        ) : (
                                            statusCounts.TOTAL.toLocaleString()
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status Stats Cards - Integrated Grid (6 status cards) */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 bg-white rounded-xl shadow-sm border border-gray-100 p-3">
                        {statCards.map((card, idx) => (
                            <StatusCountCard
                                key={idx}
                                onclick={() => {
                                    setFilterStatus(card.label.toUpperCase());
                                    fetchOrders(1);
                                }}
                                label={card.label}
                                count={card.count}
                                icon={card.icon}
                                loading={loading}
                                colorClass={card.colorClass}
                            />
                        ))}
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
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order Info</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order Date</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Distributor</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">PO / Invoice</th>
                                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <TableLoadingSkeleton columns={6} rows={10} />
                                ) : error ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-red-500 bg-red-50/20 font-medium">{error}</td>
                                    </tr>
                                ) : orders.length === 0 ? (
                                    <TableEmptyState
                                        colSpan={6}
                                        title="No orders found"
                                        message="No orders match your current filters. Try searching with different keywords."
                                    />
                                ) : (
                                    orders.map((order) => (
                                        <tr key={order._id} className="hover:bg-gray-50/60 transition-colors">
                                            <td className="px-6 py-4 flex items-center gap-2 font-mono text-sm text-gray-800 hover:text-primary">
                                                <div className="p-2 bg-primary/10 rounded-md">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-primary" viewBox="0 0 24 24">
                                                        <path fill="currentColor" d="M21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9z" className="duoicon-secondary-layer" opacity={0.3}></path>
                                                        <path fill="currentColor" d="M20 3a2 2 0 0 1 2 2v3H2V5a2 2 0 0 1 2-2zm-6 10h-4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2" className="duoicon-primary-layer"></path>
                                                    </svg>
                                                </div>
                                                <Link href={`/warehouse/orders/${order._id}`} className="font-semibold text-gray-800 underline-offset-2 hover:text-primary hover:underline">
                                                    #{order._id.slice(-6).toUpperCase()}
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-sm font-medium text-gray-900 line-clamp-1">{order.orderBy?.companyName || "Unknown"}</span>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xs text-gray-500">{order.orderItems?.length || 0} items</span>
                                                        {order.instructions && (
                                                            <span className="text-[9px] text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100 w-fit flex items-center gap-1">
                                                                <ChatBubbleBottomCenterTextIcon className="w-3 h-3" /> Instruction
                                                            </span>
                                                        )}
                                                    </div>
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
                                                        href={`/warehouse/orders/${order._id}`}
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
                                    className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-white"
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

function StatusCountCard({ label, count, icon: Icon, loading, colorClass, onclick }) {
    const colorMap = {
        indigo: { bg: "#eef2ff", border: "#e0e7ff", text: "#4f46e5", badge: "#3730a3" },
        amber: { bg: "#fffbeb", border: "#fef3c7", text: "#d97706", badge: "#92400e" },
        sky: { bg: "#f0f9ff", border: "#e0f2fe", text: "#0284c7", badge: "#075985" },
        purple: { bg: "#f5f3ff", border: "#ede9fe", text: "#7c3aed", badge: "#5b21b6" },
        emerald: { bg: "#ecfdf5", border: "#d1fae5", text: "#059669", badge: "#065f46" },
        teal: { bg: "#f0fdfa", border: "#ccfbf1", text: "#0d9488", badge: "#115e59" },
        rose: { bg: "#fff1f2", border: "#ffe4e6", text: "#e11d48", badge: "#9f1239" }
    };

    const colors = colorMap[colorClass] || colorMap.indigo;

    return (
        <button
            onClick={onclick}
            style={{ backgroundColor: colors.bg, borderColor: colors.border }}
            className={`border rounded-md px-3 py-2 flex items-center gap-2.5 shadow-xs hover:shadow-sm transition-all group`}
        >
            <div style={{ backgroundColor: colors.text + "30" }} className="flex transform-3d transition-all duration-300 items-center justify-center w-12 h-8 rounded-md">
                <Icon className={`w-5 h-5 shrink-0 group-hover:scale-110 transition-transform`} style={{ color: colors.text }} />
            </div>
            <div className="flex items-center justify-between gap-2 w-full">
                <p className="text-xs font-semibold capitalize whitespace-nowrap" style={{ color: colors.text }}>
                    {label}
                </p>
                <div
                    style={{ backgroundColor: colors.badge }}
                    className={`min-w-[32px] text-center font-black text-base text-white rounded-sm px-2 py-0.5 shadow-sm`}
                >
                    {loading ? (
                        <span className="inline-block w-4 h-4 bg-white/20 rounded animate-pulse"></span>
                    ) : (
                        count.toLocaleString()
                    )}
                </div>
            </div>
        </button>
    );
}
