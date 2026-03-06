'use client';

import { useState, useEffect } from "react";
import axios from "axios";

export default function MarqueeBar() {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTagline = async () => {
            try {
                const res = await axios.get("/api/tag-line");
                setText(res.data?.data || "");
            } catch (error) {
                console.error("Failed to load tagline:", error);
                setText("Welcome to CC Matting - Industry leading solutions for all your needs");
            } finally {
                setLoading(false);
            }
        };

        fetchTagline();
    }, []);

    if (loading) return null;
    if (!text) return null; // Hide if tagline is deleted

    const content = (
        <div className="flex items-center gap-6">
            <span className="font-normal tracking-wider">{text}</span>
            <span>•</span>
            <span className="font-normal tracking-wider">{text}</span>
            <span>•</span>
            <span className="font-normal tracking-wider">{text}</span>
            <span>•</span>
            <span className="font-normal tracking-wider">{text}</span>
            <span>•</span>
            <span className="font-normal tracking-wider">{text}</span>
            <span>•</span>
            <span className="font-normal tracking-wider">{text}</span>
            <span>•</span>
        </div>
    );

    return (
        <div className="bg-blue-800 text-white text-sm py-2 overflow-hidden block">
            <div className="flex w-max animate-[scroll_300s_linear_infinite] gap-6 hover:[animation-play-state:paused]">
                {content}
                {content}
            </div>
        </div>
    );
}
