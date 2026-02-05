'use client'

import { useRouter } from 'next/navigation'
import axios from 'axios'
import DashboardSidebar from '@/src/components/layout/DashboardSidebar'
import {
    DocumentTextIcon,
    FolderIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Blogs', href: '/admin/blogboard', icon: DocumentTextIcon },
    { name: 'Categories', href: '/admin/categories', icon: FolderIcon },
    { name: 'Distributors', href: '/admin/distributors', icon: UserGroupIcon },
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
