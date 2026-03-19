"use client";

import { useState, useEffect, Fragment } from "react";
import axios from "@/app/lib/utils/axiosConfig";
import { useRouter, useParams } from "next/navigation";
import {
    PlayIcon,
    LinkIcon,
    VideoCameraIcon,
    MegaphoneIcon,
    DocumentTextIcon,
    BookOpenIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { TableEmptyState, TableLoadingSkeleton } from "@/src/components/ui/TableState";

// ─── Helpers ─────────────────────────────────────────────────────────────────
const CATEGORY_TABS = [
    { key: "youtube", label: "Youtube Links", icon: VideoCameraIcon, color: "text-red-500", bg: "bg-red-50", iconBg: "bg-red-500", border: "border-red-200", activeBg: "bg-red-500" },
    { key: "social_post", label: "Social Media Creatives", icon: MegaphoneIcon, color: "text-blue-500", bg: "bg-blue-50", iconBg: "bg-blue-500", border: "border-blue-200", activeBg: "bg-blue-500" },
    { key: "case_study", label: "Case Studies", icon: DocumentTextIcon, color: "text-emerald-500", bg: "bg-emerald-50", iconBg: "bg-emerald-500", border: "border-emerald-200", activeBg: "bg-emerald-500" },
    { key: "playbook", label: "Strategic Marketing Documents", icon: BookOpenIcon, color: "text-purple-500", bg: "bg-purple-50", iconBg: "bg-purple-500", border: "border-purple-200", activeBg: "bg-purple-500" },
];

function getYouTubeId(url) {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
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

// ─── YouTube Card ─────────────────────────────────────────────────────────────
function YouTubeCard({ asset }) {
    const [playing, setPlaying] = useState(false);
    const thumb = getYouTubeThumbnail(asset.url);
    const embed = getYouTubeEmbed(asset.url);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all duration-200">
            <div className="relative w-full aspect-video bg-gray-900">
                {playing && embed ? (
                    <iframe
                        src={`${embed}?autoplay=1`}
                        className="w-full h-full"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        title={asset.title}
                    />
                ) : (
                    <>
                        {thumb ? (
                            <img src={thumb} alt={asset.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-red-900/30 to-gray-900">
                                <VideoCameraIcon className="w-12 h-12 text-white/30" />
                            </div>
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent" />
                        <button
                            onClick={() => setPlaying(true)}
                            className="absolute inset-0 flex items-center justify-center group/play"
                        >
                            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/50 flex items-center justify-center group-hover/play:scale-110 group-hover/play:bg-white/30 transition-all duration-200 shadow-lg">
                                <PlayIcon className="w-7 h-7 text-white fill-white translate-x-0.5" />
                            </div>
                        </button>
                    </>
                )}
            </div>
            <div className="p-4 flex-1 flex flex-col gap-2">
                <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">{asset.title}</h3>
                {asset.description && <p className="text-xs text-gray-500 line-clamp-2">{asset.description}</p>}
                {asset.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-auto pt-1">
                        {asset.tags.slice(0, 3).map((t, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded-full bg-red-50 text-red-600 font-medium border border-red-100">#{t.trim()}</span>
                        ))}
                    </div>
                )}
            </div>
            <div className="px-4 py-2.5 border-t border-gray-50 bg-gray-50/50">
                <span className="text-[10px] text-gray-400">{formatDate(asset.createdAt)}</span>
            </div>
        </div>
    );
}

// ─── Social Post Row Table ─────────────────────────────────────────────────────
function SocialPostTable({ assets, loading }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 bg-gray-50/60 transition-colors whitespace-nowrap">
                            <th className="px-5 py-3 text-left w-12">#</th>
                            <th className="px-5 py-3 text-left min-w-[200px]">Title</th>
                            <th className="px-5 py-3 text-left min-w-[250px]">Description</th>
                            <th className="px-5 py-3 text-left min-w-[150px]">Link</th>
                            <th className="px-5 py-3 text-left min-w-[120px]">Tags</th>
                            <th className="px-5 py-3 text-left min-w-[100px]">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? (
                            <TableLoadingSkeleton columns={6} rows={5} />
                        ) : assets.length === 0 ? (
                            <TableEmptyState colSpan={6} title="No Social Posts" message="No social post materials available yet." />
                        ) : (
                            assets.map((a, i) => (
                                <tr key={a._id} className="hover:bg-gray-50/60 transition-colors">
                                    <td className="px-5 py-3.5 text-xs text-gray-400 font-mono">{i + 1}</td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                                                <MegaphoneIcon className="w-4 h-4 text-blue-500" />
                                            </div>
                                            {a.url ? (
                                                <a href={a.url} target="_blank" rel="noreferrer" className="text-sm font-semibold text-gray-800 max-w-[180px] truncate hover:text-blue-600 hover:underline transition-colors">
                                                    {a.title}
                                                </a>
                                            ) : (
                                                <p className="text-sm font-semibold text-gray-800 max-w-[180px] truncate">{a.title}</p>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 text-xs text-gray-500 max-w-[200px]">
                                        <p className="truncate">{a.description || "—"}</p>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        {a.url ? (
                                            <a href={a.url} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-blue-600 hover:underline text-xs font-medium truncate max-w-[180px]">
                                                <LinkIcon className="w-3.5 h-3.5 shrink-0" />
                                                {a.url.length > 35 ? a.url.slice(0, 35) + "…" : a.url}
                                            </a>
                                        ) : (
                                            <span className="text-xs text-gray-400">—</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <ul className="flex flex-col gap-0.5 list-disc list-inside">
                                            {(a.tags || []).slice(0, 3).map((t, j) => (
                                                <li key={j} className="text-[11px] text-blue-600 font-medium">
                                                    <span className="text-blue-600">#{t.trim()}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="px-5 py-3.5 text-xs text-gray-500 whitespace-nowrap">{formatDate(a.createdAt)}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ─── PDF Table (Case Study / Playbook) ────────────────────────────────────────
function PDFTable({ assets, loading, accentColor = "emerald" }) {
    const [previewId, setPreviewId] = useState(null);
    const colorMap = {
        emerald: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-200", icon: DocumentTextIcon },
        purple: { bg: "bg-purple-50", text: "text-purple-600", border: "border-purple-200", icon: BookOpenIcon },
    };
    const c = colorMap[accentColor] || colorMap.emerald;
    const IconComp = c.icon;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 bg-gray-50/60 transition-colors whitespace-nowrap">
                            <th className="px-5 py-3 text-left w-12">#</th>
                            <th className="px-5 py-3 text-left min-w-[200px]">Title</th>
                            <th className="px-5 py-3 text-left min-w-[250px]">Description</th>
                            <th className="px-5 py-3 text-left min-w-[120px]">Tags</th>
                            <th className="px-5 py-3 text-left min-w-[120px]">PDF Preview</th>
                            <th className="px-5 py-3 text-left min-w-[100px]">Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? (
                            <TableLoadingSkeleton columns={6} rows={5} />
                        ) : assets.length === 0 ? (
                            <TableEmptyState colSpan={6} title="No Files Available" message="No documents have been added yet." />
                        ) : (
                            assets.map((a, i) => (
                                <Fragment key={a._id}>
                                    <tr className="hover:bg-gray-50/60 transition-colors">
                                        <td className="px-5 py-3.5 text-xs text-gray-400 font-mono">{i + 1}</td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center shrink-0`}>
                                                    <IconComp className={`w-4 h-4 ${c.text}`} />
                                                </div>
                                                {a.url ? (
                                                    <a href={a.url} target="_blank" rel="noreferrer" className="text-sm font-semibold text-gray-800 max-w-[180px] truncate hover:text-emerald-600 hover:underline transition-colors">
                                                        {a.title}
                                                    </a>
                                                ) : (
                                                    <p className="text-sm font-semibold text-gray-800 max-w-[180px] truncate">{a.title}</p>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-xs text-gray-500 max-w-[200px]">
                                            <p className="truncate">{a.description || "—"}</p>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <div className="flex flex-wrap gap-1">
                                                {(a.tags || []).slice(0, 2).map((t, j) => (
                                                    <span key={j} className={`text-[10px] px-2 py-0.5 rounded-full ${c.bg} ${c.text} border ${c.border} font-medium`}>
                                                        #{t.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            {a.url ? (
                                                <button
                                                    onClick={() => setPreviewId(previewId === a._id ? null : a._id)}
                                                    className={`flex items-center gap-1.5 text-xs font-semibold ${c.text} hover:underline`}
                                                >
                                                    <PlayIcon className="w-3.5 h-3.5 fill-current" />
                                                    {previewId === a._id ? "Close Preview" : "View PDF"}
                                                </button>
                                            ) : (
                                                <span className="text-xs text-gray-300">Not available</span>
                                            )}
                                        </td>
                                        <td className="px-5 py-3.5 text-xs text-gray-500 whitespace-nowrap">{formatDate(a.createdAt)}</td>
                                    </tr>
                                    {previewId === a._id && a.url && (
                                        <tr>
                                            <td colSpan={6} className="px-5 pb-5">
                                                <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-inner relative">
                                                    <div className={`flex items-center justify-between px-4 py-2 ${c.bg} border-b ${c.border}`}>
                                                        <span className={`text-xs font-semibold ${c.text}`}>{a.title}</span>
                                                        <button
                                                            onClick={() => setPreviewId(null)}
                                                            className={`p-1 rounded-lg hover:bg-white/50 ${c.text}`}
                                                        >
                                                            <XMarkIcon className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <iframe src={a.url} className="w-full h-96" title={a.title} />
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </Fragment>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function DistributorMarketingPage() {
    const params = useParams();
    const { type } = params;

    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAssets = async () => {
        try {
            setLoading(true);
            const res = await axios.get("/api/marketing/distributor", {
                params: { type: type === "all" ? undefined : type }
            });
            if (res.data?.success) setAssets(res.data.data || []);
        } catch (e) {
            console.error("Fetch error:", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (type) fetchAssets();
    }, [type]);

    const activeCat = CATEGORY_TABS.find(c => c.key === type);

    const filteredAssets = assets; // API already returns filtered results now

    return (
        <div className="min-h-screen font-sans -mt-8">
            {/* ── Top Bar ── */}
            <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100 sticky top-0 z-10">
                <div>
                    <h1 className="md:text-lg text-sm font-bold text-gray-900 tracking-tight">Marketing Materials</h1>
                    <p className="text-xs text-gray-400 mt-0.5 hidden md:block">Browse specialized marketing resources for your account</p>
                </div>
            </div>

            <div className="p-6 flex flex-col gap-6">
                {/* ── Section Header ── */}
                <div className="flex items-center gap-3">
                    {activeCat && (
                        <div className={`w-8 h-8 rounded-xl ${activeCat.bg} flex items-center justify-center shrink-0`}>
                            <activeCat.icon className={`w-4 h-4 ${activeCat.color}`} />
                        </div>
                    )}
                    <div>
                        <h2 className="text-sm font-bold text-gray-800">{activeCat?.label || "Marketing Resources"}</h2>
                        <p className="text-[11px] text-gray-400">{filteredAssets.length} resource{filteredAssets.length !== 1 ? "s" : ""} available</p>
                    </div>
                </div>

                {/* ── Content Panel ── */}
                <div className="flex flex-col gap-4">
                    {type === "youtube" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredAssets.map(a => (
                                <YouTubeCard key={a._id} asset={a} />
                            ))}
                        </div>
                    )}

                    {type === "social_post" && (
                        <SocialPostTable assets={filteredAssets} loading={loading} />
                    )}

                    {type === "case_study" && (
                        <PDFTable assets={filteredAssets} loading={loading} accentColor="emerald" />
                    )}

                    {type === "playbook" && (
                        <PDFTable assets={filteredAssets} loading={loading} accentColor="purple" />
                    )}
                </div>

                {!loading && filteredAssets.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <DocumentTextIcon className="w-12 h-12 text-gray-200 mb-3" />
                        <h3 className="text-lg font-bold text-gray-400">No Materials Yet</h3>
                        <p className="text-sm text-gray-400 mt-1">Marketing materials will appear here when added.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
