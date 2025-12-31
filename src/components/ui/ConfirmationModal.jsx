"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ExclamationTriangleIcon, CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    type = "delete", // 'delete' | 'save' | 'info'
    confirmText = "Confirm",
    cancelText = "Cancel",
    isLoading = false,
}) {
    if (!isOpen) return null;

    const isDelete = type === "delete";
    const Icon = isDelete ? ExclamationTriangleIcon : CheckCircleIcon;
    const iconColor = isDelete ? "text-red-600" : "text-emerald-600";
    const iconBg = isDelete ? "bg-red-50" : "bg-emerald-50";
    const buttonColor = isDelete ? "bg-red-600 hover:bg-red-700" : "bg-primary hover:bg-primary/90";

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={!isLoading ? onClose : undefined}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="fixed z-50 bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        <div className="p-6 text-center relative">
                            <button
                                onClick={onClose}
                                disabled={isLoading}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>

                            <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${iconBg} mb-5`}>
                                <Icon className={`h-8 w-8 ${iconColor}`} />
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {title}
                            </h3>

                            <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                                {message}
                            </p>

                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    onClick={onClose}
                                    disabled={isLoading}
                                    className="w-full py-2.5 px-4 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 focus:ring-2 focus:ring-gray-200 transition-all text-sm"
                                >
                                    {cancelText}
                                </button>
                                <button
                                    onClick={onConfirm}
                                    disabled={isLoading}
                                    className={`w-full py-2.5 px-4 text-white font-medium rounded-xl shadow-sm focus:ring-2 focus:ring-offset-2 transition-all text-sm flex items-center justify-center ${buttonColor} ${isDelete ? 'focus:ring-red-500' : 'focus:ring-primary'}`}
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        confirmText
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
