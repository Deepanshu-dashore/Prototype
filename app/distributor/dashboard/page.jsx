"use client";

import { useState, useEffect } from "react";
import axios from "@/app/lib/utils/axiosConfig";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer, PieChart, Pie, Cell,
} from "recharts";
import {
    BellIcon,
    MagnifyingGlassIcon,
    ChevronRightIcon,
    ExclamationTriangleIcon,
    ShieldCheckIcon,
    ArrowPathIcon,
    CheckCircleIcon,
    XCircleIcon,
    TruckIcon,
    CurrencyDollarIcon,
    ShoppingCartIcon,
    SparklesIcon,
    TagIcon,
    ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/navigation";

// ─── Constants ────────────────────────────────────────────────────────────────
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const PIE_COLORS = ["#F59E0B", "#4F46E5", "#EF4444", "#10B981", "#7C3AED"];

function formatDayLabel({ _id }) {
    const day = _id.day || 1;
    const mon = MONTHS[(_id.month || 1) - 1];
    return `${day} ${mon}`;
}

// ─── Dummy Notifications ──────────────────────────────────────────────────────
const NOTIF_LIST = [
    {
        dot: "#4F46E5",
        text: "Order #ORD-00325 has shipped",
        sub: "manager.indiclustments",
        time: "3:32 AM",
    },
    {
        dot: "#10B981",
        text: "New Product: Custom Logo Mats added to catalog",
        sub: "",
        time: "1h ago",
    },

    {
        dot: "#4F46E5",
        text: "Promotion: Offer distribution discounts",
        sub: "",
        time: "2 days ago",
    },
];

// ─── Dummy Popular Products ───────────────────────────────────────────────────
const POPULAR_PRODUCTS = [
    { name: "CleanGuard Mat", price: "$75", img: "/products/product1.jpg", fallback: "CG" },
    { name: "Logo Guard Mat", price: "$23", img: "/products/product2.jpg", fallback: "LG" },
    { name: "PureClean Sticky\n600 kv Mats", price: "$109", img: "/products/product3.jpg", fallback: "PC" },
    { name: "Duramat", price: "$105", img: "/products/product4.jpg", fallback: "DM" },
];

// ─── Status Badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
    const upper = status?.toUpperCase() || "";
    const cfg = {
        PENDING: "bg-amber-50 text-amber-700 border border-amber-200",
        RECEIVED: "bg-emerald-50 text-emerald-700 border border-emerald-200",

        PROCESSED: "bg-sky-50 text-sky-700 border border-sky-200",
        "READY-TO-SHIP": "bg-purple-50 text-purple-700 border border-purple-200",
        REJECTED: "bg-rose-50 text-rose-700 border border-rose-200",
    };
    const cls = cfg[upper] || "bg-gray-50 text-gray-500 border border-gray-200";
    const label =
        upper === "READY-TO-SHIP" ? "Ready to Ship"
            : status ? status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
                : "—";
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls}`}>
            {label}
        </span>
    );
}

// ─── Product Placeholder Card ─────────────────────────────────────────────────
function ProductCard({ product }) {
    const [imgErr, setImgErr] = useState(false);
    const hasImg = product.img && !imgErr;
    // accent class used for the letter-avatar fallback (e.g. "bg-blue-100 text-blue-600")
    const accentClass = product.accentClass || "bg-primary/20 text-slate-500";
    return (
        <div className="flex flex-col gap-1.5">
            <div className="w-full aspect-square rounded-xl bg-linear-to-br from-primary/10 to-indigo-400/10 overflow-hidden flex items-center justify-center border border-slate-100">
                {hasImg ? (
                    <img
                        src={product.img}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={() => setImgErr(true)}
                    />
                ) : (
                    /* Coloured letter-avatar when no product image is available */
                    <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center ${accentClass}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" viewBox="0 0 48 48">
                            <path fill="currentColor" d="M26.321 4.832a6.25 6.25 0 0 0-4.642 0l-5.29 2.116l18.738 7.505l7.344-2.938a4.3 4.3 0 0 0-1.143-.68zm5.442 10.967L13.024 8.294l-6.352 2.54c-.422.17-.806.4-1.143.681L24 18.904zM4 14.78c0-.386.052-.764.151-1.124l18.599 7.44v22.391a6 6 0 0 1-1.071-.32L6.672 37.163A4.25 4.25 0 0 1 4 33.219zm22.321 28.386q-.524.21-1.071.321V21.096l18.599-7.44c.099.361.151.739.151 1.125v18.438a4.25 4.25 0 0 1-2.672 3.945z" strokeWidth={1} stroke="currentColor"></path>
                        </svg>
                    </div>
                )}
            </div>
            <p className="text-[11px] font-semibold text-gray-800 leading-tight">{product.name}</p>
            {product.code && (
                <p className="text-[10px] text-gray-400 leading-tight truncate" title={product.code}>{product.code}</p>
            )}
            {/* <button className="w-full text-[10px] font-semibold text-blue-600 border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors rounded-lg py-1 flex items-center justify-center gap-1">
                Quick Add <ChevronRightIcon className="w-3 h-3" />
            </button> */}
        </div>
    );
}

// ─── Donut Center ─────────────────────────────────────────────────────────────
function DonutCenter({ total }) {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[20px] font-extrabold text-gray-900 leading-none">{(total || 0).toLocaleString()}</span>
            <span className="text-[10px] text-gray-400 mt-0.5">Total</span>
        </div>
    );
}

// ─── Alert Banner ─────────────────────────────────────────────────────────────
function AlertBanner({ count }) {
    if (!count) return null;
    return (
        <div className="flex items-center justify-between bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3.5 mb-2">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <ExclamationTriangleIcon className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                    <p className="text-sm font-semibold text-amber-800">Attention Required</p>
                    <p className="text-xs text-amber-600 mt-0.5">
                        {count} order{count > 1 ? "s are" : " is"} pending and need your attention. Please review them as soon as possible.
                    </p>
                </div>
            </div>
            <Link
                href="/distributor/dashboard/orders"
                className="shrink-0 flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
            >
                Review <ChevronRightIcon className="w-3.5 h-3.5" />
            </Link>
        </div>
    );
}


// ─── Main Component ───────────────────────────────────────────────────────────
export default function DistributorDashboard() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({ companyName: "Defualt distributor", companyEmail: "distributor@gmail.com", initials: "DD" });
    const [reorderingId, setReorderingId] = useState(null);
    const [productList, setProductList] = useState(null);
    const [graphRange, setGraphRange] = useState("yearly"); // yearly, monthly, currentMonth

    useEffect(() => {
        fetchData(graphRange);
    }, [graphRange]);

    const fetchData = async (range = graphRange) => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/dashbord/distributor?range=${range}`);
            if (res.data?.success) {
                setData(res.data.data)
                setUser({ ...res.data.data.distributor, initials: res.data.data.distributor.companyName.split(" ").map((n) => n[0]).join("").slice(0, 2) });
            };
        } catch (e) {
            console.error("Dashboard fetch error:", e);
        } finally {
            setLoading(false);
        }
    };


    const handleReorder = (order) => {
        router.push(`/distributor/dashboard/orders/new?reorder=${order._id}`);
    };

    // ── Card data ──────────────────────────────────────────────────────────────
    const cards = [
        {
            label: "Total Orders",
            value: data?.dashboardCard?.totalOrders ?? 0,
            Icon: ({ cls }) => (
                <svg xmlns="http://www.w3.org/2000/svg" className={cls} viewBox="0 0 24 24" fill="none">
                    <path stroke="currentColor" strokeWidth={1.5} d="M9 12h6m-6 4h4M7 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1h-3M9 3h6a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
        },
        {
            label: "Pending Orders",
            value: data?.dashboardCard?.totalPendingOrders ?? 0,
            Icon: ({ cls }) => (
                <svg xmlns="http://www.w3.org/2000/svg" className={cls} viewBox="0 0 24 24">
                    <g fill="none">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth={1.5} d="M5.965 3.136a4 4 0 0 0-2.829 2.829m14.899-2.829a4 4 0 0 1 2.829 2.829" />
                        <path fill="currentColor" fillRule="evenodd" d="M12 20a8 8 0 1 0 0-16a8 8 0 0 0 0 16m1-12a1 1 0 1 0-2 0v3.75c0 .69.56 1.25 1.25 1.25H15a1 1 0 1 0 0-2h-2z" clipRule="evenodd" />
                    </g>
                </svg>
            ),
            iconBg: "bg-amber-100",
            iconColor: "text-amber-500",
        },
        {
            label: "Received Orders",
            value: data?.dashboardCard?.totalReceivedOrders ?? 0,
            Icon: ({ cls }) => (
                <svg xmlns="http://www.w3.org/2000/svg" className={cls} viewBox="0 0 24 24" fill="none">
                    <path stroke="currentColor" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            iconBg: "bg-emerald-100",
            iconColor: "text-emerald-600",
        },

        {
            label: "Ready to Ship",
            value: data?.dashboardCard?.totalReadyToShipOrders ?? 0,
            Icon: ({ cls }) => (
                <svg xmlns="http://www.w3.org/2000/svg" className={cls} viewBox="0 0 24 24" fill="none">
                    <path stroke="currentColor" strokeWidth={1.5} d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.9 17.9 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
            iconBg: "bg-teal-100",
            iconColor: "text-teal-600",
        },
    ];

    // ── Chart data ─────────────────────────────────────────────────────────────
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
    const chartData = overviewData.length > 0 ? overviewData : [
        { name: "Apr 1", orders: 5 },
        { name: "Apr 17", orders: 11 },
        { name: "Apr 22", orders: 8 },
        { name: "Apr 19", orders: 13 },
        { name: "Apr 22", orders: 10 },
        { name: "Apr 26", orders: 17 },
    ];

    const rawStatus = data?.OrderByStatusGraph || [];
    // If API returns empty (filtered per-user and aggregation ran on wrong field),
    // compute status counts directly from the recentOrders we do have.
    const statusData = rawStatus.length > 0
        ? rawStatus.map(item => ({
            name: item._id ? item._id.charAt(0) + item._id.slice(1).toLowerCase() : "Unknown",
            value: item.count,
        }))
        : (() => {
            const counts = {};
            (data?.recentOrders || []).forEach(o => {
                const k = o.status || "Unknown";
                counts[k] = (counts[k] || 0) + 1;
            });
            return Object.entries(counts).map(([k, v]) => ({
                name: k.charAt(0) + k.slice(1).toLowerCase(),
                value: v,
            }));
        })();

    const totalOrders = data?.dashboardCard?.totalOrders ?? 0;
    const pendingCount = data?.dashboardCard?.totalPendingOrders ?? 0;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[80vh]">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
            </div>
        );
    }

    return (
        <div className="min-h-screen font-sans -mt-8">

            {/* ── Top Bar ── */}
            <div className="flex items-center mb-2 justify-between px-6 py-3 bg-white border-b border-gray-100 sticky top-0 z-10">
                <h1 className="md:text-[18px] text-sm font-bold text-gray-900 tracking-tight">Distributor Dashboard</h1>

                <div className="flex items-center gap-3">
                    {/* Notification Bell (matches admin style) */}
                    {/* <button className="relative w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded-xl shadow-xs hover:shadow-md hover:border-indigo-100 transition-all group">
                        <BellIcon className="w-5 h-5 text-gray-400 group-hover:fill-indigo-600 group-hover:text-indigo-300 transition-colors" />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                    </button> */}

                    {/* Distributor Badge (matches admin dashboard style) */}
                    <div className="md:flex hidden items-center gap-2.5 bg-linear-to-br from-indigo-600 to-blue-600 text-white px-4 py-1.5 rounded-xl shadow-md shadow-blue-200 cursor-pointer hover:shadow-lg transition-all group/badge">
                        <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-[11px] font-extrabold uppercase line-clamp-1 overflow-hidden truncate">
                            {user.initials}
                        </div>
                        <div className="leading-tight pr-1">
                            <p className="text-[11px] font-bold leading-none truncate max-w-[140px]">{user.companyName}</p>
                            <p className="text-[9px] text-blue-200 mt-0.5 font-medium">Verified Distributor</p>
                        </div>
                        {/* <ChevronDownIcon className="w-3.5 h-3.5 text-blue-100 group-hover/badge:translate-y-0.5 transition-transform" /> */}
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-5 px-6 py-3">
                <AlertBanner count={pendingCount} />
                {/* ── Profile Banner (matches profile page style) ── */}
                <div className="relative rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-200">
                    {/* Banner image */}
                    <div className="relative h-32 w-full bg-gray-900">
                        <Image
                            src="/distributor_profile_banner_1770291446716.png"
                            alt="Dashboard Banner"
                            fill
                            className="object-cover"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/25" />
                    </div>

                    {/* Overlay info — pinned to bottom of the banner */}
                    <div className="absolute top-0 left-0 w-full h-36 px-6 flex flex-col justify-center pb-4">
                        <div className="flex items-end justify-between gap-4">

                            {/* Left: avatar + name + email */}

                            <div className="md:flex hidden items-end gap-4">
                                {/* Avatar circle */}
                                <div className="relative md:w-16 md:h-16 w-12 h-12 rounded-full border-4 border-white bg-white shadow-xl overflow-hidden flex items-center justify-center shrink-0 mb-[-6px]">
                                    <div className="pointer-events-none absolute z-10 inset-0 bg-[url('/square.svg')] bg-repeat opacity-[0.08]" aria-hidden />
                                    <div className="w-full h-full uppercase rounded-full bg-linear-to-br from-indigo-400 to-blue-600 text-white flex items-center justify-center md:text-xl text-lg font-bold">
                                        {user.initials}
                                    </div>
                                </div>

                                {/* Text */}
                                <div className="pb-1 drop-shadow-md">
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-white font-bold lg:text-lg text-sm leading-tight">{user.companyName}</h2>
                                        {/* Same verified seal SVG as profile page */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 bg-blue-500 rounded-full p-1 text-white" viewBox="0 0 256 256">
                                            <path fill="currentColor" d="M228.75 100.05c-3.52-3.67-7.15-7.46-8.34-10.33c-1.06-2.56-1.14-7.83-1.21-12.47c-.15-10-.34-22.44-9.18-31.27s-21.27-9-31.27-9.18c-4.64-.07-9.91-.15-12.47-1.21c-2.87-1.19-6.66-4.82-10.33-8.34C148.87 20.46 140.05 12 128 12s-20.87 8.46-27.95 15.25c-3.67 3.52-7.46 7.15-10.33 8.34c-2.56 1.06-7.83 1.14-12.47 1.21c-10 .2-22.44.34-31.25 9.2s-9 21.25-9.2 31.25c-.07 4.64-.15 9.91-1.21 12.47c-1.19 2.87-4.82 6.66-8.34 10.33C20.46 107.13 12 116 12 128s8.46 20.87 15.25 28c3.52 3.67 7.15 7.46 8.34 10.33c1.06 2.56 1.14 7.83 1.21 12.47c.15 10 .34 22.44 9.18 31.27s21.27 9 31.27 9.18c4.64.07 9.91.15 12.47 1.21c2.87 1.19 6.66 4.82 10.33 8.34C107.13 235.54 116 244 128 244s20.87-8.46 27.95-15.25c3.67-3.52 7.46-7.15 10.33-8.34c2.56-1.06 7.83-1.14 12.47-1.21c10-.15 22.44-.34 31.27-9.18s9-21.27 9.18-31.27c.07-4.64.15-9.91 1.21-12.47c1.19-2.87 4.82-6.66 8.34-10.33c6.79-7.08 15.25-15.9 15.25-27.95s-8.46-20.87-15.25-27.95m-17.32 39.29c-4.82 5-10.28 10.72-13.19 17.76c-2.82 6.8-2.93 14.16-3 21.29c-.08 5.36-.19 12.71-2.15 14.66s-9.3 2.07-14.66 2.15c-7.13.11-14.49.22-21.29 3c-7 2.91-12.73 8.37-17.76 13.19c-3.6 3.45-8.98 8.61-11.38 8.61s-7.78-5.16-11.34-8.57c-5-4.82-10.72-10.28-17.76-13.19c-6.8-2.82-14.16-2.93-21.29-3c-5.36-.08-12.71-.19-14.66-2.15s-2.07-9.3-2.15-14.66c-.11-7.13-.22-14.49-3-21.29c-2.91-7-8.37-12.73-13.19-17.76C41.16 135.78 36 130.4 36 128s5.16-7.78 8.57-11.34c4.82-5 10.28-10.72 13.19-17.76c2.82-6.8 2.93-14.16 3-21.29C60.88 72.25 61 64.9 63 63s9.3-2.07 14.66-2.15c7.13-.11 14.49-.22 21.29-3c7-2.91 12.73-8.37 17.76-13.19C120.22 41.16 125.6 36 128 36s7.78 5.16 11.34 8.57c5 4.82 10.72 10.28 17.76 13.19c6.8 2.82 14.16 2.93 21.29 3c5.36.08 12.71.19 14.66 2.15s2.07 9.3 2.15 14.66c.11 7.13.22 14.49 3 21.29c2.91 7 8.37 12.73 13.19 17.76c3.41 3.56 8.57 8.94 8.57 11.34s-5.12 7.82-8.53 11.38m-34.94-43.83a12 12 0 0 1 0 17l-56 56a12 12 0 0 1-17 0l-24-24a12 12 0 1 1 17-17L112 143l47.51-47.52a12 12 0 0 1 16.98.03" stroke="currentColor"></path>
                                        </svg>
                                        <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-medium text-white">
                                            Distributor
                                        </span>
                                    </div>
                                    <p className="text-white/90 text-xs mt-0.5 font-medium">{user.companyEmail}</p>
                                </div>
                            </div>

                            {/* Right: action buttons */}
                            <div className="flex items-center gap-2.5 pb-1 shrink-0">
                                <Link
                                    href="/distributor/dashboard/orders/new"
                                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition-colors text-white text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" viewBox="0 0 24 24">
                                        <path fill="currentColor" fillRule="evenodd" d="M1.289 2.763a.75.75 0 0 1 .948-.475l.305.102c.626.209 1.155.385 1.572.579c.442.206.826.46 1.117.865c.291.403.412.848.467 1.333q.04.372.047.833h10.706c2.055 0 3.082 0 3.527.674c.444.674.04 1.619-.77 3.508l-.428 1c-.378.882-.567 1.322-.943 1.57s-.855.248-1.815.248H5.903c.105.54.271.856.506 1.091c.277.277.666.457 1.4.556c.755.101 1.756.103 3.191.103h7a.75.75 0 1 1 0 1.5h-7.055c-1.367 0-2.47 0-3.337-.117c-.9-.12-1.658-.38-2.26-.981c-.601-.602-.86-1.36-.981-2.26c-.117-.867-.117-1.97-.117-3.337V6.883c0-.713 0-1.185-.042-1.546c-.04-.342-.107-.507-.194-.626c-.086-.12-.221-.237-.533-.382c-.33-.153-.777-.304-1.453-.53l-.265-.088a.75.75 0 0 1-.474-.948M8 8.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5z" clipRule="evenodd"></path>
                                        <path fill="currentColor" d="M7.5 18a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3m9 0a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3"></path>
                                    </svg>

                                    <span className="lg:inline hidden">Quick</span> Order
                                </Link>
                                <button
                                    onClick={() => {
                                        if (data?.lastOrder) {
                                            handleReorder(data.lastOrder);
                                        } else {
                                            alert("No recent orders found to reorder.");
                                        }
                                    }}
                                    disabled={reorderingId !== null}
                                    className="flex items-center gap-2 bg-white text-gray-800 hover:bg-gray-50 disabled:opacity-50 transition-colors text-xs font-semibold px-4 py-2.5 rounded-lg shadow-sm"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="m17.275 20.25l3.475-3.45l-1.05-1.05l-2.425 2.375l-.975-.975l-1.05 1.075zM6 9h12V7H6zm12 14q-2.075 0-3.537-1.463T13 18t1.463-3.537T18 13t3.538 1.463T23 18t-1.463 3.538T18 23M3 22V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v6.675q-.7-.35-1.463-.513T18 11H6v2h7.1q-.425.425-.787.925T11.675 15H6v2h5.075q-.05.25-.062.488T11 18q0 1.05.288 2.013t.862 1.837L12 22l-1.5-1.5L9 22l-1.5-1.5L6 22l-1.5-1.5z"></path>
                                    </svg>Reorder Last
                                    <span className="lg:inline hidden">Order</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ── Stat Cards ── */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {cards.map(({ label, value, Icon, iconBg, iconColor }, i) => (
                        <div key={i} className="bg-white rounded-2xl p-3.5 shadow-sm border border-gray-100 flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <div className={`md:w-8 md:h-8 w-6 h-6 rounded-lg ${iconBg} flex items-center justify-center shrink-0`}>
                                    <Icon cls={`md:w-5 md:h-5 w-4 h-4 ${iconColor}`} />
                                </div>
                                <p className="md:text-sm text-xs text-gray-700 leading-tight">{label}</p>
                            </div>
                            <p className="md:text-2xl text-lg font-semibold text-gray-900 mt-0.5 pl-2">{value.toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="p-5 grid grid-cols-1 lg:grid-cols-1 gap-5">

                {/* ── LEFT COLUMN ── */}
                <div className="flex flex-col gap-5">



                    {/* ── Charts Row ── */}
                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-4">
                        {/* Area Chart */}
                        <div className="lg:col-span-6 bg-white rounded-2xl px-5 pt-4 pb-2 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-5">
                                <div>
                                    <h2 className="text-sm font-semibold text-gray-900">Orders Overview</h2>
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
                                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -28, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="distAreaGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.25} />
                                            <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10, fill: "#94A3B8" }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10, fill: "#94A3B8" }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: 12,
                                            border: "none",
                                            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                                            fontSize: 12,
                                            fontWeight: "600"
                                        }}
                                        cursor={{ stroke: "#3B82F6", strokeWidth: 1, strokeDasharray: "4 4" }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="orders"
                                        stroke="#3B82F6"
                                        strokeWidth={3}
                                        fill="url(#distAreaGrad)"
                                        dot={{ r: 4, fill: "#FFF", stroke: "#3B82F6", strokeWidth: 2 }}
                                        activeDot={{ r: 6, fill: "#3B82F6", stroke: "#FFF", strokeWidth: 2 }}
                                        animationDuration={1500}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Donut Chart */}
                        <div className="lg:col-span-4 bg-white rounded-2xl px-5 pt-4 pb-4 shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-sm font-semibold text-gray-900">Order Status</h2>
                                <Link href="/distributor/dashboard/orders" className="text-[10px] border border-slate-300 rounded-sm cursor-pointer px-1.5 py-0.5 text-slate-500 hover:underline flex items-center gap-0.5 font-medium">
                                    View All <ChevronRightIcon className="w-3 h-3" />
                                </Link>
                            </div>

                            <div className="flex items-center gap-2">
                                {/* Legend */}
                                <div className="flex flex-col gap-1.5 min-w-[80px]">
                                    {statusData.map((s, i) => (
                                        <div key={s.name} className="flex items-center gap-1.5">
                                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                                            <span className="text-[11px] text-gray-600">{s.name}</span>
                                        </div>
                                    ))}
                                    <div className="flex items-center gap-1.5 mt-1">
                                        <span className="w-2.5 h-2.5 rounded-full bg-gray-300 shrink-0" />
                                        <span className="text-[11px] text-gray-600">Total</span>
                                    </div>
                                </div>

                                {/* Donut */}
                                <div className="flex-1 relative" style={{ height: 190 }}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={statusData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={48}
                                                outerRadius={74}
                                                paddingAngle={3}
                                                dataKey="value"
                                                startAngle={90}
                                                endAngle={-270}
                                            >
                                                {statusData.map((_, i) => (
                                                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} stroke="none" />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 16px rgba(0,0,0,.08)", fontSize: 12 }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                    <DonutCenter total={totalOrders} />
                                </div>
                            </div>

                            {/* Bottom row */}
                            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 pt-2 border-t border-gray-50">
                                {statusData.slice(0, 3).map((s, i) => (
                                    <div key={s.name} className="flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }} />
                                        <span className="text-[10px] text-gray-500">{s.name}</span>
                                        <span className="text-[10px] font-semibold text-gray-700 ml-0.5">{s.value.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ── Recent Orders Table ── */}
                        <div className="bg-white rounded-2xl lg:col-span-7 shadow-sm border border-gray-100 overflow-hidden">
                            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
                                <h2 className="text-sm font-semibold text-gray-900">Recent Orders</h2>
                                <Link href="/distributor/dashboard/orders" className="text-[10px] border border-slate-300 rounded-sm cursor-pointer px-1.5 py-0.5 text-slate-500 hover:underline flex items-center gap-0.5 font-medium">
                                    View All <ChevronRightIcon className="w-3 h-3" />
                                </Link>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-50">
                                            <th className="px-5 py-2.5 text-left">Order ID</th>
                                            <th className="px-3 py-2.5 text-left">Date</th>
                                            <th className="px-3 py-2.5 text-left">Items</th>
                                            <th className="px-3 py-2.5 text-left">List</th>
                                            <th className="px-3 py-2.5 text-left">Status</th>
                                            <th className="px-5 py-2.5 text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 divide-dashed">
                                        {(data?.recentOrders || []).map((order) => {
                                            const orderId = "ORD-" + String(order._id).slice(-5).toUpperCase();
                                            const dateStr = order.createdAt
                                                ? new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                                                : "—";
                                            const itemCount = Array.isArray(order.orderItems) ? order.orderItems.length : 0;
                                            return (
                                                <tr key={order._id} className="hover:bg-gray-50/60 text-nowrap relative transition-colors">
                                                    <td className="px-5 py-3 text-xs font-semibold text-gray-700 font-mono w-52 ">{orderId}</td>
                                                    <td className="px-3 py-3">
                                                        <span className="text-xs bg-blue-50 text-indigo-600 border border-blue-100 rounded-lg px-2 py-0.5 font-medium">{dateStr}</span>
                                                    </td>
                                                    <td className="px-3 py-3">
                                                        <div className="flex items-center gap-1.5">
                                                            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
                                                            </svg>
                                                            <span className="text-xs font-semibold text-gray-700">{itemCount} in Order Items</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-3 py-3 text-xs font-semibold text-gray-700">
                                                        <span onClick={() => setProductList(order._id === productList ? null : order._id)} className="cursor-pointer flex gap-2 items-center">
                                                            See List <ChevronDownIcon className={`h-4 w-4 p-0.5 border border-gray-300 rounded-sm transition-transform duration-300 ease-in-out ${order._id === productList && "rotate-180"}`} />
                                                        </span>
                                                        {productList === order._id && <div className="flex absolute flex-col gap-2 mt-2 bg-gray-100 border rounded-sm p-2 w-52 ease-in">
                                                            {order?.orderItems.map(item => (<span key={item._id} className="text-[10px] text-gray-500"><span className="w-1.5 my-auto aspect-square rounded-full bg-primary/60 inline-block mx-2"></span>{item.product.code}</span>))
                                                            }
                                                        </div>}
                                                    </td>
                                                    <td className="px-3 py-3"><StatusBadge status={order.status} /></td>
                                                    <td className="px-5 py-3 text-right">
                                                        <button
                                                            onClick={() => handleReorder(order)}
                                                            className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors min-w-[85px] justify-center"
                                                        >
                                                            Reorder <ChevronRightIcon className="w-3 h-3" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {(!data?.recentOrders || data.recentOrders.length === 0) && (
                                            <tr>
                                                <td colSpan={5} className="px-5 py-8 text-center text-sm text-gray-400">No recent orders</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* ── Popular Products ── */}
                        <div className="bg-white rounded-2xl lg:col-span-3 shadow-sm border border-gray-100 px-5 pt-4 pb-5">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-sm font-semibold text-gray-900">Popular Products</h2>
                                {/* <button className="text-xs text-blue-500 hover:underline flex items-center gap-0.5 font-medium">
                                View All <ChevronDownIcon className="w-3 h-3 -rotate-90" />
                            </button> */}
                            </div>

                            {/* Products from API if available, else dummy */}
                            <div className="grid grid-cols-2 gap-3">
                                {(data?.popularProducts?.length > 0
                                    ? data.popularProducts.slice(0, 4).map((p, i) => {
                                        // Extract a short acronym from the code for the fallback label
                                        const codeAcronym = (p.code || "").split(/[\s–\-]+/).filter(Boolean).slice(0, 2).join("").toUpperCase().slice(0, 3) || "P";
                                        const bgColors = ["bg-blue-100 text-blue-600", "bg-indigo-100 text-indigo-600", "bg-teal-100 text-teal-600", "bg-purple-100 text-purple-600"];
                                        return {
                                            name: p.description || p.code,
                                            code: p.code,
                                            price: null,
                                            img: "",
                                            fallback: codeAcronym,
                                            accentClass: bgColors[i % bgColors.length],
                                        };
                                    })
                                    : POPULAR_PRODUCTS
                                ).map((p, i) => (
                                    <ProductCard key={i} product={p} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT COLUMN ── */}
                {/* <div className="flex flex-col gap-5"> */}

                {/* ── Notifications ── */}
                {/* <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-5 pt-4 pb-5">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-semibold text-gray-900">Notifications</h2>
                            <button className="text-[10px] border border-slate-300 rounded-sm cursor-pointer px-1.5 py-0.5 text-slate-500 hover:underline flex items-center gap-0.5 font-medium">
                                View All <ChevronRightIcon className="w-3 h-3" />
                            </button>
                        </div>

                        <div className="space-y-3.5">
                            {NOTIF_LIST.map((n, i) => (
                                <div key={i} className="flex items-start gap-2.5 cursor-pointer group">
                                    <span
                                        className="w-2.5 h-2.5 rounded-full shrink-0 mt-1.5"
                                        style={{ backgroundColor: n.dot }}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-800 leading-snug group-hover:text-blue-600 transition-colors">{n.text}</p>
                                        {n.sub && <p className="text-[10px] text-gray-400 mt-0.5">{n.sub}</p>}
                                        <p className="text-[10px] text-gray-400 mt-0.5">{n.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div> */}


                {/* </div> */}
            </div>
        </div>
    );
}
