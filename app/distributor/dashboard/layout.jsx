"use client";

import { useState, useEffect } from "react";
import axios from "@/app/lib/utils/axiosConfig";
import { useRouter } from "next/navigation";
import {
    HomeIcon,
    UserCircleIcon,
    ClipboardDocumentListIcon,
    DocumentCheckIcon,
    PlusCircleIcon
} from "@heroicons/react/24/outline";
import DashboardSidebar from "@/src/components/layout/DashboardSidebar";
import ConfirmationModal from "@/src/components/ui/ConfirmationModal";

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

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

    const handleLogout = () => {
        document.cookie = 'distributorToken=; max-age=0; path=/; SameSite=Strict';
        router.push('/distributor/login');
    };

    const navItems = [
        { name: 'Dashboard', href: '/distributor/dashboard', icon: HomeIcon },
        { name: "Add Order", href: "/distributor/dashboard/orders/new", icon: PlusCircleIcon },
        { name: 'Orders', href: '/distributor/dashboard/orders', icon: ClipboardDocumentListIcon },
        { name: 'Compliance Docs', href: '/distributor/dashboard/compliance', icon: DocumentCheckIcon },
        { name: 'Profile', href: '/distributor/dashboard/profile', icon: UserCircleIcon },
    ];

    return (
        <div className="h-screen overflow-hidden">
            <DashboardSidebar
                title="Distributor Portal"
                navigation={navItems}
                user={user}
                logoutAction={() => setIsLogoutModalOpen(true)}
            />

            <ConfirmationModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleLogout}
                icon={({ className }) => (
                    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M15 2h-1c-2.828 0-4.243 0-5.121.879C8 3.757 8 5.172 8 8v8c0 2.828 0 4.243.879 5.121C9.757 22 11.172 22 14 22h1c2.828 0 4.243 0 5.121-.879C21 20.243 21 18.828 21 16V8c0-2.828 0-4.243-.879-5.121C19.243 2 17.828 2 15 2" opacity={0.6}></path>
                        <path fill="currentColor" d="M8 8c0-1.538 0-2.657.141-3.5H8c-2.357 0-3.536 0-4.268.732S3 7.143 3 9.5v5c0 2.357 0 3.535.732 4.268S5.643 19.5 8 19.5h.141C8 18.657 8 17.538 8 16z" opacity={0.4}></path>
                        <path fill="currentColor" fillRule="evenodd" d="M4.47 11.47a.75.75 0 0 0 0 1.06l2 2a.75.75 0 0 0 1.06-1.06l-.72-.72H14a.75.75 0 0 0 0-1.5H6.81l.72-.72a.75.75 0 1 0-1.06-1.06z" clipRule="evenodd"></path>
                    </svg>
                )}
                title="Confirm Logout"
                message="Are you sure you want to log out from the Distributor portal?"
                confirmText="Logout"
                type="logout"
            />

            <div className="lg:pl-64 lg:pt-0 pt-16 h-full overflow-y-auto bg-linear-to-t from-blue-400/5 to-primary/5">
                <main className="flex-1 w-full py-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
