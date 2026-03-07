"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import OrderDetailsView from "@/src/components/share/OrderDetailsView";


export default function AdminOrderDetailsPage() {
    const params = useParams();
    const id = params?.id;
    const router = useRouter();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [updateModal, setUpdateModal] = useState({
        isOpen: false,
        orderId: null,
        po: "",
        invoice: "",
        type: "info"
    });
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        if (id) fetchOrderDetails();
    }, [id]);

    const fetchOrderDetails = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/order/${id}`);
            if (res.data?.success) {
                setOrder(res.data.data);
            } else {
                setError(res.data?.message || "Failed to fetch order details");
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateDetails = async () => {
        try {
            if (order?.status === "PENDING") {
                alert("Order status is PENDING. Please update status to PROCESSED first.");
                return;
            }
            setIsUpdating(true);
            const res = await axios.patch(`/api/order/${order._id}`, {
                po: updateModal.po,
                invoice: updateModal.invoice
            });
            if (res.data?.success) {
                setOrder({ ...order, po: updateModal.po, invoice: updateModal.invoice });
                setUpdateModal({ ...updateModal, isOpen: false });
            } else {
                alert(res.data?.message || "Failed to update details");
            }
        } catch (err) {
            alert(err.response?.data?.message || err.message || "Error updating details");
        } finally {
            setIsUpdating(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center flex-col gap-3 items-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-primary"></div>
            <p className="text-gray-400 text-sm animate-pulse">Loading details...</p>
        </div>
    );

    if (error) return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="text-center">
                <p className="text-red-500 text-sm mb-4">{error}</p>
                <button onClick={() => router.back()} className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                    &larr; Go Back
                </button>
            </div>
        </div>
    );
    // console.log("order-----------", order)
    return (
        <OrderDetailsView
            order={order}
            role="admin"
            updateModal={updateModal}
            setUpdateModal={setUpdateModal}
            isUpdating={isUpdating}
            handleUpdateDetails={handleUpdateDetails}
        />
    );
}
