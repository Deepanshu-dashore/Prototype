"use client";

import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ViewEnquiryModal({
    isOpen,
    onClose,
    enquiry
}) {
    if (!isOpen || !enquiry) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-60 flex items-center justify-center p-4"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="fixed z-60 bg-white rounded-xl shadow-xl w-[calc(100%-2rem)] max-w-2xl overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                            <h2 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-3">
                                Enquiry Details
                                <span className="text-xs font-semibold px-2 py-1 bg-white border border-gray-200 text-gray-600 rounded-md shadow-sm">
                                    ID #{enquiry._id?.slice(-6).toUpperCase()}
                                </span>
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-full hover:bg-gray-200"
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-0 max-h-[calc(100vh-200px)] overflow-y-auto">
                            <table className="w-full text-left border-collapse">
                                <tbody className="divide-y divide-gray-100">
                                    <tr className="hover:bg-gray-50/30 transition-colors">
                                        <th className="w-1/3 px-6 py-4 text-sm font-semibold text-gray-500 bg-gray-50/30 border-r border-gray-100 align-top">
                                            Submission Date
                                        </th>
                                        <td className="w-2/3 px-6 py-4 text-sm font-medium text-gray-900">
                                            {new Date(enquiry.createdAt).toDateString()}
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50/30 transition-colors">
                                        <th className="w-1/3 px-6 py-4 text-sm font-semibold text-gray-500 bg-gray-50/30 border-r border-gray-100 align-top">
                                            Full Name
                                        </th>
                                        <td className="w-2/3 px-6 py-4 text-sm font-semibold text-gray-900 capitalize">
                                            {enquiry.fullName || "N/A"}
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50/30 transition-colors">
                                        <th className="w-1/3 px-6 py-4 text-sm font-semibold text-gray-500 bg-gray-50/30 border-r border-gray-100 align-top">
                                            Phone Number
                                        </th>
                                        <td className="w-2/3 px-6 py-4 text-sm font-medium text-gray-900 font-mono">
                                            {enquiry.phone || "N/A"}
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50/30 transition-colors">
                                        <th className="w-1/3 px-6 py-4 text-sm font-semibold text-gray-500 bg-gray-50/30 border-r border-gray-100 align-top">
                                            Email Address
                                        </th>
                                        <td className="w-2/3 px-6 py-4 text-sm font-medium text-indigo-600">
                                            <a href={`mailto:${enquiry.email}`} className="hover:underline">
                                                {enquiry.email || "N/A"}
                                            </a>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50/30 transition-colors">
                                        <th className="w-1/3 px-6 py-4 text-sm font-semibold text-gray-500 bg-gray-50/30 border-r border-gray-100 align-top">
                                            Product of Interest
                                        </th>
                                        <td className="w-2/3 px-6 py-4 text-sm font-semibold text-gray-900">
                                            <span className="inline-block px-2.5 py-1 bg-gray-100 rounded-md border border-gray-200">
                                                {enquiry.productOfInterest || "N/A"}
                                            </span>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-50/30 transition-colors">
                                        <th className="w-1/3 px-6 py-4 text-sm font-semibold text-gray-500 bg-gray-50/30 border-r border-gray-100 align-top inline-block h-full">
                                            Message
                                        </th>
                                        <td className="w-2/3 px-6 py-4 text-sm font-medium text-gray-700 whitespace-pre-wrap leading-relaxed min-h-[100px]">
                                            {enquiry.message || <span className="text-gray-400 italic">No message provided</span>}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Footer */}
                        {/* <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end rounded-b-xl">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-gray-200 focus:outline-none"
                            >
                                Close
                            </button>
                        </div> */}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
