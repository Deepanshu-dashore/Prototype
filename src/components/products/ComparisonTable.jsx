import { CheckBadgeIcon, ArchiveBoxXMarkIcon } from "@heroicons/react/24/solid";
import { comparisonData } from "../../data/comparison";
import { motion } from "framer-motion";

export default function ComparisonTable() {
    return (
        <div className="w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_4px_6px_-2px_rgba(0,0,0,0.05)] border border-gray-200 overflow-hidden">
            {/* Headers */}
            <div className="hidden md:grid grid-cols-12 divide-x divide-gray-200 border-b border-gray-200">
                <div className="col-span-4 px-8 py-5 flex items-center bg-gray-50/30">
                    <span className="text-sm font-bold text-neutral-dark uppercase tracking-wider">Highlights</span>
                </div>
                <div className="col-span-4 px-8 py-5 text-center bg-emerald-600 text-white">
                    <span className="text-sm font-bold">CCM Portable Cleanroom Mats</span>
                </div>
                <div className="col-span-4 px-8 py-5 text-center bg-rose-500 text-white">
                    <span className="text-sm font-bold">Peel Off Mats</span>
                </div>
            </div>

            {/* Mobile Headers */}
            <div className="md:hidden grid grid-cols-2 divide-x divide-white border-b border-gray-200">
                <div className="bg-emerald-600 text-white p-4 text-center">
                    <span className="text-xs font-bold">CCM Portable</span>
                </div>
                <div className="bg-rose-500 text-white p-4 text-center">
                    <span className="text-xs font-bold">Peel Off Mats</span>
                </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
                {comparisonData.map((row, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col md:grid md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-gray-200"
                    >
                        {/* Feature Label */}
                        <div className="md:col-span-4 flex items-center px-8 py-4 bg-white">
                            <span className="text-[13px] font-medium text-neutral-600">
                                {row.label}
                            </span>
                        </div>

                        {/* Our Solution (Highlighted) */}
                        <div className="md:col-span-4 flex items-center px-8 py-4 bg-emerald-50">
                            <div className="flex items-center gap-3">
                                {typeof row.premium === "boolean" ? (
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${row.premium ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                                        {row.premium ? <CheckBadgeIcon className="h-4 w-4" /> : <ArchiveBoxXMarkIcon className="h-4 w-4" />}
                                    </div>
                                ) : (
                                    <>
                                        <CheckBadgeIcon className="h-4 w-4 text-emerald-600 shrink-0" />
                                        <span className="text-sm font-bold text-emerald-800 text-left leading-tight">
                                            {row.premium}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Alternative */}
                        <div className="md:col-span-4 flex items-center px-8 py-4 bg-white md:bg-red-50">
                            <div className="flex items-center gap-3">
                                {typeof row.standard === "boolean" ? (
                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${row.standard ? 'bg-gray-300 text-white' : 'bg-rose-500 text-white'}`}>
                                        {row.standard ? <CheckBadgeIcon className="h-3.5 w-3.5" /> : <ArchiveBoxXMarkIcon className="h-3.5 w-3.5" />}
                                    </div>
                                ) : (
                                    <>
                                        <ArchiveBoxXMarkIcon className="h-4 w-4 text-rose-500 shrink-0" />
                                        <span className="text-[13px] font-normal text-red-700 text-center leading-tight">
                                            {row.standard}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Simple Footer */}
            <div className="px-8 py-3 bg-gray-50/50 flex justify-center">
                <span className="text-[10px] text-neutral-400 font-medium tracking-widest uppercase">
                    Reliability & Performance Report
                </span>
            </div>
        </div>
    );
}
