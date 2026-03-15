"use client";

import { useEffect, useState } from "react";
import axios from "@/app/lib/utils/axiosConfig";
import { useRouter } from "next/navigation";
import {
    ChevronLeftIcon,
    PrinterIcon,
    CheckCircleIcon,
    XCircleIcon,
    DocumentCheckIcon
} from "@heroicons/react/24/outline";
import Image from "next/image";

export default function QCReportView({ orderId }) {
    const router = useRouter();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (orderId) fetchOrderDetails();
    }, [orderId]);

    const fetchOrderDetails = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/order/${orderId}`);
            if (res.data?.success) {
                setOrder(res.data.data);
            } else {
                setError(res.data?.message || "Failed to fetch order details");
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center flex-col gap-3 items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-primary"></div>
            <p className="text-gray-400 text-sm animate-pulse">Loading QC report...</p>
        </div>
    );

    if (error) return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="text-center">
                <p className="text-red-500 text-sm mb-4">{error}</p>
                <button onClick={() => router.back()} className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    &larr; Go Back
                </button>
            </div>
        </div>
    );

    const qc = order?.qc;

    if (!qc) return (
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
            <p className="text-gray-600 text-base mb-4 font-semibold">QC Report is not available for this order.</p>
            <button onClick={() => router.back()} className="text-sm text-primary hover:text-primary/80 transition-colors font-bold">
                &larr; Go Back to Order Details
            </button>
        </div>
    );

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleString("en-US", {
            day: 'numeric', month: 'short', year: 'numeric',
            hour: 'numeric', minute: '2-digit', hour12: true
        });
    };

    const BooleanDisplay = ({ value }) => {
        return value ? (
            <div className="flex items-center gap-1.5 text-emerald-700">
                <CheckCircleIcon className="w-5 h-5" strokeWidth={2.5} />
                <span className="text-sm font-bold">Approved</span>
            </div>
        ) : (
            <div className="flex items-center gap-1.5 text-red-700">
                <XCircleIcon className="w-5 h-5" strokeWidth={2.5} />
                <span className="text-sm font-bold">Not Approved</span>
            </div>
        );
    };

    return (
        <div className="min-h-screen font-sans bg-[#f8fafc] pb-24 print:bg-white print:pb-0">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10 print:pt-0 print:max-w-full">

                {/* Header (Hidden on print) */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-start justify-between gap-4 print:hidden">
                    <div className="flex items-start gap-3">
                        <button
                            onClick={() => router.back()}
                            className="p-1.5 text-gray-500 bg-white border border-gray-200 shadow-sm hover:text-gray-900 transition-colors rounded-md hover:bg-gray-50"
                        >
                            <ChevronLeftIcon className="w-5 h-5" strokeWidth={2.5} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                                QC Inspection Report
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Order #{orderId?.slice(-6).toUpperCase()}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => window.print()}
                            className="px-4 py-2 bg-primary text-white rounded-md text-sm font-semibold flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm"
                        >
                            <PrinterIcon className="w-4 h-4" />
                            Download PDF
                        </button>
                    </div>
                </div>

                {/* Printable QC Report Document */}
                <div className="bg-white border border-gray-300 print:shadow-none print:border-none print:m-0 mx-auto w-full max-w-4xl shadow-md">

                    {/* Report Header */}
                    <div className="px-8 py-5 border-b-2 border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            {/* <DocumentCheckIcon className="w-12 h-12 text-gray-900" /> */}
                            <Image
                                src="/CCMate-Logo.jpg"
                                alt="CC Logo"
                                width={120}
                                height={120}
                                className="w-48 h-16 object-contain"
                            />
                            <div className="border-l-2 border-accent/30 pl-2 -ml-2">
                                <h2 className="text-lg font-bold text-gray-900 uppercase tracking-tight">Outbound Inspection Report</h2>
                                <p className="text-[12px] font-semibold text-gray-600 uppercase tracking-wider">Certificate of Quality Assurance</p>
                            </div>
                        </div>
                        <div className="text-right border-l-2 border-gray-200 pl-6">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Report Details</p>
                            <p className="text-base font-bold text-gray-800 leading-tight">Order #{orderId?.slice(-6).toUpperCase()}</p>
                            <p className="text-sm font-medium text-gray-700 mt-1">{formatDate(qc.processDate)}</p>
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Tabular Layout */}
                        <div className="w-full">

                            {/* General Information Table */}
                            <table className="w-full border-collapse border border-gray-300 mb-8">
                                <thead>
                                    <tr>
                                        <th colSpan="4" className="bg-gray-100 border border-gray-300 px-4 py-2.5 text-left text-sm font-bold text-gray-900 uppercase">
                                            1. General Information
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-3 bg-gray-50 text-xs font-bold text-gray-600 w-1/4 uppercase">Distributor Code</td>
                                        <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 w-1/4">{qc.distributorCode || "N/A"}</td>
                                        <td className="border border-gray-300 px-4 py-3 bg-gray-50 text-xs font-bold text-gray-600 w-1/4 uppercase">Distributor Account</td>
                                        <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 w-1/4">{qc.distributorAccountName || "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-3 bg-gray-50 text-xs font-bold text-gray-600 uppercase">Material Code</td>
                                        <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900">{qc.orderMaterialCode || "N/A"}</td>
                                        <td className="border border-gray-300 px-4 py-3 bg-gray-50 text-xs font-bold text-gray-600 uppercase">Order Length</td>
                                        <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900">{qc.orderLength ? `${qc.orderLength} m (2M WIDE ROLL)` : "N/A"}</td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* Inspection Checklist Table */}
                            <table className="w-full border-collapse border border-gray-300 mb-8">
                                <thead>
                                    <tr>
                                        <th colSpan="2" className="bg-gray-100 border border-gray-300 px-4 py-2.5 text-left text-sm font-bold text-gray-900 uppercase">
                                            2. Inspection Checklist
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left text-xs font-bold text-gray-600 w-[70%] uppercase">Inspection Item</th>
                                        <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left text-xs font-bold text-gray-600 w-[30%] uppercase">Result</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-800">Product Thickness within Spec (2.75MM – 0.05MM)</td>
                                        <td className="border border-gray-300 px-4 py-2"><BooleanDisplay value={qc.productThicknessWithinSpec} /></td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-800">Material Free from Surface Defects</td>
                                        <td className="border border-gray-300 px-4 py-2"><BooleanDisplay value={qc.materialFreeFromSurfaceDefects} /></td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-800">Product Clean & Fit for Purpose</td>
                                        <td className="border border-gray-300 px-4 py-2"><BooleanDisplay value={qc.productCleanAndFitForPurpose} /></td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-800">Order Ready for Shipment</td>
                                        <td className="border border-gray-300 px-4 py-2"><BooleanDisplay value={qc.orderReadyForShipment} /></td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* Shipping Config Table */}
                            <table className="w-full border-collapse border border-gray-300 mb-12">
                                <thead>
                                    <tr>
                                        <th colSpan="4" className="bg-gray-100 border border-gray-300 px-4 py-2.5 text-left text-sm font-bold text-gray-900 uppercase">
                                            3. Shipping Configuration
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-3 bg-gray-50 text-xs font-bold text-gray-600 w-1/4 uppercase">Pallet Dimensions</td>
                                        <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 w-1/4">{qc.palletDimensions || "N/A"}</td>
                                        <td className="border border-gray-300 px-4 py-3 bg-gray-50 text-xs font-bold text-gray-600 w-1/4 uppercase">Pallet Weight</td>
                                        <td className="border border-gray-300 px-4 py-3 text-sm font-medium text-gray-900 w-1/4">{qc.palletWeight ? `${qc.palletWeight}` : "N/A"}</td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* Photographic Evidence Grid */}
                            <div className="w-full print:break-inside-avoid">
                                <h3 className="bg-gray-100 border border-gray-300 px-4 py-2.5 text-left text-sm font-bold text-gray-900 uppercase mb-4">
                                    4. Photographic Evidence
                                </h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col border border-gray-300 bg-white">
                                        <div className="border-b border-gray-300 bg-gray-50 px-3 py-2 text-center">
                                            <p className="text-xs font-bold text-gray-700 uppercase">Micrometer Spec</p>
                                        </div>
                                        <div className="aspect-4/3 w-full p-2 bg-white flex items-center justify-center">
                                            {qc.micrometerImage ? (
                                                <a href={qc.micrometerImage} target="_blank" rel="noopener noreferrer" className="w-full h-full block">
                                                    <img src={qc.micrometerImage} alt="Micrometer Reading" className="w-full h-full object-contain" />
                                                </a>
                                            ) : (
                                                <span className="text-xs text-gray-400">No Image</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col border border-gray-300 bg-white">
                                        <div className="border-b border-gray-300 bg-gray-50 px-3 py-2 text-center">
                                            <p className="text-xs font-bold text-gray-700 uppercase">Material Pre-wrap</p>
                                        </div>
                                        <div className="aspect-4/3 w-full p-2 bg-white flex items-center justify-center">
                                            {qc.materialImage ? (
                                                <a href={qc.materialImage} target="_blank" rel="noopener noreferrer" className="w-full h-full block">
                                                    <img src={qc.materialImage} alt="Material Picture" className="w-full h-full object-contain" />
                                                </a>
                                            ) : (
                                                <span className="text-xs text-gray-400">No Image</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Signature Area */}
                            <div className="mt-16 pt-8 border-t-2 border-gray-200 flex justify-between items-end print:break-inside-avoid">
                                <div className="text-sm text-gray-600 w-1/2">
                                    <p className="font-bold text-gray-900 mb-1">Company Certification</p>
                                    <p>This report confirms that the referenced order has been inspected and meets all certified quality assurance standards.</p>
                                </div>
                                <div className="w-72 text-center">
                                    <div className="h-24 w-full flex items-center justify-center border-b border-gray-300 mb-2">
                                        {qc.processedBy ? (
                                            <a href={qc.processedBy} target="_blank" rel="noopener noreferrer" className="h-[90%] block">
                                                <img src={qc.processedBy} alt="Authorized Signature" className="h-full object-contain" />
                                            </a>
                                        ) : (
                                            <span className="text-xs text-gray-400 italic">Signature Missing</span>
                                        )}
                                    </div>
                                    <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Processed By / Authorized Signature</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
