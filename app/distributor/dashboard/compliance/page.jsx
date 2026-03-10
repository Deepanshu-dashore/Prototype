"use client";

import { useState, useEffect } from "react";
import axios from "@/app/lib/utils/axiosConfig";
import { motion } from "framer-motion";
import {
    DocumentCheckIcon,
    DocumentIcon,
    ShieldCheckIcon,
    BeakerIcon,
    GlobeAmericasIcon,
    BoltIcon,
    ChartBarIcon,
    ExclamationCircleIcon,
    CheckBadgeIcon,
    DocumentTextIcon,
    EyeIcon,
    ArrowPathIcon
} from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { TableEmptyState, TableLoadingSkeleton } from "@/src/components/ui/TableState";

export default function ComplianceDocsPage() {
    const [docs, setDocs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [distributorId, setDistributorId] = useState(null);

    const complianceDocs = [
        { name: "ISO 9001", description: "Quality Management System Certification", icon: CheckBadgeIcon, category: "Quality", status: "Current", href: "/compliances/doc/CC Matting - ISO 9001-2015 - 2025 - 2026.pdf" },
        { name: "ISO 45001", description: "Occupational Health and Safety Management", icon: ShieldCheckIcon, category: "Health & Safety", status: "Current", href: "/compliances/doc/ISO 45001-2018 SEP 25.pdf" },
        { name: "Anti-Microbial Efficacy - A", description: "In-depth efficacy testing results - Report A", icon: BeakerIcon, category: "Efficacy", status: "Report", href: "#" },
        { name: "Anti-Microbial Efficacy - B", description: "In-depth efficacy testing results - Report B", icon: BeakerIcon, category: "Efficacy", status: "Report", href: "#" },
        { name: "BPR/EPA", description: "Biocidal Products Regulation compliance data", icon: GlobeAmericasIcon, category: "Regulation", status: "Regulatory", href: "#" },
        { name: "Static Dissipative Testing", description: "ESD performance and resistance testing", icon: BoltIcon, category: "Performance", status: "Certified", href: "/compliances/doc/CCM STATIC DISSIPATIVE TEST RESULTS 2026.pdf" },
        { name: "CCMatting Efficacy Data", description: "Internal performance and validation data", icon: ChartBarIcon, category: "Performance", status: "Internal", href: "#" },
        { name: "SDS SDS", description: "Safety data and material specifications", icon: ExclamationCircleIcon, category: "Safety", status: "Standard", href: "/compliances/doc/CCM MSDS.pdf" },
        { name: "CCM NPI Brochure 2026", description: "New Product Introduction Brochure 2026", icon: DocumentTextIcon, category: "Product", status: "Current", href: "/compliances/doc/CCM NPI BROCH IE 2026.pdf" }
    ];

    useEffect(() => {
        fetchDocs();
    }, []);

    const fetchDocs = async () => {
        try {
            setLoading(true);
            const res = await axios.get("/api/distributor/upload-compliance");
            if (res.data?.success) {
                setDocs(res.data.data || []);
            }

            // Also need distributor ID for uploads
            const profileRes = await axios.get("/api/distributor/me");
            if (profileRes.data?.success) {
                setDistributorId(profileRes.data.data._id);
            }
        } catch (err) {
            console.error("Failed to fetch documents:", err);
            setError("Failed to load your documents. Please refresh the page.");
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = async (e) => {
        // Removed as per request (view only)
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="max-w-6xl mx-auto px-4 md:px-0 space-y-10 pb-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
                        <DocumentCheckIcon className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                        <h1 className="md:text-2xl text-lg font-bold text-gray-800">
                            Compliance Center
                        </h1>
                        <p className="md:text-sm md:inline hidden text-[10px] text-gray-500">Official certifications and your distribution documentation</p>
                    </div>
                </div>
            </div>

            <div className="space-y-10">
                {/* Global Certifications Table */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
                        <div className="flex items-center gap-2">
                            <ShieldCheckIcon className="w-5 h-5 text-emerald-600" />
                            <h2 className="font-bold text-gray-800 uppercase tracking-wider text-sm">CC Matting Official Certifications</h2>
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Company Standards</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50/50 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Document Name</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest hidden md:table-cell">Category</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                    <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {complianceDocs.map((doc, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white group-hover:shadow-xs transition-all ring-1 ring-gray-100 group-hover:ring-gray-200">
                                                    <doc.icon className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">{doc.name}</p>
                                                    <p className="text-[11px] text-gray-400 font-medium">{doc.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 hidden md:table-cell">
                                            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                                                {doc.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                <span className="text-xs font-bold text-emerald-600 uppercase tracking-tighter">{doc.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <a
                                                href={doc.href}
                                                target={doc.href !== '#' ? "_blank" : "_self"}
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all shadow-xs"
                                            >
                                                <EyeIcon className="w-3.5 h-3.5" />
                                                View
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Partnership Documents Table */}
                {(loading || docs.length > 0) && (
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-50 bg-gray-50/30 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <DocumentTextIcon className="w-5 h-5 text-indigo-600" />
                                <h2 className="font-bold text-gray-800 uppercase tracking-wider text-sm">Partnership Documents</h2>
                            </div>
                            <button onClick={fetchDocs} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                                <ArrowPathIcon className={`w-4 h-4 ${loading ? 'animate-spin text-primary' : ''}`} />
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50/50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Document Name</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest hidden sm:table-cell">Last Updated</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                                        <th className="px-6 py-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {loading ? (
                                        <TableLoadingSkeleton columns={4} rows={2} />
                                    ) : (
                                        docs.map((doc, idx) => (
                                            <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-indigo-50/50 rounded-lg ring-1 ring-indigo-50 group-hover:bg-white group-hover:shadow-xs transition-all">
                                                            <DocumentIcon className="w-5 h-5 text-indigo-400" />
                                                        </div>
                                                        <p className="text-sm font-bold text-gray-900 capitalize">
                                                            {doc.name.replace(/([0-9])/, ' $1')}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 hidden sm:table-cell">
                                                    <p className="text-xs font-medium text-gray-500">
                                                        {doc.updatedAt ? formatDate(doc.updatedAt) : "Available"}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase tracking-tighter">
                                                        AVAILABLE
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <a
                                                        href={doc.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all shadow-xs"
                                                    >
                                                        <EyeIcon className="w-3.5 h-3.5" />
                                                        View
                                                    </a>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
