"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApiClient } from "@/src/config/axios";
import {
    ArrowLeftIcon,
    ShoppingCartIcon,
    PlusIcon,
    TrashIcon,
    DocumentTextIcon,
    UserGroupIcon,
    ClipboardDocumentCheckIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function AddOrderPage() {
    const router = useRouter();
    const api = useApiClient();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Form states
    const [selectedDistributorId, setSelectedDistributorId] = useState("");
    const [poNumber, setPoNumber] = useState("");
    const [poFile, setPoFile] = useState(null);
    const [instructions, setInstructions] = useState("");
    const [items, setItems] = useState([
        { productId: "", quantity: 1, length: "" }
    ]);

    // Fetch distributors & products
    const { data: distributorsData, isLoading: loadingDistributors } = api.useGet(
        "distributors-select-list",
        "/distributor/list"
    );

    const { data: productsData, isLoading: loadingProducts } = api.useGet(
        "products-list",
        "/product/list?limit=200"
    );

    const distributors = Array.isArray(distributorsData?.data) ? distributorsData.data : [];
    const products = productsData?.data?.products || [];

    const handleAddItem = () => {
        setItems(prev => [...prev, { productId: "", quantity: 1, length: "" }]);
    };

    const handleRemoveItem = (index) => {
        setItems(prev => prev.filter((_, idx) => idx !== index));
    };

    const handleItemChange = (index, field, value) => {
        setItems(prev => {
            const copy = [...prev];
            copy[index][field] = value;
            return copy;
        });
    };

    const addOrderMutation = api.usePost(null, "/order", {
        onSuccess: () => {
            setSuccess(true);
            setTimeout(() => {
                router.push("/admin/orders");
            }, 1500);
        },
        onError: (err) => {
            setError(err.response?.data?.message || err.message || "Failed to place order");
            setLoading(false);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!selectedDistributorId) {
            setError("Please select a distributor");
            return;
        }

        // Validate items
        const invalidItem = items.some(item => !item.productId || !item.quantity || !item.length);
        if (invalidItem) {
            setError("Please fill in all product fields (Product, Quantity, and Length)");
            return;
        }

        setLoading(true);

        const formDataToSend = new FormData();
        if (poFile) {
            formDataToSend.append("purchaseOrder", poFile);
        }
        formDataToSend.append("distributorId", selectedDistributorId);
        formDataToSend.append("po", poNumber);
        formDataToSend.append("instructions", instructions);
        formDataToSend.append("orderItems", JSON.stringify(
            items.map(item => ({
                product: item.productId,
                quantity: parseInt(item.quantity, 10),
                length: parseFloat(item.length)
            }))
        ));

        addOrderMutation.mutate(formDataToSend);
    };

    return (
        <div className="min-h-screen pb-12 font-sans bg-gray-50/50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex items-center gap-4 pt-8">
                    <Link
                        href="/admin/orders"
                        className="inline-flex items-center justify-center p-2 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-gray-700 hover:shadow-sm transition-all"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                    </Link>
                    <div>
                        <span className="text-xs font-bold text-primary/60 uppercase tracking-widest">Administration</span>
                        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">Create Order</h1>
                    </div>
                </div>

                {success && (
                    <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-emerald-600 shrink-0">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <p className="font-bold text-sm">Order Created Successfully!</p>
                            <p className="text-xs text-emerald-600 mt-0.5">Redirecting to orders list...</p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-600 shrink-0">
                            <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                        </svg>
                        <p className="font-medium text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    {/* Section 1: Distributor & PO Details */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                            <UserGroupIcon className="w-5 h-5 text-indigo-600" />
                            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Order & Distributor Details</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Select Distributor *</label>
                                <select
                                    required
                                    value={selectedDistributorId}
                                    onChange={(e) => setSelectedDistributorId(e.target.value)}
                                    className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm cursor-pointer"
                                >
                                    <option value="">-- Choose Distributor --</option>
                                    {loadingDistributors ? (
                                        <option disabled>Loading distributors...</option>
                                    ) : (
                                        distributors.map(dist => (
                                            <option key={dist._id} value={dist._id}>
                                                {dist.companyName} ({dist.companyEmail})
                                            </option>
                                        ))
                                    )}
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Purchase Order (PO) Number</label>
                                    <input
                                        type="text"
                                        className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                                        placeholder="e.g. PO-987654"
                                        value={poNumber}
                                        onChange={(e) => setPoNumber(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Upload PO Document (PDF)</label>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer pt-1"
                                        onChange={(e) => setPoFile(e.target.files[0] || null)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Products List */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ShoppingCartIcon className="w-5 h-5 text-indigo-600" />
                                <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Order Items</h2>
                            </div>
                            <button
                                type="button"
                                onClick={handleAddItem}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 rounded-lg text-xs font-bold text-indigo-700 transition-colors"
                            >
                                <PlusIcon className="w-3.5 h-3.5" />
                                Add Item
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            {items.length === 0 ? (
                                <p className="text-center text-sm text-gray-400 py-4">No products added. Click &quot;Add Item&quot; to begin.</p>
                            ) : (
                                <div className="space-y-3">
                                    {items.map((item, idx) => (
                                        <div key={idx} className="flex flex-col md:flex-row gap-3 items-end bg-gray-50/50 p-4 rounded-xl border border-gray-100 animate-in fade-in duration-200">
                                            {/* Index badge */}
                                            <div className="flex flex-col items-center justify-end shrink-0 w-full md:w-auto">
                                                <span className="hidden md:block text-[10px] font-bold text-transparent select-none mb-1">#</span>
                                                <span className="w-8 h-10 rounded-lg bg-gray-200 text-gray-600 text-xs font-bold flex items-center justify-center">
                                                    {idx + 1}
                                                </span>
                                            </div>

                                            {/* Product selection */}
                                            <div className="flex-1 w-full">
                                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Product *</label>
                                                <select
                                                    required
                                                    value={item.productId}
                                                    onChange={(e) => handleItemChange(idx, "productId", e.target.value)}
                                                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-xs cursor-pointer"
                                                >
                                                    <option value="">-- Choose Product --</option>
                                                    {loadingProducts ? (
                                                        <option disabled>Loading products...</option>
                                                    ) : (
                                                        products.map(p => (
                                                            <option key={p._id} value={p._id}>
                                                                {p.code} - {p.description.slice(0, 50)}...
                                                            </option>
                                                        ))
                                                    )}
                                                </select>
                                            </div>

                                            {/* Length */}
                                            <div className="w-full md:w-32">
                                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Length (m) *</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    required
                                                    placeholder="Length"
                                                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-xs"
                                                    value={item.length}
                                                    onChange={(e) => handleItemChange(idx, "length", e.target.value)}
                                                />
                                            </div>

                                            {/* Quantity */}
                                            <div className="w-full md:w-32">
                                                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Quantity *</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    required
                                                    placeholder="Quantity"
                                                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-xs"
                                                    value={item.quantity}
                                                    onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
                                                />
                                            </div>

                                            {/* Actions */}
                                            <div className="w-full md:w-auto shrink-0">
                                                <span className="hidden md:block text-[10px] font-bold text-transparent select-none mb-1">Delete</span>
                                                <button
                                                    type="button"
                                                    disabled={items.length === 1}
                                                    onClick={() => handleRemoveItem(idx)}
                                                    className="h-10 w-full md:w-10 rounded-lg border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 transition-colors disabled:opacity-50 disabled:hover:bg-red-50 flex justify-center items-center"
                                                    title="Remove Item"
                                                >
                                                    <TrashIcon className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Section 3: Special Instructions */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                            <DocumentTextIcon className="w-5 h-5 text-indigo-600" />
                            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Special Instructions</h2>
                        </div>
                        <div className="p-6">
                            <textarea
                                rows="3"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm placeholder:text-gray-400"
                                placeholder="Enter packaging, delivery or special instruction notes..."
                                value={instructions}
                                onChange={(e) => setInstructions(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-4 pt-2">
                        <Link
                            href="/admin/orders"
                            className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:bg-gray-100 transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={loading || success}
                            className="px-8 py-3 bg-[#160258] text-white rounded-xl text-sm font-bold hover:bg-[#1a006d] hover:-translate-y-0.5 active:scale-98 transition-all shadow-md shadow-indigo-900/20 disabled:opacity-50 disabled:transform-none"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Placing Order...
                                </span>
                            ) : (
                                "Place Order"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
