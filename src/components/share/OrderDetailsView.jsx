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
    ClipboardDocumentCheckIcon,
    TrashIcon,
    ArrowUpTrayIcon,
    ExclamationTriangleIcon
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "@/app/lib/utils/axiosConfig";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import ConfirmationModal from "@/src/components/ui/ConfirmationModal";
import toast from "react-hot-toast";

export default function OrderDetailsView({
    order,
    role = "admin",
    updateModal = { isOpen: false },
    setUpdateModal = () => { },
    isUpdating = false,
    handleUpdateDetails = () => { },
    handleCleanQC = () => { },
    isCleaningQC = false,
    onRefresh = () => { }
}) {
    const router = useRouter();
    const [isCleanModalOpen, setIsCleanModalOpen] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [isUploadingInvoice, setIsUploadingInvoice] = useState(false);
    const [isUploadingPO, setIsUploadingPO] = useState(false);
    const [currentOrder, setCurrentOrder] = useState(order);

    useEffect(() => {
        setCurrentOrder(order);
    }, [order]);

    const activeOrder = currentOrder || order;

    const handleInvoiceFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (activeOrder?.status === "PENDING") {
            toast.error("Order status is PENDING. Please update order status to IN PROCESS before uploading an invoice.");
            e.target.value = "";
            return;
        }

        let invoiceNo = activeOrder?.invoice;
        if (!invoiceNo) {
            const enteredInvoice = prompt("Please enter the Invoice Number for this order:");
            if (!enteredInvoice || !enteredInvoice.trim()) {
                toast.error("Invoice Number is required before uploading invoice document.");
                e.target.value = "";
                return;
            }
            invoiceNo = enteredInvoice.trim();
        }

        if (file.size > 10485760) {
            toast.error("File size too large. Maximum allowed size is 10MB.");
            e.target.value = "";
            return;
        }

        try {
            setIsUploadingInvoice(true);
            const formData = new FormData();
            formData.append("file", file);
            if (invoiceNo) {
                formData.append("invoice", invoiceNo);
            }

            const res = await axios.patch(`/api/order/upload/${activeOrder._id}?type=invoice`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (res.data?.success) {
                setCurrentOrder(res.data.data);
                if (onRefresh) onRefresh();
                toast.success("Official Invoice uploaded successfully!");
            } else {
                toast.error(res.data?.message || "Failed to upload invoice");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Error uploading invoice");
        } finally {
            setIsUploadingInvoice(false);
            e.target.value = "";
        }
    };

    const handlePOFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 10485760) {
            toast.error("File size too large. Maximum allowed size is 10MB.");
            return;
        }
        try {
            setIsUploadingPO(true);
            const formData = new FormData();
            formData.append("file", file);

            const res = await axios.patch(`/api/order/upload/${activeOrder._id}?type=po`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (res.data?.success) {
                setCurrentOrder(res.data.data);
                if (onRefresh) onRefresh();
                toast.success("Purchase Order uploaded successfully!");
            } else {
                toast.error(res.data?.message || "Failed to upload PO document");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "Error uploading PO document");
        } finally {
            setIsUploadingPO(false);
            e.target.value = "";
        }
    };

    const generatePDF = async (qc) => {
        const orderId = order?._id;
        const doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 15;
        let currentY = 20;

        const addText = (text, x, y, size = 10, style = "normal", color = [0, 0, 0], align = "left") => {
            doc.setFontSize(size);
            doc.setFont("helvetica", style);
            doc.setTextColor(color[0], color[1], color[2]);
            doc.text(text || "", x, y, { align });
        };

        const loadImage = async (url) => {
            if (!url) return null;
            try {
                const fullUrl = url.startsWith("http") ? url : (window.location.origin + (url.startsWith("/") ? "" : "/") + url);
                const res = await fetch(fullUrl, { mode: "cors" });
                if (!res.ok) throw new Error("Image fetch failed");
                const blob = await res.blob();
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onloadend = () => resolve(reader.result);
                    reader.onerror = () => resolve(null);
                    reader.readAsDataURL(blob);
                });
            } catch (err) {
                return new Promise((resolve) => {
                    const img = new window.Image();
                    img.crossOrigin = "anonymous";
                    img.onload = () => {
                        try {
                            const canvas = document.createElement("canvas");
                            canvas.width = img.width;
                            canvas.height = img.height;
                            const ctx = canvas.getContext("2d");
                            ctx.drawImage(img, 0, 0);
                            resolve(canvas.toDataURL("image/jpeg"));
                        } catch (e) {
                            resolve(null);
                        }
                    };
                    img.onerror = () => resolve(null);
                    img.src = url;
                });
            }
        };

        const checkPageBreak = (neededHeight) => {
            if (currentY + neededHeight > pageHeight - 20) {
                doc.addPage();
                currentY = 20;
                return true;
            }
            return false;
        };

        // 1. Header with Logo
        const logoData = await loadImage("/CCMate-Logo.jpg");
        if (logoData) {
            doc.addImage(logoData, margin, currentY - 5, 45, 15);
        }

        addText("OUTBOUND INSPECTION REPORT", margin + 50, currentY, 14, "bold", [31, 41, 55]);
        addText("CERTIFICATE OF QUALITY ASSURANCE", margin + 50, currentY + 6, 9, "bold", [75, 85, 99]);

        addText("REPORT DETAILS", pageWidth - margin, currentY - 2, 8, "bold", [156, 163, 175], "right");
        addText(`Order ORD-${orderId?.slice(-6).toUpperCase()}`, pageWidth - margin, currentY + 4, 11, "bold", [55, 65, 81], "right");
        addText(formatDate(qc.processDate), pageWidth - margin, currentY + 9, 9, "normal", [75, 85, 99], "right");

        currentY += 25;

        // 2. Section 1: General Information
        const shippingList = (qc.shippingInfo && Array.isArray(qc.shippingInfo) && qc.shippingInfo.length > 0)
            ? qc.shippingInfo
            : [{ palletDimensions: qc.palletDimensions || "N/A", palletWeight: qc.palletWeight || 0 }];

        const shippingPdfRows = shippingList.map((item, pIndex) => {
            const prefix = shippingList.length > 1 ? `PALLET #${pIndex + 1} ` : "";
            return [
                `${prefix}DIMENSIONS`,
                item.palletDimensions || "N/A",
                `${prefix}WEIGHT`,
                item.palletWeight ? `${item.palletWeight} kg` : "N/A"
            ];
        });

        autoTable(doc, {
            startY: currentY,
            head: [[{ content: "1. GENERAL INFORMATION & SHIPPING", colSpan: 4 }]],
            body: [
                ["DISTRIBUTOR CODE", qc.distributorCode || "N/A", "DISTRIBUTOR ACCOUNT", qc.distributorAccountName || "N/A"],
                ...shippingPdfRows
            ],
            theme: "grid",
            headStyles: { fillColor: [9, 31, 208], textColor: [255, 255, 255], fontSize: 10, fontStyle: "bold" },
            columnStyles: {
                0: { fillColor: [249, 250, 251], textColor: [75, 85, 99], fontStyle: "bold", fontSize: 8, cellWidth: 40 },
                1: { textColor: [17, 24, 39], fontSize: 9, cellWidth: 50 },
                2: { fillColor: [249, 250, 251], textColor: [75, 85, 99], fontStyle: "bold", fontSize: 8, cellWidth: 40 },
                3: { textColor: [17, 24, 39], fontSize: 9, cellWidth: 50 }
            },
            styles: { cellPadding: 4, lineColor: [209, 213, 219], lineWidth: 0.1 },
            margin: { left: margin, right: margin }
        });

        currentY = doc.lastAutoTable.finalY + 10;

        // 3. Section 2: Products
        const booleanToText = (val) => val ? "APPROVED" : "NOT APPROVED";

        if (qc.products) {
            for (let i = 0; i < qc.products.length; i++) {
                const product = qc.products[i];

                checkPageBreak(30);
                addText(`PRODUCT ${i + 1}: ${product.materialCode}`, margin, currentY, 10, "bold", [17, 24, 39]);
                currentY += 5;

                // Inspection Table (including Pallet info)
                autoTable(doc, {
                    startY: currentY,
                    head: [["INSPECTION ITEM / DETAIL", "RESULT / VALUE"]],
                    body: [
                        ["Order Length", product.length ? `${product.length} m (2M WIDE ROLL)` : "N/A"],
                        ["Thickness within Spec (2.75MM – 0.05MM)", booleanToText(product.thicknessWithinSpec)],
                        ["Material Free from Surface Defects", booleanToText(product.materialFreeFromSurfaceDefects)],
                        ["Product Clean & Fit for Purpose", booleanToText(product.cleanAndFitForPurpose)],
                    ],
                    theme: "grid",
                    headStyles: { fillColor: [9, 31, 208], textColor: [255, 255, 255], fontSize: 10, fontStyle: "bold" },
                    columnStyles: {
                        0: { textColor: [31, 41, 55], fontSize: 8.5 },
                        1: { fontStyle: "bold", fontSize: 8.5, cellWidth: 40, halign: "center" }
                    },
                    styles: { cellPadding: 3, lineColor: [209, 213, 219], lineWidth: 0.1 },
                    didDrawCell: (data) => {
                        if (data.section === 'body' && data.column.index === 1 && (data.cell.raw === "APPROVED" || data.cell.raw === "NOT APPROVED")) {
                            const val = data.cell.raw === "APPROVED";
                            doc.setTextColor(val ? 16 : 220, val ? 185 : 38, val ? 129 : 38);
                        }
                    },
                    margin: { left: margin, right: margin }
                });

                currentY = doc.lastAutoTable.finalY + 5;

                // Product Images
                const imgWidth = (pageWidth - 2 * margin - 5) / 2;
                const imgHeight = (imgWidth * 3) / 4;

                checkPageBreak(imgHeight + 10);

                const micrometerImg = product.micrometerImage ? await loadImage(product.micrometerImage) : null;
                const materialImg = product.materialImage ? await loadImage(product.materialImage) : null;

                // Micrometer Image
                doc.setDrawColor(209, 213, 219);
                doc.rect(margin, currentY, imgWidth, imgHeight);
                if (micrometerImg) {
                    doc.addImage(micrometerImg, margin + 1, currentY + 1, imgWidth - 2, imgHeight - 2);
                } else {
                    addText("Micrometer Spec N/A", margin + imgWidth / 2, currentY + imgHeight / 2, 8, "italic", [156, 163, 175], "center");
                }

                // Material Image
                doc.rect(margin + imgWidth + 5, currentY, imgWidth, imgHeight);
                if (materialImg) {
                    doc.addImage(materialImg, margin + imgWidth + 5 + 1, currentY + 1, imgWidth - 2, imgHeight - 2);
                } else {
                    addText("Material Image N/A", margin + imgWidth + 5 + imgWidth / 2, currentY + imgHeight / 2, 8, "italic", [156, 163, 175], "center");
                }

                currentY += imgHeight + 15;
            }
        }

        // 4. Section 3: Final Status
        checkPageBreak(30);
        autoTable(doc, {
            startY: currentY,
            head: [[{ content: "3. FINAL CONFIRMATION", colSpan: 2 }]],
            body: [
                ["GLOBAL ORDER STATUS", "READY FOR SHIPMENT"],
                ["RESULT / STATUS", booleanToText(qc.orderReadyForShipment)]
            ],
            theme: "grid",
            headStyles: { fillColor: [9, 31, 208], textColor: [255, 255, 255], fontSize: 10, fontStyle: "bold" },
            columnStyles: {
                0: { fillColor: [249, 250, 251], textColor: [31, 41, 55], fontStyle: "bold", fontSize: 8.5, cellWidth: "50%" },
                1: { fontStyle: "bold", fontSize: 8.5, halign: "center" }
            },
            styles: { cellPadding: 4, lineColor: [209, 213, 219], lineWidth: 0.1 },
            didDrawCell: (data) => {
                if (data.section === 'body' && data.column.index === 1 && (data.cell.raw === "APPROVED" || data.cell.raw === "NOT APPROVED")) {
                    const val = data.cell.raw === "APPROVED";
                    doc.setTextColor(val ? 16 : 220, val ? 185 : 38, val ? 129 : 38);
                }
            },
            margin: { left: pageWidth / 4, right: pageWidth / 4 }
        });

        currentY = doc.lastAutoTable.finalY + 15;

        // 5. Footer Signature
        checkPageBreak(40);
        doc.setDrawColor(229, 231, 235);
        doc.setLineWidth(0.5);
        doc.line(margin, currentY, pageWidth - margin, currentY);
        currentY += 10;

        addText("COMPANY CERTIFICATION", margin, currentY, 9, "bold", [17, 24, 39]);
        const certText = "This report confirms that the referenced order has been inspected and meets all certified quality assurance standards.";
        const splitCertText = doc.splitTextToSize(certText, 100);
        doc.text(splitCertText, margin, currentY + 5);

        const sigWidth = 60;
        const sigX = pageWidth - margin - sigWidth;
        const sigImg = qc.processedBy ? await loadImage(qc.processedBy) : null;

        if (sigImg) {
            doc.addImage(sigImg, sigX, currentY - 5, sigWidth, 20);
        } else {
            addText("Signature Missing", sigX + sigWidth / 2, currentY + 5, 8, "italic", [156, 163, 175], "center");
        }
        doc.line(sigX, currentY + 16, sigX + sigWidth, currentY + 16);
        addText("PROCESSED BY / AUTHORIZED SIGNATURE", sigX + sigWidth / 2, currentY + 21, 7, "bold", [55, 65, 81], "center");

        doc.save(`QC_Report_ORD_${orderId?.slice(-6).toUpperCase()}.pdf`);
    };

    const handleDownloadPDF = async () => {
        try {
            setIsDownloading(true);
            const res = await axios.get(`/api/order/qc/${order?._id}`);
            if (res.data?.success) {
                await generatePDF(res.data.data);
                toast.success("QC report downloaded successfully!");
            } else {
                toast.error("Failed to fetch QC report details");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || "An error occurred");
        } finally {
            setIsDownloading(false);
        }
    };

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
            case "SHIPPED":
                return role === "admin"
                    ? "bg-[#e0f2fe] text-[#0369a1] border-[#e0f2fe]"
                    : "bg-blue-50 text-blue-700 border-blue-200";
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
            status: order.status || "PENDING",
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
                                    Order ORD-{order?._id?.slice(-6).toUpperCase()}
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
                        {order?.qc && (
                            <button
                                onClick={handleDownloadPDF}
                                disabled={isDownloading}
                                className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm flex items-center gap-2 hover:bg-gray-700 transition-colors shadow-sm disabled:opacity-50"
                            >
                                <PrinterIcon className="w-4 h-4" />
                                {isDownloading ? "Generating..." : "Download QC"}
                            </button>
                        )}
                        <button
                            onClick={() => router.push(`/${role}/orders/${order?._id}/qc`)}
                            className="px-4 py-2 bg-primary text-white rounded-lg text-sm flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm"
                        >
                            <ClipboardDocumentCheckIcon className="w-4 h-4" />
                            {order?.qc ? "Update QC" : "Start QC"}
                        </button>
                        {order?.qc && (role === "admin" || role === "warehouse") && (
                            <button
                                onClick={() => setIsCleanModalOpen(true)}
                                disabled={isCleaningQC}
                                className="px-4 py-2 text-red-50 bg-red-600 border border-red-100 rounded-lg text-sm flex items-center gap-2 hover:bg-red-700 transition-colors shadow-sm disabled:opacity-50"
                                title="Clean QC Data"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="m16.875 21.525l-1.4-1.4l2.1-2.125l-2.1-2.125l1.4-1.4l2.125 2.1l2.125-2.1l1.4 1.4l-2.1 2.125l2.1 2.125l-1.4 1.4l-2.125-2.1zM9 9V7h9v2zm0 3v-2h9v2zM6 22q-1.25 0-2.125-.875T3 19v-3h3V2h15v10.375q-.475-.175-.975-.262T19 12.025V4H8v12h5.35q-.175.5-.262 1T13 18q0 1.1.388 2.125T14.55 22z"></path>
                                </svg>
                                {isCleaningQC ? "Cleaning..." : "Clean QC"}
                            </button>
                        )}
                    </div>
                </div>

                <ConfirmationModal
                    isOpen={isCleanModalOpen}
                    onClose={() => setIsCleanModalOpen(false)}
                    onConfirm={async () => {
                        await handleCleanQC();
                        setIsCleanModalOpen(false);
                    }}
                    title="Clean QC Data"
                    message="Are you sure you want to clean QC data? This action will permanently delete all QC related images and records from the order. This action cannot be undone."
                    type="delete"
                    confirmText="Clean Data"
                    isLoading={isCleaningQC}
                />

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
                                {(role === "admin" || role === "warehouse") && !updateModal.isOpen && (
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
                                    <span className="text-xs text-gray-800 font-semibold pt-2">Order Status:</span>
                                    <div className="col-span-2">
                                        {updateModal.isOpen && (role === "admin" || role === "warehouse") ? (
                                            <select
                                                value={updateModal.status || order?.status}
                                                onChange={(e) => setUpdateModal({ ...updateModal, status: e.target.value })}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-sm shadow-xs focus:ring-primary focus:border-primary text-xs font-semibold"
                                            >
                                                <option value="PENDING">PENDING</option>
                                                <option value="IN PROCESS">IN PROCESS</option>
                                                <option value="READY-TO-SHIP">READY-TO-SHIP</option>
                                                <option value="SHIPPED">SHIPPED</option>
                                                <option value="RECEIVED">RECEIVED</option>
                                            </select>
                                        ) : (
                                            <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-bold ${getStatusStyle(order?.status)}`}>
                                                {order?.status || "UNKNOWN"}
                                            </span>
                                        )}
                                    </div>
                                </div>

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
                                    <div className="col-span-2 flex flex-wrap items-center gap-2">
                                        {activeOrder?.documents?.find(d => d.name === "po")?.url ? (
                                            <a
                                                href={activeOrder.documents.find(d => d.name === "po").url}
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

                                        {(role === "admin" || role === "warehouse") && (
                                            <label className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-50/80 hover:bg-indigo-100 text-indigo-700 text-[10px] font-medium rounded border border-indigo-200/60 cursor-pointer transition-all shadow-xs">
                                                {isUploadingPO ? (
                                                    <>
                                                        <div className="w-3 h-3 border-2 border-indigo-400 border-t-indigo-700 rounded-full animate-spin" />
                                                        <span>Uploading...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <ArrowUpTrayIcon className="w-3.5 h-3.5 text-indigo-600" />
                                                        <span>{activeOrder?.documents?.find(d => d.name === "po")?.url ? "Replace PO" : "Upload PO"}</span>
                                                    </>
                                                )}
                                                <input
                                                    type="file"
                                                    accept=".pdf,image/*,application/pdf"
                                                    className="hidden"
                                                    disabled={isUploadingPO}
                                                    onChange={handlePOFileUpload}
                                                />
                                            </label>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <span className="text-xs text-gray-800 font-semibold">Official Invoice:</span>
                                    <div className="col-span-2 flex flex-wrap items-center gap-2">
                                        {activeOrder?.documents?.find(d => d.name === "invoice")?.url ? (
                                            <a
                                                href={activeOrder.documents.find(d => d.name === "invoice").url}
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

                                        {(role === "admin" || role === "warehouse") && (
                                            <label className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-50/80 hover:bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded border border-emerald-200/60 cursor-pointer transition-all shadow-xs">
                                                {isUploadingInvoice ? (
                                                    <>
                                                        <div className="w-3 h-3 border-2 border-emerald-400 border-t-emerald-800 rounded-full animate-spin" />
                                                        <span>Uploading...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <ArrowUpTrayIcon className="w-3.5 h-3.5 text-emerald-700" />
                                                        <span>{activeOrder?.documents?.find(d => d.name === "invoice")?.url ? "Replace Invoice" : "Upload Invoice"}</span>
                                                    </>
                                                )}
                                                <input
                                                    type="file"
                                                    accept=".pdf,image/*,application/pdf"
                                                    className="hidden"
                                                    disabled={isUploadingInvoice}
                                                    onChange={handleInvoiceFileUpload}
                                                />
                                            </label>
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
