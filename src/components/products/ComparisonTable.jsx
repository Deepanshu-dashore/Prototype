import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { comparisonData } from "../../data/comparison";

export default function ComparisonTable() {
    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col gap-4">
            {/* Headers */}
            <div className="hidden md:grid grid-cols-12 gap-4 font-semibold text-sm uppercase tracking-wide mb-2">
                <div className="col-span-4">
                    {/* Spacer for Feature Label Column */}
                </div>
                <div className="col-span-4 bg-primary p-4 rounded-xl flex items-center justify-center text-center shadow-sm text-white">
                    CCM Portable Cleanroom Mats
                </div>
                <div className="col-span-4 bg-neutral-100 p-4 rounded-xl flex items-center justify-center text-center shadow-sm text-neutral-900 border border-neutral-200">
                    Peel Off Mats
                </div>
            </div>

            {/* Mobile Header (Visible only on small screens) */}
            <div className="md:hidden grid grid-cols-2 gap-3 mb-2 font-semibold text-xs uppercase tracking-wide">
                <div className="bg-primary p-3 rounded-lg text-center shadow-sm text-white">
                    CCM Portable
                </div>
                <div className="bg-neutral-100 p-3 rounded-lg text-center shadow-sm text-neutral-900 border border-neutral-200">
                    Peel Off
                </div>
            </div>

            {/* Data Rows */}
            {comparisonData.map((row, idx) => (
                <div key={idx} className="flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-4">
                    {/* Feature Label */}
                    <div className="md:col-span-4 bg-neutral-50 p-3 md:p-4 rounded-lg md:rounded-xl flex items-center justify-center md:justify-start md:pl-6 font-medium text-neutral-700 border border-neutral-200 shadow-sm text-sm">
                        {row.label}
                    </div>

                    <div className="grid grid-cols-2 md:contents gap-3">
                        {/* Premium Value (Primary Blue) */}
                        <div className="md:col-span-4 bg-primary/5 p-3 md:p-4 rounded-lg md:rounded-xl flex items-center justify-center text-center font-medium text-primary border border-primary/20 shadow-sm min-h-12">
                            {typeof row.premium === "boolean" ? (
                                row.premium ? (
                                    <span className="inline-flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full bg-primary shadow-sm">
                                        <CheckIcon className="h-4 w-4 md:h-5 md:w-5 text-white" />
                                    </span>
                                ) : (
                                    <span className="inline-flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full bg-neutral-200 text-neutral-400">
                                        <XMarkIcon className="h-4 w-4 md:h-5 md:w-5" />
                                    </span>
                                )
                            ) : (
                                <span className="text-xs md:text-sm leading-tight font-medium">
                                    {row.premium}
                                </span>
                            )}
                        </div>

                        {/* Standard Value (Neutral) */}
                        <div className="md:col-span-4 bg-neutral-50 p-3 md:p-4 rounded-lg md:rounded-xl flex items-center justify-center text-center font-medium text-neutral-600 border border-neutral-200 shadow-sm min-h-12">
                            {typeof row.standard === "boolean" ? (
                                row.standard ? (
                                    <span className="inline-flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full bg-primary shadow-sm">
                                        <CheckIcon className="h-4 w-4 md:h-5 md:w-5 text-white" />
                                    </span>
                                ) : (
                                    <span className="inline-flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full bg-neutral-200 text-neutral-400">
                                        <XMarkIcon className="h-4 w-4 md:h-5 md:w-5" />
                                    </span>
                                )
                            ) : (
                                <span className="text-xs md:text-sm leading-tight">
                                    {row.standard}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
