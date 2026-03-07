"use client";

import { useState, useEffect } from "react";
import axios from "@/app/lib/utils/axiosConfig";
import Link from "next/link";
import {
    PlusIcon,
    ClipboardDocumentListIcon,
    EyeIcon,
    ChevronDownIcon,
    ChatBubbleBottomCenterTextIcon
} from "@heroicons/react/24/outline";
import { TableEmptyState, TableLoadingSkeleton } from "@/src/components/ui/TableState";

export default function DistributorOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [productList, setProductList] = useState(null);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalItems: 0,
        limit: 10
    });

    useEffect(() => {
        fetchOrders(pagination.currentPage);
    }, [pagination.currentPage]);

    const fetchOrders = async (page = 1) => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/order/distributor?page=${page}&limit=${pagination.limit}`);
            if (res.data?.success) {
                setOrders(res.data.data.orders || []);
                setPagination(prev => ({
                    ...prev,
                    totalItems: res.data.data.totalItems || 0,
                    currentPage: page
                }));
            } else {
                setError(res.data?.message || "Failed to fetch orders");
            }
        } catch (err) {
            setError(err.message || "Something went wrong fetching orders");
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "PENDING":
                return "bg-amber-50 text-amber-700 border-amber-200";

            case "PROCESSED":
                return "bg-sky-50 text-sky-700 border-sky-200";

            case "READY-TO-SHIP":
                return "bg-purple-50 text-purple-700 border-purple-200";

            case "RECEIVED":
                return "bg-emerald-50 text-emerald-700 border-emerald-200";

            default:
                return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-primary" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9z" className="duoicon-secondary-layer" opacity={0.3}></path>
                            <path fill="currentColor" d="M20 3a2 2 0 0 1 2 2v3H2V5a2 2 0 0 1 2-2zm-6 10h-4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2" className="duoicon-primary-layer"></path>
                        </svg>
                    </div>
                    <div>
                        <h1 className="md:text-2xl text-lg font-bold text-gray-800">
                            My Orders
                        </h1>
                        <p className="md:text-sm md:inline hidden text-[10px] text-gray-500">Track your orders and place new ones</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-white border border-indigo-100 rounded-lg px-4 py-2.5 flex items-center gap-2">
                        <ClipboardDocumentListIcon className="w-5 h-5 text-indigo-600" />
                        <div className="flex items-center gap-2">
                            <p className="text-xs text-indigo-600 font-medium">
                                Total <span className="md:inline hidden">Orders</span>
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
                    <Link
                        href="/distributor/dashboard/orders/new"
                        className="inline-flex text-sm items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-all shadow-sm font-medium"
                    >
                        <PlusIcon className="w-5 h-5" />
                        <span className="md:block hidden">New Order</span>
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xs border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Items</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-nowrap">Order Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-nowrap">Instructions</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-nowrap">
                            {loading ? (
                                <TableLoadingSkeleton columns={5} rows={5} />
                            ) : error ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-red-500 font-medium bg-red-50/30">
                                        {error}
                                    </td>
                                </tr>
                            ) : orders.length === 0 ? (
                                <TableEmptyState
                                    colSpan={5}
                                    title="No orders found"
                                    message="You haven't placed any orders yet. Click 'New Order' to get started."
                                />
                            ) : (
                                orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 flex items-center gap-2 font-mono text-sm text-gray-800 hover:text-primary">
                                            <div className="p-2 bg-primary/10 rounded-md">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-primary" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9z" className="duoicon-secondary-layer" opacity={0.3}></path>
                                                    <path fill="currentColor" d="M20 3a2 2 0 0 1 2 2v3H2V5a2 2 0 0 1 2-2zm-6 10h-4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2" className="duoicon-primary-layer"></path>
                                                </svg>
                                            </div>
                                            <Link href={`/distributor/dashboard/orders/${order._id}`} className="hover:underline text-sm underline-offset-2 font-semibold">
                                                #{order._id.slice(-6).toUpperCase()}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1.5">
                                                <span onClick={() => setProductList(order._id === productList ? null : order._id)} className="text-sm cursor-pointer flex gap-2 items-center text-gray-900 font-medium">
                                                    {order.orderItems?.length || 0} Products <ChevronDownIcon className={`h-4 w-4 p-0.5 border border-gray-300 rounded-sm transition-transform duration-300 ease-in-out ${order._id === productList && "rotate-180"}`} />
                                                </span>
                                            </div>
                                            {productList === order._id && <div className="flex absolute flex-col gap-2 mt-2 bg-gray-100 border rounded-sm p-2 w-52 ease-in z-50 shadow-lg">
                                                {order?.orderItems.map(item => (<span key={item._id} className="text-[10px] text-gray-500"><span className="w-1.5 my-auto aspect-square rounded-full bg-primary/60 inline-block mx-2"></span>{item.product.code}</span>))
                                                }
                                            </div>}
                                        </td>


                                        <td className="px-6 py-4">
                                            <span className={`inline-flex min-w-22 text-center items-center justify-center px-2.5 py-0.5 rounded-sm text-[10px] font-semibold ${getStatusColor(order.status)} border shadow-xs`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(order.createdAt).toDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            {order.instructions ? (
                                                <span className="text-[9px] text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100 w-fit flex items-center gap-1">
                                                    <ChatBubbleBottomCenterTextIcon className="w-3 h-3" /> Instruction
                                                </span>
                                            ) : (<span className="text-gray-400 text-sm capitalize">not available</span>)}
                                        </td>
                                        <td className="px-6 py-3 text-right">
                                            <Link
                                                href={`/distributor/dashboard/orders/${order._id}`}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary border border-gray-200 text-white text-[12.25px] rounded-lg hover:text-white hover:bg-primary/90 hover:border-primary/20 transition-all shadow-xs"
                                                title="View Details"
                                            >
                                                View
                                                <EyeIcon className="w-3.5 h-3.5" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {!loading && orders.length > 0 && (
                    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                            Showing {orders.length} of {pagination.totalItems} orders
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
            </div>
        </div>
    );
}
