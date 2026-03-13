"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import ConfirmationModal from "@/src/components/ui/ConfirmationModal";

export default function TaglinePage() {
    const [tagLine, setTagLine] = useState("");
    const [initialTagLine, setInitialTagLine] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    useEffect(() => {
        fetchTagLine();
    }, []);

    const fetchTagLine = async () => {
        setIsFetching(true);
        try {
            const res = await axios.get("/api/tag-line");
            const fetchedTagLine = res.data?.data || "";
            setTagLine(fetchedTagLine);
            setInitialTagLine(fetchedTagLine);
        } catch (error) {
            console.error("Error fetching tagline", error);
            toast.error("Failed to load tagline");
        } finally {
            setIsFetching(false);
        }
    };

    const handleUpdateClick = () => {
        if (tagLine.trim() === initialTagLine.trim()) return;
        setIsUpdateModalOpen(true);
    };

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
    };

    const confirmUpdate = async () => {
        setIsLoading(true);
        try {
            await axios.post("/api/tag-line", { tagLine });
            toast.success("Tagline updated successfully");
        } catch (error) {
            console.error("Error updating tagline", error);
            toast.error("Failed to update tagline");
        } finally {
            setIsLoading(false);
            setIsUpdateModalOpen(false);
            fetchTagLine();
        }
    };

    const confirmDelete = async () => {
        setIsLoading(true);
        try {
            await axios.delete("/api/tag-line");
            setTagLine("");
            toast.success("Tagline deleted successfully");
        } catch (error) {
            console.error("Error deleting tagline", error);
            toast.error("Failed to delete tagline");
        } finally {
            setIsLoading(false);
            setIsDeleteModalOpen(false);
            fetchTagLine();
        }
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
                                disabled={isLoading || tagLine.trim() === "" || tagLine.trim() === initialTagLine.trim()}
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
