"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";

export default function WarehouseAuthGuard({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const isLoginPage = pathname === "/warehouse/login";

    useEffect(() => {
        const checkAuth = async () => {
            // Bypass for login page
            if (isLoginPage) {
                setIsLoading(false);
                return;
            }

            // Check for cookie first
            const hasToken = document.cookie.split(';').some((item) => item.trim().startsWith('warehouseToken='));

            if (!hasToken) {
                router.push("/warehouse/login");
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.get("/api/warehouse/verify");
                if (response.data?.success && response.data?.data?.authenticated) {
                    setIsAuthenticated(true);
                } else {
                    router.push("/warehouse/login");
                }
            } catch (error) {
                console.error("Warehouse auth verification failed:", error);
                router.push("/warehouse/login");
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [router, isLoginPage]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
                    <p className="text-gray-600 text-sm">Verifying Warehouse Session...</p>
                </div>
            </div>
        );
    }

    // Allow displaying children on login page regardless of auth status
    if (isLoginPage) {
        return <>{children}</>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
