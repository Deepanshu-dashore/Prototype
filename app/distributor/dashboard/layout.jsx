"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
    HomeIcon,
    UserCircleIcon,
    ClipboardDocumentListIcon,
    DocumentCheckIcon
} from "@heroicons/react/24/outline";
import DashboardSidebar from "@/src/components/layout/DashboardSidebar";

export default function DistributorLayout({ children }) {
    const router = useRouter();
    const [user, setUser] = useState({ name: 'Distributor', email: '', initials: 'D' });

    useEffect(() => {
        // Fetch user details for the sidebar
        axios.get('/api/distributor/me').then(res => {
            if (res.data?.success) {
                const data = res.data.data;
                setUser({
                    name: data.contactPersonName || data.companyName,
                    email: data.companyEmail,
                    initials: (data.companyName || 'D').charAt(0).toUpperCase()
                });
            }
        }).catch(() => {
            // Ignored, sidebar uses defaults
        });
    }, []);

    const handleLogout = () => {
        document.cookie = 'distributorToken=; max-age=0; path=/; SameSite=Strict';
        router.push('/distributor/login');
    };

    const navItems = [
        { name: 'Dashboard', href: '/distributor/dashboard', icon: HomeIcon },
        { name: 'Profile', href: '/distributor/dashboard/profile', icon: UserCircleIcon },
        { name: 'Order History', href: '/distributor/dashboard/orders', icon: ClipboardDocumentListIcon },
        { name: 'Compliance Docs', href: '/distributor/dashboard/compliance', icon: DocumentCheckIcon },
    ];

    return (
        <div className="h-screen bg-gray-50 overflow-hidden">
            <DashboardSidebar
                title="Distributor Portal"
                navigation={navItems}
                user={user}
                logoutAction={handleLogout}
            />

            <div className="pl-64 h-full overflow-y-auto">
                <main className="flex-1 p-4 md:p-8 pt-16 lg:pt-8 w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}
