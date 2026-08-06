"use client";

import { useState, useEffect } from "react";
import { useApiClient } from "@/src/config/axios";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend
} from "recharts";
import {
    BellAlertIcon,
    ClockIcon,
    UserGroupIcon,
    ArchiveBoxIcon,
    BellIcon,
    MagnifyingGlassIcon,
    ChevronRightIcon,
    ShoppingCartIcon,
    ExclamationTriangleIcon,
    CubeIcon,
    CreditCardIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { TableEmptyState } from "@/src/components/ui/TableState";

// Colors matching the design
const STATUS_COLORS = {
    PENDING: "#F59E0B",
    COMPLETED: "#4F46E5",

    "IN PROCESS": "#7C3AED",
    DEFAULT: "#6B7280",
};
const PIE_COLORS = ["#F59E0B", "#4F46E5", "#EF4444", "#7C3AED", "#10B981"];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatMonth({ _id }) {
    return MONTHS[(_id.month || 1) - 1] + " " + String(_id.year || "").slice(2);
}

function StatusBadge({ status }) {
    const upper = status?.toUpperCase() || "";
    const cfg = {
        PENDING: "bg-amber-50 text-amber-700 border border-amber-200",
        COMPLETED: "bg-emerald-50 text-emerald-700 border border-emerald-200",

        "IN PROCESS": "bg-sky-50 text-sky-700 border border-sky-200",
        RECEIVED: "bg-teal-50 text-teal-700 border border-teal-200",
        "READY-TO-SHIP": "bg-purple-50 text-purple-700 border border-purple-200",
        SHIPPED: "bg-blue-50 text-blue-700 border border-blue-200",
        LOW: "bg-slate-50 text-slate-700 border border-slate-200",
        REJECTED: "bg-rose-50 text-rose-700 border border-rose-200",
        ACCEPTED: "bg-teal-50 text-teal-700 border border-teal-200",
    };
    const cls = cfg[upper] || "bg-gray-50 text-gray-500 border border-gray-200";
    // Pretty-print awkward statuses
    const label = upper === "READY-TO-SHIP" ? "Ready to Ship"
        : status ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
            : "—";
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>
            {label}
        </span>
    );
}

// Matching notification icons from the design


// Custom donut center label
function DonutCenter({ totalOrders }) {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[22px] font-bold text-gray-900 leading-none">{(totalOrders || 0).toLocaleString()}</span>
            <span className="text-xs text-gray-400 mt-0.5">Total</span>
        </div>
    );
}

