"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import UnifiedLogin from "./UnifiedLogin";

export default function WarehouseLoginContent() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (formData) => {
        setError("");
        setLoading(true);

        try {
            const { name, password } = formData;
            const response = await axios.post("/api/warehouse/login", {
                name,
                password,
            });

            if (response.data?.data) {
                const { warehouse, warehouseToken } = response.data.data;
                const maxAge = 60 * 60 * 24 * 7; // 7 days
                document.cookie = `warehouse_user=${encodeURIComponent(
                    JSON.stringify(warehouse)
                )}; max-age=${maxAge}; path=/; SameSite=Strict`;
                document.cookie = `warehouseToken=${encodeURIComponent(
                    warehouseToken
                )}; max-age=${maxAge}; path=/; SameSite=Strict`;
            }

            router.push("/warehouse/orders");
            router.refresh();
        } catch (err) {
            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (err.message) {
                setError(err.message);
            } else {
                setError("An error occurred. Please try again.");
            }
            setLoading(false);
        }
    };

    return (
        <UnifiedLogin
            title="Warehouse Login"
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
            fields={[
                { name: "name", type: "text", placeholder: "Warehouse Name", label: "Warehouse Name" },
                { name: "password", type: "password", placeholder: "********", label: "Password" },
            ]}
        />
    );
}
