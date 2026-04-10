"use client";

import { useState, useEffect, Fragment } from "react";
import { useApiClient } from "@/src/config/axios";
import {
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
    ShareIcon,
    ShieldCheckIcon,
    ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { TableEmptyState, TableLoadingSkeleton } from "@/src/components/ui/TableState";
import ConfirmationModal from "@/src/components/ui/ConfirmationModal";
import AdminHeader from "@/src/components/admin/AdminHeader";

// ─── Constants ────────────────────────────────────────────────────────────────
const CATEGORY_TABS = [
    // {
    //     key: "all", label: "All", icon: NewspaperIcon,
    //     color: "text-gray-700", bg: "bg-gray-100", border: "border-gray-200",
    //     activeBg: "bg-gray-900", activeText: "text-white",
    // },
    {
        key: "youtube", label: "Youtube Links", icon: VideoCameraIcon,
        color: "text-red-500", bg: "bg-red-50", border: "border-red-200",
        activeBg: "bg-red-500", activeText: "text-white",
    },
    {
        key: "social_post", label: "Social Media", icon: MegaphoneIcon,
        color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200",
        activeBg: "bg-blue-500", activeText: "text-white",
    },
    {
        key: "case_study", label: "Case Studies", icon: DocumentTextIcon,
        color: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200",
        activeBg: "bg-emerald-500", activeText: "text-white",
    },
    {
        key: "playbook", label: "⁠Strategic Marketing Docs", icon: BookOpenIcon,
        color: "text-purple-500", bg: "bg-purple-50", border: "border-purple-200",
        activeBg: "bg-purple-500", activeText: "text-white",
    },
    {
        key: "compliance", label: "Compliances", icon: ShieldCheckIcon,
        color: "text-teal-500", bg: "bg-teal-50", border: "border-teal-200",
        activeBg: "bg-teal-500", activeText: "text-white",
    },
];

const STAT_CARDS = [
    {
        key: "youtube", label: "Youtube Links", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
            <defs>
                <mask id="SVGLjAFPeSy">
                    <path fill="#fff" fillOpacity={0} stroke="#fff" strokeDasharray={60} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5c9 0 9 0 9 7c0 7 0 7 -9 7c-9 0 -9 0 -9 -7c0 -7 0 -7 9 -7Z">
                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="60;0"></animate>
                        <animate fill="freeze" attributeName="fill-opacity" begin="0.6s" dur="0.4s" to={1}></animate>
                    </path>
                    <path d="M10 8.5l6 3.5l-6 3.5Z" opacity={0}>
                        <set fill="freeze" attributeName="opacity" begin="1.1s" to={1}></set>
                        <animate fill="freeze" attributeName="d" begin="1.1s" dur="0.2s" values="M12 11l0 1l0 1Z;M10 8.5l6 3.5l-6 3.5Z"></animate>
                    </path>
                </mask>
            </defs>
            <path fill="currentColor" d="M0 0h24v24H0z" mask="url(#SVGLjAFPeSy)"></path>
        </svg>),
        color: "text-red-500", ring: "ring-red-400", bg: "bg-red-50",
        hex: "#ef4444",
    },
    {
        key: "social_post", label: "Social Media", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20">
            <g fill="currentColor">
                <g opacity={0.2}>
                    <path d="M6.137 11.783a1 1 0 0 1-.737-.965V6.382a1 1 0 0 1 .737-.965l7.6-2.073A1 1 0 0 1 15 4.31v8.582a1 1 0 0 1-1.263.964z"></path>
                    <path fillRule="evenodd" d="m7.4 10.054l5.6 1.527V5.619L7.4 7.146zm-2 .764a1 1 0 0 0 .737.965l7.6 2.073A1 1 0 0 0 15 12.89V4.309a1 1 0 0 0-1.263-.965l-7.6 2.073a1 1 0 0 0-.737.965z" clipRule="evenodd"></path>
                    <path d="M7.016 10.8a1 1 0 0 1-1 1h-2.76a.56.56 0 0 1-.405-.176c-1.593-1.7-1.6-4.36.002-6.052a.55.55 0 0 1 .4-.172h2.763a1 1 0 0 1 1 1z"></path>
                    <path fillRule="evenodd" d="M5.016 9.8V7.4H3.969a2.43 2.43 0 0 0 .004 2.4zm1 2a1 1 0 0 0 1-1V6.4a1 1 0 0 0-1-1H3.253a.55.55 0 0 0-.4.172c-1.602 1.691-1.595 4.353-.002 6.052a.56.56 0 0 0 .405.176z" clipRule="evenodd"></path>
                    <path d="M3.902 11.506A2 2 0 0 1 5.84 10h.584a2 2 0 0 1 1.938 2.496l-.767 3A2 2 0 0 1 5.657 17h-1.87a1 1 0 0 1-.969-1.247z"></path>
                    <path fillRule="evenodd" d="M6.424 12H5.84l-.766 3h.583zm-.584-2a2 2 0 0 0-1.938 1.506l-1.084 4.247A1 1 0 0 0 3.788 17h1.87a2 2 0 0 0 1.937-1.505l.767-3A2 2 0 0 0 6.424 10zm13.192-5.555a1 1 0 0 1-.277 1.387l-1.5 1a1 1 0 0 1-1.11-1.664l1.5-1a1 1 0 0 1 1.387.277M15.7 8.6a1 1 0 0 1 1-1h1.5a1 1 0 0 1 0 2h-1.5a1 1 0 0 1-1-1m.234 1.909a1 1 0 0 1 1.409-.123l1.38 1.16a1 1 0 0 1-1.286 1.531l-1.38-1.16a1 1 0 0 1-.123-1.408" clipRule="evenodd"></path>
                </g>
                <path fillRule="evenodd" d="M6.4 4.882v4.436l7.6 2.073V2.809zm-1 4.436a1 1 0 0 0 .737.965l7.6 2.073A1 1 0 0 0 15 11.39V2.809a1 1 0 0 0-1.263-.965l-7.6 2.073a1 1 0 0 0-.737.965z" clipRule="evenodd"></path>
                <path fillRule="evenodd" d="M3.456 9.3H5.5V4.9H3.453a3.42 3.42 0 0 0 .003 4.4m2.044 1a1 1 0 0 0 1-1V4.9a1 1 0 0 0-1-1H3.253a.55.55 0 0 0-.4.172c-1.602 1.691-1.595 4.353-.002 6.052a.56.56 0 0 0 .405.176z" clipRule="evenodd"></path>
                <path fillRule="evenodd" d="m7.269 10.87l-2.51-.28l-.978 3.91h2.636zm-2.4-1.273a1 1 0 0 0-1.081.75l-.977 3.91a1 1 0 0 0 .97 1.243h2.636a1 1 0 0 0 .974-.772l.852-3.63a1 1 0 0 0-.864-1.223zm13.747-6.374a.5.5 0 0 1-.139.693l-1.5 1a.5.5 0 1 1-.554-.832l1.5-1a.5.5 0 0 1 .693.139M16.2 7.1a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1h-1.5a.5.5 0 0 1-.5-.5m.117 2.23a.5.5 0 0 1 .705-.06l1.38 1.159a.5.5 0 0 1-.643.765l-1.38-1.16a.5.5 0 0 1-.062-.704" clipRule="evenodd"></path>
            </g>
        </svg>),
        color: "text-blue-500", ring: "ring-blue-400", bg: "bg-blue-50",
        hex: "#3b82f6",
    },
    {
        key: "case_study", label: "Case Studies", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
            <path fill="currentColor" d="M10.561 2.25c-.113 0-.201 0-.285.005a2.75 2.75 0 0 0-2.385 1.72c-.032.079-.06.164-.099.278c-.083.224-.274.479-.542.683q-.045.034-.09.064h1.942q.044-.09.08-.182l.001-.003l.004-.01l.005-.012l.005-.012l.004-.01l.001-.005l.005-.012l.003-.012l.003-.006l.002-.008l.002-.007l.002-.006c.04-.116.052-.153.063-.181a1.25 1.25 0 0 1 1.085-.782c.032-.002.071-.002.215-.002h2.837c.144 0 .183 0 .216.002c.482.03.904.334 1.084.782c.011.028.023.063.063.181l.002.006l.002.007l.003.008l.002.006l.003.012l.005.012l.001.005l.004.01l.005.012l.004.012l.005.01l.001.003q.036.093.08.182h1.942q-.045-.03-.09-.064c-.268-.204-.459-.46-.542-.683l-.003-.01c-.036-.107-.064-.191-.095-.269a2.75 2.75 0 0 0-2.386-1.719a5 5 0 0 0-.285-.005z" opacity={0.5}></path>
            <path fill="currentColor" fillRule="evenodd" d="M17.192 5H6.808c-1.688 0-2.531 0-3.175.33A3 3 0 0 0 2.33 6.633C2 7.277 2 8.12 2 9.808c0 .429 0 .643.073.824a1 1 0 0 0 .3.404c.153.122.358.183.77.307L8.5 12.95v1.213c0 .765.46 1.471 1.187 1.767l.56.227a4.65 4.65 0 0 0 3.506 0l.56-.227a1.91 1.91 0 0 0 1.187-1.767V12.95l5.358-1.607c.41-.124.616-.185.768-.307a1 1 0 0 0 .3-.404c.074-.18.074-.395.074-.824c0-1.688 0-2.531-.33-3.175a3 3 0 0 0-1.303-1.303C19.723 5 18.88 5 17.192 5M13.6 12h-3.2c-.22 0-.4.182-.4.406v1.757c0 .166.1.315.251.377l.56.228c.764.31 1.614.31 2.377 0l.56-.228a.41.41 0 0 0 .252-.377v-1.757a.403.403 0 0 0-.4-.406" clipRule="evenodd"></path>
            <path fill="currentColor" d="m3 11.3l.142.043L8.5 12.95v1.213c0 .765.46 1.471 1.187 1.767l.56.227a4.65 4.65 0 0 0 3.506 0l.56-.227a1.91 1.91 0 0 0 1.187-1.767V12.95l5.358-1.607L21 11.3v1c0 3.675-.035 7.388-1.318 8.528C18.364 22 16.242 22 12 22s-6.364 0-7.682-1.172C3.035 19.688 3.001 15.975 3 12.3z" opacity={0.5}></path>
        </svg>),
        color: "text-emerald-500", ring: "ring-emerald-400", bg: "bg-emerald-50",
        hex: "#10b981",
    },
    {
        key: "playbook", label: "⁠Strategic Marketing Docs", icon: ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24">
            <g fill="none">
                <rect width={16} height={18} x={4} y={3} fill="currentColor" fillOpacity={0.25} rx={2}></rect>
                <path stroke="currentColor" strokeLinecap="round" d="M8.5 6.5h7m-7 3h4m-4 3h6" strokeWidth={1.9}></path>
                <path fill="currentColor" d="M4 19a2 2 0 0 1 2-2h11c.932 0 1.398 0 1.765-.152a2 2 0 0 0 1.083-1.083C20 15.398 20 14.932 20 14v3c0 1.886 0 2.828-.586 3.414S17.886 21 16 21H6a2 2 0 0 1-2-2"></path>
            </g>
        </svg>),
        color: "text-purple-500", ring: "ring-purple-400", bg: "bg-purple-50",
        hex: "#8b5cf6",
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

