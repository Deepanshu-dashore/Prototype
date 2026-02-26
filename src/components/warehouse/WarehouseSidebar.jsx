'use client'

import { useRouter } from 'next/navigation'
import axios from 'axios'
import DashboardSidebar from '@/src/components/layout/DashboardSidebar'
import {
    UserGroupIcon,
    ClipboardDocumentListIcon
} from '@heroicons/react/24/outline'

const navigation = [
    { name: 'Orders', href: '/warehouse/orders', icon: ClipboardDocumentListIcon },
    { name: 'Distributors', href: '/warehouse/distributors', icon: UserGroupIcon },
]

export default function WarehouseSidebar() {
    const router = useRouter()

    const handleLogout = async () => {
        try {
            // Optional: call a logout API if it exists
            // await axios.post('/api/warehouse/logout')

            // Clear warehouse cookies
            document.cookie = 'warehouse_user=; max-age=0; path=/; SameSite=Strict'
            document.cookie = 'warehouseToken=; max-age=0; path=/; SameSite=Strict'

            router.push('/warehouse/login')
            router.refresh()
        } catch (error) {
            console.error('Logout failed:', error)
            document.cookie = 'warehouse_user=; max-age=0; path=/; SameSite=Strict'
            document.cookie = 'warehouseToken=; max-age=0; path=/; SameSite=Strict'
            router.push('/warehouse/login')
        }
    }

    return (
        <DashboardSidebar
            title="CC Matting Warehouse"
            navigation={navigation}
            user={{
                name: 'Warehouse Team',
                email: 'warehouse@ccmatting.com',
                initials: 'WH'
            }}
            logoutAction={handleLogout}
        />
    )
}
