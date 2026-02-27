"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import {
    ShoppingBagIcon,
    PlusIcon,
    ClockIcon,
    CheckCircleIcon,
    ClipboardDocumentListIcon,
    XMarkIcon,
    CubeIcon,
    ArrowDownCircleIcon,
    EyeIcon,
    ChevronDownIcon,
    TrashIcon
} from "@heroicons/react/24/outline";

export default function DistributorOrdersPage() {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderItems, setOrderItems] = useState([{ product: "" }]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [productList, setProductList] = useState(null);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalItems: 0,
        limit: 10
    });

    useEffect(() => {
        fetchOrders(pagination.currentPage);
        fetchProducts();
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

    const fetchProducts = async () => {
        try {
            const res = await axios.get("/api/product/list?limit=100");
            if (res.data?.success) {
                setProducts(res.data.data.products || []);
            }
        } catch (err) {
            console.error("Error fetching products:", err);
        }
    };

    const handleAddRow = () => {
        setOrderItems([...orderItems, { product: "" }]);
    };

    const handleRemoveRow = (index) => {
        setOrderItems(orderItems.filter((_, i) => i !== index));
    };

    const handleItemChange = (index, value) => {
        if (value && orderItems.some((item, i) => i !== index && item.product === value)) {
            alert("This product is already added to your order.");
            return;
        }
        const newItems = [...orderItems];
        newItems[index].product = value;
        setOrderItems(newItems);
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        const filteredItems = orderItems.filter(item => item.product !== "");
        if (filteredItems.length === 0) {
            alert("Please add at least one product");
            return;
        }

        const productIds = filteredItems.map(item => item.product);
        const hasDuplicates = productIds.some((id, index) => productIds.indexOf(id) !== index);
        if (hasDuplicates) {
            alert("You have duplicate products in your order. Please remove them.");
            return;
        }

        try {
            setIsSubmitting(true);
            const res = await axios.post("/api/order", {
                orderItems: filteredItems
            });
            if (res.data?.success) {
                setIsModalOpen(false);
                setOrderItems([{ product: "" }]);
                fetchOrders();
            } else {
                alert(res.data?.message || "Failed to create order");
            }
        } catch (err) {
            alert(err.response?.data?.message || err.message || "Error creating order");
        } finally {
            setIsSubmitting(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "PENDING":
                return "bg-yellow-100 text-yellow-700 border-yellow-200";

            case "PROCESSED":
                return "bg-blue-100 text-blue-700 border-blue-200";

            case "SHIPPEMENT":
                return "bg-orange-100 text-orange-700 border-orange-200";

            case "DELIVERED":
                return "bg-green-100 text-green-700 border-green-200";

            case "RECEIVED":
                return "bg-teal-100 text-teal-700 border-teal-200";

            case "CANCELLED":
                return "bg-red-100 text-red-700 border-red-200";

            default:
                return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/10 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9z" className="duoicon-secondary-layer" opacity={0.3}></path>
                            <path fill="currentColor" d="M20 3a2 2 0 0 1 2 2v3H2V5a2 2 0 0 1 2-2zm-6 10h-4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2" className="duoicon-primary-layer"></path>
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            My Orders
                        </h1>
                        <p className="text-sm text-gray-500">Track your orders and place new ones</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="bg-indigo-50 border border-indigo-100 rounded-lg px-4 py-2.5 flex items-center gap-2">
                        <ClipboardDocumentListIcon className="w-5 h-5 text-indigo-600" />
                        <div className="flex items-center gap-2">
                            <p className="text-xs text-indigo-600 font-medium">
                                Total Categories
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
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex text-sm items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl hover:bg-primary/90 transition-all shadow-sm font-medium"
                    >
                        <PlusIcon className="w-5 h-5" />
                        New Order
                    </button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                    {error}
                </div>
            )}

            {!loading && orders.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                    <CubeIcon className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900">No Orders Yet</h3>
                    <p className="text-gray-500 mt-2 max-w-xs mx-auto">You haven't placed any orders yet. Click the "New Order" button to get started.</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-xs border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Items</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="px-6 py-4 flex items-center gap-2 font-mono text-sm text-gray-800 hover:text-primary">
                                            <div className="p-2 bg-primary/10 rounded-md">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-primary" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9z" className="duoicon-secondary-layer" opacity={0.3}></path>
                                                    <path fill="currentColor" d="M20 3a2 2 0 0 1 2 2v3H2V5a2 2 0 0 1 2-2zm-6 10h-4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2" className="duoicon-primary-layer"></path>
                                                </svg>
                                            </div>
                                            <Link href={`/distributor/dashboard/orders/${order._id}`} className="hover:underline text-sm underline-offset-2 font-bold">
                                                #{order._id.slice(-6).toUpperCase()}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span onClick={() => setProductList(order._id === productList ? null : order._id)} className="text-sm cursor-pointer flex gap-2 items-center text-gray-900 font-medium">
                                                {order.orderItems?.length || 0} Products <ChevronDownIcon className={`h-4 w-4 p-0.5 border border-gray-300 rounded-sm transition-transform duration-300 ease-in-out ${order._id === productList && "rotate-180"}`} />
                                            </span>
                                            {productList === order._id && <div className="flex absolute flex-col gap-2 mt-2 bg-gray-100 border rounded-sm p-2 w-52 ease-in">
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
                                            {new Date(order.createdAt).toLocaleDateString()}
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
                                ))}
                            </tbody>
                        </table>
                        {isModalOpen && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                                <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-primary/10 rounded-lg">
                                                <PlusIcon className="w-5 h-5 text-primary" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">Place New Order</h3>
                                        </div>
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                                        >
                                            <XMarkIcon className="w-6 h-6" />
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmitOrder}>
                                        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
                                            <p className="text-sm text-gray-500 mb-2">Select the products you wish to order. You can add multiple items.</p>
                                            {orderItems.map((item, index) => (
                                                <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                                                    <div className="flex-1">
                                                        <select
                                                            required
                                                            value={item.product}
                                                            onChange={(e) => handleItemChange(index, e.target.value)}
                                                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                                        >
                                                            <option value="">Select a Product</option>
                                                            {products.map(p => {
                                                                const isSelected = orderItems.some((item, i) => i !== index && item.product === p._id);
                                                                return (
                                                                    <option key={p._id} value={p._id} disabled={isSelected}>
                                                                        {p.code} - {p.description} {isSelected ? "(Already selected)" : ""}
                                                                    </option>
                                                                );
                                                            })}
                                                        </select>
                                                    </div>
                                                    {orderItems.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveRow(index)}
                                                            className="p-2 bg-red-500 text-white rounded-lg transition-colors"
                                                        >
                                                            <TrashIcon className="w-5 h-5" />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}

                                            <button
                                                type="button"
                                                onClick={handleAddRow}
                                                className="flex items-center gap-2 text-primary font-bold text-sm hover:underline py-2"
                                            >
                                                <PlusIcon className="w-4 h-4" />
                                                Add More Items
                                            </button>
                                        </div>

                                        <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setIsModalOpen(false)}
                                                className="flex-1 py-2.5 rounded-xl border border-gray-200 font-bold text-gray-700 hover:bg-white transition-all"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="flex-1 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all disabled:opacity-50 shadow-sm flex items-center justify-center"
                                            >
                                                {isSubmitting ? (
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                                ) : (
                                                    "Place Order"
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
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
                </div>)}
        </div>
    );
}
