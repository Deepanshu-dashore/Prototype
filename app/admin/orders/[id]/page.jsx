"use client";

import { useState, useEffect } from "react";
import { useApiClient } from "@/src/config/axios";
import { useParams, useRouter } from "next/navigation";
import OrderDetailsView from "@/src/components/share/OrderDetailsView";


export default function AdminOrderDetailsPage() {
    const api = useApiClient();
    const params = useParams();
    const id = params?.id;
    const router = useRouter();

    const [updateModal, setUpdateModal] = useState({
        isOpen: false,
        orderId: null,
        po: "",
        invoice: "",
        type: "info"
    });

    const queryKey = ["order", id];
    const { data: orderData, isLoading: loading, error: fetchError } = api.useGet(
        queryKey,
        `/order/${id}`,
        { enabled: !!id }
    );

    const order = orderData?.data || null;
    const error = fetchError?.message || "";

    const updateDetailsMutation = api.usePatch(queryKey, `/order/${id}`, {
        onSuccess: (res) => {
            api.queryClient.setQueryData(queryKey, (old) => {
                if (!old) return old;
                return { ...old, data: { ...old.data, po: updateModal.po, invoice: updateModal.invoice } };
            });
            setUpdateModal(prev => ({ ...prev, isOpen: false }));
        },
        onError: (err) => alert(err.response?.data?.message || err.message || "Error updating details")
    });

    const cleanQCMutation = api.useDelete(queryKey, `/order/qc/${id}`, {
        onError: (err) => alert(err.response?.data?.message || err.message || "Error cleaning QC data")
    });

    const isUpdating = updateDetailsMutation.isPending;
    const isCleaningQC = cleanQCMutation.isPending;

    const handleUpdateDetails = async () => {
        if (order?.status === "PENDING") {
            alert("Order status is PENDING. Please update status to IN PROCESS first.");
            return;
        }
        updateDetailsMutation.mutate({
            po: updateModal.po,
            invoice: updateModal.invoice
        });
    };

    const handleCleanQC = async () => {
        cleanQCMutation.mutate();
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
            handleCleanQC={handleCleanQC}
            isCleaningQC={isCleaningQC}
            onRefresh={() => api.queryClient.invalidateQueries(queryKey)}
        />
    );
}