// ─── Media Preview Modal ───────────────────────────────────────────────────────
function MediaPreviewModal({ media, onClose }) {
    if (!media) return null;

    const isVideo = media.includes("video") ||
        media.endsWith(".mp4") ||
        media.endsWith(".avi") ||
        media.endsWith(".mov") ||
        media.endsWith(".wmv") ||
        media.endsWith(".webm");
    const isPDF = media.endsWith(".pdf") || media.includes("application/pdf") || media.includes("raw/upload");

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full overflow-hidden relative animate-in zoom-in-95 duration-200"
                onClick={e => e.stopPropagation()}
            >
                <div className="absolute top-4 right-4 z-10">
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full bg-black/10 hover:bg-black/20 text-gray-700 transition-colors"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-1 min-h-[300px] flex items-center justify-center bg-gray-50">
                    {isVideo ? (
                        <video
                            src={media}
                            className="w-full aspect-video rounded-xl shadow-inner shadow-black/10 outline-none"
                            controls
                            autoPlay
                            playsInline
                        />
                    ) : isPDF ? (
                        <iframe
                            src={media}
                            className="w-full h-[80vh] rounded-xl border-0"
                            title="PDF Preview"
                        />
                    ) : (
                        <img
                            src={media}
                            alt="Preview"
                            className="max-w-full max-h-[80vh] object-contain rounded-xl"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

// ─── Circular Progress Bar ────────────────────────────────────────────────────
const CircularProgressBar = ({
    percentage,
    size = 55,
    strokeWidth = 3,
    color = "#06b6d4",
    icon: Icon
}) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative w-fit">
            <svg width={size} height={size} className="-rotate-90">
                {/* Background Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="#e2e8f0"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />
                {/* Progress Circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                />
            </svg>
            {/* Icon inside the Circle */}
            {Icon && (
                <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {Icon}
                </span>
            )}
        </div>
    );
};

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
                <h3 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">{asset.title}</h3>
                {asset.description && <p className="text-xs text-gray-500 line-clamp-4">{asset.description}</p>}
                {asset.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-auto pt-1">
                        {asset.tags.slice(0, 3).map((t, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-red-50 text-red-600 font-medium border border-red-100">#{t.trim()}</span>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex items-center justify-between gap-2 px-3 py-2.5 border-t border-gray-50 bg-gray-50/50">
                <span className="text-[12px] text-gray-400">{formatDate(asset.createdAt)}</span>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(asset.url);
                            alert("Link copied to clipboard!");
                        }}
                        className="p-1.5 rounded-lg hover:bg-emerald-50 bg-emerald-100 border text-gray-700 hover:text-emerald-600 transition-colors"
                        title="Share Link"
                    >
                        <ShareIcon className="w-4 h-4" />
                    </button>
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
function SocialPostTable({ assets, loading, onEdit, onDelete, onToggleVisibility, onPreviewMedia }) {
    return (
        <div className="bg-white rounded-b-2xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 bg-gray-50/60 transition-colors whitespace-nowrap">
                            <th className="px-5 py-3 text-left w-12">#</th>
                            <th className="px-5 py-3 text-left min-w-[150px]">Title</th>
                            <th className="px-5 py-3 text-left min-w-[100px]">Media</th>
                            <th className="px-5 py-3 text-left min-w-[150px]">Link / URL</th>
                            <th className="px-5 py-3 text-left min-w-[120px]">Tags</th>
                            <th className="px-5 py-3 text-left min-w-[100px]">Status</th>
                            <th className="px-5 py-3 text-left min-w-[100px]">Date</th>
                            <th className="px-5 py-3 text-right min-w-[100px] sticky right-0 bg-gray-50/80 backdrop-blur-sm shadow-[-4px_0_4px_-2px_rgba(0,0,0,0.05)]">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? <TableLoadingSkeleton columns={8} rows={4} /> :
                            assets.length === 0 ? <TableEmptyState colSpan={8} title="No Social Posts" message="Add your first social post material." /> :
                                assets.map((a, i) => (
                                    <tr key={a._id} className={`hover:bg-gray-50/60 transition-colors ${!a.isActive ? "opacity-60" : ""}`}>
                                        <td className="px-5 py-3.5 text-xs text-gray-400 font-mono">{i + 1}</td>
                                        <td className="px-5 py-3.5">
                                            <p className="text-sm font-semibold text-gray-800 max-w-[200px] truncate">{a.title}</p>
                                            {a.description && <p className="text-xs text-gray-400 truncate max-w-[200px]">{a.description}</p>}
                                        </td>
                                        <td className="px-5 py-3.5">
                                            {a.attachment ? (
                                                <button
                                                    onClick={() => onPreviewMedia(a.attachment)}
                                                    className="w-20 h-12 rounded-lg bg-gray-100 border border-gray-100 overflow-hidden shrink-0 group/media relative"
                                                >
                                                    {(a.attachment.includes("video") ||
                                                        a.attachment.endsWith(".mp4") ||
                                                        a.attachment.endsWith(".avi") ||
                                                        a.attachment.endsWith(".mov") ||
                                                        a.attachment.endsWith(".wmv") ||
                                                        a.attachment.endsWith(".webm")) ? (
                                                        <div className="w-full h-full flex items-center justify-center bg-gray-900">
                                                            <PlayIcon className="w-4 h-4 text-white" />
                                                        </div>
                                                    ) : a.attachmentType === "pdf" ? (
                                                        <div className="w-full h-full flex flex-col items-center justify-center bg-blue-50/50">
                                                            <DocumentTextIcon className="w-6 h-6 text-blue-500" />
                                                            <span className="text-[8px] font-bold text-blue-600 uppercase">PDF</span>
                                                        </div>
                                                    ) : (
                                                        <img src={a.attachment} alt="Attachment" className="w-full h-full object-cover" />
                                                    )}
                                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/media:opacity-100 transition-opacity flex items-center justify-center">
                                                        <EyeIcon className="w-5 h-5 text-white shadow-sm" />
                                                    </div>
                                                </button>
                                            ) : <span className="text-[10px] text-gray-400 italic">No media</span>}
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
                                        <td className="px-5 py-3.5 text-right sticky right-0 bg-white/80 group-hover:bg-gray-50/80 backdrop-blur-sm shadow-[-4px_0_4px_-2px_rgba(0,0,0,0.05)] transition-colors">
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
        <div className="bg-white rounded-b-2xl border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 bg-gray-50/60 transition-colors whitespace-nowrap">
                            <th className="px-5 py-3 text-left w-12">#</th>
                            <th className="px-5 py-3 text-left min-w-[150px]">Title</th>
                            <th className="px-5 py-3 text-left min-w-[200px]">Description</th>
                            <th className="px-5 py-3 text-left min-w-[120px]">Tags</th>
                            <th className="px-5 py-3 text-left min-w-[100px]">Preview</th>
                            <th className="px-5 py-3 text-left min-w-[100px]">Status</th>
                            <th className="px-5 py-3 text-left min-w-[100px]">Date</th>
                            <th className="px-5 py-3 text-right min-w-[100px] sticky right-0 bg-gray-50/80 backdrop-blur-sm shadow-[-4px_0_4px_-2px_rgba(0,0,0,0.05)]">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? <TableLoadingSkeleton columns={8} rows={4} /> :
                            assets.length === 0 ? <TableEmptyState colSpan={8} title="No Files Found" message="Upload your first document." /> :
                                assets.map((a, i) => (
                                    <Fragment key={a._id}>
                                        <tr className={`hover:bg-gray-50/60 transition-colors ${!a.isActive ? "opacity-60" : ""}`}>
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
                                            <td className="px-5 py-3.5 text-right sticky right-0 bg-white/80 group-hover:bg-gray-50/80 backdrop-blur-sm shadow-[-4px_0_4px_-2px_rgba(0,0,0,0.05)] transition-colors">
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
                                    </Fragment>
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const truncateWords = (str, maxWords = 6) => {
    if (!str) return "—";
    const words = str.trim().split(/\s+/);
    if (words.length > maxWords) {
        return words.slice(0, maxWords).join(" ") + "...";
    }
    return str;
};

function ComplianceStatusBadge({ status }) {
    const displayStatus = status || "Current";
    const statusMap = {
        "Current": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "Report": "bg-blue-50 text-blue-700 border-blue-200",
        "Regulatory": "bg-purple-50 text-purple-700 border-purple-200",
        "Performance": "bg-amber-50 text-amber-700 border-amber-200",
        "Safety": "bg-rose-50 text-rose-700 border-rose-200",
        "Product": "bg-teal-50 text-teal-700 border-teal-200"
    };

    const colorClass = statusMap[displayStatus] || "bg-gray-50 text-gray-700 border-gray-200";

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${colorClass}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
                displayStatus === "Current" ? "bg-emerald-500" :
                displayStatus === "Report" ? "bg-blue-500" :
                displayStatus === "Regulatory" ? "bg-purple-500" :
                displayStatus === "Performance" ? "bg-amber-500" :
                displayStatus === "Safety" ? "bg-rose-500" :
                displayStatus === "Product" ? "bg-teal-500" : "bg-gray-400"
            }`} />
            {displayStatus}
        </span>
    );
}

function ComplianceTable({ compliances, loading, onEdit, onDelete, onPreviewMedia }) {
    return (
        <div className="bg-white rounded-b-2xl border border-gray-100 overflow-hidden  -mt-2">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 bg-gray-50/60 transition-colors whitespace-nowrap">
                            <th className="px-5 py-3 text-left w-12">#</th>
                            <th className="px-5 py-3 text-left min-w-[200px]">Title</th>
                            <th className="px-5 py-3 text-left min-w-[250px]">Subtitle / Description</th>
                            <th className="px-5 py-3 text-left min-w-[120px]">Category</th>
                            <th className="px-5 py-3 text-left min-w-[120px]">Status</th>
                            <th className="px-5 py-3 text-left min-w-[150px]">Document / URL</th>
                            <th className="px-5 py-3 text-left min-w-[100px]">Date</th>
                            <th className="px-5 py-3 text-right min-w-[100px] sticky right-0 bg-gray-50/80 backdrop-blur-sm shadow-[-4px_0_4px_-2px_rgba(0,0,0,0.05)]">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {loading ? <TableLoadingSkeleton columns={8} rows={4} /> :
                            compliances.length === 0 ? <TableEmptyState colSpan={8} title="No Compliance Documents" message="Add your first compliance document." /> :
                                compliances.map((c, i) => (
                                    <tr key={c._id} className="hover:bg-gray-50/60 transition-colors">
                                        <td className="px-5 py-3.5 text-xs text-gray-400 font-mono">{i + 1}</td>
                                        <td className="px-5 py-3.5">
                                            <p className="text-sm font-semibold text-gray-800">{c.title}</p>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <p className="text-xs text-gray-500 leading-normal" title={c.subtitle || ""}>{truncateWords(c.subtitle, 6)}</p>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                                                {c.catgory || c.category || "Official Standards"}
                                            </span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                            <ComplianceStatusBadge status={c.status} />
                                        </td>
                                        <td className="px-5 py-3.5">
                                            {c.url ? (
                                                <button
                                                    onClick={() => onPreviewMedia(c.url)}
                                                    className="flex items-center gap-1.5 text-xs font-semibold text-teal-600 hover:text-teal-700 hover:underline"
                                                >
                                                    <DocumentTextIcon className="w-4 h-4 shrink-0" />
                                                    View PDF
                                                </button>
                                            ) : <span className="text-xs text-gray-400 italic">No document</span>}
                                        </td>
                                        <td className="px-5 py-3.5 text-xs text-gray-500 whitespace-nowrap">{formatDate(c.createdAt)}</td>
                                        <td className="px-5 py-3.5 text-right sticky right-0 bg-white/80 group-hover:bg-gray-50/80 backdrop-blur-sm shadow-[-4px_0_4px_-2px_rgba(0,0,0,0.05)] transition-colors">
                                            <div className="flex items-center justify-end gap-1">
                                                <button onClick={() => onEdit(c)} className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"><PencilSquareIcon className="w-4 h-4" /></button>
                                                <button onClick={() => onDelete(c)} className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 transition-colors"><TrashIcon className="w-4 h-4" /></button>
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

export default function AdminMarketingPage() {
    const api = useApiClient();
    const [categoryTab, setCategoryTab] = useState("youtube");

    // Modal states
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [visibilityTarget, setVisibilityTarget] = useState(null);
    const [previewMedia, setPreviewMedia] = useState(null);

    // Compliance states
    const [isComplianceModalOpen, setIsComplianceModalOpen] = useState(false);
    const [complianceForm, setComplianceForm] = useState({ title: "", subtitle: "", url: "", catgory: "Official Standards", status: "Current" });
    const [complianceFile, setComplianceFile] = useState(null);
    const [editingComplianceId, setEditingComplianceId] = useState(null);

    const resetComplianceForm = () => {
        setComplianceForm({ title: "", subtitle: "", url: "", catgory: "Official Standards", status: "Current" });
        setComplianceFile(null);
        setEditingComplianceId(null);
    };

    const queryKey = ["marketing"];
    const { data: marketingData, isLoading: loading, error: fetchError } = api.useGet(
        queryKey,
        "/marketing"
    );

    const complianceQueryKey = ["compliances"];
    const { data: complianceData, isLoading: complianceLoading } = api.useGet(
        complianceQueryKey,
        "/compliances"
    );

    const assets = marketingData?.data?.data || [];
    const compliances = complianceData?.data || [];

    const counts = {
        youtube: marketingData?.data?.totalYoutube || 0,
        social_post: marketingData?.data?.totalSocialPost || 0,
        case_study: marketingData?.data?.totalCaseStudy || 0,
        playbook: marketingData?.data?.totalPlaybook || 0,
        compliance: compliances.length,
    };

    const deleteMutation = api.useDelete(queryKey, "/marketing", {
        onSuccess: () => {
            setDeleteTarget(null);
            api.invalidate(queryKey);
        },
        onError: (err) => alert(err.response?.data?.message || err.message || "Delete error")
    });

    const deleteComplianceMutation = api.useDelete(complianceQueryKey, "/compliances", {
        onSuccess: () => setDeleteTarget(null),
        onError: (err) => alert(err.response?.data?.message || err.message || "Delete error")
    });

    const createComplianceMutation = api.usePost(complianceQueryKey, "/compliances", {
        onSuccess: () => {
            setIsComplianceModalOpen(false);
            resetComplianceForm();
        },
        onError: (err) => alert(err.response?.data?.message || err.message || "Create error")
    });

    const updateComplianceMutation = api.usePut(complianceQueryKey, "/compliances", {
        onSuccess: () => {
            setIsComplianceModalOpen(false);
            resetComplianceForm();
        },
        onError: (err) => alert(err.response?.data?.message || err.message || "Update error")
    });

    const statusMutation = api.usePut(queryKey, "/marketing/status", {
        onSuccess: () => {
            setVisibilityTarget(null);
            api.invalidate(queryKey);
        },
        onError: (err) => alert(err.response?.data?.message || err.message || "Toggle error")
    });

    const handleEdit = (asset) => {
        window.location.href = `/admin/marketing/edit/${asset._id}`;
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        if (deleteTarget.type === "compliance") {
            deleteComplianceMutation.mutate(deleteTarget._id);
        } else {
            deleteMutation.mutate(deleteTarget._id);
        }
    };

    const handleToggleVisibility = async () => {
        if (!visibilityTarget) return;
        statusMutation.mutate(visibilityTarget._id);
    };

    const deleting = deleteMutation.isPending || deleteComplianceMutation.isPending;
    const togglingVisibility = statusMutation.isPending;

    const filteredAssets = categoryTab === "all" ? assets : assets.filter(a => a.type === categoryTab);
    const totalAll = counts.youtube + counts.social_post + counts.case_study + counts.playbook + counts.compliance;

    const tabCounts = {
        all: assets.length + compliances.length,
        youtube: assets.filter(a => a.type === "youtube").length,
        social_post: assets.filter(a => a.type === "social_post").length,
        case_study: assets.filter(a => a.type === "case_study").length,
        playbook: assets.filter(a => a.type === "playbook").length,
        compliance: compliances.length,
    };

    return (
        <div className="min-h-screen font-sans">
            {/* ── Top Bar ── */}
            <AdminHeader
                title="Marketing Materials"
                subtitle="Manage all your marketing assets in one place"
                buttonText={categoryTab === "compliance" ? "Add Compliance" : "Add Material"}
                buttonLink={categoryTab === "compliance" ? undefined : "/admin/marketing/add"}
                onClick={categoryTab === "compliance" ? () => { resetComplianceForm(); setIsComplianceModalOpen(true); } : undefined}
            />

            <div className="p-6 flex flex-col pt-0">

                {/* ── Stats Cards Row (reference style: horizontal scroll, icon + label + count) ── */}
                <div className="grid lg:grid-cols-5 sm:grid-cols-2 grid-cols-1 md:grid-cols-3 bg-white items-center py-5 rounded-2xl border border-gray-100 shadow-sm gap-3 overflow-x-auto">
                    {/* Total card */}
                    <div className="flex items-center gap-4 px-5">
                        <CircularProgressBar
                            percentage={100}
                            color="#86d8e7"
                            size={55}
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-cyan-400" viewBox="0 0 24 24">
                                    <path fill="currentColor" fillRule="evenodd" d="M14 22h-4c-3.771 0-5.657 0-6.828-1.172S2 17.771 2 14v-4c0-3.771 0-5.657 1.172-6.828S6.239 2 10.03 2c.606 0 1.091 0 1.5.017q-.02.12-.02.244l-.01 2.834c0 1.097 0 2.067.105 2.848c.114.847.375 1.694 1.067 2.386c.69.69 1.538.952 2.385 1.066c.781.105 1.751.105 2.848.105h4.052c.043.534.043 1.19.043 2.063V14c0 3.771 0 5.657-1.172 6.828S17.771 22 14 22" clipRule="evenodd" opacity={0.5}></path>
                                    <path fill="currentColor" d="M6 13.75a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5zm0 3.5a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5zm5.51-14.99l-.01 2.835c0 1.097 0 2.066.105 2.848c.114.847.375 1.694 1.067 2.385c.69.691 1.538.953 2.385 1.067c.781.105 1.751.105 2.848.105h4.052q.02.232.028.5H22c0-.268 0-.402-.01-.56a5.3 5.3 0 0 0-.958-2.641c-.094-.128-.158-.204-.285-.357C19.954 7.494 18.91 6.312 18 5.5c-.81-.724-1.921-1.515-2.89-2.161c-.832-.556-1.248-.834-1.819-1.04a6 6 0 0 0-.506-.154c-.384-.095-.758-.128-1.285-.14z"></path>
                                </svg>}

                        />
                        <div>
                            <p className="text-sm font-semibold text-gray-500">Total</p>
                            <p className="text-[10px] text-gray-400">{totalAll} materials</p>
                            <p className="text-base font-semibold text-gray-900 mt-0.5">{assets.length}</p>
                        </div>
                    </div>

                    {STAT_CARDS.map(sc => (
                        <div key={sc.key} className="bg-white md:border-l border-l-0 md:border-t-0 border-t md:pt-0 pt-2 border-dashed border-neutral-200 flex items-center gap-4 px-5">
                            <CircularProgressBar
                                percentage={100}
                                color={sc.hex}
                                size={55}
                                icon={<sc.icon className={`w-8 h-8 ${sc.color}`} />}
                            />
                            <div>
                                <p className="text-sm font-semibold text-gray-500">{sc.label}</p>
                                <p className="text-[10px] text-gray-400">{counts[sc.key]} materials</p>
                                <p className="text-base font-semibold text-gray-900 mt-0.5">{counts[sc.key]}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* ── Tab Bar (reference: text tabs with dark pill count badges) ── */}
                <div className="md:flex grid grid-cols-2 items-center gap-10 border-b mt-3 border-gray-100 bg-white rounded-t-2xl px-5 pb-3">
                    {CATEGORY_TABS.map(ct => {
                        const isActive = categoryTab === ct.key;
                        return (
                            <button
                                key={ct.key}
                                onClick={() => setCategoryTab(ct.key)}
                                className={`flex md:items-center items-start gap-2 px-0.5 py-3 pb-2 md:text-sm text-xs tracking-wide font-medium relative transition-all
                                    ${isActive
                                        ? "text-slate-800 after:absolute after:bottom-0 after:inset-x-0 after:h-[1.5px] after:rounded-full after:bg-gray-600"
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
                                                        : ct.key === "compliance" ? "bg-teal-100 text-teal-600"
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
                            onPreviewMedia={setPreviewMedia}
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
                            {/* {!loading && (categoryTab === "all" ? assets.filter(a => a.type === "case_study") : filteredAssets).length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {(categoryTab === "all" ? assets.filter(a => a.type === "case_study") : filteredAssets).map(a => (
                                        <PDFCard key={a._id} asset={a} onEdit={handleEdit} onDelete={setDeleteTarget} onToggleVisibility={setVisibilityTarget} accentColor="emerald" />
                                    ))}
                                </div>
                            )} */}
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
                            {/* {!loading && (categoryTab === "all" ? assets.filter(a => a.type === "playbook") : filteredAssets).length > 0 && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                    {(categoryTab === "all" ? assets.filter(a => a.type === "playbook") : filteredAssets).map(a => (
                                        <PDFCard key={a._id} asset={a} onEdit={handleEdit} onDelete={setDeleteTarget} onToggleVisibility={setVisibilityTarget} accentColor="purple" />
                                    ))}
                                </div>
                            )} */}
                        </div>
                    </div>
                )}

                {(categoryTab === "all" || categoryTab === "compliance") && (
                    <div className="mt-2">
                        {categoryTab === "all" && (
                            <div className="flex items-center gap-2 mt-2">
                                <div className="w-1 h-4 rounded-full bg-teal-500" />
                                <h2 className="text-xs font-bold text-gray-600 uppercase tracking-wider">Compliance Documents</h2>
                            </div>
                        )}
                        <ComplianceTable
                            compliances={compliances}
                            loading={complianceLoading}
                            onEdit={(compliance) => {
                                setEditingComplianceId(compliance._id);
                                setComplianceForm({
                                    title: compliance.title,
                                    subtitle: compliance.subtitle || "",
                                    url: compliance.url || "",
                                    catgory: compliance.catgory || "Official Standards",
                                    status: compliance.status || "Current"
                                });
                                setIsComplianceModalOpen(true);
                            }}
                            onDelete={(compliance) => {
                                setDeleteTarget({ ...compliance, type: "compliance" });
                            }}
                            onPreviewMedia={setPreviewMedia}
                        />
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

            {/* ── Media Preview Modal ── */}
            <MediaPreviewModal
                media={previewMedia}
                onClose={() => setPreviewMedia(null)}
            />

            {/* ── Compliance Add/Edit Modal ── */}
            {isComplianceModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => { setIsComplianceModalOpen(false); resetComplianceForm(); }}>
                    <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden relative animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                        <div className="absolute top-4 right-4 z-10">
                            <button onClick={() => { setIsComplianceModalOpen(false); resetComplianceForm(); }} className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors">
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center shadow-inner">
                                    <ShieldCheckIcon className="w-6 h-6 text-teal-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-slate-800 tracking-tight">{editingComplianceId ? "Edit Compliance" : "Add Compliance"}</h3>
                                    <p className="text-xs text-slate-400 font-medium">{editingComplianceId ? "Modify compliance certificate details" : "Create a new compliance certificate resource"}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-5">
                                {/* Title */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-2 tracking-tight">Title <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        value={complianceForm.title}
                                        onChange={e => setComplianceForm({ ...complianceForm, title: e.target.value })}
                                        placeholder="ISO 9001:2015, REACH Compliance..."
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200/80 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-400 focus:bg-white transition-all duration-200"
                                    />
                                </div>

                                {/* Subtitle */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-2 tracking-tight">Subtitle / Description <span className="text-red-500">*</span></label>
                                    <input
                                        type="text"
                                        value={complianceForm.subtitle}
                                        onChange={e => setComplianceForm({ ...complianceForm, subtitle: e.target.value })}
                                        placeholder="Quality Management System Certificate..."
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200/80 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-400 focus:bg-white transition-all duration-200"
                                    />
                                </div>

                                {/* Category and Status */}
                                <div className="grid grid-cols-1 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 mb-2 tracking-tight">Category <span className="text-slate-400 font-medium">(Optional)</span></label>
                                        <input
                                            type="text"
                                            value={complianceForm.catgory}
                                            onChange={e => setComplianceForm({ ...complianceForm, catgory: e.target.value })}
                                            placeholder="Enter or select a category..."
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-400 focus:bg-white transition-all duration-200"
                                        />
                                        <div className="flex flex-wrap gap-1.5 mt-2">
                                            {["Official Standards", "Quality", "Health & Safety", "Efficacy", "Regulation", "Performance", "Safety", "Product"].map(cat => (
                                                <button
                                                    key={cat}
                                                    type="button"
                                                    onClick={() => setComplianceForm({ ...complianceForm, catgory: cat })}
                                                    className={`text-[9px] font-bold px-2 py-0.5 rounded-md border transition-all ${
                                                        complianceForm.catgory === cat
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
                                        <label className="block text-xs font-bold text-slate-700 mb-2 tracking-tight">Status <span className="text-red-500">*</span></label>
                                        <select
                                            value={complianceForm.status}
                                            onChange={e => setComplianceForm({ ...complianceForm, status: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-4 focus:ring-teal-100 focus:border-teal-400 focus:bg-white transition-all duration-200"
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

                                {/* PDF Upload */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-2 tracking-tight">Upload PDF Document</label>
                                    <div
                                        onClick={() => document.getElementById("compliance-file-input").click()}
                                        className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center gap-2 cursor-pointer transition-all duration-200
                                            ${complianceFile ? "border-emerald-400 bg-emerald-50/20" : "border-slate-200 hover:border-teal-400 hover:bg-slate-50"}`}
                                    >
                                        <ArrowUpTrayIcon className={`w-8 h-8 ${complianceFile ? "text-emerald-500" : "text-slate-400"}`} />
                                        <p className="text-xs font-semibold text-slate-600">{complianceFile ? complianceFile.name : "Choose PDF file or drag it here"}</p>
                                        <p className="text-[10px] text-slate-400 italic">Only PDF documents are supported</p>
                                        <input
                                            id="compliance-file-input"
                                            type="file"
                                            accept="application/pdf"
                                            className="hidden"
                                            onChange={e => {
                                                const f = e.target.files[0];
                                                if (f) setComplianceFile(f);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 mt-8">
                                <button
                                    type="button"
                                    onClick={() => { setIsComplianceModalOpen(false); resetComplianceForm(); }}
                                    className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    disabled={createComplianceMutation.isPending || updateComplianceMutation.isPending}
                                    onClick={async () => {
                                        if (!complianceForm.title) {
                                            alert("Title is required");
                                            return;
                                        }
                                        if (!complianceForm.subtitle) {
                                            alert("Subtitle is required");
                                            return;
                                        }
                                        if (complianceForm.subtitle.trim().split(/\s+/).filter(Boolean).length > 20) {
                                            alert("Subtitle cannot exceed 20 words.");
                                            return;
                                        }
                                        if (!editingComplianceId && !complianceFile) {
                                            alert("Please upload a PDF document");
                                            return;
                                        }
                                        const fd = new FormData();
                                        fd.append("title", complianceForm.title);
                                        fd.append("subtitle", complianceForm.subtitle || "");
                                        fd.append("catgory", complianceForm.catgory || "Official Standards");
                                        fd.append("status", complianceForm.status || "Current");
                                        if (complianceFile) {
                                            fd.append("file", complianceFile);
                                        }

                                        if (editingComplianceId) {
                                            updateComplianceMutation.mutate({
                                                url: `/compliances/${editingComplianceId}`,
                                                data: fd
                                            });
                                        } else {
                                            createComplianceMutation.mutate(fd);
                                        }
                                    }}
                                    className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md shadow-teal-100 flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {createComplianceMutation.isPending || updateComplianceMutation.isPending ? (
                                        <>
                                            <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                            Saving...
                                        </>
                                    ) : editingComplianceId ? "Update Compliance" : "Add Compliance"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
