"use client";

import { useState, useEffect } from "react";
import axios from "@/app/lib/utils/axiosConfig";
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
        <div className="h-screen overflow-hidden">
            <DashboardSidebar
                title="Distributor Portal"
                navigation={navItems}
                user={user}
                logoutAction={handleLogout}
            />

            <div className="lg:pl-64 lg:pt-0 pt-16 h-full overflow-y-auto bg-linear-to-t from-blue-400/5 to-primary/5">
                <main className="flex-1 w-full py-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
