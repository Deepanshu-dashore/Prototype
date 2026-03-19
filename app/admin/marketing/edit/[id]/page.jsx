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

// ─── Type Options ──────────────────────────────────────────────────────────────
const TYPE_OPTIONS = [
    { value: "youtube", label: "YouTube Video", icon: VideoCameraIcon, color: "text-red-500", bg: "bg-red-50", iconBg: "bg-red-500", border: "border-red-200", activeBg: "bg-red-500", activeText: "text-white", desc: "Embed a YouTube video link" },
    { value: "social_post", label: "Social Post", icon: MegaphoneIcon, color: "text-blue-500", bg: "bg-blue-50", iconBg: "bg-blue-500", border: "border-blue-200", activeBg: "bg-blue-500", activeText: "text-white", desc: "Upload image/video for social post" },
    { value: "case_study", label: "Case Study", icon: DocumentTextIcon, color: "text-emerald-500", bg: "bg-emerald-50", iconBg: "bg-emerald-500", border: "border-emerald-200", activeBg: "bg-emerald-500", activeText: "text-white", desc: "Upload a case study PDF" },
    { value: "playbook", label: "Playbook", icon: BookOpenIcon, color: "text-purple-500", bg: "bg-purple-50", iconBg: "bg-purple-500", border: "border-purple-200", activeBg: "bg-purple-500", activeText: "text-white", desc: "Upload a playbook PDF" },
];

function getYouTubeId(url) {
    if (!url) return null;
    const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : null;
}

