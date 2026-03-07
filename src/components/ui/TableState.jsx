import Image from "next/image";

/**
 * Reusable Empty Table State Component
 * Displays a professional "No Data" message with an SVG illustration.
 */
export function TableEmptyState({
    title = "No data found",
    message = "We couldn't find any records matching your current filters. Try adjusting your search or filter criteria.",
    colSpan = 10,
    className = ""
}) {
    return (
        <tr>
            <td colSpan={colSpan} className={`px-6 py-20 text-center ${className}`}>
                <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                    <div className="relative w-40 h-40 mb-6 drop-shadow-sm transition-transform hover:scale-105 duration-500">
                        <Image
                            src="/EmptyTable.svg"
                            alt="No data illustration"
                            fill
                            className="object-contain opacity-80"
                            priority
                        />
                    </div>
                    <h3 className="text-xl font-bold text-gray-500 mb-2 tracking-tight">{title}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">
                        {message}
                    </p>
                </div>
            </td>
        </tr>
    );
}

/**
 * Reusable Table Loading Skeleton Component
 * Displays pulsed loading bars that match the table structure.
 */
export function TableLoadingSkeleton({
    columns = 5,
    rows = 5,
    className = "",
    cellClassName = ""
}) {
    return (
        <>
            {[...Array(rows)].map((_, i) => (
                <tr key={i} className={`animate-pulse border-b border-gray-50/80 ${className}`}>
                    {[...Array(columns)].map((_, j) => (
                        <td key={j} className={`px-6 py-5 ${cellClassName}`}>
                            <div className="h-4 bg-gray-100/80 rounded-lg w-full"></div>
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
}
