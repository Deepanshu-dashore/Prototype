'use client'

import { useRouter } from 'next/navigation'
import axios from 'axios'
import DashboardSidebar from '@/src/components/layout/DashboardSidebar'
import ConfirmationModal from '@/src/components/ui/ConfirmationModal'
import { useState } from 'react'
import {
    DocumentTextIcon,
    FolderIcon,
    UserGroupIcon,
    CubeIcon,
    ArchiveBoxIcon,
    Squares2X2Icon,
    BellIcon,
    Cog6ToothIcon,
    ChatBubbleOvalLeftEllipsisIcon,
    MegaphoneIcon,
} from '@heroicons/react/24/outline'
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid'

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Squares2X2Icon },
    { name: 'Orders', href: '/admin/orders', icon: DocumentTextIcon },
    { name: 'Enquiries', href: '/admin/enquiries', icon: ChatBubbleOvalLeftEllipsisIcon },
    { name: 'Distributors', href: '/admin/distributors', icon: UserGroupIcon },
    { name : 'Distributors Information', href:'/admin/distributors-infomation', icon: UserGroupIcon },
    { name: 'Products', href: '/admin/products', icon: ArchiveBoxIcon },
    {
        name: 'Blogs',
        icon: DocumentTextIcon,
        children: [
            { name: 'All post', href: '/admin/blogboard' },
            { name: 'Categories', href: '/admin/categories' },
        ]
    },
    {
        name: 'Marketing Material',
        icon: MegaphoneIcon,
        children: [
            { name: 'Add Material', href: '/admin/marketing/add' },
            { name: 'Manage Materials', href: '/admin/marketing' },
        ]
    },
    { name: 'Tagline', href: '/admin/tagline', icon: Cog6ToothIcon },
    { name: 'SOPs', href: '/admin/sops', icon: DocumentTextIcon },
    // { name: 'Notifications', href: '/admin/notifications', icon: BellIcon },
    // { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon },
]

export default function Sidebar() {
    const router = useRouter()
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true)
            await axios.post('/api/users/logout')
            document.cookie = 'user=; max-age=0; path=/; SameSite=Strict'
            router.push('/login')
            router.refresh()
        } catch (error) {
            // console.error('Logout failed:', error)
            document.cookie = 'user=; max-age=0; path=/; SameSite=Strict'
            router.push('/login')
        } finally {
            setIsLoggingOut(false)
            setIsLogoutModalOpen(false)
        }
    }

    return (
        <>
            <DashboardSidebar
                title="CC Matting Admin"
                navigation={navigation}
                user={{
                    name: 'Admin User',
                    email: 'admin@ccmatting.com',
                    initials: 'AD'
                }}
                logoutAction={() => setIsLogoutModalOpen(true)}
            />

            <ConfirmationModal
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onConfirm={handleLogout}
                title="Confirm Logout"
                icon={({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
                    <path fill="currentColor" d="M15 2h-1c-2.828 0-4.243 0-5.121.879C8 3.757 8 5.172 8 8v8c0 2.828 0 4.243.879 5.121C9.757 22 11.172 22 14 22h1c2.828 0 4.243 0 5.121-.879C21 20.243 21 18.828 21 16V8c0-2.828 0-4.243-.879-5.121C19.243 2 17.828 2 15 2" opacity={0.6}></path>
                    <path fill="currentColor" d="M8 8c0-1.538 0-2.657.141-3.5H8c-2.357 0-3.536 0-4.268.732S3 7.143 3 9.5v5c0 2.357 0 3.535.732 4.268S5.643 19.5 8 19.5h.141C8 18.657 8 17.538 8 16z" opacity={0.4}></path>
                    <path fill="currentColor" fillRule="evenodd" d="M4.47 11.47a.75.75 0 0 0 0 1.06l2 2a.75.75 0 0 0 1.06-1.06l-.72-.72H14a.75.75 0 0 0 0-1.5H6.81l.72-.72a.75.75 0 1 0-1.06-1.06z" clipRule="evenodd"></path>
                </svg>)}
                message="Are you sure you want to log out? You will need to login again to access the dashboard."
                confirmText="Logout"
                type="logout" // Red button
                isLoading={isLoggingOut}
            />
        </>
    )
}