export default function EditMarketingPage() {
    const router = useRouter();
    const { id } = useParams();
    const pdfFileRef = useRef();
    const mediaFileRef = useRef();

    const [form, setForm] = useState({ title: "", type: "youtube", url: "", description: "", tags: "", attachmentType: "image" });
    const [file, setFile] = useState(null);
    const [existingUrl, setExistingUrl] = useState("");
    const [existingAttachment, setExistingAttachment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [loadingAsset, setLoadingAsset] = useState(true);
    const [error, setError] = useState("");
    const [dragOver, setDragOver] = useState(false);

    const wordCount = form.description.trim().split(/\s+/).filter(Boolean).length;
    const overLimit = wordCount > 500;

    const isPDFType = form.type === "case_study" || form.type === "playbook";
    const isSocialPost = form.type === "social_post";
    const needsFile = isPDFType || isSocialPost;
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
                    setExistingAttachment(a.attachment || "");
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
            if (file) {
                if (form.type === "social_post") {
                    fd.append("attachment", file);
                    fd.append("attachmentType", form.attachmentType);
                } else {
                    fd.append("file", file);
                }
            }
            await axios.put(`/api/marketing/${id}`, fd);
            router.push("/admin/marketing");
        } catch (err) {
            setError(err?.response?.data?.message || "Something went wrong. Please try again.");
            setSubmitting(false);
        }
    };

    const handleDrop = (e, target) => {
        e.preventDefault();
        setDragOver(false);
        const dropped = e.dataTransfer.files?.[0];
        if (!dropped) return;

        if (target === "media" && isSocialPost) {
            const isVideo = dropped.type.startsWith("video/") ||
                dropped.name.endsWith(".mp4") ||
                dropped.name.endsWith(".avi") ||
                dropped.name.endsWith(".mov") ||
                dropped.name.endsWith(".wmv") ||
                dropped.name.endsWith(".webm");
            const isImage = dropped.type.startsWith("image/");

            if (isImage || isVideo) {
                setFile(dropped);
                setForm(f => ({ ...f, attachmentType: isImage ? "image" : "video" }));
            }
        } else if (target === "pdf" && isPDFType) {
            if (dropped.type === "application/pdf") {
                setFile(dropped);
            }
        }
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
                        <p className="text-xs text-gray-400 mt-0.5">Modify the details of this material</p>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-6 flex flex-col gap-6">
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
                                    className={`flex items-center gap-2 p-1.5 rounded-2xl border transition-all text-center
                                        ${isActive
                                            ? `${opt.border} ${opt.bg} shadow-sm ${opt.border}`
                                            : "border-gray-200 hover:border-gray-200 bg-gray-50/50"
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isActive ? opt.iconBg : "bg-white"} border ${isActive ? opt.border : "border-gray-200"}`}>
                                        <opt.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`} />
                                    </div>
                                    <div className="text-left">
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
                        <label className="bg-white font-semibold px-2 inline-block mb-1.5 text-sm text-gray-700 tracking-tight">Title <span className="text-red-500">*</span></label>
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
                            <label className="bg-white font-semibold px-2 inline-block mb-1.5 text-sm text-gray-700 tracking-tight">
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

                            {/* Social Post Attachment Type Toggle */}
                            {form.type === "social_post" && (
                                <div className="mt-4">
                                    <label className="bg-white font-semibold px-2 inline-block mb-1.5 text-sm text-gray-700 tracking-tight">Attachment Type</label>
                                    <div className="flex bg-gray-100 p-1.5 rounded-2xl w-fit gap-1 border border-gray-200 shadow-inner">
                                        {["image", "video"].map(t => (
                                            <button
                                                key={t}
                                                type="button"
                                                onClick={() => setForm(f => ({ ...f, attachmentType: t }))}
                                                className={`flex items-center gap-2 px-6 py-2 rounded-xl text-xs font-bold transition-all ${form.attachmentType === t ? "bg-white text-blue-600 shadow-xs ring-1 ring-black/5" : "text-gray-500 hover:bg-white/50"}`}
                                            >
                                                {t === "image" ? <PlusIcon className="w-3.5 h-3.5" /> : <VideoCameraIcon className="w-3.5 h-3.5" />}
                                                <span className="capitalize">{t}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-[10px] text-gray-400 mt-2 px-2 italic font-medium">
                                        {form.attachmentType === "image" ? "Upload a high-quality JPG, PNG or WebP image." : "Upload a video file (MP4, WebM up to 50MB)."}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Social Post Media Upload */}
                    {isSocialPost && (
                        <div>
                            <label className="bg-white font-semibold px-2 inline-block mb-1.5 text-sm text-gray-700 tracking-tight">
                                Social Post Media <span className="text-gray-400 font-normal">(Leave empty to keep existing)</span>
                            </label>

                            {existingAttachment && !file && (
                                <div className="mb-3 flex flex-col gap-2 p-3 rounded-xl bg-blue-50 border border-blue-200">
                                    <div className="flex items-center gap-2">
                                        <MegaphoneIcon className="w-4 h-4 text-blue-500 shrink-0" />
                                        <p className="text-xs font-semibold text-blue-700">Current Attachment</p>
                                    </div>
                                    <div className="rounded-lg overflow-hidden border border-blue-100 max-h-40 relative group/preview">
                                        {existingAttachment.includes("video") ||
                                            existingAttachment.endsWith(".mp4") ||
                                            existingAttachment.endsWith(".avi") ||
                                            existingAttachment.endsWith(".mov") ||
                                            existingAttachment.endsWith(".wmv") ||
                                            existingAttachment.endsWith(".webm") ? (
                                            <iframe src={existingAttachment} className="w-full aspect-video rounded-lg" />
                                        ) : (
                                            <img src={existingAttachment} alt="Existing attachment" className="w-full h-auto object-cover" />
                                        )}
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center">
                                            <p className="text-white text-[10px] font-bold">CURRENTLY SAVED</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div
                                onClick={() => mediaFileRef.current?.click()}
                                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={e => handleDrop(e, "media")}
                                className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center gap-3 cursor-pointer transition-all
                                    ${dragOver
                                        ? "border-blue-400 bg-blue-50/50"
                                        : file
                                            ? "border-emerald-400 bg-emerald-50/30"
                                            : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/20"
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${file ? "bg-emerald-100" : "bg-gray-100"}`}>
                                    {form.attachmentType === "image" ? <PlusIcon className={`w-6 h-6 ${file ? "text-emerald-600" : "text-gray-400"}`} /> : <VideoCameraIcon className={`w-6 h-6 ${file ? "text-emerald-600" : "text-gray-400"}`} />}
                                </div>
                                {file ? (
                                    <>
                                        <p className="text-sm font-semibold text-emerald-700">{file.name}</p>
                                        <p className="text-xs text-emerald-500">{(file.size / 1024 / 1024).toFixed(2)} MB • Click to change</p>
                                    </>
                                ) : (
                                    <>
                                        <p className="text-sm font-semibold text-gray-600">Drop new {form.attachmentType} or click to browse</p>
                                        <p className="text-xs text-gray-400">Replaces the existing media</p>
                                    </>
                                )}
                                <input
                                    ref={mediaFileRef}
                                    type="file"
                                    accept={form.attachmentType === "image" ? "image/*" : ".mp4,.avi,.mov,.wmv,.webm,video/*"}
                                    className="hidden"
                                    onChange={e => {
                                        const f = e.target.files[0];
                                        if (f) {
                                            setFile(f);
                                            const isVideo = f.type.startsWith("video/") ||
                                                f.name.endsWith(".mp4") ||
                                                f.name.endsWith(".avi") ||
                                                f.name.endsWith(".mov") ||
                                                f.name.endsWith(".wmv") ||
                                                f.name.endsWith(".webm");
                                            setForm(prev => ({ ...prev, attachmentType: isVideo ? "video" : "image" }));
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* PDF File Upload */}
                    {isPDFType && (
                        <div>
                            <label className="bg-white font-semibold px-2 inline-block mb-1.5 text-sm text-gray-700 tracking-tight">
                                PDF File <span className="text-gray-400 font-normal">(Leave empty to keep existing)</span>
                            </label>

                            {existingUrl && !file && (
                                <div className="mb-3 flex items-center gap-2 p-3 rounded-xl bg-indigo-50 border border-indigo-200">
                                    <DocumentTextIcon className="w-4 h-4 text-indigo-500 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-indigo-700">Current file</p>
                                        <a href={existingUrl} target="_blank" rel="noreferrer" className="text-[10px] text-indigo-500 hover:underline truncate block">{existingUrl}</a>
                                    </div>
                                </div>
                            )}

                            <div
                                onClick={() => pdfFileRef.current?.click()}
                                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={e => handleDrop(e, "pdf")}
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
                                        <p className="text-sm font-semibold text-gray-600">Drop new PDF or click to browse</p>
                                        <p className="text-xs text-gray-400">Replaces the existing file</p>
                                    </>
                                )}
                                <input
                                    ref={pdfFileRef}
                                    type="file"
                                    accept="application/pdf"
                                    className="hidden"
                                    onChange={e => {
                                        const f = e.target.files[0];
                                        if (f) setFile(f);
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="bg-white font-semibold px-2 inline-block text-sm text-gray-700 tracking-tight">Description <span className="text-gray-400 font-normal">(optional)</span></label>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${overLimit ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"}`}>
                                {wordCount} / 500 words
                            </span>
                        </div>
                        <textarea
                            rows={4}
                            value={form.description}
                            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                            placeholder="A brief description of this material..."
                            className={`w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border ${overLimit ? "border-red-400 ring-1 ring-red-400" : "border-gray-200"} text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition-all resize-none`}
                        />
                        {overLimit && (
                            <p className="text-[10px] text-red-500 mt-1 font-medium ml-2">Description is too long. Please reduce it to 500 words or less.</p>
                        )}
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="flex items-center gap-1 font-semibold bg-white px-2 mb-1.5 text-sm text-gray-700 tracking-tight">
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
                <div className="flex flex-col sm:flex-row items-center justify-end gap-6 mt-4">
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex-1 sm:flex-none px-8 py-4 rounded-md border border-gray-200 font-bold text-gray-500 hover:bg-gray-50 transition-all text-sm bg-white"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            disabled={submitting}
                            onClick={() => {
                                if (!form.title) {
                                    setError("Title is required.");
                                    return;
                                }
                                if ((form.type === "youtube" || form.type === "social_post") && !form.url) {
                                    setError("URL is required.");
                                    return;
                                }
                                if (overLimit) {
                                    setError("Description cannot exceed 500 words.");
                                    return;
                                }
                                setError("");
                                handleSubmit();
                            }}
                            className="flex-1 sm:flex-none px-10 py-4 rounded-md bg-gray-900 text-white font-bold hover:bg-black transition-all shadow-xl shadow-gray-200 flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed text-sm tracking-tight"
                        >
                            {submitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
