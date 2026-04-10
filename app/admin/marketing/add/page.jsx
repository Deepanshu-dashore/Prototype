"use client";

import { useState, useEffect, useRef } from "react";
import { useApiClient } from "@/src/config/axios";
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
    ChartBarIcon,
} from "@heroicons/react/24/outline";

// ─── Type Options ──────────────────────────────────────────────────────────────
const TYPE_OPTIONS = [
    { value: "youtube", label: "YouTube Video", icon: VideoCameraIcon, color: "text-red-500", bg: "bg-red-50", iconBg: "bg-red-500", border: "border-red-200", activeBg: "bg-red-500", activeText: "text-white", desc: "Embed a YouTube video link" },
    { value: "social_post", label: "Social Post", icon: MegaphoneIcon, color: "text-blue-500", bg: "bg-blue-50", iconBg: "bg-blue-500", border: "border-blue-200", activeBg: "bg-blue-500", activeText: "text-white", desc: "Upload image, video, or PDF for social post" },
    { value: "case_study", label: "Case Study", icon: DocumentTextIcon, color: "text-emerald-500", bg: "bg-emerald-50", iconBg: "bg-emerald-500", border: "border-emerald-200", activeBg: "bg-emerald-500", activeText: "text-white", desc: "Upload a case study PDF" },
    { value: "playbook", label: "Playbook", icon: BookOpenIcon, color: "text-purple-500", bg: "bg-purple-50", iconBg: "bg-purple-500", border: "border-purple-200", activeBg: "bg-purple-500", activeText: "text-white", desc: "Upload a playbook PDF" },
];

function getYouTubeId(url) {
    if (!url) return null;
    const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : null;
}

