"use client";

import QCReportView from "@/src/components/share/QCReportView";
import { useParams } from "next/navigation";

export default function DistributorQCPage() {
    const params = useParams();
    const id = params?.id;

    if (!id) return null;

    return <QCReportView orderId={id} />;
}
