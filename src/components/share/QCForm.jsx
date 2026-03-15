"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
    DocumentCheckIcon,
    ArrowPathIcon,
    ChevronLeftIcon,
    PhotoIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";

export default function QCForm({ orderId, role = "admin" }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        distributorCode: "",
        distributorAccountName: "",
        orderLength: "",
        orderMaterialCode: "",
        productThicknessWithinSpec: false,
        materialFreeFromSurfaceDefects: false,
        productCleanAndFitForPurpose: false,
        orderReadyForShipment: false,
        palletDimensions: "",
        palletWeight: "",
    });

    const [files, setFiles] = useState({
        micrometerImage: null,
        materialImage: null,
        processedBy: null,
    });

    const [previews, setPreviews] = useState({
        micrometerImage: null,
        materialImage: null,
        processedBy: null,
    });

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            // Optionally could use a ref to clean up object URLs on component unmount
        };
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        const { name, files: selectedFiles } = e.target;
        if (selectedFiles && selectedFiles[0]) {
            const file = selectedFiles[0];
            
            // Security / Validation
            if (!file.type.startsWith("image/")) {
                setError("Please upload a valid image file (JPG, PNG).");
                return;
            }
            if (file.size > 10 * 1024 * 1024) {
                setError(`File ${file.name} is too large. Maximum size is 10MB.`);
                return;
            }
            
            setError(""); // clear any previous errors

            setFiles(prev => ({
                ...prev,
                [name]: file
            }));

            if (previews[name]) {
                URL.revokeObjectURL(previews[name]);
            }

            const previewUrl = URL.createObjectURL(file);
            setPreviews(prev => ({
                ...prev,
                [name]: previewUrl
            }));
        }
    };

    const handleRemoveFile = (name) => {
        setFiles(prev => ({ ...prev, [name]: null }));
        if (previews[name]) {
            URL.revokeObjectURL(previews[name]);
        }
        setPreviews(prev => ({ ...prev, [name]: null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!files.micrometerImage || !files.materialImage || !files.processedBy) {
            setError("All image fields (Micrometer, Material, Processed By) are required.");
            return;
        }

        try {
            setLoading(true);
            const data = new FormData();

            // Append text/boolean fields
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value);
            });

            // Append files
            data.append("micrometerImage", files.micrometerImage);
            data.append("materialImage", files.materialImage);
            data.append("processedBy", files.processedBy);

            const response = await axios.post(`/api/order/qc/${orderId}`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data.success || response.status === 200) {
                setSuccess(true);
                setTimeout(() => {
                    router.push(`/${role}/orders/${orderId}`);
                }, 2000);
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to submit QC form");
        } finally {
            setLoading(false);
        }
    };

    const FileUploadComponent = ({ label, name, required, IconDoc = PhotoIcon }) => (
        <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 min-h-[40px]">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className={`relative flex justify-center border border-dashed rounded-2xl transition-all duration-200 overflow-hidden ${files[name] ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/40 hover:bg-gray-50'}`}>
                {files[name] ? (
                    <div className="relative w-full aspect-4/3 group bg-gray-50">
                        <img
                            src={previews[name]}
                            alt={files[name].name}
                            className="w-full h-full object-cover rounded-xl"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                            <DocumentCheckIcon className="h-8 w-8 text-white mb-2" />
                            <p className="text-xs text-white font-medium truncate w-full text-center px-2">
                                {files[name].name}
                            </p>
                            <button
                                type="button"
                                onClick={() => handleRemoveFile(name)}
                                className="mt-3 px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                            >
                                <XMarkIcon className="w-3.5 h-3.5" strokeWidth={3} /> Remove
                            </button>
                        </div>
                    </div>
                ) : (
                    <label htmlFor={name} className="w-full cursor-pointer aspect-4/3 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                            {/* <PhotoIcon className="h-8 w-8 text-gray-400 group-hover:text-primary transition-colors" /> */}
                            <IconDoc className="h-8 w-8 text-gray-400 group-hover:text-primary transition-colors" />
                        </div>
                        <div className="flex text-sm text-gray-600 justify-center">
                            <div
                                className="relative cursor-pointer rounded-md font-bold text-gray-600 focus-within:outline-none"
                            >
                                <span>Click to upload</span>
                                <input
                                    id={name}
                                    name={name}
                                    type="file"
                                    accept="image/*"
                                    className="sr-only"
                                    onChange={handleFileChange}
                                    required={required}
                                />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">JPG, PNG up to 10MB</p>
                    </label>
                )}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen font-sans bg-[#f8fafc] pb-24">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-10">

                {/* Header */}
                <div className="mb-8 flex items-center gap-3">
                    <button
                        onClick={() => router.back()}
                        className="p-1.5 text-gray-500 bg-white border border-gray-200 shadow-sm hover:text-gray-900 transition-colors rounded-md hover:bg-gray-50"
                    >
                        <ChevronLeftIcon className="w-5 h-5" strokeWidth={2.5} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
                            QC Outbound Inspection
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Order #{orderId?.slice(-6).toUpperCase()}
                        </p>
                    </div>
                </div>

                {success && (
                    <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                        <DocumentCheckIcon className="w-6 h-6 text-emerald-600" />
                        <div>
                            <h3 className="text-emerald-800 font-bold">QC Submitted Successfully</h3>
                            <p className="text-emerald-600 text-sm">Redirecting back to order details...</p>
                        </div>
                    </div>
                )}

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* General Information Card */}
                    <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 p-6 md:p-8">
                        <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-4 mb-6">General Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Distributor Code</label>
                                <input
                                    type="text"
                                    name="distributorCode"
                                    value={formData.distributorCode}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                    placeholder="e.g. DIST-001"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Distributor Account Name</label>
                                <input
                                    type="text"
                                    name="distributorAccountName"
                                    value={formData.distributorAccountName}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                    placeholder="Account Name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Order Material Code</label>
                                <input
                                    type="text"
                                    name="orderMaterialCode"
                                    value={formData.orderMaterialCode}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                    placeholder="e.g. MAT-001"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Order Length (2M WIDE ROLL)</label>
                                <input
                                    type="number"
                                    name="orderLength"
                                    value={formData.orderLength}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                    placeholder="0.0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Inspection Checklist Card */}
                    <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 p-6 md:p-8">
                        <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-4 mb-6">Inspection Checklist</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                            {[
                                { name: "productThicknessWithinSpec", label: "Product Thickness within Specification (2.75MM – 0.05MM)" },
                                { name: "materialFreeFromSurfaceDefects", label: "Material Free from Surface Defects" },
                                { name: "productCleanAndFitForPurpose", label: "Product Clean & Fit for Purpose" },
                                { name: "orderReadyForShipment", label: "Order Ready for Shipment" }
                            ].map((field) => (
                                <div key={field.name} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                                    <div className="relative flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            name={field.name}
                                            id={field.name}
                                            checked={formData[field.name]}
                                            onChange={handleInputChange}
                                            className="w-5 h-5 text-primary bg-white border-2 border-gray-300 rounded cursor-pointer focus:ring-primary focus:ring-offset-2 transition-all checked:border-primary"
                                        />
                                    </div>
                                    <label htmlFor={field.name} className="text-sm font-medium text-gray-700 cursor-pointer select-none flex-1">
                                        {field.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Shipping Details */}
                    <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 p-6 md:p-8">
                        <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-4 mb-6">Shipping Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Pallet Dimensions</label>
                                <input
                                    type="text"
                                    name="palletDimensions"
                                    value={formData.palletDimensions}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                    placeholder="e.g. 120 x 100 x 150 cm"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Pallet Weight</label>
                                <input
                                    type="number"
                                    name="palletWeight"
                                    value={formData.palletWeight}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                                    placeholder="0.0"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Documentation / Images */}
                    <div className="bg-white rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.1)] border border-gray-100 p-6 md:p-8">
                        <h3 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-4 mb-6">Photographic Evidence</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FileUploadComponent
                                label="Micrometer showing thickness spec"
                                name="micrometerImage"
                                IconDoc={({ className }) => (
                                    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M16 22c-1.886 0-2.828 0-3.414-.586c-.503-.502-.574-1.267-.584-2.664L12 17.25V6.75l.002-1.5c.01-1.397.081-2.162.584-2.664C13.172 2 14.114 2 16 2h2c1.886 0 2.828 0 3.414.586S22 4.114 22 6v12c0 1.886 0 2.828-.586 3.414S19.886 22 18 22z" opacity={0.5}></path>
                                        <path fill="currentColor" d="M15 8.25h-3v1.5h3a.75.75 0 0 0 0-1.5m-1-3h-1.998L12 6.75h2a.75.75 0 0 0 0-1.5m0 6h-2v1.5h2a.75.75 0 0 0 0-1.5m1 3h-3v1.5h3a.75.75 0 0 0 0-1.5m-1 3h-2l.002 1.5H14a.75.75 0 0 0 0-1.5m-6-2.27V7a7.9 7.9 0 0 1-3 .59A7.9 7.9 0 0 1 2 7v7.98c0 .622 0 .934.038 1.24a5 5 0 0 0 .25 1.056c.102.29.241.569.52 1.126l1.468 2.937a.809.809 0 0 0 1.448 0l1.468-2.937c.279-.557.418-.835.52-1.126a5 5 0 0 0 .25-1.057C8 15.914 8 15.602 8 14.98"></path>
                                        <path fill="currentColor" d="M5 2a3 3 0 0 1 3 3v2a7.9 7.9 0 0 1-3 .589A7.9 7.9 0 0 1 2 7V5a3 3 0 0 1 3-3" opacity={0.5}></path>
                                    </svg>
                                )}
                                required={true}
                            />
                            <FileUploadComponent
                                IconDoc={({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 14.195c-.176 0-.348-.046-.5-.133l-9-5.198a1 1 0 0 1 0-1.732l9-5.194c.31-.177.69-.177 1 0l9 5.194a1 1 0 0 1 0 1.732l-9 5.198a1 1 0 0 1-.5.133" opacity={0.25}></path>
                                    <path fill="currentColor" d="m21.5 11.132l-1.964-1.134l-7.036 4.064c-.31.178-.69.178-1 0L4.464 9.998L2.5 11.132a1 1 0 0 0 0 1.732l9 5.198c.31.178.69.178 1 0l9-5.198a1 1 0 0 0 0-1.732" opacity={0.5}></path>
                                    <path fill="currentColor" d="m21.5 15.132l-1.964-1.134l-7.036 4.064c-.31.178-.69.178-1 0l-7.036-4.064L2.5 15.132a1 1 0 0 0 0 1.732l9 5.198c.31.178.69.178 1 0l9-5.198a1 1 0 0 0 0-1.732"></path>
                                </svg>)}
                                label="Material picture before wrapping"
                                name="materialImage"
                                required={true}
                            />
                            <FileUploadComponent
                                IconDoc={({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
                                    <g fill="currentColor" fillRule="evenodd" clipRule="evenodd">
                                        <path d="M15.326 22.704h-2.26a7.4 7.4 0 0 1-1.419-.21a7.4 7.4 0 0 1-1.11-.63a1.5 1.5 0 0 0-.51-.13c-.43 0-.89.4-1.36.62a.23.23 0 0 1-.26 0c-.1-.06-.06-.19-.06-.32a9 9 0 0 0 0-1.36a.56.56 0 0 0-.32-.46a.54.54 0 0 0-.63.11c-.06.06-.22.46-.3.61l-.589.77a3.4 3.4 0 0 1-1 .74a1.11 1.11 0 0 1-1 0a2.34 2.34 0 0 1-1.13-1.6a17 17 0 0 0 1.57-3c.19-.449.36-.919.51-1.389s.24-1 .33-1.44c0 0 .07-.54.1-.74a1 1 0 0 0 0-.12a.5.5 0 0 0-.091-.393a.55.55 0 0 0-.599-.206a3.36 3.36 0 0 0-2 1.47a7.26 7.26 0 0 0-1.16 3.199a7.1 7.1 0 0 0 .15 2.89A8.3 8.3 0 0 1 .18 23.113a.35.35 0 1 0 .4.57a8.7 8.7 0 0 0 1.86-1.64c.3.67.814 1.221 1.46 1.57a2.3 2.3 0 0 0 1.68.13a4 4 0 0 0 1.759-1.18c.074.26.236.487.46.64a1.2 1.2 0 0 0 1 .19c.292-.104.562-.26.8-.46c.14-.09.24-.22.38-.22s.64.35 1 .52q.2.103.419.16c.53.101 1.07.158 1.61.17c.76 0 1.54 0 2.3-.07a.39.39 0 0 0 .277-.664a.4.4 0 0 0-.258-.126M3.27 18.454a6.3 6.3 0 0 1 .92-2.659q.16-.263.37-.49a9 9 0 0 1-.19.91q-.133.665-.34 1.31a20 20 0 0 1-.77 1.83a7 7 0 0 1 .01-.9"></path>
                                        <path d="M23.935 5.367a.38.38 0 0 0-.55 0q-.629.492-1.18 1.07c-.65.65-1.25 1.34-1.91 2a.35.35 0 0 0-.13-.44c-.56-.5-1.09-1-1.67-1.49l-.75-.59a9 9 0 0 0-.799-.53c-.56-.34-1.14-.62-1.71-.92c.43-1.3.91-2.589 1.37-3.829a.36.36 0 0 0-.19-.46a.35.35 0 0 0-.45.19c-.6 1.28-1.22 2.59-1.78 3.93c-.39.9-.74 1.81-1 2.719a.72.72 0 0 0 .37.77l.37.21l1.35.7l2.51 1.49c0 .67-.13 1.64-.25 2.619c-.09.77-.21 1.52-.32 2.08c0 .3 0 .69-.15.64a3.5 3.5 0 0 1-.77.42c-.49.21-1.11.38-1.73.63a17.6 17.6 0 0 1-4.479 1.119c-.19-1.4-.65-4.78-.64-5.24a2.67 2.67 0 0 1 .7-1.999a10 10 0 0 1 3.24-2a.35.35 0 0 0 .19-.46a.34.34 0 0 0-.45-.2a10.2 10.2 0 0 0-3.86 1.78a3.71 3.71 0 0 0-1.15 2.9c0 .5.75 3.76 1.06 5.089l.12.51c0 .15-.38 1.48 6.41-.54a5.4 5.4 0 0 0 2.439-1.26c.131-.18.217-.39.25-.61a10 10 0 0 0 .17-1.55c.05-1.12 0-2.489 0-3.479h.07a.74.74 0 0 0 .68.05q.668-.428 1.22-1c.85-.85 1.549-1.84 2.339-2.749q.459-.569 1-1.06a.4.4 0 0 0 .06-.51m-4.18 3.54c-.81.84-.23.83-2.46-.58q-.659-.42-1.379-.81l-1.4-.69c.13-.52.3-1 .46-1.56c.41.38.8.78 1.23 1.14c.25.21.5.4.76.58s.52.36.8.53c.64.39 1.29.74 1.94 1.11a.37.37 0 0 0 .27.06z"></path>
                                        <path d="M11.387 16.825c.258-.184.475-.419.64-.69c.15-.24.26-.32.39-.57c.3-.6.54-1.2.8-1.79c2.21.56 2.52-.9 2.57-1.35a1.92 1.92 0 0 0-.92-1.829a2.21 2.21 0 0 0-1.91-.17a2 2 0 0 0-1.09 1.57a1.41 1.41 0 0 0 .6 1.44c-.37.48-.75.95-1.12 1.45l-.48.69a2.7 2.7 0 0 0-.35.89c-.13.699.33.719.87.36m1.64-4.549a.9.9 0 0 1 .44-.63a1 1 0 0 1 .82.07a.77.77 0 0 1 .45.68c0 .58-.55 1-1.51.42a.43.43 0 0 1-.2-.54"></path>
                                    </g>
                                </svg>)}
                                label="Picture of Processed by/Signature"
                                name="processedBy"
                                required={true}
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-2.5 text-sm font-bold text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-800 rounded-xl transition-all shadow-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || success}
                            className="px-8 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary/90 rounded-xl transition-all shadow-sm flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <ArrowPathIcon className="w-5 h-5 animate-spin" />
                                    Submitting
                                </>
                            ) : (
                                "Submit QC Report"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
