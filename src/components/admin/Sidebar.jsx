'use client'

import { useRouter } from 'next/navigation'
import axios from 'axios'
import DashboardSidebar from '@/src/components/layout/DashboardSidebar'
import {
    DocumentTextIcon,
    FolderIcon,
    UserGroupIcon,
    CubeIcon,
    ArchiveBoxIcon,
    Squares2X2Icon,
    BellIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: Squares2X2Icon },
    {
        name: 'Blogs',
        icon: DocumentTextIcon,
        children: [
            { name: 'All post', href: '/admin/blogboard' },
            { name: 'Categories', href: '/admin/categories' },
        ]
    },
    { name: 'Products', href: '/admin/products', icon: ArchiveBoxIcon },
    { name: 'Orders', href: '/admin/orders', icon: DocumentTextIcon },
    { name: 'Distributors', href: '/admin/distributors', icon: UserGroupIcon },
    // { name: 'Notifications', href: '/admin/notifications', icon: BellIcon },
    // { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon },
]

export default function Sidebar() {
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await axios.post('/api/users/logout')
            document.cookie = 'user=; max-age=0; path=/; SameSite=Strict'
            router.push('/login')
            router.refresh()
        } catch (error) {
            console.error('Logout failed:', error)
            document.cookie = 'user=; max-age=0; path=/; SameSite=Strict'
            router.push('/login')
        }
    }

    return (
        <DashboardSidebar
            title="CC Matting Admin"
            navigation={navigation}
            user={{
                name: 'Admin User',
                email: 'admin@ccmatting.com',
                initials: 'AD'
            }}
            logoutAction={handleLogout}
        />
    )
}
