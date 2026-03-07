"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "@/app/lib/utils/axiosConfig";
import { useRouter, useSearchParams } from "next/navigation";
import {
    PlusIcon,
    XMarkIcon,
    TrashIcon,
    ShoppingBagIcon,
    DocumentTextIcon,
    ChevronLeftIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useDropzone } from "react-dropzone";
import DropSvg from "@/src/components/share/DropSvg";
import { ArrowDownIcon } from "@heroicons/react/24/solid";
import { Suspense } from "react";

export default function NewOrderPage() {
    return (
        <Suspense fallback={
            <div className="max-w-5xl mx-auto px-4 py-8 flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
        }>
            <NewOrderContent />
        </Suspense>
    );
}

function NewOrderContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const reorderId = searchParams.get("reorder");
    const [products, setProducts] = useState([]);
    const [distributor, setDistributor] = useState(null);
    const [orderItems, setOrderItems] = useState([{ product: "", quantity: 1, length: 0 }]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [poFile, setPoFile] = useState(null);
    const [isReorderLoading, setIsReorderLoading] = useState(false);

    useEffect(() => {
        fetchProducts();
        fetchDistributorData();
        if (reorderId) {
            fetchReorderData(reorderId);
        }
    }, [reorderId]);

    const fetchReorderData = async (id) => {
        try {
            setIsReorderLoading(true);
            const res = await axios.get(`/api/order/${id}`);
            if (res.data?.success) {
                const order = res.data.data;
                const items = (order.orderItems || []).map(item => ({
                    product: typeof item.product === 'object' ? item.product._id : item.product,
                    quantity: item.quantity,
                    length: item.length
                }));
                if (items.length > 0) {
                    setOrderItems(items);
                }
            }
        } catch (err) {
            console.error("Error fetching reorder data:", err);
        } finally {
            setIsReorderLoading(false);
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

    const fetchDistributorData = async () => {
        try {
            const res = await axios.get("/api/distributor/me");
            if (res.data?.success) {
                setDistributor(res.data.data);
            }
        } catch (err) {
            console.error("Error fetching distributor:", err);
            if (err.response?.status === 404 || err.response?.status === 401) {
                router.push("/distributor/login");
            }
        }
    };

    const onDrop = useCallback(acceptedFiles => {
        if (acceptedFiles && acceptedFiles[0]) {
            setPoFile(acceptedFiles[0]);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    const handleAddRow = () => {
        setOrderItems([...orderItems, { product: "", quantity: 1, length: 0 }]);
    };

    const handleRemoveRow = (index) => {
        setOrderItems(orderItems.filter((_, i) => i !== index));
    };

    const handleItemChange = (index, field, value) => {
        if (field === "product" && value && orderItems.some((item, i) => i !== index && item.product === value)) {
            alert("This product is already added to your order.");
            return;
        }
        const newItems = [...orderItems];
        newItems[index][field] = value;
        setOrderItems(newItems);
    };

    const handleSubmitOrder = async (e) => {
        e.preventDefault();
        const filteredItems = orderItems.filter(item => item.product !== "");
        if (filteredItems.length === 0) {
            alert("Please add at least one product");
            return;
        }

        if (!poFile) {
            alert("Please upload a Purchase Order document");
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
            const formData = new FormData();
            formData.append("purchaseOrder", poFile);
            formData.append("orderItems", JSON.stringify(filteredItems));

            const res = await axios.post("/api/order", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            if (res.data?.success) {
                router.push("/distributor/dashboard/orders");
            } else {
                alert(res.data?.message || "Failed to create order");
            }
        } catch (err) {
            alert(err.response?.data?.message || err.message || "Error creating order");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto px-4 py-8 mb-12"
        >
            <div className="mb-10 flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-primary" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9z" className="duoicon-secondary-layer" opacity={0.3}></path>
                            <path fill="currentColor" d="M20 3a2 2 0 0 1 2 2v3H2V5a2 2 0 0 1 2-2zm-6 10h-4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2" className="duoicon-primary-layer"></path>
                        </svg>
                    </div>
                    <div>
                        <h1 className="md:text-2xl text-lg font-bold text-gray-800">Place Purchase Order</h1>
                        <p className="md:text-sm md:inline hidden text-[10px] text-gray-500">
                            {reorderId ? `Reordering from previous order #${reorderId.slice(-6).toUpperCase()}` : "Create a new distribution order and upload your PO"}
                        </p>
                    </div>
                </div>
                <Link
                    href="/distributor/dashboard/orders"
                    className="inline-flex items-center border border-gray-300 px-1.5 py-2 rounded-md gap-2 text-sm text-gray-500/90 hover:text-gray-800 transition-colors mb-6 group"
                >
                    <ChevronLeftIcon className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
                    See Prev Orders
                </Link>
            </div>


            <form onSubmit={handleSubmitOrder} className="space-y-10">
                {/* PO Documentation - Reference Image style */}
                <div className="bg-white rounded-3xl shadow-xs border border-gray-100 overflow-hidden">
                    <div className="p-8 py-3 pt-5 border-b border-gray-200 flex flex-col gap-1">
                        <h2 className="text-lg font-bold text-gray-900">Purchase Order</h2>
                        <p className="text-sm text-gray-400">Upload your signed PO document here</p>
                    </div>
                    <div className="p-8">
                        <div {...getRootProps()} className={`relative border-2 border-dashed rounded-md p-10 pt-0 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'}`}>
                            <input {...getInputProps()} />
                            <DropSvg color={isDragActive ? 'var(--primary-main)' : '#6366f1'} />
                            <div className="text-center">
                                <p className="text-sm font-bold text-gray-900">
                                    {poFile ? poFile.name : "Drop or select files"}
                                </p>
                                <p className="text-sm text-gray-400 mt-1 font-medium">
                                    Drag your PDF here, or <span className="text-primary font-bold underline cursor-pointer">browse</span> your device.
                                </p>
                            </div>
                        </div>

                        {poFile && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-6 p-4 bg-gray-900 rounded-2xl flex items-center justify-between text-white"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white/10 rounded-xl">
                                        <DocumentTextIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-bold truncate max-w-[200px]">{poFile.name}</p>
                                        <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Document Selected</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={(e) => { e.stopPropagation(); setPoFile(null); }}
                                    className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                            </motion.div>
                        )}
                        <p className="mt-4 text-[11px] text-gray-400 flex items-center gap-1.5">
                            <ExclamationTriangleIcon className="w-3.5 h-3.5" />
                            Only PDF format is accepted. Maximum file size: 5MB.
                        </p>
                    </div>
                </div>

                {/* Products Section - Reference Image style */}
                <div className="bg-white rounded-3xl shadow-xs border border-gray-100 overflow-hidden">
                    <div className="p-8 py-3 pt-5 border-b border-gray-200 flex items-center justify-between">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-lg font-bold text-gray-900">Product Selection</h2>
                            <p className="text-sm text-gray-400">Add products, quantities, and specify lengths</p>
                        </div>
                        <span className="text-xs font-bold bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-sm border border-indigo-100/50">
                            {orderItems.filter(i => i.product).length} SELECTED
                        </span>
                    </div>

                    <div className="p-8 pt-6">
                        <div className="space-y-4 relative rounded-md border border-gray-100 p-6 md:p-5 md:py-5 bg-gray-50/30 group hover:border-primary/20 transition-all hover:bg-white hover:shadow-sm">
                            <AnimatePresence>
                                {orderItems.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        className=" grid grid-cols-1 md:grid-cols-12 gap-6"
                                    >
                                        <div className="md:col-span-6 relative">
                                            <label className="bg-white px-2 inline-block mb-1.5 text-sm text-gray-700 tracking-tight">Select Product</label>
                                            <select
                                                required
                                                value={item.product}
                                                onChange={(e) => handleItemChange(index, "product", e.target.value)}
                                                className="w-full border border-gray-300 px-4 py-4 text-xs focus:ring focus:ring-primary/50 outline-none transition-all appearance-none cursor-pointer rounded-lg"
                                            >
                                                <option value="">Choose product...</option>
                                                {products.map(p => {
                                                    const isSelected = orderItems.some((it, i) => i !== index && it.product === p._id);
                                                    return (
                                                        <option key={p._id} value={p._id} disabled={isSelected}>
                                                            {p.code} — {p.description}
                                                        </option>
                                                    );
                                                })}
                                            </select>
                                            <ChevronLeftIcon className="-rotate-90 absolute w-12 h-7 right-1 bottom-2.5 bg-white p-2 pb-1 cursor-pointer" strokeWidth={2} />
                                        </div>

                                        <div className="md:col-span-2 relative">
                                            <label className="bg-white px-2 inline-block mb-1.5 text-sm text-gray-700 tracking-tight">Quantity</label>
                                            <input
                                                type="number"
                                                required
                                                min="1"
                                                placeholder="0"
                                                value={item.quantity}
                                                onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value) || 0)}
                                                className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-primary focus:border-primary"
                                            />
                                        </div>

                                        <div className="md:col-span-3 relative">
                                            <label className="bg-white px-2 inline-block mb-1.5 text-sm text-gray-700 tracking-tight">Length</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    required
                                                    min="0"
                                                    step="0.1"
                                                    placeholder="0.00"
                                                    value={item.length}
                                                    onChange={(e) => handleItemChange(index, "length", parseFloat(e.target.value) || 0)}
                                                    className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-primary focus:border-primary"
                                                />
                                            </div>
                                        </div>

                                        <div className="md:col-span-1 flex items-end mb-2 justify-end">
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveRow(index)}
                                                disabled={orderItems.length === 1}
                                                className="p-3 bg-red-500 border border-red-500 text-white hover:text-red-600 hover:bg-red-200/90 hover:border-red-500 rounded-xl transition-all disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed shadow-xs ring-1 ring-transparent hover:ring-red-100"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            <div className="flex justify-end items-center">
                                <button
                                    type="button"
                                    onClick={handleAddRow}
                                    className="w-fit px-3 py-2 text-white rounded-md transition-all font-medium text-sm bg-blue-900 hover:shadow-sm flex items-center justify-center gap-2 group"
                                >
                                    <div className="p-1 bg-white/80 rounded-lg shadow-sm border border-gray-100 group-hover:border-primary/20 text-primary transition-all">
                                        <PlusIcon className="w-3.5 h-3.5" />
                                    </div>
                                    Add Another Product
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-6">

                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex-1 sm:flex-none px-8 py-4 rounded-md border border-gray-200 font-bold text-gray-500 hover:bg-gray-50 transition-all text-sm bg-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 sm:flex-none px-10 py-4 rounded-md bg-gray-900 text-white font-bold hover:bg-black transition-all shadow-xl shadow-gray-200 flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed text-sm tracking-tight"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                "Complete Purchase Order"
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </motion.div>
    );
}
