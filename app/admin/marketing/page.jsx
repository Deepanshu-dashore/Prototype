"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import {
    PlusIcon,
    TrashIcon,
    PencilSquareIcon,
    XMarkIcon,
    PlayIcon,
    DocumentTextIcon,
    NewspaperIcon,
    BookOpenIcon,
    VideoCameraIcon,
    MegaphoneIcon,
    EyeIcon,
    EyeSlashIcon,
    LinkIcon,
} from "@heroicons/react/24/outline";
import { TableEmptyState, TableLoadingSkeleton } from "@/src/components/ui/TableState";
import ConfirmationModal from "@/src/components/ui/ConfirmationModal";

// ─── Constants ────────────────────────────────────────────────────────────────
const CATEGORY_TABS = [
    // {
    //     key: "all", label: "All", icon: NewspaperIcon,
    //     color: "text-gray-700", bg: "bg-gray-100", border: "border-gray-200",
    //     activeBg: "bg-gray-900", activeText: "text-white",
    // },
    {
        key: "youtube", label: "YouTube", icon: VideoCameraIcon,
        color: "text-red-500", bg: "bg-red-50", border: "border-red-200",
        activeBg: "bg-red-500", activeText: "text-white",
    },
    {
        key: "social_post", label: "Social Post", icon: MegaphoneIcon,
        color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200",
        activeBg: "bg-blue-500", activeText: "text-white",
    },
    {
        key: "case_study", label: "Case Study", icon: DocumentTextIcon,
        color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200",
        activeBg: "bg-emerald-500", activeText: "text-white",
    },
    {
        key: "playbook", label: "Playbook", icon: BookOpenIcon,
        color: "text-purple-500", bg: "bg-purple-50", border: "border-purple-200",
        activeBg: "bg-purple-500", activeText: "text-white",
    },
];

