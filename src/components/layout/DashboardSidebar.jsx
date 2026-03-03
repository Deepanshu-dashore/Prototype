"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
    Bars3Icon,
    XMarkIcon,
    ArrowLeftOnRectangleIcon,
    ChevronDownIcon,
    ChevronUpIcon
} from '@heroicons/react/24/outline';

function NavItem({ item, pathname, setMobileMenuOpen }) {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = pathname === item.href || (hasChildren && item.children.some(child => pathname === child.href));

    // State for collapsible sub-menu
    const [isOpen, setIsOpen] = useState(isActive);

    if (hasChildren) {
        return (
            <div className="space-y-1">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
                        w-full group flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-all
                        ${isActive
                            ? 'bg-gray-50 text-gray-900 border border-gray-100'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }
                    `}
                >
                    <div className="flex items-center gap-3">
                        <item.icon className={`
                            w-5 h-5 transition-colors
                            ${isActive ? 'text-primary' : 'text-gray-400 group-hover:text-gray-600'}
                        `} />
                        {item.name}
                    </div>
                    {isOpen ? (
                        <ChevronUpIcon className="w-4 h-4 text-gray-400" />
                    ) : (
                        <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                    )}
                </button>

                {isOpen && (
                    <div className="pl-11 space-y-1">
                        {item.children.map((child) => {
                            const isChildActive = pathname === child.href;
                            return (
                                <Link
                                    key={child.name}
                                    href={child.href}
                                    className={`
                                        flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all
                                        ${isChildActive
                                            ? 'text-primary bg-primary/5'
                                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                        }
                                    `}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {child.name}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }

    return (
        <Link
            href={item.href}
            className={`
                group flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all
                ${isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
            `}
            onClick={() => setMobileMenuOpen(false)}
        >
            <item.icon className={`
                w-5 h-5 transition-colors
                ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'}
            `} />
            {item.name}
        </Link>
    );
}

export default function DashboardSidebar({
    title = "CC Matting",
    navigation = [],
    user = { name: 'User', email: '', initials: 'U' },
    logoutAction,
    logoSrc = "/CCMate-Logo.jpg"
}) {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            {/* Mobile menu button */}
            <div className="lg:hidden fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                <Link href="/" className="flex items-center">
                    {logoSrc ? (
                        <Image
                            src={logoSrc}
                            alt={title}
                            width={160}
                            height={45}
                            className="h-10 ml-10 w-auto object-contain"
                        />
                    ) : (
                        <span className="text-xl font-bold text-primary">{title}</span>
                    )}
                </Link>
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="p-2 -mr-2 text-gray-500 hover:text-gray-700"
                >
                    {mobileMenuOpen ? (
                        <XMarkIcon className="w-6 h-6" />
                    ) : (
                        <Bars3Icon className="w-6 h-6" />
                    )}
                </button>
            </div>

            {/* Sidebar for Desktop */}
            <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:h-screen
            ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="h-full flex flex-col">
                    {/* Logo Area */}
                    <div className="h-20 flex items-center px-6 border-b border-gray-100/50">
                        <Link href="/" className="flex items-center">
                            {logoSrc ? (
                                <Image
                                    src={logoSrc}
                                    alt={title}
                                    width={160}
                                    height={45}
                                    className="h-10 w-auto object-contain"
                                />
                            ) : (
                                <span className="text-xl font-bold text-primary">{title}</span>
                            )}
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        <p className="px-2 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                            Menu
                        </p>
                        {navigation.map((item) => (
                            <NavItem
                                key={item.name}
                                item={item}
                                pathname={pathname}
                                setMobileMenuOpen={setMobileMenuOpen}
                            />
                        ))}
                    </nav>

                    {/* Logout and User Profile */}
                    <div className="p-4 border-t border-gray-100 space-y-2">
                        <button
                            onClick={logoutAction}
                            className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        >
                            <ArrowLeftOnRectangleIcon className="w-5 h-5" />
                            Logout
                        </button>

                        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-gray-50 border border-gray-100">
                            <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm shrink-0">
                                {user.initials}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                                <p className="text-xs text-gray-500 truncate">{user.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {/* Overlay for mobile */}
            {
                mobileMenuOpen && (
                    <div
                        className="fixed inset-0 z-30 bg-gray-900/20 backdrop-blur-sm lg:hidden"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                )
            }
        </>
    );
}
