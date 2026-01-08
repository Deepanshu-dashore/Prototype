import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { comparisonData } from "../../data/comparison";
import { motion } from "framer-motion";

export default function ComparisonTable() {
    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-0 mb-6 sticky top-20 z-10">
                <div className="col-span-4 px-6 py-4">
                    {/* Feature label spacer */}
                </div>
                <div className="col-span-4 bg-primary text-white rounded-t-2xl px-6 py-5 text-center shadow-lg transform scale-[1.02] z-10 border-b border-primary-dark">
                    <span className="text-xs font-bold uppercase tracking-widest block mb-1 opacity-80">Our Solution</span>
                    <span className="text-sm font-bold">CCM Portable Cleanroom Mats</span>
                </div>
                <div className="col-span-4 bg-gray-50 text-neutral-500 rounded-t-2xl px-6 py-5 text-center border-t border-l border-r border-gray-200">
                    <span className="text-xs font-bold uppercase tracking-widest block mb-1 opacity-60">Alternative</span>
                    <span className="text-sm font-semibold">Peel Off Mats</span>
                </div>
            </div>

            {/* Mobile Sticky Header */}
            <div className="md:hidden grid grid-cols-2 gap-2 mb-4 sticky top-16 z-20">
                <div className="bg-primary text-white p-3 rounded-xl text-center shadow-md">
                    <span className="text-[10px] font-bold uppercase block opacity-80">CCM Portable</span>
                </div>
                <div className="bg-gray-100 text-neutral-500 p-3 rounded-xl text-center border border-gray-200">
                    <span className="text-[10px] font-bold uppercase block opacity-60">Peel Off</span>
                </div>
            </div>

            {/* Content Rows */}
            <div className="space-y-3">
                {comparisonData.map((row, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                        className="group flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-0 items-stretch"
                    >
                        {/* Feature Label */}
                        <div className="md:col-span-4 flex items-center px-4 md:px-6 py-3 md:py-4 bg-white md:bg-transparent rounded-xl md:rounded-none border border-gray-100 md:border-none md:border-y md:border-gray-100 shadow-sm md:shadow-none transition-colors group-hover:bg-gray-50/30">
                            <span className="text-sm font-medium text-neutral-700 leading-tight">
                                {row.label}
                            </span>
                        </div>

                        {/* CCM Portable (Premium Column) */}
                        <div className="md:col-span-4 bg-primary/3 md:bg-primary/1 group-hover:bg-primary/5 border-x-0 md:border-x-2 border-primary/20 md:border-y md:border-gray-100 flex items-center justify-center p-4 transition-colors relative">
                            {idx === 0 && <div className="hidden md:block absolute -top-1 left-0 right-0 h-1 bg-primary/20" />}
                            <div className="flex items-center justify-center">
                                {typeof row.premium === "boolean" ? (
                                    row.premium ? (
                                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md shadow-primary/20">
                                            <CheckIcon className="h-5 w-5" />
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center">
                                            <XMarkIcon className="h-5 w-5" />
                                        </div>
                                    )
                                ) : (
                                    <span className="text-sm font-bold text-primary text-center px-2">
                                        {row.premium}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Peel Off (Standard Column) */}
                        <div className="md:col-span-4 bg-gray-50/50 flex items-center justify-center p-4 border border-gray-100 md:border-none md:border-y md:border-gray-100 rounded-xl md:rounded-none transition-colors">
                            <div className="flex items-center justify-center">
                                {typeof row.standard === "boolean" ? (
                                    row.standard ? (
                                        <div className="w-8 h-8 rounded-full bg-gray-400 text-white flex items-center justify-center opacity-60">
                                            <CheckIcon className="h-5 w-5" />
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-300 flex items-center justify-center">
                                            <XMarkIcon className="h-5 w-5" />
                                        </div>
                                    )
                                ) : (
                                    <span className="text-sm font-medium text-neutral-500 text-center px-2">
                                        {row.standard}
                                    </span>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Footer Note */}
            <div className="mt-8 text-center text-xs text-neutral-400 font-medium italic">
                * Based on internal testing and comparative performance analysis.
            </div>
        </div>
    );
}
