"use client";

import { useState, useEffect } from "react";
import axios from "@/app/lib/utils/axiosConfig";
import { useRouter } from "next/navigation";
import UnifiedLogin from "@/src/components/auth/UnifiedLogin";

export default function DistributorLogin() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        // Clear all cookies on same site
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = (eqPos > -1 ? cookie.substr(0, eqPos) : cookie).trim();
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Strict";
        }
    }, []);

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
