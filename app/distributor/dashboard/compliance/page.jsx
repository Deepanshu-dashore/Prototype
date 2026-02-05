"use client";

import { DocumentCheckIcon, ArrowUpTrayIcon, DocumentIcon } from "@heroicons/react/24/outline";

export default function ComplianceDocsPage() {
    const dummyDocs = [
        { name: "Reseller Certificate.pdf", date: "2023-10-15", size: "1.2 MB" },
        { name: "Tax Exemption Form.pdf", date: "2023-11-02", size: "850 KB" },
    ];

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-green-50 rounded-xl">
                    <DocumentCheckIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Compliance Documents</h1>
                    <p className="text-sm text-gray-500">Manage your certifications and legal documents</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Upload Section */}
                <div className="md:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                            <h2 className="font-semibold text-gray-900">Your Documents</h2>
                            <button className="text-sm text-primary font-medium hover:underline">View All</button>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {dummyDocs.length > 0 ? (
                                dummyDocs.map((doc, idx) => (
                                    <div key={idx} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
                                                <DocumentIcon className="w-6 h-6 text-gray-500" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                                                <p className="text-xs text-gray-500">{doc.date} • {doc.size}</p>
                                            </div>
                                        </div>
                                        <button className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md transition-colors">
                                            Download
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="p-8 text-center text-gray-500">
                                    No documents uploaded yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sidebar / Upload Action */}
                <div className="space-y-6">
                    <div className="bg-primary/5 rounded-xl border border-primary/10 p-6 text-center">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <ArrowUpTrayIcon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-sm font-semibold text-gray-900 mb-1">Upload New Document</h3>
                        <p className="text-xs text-gray-500 mb-4">
                            Supported formats: PDF, JPG, PNG. Max size: 5MB.
                        </p>
                        <button className="w-full py-2 px-4 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-all shadow-sm shadow-primary/20">
                            Choose File
                        </button>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Required Documents</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2 text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                Business License/Registration
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0" />
                                Tax Identification Number
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 shrink-0" />
                                Proof of Address (Utility Bill)
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
