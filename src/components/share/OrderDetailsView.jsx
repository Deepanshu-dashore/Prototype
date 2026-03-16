"use client";

import {
    ChevronLeftIcon,
    CubeIcon,
    PencilIcon,
    PrinterIcon,
    CheckCircleIcon,
    BuildingOfficeIcon,
    DocumentTextIcon,
    ClipboardDocumentListIcon,
    PencilSquareIcon,
    EyeIcon,
    ClipboardDocumentCheckIcon
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function OrderDetailsView({
    order,
    role = "admin",
    updateModal = { isOpen: false },
    setUpdateModal = () => { },
    isUpdating = false,
    handleUpdateDetails = () => { },
}) {
    const router = useRouter();

    const getStatusStyle = (status) => {
        switch (status) {
            case "PENDING":
                return role === "admin"
                    ? "bg-[#fdf3e1] text-[#b67319] border-[#fdf3e1]"
                    : "bg-amber-50 text-amber-700 border-amber-200";
            case "IN PROCESS":
                return role === "admin"
                    ? "bg-[#e1f0fd] text-[#1974b6] border-[#e1f0fd]"
                    : "bg-sky-50 text-sky-700 border-sky-200";
            case "READY-TO-SHIP":
                return role === "admin"
                    ? "bg-[#f3e1fd] text-[#8b19b6] border-[#f3e1fd]"
                    : "bg-purple-50 text-purple-700 border-purple-200";
            case "RECEIVED":
                return role === "admin"
                    ? "bg-[#dff5e9] text-[#00865a] border-[#dff5e9]"
                    : "bg-emerald-50 text-emerald-700 border-emerald-200";
            default:
                return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleString("en-US", {
            day: 'numeric', month: 'short', year: 'numeric',
            hour: 'numeric', minute: '2-digit', hour12: true
        });
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

    return (
        <div className="min-h-screen  font-sans bg-[#f8fafc] pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">

                {/* Header Section */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <button
                            onClick={() => router.back()}
                            className="mt-1 p-1.5 text-gray-500 bg-gray-100 border border-gray-200 shadow-xs hover:text-gray-900 transition-colors rounded-md hover:bg-gray-200"
                        >
                            <ChevronLeftIcon className="w-5 h-5" strokeWidth={2.5} />
                        </button>
                        <div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                                    Order #{order?._id?.slice(-6).toUpperCase()}
                                </h1>
                                <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-bold ${getStatusStyle(order?.status)}`}>
                                    {order?.status || "UNKNOWN"}
                                </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                {formatDate(order?.createdAt)}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => router.push(`/${role}/orders/${order?._id}/qc`)}
                            className="px-4 py-2 bg-primary text-white rounded-lg text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm"
                        >
                            <ClipboardDocumentCheckIcon className="w-4 h-4" />
                            {order?.qc ? "Update QC Report" : "Start QC"}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Instructions Card (Conditional) */}
                        {order?.instructions && (
                            <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 p-6 overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 sm:block hidden lg:block" />
                                <div className="flex items-center gap-2 border-b border-dashed border-gray-200 pb-2.5 mb-4">
                                    <div className="p-1.5 bg-primary/10 rounded-lg">
                                        <DocumentTextIcon className="w-5 h-5 text-primary/70" />
                                    </div>
                                    <h3 className="text-base font-bold text-gray-800">Special Instructions</h3>
                                </div>
                                <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
                                    <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap italic">
                                        "{order.instructions}"
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Details Card */}
                        <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 p-6">
                            <div className="flex items-center gap-2 border-b border-dashed border-gray-200 pb-2.5">
                                <div>
                                    <CubeIcon className="w-7 h-7 text-primary/50 bg-primary/10 p-1 rounded-md" />
                                </div>
                                <h3 className="text-base font-bold text-gray-800">Product Details</h3>
                                {/* <p className="text-sm text-gray-500 ml-auto">Total Items: {order?.orderItems?.length}</p> */}
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-100">
                                            <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Product</th>
                                            <th className="px-4 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Description</th>
                                            <th className="px-4 py-3 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">Qty</th>
                                            <th className="px-4 py-3 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">Length</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200/60">
                                        {order?.orderItems?.map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-50/30 transition-colors">
                                                <td className="px-4 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-1.5 bg-primary/5 rounded-lg">
                                                            <CubeIcon className="w-4 h-4 text-primary/60" />
                                                        </div>
                                                        <span className="text-xs font-semibold text-gray-800">{item.product?.code || "N/A"}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <span className="text-xs text-gray-700 line-clamp-1">{item.product?.description || "No description"}</span>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <span className="inline-flex items-center justify-center min-w-8 py-1 text-xs font-semibold text-gray-800 leading-none">
                                                        {item.quantity || 1}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-4 text-center">
                                                    <span className="text-xs font-semibold text-gray-800">
                                                        {item.length ? `${item.length}` : "—"}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {(!order?.orderItems || order.orderItems.length === 0) && (
                                    <div className="py-12 text-center">
                                        <p className="text-sm text-gray-400 font-medium tracking-tight">No products found in this order.</p>
                                    </div>
                                )}
                            </div>

                            {/* Summary Totals */}
                            <div className="mt-8 pt-6 border-t border-dashed border-gray-200 flex justify-end">
                                <div className="w-full max-w-[180px] space-y-3">
                                    <div className="flex justify-between items-center text-[12.25px]">
                                        <span className="text-gray-500">Total Items:</span>
                                        <span className="font-semibold text-gray-800">{order?.orderItems?.length || 0} Products</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[12.25px]">
                                        <span className="text-gray-500">Total Quantity:</span>
                                        <span className="font-semibold text-gray-800">
                                            {order?.orderItems?.reduce((acc, item) => acc + (item.quantity || 0), 0) || 0} Units
                                        </span>
                                    </div>
                                    {/* <div className="pt-3 border-t border-gray-100 flex justify-between items-center overflow-hidden">
                                        <span className="text-base font-bold text-gray-900">Summary</span>
                                        <div className="h-0.5 w-8 bg-primary/20 rounded-full" />
                                    </div> */}
                                </div>
                            </div>

                        </div>

                        {/* History Card */}
                        <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 p-6">
                            <div className="flex items-center gap-2 mb-6 border-b border-dashed border-gray-200 pb-2.5">
                                <div>
                                    <ClipboardDocumentListIcon className="w-7 h-7 text-primary/50 bg-primary/10 p-1 rounded-md" />
                                </div>
                                <h3 className="text-base font-bold text-gray-800">History</h3>
                            </div>
                            <div className="space-y-6 pl-2">
                                {/* Last Updated */}
                                <div className="relative pl-6">
                                    <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-50"></div>
                                    <div className="absolute -left-px top-5 w-px h-full bg-gray-200"></div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">Order {order?.status?.toLowerCase() || "updated"}</p>
                                        <p className="text-xs text-gray-400 mt-1">{formatDate(order?.updatedAt)}</p>
                                    </div>
                                </div>

                                {/* Order Placed */}
                                <div className="relative pl-6">
                                    <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-gray-300 ring-4 ring-gray-50"></div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-600">Order placed</p>
                                        <p className="text-xs text-gray-400 mt-1">{formatDate(order?.createdAt)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">

                        {/* Customer / Distributor Card */}
                        <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 p-6">
                            <div className="flex items-center gap-2 mb-6 border-b border-dashed border-gray-200 pb-2.5">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 text-primary/50 bg-primary/10 p-1 rounded-md" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M18 15h-2v2h2m0-6h-2v2h2m2 6h-8v-2h2v-2h-2v-2h2v-2h-2V9h8M10 7H8V5h2m0 6H8V9h2m0 6H8v-2h2m0 6H8v-2h2M6 7H4V5h2m0 6H4V9h2m0 6H4v-2h2m0 6H4v-2h2m6-10V3H2v18h20V7z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-base font-bold text-gray-800">Distributor</h3>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="space-y-1">
                                    <p className="font-semibold text-sm text-gray-600 border-b border-dashed border-gray-200 py-2.5"><span className="mr-2 text-gray-800 font-semibold">Name:</span>{order?.orderBy?.companyName || "Unknown"}</p>
                                    <p className="text-sm text-gray-600 border-b border-dashed border-gray-200 py-2.5"><span className="mr-2 text-gray-800 font-semibold">Email:</span>{order?.orderBy?.companyEmail || "No email"}</p>
                                    {order?.orderBy?.companyNumber && (
                                        <p className="text-xs text-gray-600 mt-1 border-b border-dashed border-gray-200 py-2.5"><span className="mr-2 text-gray-800 font-semibold">Phone:</span>{order.orderBy.companyNumber}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Delivery / Documents Card */}
                        <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 p-6">
                            <div className="flex items-center gap-2 mb-6 border-b border-dashed border-gray-200 pb-2.5">
                                <div>
                                    <DocumentTextIcon className="w-7 h-7 text-primary/50 bg-primary/10 p-1 rounded-md" />
                                </div>
                                <h3 className="text-base font-bold text-gray-800">Documents</h3>
                                { (role === "admin" || role === "warehouse") && !updateModal.isOpen && (
                                    <button
                                        onClick={() => openUpdateModal(order)}
                                        className="inline-flex ml-auto items-center gap-1.5 px-1.5 py-1.5 bg-gray-200 border border-gray-200 text-gray-800 text-[12.25px] rounded-md hover:bg-gray-300 hover:border-gray-300 transition-all shadow-sm"
                                        title="Edit Documents Info"
                                    >
                                        <PencilSquareIcon className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                    <span className="text-xs text-gray-800 font-semibold pt-2">PO Number:</span>
                                    <div className="col-span-2">
                                        {updateModal.isOpen && (role === "admin" || role === "warehouse") ? (
                                            <input
                                                type="text"
                                                value={updateModal.po}
                                                onChange={(e) => setUpdateModal({ ...updateModal, po: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-xs focus:ring-primary focus:border-primary text-xs"
                                                placeholder="Enter PO number"
                                            />
                                        ) : (
                                            <span className="text-xs text-gray-600 inline-block pt-2">{order?.po || "Not available"}</span>
                                        )}
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <span className="text-xs text-gray-800 font-semibold pt-2">Invoice No:</span>
                                    <div className="col-span-2">
                                        {updateModal.isOpen && (role === "admin" || role === "warehouse") ? (
                                            <input
                                                type="text"
                                                value={updateModal.invoice}
                                                onChange={(e) => setUpdateModal({ ...updateModal, invoice: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-xs focus:ring-primary focus:border-primary text-xs"
                                                placeholder="Enter invoice number"
                                            />
                                        ) : (
                                            <span className="text-xs text-gray-600 inline-block pt-2">{order?.invoice || "Not available"}</span>
                                        )}
                                    </div>
                                </div>

                                {updateModal.isOpen && (role === "admin" || role === "warehouse") && (
                                    <div className="grid grid-cols-3 gap-4 pt-2">
                                        <div className="col-span-1"></div>
                                        <div className="col-span-2 flex items-center gap-2">
                                            <button
                                                onClick={() => setUpdateModal({ ...updateModal, isOpen: false })}
                                                disabled={isUpdating}
                                                className="px-3 py-1.5 text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleUpdateDetails}
                                                disabled={isUpdating}
                                                className="px-3 py-1.5 text-xs text-white bg-primary hover:bg-primary/90 rounded-md transition-colors flex items-center gap-1"
                                            >
                                                {isUpdating ? "Saving..." : "Save Changes"}
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-dashed border-gray-200 mt-2">
                                    <span className="text-xs text-gray-800 font-semibold">Signed PO:</span>
                                    <div className="col-span-2">
                                        {order?.documents?.find(d => d.name === "po")?.url ? (
                                            <a
                                                href={order.documents.find(d => d.name === "po").url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 px-2 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 text-[10px] font-medium rounded border border-indigo-100 transition-all shadow-xs w-fit"
                                                title="See Distributor PO"
                                            >
                                                <EyeIcon className="w-3.5 h-3.5" /> See Purchase order
                                            </a>
                                        ) : (
                                            <span className="text-xs text-gray-400 italic">No document attached</span>
                                        )}
                                    </div>
                                </div>




                                <div className="grid grid-cols-3 gap-4">
                                    <span className="text-xs text-gray-800 font-semibold">Official Invoice:</span>
                                    <div className="col-span-2">
                                        {order?.documents?.find(d => d.name === "invoice")?.url ? (
                                            <a
                                                href={order.documents.find(d => d.name === "invoice").url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[10px] font-bold rounded border border-emerald-100 transition-all shadow-xs w-fit"
                                                title="See Distributor Invoice"
                                            >
                                                <EyeIcon className="w-3.5 h-3.5" /> See Invoice
                                            </a>
                                        ) : (
                                            <span className="text-xs text-gray-400 italic">Pending upload</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div >
    );
}
