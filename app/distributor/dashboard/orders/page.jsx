"use client";

import { useState, useEffect } from "react";
import axios from "@/app/lib/utils/axiosConfig";
import { ClockIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

export default function OrderHistoryPage() {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            // First get ID from /me
            const meRes = await axios.get("/api/distributor/me");
            if (meRes.data?.success) {
                const id = meRes.data.data._id;
                // Then get history
                const historyRes = await axios.get(`/api/distributor/history/${id}`);
                if (historyRes.data?.success) {
                    // Determine if the response is directly the array or inside data
                    const historyData = historyRes.data.data || [];
                    // Sort by date descending
                    setHistory(historyData.sort((a, b) => new Date(b.date) - new Date(a.date)));
                } else {
                    setError("Failed to load history.");
                }
            } else {
                setError("Failed to identify user.");
            }
        } catch (err) {
            setError("Unable to fetch order history.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-indigo-50 rounded-xl">
                    <ClipboardDocumentListIcon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Order History</h1>
                    <p className="text-sm text-gray-500">View your past activities and order updates</p>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
                    {error}
                </div>
            )}

            {!loading && history.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <ClockIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No History Found</h3>
                    <p className="text-gray-500 mt-1">You don't have any recorded activity yet.</p>
                </div>
            )}

            <div className="space-y-4">
                {history.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all hover:shadow-md"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 min-w-[100px] text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-md text-center">
                                    {new Date(item.date).toLocaleDateString()}
                                </div>
                                <div>
                                    <p className="text-gray-900 font-medium text-lg">{item.note}</p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
