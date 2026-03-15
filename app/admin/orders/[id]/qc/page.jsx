"use client";

import QCForm from "@/src/components/share/QCForm";
import { useParams } from "next/navigation";

export default function AdminQCPage() {
    const params = useParams();
    const id = params?.id;

    if (!id) return null;

    return <QCForm orderId={id} role="admin" />;
}
