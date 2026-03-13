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
    icon = null,
    isLoading = false,
}) {
    if (!isOpen) return null;

    const isDelete = type === "delete";
    const isLogout = type === "logout";
    const Icon = isDelete ? ExclamationTriangleIcon : isLogout ? icon : icon ? icon : CheckCircleIcon;
    const iconColor = isDelete ? "text-red-600" : isLogout ? "text-red-600" : "text-blue-600";
    const iconBg = isDelete ? "bg-red-50" : isLogout ? "bg-red-50" : "bg-blue-50";
    const buttonColor = isDelete ? "bg-red-600 hover:bg-red-700" : isLogout ? "bg-red-600 hover:bg-red-700" : "bg-primary hover:bg-primary/90";

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
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="fixed z-50 bg-white rounded-xl sm:rounded-2xl shadow-xl w-[calc(100%-1.5rem)] sm:w-[calc(100%-2rem)] max-w-[320px] sm:max-w-sm md:max-w-md overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        <div className="p-4 sm:p-5 md:p-6 text-center relative">
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                disabled={isLoading}
                                className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                            >
                                <XMarkIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>

                            {/* Icon */}
                            <div className={`mx-auto flex h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 items-center justify-center rounded-full ${iconBg} mb-3 sm:mb-4 md:mb-5`}>
                                <Icon className={`h-6 w-6 sm:h-7 sm:w-7 md:h-9 md:w-9 ${iconColor}`} />
                            </div>

                            {/* Title */}
                            <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2">
                                {title}
                            </h3>

                            {/* Message */}
                            <p className="text-xs sm:text-sm text-gray-500 mb-5 sm:mb-6 md:mb-8 leading-relaxed px-1 sm:px-2">
                                {message}
                            </p>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                <button
                                    onClick={onClose}
                                    disabled={isLoading}
                                    className="w-full py-2 sm:py-2.5 px-3 sm:px-4 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg sm:rounded-xl hover:bg-gray-50 hover:border-gray-300 focus:ring-2 focus:ring-gray-200 transition-all text-xs sm:text-sm"
                                >
                                    {cancelText}
                                </button>
                                <button
                                    onClick={onConfirm}
                                    disabled={isLoading}
                                    className={`w-full py-2 sm:py-2.5 px-3 sm:px-4 text-white font-medium rounded-lg sm:rounded-xl shadow-sm focus:ring-2 focus:ring-offset-2 transition-all text-xs sm:text-sm flex items-center justify-center ${buttonColor} ${isDelete ? 'focus:ring-red-500' : 'focus:ring-primary'}`}
                                >
                                    {isLoading ? (
                                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
