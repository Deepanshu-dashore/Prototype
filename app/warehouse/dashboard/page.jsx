"use client";

import { useEffect, useState } from "react";
import {
    ClipboardDocumentListIcon,
    UserGroupIcon,
    TruckIcon,
    ShoppingBagIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import axios from "axios";

export default function WarehouseDashboard() {
    const [stats, setStats] = useState({
        totalOrders: 0,
        pendingOrders: 0,
        totalDistributors: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // In a real app, you'd have a specific stats endpoint or multiple calls
                // For now, let's assume some default values or fetch if endpoints exist
                // const res = await axios.get('/api/warehouse/stats');
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch dashboard stats", err);
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        {
            name: "Total Orders",
            value: stats.totalOrders,
            icon: ClipboardDocumentListIcon,
            color: "text-blue-600",
            bg: "bg-blue-50",
            href: "/warehouse/orders"
        },
        {
            name: "Pending Shipments",
            value: stats.pendingOrders,
            icon: TruckIcon,
            color: "text-orange-600",
            bg: "bg-orange-50",
            href: "/warehouse/orders"
        },
        {
            name: "Distributors",
            value: stats.totalDistributors,
            icon: UserGroupIcon,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
            href: "/warehouse/distributors"
        }
    ];

    return (
        <div className="p-8">
            <header className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Warehouse Dashboard</h1>
                <p className="text-gray-500 text-sm mt-1">Welcome back, Warehouse Team.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {statCards.map((card) => (
                    <Link
                        key={card.name}
                        href={card.href}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${card.bg} ${card.color} group-hover:scale-110 transition-transform`}>
                                <card.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-500">{card.name}</p>
                                <p className="text-2xl font-bold text-gray-900">{loading ? "..." : card.value}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
                <div className="max-w-md mx-auto">
                    <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShoppingBagIcon className="w-8 h-8" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Ready to Process Orders?</h2>
                    <p className="text-gray-500 mb-6">View and update shipment status for distributor orders.</p>
                    <Link
                        href="/warehouse/orders"
                        className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                    >
                        Go to Orders
                        <ClipboardDocumentListIcon className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
