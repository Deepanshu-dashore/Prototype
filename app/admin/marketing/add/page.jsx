"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
    ArrowLeftIcon,
    PlusIcon,
    PencilSquareIcon,
    CheckIcon,
    LinkIcon,
    TagIcon,
    ArrowUpTrayIcon,
    VideoCameraIcon,
    MegaphoneIcon,
    DocumentTextIcon,
    BookOpenIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import ConfirmationModal from "@/src/components/ui/ConfirmationModal";

// ─── Type Options ──────────────────────────────────────────────────────────────
const TYPE_OPTIONS = [
    { value: "youtube", label: "YouTube Video", icon: VideoCameraIcon, color: "text-red-500", bg: "bg-red-50", border: "border-red-200", activeBg: "bg-red-500", activeText: "text-white", desc: "Embed a YouTube video link" },
    { value: "social_post", label: "Social Post", icon: MegaphoneIcon, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200", activeBg: "bg-blue-500", activeText: "text-white", desc: "Link to a social media post" },
    { value: "case_study", label: "Case Study", icon: DocumentTextIcon, color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200", activeBg: "bg-emerald-500", activeText: "text-white", desc: "Upload a case study PDF" },
    { value: "playbook", label: "Playbook", icon: BookOpenIcon, color: "text-purple-500", bg: "bg-purple-50", border: "border-purple-200", activeBg: "bg-purple-500", activeText: "text-white", desc: "Upload a playbook PDF" },
];

function getYouTubeId(url) {
    if (!url) return null;
    const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : null;
}

export default function AddMarketingPage() {
    const router = useRouter();
    const fileRef = useRef();

    const [form, setForm] = useState({ title: "", type: "youtube", url: "", description: "", tags: "" });
    const [file, setFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [dragOver, setDragOver] = useState(false);

    const needsFile = form.type === "case_study" || form.type === "playbook";
    const youtubeThumb = form.type === "youtube" && form.url ? (() => { const id = getYouTubeId(form.url); return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null; })() : null;

    const handleSubmit = async () => {
        setError("");
        setSubmitting(true);
        try {
            const fd = new FormData();
            fd.append("title", form.title);
            fd.append("type", form.type);
            fd.append("url", form.url);
            fd.append("description", form.description);
            fd.append("tags", form.tags);
            if (file) fd.append("file", file);
            await axios.post("/api/marketing", fd);
            router.push("/admin/marketing");
        } catch (err) {
            setError(err?.response?.data?.message || "Something went wrong. Please try again.");
            setSubmitting(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        const dropped = e.dataTransfer.files?.[0];
        if (dropped && dropped.type === "application/pdf") setFile(dropped);
    };

    const selectedType = TYPE_OPTIONS.find(t => t.value === form.type);

    return (
        <div className="min-h-screen bg-gray-50/50 font-sans">
            {/* ── Top Bar ── */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.push("/admin/marketing")} className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors">
                        <ArrowLeftIcon className="w-4 h-4" />
                    </button>
                    <div>
                        <h1 className="text-base font-bold text-gray-900 tracking-tight">Add Marketing Material</h1>
                        <p className="text-xs text-gray-400 mt-0.5">Fill in the details below to add a new material</p>
                    </div>
                </div>
                <button
                    onClick={() => {
                        if (!form.title) { setError("Title is required."); return; }
                        if (!needsFile && !form.url && form.type !== "case_study" && form.type !== "playbook") { setError("URL is required for this type."); return; }
                        if (needsFile && !file) { setError("Please upload a PDF file."); return; }
                        setError("");
                        setConfirmOpen(true);
                    }}
                    disabled={submitting}
                    className="flex items-center gap-2 bg-linear-to-r from-indigo-600 to-blue-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:opacity-90 transition-all disabled:opacity-60"
                >
                    <CheckIcon className="w-4 h-4" />
                    Save Material
                </button>
            </div>

            <div className="max-w-3xl mx-auto p-6 flex flex-col gap-6">
                {error && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium flex items-center gap-2">
                        <XMarkIcon className="w-4 h-4 shrink-0" />
                        {error}
                    </div>
                )}

                {/* ── Type Selector ── */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h2 className="text-sm font-bold text-gray-800 mb-4">Material Type</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {TYPE_OPTIONS.map(opt => {
                            const isActive = form.type === opt.value;
                            return (
                                <button
                                    key={opt.value}
                                    type="button"
                                    onClick={() => setForm(f => ({ ...f, type: opt.value }))}
                                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-center
                                        ${isActive
                                            ? `${opt.border} ${opt.bg} shadow-sm ring-2 ring-offset-1 ${opt.border}`
                                            : "border-gray-100 hover:border-gray-200 bg-gray-50/50"
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? opt.bg : "bg-white"} border ${isActive ? opt.border : "border-gray-200"}`}>
                                        <opt.icon className={`w-5 h-5 ${isActive ? opt.color : "text-gray-400"}`} />
                                    </div>
                                    <div>
                                        <p className={`text-xs font-semibold ${isActive ? opt.color : "text-gray-700"}`}>{opt.label}</p>
                                        <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{opt.desc}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ── Details Form ── */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-2 mb-1">
                        <div className={`w-7 h-7 rounded-lg ${selectedType?.bg} flex items-center justify-center`}>
                            {selectedType && <selectedType.icon className={`w-4 h-4 ${selectedType.color}`} />}
                        </div>
                        <h2 className="text-sm font-bold text-gray-800">{selectedType?.label} Details</h2>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Title <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            required
                            value={form.title}
                            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                            placeholder="Enter a clear, descriptive title..."
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
                        />
                    </div>

                    {/* URL for YouTube & Social */}
                    {(form.type === "youtube" || form.type === "social_post") && (
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                                {form.type === "youtube" ? "YouTube URL" : "Post Link / URL"} <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="url"
                                    value={form.url}
                                    onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                                    placeholder={form.type === "youtube" ? "https://youtube.com/watch?v=..." : "https://"}
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
                                />
                            </div>

                            {/* YouTube Thumbnail Preview */}
                            {form.type === "youtube" && youtubeThumb && (
                                <div className="mt-3 rounded-xl overflow-hidden border border-gray-200 h-36 relative">
                                    <img src={youtubeThumb} alt="Thumbnail preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                        <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-white/60 flex items-center justify-center">
                                            <VideoCameraIcon className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-2 left-2">
                                        <span className="text-[10px] bg-black/60 text-white px-2 py-0.5 rounded-full font-medium">Thumbnail Preview</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* PDF File Upload */}
                    {needsFile && (
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                                PDF File <span className="text-red-500">*</span>
                            </label>
                            <div
                                onClick={() => fileRef.current?.click()}
                                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={handleDrop}
                                className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-all
                                    ${dragOver
                                        ? "border-indigo-400 bg-indigo-50/50"
                                        : file
                                            ? "border-emerald-400 bg-emerald-50/30"
                                            : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/20"
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${file ? "bg-emerald-100" : "bg-gray-100"}`}>
                                    <ArrowUpTrayIcon className={`w-6 h-6 ${file ? "text-emerald-600" : "text-gray-400"}`} />
                                </div>
                                {file ? (
                                    <>
                                        <p className="text-sm font-semibold text-emerald-700">{file.name}</p>
                                        <p className="text-xs text-emerald-500">{(file.size / 1024 / 1024).toFixed(2)} MB • Click to change</p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-sm font-semibold text-gray-600">Drop your PDF here or click to browse</p>
                                        <p className="text-xs text-gray-400">PDF files only • Max 50 MB recommended</p>
                                    </>
                                )}
                                <input ref={fileRef} type="file" accept="application/pdf" className="hidden" onChange={e => setFile(e.target.files[0] || null)} />
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Description <span className="text-gray-400 font-normal">(optional)</span></label>
                        <textarea
                            rows={3}
                            value={form.description}
                            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                            placeholder="A brief description of this material..."
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all resize-none"
                        />
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="flex items-center gap-1 text-xs font-semibold text-gray-600 mb-1.5">
                            <TagIcon className="w-3.5 h-3.5" /> Tags <span className="text-gray-400 font-normal">(comma-separated, optional)</span>
                        </label>
                        <input
                            type="text"
                            value={form.tags}
                            onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                            placeholder="e.g. marketing, product, launch"
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
                        />
                        {form.tags && (
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {form.tags.split(",").filter(t => t.trim()).map((t, i) => (
                                    <span key={i} className={`text-[11px] px-2.5 py-1 rounded-full font-medium border ${selectedType?.bg} ${selectedType?.color} ${selectedType?.border}`}>
                                        #{t.trim()}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Action Buttons ── */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => router.push("/admin/marketing")}
                        className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            if (!form.title) { setError("Title is required."); return; }
                            setError("");
                            setConfirmOpen(true);
                        }}
                        disabled={submitting}
                        className="flex-1 py-3 rounded-xl bg-linear-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                        {submitting ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <PlusIcon className="w-4 h-4" />
                                Add Material
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* ── Confirmation ── */}
            <ConfirmationModal
                isOpen={confirmOpen}
                onClose={() => setConfirmOpen(false)}
                onConfirm={() => { setConfirmOpen(false); handleSubmit(); }}
                title="Add Material"
                message={`Add "${form.title}" as a new ${selectedType?.label}?`}
                type="save"
                confirmText="Yes, Add It"
                isLoading={submitting}
            />
        </div>
    );
}
