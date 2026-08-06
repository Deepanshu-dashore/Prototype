"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useApiClient } from "@/src/config/axios";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import {
    ArrowLeftIcon,
    ShoppingCartIcon,
    PlusIcon,
    TrashIcon,
    DocumentTextIcon,
    UserGroupIcon,
    ClipboardDocumentCheckIcon,
    ChevronDownIcon,
    CheckBadgeIcon,
    ExclamationCircleIcon
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
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [poNumber, setPoNumber] = useState("");
    const [isNewDistributorFormVisible, setIsNewDistributorFormVisible] = useState(false);
    const [newDistributor, setNewDistributor] = useState({
        companyName: "",
        companyEmail: "",
        companyNumber: "",
        registeredAddress: {
            street: "",
            city: "",
            state: "",
            country: "Ireland",
            pinCode: ""
        }
    });
    const [poFile, setPoFile] = useState(null);
    const [instructions, setInstructions] = useState("");
    const [items, setItems] = useState([
        { productId: "", quantity: 1, length: "" }
    ]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
            toast.success("Order created successfully!");
            setTimeout(() => {
                router.push("/admin/orders");
            }, 1500);
        },
        onError: (err) => {
            const errorMsg = err.response?.data?.message || err.message || "Failed to place order";
            setError(errorMsg);
            toast.error(errorMsg);
            setLoading(false);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!isNewDistributorFormVisible && !selectedDistributorId) {
            setError("Please select a distributor or create a new one");
            return;
        }

        if (isNewDistributorFormVisible) {
            if (!newDistributor.companyName || !newDistributor.companyEmail || !newDistributor.companyNumber) {
                setError("Please fill in all required new distributor fields");
                return;
            }
            if (!newDistributor.registeredAddress.street || !newDistributor.registeredAddress.city) {
                setError("Please fill in the registered address for the new distributor");
                return;
            }
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

        if (isNewDistributorFormVisible) {
            formDataToSend.append("isNewDistributor", "true");
            formDataToSend.append("newDistributor", JSON.stringify(newDistributor));
        } else {
            formDataToSend.append("distributorId", selectedDistributorId);
        }

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
            {/* Header Section */}
            <div className="bg-white border-b border-gray-100 mb-6">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
                    <Link
                        href="/admin/orders"
                        className="inline-flex items-center justify-center p-2 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-gray-700 hover:shadow-sm transition-all"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                    </Link>
                    <div>
                        <span className="text-xs font-bold text-primary/60 uppercase tracking-widest block">Administration</span>
                        <h1 className="text-base sm:text-lg sm:text-nowrap font-bold text-gray-900 tracking-tight">Create Order</h1>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

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
                    <div className="bg-white rounded-xl shadow-xs border border-gray-200">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                            <UserGroupIcon className="w-5 h-5 text-indigo-600" />
                            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Order & Distributor Details</h2>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Select Distributor *</label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1" ref={dropdownRef}>
                                        <button
                                            type="button"
                                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                            className="w-full h-11 px-4 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm cursor-pointer flex items-center justify-between"
                                            disabled={isNewDistributorFormVisible}
                                        >
                                            <span className="truncate">
                                                {isNewDistributorFormVisible
                                                    ? "-- Creating New Distributor --"
                                                    : selectedDistributorId
                                                        ? `${distributors.find(d => d._id === selectedDistributorId)?.companyName} (${distributors.find(d => d._id === selectedDistributorId)?.companyEmail})`
                                                        : "-- Choose Distributor --"}
                                            </span>
                                            <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        <AnimatePresence>
                                            {isDropdownOpen && !isNewDistributorFormVisible && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.15, ease: "easeInOut" }}
                                                    className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-sm max-h-[280px] overflow-y-auto"
                                                >
                                                    {loadingDistributors ? (
                                                        <div className="px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
                                                            <svg className="animate-spin h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            Loading distributors...
                                                        </div>
                                                    ) : distributors.length === 0 ? (
                                                        <div className="px-4 py-3 text-sm text-gray-500">No distributors found</div>
                                                    ) : (
                                                        distributors.map(dist => (
                                                            <div
                                                                key={dist._id}
                                                                onClick={() => {
                                                                    setSelectedDistributorId(dist._id);
                                                                    setIsDropdownOpen(false);
                                                                }}
                                                                className={`px-4 py-2.5 text-sm hover:bg-gray-50 cursor-pointer flex items-center justify-between border-b border-gray-50 last:border-0 ${selectedDistributorId === dist._id ? 'bg-indigo-50/50' : ''}`}
                                                            >
                                                                <div className="flex flex-col min-w-0">
                                                                    <span className="font-medium text-gray-900 truncate">{dist.companyName}</span>
                                                                    <span className="text-xs text-gray-500 truncate">{dist.companyEmail}</span>
                                                                </div>
                                                                <div className="ml-2 flex-shrink-0">
                                                                    {dist.verification?.isVerified ? (
                                                                        <span className="flex items-center text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                                                                            <CheckBadgeIcon className="w-3.5 h-3.5 mr-1" />
                                                                            Verified
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-gray-400 text-xs bg-gray-100 px-2 py-0.5 rounded-full font-medium">
                                                                            Unverified
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))
                                                    )}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setIsNewDistributorFormVisible(!isNewDistributorFormVisible)}
                                        className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium h-11 ${isNewDistributorFormVisible ? 'bg-red-50 text-red-600 hover:bg-red-100' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                                    >
                                        {isNewDistributorFormVisible ? (
                                            <>Cancel</>
                                        ) : (
                                            <>
                                                <PlusIcon className="w-4 h-4" />
                                                New
                                            </>
                                        )}
                                    </button>
                                </div>

                                {isNewDistributorFormVisible && (
                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4 animate-in fade-in duration-200">
                                        <h3 className="text-xs font-bold text-gray-600 uppercase tracking-wider">New Distributor Details</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-600 mb-1">Company Name *</label>
                                                <input
                                                    type="text"
                                                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                                                    value={newDistributor.companyName}
                                                    onChange={(e) => setNewDistributor({ ...newDistributor, companyName: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-600 mb-1">Company Email *</label>
                                                <input
                                                    type="email"
                                                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                                                    value={newDistributor.companyEmail}
                                                    onChange={(e) => setNewDistributor({ ...newDistributor, companyEmail: e.target.value })}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-600 mb-1">Company Number *</label>
                                                <input
                                                    type="text"
                                                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                                                    value={newDistributor.companyNumber}
                                                    onChange={(e) => setNewDistributor({ ...newDistributor, companyNumber: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-600 mb-1">Registered Address *</label>
                                            <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="Street"
                                                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm md:col-span-2"
                                                    value={newDistributor.registeredAddress.street}
                                                    onChange={(e) => setNewDistributor({ ...newDistributor, registeredAddress: { ...newDistributor.registeredAddress, street: e.target.value } })}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="City"
                                                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                                                    value={newDistributor.registeredAddress.city}
                                                    onChange={(e) => setNewDistributor({ ...newDistributor, registeredAddress: { ...newDistributor.registeredAddress, city: e.target.value } })}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="State"
                                                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                                                    value={newDistributor.registeredAddress.state}
                                                    onChange={(e) => setNewDistributor({ ...newDistributor, registeredAddress: { ...newDistributor.registeredAddress, state: e.target.value } })}
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Pin Code"
                                                    className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-sm"
                                                    value={newDistributor.registeredAddress.pinCode}
                                                    onChange={(e) => setNewDistributor({ ...newDistributor, registeredAddress: { ...newDistributor.registeredAddress, pinCode: e.target.value } })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
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
                    <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden">
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
                                        <div key={idx} className="flex flex-col gap-2.5 bg-gray-50/50 p-4 rounded-xl border border-gray-100 animate-in fade-in duration-200">
                                            <div className="flex flex-col md:flex-row gap-3 items-end">
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
                                                                    {p.code} - {p.description.slice(0, 50)}... {p.warning ? "⚠️" : ""}
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

                                            {/* Separate Row for Warning / Instruction */}
                                            {(() => {
                                                const selectedProd = products.find(p => p._id === item.productId);
                                                if (!selectedProd?.warning) return null;
                                                return (
                                                    <div className="w-full text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg p-2.5 flex items-start gap-2 animate-in fade-in duration-200">
                                                        <ExclamationCircleIcon className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                                                        <div>
                                                            <span className="font-bold uppercase tracking-wider block text-[10px] text-red-700">Special Warning / Instruction:</span>
                                                            <p className="mt-0.5 text-xs text-red-600 font-medium">{selectedProd.warning}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })()}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Section 3: Special Instructions */}
                    <div className="bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden">
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
