import { PlusIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'

export default function AdminHeader({ title, subtitle, buttonText, buttonLink, onClick, addOn }) {
    return (
        <div className="flex flex-row mb-5 items-center justify-between gap-4 bg-white border-b px-10 py-4 border-gray-100 ">
            <div>
                <h1 className="text-base sm:text-lg sm:text-nowrap font-bold text-gray-900 tracking-tight">
                    {title}
                </h1>
                <p className="text-xs sm:inline hidden text-gray-500 mt-1">
                    {subtitle}
                </p>
            </div>

            <div className="flex items-center gap-3">
                {addOn}
                {buttonText && (buttonLink || onClick) && (
                    buttonLink ? (
                        <Link
                            href={buttonLink}
                            className="inline-flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg hover:bg-primary/90 shadow-sm transition-all transform active:scale-95 text-sm font-medium"
                        >
                            <PlusIcon className="w-4 h-4 sm:inline hidden" />
                            <span>{buttonText}</span>
                        </Link>
                    ) : (
                        <button
                            onClick={onClick}
                            className="inline-flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg hover:bg-primary/90 shadow-sm transition-all transform active:scale-95 text-sm font-medium"
                        >
                            <PlusIcon className="w-4 h-4 sm:inline hidden" />
                            <span>{buttonText}</span>
                        </button>
                    )
                )}
            </div>
        </div>
    )
}
