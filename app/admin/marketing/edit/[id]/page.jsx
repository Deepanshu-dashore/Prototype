"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import {
    ArrowLeftIcon,
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

const TYPE_OPTIONS = [
    { value: "youtube", label: "YouTube Video", icon: VideoCameraIcon, color: "text-red-500", bg: "bg-red-50", border: "border-red-200", desc: "Embed a YouTube video link" },
    { value: "social_post", label: "Social Post", icon: MegaphoneIcon, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200", desc: "Link to a social media post" },
    { value: "case_study", label: "Case Study", icon: DocumentTextIcon, color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200", desc: "Upload a case study PDF" },
    { value: "playbook", label: "Playbook", icon: BookOpenIcon, color: "text-purple-500", bg: "bg-purple-50", border: "border-purple-200", desc: "Upload a playbook PDF" },
];

function getYouTubeId(url) {
    if (!url) return null;
    const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : null;
}

export default function EditMarketingPage() {
    const router = useRouter();
    const { id } = useParams();
    const fileRef = useRef();

    const [form, setForm] = useState({ title: "", type: "youtube", url: "", description: "", tags: "" });
    const [file, setFile] = useState(null);
    const [existingUrl, setExistingUrl] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [loadingAsset, setLoadingAsset] = useState(true);
    const [error, setError] = useState("");
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [dragOver, setDragOver] = useState(false);

    const needsFile = form.type === "case_study" || form.type === "playbook";
    const youtubeThumb = form.type === "youtube" && form.url ? (() => { const vid = getYouTubeId(form.url); return vid ? `https://img.youtube.com/vi/${vid}/hqdefault.jpg` : null; })() : null;

    useEffect(() => {
        if (!id) return;
        (async () => {
            try {
                const res = await axios.get(`/api/marketing/${id}`);
                if (res.data?.success) {
                    const a = res.data.data;
                    setForm({
                        title: a.title || "",
                        type: a.type || "youtube",
                        url: a.url || "",
                        description: a.description || "",
                        tags: Array.isArray(a.tags) ? a.tags.join(", ") : a.tags || "",
                    });
                    setExistingUrl(a.url || "");
                }
            } catch (e) {
                setError("Failed to load asset. Please go back and try again.");
            } finally {
                setLoadingAsset(false);
            }
        })();
    }, [id]);

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
            await axios.put(`/api/marketing/${id}`, fd);
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

    if (loadingAsset) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-gray-500">Loading material...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/50 font-sans">
            {/* ── Top Bar ── */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <button onClick={() => router.push("/admin/marketing")} className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors">
                        <ArrowLeftIcon className="w-4 h-4" />
                    </button>
                    <div>
                        <h1 className="text-base font-bold text-gray-900 tracking-tight">Edit Marketing Material</h1>
                        <p className="text-xs text-gray-400 mt-0.5 truncate max-w-[300px]">{form.title || "Loading..."}</p>
                    </div>
                </div>
                <button
                    onClick={() => { if (!form.title) { setError("Title is required."); return; } setError(""); setConfirmOpen(true); }}
                    disabled={submitting}
                    className="flex items-center gap-2 bg-linear-to-r from-indigo-600 to-blue-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:opacity-90 transition-all disabled:opacity-60"
                >
                    <CheckIcon className="w-4 h-4" />
                    Save Changes
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
                                        ${isActive ? `${opt.border} ${opt.bg} shadow-sm ring-2 ring-offset-1 ${opt.border}` : "border-gray-100 hover:border-gray-200 bg-gray-50/50"}`}
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
                        <span className="ml-auto text-[10px] bg-amber-50 text-amber-600 border border-amber-200 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                            <PencilSquareIcon className="w-3 h-3" /> Editing
                        </span>
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Title <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                            placeholder="Enter a clear, descriptive title..."
                            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all"
                        />
                    </div>

                    {/* URL */}
                    {(form.type === "youtube" || form.type === "social_post") && (
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                                {form.type === "youtube" ? "YouTube URL" : "Post Link / URL"}
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

                    {/* PDF Upload */}
                    {needsFile && (
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                                PDF File
                                <span className="text-gray-400 font-normal ml-1">(Leave empty to keep existing)</span>
                            </label>
                            {existingUrl && !file && (
                                <div className="mb-3 flex items-center gap-2 p-3 rounded-xl bg-indigo-50 border border-indigo-200">
                                    <DocumentTextIcon className="w-4 h-4 text-indigo-500 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-indigo-700 truncate">Current file</p>
                                        <a href={existingUrl} target="_blank" rel="noreferrer" className="text-[10px] text-indigo-500 hover:underline truncate block">{existingUrl}</a>
                                    </div>
                                </div>
                            )}
                            <div
                                onClick={() => fileRef.current?.click()}
                                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={handleDrop}
                                className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center gap-3 cursor-pointer transition-all
                                    ${dragOver ? "border-indigo-400 bg-indigo-50/50" : file ? "border-emerald-400 bg-emerald-50/30" : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/20"}`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${file ? "bg-emerald-100" : "bg-gray-100"}`}>
                                    <ArrowUpTrayIcon className={`w-5 h-5 ${file ? "text-emerald-600" : "text-gray-400"}`} />
                                </div>
                                {file ? (
                                    <>
                                        <p className="text-sm font-semibold text-emerald-700">{file.name}</p>
                                        <p className="text-xs text-emerald-500">{(file.size / 1024 / 1024).toFixed(2)} MB • Click to change</p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-sm font-semibold text-gray-600">Drop new PDF or click to browse</p>
                                        <p className="text-xs text-gray-400">Replaces the existing file</p>
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
                            <TagIcon className="w-3.5 h-3.5" /> Tags <span className="text-gray-400 font-normal">(comma-separated)</span>
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
                        onClick={() => router.push("/admin/marketing")}
                        className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => { if (!form.title) { setError("Title is required."); return; } setError(""); setConfirmOpen(true); }}
                        disabled={submitting}
                        className="flex-1 py-3 rounded-xl bg-linear-to-r from-indigo-600 to-blue-600 text-white text-sm font-semibold shadow-sm hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                        {submitting ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <PencilSquareIcon className="w-4 h-4" />
                                Save Changes
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
                title="Save Changes"
                message={`Save changes to "${form.title}"?`}
                type="save"
                confirmText="Save Changes"
                isLoading={submitting}
            />
        </div>
    );
}
