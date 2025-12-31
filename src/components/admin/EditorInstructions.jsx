"use client";

import { useState } from "react";
import { QuestionMarkCircleIcon, XMarkIcon, LightBulbIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

export default function EditorInstructions() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Improved Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 bg-indigo-600 text-white p-3.5 rounded-full shadow-lg hover:bg-indigo-700 transition-all hover:scale-105 z-50 flex items-center gap-2 group"
                title="Formatting Help"
            >
                <QuestionMarkCircleIcon className="w-6 h-6" />
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap text-sm font-medium">
                    Help Guide
                </span>
            </button>

            {/* Improved Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:p-8 pointer-events-none">
                        <div
                            className="absolute inset-0 bg-black/20 backdrop-blur-[2px] pointer-events-auto transition-opacity"
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                            className="bg-white z-50 w-full sm:w-80 rounded-2xl shadow-2xl border border-gray-100 pointer-events-auto overflow-hidden flex flex-col max-h-[80vh]"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-4 bg-indigo-50/50 border-b border-indigo-100">
                                <div className="flex items-center gap-2 text-indigo-900">
                                    <LightBulbIcon className="w-5 h-5 text-indigo-600" />
                                    <h3 className="font-bold text-base">Editor Guide</h3>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 hover:bg-white/50 p-1 rounded-full transition-colors"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-6 space-y-6 overflow-y-auto">
                                {/* Headings Section */}
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        Headings & Structure
                                    </h4>
                                    <div className="space-y-2.5">
                                        <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 border border-gray-100">
                                            <span className="shrink-0 font-bold text-gray-700 bg-white px-2 py-1 rounded border border-gray-200 text-xs shadow-sm">H1</span>
                                            <span className="text-sm text-gray-600">Main Title</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 border border-gray-100">
                                            <span className="shrink-0 font-bold text-gray-700 bg-white px-2 py-1 rounded border border-gray-200 text-xs shadow-sm">H2</span>
                                            <span className="text-sm text-gray-600">Major Sections</span>
                                        </div>
                                        <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 border border-gray-100">
                                            <span className="shrink-0 font-bold text-gray-700 bg-white px-2 py-1 rounded border border-gray-200 text-xs shadow-sm">H3</span>
                                            <span className="text-sm text-gray-600">Sub-sections</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Formatting Section */}
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900 mb-3">Text Formatting</h4>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100">
                                            <span className="w-6 h-6 flex items-center justify-center font-bold text-gray-800 bg-white rounded border border-gray-200 text-xs shadow-sm">B</span>
                                            <span className="text-sm text-gray-600">Bold</span>
                                        </div>
                                        <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100">
                                            <span className="w-6 h-6 flex items-center justify-center italic font-serif text-gray-800 bg-white rounded border border-gray-200 text-xs shadow-sm">I</span>
                                            <span className="text-sm text-gray-600">Italic</span>
                                        </div>
                                        <div className="col-span-2">
                                            <div className="bg-gray-50 border-l-[3px] border-indigo-400/60 pl-3 pr-3 py-3 rounded-r italic text-sm text-gray-700">
                                                “Styled Quote Block”
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1 text-center">Quote</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Lists Section */}
                                <div>
                                    <h4 className="text-sm font-bold text-gray-900 mb-3">Lists</h4>
                                    <div className="space-y-2">
                                        <div className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                                            <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                                            <p className="text-sm text-gray-600 leading-snug">
                                                Use <span className="font-semibold text-gray-900">Bullet Lists</span> for unordered items or features.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors">
                                            <span className="text-xs font-semibold text-indigo-600 mt-0.5 shrink-0">1.</span>
                                            <p className="text-sm text-gray-600 leading-snug">
                                                Use <span className="font-semibold text-gray-900">Numbered Lists</span> for steps, rankings, or ordered sequences.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Hint */}
                            <div className="p-4 bg-gray-50 text-xs text-center text-gray-500 border-t border-gray-100">
                                Pro Tip: Highlight text to see formatting options popup (if available) or use the toolbar.
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