const STAT_CARDS = [
    {
        key: "youtube", label: "YouTube Videos", icon: VideoCameraIcon,
        color: "text-red-500", ring: "ring-red-400", bg: "bg-red-50",
    },
    {
        key: "social_post", label: "Social Posts", icon: MegaphoneIcon,
        color: "text-blue-500", ring: "ring-blue-400", bg: "bg-blue-50",
    },
    {
        key: "case_study", label: "Case Studies", icon: DocumentTextIcon,
        color: "text-emerald-500", ring: "ring-emerald-400", bg: "bg-emerald-50",
    },
    {
        key: "playbook", label: "Playbooks", icon: BookOpenIcon,
        color: "text-purple-500", ring: "ring-purple-400", bg: "bg-purple-50",
    },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getYouTubeId(url) {
    if (!url) return null;
    const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : null;
}
function getYouTubeThumbnail(url) {
    const id = getYouTubeId(url);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}
function getYouTubeEmbed(url) {
    const id = getYouTubeId(url);
    return id ? `https://www.youtube.com/embed/${id}` : null;
}
function formatDate(d) {
    if (!d) return "—";
    return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

// ─── Status Badge ─────────────────────────────────────────────────────────────
function ActiveBadge({ isActive }) {
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border
            ${isActive
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-gray-100 text-gray-500 border-gray-200"
            }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-gray-400"}`} />
            {isActive ? "Visible" : "Hidden"}
        </span>
    );
}

// ─── YouTube Card ─────────────────────────────────────────────────────────────
function YouTubeCard({ asset, onEdit, onDelete, onToggleVisibility }) {
    const [playing, setPlaying] = useState(false);
    const thumb = getYouTubeThumbnail(asset.url);
    const embed = getYouTubeEmbed(asset.url);

    return (
        <div className={`bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all duration-200
            ${asset.isActive ? "border-gray-100" : "border-gray-200 opacity-70"}`}>
            <div className="relative w-full aspect-video bg-gray-900">
                {playing && embed ? (
                    <iframe src={`${embed}?autoplay=1`} className="w-full h-45" allow="autoplay; encrypted-media" allowFullScreen title={asset.title} />
                ) : (
                    <>
                        {thumb
                            ? <img src={thumb} alt={asset.title} className="w-full h-45 object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                            : <div className="w-full h-45 flex items-center justify-center bg-linear-to-br from-red-900/30 to-gray-900"><VideoCameraIcon className="w-12 h-12 text-white/30" /></div>
                        }
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                        <button onClick={() => setPlaying(true)} className="absolute inset-0 flex items-center justify-center group/play">
                            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center group-hover/play:scale-110 group-hover/play:bg-white/30 transition-all duration-200 shadow-lg">
                                <PlayIcon className="w-7 h-7 text-white fill-white translate-x-0.5" />
                            </div>
                        </button>
                        {/* Status badge on thumb */}
                        <div className="absolute top-2 left-2"><ActiveBadge isActive={asset.isActive} /></div>
                    </>
                )}
            </div>
            <div className="p-3 flex-1 flex flex-col gap-1.5">
                <span className="text-[12.25px] text-gray-400">{formatDate(asset.createdAt)}</span>
                <h3 className="text-base font-semibold text-gray-800 leading-snug line-clamp-2">{asset.title}</h3>
                {asset.description && <p className="text-sm text-gray-500 line-clamp-1">{asset.description}</p>}
                {asset.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-auto pt-1">
                        {asset.tags.slice(0, 3).map((t, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-red-50 text-red-600 font-medium border border-red-100">#{t.trim()}</span>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex items-center justify-end gap-2 px-3 py-2.5 border-t border-gray-50 bg-gray-50/50">
                <div className="flex items-center gap-2">
                    <button onClick={() => onToggleVisibility(asset)} className={`p-1.5 rounded-lg transition-colors border ${asset.isActive ? "hover:bg-amber-50 bg-amber-100 text-gray-700 hover:text-amber-600" : "hover:bg-emerald-50 bg-emerald-100 text-gray-700 hover:text-emerald-600"}`} title={asset.isActive ? "Hide" : "Show"}>
                        {asset.isActive ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                    </button>
                    <button onClick={() => onEdit(asset)} className="p-1.5 rounded-lg hover:bg-blue-50 bg-blue-100 border text-gray-700 hover:text-blue-600 transition-colors"><PencilSquareIcon className="w-4 h-4" /></button>
                    <button onClick={() => onDelete(asset)} className="p-1.5 rounded-lg hover:bg-red-50 bg-red-100 border text-gray-700 hover:text-red-600 transition-colors"><TrashIcon className="w-4 h-4" /></button>
                </div>
            </div>
        </div>
    );
}

// ─── PDF Preview Card ─────────────────────────────────────────────────────────
function PDFCard({ asset, onEdit, onDelete, onToggleVisibility, accentColor = "purple" }) {
    const [previewing, setPreviewing] = useState(false);
    const colorMap = {
        purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", badge: "bg-purple-100" },
        emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", badge: "bg-emerald-100" },
    };
    const c = colorMap[accentColor] || colorMap.purple;

    return (
        <div className={`bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all duration-200 ${asset.isActive ? "border-gray-100" : "border-gray-200 opacity-70"}`}>
            <div className={`relative w-full ${previewing ? "h-56" : "h-44"} ${c.bg} flex items-center justify-center transition-all duration-300`}>
                {previewing && asset.url ? (
                    <>
                        <iframe src={asset.url} className="w-full h-full border-0" title={asset.title} />
                        <button onClick={() => setPreviewing(false)} className="absolute top-2 right-2 p-1 rounded-full bg-white shadow text-gray-500 hover:text-red-500"><XMarkIcon className="w-4 h-4" /></button>
                    </>
                ) : (
                    <div className="flex flex-col items-center gap-3">
                        <div className="relative">
                            <div className={`w-14 h-18 rounded-lg ${c.bg} border-2 ${c.border} flex items-center justify-center shadow-md p-2`}>
                                <div className="flex flex-col items-center gap-1">
                                    <div className={`w-7 h-1 rounded ${c.badge}`} />
                                    <div className={`w-7 h-1 rounded ${c.badge}`} />
                                    <div className={`w-4 h-1 rounded ${c.badge}`} />
                                    <span className={`text-[9px] font-bold ${c.text} mt-1`}>PDF</span>
                                </div>
                            </div>
                            <button onClick={() => setPreviewing(true)} className={`absolute -bottom-3 -right-3 w-8 h-8 rounded-full ${c.badge} border-2 border-white shadow-md flex items-center justify-center hover:scale-110 transition-transform`} title="Preview PDF">
                                <PlayIcon className={`w-3.5 h-3.5 ${c.text} fill-current translate-x-0.5`} />
                            </button>
                        </div>
                        <p className={`text-[11px] font-medium ${c.text} mt-2`}>Click ▶ to Preview</p>
                    </div>
                )}
                <div className="absolute top-2 left-2"><ActiveBadge isActive={asset.isActive} /></div>
            </div>
            <div className="p-3 flex-1 flex flex-col gap-1.5">
                <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">{asset.title}</h3>
                {asset.description && <p className="text-xs text-gray-500 line-clamp-1">{asset.description}</p>}
                {asset.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-auto pt-1">
                        {asset.tags.slice(0, 3).map((t, i) => (
                            <span key={i} className={`text-[10px] px-2 py-0.5 rounded-full ${c.bg} ${c.text} font-medium border ${c.border}`}>#{t.trim()}</span>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex items-center justify-between px-3 py-2.5 border-t border-gray-50 bg-gray-50/50">
                <span className="text-[10px] text-gray-400">{formatDate(asset.createdAt)}</span>
                <div className="flex items-center gap-1">
                    <button onClick={() => onToggleVisibility(asset)} className={`p-1.5 rounded-lg transition-colors ${asset.isActive ? "hover:bg-amber-50 text-gray-400 hover:text-amber-600" : "hover:bg-emerald-50 text-gray-400 hover:text-emerald-600"}`} title={asset.isActive ? "Hide" : "Show"}>
                        {asset.isActive ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                    </button>
                    <button onClick={() => onEdit(asset)} className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"><PencilSquareIcon className="w-4 h-4" /></button>
                    <button onClick={() => onDelete(asset)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"><TrashIcon className="w-4 h-4" /></button>
                </div>
            </div>
        </div>
    );
}

// ─── Social Post Table ─────────────────────────────────────────────────────────
function SocialPostTable({ assets, loading, onEdit, onDelete, onToggleVisibility }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 bg-gray-50/60">
                            <th className="px-5 py-3 text-left">#</th>
                            <th className="px-5 py-3 text-left">Title</th>
                            <th className="px-5 py-3 text-left">Link / URL</th>
                            <th className="px-5 py-3 text-left">Tags</th>
                            <th className="px-5 py-3 text-left">Status</th>
                            <th className="px-5 py-3 text-left">Date</th>
                            <th className="px-5 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? <TableLoadingSkeleton columns={7} rows={4} /> :
                            assets.length === 0 ? <TableEmptyState colSpan={7} title="No Social Posts" message="Add your first social post material." /> :
                                assets.map((a, i) => (
                                    <tr key={a._id} className={`hover:bg-gray-50/60 transition-colors ${!a.isActive ? "opacity-60" : ""}`}>
                                        <td className="px-5 py-3.5 text-xs text-gray-400 font-mono">{i + 1}</td>
                                        <td className="px-5 py-3.5">
                                            <p className="text-sm font-semibold text-gray-800 max-w-[200px] truncate">{a.title}</p>
                                            {a.description && <p className="text-xs text-gray-400 truncate max-w-[200px]">{a.description}</p>}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            {a.url ? (
                                                <a href={a.url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-blue-600 hover:underline text-xs font-medium truncate max-w-[200px]">
                                                    <LinkIcon className="w-3.5 h-3.5 shrink-0" />
                                                    {a.url.length > 40 ? a.url.slice(0, 40) + "…" : a.url}
                                                </a>
                                            ) : <span className="text-xs text-gray-400">—</span>}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex flex-wrap gap-1">
                                                {(a.tags || []).slice(0, 3).map((t, j) => (
                                                    <span key={j} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 font-medium">#{t.trim()}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5"><ActiveBadge isActive={a.isActive} /></td>
                                        <td className="px-5 py-3.5 text-xs text-gray-500 whitespace-nowrap">{formatDate(a.createdAt)}</td>
                                        <td className="px-5 py-3.5 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button onClick={() => onToggleVisibility(a)} className={`p-1.5 rounded-lg transition-colors ${a.isActive ? "hover:bg-amber-50 text-gray-400 hover:text-amber-600" : "hover:bg-emerald-50 text-gray-400 hover:text-emerald-600"}`} title={a.isActive ? "Hide" : "Show"}>
                                                    {a.isActive ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                                                </button>
                                                <button onClick={() => onEdit(a)} className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"><PencilSquareIcon className="w-4 h-4" /></button>
                                                <button onClick={() => onDelete(a)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"><TrashIcon className="w-4 h-4" /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ─── PDF Table ─────────────────────────────────────────────────────────────────
function PDFTable({ assets, loading, onEdit, onDelete, onToggleVisibility, accentColor = "emerald" }) {
    const [previewId, setPreviewId] = useState(null);
    const colorMap = {
        emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200" },
        purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200" },
    };
    const c = colorMap[accentColor] || colorMap.emerald;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 bg-gray-50/60">
                            <th className="px-5 py-3 text-left">#</th>
                            <th className="px-5 py-3 text-left">Title</th>
                            <th className="px-5 py-3 text-left">Description</th>
                            <th className="px-5 py-3 text-left">Tags</th>
                            <th className="px-5 py-3 text-left">Preview</th>
                            <th className="px-5 py-3 text-left">Status</th>
                            <th className="px-5 py-3 text-left">Date</th>
                            <th className="px-5 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? <TableLoadingSkeleton columns={8} rows={4} /> :
                            assets.length === 0 ? <TableEmptyState colSpan={8} title="No Files Found" message="Upload your first document." /> :
                                assets.map((a, i) => (
                                    <>
                                        <tr key={a._id} className={`hover:bg-gray-50/60 transition-colors ${!a.isActive ? "opacity-60" : ""}`}>
                                            <td className="px-5 py-3.5 text-xs text-gray-400 font-mono">{i + 1}</td>
                                            <td className="px-5 py-3.5"><p className="text-sm font-semibold text-gray-800 max-w-[180px] truncate">{a.title}</p></td>
                                            <td className="px-5 py-3.5 text-xs text-gray-500 max-w-[180px]"><p className="truncate">{a.description || "—"}</p></td>
                                            <td className="px-5 py-3.5">
                                                <div className="flex flex-wrap gap-1">
                                                    {(a.tags || []).slice(0, 2).map((t, j) => (
                                                        <span key={j} className={`text-[10px] px-2 py-0.5 rounded-full ${c.bg} ${c.text} border ${c.border} font-medium`}>#{t.trim()}</span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-5 py-3.5">
                                                {a.url ? (
                                                    <button onClick={() => setPreviewId(previewId === a._id ? null : a._id)} className={`flex items-center gap-1.5 text-xs font-medium ${c.text} hover:underline`}>
                                                        <PlayIcon className="w-3.5 h-3.5 fill-current" />
                                                        {previewId === a._id ? "Close" : "Preview"}
                                                    </button>
                                                ) : <span className="text-xs text-gray-300">No file</span>}
                                            </td>
                                            <td className="px-5 py-3.5"><ActiveBadge isActive={a.isActive} /></td>
                                            <td className="px-5 py-3.5 text-xs text-gray-500 whitespace-nowrap">{formatDate(a.createdAt)}</td>
                                            <td className="px-5 py-3.5 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button onClick={() => onToggleVisibility(a)} className={`p-1.5 rounded-lg transition-colors ${a.isActive ? "hover:bg-amber-50 text-gray-400 hover:text-amber-600" : "hover:bg-emerald-50 text-gray-400 hover:text-emerald-600"}`} title={a.isActive ? "Hide" : "Show"}>
                                                        {a.isActive ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                                                    </button>
                                                    <button onClick={() => onEdit(a)} className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"><PencilSquareIcon className="w-4 h-4" /></button>
                                                    <button onClick={() => onDelete(a)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"><TrashIcon className="w-4 h-4" /></button>
                                                </div>
                                            </td>
                                        </tr>
                                        {previewId === a._id && a.url && (
                                            <tr key={`${a._id}-preview`}>
                                                <td colSpan={8} className="px-5 pb-4">
                                                    <div className="rounded-xl overflow-hidden border border-gray-200 shadow-inner">
                                                        <iframe src={a.url} className="w-full h-80" title={a.title} />
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function AdminMarketingPage() {
    const [categoryTab, setCategoryTab] = useState("youtube");
    const [assets, setAssets] = useState([]);
    const [counts, setCounts] = useState({ youtube: 0, social_post: 0, case_study: 0, playbook: 0 });
    const [loading, setLoading] = useState(true);

    // Modal states
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [visibilityTarget, setVisibilityTarget] = useState(null);
    const [togglingVisibility, setTogglingVisibility] = useState(false);

    const fetchAssets = async () => {
        try {
            setLoading(true);
            const res = await axios.get("/api/marketing");
            if (res.data?.success) {
                const { data, totalYoutube, totalSocialPost, totalCaseStudy, totalPlaybook } = res.data.data;
                setAssets(data || []);
                setCounts({
                    youtube: totalYoutube || 0,
                    social_post: totalSocialPost || 0,
                    case_study: totalCaseStudy || 0,
                    playbook: totalPlaybook || 0,
                });
            }
        } catch (e) {
            console.error("Fetch error:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchAssets(); }, []);

    const handleEdit = (asset) => {
        // Navigate to separate edit page
        window.location.href = `/admin/marketing/edit/${asset._id}`;
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        setDeleting(true);
        try {
            await axios.delete(`/api/marketing/${deleteTarget._id}`);
            await fetchAssets();
        } catch (e) {
            console.error("Delete error:", e);
        } finally {
            setDeleting(false);
            setDeleteTarget(null);
        }
    };

    const handleToggleVisibility = async () => {
        if (!visibilityTarget) return;
        setTogglingVisibility(true);
        try {
            await axios.put(`/api/marketing/status/${visibilityTarget._id}`);
            await fetchAssets();
        } catch (e) {
            console.error("Toggle error:", e);
        } finally {
            setTogglingVisibility(false);
            setVisibilityTarget(null);
        }
    };

    const filteredAssets = categoryTab === "all" ? assets : assets.filter(a => a.type === categoryTab);
    const totalAll = counts.youtube + counts.social_post + counts.case_study + counts.playbook;

    const tabCounts = {
        all: assets.length,
        youtube: assets.filter(a => a.type === "youtube").length,
        social_post: assets.filter(a => a.type === "social_post").length,
        case_study: assets.filter(a => a.type === "case_study").length,
        playbook: assets.filter(a => a.type === "playbook").length,
    };

    return (
        <div className="min-h-screen font-sans">
            {/* ── Top Bar ── */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-10">
                <div>
                    <h1 className="text-lg font-bold text-gray-900 tracking-tight">Marketing Materials</h1>
                    <p className="text-xs text-gray-400 mt-0.5">Manage all your marketing assets in one place</p>
                </div>
                <Link
                    href="/admin/marketing/add"
                    className="flex items-center gap-2 bg-linear-to-r from-indigo-600 to-blue-600 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:opacity-90 transition-all"
                >
                    <PlusIcon className="w-4 h-4" />
                    Add Material
                </Link>
            </div>

            <div className="p-6 flex flex-col">

                {/* ── Stats Cards Row (reference style: horizontal scroll, icon + label + count) ── */}
                <div className="flex items-stretch gap-3 overflow-x-auto pb-1">
                    {/* Total card */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 px-5 py-4 min-w-[180px]">
                        <div className="w-11 h-11 rounded-full ring-2 ring-gray-300 ring-offset-2 bg-gray-50 flex items-center justify-center shrink-0">
                            <NewspaperIcon className="w-5 h-5 text-gray-500" />
                        </div>
                        <div>
                            <p className="text-[11px] font-semibold text-gray-500">Total</p>
                            <p className="text-[10px] text-gray-400">{totalAll} materials</p>
                            <p className="text-xl font-bold text-gray-900 mt-0.5">{assets.length}</p>
                        </div>
                    </div>

                    {STAT_CARDS.map(sc => (
                        <div key={sc.key} className="bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 px-5 py-4 min-w-[180px]">
                            <div className={`w-11 h-11 rounded-full ring-2 ${sc.ring} ring-offset-2 ${sc.bg} flex items-center justify-center shrink-0`}>
                                <sc.icon className={`w-5 h-5 ${sc.color}`} />
                            </div>
                            <div>
                                <p className="text-[11px] font-semibold text-gray-500">{sc.label}</p>
                                <p className="text-[10px] text-gray-400">{counts[sc.key]} materials</p>
                                <p className="text-xl font-bold text-gray-900 mt-0.5">{counts[sc.key]}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Tab Bar (reference: text tabs with dark pill count badges) ── */}
                <div className="flex items-center gap-5 border-b mt-3 border-gray-100 bg-white rounded-t-2xl px-5 pb-3">
                    {CATEGORY_TABS.map(ct => {
                        const isActive = categoryTab === ct.key;
                        return (
                            <button
                                key={ct.key}
                                onClick={() => setCategoryTab(ct.key)}
                                className={`flex items-center gap-2 px-0.5 py-3 text-sm tracking-wide font-medium relative transition-all
                                    ${isActive
                                        ? "text-slate-800 after:absolute after:bottom-0 after:inset-x-0 after:h-0.5 after:rounded-full after:bg-gray-700"
                                        : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {ct.label}
                                <span className={`text-xs px-2.5 py-1 rounded-md font-bold min-w-[20px] text-center
                                    ${isActive
                                        ? "bg-gray-900 text-white"
                                        : ct.key === "youtube" ? "bg-red-100 text-red-600"
                                            : ct.key === "social_post" ? "bg-blue-100 text-blue-600"
                                                : ct.key === "case_study" ? "bg-emerald-100 text-emerald-600"
                                                    : ct.key === "playbook" ? "bg-purple-100 text-purple-600"
                                                        : "bg-gray-100 text-gray-500"
                                    }`}>
                                    {tabCounts[ct.key]}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* ── Content Area ── */}
                {(categoryTab === "all" || categoryTab === "youtube") && (
                    <div>
                        {categoryTab === "all" && (
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-1 h-4 rounded-full bg-red-500" />
                                <h2 className="text-xs font-bold text-gray-600 uppercase tracking-wider">YouTube Videos</h2>
                            </div>
                        )}
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {[...Array(4)].map((_, i) => <div key={i} className="bg-gray-100 rounded-2xl aspect-video animate-pulse" />)}
                            </div>
                        ) : (categoryTab === "all" ? assets.filter(a => a.type === "youtube") : filteredAssets).length === 0 ? (
                            categoryTab === "youtube" && <div className="flex flex-col items-center justify-center py-16 text-center">
                                <VideoCameraIcon className="w-12 h-12 text-gray-200 mb-3" />
                                <h3 className="text-base font-bold text-gray-400">No YouTube Videos</h3>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-3 pb-5 rounded-b-2xl px-3 bg-white">
                                {(categoryTab === "all" ? assets.filter(a => a.type === "youtube") : filteredAssets).map(a => (
                                    <YouTubeCard key={a._id} asset={a}
                                        onEdit={handleEdit}
                                        onDelete={setDeleteTarget}
                                        onToggleVisibility={setVisibilityTarget}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {(categoryTab === "all" || categoryTab === "social_post") && (
                    <div>
                        {categoryTab === "all" && (
                            <div className="flex items-center gap-2 mb-3 mt-2">
                                <div className="w-1 h-4 rounded-full bg-blue-500" />
                                <h2 className="text-xs font-bold text-gray-600 uppercase tracking-wider">Social Posts</h2>
                            </div>
                        )}
                        <SocialPostTable
                            assets={categoryTab === "all" ? assets.filter(a => a.type === "social_post") : filteredAssets}
                            loading={loading}
                            onEdit={handleEdit}
                            onDelete={setDeleteTarget}
                            onToggleVisibility={setVisibilityTarget}
                        />
                    </div>
                )}

                {(categoryTab === "all" || categoryTab === "case_study") && (
                    <div>
                        {categoryTab === "all" && (
                            <div className="flex items-center gap-2 mb-3 mt-2">
                                <div className="w-1 h-4 rounded-full bg-emerald-500" />
                                <h2 className="text-xs font-bold text-gray-600 uppercase tracking-wider">Case Studies</h2>
                            </div>
                        )}
                        <div className="flex flex-col gap-4">
                            <PDFTable
                                assets={categoryTab === "all" ? assets.filter(a => a.type === "case_study") : filteredAssets}
                                loading={loading}
                                onEdit={handleEdit}
                                onDelete={setDeleteTarget}
                                onToggleVisibility={setVisibilityTarget}
                                accentColor="emerald"
                            />
                            {!loading && (categoryTab === "all" ? assets.filter(a => a.type === "case_study") : filteredAssets).length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {(categoryTab === "all" ? assets.filter(a => a.type === "case_study") : filteredAssets).map(a => (
                                        <PDFCard key={a._id} asset={a} onEdit={handleEdit} onDelete={setDeleteTarget} onToggleVisibility={setVisibilityTarget} accentColor="emerald" />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {(categoryTab === "all" || categoryTab === "playbook") && (
                    <div>
                        {categoryTab === "all" && (
                            <div className="flex items-center gap-2 mb-3 mt-2">
                                <div className="w-1 h-4 rounded-full bg-purple-500" />
                                <h2 className="text-xs font-bold text-gray-600 uppercase tracking-wider">Playbooks</h2>
                            </div>
                        )}
                        <div className="flex flex-col gap-4">
                            <PDFTable
                                assets={categoryTab === "all" ? assets.filter(a => a.type === "playbook") : filteredAssets}
                                loading={loading}
                                onEdit={handleEdit}
                                onDelete={setDeleteTarget}
                                onToggleVisibility={setVisibilityTarget}
                                accentColor="purple"
                            />
                            {!loading && (categoryTab === "all" ? assets.filter(a => a.type === "playbook") : filteredAssets).length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {(categoryTab === "all" ? assets.filter(a => a.type === "playbook") : filteredAssets).map(a => (
                                        <PDFCard key={a._id} asset={a} onEdit={handleEdit} onDelete={setDeleteTarget} onToggleVisibility={setVisibilityTarget} accentColor="purple" />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* ── Delete Confirmation ── */}
            <ConfirmationModal
                isOpen={!!deleteTarget}
                onClose={() => setDeleteTarget(null)}
                onConfirm={handleDelete}
                title="Delete Material"
                message={`Are you sure you want to delete "${deleteTarget?.title}"? This action cannot be undone.`}
                type="delete"
                confirmText="Delete"
                isLoading={deleting}
            />

            {/* ── Visibility Toggle Confirmation ── */}
            <ConfirmationModal
                isOpen={!!visibilityTarget}
                onClose={() => setVisibilityTarget(null)}
                onConfirm={handleToggleVisibility}
                title={visibilityTarget?.isActive ? "Hide Material" : "Show Material"}
                message={visibilityTarget?.isActive
                    ? `"${visibilityTarget?.title}" will be hidden from distributors. You can re-enable it anytime.`
                    : `"${visibilityTarget?.title}" will be visible to distributors again.`
                }
                type="save"
                confirmText={visibilityTarget?.isActive ? "Hide It" : "Make Visible"}
                isLoading={togglingVisibility}
                icon={({ className }) => visibilityTarget?.isActive
                    ? <EyeSlashIcon className={className} />
                    : <EyeIcon className={className} />
                }
            />
        </div>
    );
}