export default function AdminDashboard() {
    const api = useApiClient();
    const [graphRange, setGraphRange] = useState("yearly"); // yearly, monthly, currentMonth

    const queryKey = ["admin-dashboard", graphRange];
    const { data: dashboardData, isLoading: loading, error: fetchError } = api.useGet(
        queryKey,
        `/dashbord/admin?range=${graphRange}`
    );

    const data = dashboardData?.data || null;

    const cards = [
        {
            label: "Total Orders",
            value: data?.dashboardCard?.totalOrders ?? 0,
            Icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
                <path fill="currentColor" d="M9.5 2A1.5 1.5 0 0 0 8 3.5v1A1.5 1.5 0 0 0 9.5 6h5A1.5 1.5 0 0 0 16 4.5v-1A1.5 1.5 0 0 0 14.5 2z"></path>
                <path fill="currentColor" fillRule="evenodd" d="M6.5 4.037c-1.258.07-2.052.27-2.621.84C3 5.756 3 7.17 3 9.998v6c0 2.829 0 4.243.879 5.122c.878.878 2.293.878 5.121.878h6c2.828 0 4.243 0 5.121-.878c.879-.88.879-2.293.879-5.122v-6c0-2.828 0-4.242-.879-5.121c-.569-.57-1.363-.77-2.621-.84V4.5a3 3 0 0 1-3 3h-5a3 3 0 0 1-3-3zm9.012 8.511a.75.75 0 1 0-1.024-1.096l-3.774 3.522l-1.202-1.122a.75.75 0 0 0-1.024 1.096l1.715 1.6a.75.75 0 0 0 1.023 0z" clipRule="evenodd"></path>
            </svg>),
            iconBg: "bg-indigo-400/20",
            iconColor: "text-indigo-600",
        },
        {
            label: "Pending Orders",
            value: data?.dashboardCard?.totalPendingOrders ?? 0,
            Icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
                <g fill="none">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth={2} d="M5.965 3.136a4 4 0 0 0-2.829 2.829m14.899-2.829a4 4 0 0 1 2.829 2.829"></path>
                    <path fill="currentColor" fillRule="evenodd" d="M12 20a8 8 0 1 0 0-16a8 8 0 0 0 0 16m1-12a1 1 0 1 0-2 0v3.75c0 .69.56 1.25 1.25 1.25H15a1 1 0 1 0 0-2h-2z" clipRule="evenodd"></path>
                </g>
            </svg>),
            iconBg: "bg-amber-100/60",
            iconColor: "text-amber-500",
        },
        {
            label: "Total Distributors",
            value: data?.dashboardCard?.totalDistributors ?? 0,
            Icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
                <path fill="currentColor" d="M19 6H5a3 3 0 0 0-3 3v2.72L8.837 14h6.326L22 11.72V9a3 3 0 0 0-3-3" opacity={0.5}></path>
                <path fill="currentColor" d="M10 6V5h4v1h2V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v1zm-1.163 8L2 11.72V18a3.003 3.003 0 0 0 3 3h14a3.003 3.003 0 0 0 3-3v-6.28L15.163 14z"></path>
            </svg>),
            iconBg: "bg-teal-100/60",
            iconColor: "text-teal-500",
        },
        {
            label: "Unverified Distributors",
            value: data?.dashboardCard?.totalUnverifyDistributors ?? 0,
            Icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
                <path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3s1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5S5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05c1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5" />
            </svg>),
            iconBg: "bg-rose-100/60",
            iconColor: "text-rose-500",
        },
    ];

    function formatChartLabel(item, range) {
        const { _id } = item;
        if (range === "yearly") {
            return MONTHS[(_id.month || 1) - 1] + " " + String(_id.year || "").slice(2);
        }
        // For monthly/currentMonth, _id contains day, month, year
        const day = _id.day || 1;
        const mon = MONTHS[(_id.month || 1) - 1];
        return `${day} ${mon}`;
    }

    const overviewData = (data?.OrderOverViewGraph || []).map(item => ({
        name: formatChartLabel(item, graphRange),
        orders: item.count,
    }));
    // Fallback demo data
    const chartData = overviewData.length > 0 ? overviewData : [
        { name: "July 15", orders: 730 },
        { name: "Week 16", orders: 420 },
        { name: "Apr 18", orders: 860 },
        { name: "Jun 22", orders: 1000 },
        { name: "Jun 23", orders: 1150 },
        { name: "Aug 30", orders: 1400 },
    ];

    const rawStatus = data?.OrderByStatusGraph || [];
    const statusData = rawStatus.length > 0 ? rawStatus.map(item => ({
        name: item._id ? item._id.charAt(0) + item._id.slice(1).toLowerCase() : "Unknown",
        value: item.count,
        rawStatus: item._id,
    })) : [
        { name: "Pending", value: 30, rawStatus: "PENDING" },
        { name: "Completed", value: 1082, rawStatus: "COMPLETED" },

        { name: "In Process", value: 108, rawStatus: "IN PROCESS" },
    ];

    const totalOrders = data?.dashboardCard?.totalOrders;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[80vh]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 sm:px-16 font-sans">
            {/* ── Header ── */}
            <div className="sm:flex hidden items-center justify-between mb-6">
                <div>
                    <h1 className="sm:text-[22px] text-base font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
                    <p className="text-xs text-gray-400 mt-0.5">
                        {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Notification Bell */}
                    {/* <button className="relative w-10 h-10 flex items-center justify-center bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-blue-100 transition-all group">
                        <BellIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white animate-pulse" />
                    </button> */}

                    {/* Admin Badge */}
                    <div className="flex items-center gap-2.5 bg-linear-to-br from-indigo-600 to-blue-600 text-white px-4 py-2 rounded-xl shadow-md shadow-blue-200">
                        <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-xs font-extrabold">
                            A
                        </div>
                        <div className="leading-tight">
                            <p className="text-[11px] font-semibold leading-none">Admin User</p>
                            <p className="text-[9px] text-blue-200 mt-0.5">Super Admin</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Summary Cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
                {cards.map(({ label, value, Icon, iconBg, iconColor }, i) => (
                    <div key={i} className="bg-white relative rounded-2xl px-2 sm:px-4 py-3 shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <p className="sm:text-sm text-[10px] absolute top-3 z-10 sm:relative text-gray-700 font-medium mb-1">{label}</p>
                            <p className="text-2xl font-bold text-gray-900">{value.toLocaleString()}</p>
                        </div>
                        <div className="overflow-hidden h-18">
                            <div className={`w-20 h-20 rotate-45 translate-x-4 -translate-y-1 rounded-md ${iconBg} flex items-center justify-center`}>
                                <Icon className={`w-6 h-6 -rotate-45 -translate-x-2 translate-y-2 ${iconColor}`} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Charts Row ── */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-4">
                {/* Area Chart – spans 3 */}
                <div className="lg:col-span-3 bg-white rounded-2xl px-5 pt-4 pb-2 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-sm font-bold text-gray-900">Orders Overview</h2>
                            <p className="text-[10px] text-gray-400">Activity distribution by {graphRange === "yearly" ? "month" : "day"}</p>
                        </div>
                        <select
                            value={graphRange}
                            onChange={(e) => setGraphRange(e.target.value)}
                            className="text-[11px] font-bold text-gray-600 border border-gray-100 bg-gray-50/50 rounded-lg px-2 py-1 outline-none hover:border-blue-200 transition-all cursor-pointer shadow-sm"
                        >
                            <option value="yearly">Yearly View</option>
                            <option value="monthly">Last 30 Days</option>
                            <option value="currentMonth">Current Month</option>
                        </select>
                    </div>
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#93C5FD" stopOpacity={0.5} />
                                    <stop offset="100%" stopColor="#EFF6FF" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: "#94A3B8" }}
                                dy={6}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: "#94A3B8" }}
                            />
                            <Tooltip
                                contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,.08)", fontSize: 12 }}
                                itemStyle={{ color: "#3B82F6" }}
                                cursor={{ stroke: "#BFDBFE", strokeWidth: 1 }}
                            />
                            <Area
                                type="monotone"
                                dataKey="orders"
                                stroke="#3B82F6"
                                strokeWidth={2.5}
                                fill="url(#areaGrad)"
                                dot={{ r: 3.5, fill: "#3B82F6", strokeWidth: 0 }}
                                activeDot={{ r: 5, fill: "#3B82F6" }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Donut – spans 2 */}
                <div className="lg:col-span-2 bg-white rounded-2xl px-5 pt-4 pb-4 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-sm font-semibold text-gray-900">Orders by Status</h2>
                        <Link href="/admin/orders" className="text-xs text-blue-500 hover:underline flex items-center gap-0.5">
                            View All <ChevronRightIcon className="w-3 h-3" />
                        </Link>
                    </div>

                    {/* Legend (left side) + Donut (right side) */}
                    <div className="flex items-center gap-2">
                        {/* Legend */}
                        <div className="flex flex-col gap-1.5 min-w-[90px]">
                            {statusData.map((s, i) => (
                                <div key={s.name} className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                                    <span className="text-[11px] text-gray-600">{s.name}</span>
                                </div>
                            ))}
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full shrink-0 bg-gray-300" />
                                <span className="text-[11px] text-gray-600">Total</span>
                            </div>
                        </div>

                        {/* Donut */}
                        <div className="flex-1 relative" style={{ height: 200 }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={statusData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={45}
                                        outerRadius={72}
                                        paddingAngle={3}
                                        dataKey="value"
                                        startAngle={90}
                                        endAngle={-270}
                                    >
                                        {statusData.map((_, i) => (
                                            <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,.08)", fontSize: 12 }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                            <DonutCenter totalOrders={totalOrders} />
                        </div>
                    </div>

                    {/* Bottom legend row */}
                    <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 pt-2 border-t border-gray-50">
                        {statusData.slice(0, 3).map((s, i) => (
                            <div key={s.name} className="flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                                <span className="text-[10px] text-gray-500">{s.name}</span>
                                <span className="text-[10px] font-semibold text-gray-700 ml-0.5">{s.value.toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Bottom Row ── */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                {/* Recent Orders Table – 3 cols */}
                <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                        <h2 className="text-sm font-semibold text-gray-900">Recent Orders</h2>
                        <Link href="/admin/orders" className="text-xs text-blue-500 font-medium flex items-center gap-0.5 hover:underline">
                            View All <ChevronRightIcon className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                                    <th className="px-5 py-2.5 text-left">Order ID</th>
                                    <th className="px-5 py-2.5 text-left">Distributor</th>
                                    <th className="px-5 py-2.5 text-left">Status</th>
                                    <th className="px-5 py-2.5 text-right">Items</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {(data?.recentOrders || []).map((order) => {
                                    const companyName = order.orderBy?.companyName || "Unknown";
                                    const initials = companyName
                                        .split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
                                    const orderId = "ORD-" + String(order._id).slice(-6).toUpperCase();
                                    const itemCount = Array.isArray(order.orderItems)
                                        ? order.orderItems.length
                                        : "—";
                                    return (
                                        <tr key={order._id} className="hover:bg-gray-50/60 transition-colors group cursor-pointer">
                                            <td className="px-5 py-3 text-xs font-semibold text-gray-700 font-mono">
                                                <Link href={`/admin/orders/${order._id}`} className="hover:text-blue-600 transition-colors">
                                                    {orderId}
                                                </Link>
                                            </td>
                                            <td className="px-5 py-3">
                                                <Link href={`/admin/orders/${order._id}`} className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-md bg-blue-50 border border-blue-100 flex items-center justify-center text-[9px] font-bold text-blue-400 shrink-0">
                                                        {initials}
                                                    </div>
                                                    <span className="text-xs text-gray-700 truncate max-w-[120px]" title={companyName}>{companyName}</span>
                                                </Link>
                                            </td>
                                            <td className="px-5 py-3">
                                                <Link href={`/admin/orders/${order._id}`}>
                                                    <StatusBadge status={order.status} />
                                                </Link>
                                            </td>
                                            <td className="px-5 py-3 text-xs font-semibold text-gray-700 text-right">
                                                <Link href={`/admin/orders/${order._id}`}>
                                                    <span className="inline-flex px-2 items-center justify-center w-fit h-6 rounded-full bg-gray-100 text-gray-600 text-[11px] font-bold">{order?.orderItems?.length || 0} Items</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {(!data?.recentOrders || data.recentOrders.length === 0) && (
                                    <TableEmptyState
                                        colSpan={4}
                                        title="No Recent Orders"
                                        message="Your dashboard order list is currently empty."
                                    />
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Distributor Verification Requests – 2 cols */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 px-5 pt-4 pb-5">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold text-gray-900">New Distributor Requests</h2>
                        <Link href="/admin/distributors" className="text-xs text-blue-500 font-medium flex items-center gap-0.5 hover:underline">
                            View All <ChevronRightIcon className="w-3 h-3" />
                        </Link>
                    </div>

                    <p className="text-[10px] text-gray-400 mb-4 uppercase tracking-wider font-semibold">Pending Verification</p>

                    {/* Request items */}
                    <div className="space-y-4 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                        {(data?.recentNewDirtubutors || []).map((dist, i) => {
                            const timeAgo = new Date(dist.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short"
                            });
                            const initials = dist.companyName
                                ?.split(" ")
                                .map(w => w[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase() || "D";

                            return (
                                <Link
                                    key={dist._id}
                                    href={`/admin/distributors`}
                                    className="flex items-start gap-3 group cursor-pointer hover:bg-gray-50/50 p-2 -m-2 rounded-xl transition-all"
                                >
                                    <div className={`w-10 h-10 shrink-0 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-xs font-bold text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all`}>
                                        {initials}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-1">
                                            <p className="text-xs font-bold text-gray-800 leading-snug truncate group-hover:text-blue-600 transition-colors">
                                                {dist.companyName}
                                            </p>
                                            <span className="text-[10px] text-gray-400 whitespace-nowrap mt-0.5">{timeAgo}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <UserGroupIcon className="w-3 h-3 text-gray-400" />
                                            <p className="text-[11px] text-gray-500 truncate">{dist.contactPersonName || "Unknown"}</p>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}


                    </div>
                </div>
            </div>
        </div>
    );
}
