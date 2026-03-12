import { PlusIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import React from 'react'

export default function AdminHeader({ title, subtitle, buttonText, buttonLink, addOn }) {
    return (
        <div className="flex flex-row mb-5 items-center justify-between gap-4">
            <div>
                <h1 className="sm:text-2xl text-lg text-nowrap font-bold text-gray-900 tracking-tight">
                    {title}
                </h1>
                <p className="text-sm sm:inline hidden text-gray-500 mt-1">
                    {subtitle}
                </p>
            </div>

            <div className="flex items-center gap-3">
                {addOn}
                {buttonText && buttonLink && (
                    <Link
                        href={buttonLink}
                        className="inline-flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg hover:bg-primary/90 shadow-sm transition-all transform active:scale-95 text-sm font-medium"
                    >
                        <PlusIcon className="w-4 h-4" />
                        <span>{buttonText}</span>
                    </Link>
                )}
            </div>
        </div>
    )
}
