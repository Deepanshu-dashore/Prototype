"use client";

import { usePathname } from "next/navigation";
import WarehouseSidebar from "./WarehouseSidebar";

export default function WarehousePortalWrapper({ children }) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/warehouse/login";

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen">
            <WarehouseSidebar />
            <main className="flex-1 lg:overflow-y-auto h-screen pl-64 pt-16 lg:pt-0  bg-linear-to-t from-blue-400/5 to-primary/5">
                {children}
            </main>
        </div>
    );
}
