"use client";

import { useState } from "react";
import axios from "@/app/lib/utils/axiosConfig";
import { useRouter } from "next/navigation";
import UnifiedLogin from "@/src/components/auth/UnifiedLogin";

export default function DistributorLogin() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (formData) => {
        setError("");
        setLoading(true);

        try {
            const res = await axios.post("/api/distributor/login", formData);
            if (res.data?.success) {
                if (res.data.data.token) {
                    document.cookie = `distributorToken=${res.data.data.token}; path=/; max-age=86400; SameSite=Strict`;
                }
                router.push("/distributor/dashboard");
            } else {
                setError(res.data?.message || "Login failed");
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <UnifiedLogin
            title="Distributor Login"
            onSubmit={handleLogin}
            loading={loading}
            error={error}
            fields={[
                { name: "email", type: "email", placeholder: "marketing@company.com", label: "Company Email" },
                { name: "password", type: "password", placeholder: "********", label: "Password" },
            ]}
            links={{
                forgotPassword: "#", // Add link if implemented
                register: "/distributor/register"
            }}
        />
    );
}
