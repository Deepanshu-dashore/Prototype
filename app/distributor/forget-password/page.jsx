"use client";
import { useState } from "react";
import UnifiedLogin from "@/src/components/auth/UnifiedLogin";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ForgetPassword() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const [tab, setTab] = useState("otp");
    const [email, setEmail] = useState("");

    const handleForgetPassword = async () => {
        setError("");
        setLoading(true);

        if (!email) {
            setError("Email is required");
            return;
        }

        try {
            const res = await axios.post("/api/distributor/forget/otp", { email });
            if (res.data?.success) {
                alert("OTP sent successfully");
                setTab("verify");
            } else {
                setError(res.data?.message || "Login failed");
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (formData) => {
        setError("");
        setLoading(true);

        try {
            const res = await axios.post("/api/distributor/forget/reset-password", { ...formData, email });
            if (res.data?.success) {
                alert("Password reset successfully");
                router.push("/distributor/login");
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
        <>
            {tab === "otp" && <UnifiedLogin
                title="Forget Password"
                fields={[
                    { name: "email", state: email, onChange: (e) => setEmail(e.target.value), type: "email", placeholder: "marketing@company.com", label: "Company Email" },
                ]}
                onSubmit={handleForgetPassword}
                loading={loading}
                error={error}
                rememberMeIdx={false}
                links={{
                    forgotPassword: false,
                    register: false
                }}
            />}
            {tab === "verify" && <UnifiedLogin
                title="Verify OTP"
                fields={[
                    { name: "otp", type: "text", placeholder: "123456", label: "OTP" },
                    { name: "password", type: "password", placeholder: "********", label: "New Password" },
                ]}
                onSubmit={handleVerifyOtp}
                loading={loading}
                error={error}
                rememberMeIdx={false}
                links={{
                    forgotPassword: false,
                    register: false
                }}
            />}
        </>
    );
}