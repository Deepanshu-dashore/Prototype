import { CheckBadgeIcon, ArchiveBoxXMarkIcon } from "@heroicons/react/24/solid";
import { comparisonData } from "../../data/comparison";
import { motion } from "framer-motion";

export default function ComparisonTable() {
    return (
        <div className="w-full max-w-325 mx-auto bg-linear-to-br from-gray-50 via-white to-gray-50 rounded-3xl p-8 sm:p-10">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] border border-gray-200/80 overflow-hidden"
            >
                {/* Header Row */}
                <div className="hidden md:grid grid-cols-12 gap-2 bg-gray-100">
                    <div className="col-span-4 px-8 py-5 bg-linear-to-br from-gray-50 to-white shadow-inner border border-gray-200">
                        <span className="text-xs font-bold text-neutral-700 uppercase tracking-[0.25em] drop-shadow-sm">
                            Highlights
                        </span>
                    </div>
                    <div className="col-span-4 relative p-3 shadow-inner border border-gray-200">
                        <div className="text-center text-white relative px-5 py-3 bg-linear-to-br from-[#0b4bd4] via-[#1d63f2] to-[#3b82f6]">
                            <span className="text-sm font-bold tracking-wide drop-shadow-md">CCM Portable Cleanroom/Data Center Mats</span>
                            <div className="absolute left-1/2 -bottom-2 w-4 h-4 bg-[#1d63f2] -rotate-45 -translate-x-1/2 shadow-md" />
                        </div>
                    </div>
                    <div className="col-span-4 relative p-3 shadow-inner border border-gray-200">
                        <div className="text-center text-white relative px-8 py-3 z-30 bg-linear-to-br from-[#b91c1c] via-[#ef4444] to-red-700">
                            <span className="text-sm font-bold tracking-wide drop-shadow-md">Peel Off Mat</span>
                            <div className="absolute left-1/2 -bottom-2 w-4 h-4 bg-[#ef4444] -rotate-45 -translate-x-1/2 shadow-md" />
                        </div>
                    </div>
                </div>

                {/* Mobile Header */}
                <div className="md:hidden px-8 py-5 bg-linear-to-br from-gray-50 to-white border-b border-gray-200">
                    <span className="text-xs font-bold text-neutral-700 uppercase tracking-[0.25em]">
                        Highlights
                    </span>
                </div>

                {/* Rows */}
                <div className="group/table divide-y divide-gray-100">
                    {comparisonData.map((row, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3 }}
                            className="group/row grid grid-cols-1 md:grid-cols-12 gap-2 bg-gray-100 transition-all duration-500 ease-out hover:gap-3 group-hover/table:opacity-30 hover:!opacity-100"
                        >
                            {/* Label */}
                            <div className="md:col-span-4 relative overflow-hidden px-8 py-5 min-h-[72px] flex items-center text-sm font-semibold text-neutral-800 bg-white border border-transparent transition-all duration-500 ease-out group-hover/row:bg-linear-to-r group-hover/row:from-blue-50/70 group-hover/row:via-indigo-50/40 group-hover/row:to-white group-hover/row:scale-[1.015] group-hover/row:shadow-[0_8px_30px_-8px_rgba(59,130,246,0.3)] group-hover/row:border-blue-200/50 group-hover/row:z-20 group-hover/row:rounded-lg">
                                <span className="pointer-events-none absolute inset-0 opacity-0 group-hover/row:opacity-100 transition-opacity duration-700 ease-out">
                                    <span className="absolute -inset-4 bg-linear-to-r from-blue-400/15 via-indigo-400/10 to-transparent blur-xl" />
                                </span>
                                <span className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-blue-500 via-indigo-500 to-purple-500 opacity-0 group-hover/row:opacity-100 transition-opacity duration-500" />
                                <span className="relative z-10 group-hover/row:translate-x-2 transition-all duration-500 ease-out group-hover/row:font-bold">{row.label}</span>
                            </div>

                            {/* CCM */}
                            <div className="md:col-span-4 relative overflow-hidden px-8 py-5 min-h-[72px] flex items-center bg-white border border-transparent transition-all duration-500 ease-out group-hover/row:bg-linear-to-br group-hover/row:from-blue-500 group-hover/row:via-blue-700 group-hover/row:to-blue-700 group-hover/row:scale-[1.015] group-hover/row:shadow-[0_8px_30px_-8px_rgba(29,99,242,0.35)] group-hover/row:border-blue-300/60 group-hover/row:z-20 group-hover/row:rounded-sm">
                                <span className="pointer-events-none absolute inset-0 opacity-0 group-hover/row:opacity-100 transition-opacity duration-700 ease-out">
                                    <span className="absolute -inset-4 bg-linear-to-br from-blue-400/20 via-cyan-400/12 to-transparent blur-xl" />
                                </span>
                                <span className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-blue-600 via-blue-500 to-cyan-500 opacity-0 group-hover/row:opacity-100 transition-opacity duration-500 shadow-lg shadow-blue-500/50" />
                                {typeof row.premium === "boolean" ? (
                                    <span className="relative z-10 text-sm font-bold text-neutral-800 group-hover/row:text-white group-hover/row:translate-x-1 transition-all duration-500 ease-out">
                                        {row.premium ? "Yes" : "No"}
                                    </span>
                                ) : (
                                    <span className="relative z-10 text-sm font-bold text-neutral-800 group-hover/row:text-white group-hover/row:scale-110 group-hover/row:translate-x-1 transition-all duration-500 ease-out drop-shadow-sm">
                                        {row.premium}
                                    </span>
                                )}
                            </div>

                            {/* Peel Off */}
                            <div className="md:col-span-4 relative overflow-hidden px-8 py-5 min-h-[72px] flex items-center bg-white border border-transparent transition-all duration-500 ease-out group-hover/row:bg-linear-to-bl group-hover/row:from-red-500 group-hover/row:via-red-700 group-hover/row:to-red-700 group-hover/row:scale-[1.015] group-hover/row:shadow-[0_8px_30px_-8px_rgba(239,68,68,0.35)] group-hover/row:border-rose-300/60 group-hover/row:z-20 group-hover/row:rounded-sm">
                                <span className="pointer-events-none absolute inset-0 opacity-0 group-hover/row:opacity-100 transition-opacity duration-700 ease-out">
                                    <span className="absolute -inset-4 bg-linear-to-bl from-red-400/20 via-orange-400/12 to-transparent blur-xl" />
                                </span>
                                <span className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-red-600 via-rose-500 to-orange-500 opacity-0 group-hover/row:opacity-100 transition-opacity duration-500 shadow-lg shadow-red-500/50" />
                                {typeof row.standard === "boolean" ? (
                                    <span className="relative z-10 text-sm font-semibold text-neutral-800 group-hover/row:text-white group-hover/row:translate-x-1 transition-all duration-500 ease-out">
                                        {row.standard ? "Yes" : "No"}
                                    </span>
                                ) : (
                                    <span className="relative z-10 text-sm font-semibold text-neutral-800 group-hover/row:text-white group-hover/row:scale-110 group-hover/row:translate-x-1 transition-all duration-500 ease-out drop-shadow-sm">
                                        {row.standard}
                                    </span>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
