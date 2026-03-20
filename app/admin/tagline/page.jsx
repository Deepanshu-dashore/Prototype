"use client";

import { useState, useEffect } from "react";
import { useApiClient } from "@/src/config/axios";
import { toast } from "react-hot-toast";
import ConfirmationModal from "@/src/components/ui/ConfirmationModal";

export default function TaglinePage() {
    const api = useApiClient();
    const [tagLine, setTagLine] = useState("");
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Dynamic hooks via ApiClient
    const { data: tagLineData, isLoading: isFetching } = api.useGet("tagline", "/tag-line");
    const updateMutation = api.usePost("tagline", "/tag-line", {
        onSuccess: () => {
            toast.success("Tagline updated successfully");
            setIsUpdateModalOpen(false);
        },
        onError: () => toast.error("Failed to update tagline")
    });
    const deleteMutation = api.useDelete("tagline", "/tag-line", {
        onSuccess: () => {
            toast.success("Tagline deleted successfully");
            setIsDeleteModalOpen(false);
            setTagLine("");
        },
        onError: () => toast.error("Failed to delete tagline")
    });

    const isLoading = updateMutation.isPending || deleteMutation.isPending;

    // Sync input with fetched data
    useEffect(() => {
        if (tagLineData?.data !== undefined) {
            setTagLine(tagLineData.data);
        }
    }, [tagLineData]);

    const handleUpdateClick = () => {
        if (tagLine.trim() === (tagLineData?.data || "").trim()) return;
        setIsUpdateModalOpen(true);
    };

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
    };

    const confirmUpdate = () => {
        updateMutation.mutate({ tagLine });
    };

    const confirmDelete = () => {
        deleteMutation.mutate();
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="md:text-2xl sm:text-xl text-base font-bold text-gray-900 border-b pb-4">Manage Tagline</h1>
                <p className="mt-2 text-sm hidden sm:block text-gray-600">
                    Update the scrolling Marquee Bar tagline displayed on the public site below the header.
                </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6 px-4 sm:px-6">
                {isFetching ? (
                    <div className="flex justify-center p-6">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="tagline" className="block sm:text-sm text-xs font-medium text-gray-700 mb-2">
                                Current Tagline Content
                            </label>
                            <textarea
                                id="tagline"
                                rows={10}
                                className="w-full px-4 py-3 rounded-lg sm:text-base text-xs text-gray-600 border border-gray-300 focus:border-primary/80 outline-none transition-all resize-none"
                                placeholder="Enter tagline..."
                                value={tagLine}
                                onChange={(e) => setTagLine(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleUpdateClick}
                                disabled={isLoading || tagLine.trim() === "" || tagLine.trim() === (tagLineData?.data || "").trim()}
                                className="sm:px-6 px-5 py-2.5 bg-blue-600 text-white sm:text-base text-xs font-medium sm:rounded-lg rounded-sm hover:bg-blue-700 disabled:opacity-50 transition-colors"
                            >
                                {isLoading ? "Updating..." : "Update Tagline"}
                            </button>

                            <button
                                onClick={handleDeleteClick}
                                disabled={isLoading || tagLine.trim() === ""}
                                className="sm:px-6 px-5 py-2.5 bg-red-600 text-white sm:text-base text-xs font-medium sm:rounded-lg rounded-sm hover:bg-red-700 disabled:opacity-50 transition-colors"
                            >
                                Delete Tagline
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <ConfirmationModal
                isOpen={isUpdateModalOpen}
                onClose={() => !isLoading && setIsUpdateModalOpen(false)}
                onConfirm={confirmUpdate}
                title="Confirm Update"
                message="Are you sure you want to update the tagline? This will be immediately visible on the site."
                confirmText="Update Tagline"
                type="save"
                isLoading={isLoading}
            />

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => !isLoading && setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Confirm Deletion"
                message="Are you sure you want to delete the tagline? It will be removed from the site immediately."
                confirmText="Delete Tagline"
                type="delete"
                isLoading={isLoading}
            />
        </div>
    );
}