export default function AddMarketingPage() {
    const api = useApiClient();
    const router = useRouter();
    const pdfFileRef = useRef();
    const mediaFileRef = useRef();

    const [form, setForm] = useState({ title: "", type: "youtube", url: "", description: "", tags: "", attachmentType: "image" });
    const [file, setFile] = useState(null); // Used for PDF or Media depending on type
    const [preview, setPreview] = useState(null);
    const [error, setError] = useState("");
    const [dragOver, setDragOver] = useState(false);

    useEffect(() => {
        if (!file) {
            setPreview(null);
            return;
        }
        const url = URL.createObjectURL(file);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    const createMutation = api.usePost("marketing", "/marketing", {
        onSuccess: () => router.push("/admin/marketing"),
        onError: (err) => {
            setError(err?.response?.data?.message || err.message || "Something went wrong. Please try again.");
        }
    });

    const submitting = createMutation.isPending;

    const wordCount = form.description.trim().split(/\s+/).filter(Boolean).length;
    const overLimit = wordCount > 100;

    const isPDFType = form.type === "case_study" || form.type === "playbook";
    const isSocialPost = form.type === "social_post";
    const needsFile = isPDFType || isSocialPost;
    const youtubeThumb = form.type === "youtube" && form.url ? (() => { const id = getYouTubeId(form.url); return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null; })() : null;

    const handleSubmit = async () => {
        setError("");
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
        createMutation.mutate(fd);
    };

    const handleDrop = (e, target) => {
        e.preventDefault();
        setDragOver(false);
        const dropped = e.dataTransfer.files?.[0];
        if (!dropped) return;

        if (target === "media" && isSocialPost) {
            const isVideo = dropped.type.startsWith("video/") ||
                dropped.name.toLowerCase().endsWith(".mp4") ||
                dropped.name.toLowerCase().endsWith(".avi") ||
                dropped.name.toLowerCase().endsWith(".mov") ||
                dropped.name.toLowerCase().endsWith(".wmv") ||
                dropped.name.toLowerCase().endsWith(".webm");
            const isPDF = dropped.type === "application/pdf" || dropped.name.toLowerCase().endsWith(".pdf");
            const isImage = dropped.type.startsWith("image/");

            if (isImage || isVideo || isPDF) {
                setFile(dropped);
                setForm(f => ({ ...f, attachmentType: isImage ? "image" : isVideo ? "video" : "pdf" }));
            }
        } else if (target === "pdf" && isPDFType) {
            if (dropped.type === "application/pdf" || dropped.name.toLowerCase().endsWith(".pdf")) {
                setFile(dropped);
            }
        }
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
            </div>

            <div className="max-w-4xl mx-auto p-6 px-0 flex flex-col gap-6">
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
                                    onClick={() => {
                                        if (form.type !== opt.value) {
                                            setForm({ ...form, type: opt.value, attachmentType: "image" });
                                            setFile(null);
                                            setError("");
                                        }
                                    }}
                                    className={`flex items-center gap-2 p-2 rounded-xl border transition-all text-center
                                            ${isActive
                                            ? `${opt.border} ${opt.bg} shadow-md z-10`
                                            : "border-slate-200 bg-white/50 hover:bg-slate-50 hover:border-slate-200"
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${isActive ? opt.iconBg : "bg-slate-100"} shadow-lg transition-transform group-hover:rotate-6`}>
                                        <opt.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-slate-400"}`} />
                                    </div>
                                    <div className="text-center">
                                        <p className={`text-sm font-bold tracking-tight ${isActive ? opt.color : "text-slate-700"}`}>{opt.label}</p>
                                    </div>
                                    {isActive && (
                                        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
                                            <CheckIcon className="w-3.5 h-3.5 text-white stroke-[3px]" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto flex flex-col gap-6 pb-12">
                {/* ── Details Form ── */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col gap-8">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl ${selectedType?.bg} border ${selectedType?.border} flex items-center justify-center shadow-inner`}>
                            {selectedType && <selectedType.icon className={`w-6 h-6 ${selectedType.color}`} />}
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">{selectedType?.label} Details</h2>
                            <p className="text-xs text-slate-400 font-medium">Complete the field requirements below</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                        {/* Title */}
                        <div className="group">
                            <label className="block text-sm font-bold text-slate-700 mb-2 ml-1 tracking-tight">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={form.title}
                                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                placeholder="Enter a premium title..."
                                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-sm text-slate-800 placeholder-slate-400 shadow-inner focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all duration-300"
                            />
                        </div>

                        {/* URL for YouTube & Social */}
                        {(form.type === "youtube" || form.type === "social_post") && (
                            <div className="animate-in slide-in-from-top-2 duration-300">
                                <label className="block text-sm font-bold text-slate-700 mb-2 ml-1 tracking-tight">
                                    {form.type === "youtube" ? "YouTube Connection" : "Digital Destination URL"}
                                    {form.type !== "social_post" && <span className="text-red-500">*</span>}
                                </label>
                                <div className="relative group/input">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-slate-200/50 flex items-center justify-center group-focus-within/input:bg-blue-100 transition-colors">
                                        <LinkIcon className="w-5 h-5 text-slate-500 group-focus-within/input:text-blue-600 transition-colors" />
                                    </div>
                                    <input
                                        type="url"
                                        value={form.url}
                                        onChange={e => setForm(f => ({ ...f, url: e.target.value }))}
                                        placeholder={form.type === "youtube" ? "Paste your link here..." : "https://app.example.com"}
                                        className="w-full pl-16 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-sm font-medium text-slate-800 placeholder-slate-400 shadow-inner focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all duration-300"
                                    />
                                </div>

                                {/* YouTube Thumbnail Preview */}
                                {form.type === "youtube" && youtubeThumb && (
                                    <div className="mt-5 rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl h-48 relative group/thumb">
                                        <img src={youtubeThumb} alt="Thumbnail preview" className="w-full h-full object-cover transition-transform duration-700 group-hover/thumb:scale-110" />
                                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center">
                                            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border-2 border-white/60 flex items-center justify-center shadow-white/20 shadow-2xl group-hover/thumb:scale-125 transition-all duration-500">
                                                <VideoCameraIcon className="w-8 h-8 text-white" />
                                            </div>
                                        </div>
                                        <div className="absolute top-4 right-4">
                                            <span className="text-[10px] bg-emerald-500 text-white px-3 py-1 rounded-full font-bold uppercase tracking-widest shadow-lg">Link Active</span>
                                        </div>
                                    </div>
                                )}

                                {/* Social Post Attachment Type Toggle */}
                                {form.type === "social_post" && (
                                    <div className="mt-8 p-6 bg-slate-50 rounded-[2rem] border border-slate-200/50">
                                        <label className="block text-xs font-black text-slate-500 mb-4 uppercase tracking-widest ml-1">Attachment Specs</label>
                                        <div className="flex bg-white p-2 rounded-[1.5rem] w-full sm:w-fit gap-2 shadow-inner border border-slate-100">
                                            {["image", "video", "pdf"].map(t => (
                                                <button
                                                    key={t}
                                                    type="button"
                                                    onClick={() => setForm(f => ({ ...f, attachmentType: t }))}
                                                    className={`flex-1 sm:flex-none flex items-center justify-center gap-3 px-8 py-3 rounded-2xl text-xs font-black transition-all duration-300
                                                        ${form.attachmentType === t
                                                            ? "bg-slate-900 text-white shadow-xl scale-105"
                                                            : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                                                        }`}
                                                >
                                                    {t === "image" ? <PlusIcon className="w-4 h-4" /> : t === "video" ? <VideoCameraIcon className="w-4 h-4" /> : <DocumentTextIcon className="w-4 h-4" />}
                                                    <span className="capitalize">{t}</span>
                                                </button>
                                            ))}
                                        </div>
                                        <div className="text-[11px] text-slate-400 mt-4 px-2 italic font-semibold flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                                            {form.attachmentType === "image" ? "High-res formats: PNG, JPG, WebP (Max 10MB)" : form.attachmentType === "video" ? "Optimized formats: MP4, MOV (Max 50MB)" : "Standard: Portable Document Format (PDF)"}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Social Post Media Upload */}
                    {isSocialPost && (
                        <div className="animate-in zoom-in duration-500">
                            <label className="block text-sm font-bold text-slate-700 mb-3 ml-1 tracking-tight">
                                Visual Asset <span className="text-red-500">*</span>
                            </label>
                            <div
                                onClick={() => mediaFileRef.current?.click()}
                                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={e => handleDrop(e, "media")}
                                className={`group relative border-2 border-dashed rounded-[2.5rem] p-12 flex flex-col items-center gap-4 cursor-pointer transition-all duration-500
                                    ${dragOver
                                        ? "border-blue-400 bg-blue-50/50 scale-[0.98]"
                                        : file
                                            ? "border-emerald-400 bg-emerald-50/30"
                                            : "border-slate-200 hover:border-blue-400 hover:bg-slate-50 shadow-inner"
                                    }`}
                            >
                                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center ${file ? "bg-emerald-500 text-white shadow-emerald-200" : "bg-white text-slate-300 shadow-slate-200"} shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                                    {form.attachmentType === "image" ? <PlusIcon className="w-10 h-10" /> : form.attachmentType === "video" ? <VideoCameraIcon className="w-10 h-10" /> : <DocumentTextIcon className="w-10 h-10" />}
                                </div>

                                <div className="text-center">
                                    {file ? (
                                        <div className="animate-in slide-in-from-bottom-2">
                                            {preview && (
                                                <div className="mb-4 rounded-xl overflow-hidden border-2 border-emerald-200 max-w-[200px] mx-auto shadow-lg bg-white">
                                                    {form.attachmentType === "image" ? (
                                                        <img src={preview} alt="Preview" className="w-full h-auto" />
                                                    ) : form.attachmentType === "video" ? (
                                                        <video src={preview} className="w-full h-auto" />
                                                    ) : (
                                                        <div className="p-4 flex flex-col items-center gap-2">
                                                            <DocumentTextIcon className="w-12 h-12 text-emerald-500" />
                                                            <span className="text-[10px] font-bold text-emerald-600">PDF READY</span>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            <p className="text-lg font-black text-emerald-700 max-w-xs truncate mx-auto">{file.name}</p>
                                            <p className="text-[11px] font-bold text-emerald-500 tracking-widest mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB • READY FOR DELIVERY</p>
                                        </div>
                                    ) : (
                                        <>
                                            <p className="text-base font-bold text-slate-600">Drop your {form.attachmentType} here</p>
                                            <p className="text-xs text-slate-400 mt-1 font-medium italic">or click to browse local files</p>
                                        </>
                                    )}
                                </div>

                                <input
                                    ref={mediaFileRef}
                                    type="file"
                                    accept={form.attachmentType === "image" ? "image/*" : form.attachmentType === "video" ? ".mp4,.avi,.mov,.wmv,.webm,video/*" : "application/pdf"}
                                    className="hidden"
                                    onChange={e => {
                                        const f = e.target.files[0];
                                        if (f) {
                                            setFile(f);
                                            const isVideo = f.type.startsWith("video/") ||
                                                f.name.toLowerCase().endsWith(".mp4") ||
                                                f.name.toLowerCase().endsWith(".avi") ||
                                                f.name.toLowerCase().endsWith(".mov") ||
                                                f.name.toLowerCase().endsWith(".wmv") ||
                                                f.name.toLowerCase().endsWith(".webm");
                                            const isPDF = f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf");
                                            const isImage = f.type.startsWith("image/");
                                            setForm(prev => ({ ...prev, attachmentType: isVideo ? "video" : isPDF ? "pdf" : "image" }));
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {/* PDF File Upload */}
                    {isPDFType && (
                        <div className="animate-in zoom-in duration-500">
                            <label className="block text-sm font-bold text-slate-700 mb-3 ml-1 tracking-tight">
                                Document Source <span className="text-red-500">*</span>
                            </label>
                            <div
                                onClick={() => pdfFileRef.current?.click()}
                                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={e => handleDrop(e, "pdf")}
                                className={`group relative border-2 border-dashed rounded-[2.5rem] p-12 flex flex-col items-center gap-4 cursor-pointer transition-all duration-500
                                    ${dragOver
                                        ? "border-indigo-400 bg-indigo-50/50 scale-[0.98]"
                                        : file
                                            ? "border-emerald-400 bg-emerald-50/30"
                                            : "border-slate-200 hover:border-indigo-400 hover:bg-slate-50 shadow-inner"
                                    }`}
                            >
                                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center ${file ? "bg-emerald-500 text-white shadow-emerald-200" : "bg-white text-slate-300 shadow-slate-200"} shadow-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                                    <ArrowUpTrayIcon className="w-10 h-10" />
                                </div>
                                <div className="text-center">
                                    {file ? (
                                        <div className="animate-in slide-in-from-bottom-2">
                                            {preview && (
                                                <div className="mb-4 rounded-xl overflow-hidden border-2 border-emerald-200 max-w-[200px] mx-auto shadow-lg bg-white p-4 flex flex-col items-center gap-2">
                                                    <DocumentTextIcon className="w-12 h-12 text-emerald-500" />
                                                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Document Ready</span>
                                                </div>
                                            )}
                                            <p className="text-lg font-black text-emerald-700 max-w-xs truncate mx-auto">{file.name}</p>
                                            <p className="text-[11px] font-bold text-emerald-500 tracking-widest mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB • READY FOR ANALYSIS</p>
                                        </div>
                                    ) : (
                                        <>
                                            <p className="text-base font-bold text-slate-600">Drop your PDF here</p>
                                            <p className="text-xs text-slate-400 mt-1 font-medium italic">High-fidelity PDF document required</p>
                                        </>
                                    )}
                                </div>
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
                        <div className="flex items-center justify-between mb-2 px-1">
                            <label className="text-sm font-bold text-slate-700 tracking-tight">Narrative <span className="text-slate-400 font-medium">(Optional)</span></label>
                            <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest transition-colors ${overLimit ? "bg-red-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                                {wordCount} / 100 Words
                            </span>
                        </div>
                        <textarea
                            rows={5}
                            value={form.description}
                            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                            placeholder="Tell the story of this material..."
                            className={`w-full px-5 py-4 rounded-[2rem] bg-slate-50 border transition-all duration-300 shadow-inner resize-none focus:outline-none focus:ring-4 focus:bg-white text-sm font-medium leading-relaxed
                                ${overLimit
                                    ? "border-red-400 focus:ring-red-100 placeholder-red-300"
                                    : "border-slate-200/80 focus:ring-blue-100 focus:border-blue-400 placeholder-slate-400"}`}
                        />
                        {overLimit && (
                            <p className="text-[10px] text-red-500 mt-2 font-bold ml-4 animate-pulse">NARRATIVE LIMIT REACHED. PLEASE CONDENSE YOUR CONTENT.</p>
                        )}
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 ml-1 tracking-tight">
                            <TagIcon className="w-4 h-4 text-blue-500" /> Keywords <span className="text-slate-400 font-medium">(Metadata)</span>
                        </label>
                        <input
                            type="text"
                            value={form.tags}
                            onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                            placeholder="marketing, growth, campaign"
                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-sm font-medium text-slate-800 placeholder-slate-400 shadow-inner focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all duration-300"
                        />
                        {form.tags && (
                            <div className="flex flex-wrap gap-2 mt-4 px-1">
                                {form.tags.split(",").filter(t => t.trim()).map((t, i) => (
                                    <span key={i} className={`text-[11px] px-4 py-1.5 rounded-full font-bold border animate-in zoom-in duration-300 shadow-xs
                                        ${selectedType?.bg} ${selectedType?.color} ${selectedType?.border}`}>
                                        #{t.trim().toUpperCase()}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Action Buttons ── */}
                <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-8">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex-1 sm:flex-none px-8 py-4 rounded-xl border border-gray-200 font-bold text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 text-sm"
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
                                if (isPDFType && !file) {
                                    setError("Please upload a PDF file.");
                                    return;
                                }
                                if (isSocialPost && !file) {
                                    setError("Please upload an image, video, or PDF for the post.");
                                    return;
                                }
                                if (form.type === "youtube" && !form.url) {
                                    setError("URL is required for YouTube videos.");
                                    return;
                                }
                                if (overLimit) {
                                    setError("Description cannot exceed 100 words.");
                                    return;
                                }
                                setError("");
                                handleSubmit();
                            }}
                            className="flex-1 sm:flex-none px-10 py-4 rounded-xl bg-gray-900 text-white font-bold hover:bg-black transition-all duration-200 shadow-sm flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed text-sm"
                        >
                            {submitting ? (
                                <>
                                    <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                                    Synchronizing...
                                </>
                            ) : (
                                <>
                                    Add Material
                                    <PlusIcon className="w-4 h-4 transition-transform group-hover:rotate-90 stroke-[3px]" />
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
