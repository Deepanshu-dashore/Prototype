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
    ShieldCheckIcon,
} from "@heroicons/react/24/outline";

// ─── Type Options ──────────────────────────────────────────────────────────────
const TYPE_OPTIONS = [
    { value: "youtube", label: "YouTube Video", icon: VideoCameraIcon, color: "text-red-500", bg: "bg-red-50", iconBg: "bg-red-500", border: "border-red-200", activeBg: "bg-red-500", activeText: "text-white", desc: "Embed a YouTube video link" },
    { value: "social_post", label: "Social Post", icon: MegaphoneIcon, color: "text-blue-500", bg: "bg-blue-50", iconBg: "bg-blue-500", border: "border-blue-200", activeBg: "bg-blue-500", activeText: "text-white", desc: "Upload image, video, or PDF for social post" },
    { value: "case_study", label: "Case Study", icon: DocumentTextIcon, color: "text-emerald-500", bg: "bg-emerald-50", iconBg: "bg-emerald-500", border: "border-emerald-200", activeBg: "bg-emerald-500", activeText: "text-white", desc: "Upload a case study PDF" },
    { value: "playbook", label: "Playbook", icon: BookOpenIcon, color: "text-purple-500", bg: "bg-purple-50", iconBg: "bg-purple-500", border: "border-purple-200", activeBg: "bg-purple-500", activeText: "text-white", desc: "Upload a playbook PDF" },
    { value: "compliance", label: "Compliance", icon: ShieldCheckIcon, color: "text-teal-500", bg: "bg-teal-50", iconBg: "bg-teal-500", border: "border-teal-200", activeBg: "bg-teal-500", activeText: "text-white", desc: "Upload a compliance PDF" },
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

    const [form, setForm] = useState({
        title: "",
        type: "youtube",
        url: "",
        description: "",
        tags: "",
        attachmentType: "image",
        catgory: "Official Standards",
        status: "Current"
    });
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

    const createComplianceMutation = api.usePost("compliances", "/compliances", {
        onSuccess: () => router.push("/admin/marketing"),
        onError: (err) => {
            setError(err?.response?.data?.message || err.message || "Something went wrong. Please try again.");
        }
    });

    const submitting = createMutation.isPending || createComplianceMutation.isPending;

    const wordCount = form.description.trim().split(/\s+/).filter(Boolean).length;
    const maxWords = form.type === "compliance" ? 20 : 100;
    const overLimit = wordCount > maxWords;

    const isPDFType = form.type === "case_study" || form.type === "playbook" || form.type === "compliance";
    const isSocialPost = form.type === "social_post";
    const needsFile = isPDFType || isSocialPost;
    const youtubeThumb = form.type === "youtube" && form.url ? (() => { const id = getYouTubeId(form.url); return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null; })() : null;

    const handleSubmit = async () => {
        setError("");
        const fd = new FormData();
        if (form.type === "compliance") {
            fd.append("title", form.title);
            fd.append("subtitle", form.description);
            fd.append("url", form.url);
            fd.append("catgory", form.catgory);
            fd.append("status", form.status);
            if (file) {
                fd.append("file", file);
            }
            createComplianceMutation.mutate(fd);
        } else {
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
        }
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
            const isImage = dropped.type.startsWith("image/") ||
                dropped.name.toLowerCase().endsWith(".jpg") ||
                dropped.name.toLowerCase().endsWith(".jpeg") ||
                dropped.name.toLowerCase().endsWith(".png") ||
                dropped.name.toLowerCase().endsWith(".webp") ||
                dropped.name.toLowerCase().endsWith(".gif") ||
                dropped.name.toLowerCase().endsWith(".svg") ||
                dropped.name.toLowerCase().endsWith(".bmp");

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

            <div className="max-w-5xl mx-auto p-6 px-0 flex flex-col gap-6">
                {error && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium flex items-center gap-2">
                        <XMarkIcon className="w-4 h-4 shrink-0" />
                        {error}
                    </div>
                )}

                {/* ── Type Selector ── */}
                <div className="bg-white rounded-2xl border border-gray-100/80 shadow-[0_4px_12px_rgba(0,0,0,0.02)] p-4 sm:p-5">
                    <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-wider mb-3.5 ml-1">Material Type</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
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
                                    className={`group flex items-center gap-2 p-1.5 pr-3.5 rounded-xl border transition-all duration-200 cursor-pointer select-none text-left min-w-0
                                            ${isActive
                                            ? `${opt.border} ${opt.bg} shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05),0_2px_4px_-1px_rgba(0,0,0,0.03)] z-10`
                                            : "border-slate-100 bg-slate-50/30 hover:bg-slate-50 hover:border-slate-200 text-slate-600"
                                        }`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-200 shrink-0
                                        ${isActive ? `${opt.iconBg} border-transparent shadow-[0_2px_4px_rgba(0,0,0,0.08)]` : "bg-white border-slate-200/60 shadow-xs"}`}>
                                        <opt.icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className={`text-xs font-bold tracking-tight truncate ${isActive ? opt.color : "text-slate-600"}`}>{opt.label}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto flex flex-col gap-6 pb-12">
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
                                className="w-full px-5 py-4 rounded-lg bg-slate-50 border border-slate-200/80 text-sm text-slate-800 placeholder-slate-400 shadow-inner focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all duration-300"
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
                                className={`group relative border-2 border-dashed rounded-3xl p-10 flex flex-col items-center gap-4 cursor-pointer transition-all duration-300
                                    ${dragOver
                                        ? "border-blue-400 bg-blue-50/50 scale-[0.98]"
                                        : file
                                            ? "border-emerald-400 bg-emerald-50/10"
                                            : "border-slate-200 hover:border-blue-400 hover:bg-slate-50 shadow-[0_4px_12px_rgba(0,0,0,0.01)]"
                                    }`}
                            >
                                {file ? (
                                    <div className="animate-in zoom-in duration-300 flex flex-col items-center p-2 w-full">
                                        {preview && (
                                            <div className="mb-4 rounded-2xl overflow-hidden border border-slate-200/80 max-w-[240px] mx-auto shadow-md bg-white p-1.5 transition-transform duration-300 hover:scale-102">
                                                {form.attachmentType === "image" ? (
                                                    <img src={preview} alt="Preview" className="w-full h-auto rounded-xl object-cover max-h-40" />
                                                ) : form.attachmentType === "video" ? (
                                                    <video src={preview} className="w-full h-auto rounded-xl max-h-40" controls />
                                                ) : (
                                                    <div className="p-5 flex flex-col items-center gap-2">
                                                        <DocumentTextIcon className="w-12 h-12 text-blue-500" />
                                                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">PDF READY</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        <p className="text-sm font-bold text-slate-800 max-w-md truncate text-center">{file.name}</p>
                                        <p className="text-[10px] font-bold text-emerald-600 mt-1.5 uppercase tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">{(file.size / 1024 / 1024).toFixed(2)} MB • READY FOR DELIVERY</p>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFile(null);
                                                if (mediaFileRef.current) mediaFileRef.current.value = "";
                                            }}
                                            className="mt-4 px-4 py-1.5 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-500 text-slate-500 text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-xs border border-slate-200/40"
                                        >
                                            <XMarkIcon className="w-3.5 h-3.5 stroke-[2.5px]" /> Clear File
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-3.5">
                                        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-md flex items-center justify-center text-slate-400 group-hover:scale-110 group-hover:text-blue-500 transition-all duration-300">
                                            {form.attachmentType === "image" ? <PlusIcon className="w-6 h-6" /> : form.attachmentType === "video" ? <VideoCameraIcon className="w-6 h-6" /> : <DocumentTextIcon className="w-6 h-6" />}
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-bold text-slate-600">Drag & drop your {form.attachmentType} here</p>
                                            <p className="text-xs text-slate-400 mt-1 font-medium italic">or click to browse local files</p>
                                        </div>
                                    </div>
                                )}
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
                                            const isImage = f.type.startsWith("image/") ||
                                                f.name.toLowerCase().endsWith(".jpg") ||
                                                f.name.toLowerCase().endsWith(".jpeg") ||
                                                f.name.toLowerCase().endsWith(".png") ||
                                                f.name.toLowerCase().endsWith(".webp") ||
                                                f.name.toLowerCase().endsWith(".gif") ||
                                                f.name.toLowerCase().endsWith(".svg") ||
                                                f.name.toLowerCase().endsWith(".bmp");
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
                            <label className="block text-sm font-bold text-slate-700 mb-2.5 ml-1 tracking-tight">
                                Document Source <span className="text-red-500">*</span>
                            </label>
                            <div
                                onClick={() => pdfFileRef.current?.click()}
                                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={e => handleDrop(e, "pdf")}
                                className={`group relative border border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 min-h-[140px]
                                    ${dragOver
                                        ? "border-blue-500 bg-blue-50/40"
                                        : file
                                            ? "border-emerald-500/80 bg-emerald-50/20"
                                            : "border-slate-200 bg-slate-50/20 hover:border-slate-300 hover:bg-slate-50/50"
                                    }`}
                            >
                                {file ? (
                                    <div className="animate-in fade-in duration-200 flex items-center justify-between w-full px-4 gap-4">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                                                <DocumentTextIcon className="w-5 h-5" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-xs font-bold text-slate-800 truncate">{file.name}</p>
                                                <p className="text-[10px] font-medium text-slate-400">{(file.size / 1024 / 1024).toFixed(2)} MB • PDF Document</p>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setFile(null);
                                                if (pdfFileRef.current) pdfFileRef.current.value = "";
                                            }}
                                            className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-500 text-slate-500 text-[11px] font-bold transition-colors border border-slate-200/40 flex items-center gap-1 shrink-0"
                                        >
                                            <XMarkIcon className="w-3.5 h-3.5 stroke-[2.5px]" /> Remove
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-2">
                                        <ArrowUpTrayIcon className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                                        <div className="text-center">
                                            <p className="text-xs font-bold text-slate-600">Click to upload or drag and drop PDF file here</p>
                                            <p className="text-[10px] text-slate-400 mt-0.5 font-medium">Standard PDF format required</p>
                                        </div>
                                    </div>
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

                    {/* Category and Status for Compliance */}
                    {form.type === "compliance" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in slide-in-from-top-2 duration-300">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2.5 ml-1 tracking-tight">
                                    Category <span className="text-slate-400 font-medium">(Optional)</span>
                                </label>
                                <input
                                    type="text"
                                    value={form.catgory}
                                    onChange={e => setForm(f => ({ ...f, catgory: e.target.value }))}
                                    placeholder="Enter or select a category..."
                                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200/80 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all duration-300"
                                />
                                <div className="flex flex-wrap gap-1.5 mt-2.5 ml-1">
                                    {["Official Standards", "Quality", "Health & Safety", "Efficacy", "Regulation", "Performance", "Safety", "Product"].map(cat => (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => setForm(f => ({ ...f, catgory: cat }))}
                                            className={`text-[10px] font-bold px-2.5 py-1 rounded-md border transition-all ${
                                                form.catgory === cat
                                                    ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                                                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:text-slate-700"
                                            }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2.5 ml-1 tracking-tight">
                                    Status <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={form.status}
                                    onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                                    className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200/80 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all duration-300"
                                >
                                    <option value="Current">Current</option>
                                    <option value="Report">Report</option>
                                    <option value="Regulatory">Regulatory</option>
                                    <option value="Performance">Performance</option>
                                    <option value="Safety">Safety</option>
                                    <option value="Product">Product</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    <div>
                        <div className="flex items-center justify-between mb-2 px-1">
                            <label className="text-sm font-bold text-slate-700 tracking-tight">
                                {form.type === "compliance" ? (
                                    <>
                                        Subtitle <span className="text-red-500">*</span>
                                    </>
                                ) : (
                                    <>
                                        Narrative <span className="text-slate-400 font-medium">(Optional)</span>
                                    </>
                                )}
                            </label>
                            <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest transition-colors ${overLimit ? "bg-red-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                                {wordCount} / {maxWords} Words
                            </span>
                        </div>
                        <textarea
                            rows={form.type === "compliance" ? 3 : 5}
                            value={form.description}
                            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                            placeholder={form.type === "compliance" ? "Enter a premium subtitle or description..." : "Tell the story of this material..."}
                            className={`w-full px-5 py-4 rounded-lg bg-slate-50 border transition-all duration-300 shadow-inner resize-none focus:outline-none focus:ring-4 focus:bg-white text-sm font-medium leading-relaxed
                                ${overLimit
                                    ? "border-red-400 focus:ring-red-100 placeholder-red-300"
                                    : "border-slate-200/80 focus:ring-blue-100 focus:border-blue-400 placeholder-slate-400"}`}
                        />
                        {overLimit && (
                            <p className="text-[10px] text-red-500 mt-2 font-bold ml-4 animate-pulse">
                                {form.type === "compliance" ? "SUBTITLE LIMIT REACHED. PLEASE CONDENSE YOUR CONTENT TO 20 WORDS." : "NARRATIVE LIMIT REACHED. PLEASE CONDENSE YOUR CONTENT."}
                            </p>
                        )}
                    </div>

                    {/* Tags */}
                    {form.type !== "compliance" && (
                        <div>
                            <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 ml-1 tracking-tight">
                                <TagIcon className="w-4 h-4 text-blue-500" /> Keywords <span className="text-slate-400 font-medium">(Metadata)</span>
                            </label>
                            <input
                                type="text"
                                value={form.tags}
                                onChange={e => setForm(f => ({ ...f, tags: e.target.value }))}
                                placeholder="marketing, growth, campaign"
                                className="w-full px-5 py-4 rounded-lg bg-slate-50 border border-slate-200/80 text-sm font-medium text-slate-800 placeholder-slate-400 shadow-inner focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 focus:bg-white transition-all duration-300"
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
                    )}
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
                                if (form.type === "compliance" && !form.description) {
                                    setError("Subtitle is required.");
                                    return;
                                }
                                if (overLimit) {
                                    setError(form.type === "compliance" ? "Subtitle cannot exceed 20 words." : "Description cannot exceed 100 words.");
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
