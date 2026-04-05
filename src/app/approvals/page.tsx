"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "@/components/layout/Sidebar";
import {
  CheckCircle, Clock, Send, AlertCircle, Video, Image, Layers,
  ChevronDown, X, Eye, RefreshCw, Check, Filter, Calendar,
  MessageSquare, Globe, Tag, Hash, ArrowRight,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ApprovalStatus = "pending" | "approved" | "revision" | "rejected" | "published";
type ContentType = "Reel" | "Post" | "Story" | "Carousel";
type TabFilter = "all" | "pending" | "approved" | "revision" | "published";

interface ApprovalItem {
  id: string;
  contentType: ContentType;
  account: string;
  accountColor: string;
  caption: string;
  hashtags: string[];
  submittedBy: string;
  submittedAt: string;
  status: ApprovalStatus;
  thumbnailGradient: string;
  thumbnailIcon: React.ReactNode;
}

// ─── Fake Data ────────────────────────────────────────────────────────────────

const ITEMS: ApprovalItem[] = [
  {
    id: "1",
    contentType: "Reel",
    account: "@abg.ricebunny",
    accountColor: "#ff0069",
    caption: "Monday grind starts early. No excuses, just results. The gym opens at 5am and I'm already there making moves before the world wakes up.",
    hashtags: ["#gymmotivation", "#gaybear", "#fitness", "#manila", "#earlybird"],
    submittedBy: "VA Mikee",
    submittedAt: "Apr 5, 2026",
    status: "pending",
    thumbnailGradient: "linear-gradient(135deg, #ff006922 0%, #fd1d1d22 100%)",
    thumbnailIcon: <Video className="w-6 h-6" style={{ color: "#ff0069" }} />,
  },
  {
    id: "2",
    contentType: "Post",
    account: "@onlytylerrex",
    accountColor: "#fcaf45",
    caption: "Post-workout glow. That feeling when everything just clicks into place. consistency is the only hack you need.",
    hashtags: ["#postworkout", "#fitness", "#gymlife", "#results"],
    submittedBy: "VA Yssa",
    submittedAt: "Apr 4, 2026",
    status: "pending",
    thumbnailGradient: "linear-gradient(135deg, #fcaf4522 0%, #833ab422 100%)",
    thumbnailIcon: <Image className="w-6 h-6" style={{ color: "#fcaf45" }} />,
  },
  {
    id: "3",
    contentType: "Carousel",
    account: "@rhinxrenx",
    accountColor: "#833ab4",
    caption: "5 ways to stay consistent with your fitness goals. Save this for your next reset week. Numbers 3 and 5 changed everything for me.",
    hashtags: ["#fitnessgoals", "#consistency", "#gymtips", "#motivation"],
    submittedBy: "VA Mikee",
    submittedAt: "Apr 4, 2026",
    status: "approved",
    thumbnailGradient: "linear-gradient(135deg, #833ab422 0%, #78c25722 100%)",
    thumbnailIcon: <Layers className="w-6 h-6" style={{ color: "#833ab4" }} />,
  },
  {
    id: "4",
    contentType: "Story",
    account: "@ellamira",
    accountColor: "#78c257",
    caption: "Chasing the golden hour. Some days the light is just perfect and you have to shoot. No plan, just vibes and a camera.",
    hashtags: ["#golden hour", "#lifestyle", "#ootd", "#manilaph"],
    submittedBy: "VA Yssa",
    submittedAt: "Apr 3, 2026",
    status: "revision",
    thumbnailGradient: "linear-gradient(135deg, #78c25722 0%, #00f4e222 100%)",
    thumbnailIcon: <Globe className="w-6 h-6" style={{ color: "#78c257" }} />,
  },
  {
    id: "5",
    contentType: "Reel",
    account: "@abg.ricebunny",
    accountColor: "#ff0069",
    caption: "Transformation Tuesday. 12 weeks in. Same mirror, different energy. The discipline is starting to show and I'm here for it.",
    hashtags: ["#transformationtuesday", "#fitness", "#progress", "#gym"],
    submittedBy: "VA Mikee",
    submittedAt: "Apr 3, 2026",
    status: "published",
    thumbnailGradient: "linear-gradient(135deg, #ff006922 0%, #833ab422 100%)",
    thumbnailIcon: <Video className="w-6 h-6" style={{ color: "#ff0069" }} />,
  },
  {
    id: "6",
    contentType: "Post",
    account: "@onlytylerrex",
    accountColor: "#fcaf45",
    caption: "Rest day ≠ lazy day. Active recovery, mobility work, and a proper meal prep session. Recovery is where the growth happens.",
    hashtags: ["#restday", "#recovery", "#mobility", "#mealprep"],
    submittedBy: "VA Yssa",
    submittedAt: "Apr 2, 2026",
    status: "published",
    thumbnailGradient: "linear-gradient(135deg, #fcaf4522 0%, #ff006922 100%)",
    thumbnailIcon: <Image className="w-6 h-6" style={{ color: "#fcaf45" }} />,
  },
  {
    id: "7",
    contentType: "Carousel",
    account: "@rhinxrenx",
    accountColor: "#833ab4",
    caption: "What I eat in a day as a gym guy. Full transparency — no bullshit, no cheat meals, just real food that fuels real results.",
    hashtags: ["#whatieat", "#gymfood", "#nutrition", "#bodybuilding"],
    submittedBy: "VA Mikee",
    submittedAt: "Apr 1, 2026",
    status: "approved",
    thumbnailGradient: "linear-gradient(135deg, #833ab422 0%, #fd1d1d22 100%)",
    thumbnailIcon: <Layers className="w-6 h-6" style={{ color: "#833ab4" }} />,
  },
  {
    id: "8",
    contentType: "Reel",
    account: "@ellamira",
    accountColor: "#78c257",
    caption: "Sunset shoot at the rooftop. When the city lights up and you've got the whole view to yourself. This is the lifestyle.",
    hashtags: ["#sunset", "#lifestyle", "#rooftop", "#manila", "#vibes"],
    submittedBy: "VA Yssa",
    submittedAt: "Mar 31, 2026",
    status: "revision",
    thumbnailGradient: "linear-gradient(135deg, #78c25722 0%, #fcaf4522 100%)",
    thumbnailIcon: <Video className="w-6 h-6" style={{ color: "#78c257" }} />,
  },
];

const ACCOUNTS = ["All Accounts", "@abg.ricebunny", "@onlytylerrex", "@rhinxrenx", "@ellamira"];
const CONTENT_TYPES = ["All Types", "Reel", "Post", "Story", "Carousel"];

// ─── Status Config ────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<ApprovalStatus, { label: string; color: string; bg: string; border: string }> = {
  pending:    { label: "Pending",        color: "#f59e0b", bg: "rgba(245,158,11,0.1)",   border: "rgba(245,158,11,0.2)"   },
  approved:   { label: "Approved",       color: "#22c55e", bg: "rgba(34,197,94,0.1)",    border: "rgba(34,197,94,0.2)"    },
  revision:   { label: "Needs Revision", color: "#f97316", bg: "rgba(249,115,22,0.1)",  border: "rgba(249,115,22,0.2)"  },
  rejected:   { label: "Rejected",       color: "#ef4444", bg: "rgba(239,68,68,0.1)",    border: "rgba(239,68,68,0.2)"   },
  published:  { label: "Published",      color: "#833ab4", bg: "rgba(131,58,180,0.1)",  border: "rgba(131,58,180,0.2)"  },
};

const CONTENT_TYPE_ICON: Record<ContentType, React.ReactNode> = {
  Reel:      <Video className="w-3 h-3" />,
  Post:      <Image className="w-3 h-3" />,
  Story:     <Globe className="w-3 h-3" />,
  Carousel:  <Layers className="w-3 h-3" />,
};

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, icon, color }: { label: string; value: number; icon: React.ReactNode; color: string }) {
  return (
    <div className="flex items-center gap-4 p-5 rounded-2xl bg-surface border border-subtle hover:border-white/12 transition-all">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color + "18", border: `1px solid ${color}33` }}>
        <div style={{ color }}>{icon}</div>
      </div>
      <div>
        <p className="text-white font-black text-2xl leading-none">{value}</p>
        <p className="text-xs mt-1" style={{ color: "#a8a8a8" }}>{label}</p>
      </div>
    </div>
  );
}

// ─── Approval Card ─────────────────────────────────────────────────────────────

function ApprovalCard({
  item,
  onViewApprove,
}: {
  item: ApprovalItem;
  onViewApprove: (item: ApprovalItem) => void;
}) {
  const cfg = STATUS_CONFIG[item.status];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="rounded-2xl bg-surface border border-subtle cursor-pointer group approval-card"
      onClick={() => onViewApprove(item)}
    >
      {/* Thumbnail */}
      <div
        className="aspect-[4/3] rounded-t-2xl flex items-center justify-center relative overflow-hidden"
        style={{ background: item.thumbnailGradient }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {item.thumbnailIcon}
        </div>
        {/* Glassy overlay on hover */}
        <div className="approval-card__glass-overlay absolute inset-0" />
        {/* Content type badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold"
          style={{ backgroundColor: "rgba(0,0,0,0.6)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)" }}>
          {CONTENT_TYPE_ICON[item.contentType]}
          {item.contentType}
        </div>
        {/* Account */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold"
          style={{ backgroundColor: item.accountColor + "33", color: item.accountColor, border: `1px solid ${item.accountColor}44` }}>
          {item.account}
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        <p className="text-sm text-white leading-snug line-clamp-2 mb-3">{item.caption}</p>

        {/* Meta */}
        <div className="flex items-center gap-2 mb-3 text-[11px]" style={{ color: "#a8a8a8" }}>
          <span>By {item.submittedBy}</span>
          <span>·</span>
          <span>{item.submittedAt}</span>
        </div>

        {/* Status */}
        <div className="flex items-center justify-between gap-2">
          <motion.button
            layout
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
            className="px-3 py-1.5 rounded-full text-[11px] font-bold approval-badge"
            style={{ backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
          >
            {cfg.label}
          </motion.button>

          <div className="flex gap-1.5">
            <button
              onClick={e => { e.stopPropagation(); onViewApprove(item); }}
              className="px-3 py-1.5 rounded-full text-[11px] font-bold text-white shimmer-btn"
              style={{ backgroundColor: "#ff0069" }}
            >
              Approve
            </button>
            <button
              onClick={e => { e.stopPropagation(); }}
              className="px-3 py-1.5 rounded-full text-[11px] font-medium transition-all hover:bg-white/8"
              style={{ border: "1px solid rgba(255,255,255,0.12)", color: "#a8a8a8" }}>
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Detail Modal ──────────────────────────────────────────────────────────────

function DetailModal({
  item,
  onClose,
  onStatusChange,
}: {
  item: ApprovalItem | null;
  onClose: () => void;
  onStatusChange: (id: string, status: ApprovalStatus) => void;
}) {
  const [revisionComment, setRevisionComment] = useState("");
  const [showRevisionField, setShowRevisionField] = useState(false);
  const [showRejectField, setShowRejectField] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [actionDone, setActionDone] = useState<string | null>(null);

  if (!item) return null;

  const cfg = STATUS_CONFIG[item.status];

  const handleAction = (action: string) => {
    if (action === "approve") {
      onStatusChange(item.id, "approved");
    } else if (action === "publish") {
      onStatusChange(item.id, "published");
    } else if (action === "revision") {
      if (!showRevisionField) { setShowRevisionField(true); return; }
      if (!revisionComment.trim()) return;
      onStatusChange(item.id, "revision");
    } else if (action === "reject") {
      if (!showRejectField) { setShowRejectField(true); return; }
      onStatusChange(item.id, "rejected");
    }
    setActionDone(action);
    setTimeout(() => { onClose(); setActionDone(null); setShowRevisionField(false); setShowRejectField(false); setRevisionComment(""); setRejectReason(""); }, 1200);
  };

  return (
    <>
      {/* Frosted glass orb backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50"
        onClick={onClose}
      >
        {/* Noise + blurred orb */}
        <div className="modal-orb-backdrop absolute inset-0" />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
        />
      </motion.div>

      {/* Modal */}
      <motion.div
        key="modal"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 22, stiffness: 280 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        {/* Noise overlay */}
        <div className="modal-noise absolute inset-0 z-0 pointer-events-none" />

        <div
          className="w-full max-w-2xl rounded-2xl overflow-hidden pointer-events-auto relative"
          style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.1)" }}
          onClick={e => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: item.accountColor + "22", border: `1px solid ${item.accountColor}44` }}>
                <div style={{ color: item.accountColor }}>{item.thumbnailIcon}</div>
              </div>
              <div>
                <h2 className="text-white font-semibold text-sm">{item.account}</h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <motion.span
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                    style={{ backgroundColor: cfg.bg, color: cfg.color, border: `1px solid ${cfg.border}` }}
                  >
                    {cfg.label}
                  </motion.span>
                  <span className="text-[11px]" style={{ color: "#a8a8a8" }}>{item.contentType} · {item.submittedAt}</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/8"
              style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
              <X className="w-4 h-4" style={{ color: "#a8a8a8" }} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5">
            {/* Preview */}
            <div className="aspect-video rounded-xl flex items-center justify-center overflow-hidden"
              style={{ background: item.thumbnailGradient, border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="flex flex-col items-center gap-3">
                {item.thumbnailIcon}
                <span className="text-sm font-medium" style={{ color: "#a8a8a8" }}>{item.contentType} Preview</span>
              </div>
            </div>

            {/* Caption */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-3.5 h-3.5" style={{ color: "#a8a8a8" }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#a8a8a8" }}>Caption</span>
              </div>
              <p className="text-sm text-white leading-relaxed">{item.caption}</p>
            </div>

            {/* Hashtags */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Hash className="w-3.5 h-3.5" style={{ color: "#a8a8a8" }} />
                <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#a8a8a8" }}>Hashtags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.hashtags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 rounded-full text-[11px] font-medium"
                    style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "#a8a8a8", border: "1px solid rgba(255,255,255,0.08)" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Revision comment */}
            <AnimatePresence>
              {showRevisionField && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <textarea
                    value={revisionComment}
                    onChange={e => setRevisionComment(e.target.value)}
                    placeholder="Describe what needs to change..."
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 resize-none outline-none transition-all"
                    style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(249,115,22,0.3)" }}
                    rows={3}
                  />
                </motion.div>
              )}
              {showRejectField && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <textarea
                    value={rejectReason}
                    onChange={e => setRejectReason(e.target.value)}
                    placeholder="Reason for rejection..."
                    className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 resize-none outline-none transition-all"
                    style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(239,68,68,0.3)" }}
                    rows={2}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submitted by */}
            <div className="flex items-center gap-2 text-xs" style={{ color: "#a8a8a8" }}>
              <span>Submitted by</span>
              <span className="font-semibold text-white">{item.submittedBy}</span>
              <span>·</span>
              <span>{item.submittedAt}</span>
            </div>

            {/* Action buttons */}
            <AnimatePresence mode="wait">
              {!actionDone ? (
                <motion.div
                  key="actions"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-wrap gap-2 pt-2"
                >
                  <button
                    onClick={() => handleAction("publish")}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white shimmer-btn gradient-ig"
                  >
                    <Check className="w-4 h-4" />
                    Approve & Publish
                  </button>
                  <button
                    onClick={() => handleAction("approve")}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all hover:brightness-110"
                    style={{ backgroundColor: "rgba(34,197,94,0.15)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.25)" }}>
                    <CheckCircle className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => handleAction("revision")}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:brightness-110"
                    style={{ backgroundColor: "rgba(249,115,22,0.1)", color: "#f97316", border: "1px solid rgba(249,115,22,0.2)" }}>
                    <RefreshCw className="w-4 h-4" />
                    {showRevisionField ? "Send Revision" : "Request Revision"}
                  </button>
                  <button
                    onClick={() => handleAction("reject")}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all hover:brightness-110"
                    style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>
                    <X className="w-4 h-4" />
                    Reject
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-3 py-4 rounded-xl"
                  style={{ backgroundColor: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-5 h-5" style={{ color: "#22c55e" }} />
                    <span className="text-sm font-semibold" style={{ color: "#22c55e" }}>Done!</span>
                  </div>
                  <button
                    onClick={() => window.location.href = "/schedule"}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all hover:brightness-110"
                    style={{ background: "linear-gradient(135deg, #833ab4, #ff0069)" }}
                  >
                    Next Section
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span style={{ color: "#aaa", fontWeight: 400 }}>Schedule</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// ─── Empty State ───────────────────────────────────────────────────────────────

function EmptyState({ tab }: { tab: TabFilter }) {
  const messages: Record<TabFilter, string> = {
    all: "No approval items yet. Check back soon.",
    pending: "No items waiting for review right now.",
    approved: "No approved items yet.",
    revision: "No items need revisions.",
    published: "No items have been published yet.",
  };
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <CheckCircle className="w-7 h-7" style={{ color: "#a8a8a8" }} />
      </div>
      <p className="text-sm font-medium text-white mb-1">Nothing here</p>
      <p className="text-xs" style={{ color: "#a8a8a8" }}>{messages[tab]}</p>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function ApprovalsPage() {
  const [tab, setTab] = useState<TabFilter>("all");
  const [selectedAccount, setSelectedAccount] = useState(ACCOUNTS[0]);
  const [selectedType, setSelectedType] = useState(CONTENT_TYPES[0]);
  const [selectedItem, setSelectedItem] = useState<ApprovalItem | null>(null);
  const [items, setItems] = useState(ITEMS);

  const counts = {
    pending:   items.filter(i => i.status === "pending").length,
    awaiting:  items.filter(i => i.status === "pending").length,
    approvedToday: items.filter(i => i.status === "approved").length,
    publishedThisWeek: items.filter(i => i.status === "published").length,
  };

  const filtered = items.filter(item => {
    if (tab !== "all" && item.status !== tab) return false;
    if (selectedAccount !== "All Accounts" && item.account !== selectedAccount) return false;
    if (selectedType !== "All Types" && item.contentType !== selectedType) return false;
    return true;
  });

  const SCHEDULE_KEY = "iginfull-schedule";
  const handleStatusChange = (id: string, status: ApprovalStatus) => {
    setItems(prev => prev.map(i => (i.id === id ? { ...i, status } : i)));

    // On approve (or approve & publish), push to the schedule pipeline
    if (status === "approved" || status === "published") {
      const item = items.find(i => i.id === id);
      if (item) {
        const scheduled = {
          id: `scheduled-${Date.now()}`,
          contentType: item.contentType,
          caption: item.caption,
          hashtags: item.hashtags,
          account: item.account,
          accountColor: item.accountColor,
          status: "scheduled",
          scheduledAt: new Date().toISOString(),
        };
        try {
          const existing = JSON.parse(localStorage.getItem(SCHEDULE_KEY) || "[]");
          localStorage.setItem(SCHEDULE_KEY, JSON.stringify([scheduled, ...existing]));
        } catch { /* non-blocking */ }
      }
    }
  };

  const TABS: { key: TabFilter; label: string }[] = [
    { key: "all",       label: "All" },
    { key: "pending",   label: "Pending" },
    { key: "approved",  label: "Approved" },
    { key: "revision",  label: "Revisions" },
    { key: "published", label: "Published" },
  ];

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        {/* Top Bar */}
        <div className="sticky top-0 z-20 px-8 py-5 flex items-center justify-between"
          style={{ backgroundColor: "var(--background)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div>
            <h1 className="text-2xl font-bold text-white">Approvals</h1>
            <p className="text-xs mt-0.5" style={{ color: "#a8a8a8" }}>PTP — Pre-Turned-Post · Client Review Portal</p>
          </div>

          {/* Tab filters with glowing underline */}
          <div className="flex items-center gap-1 p-1 rounded-xl" style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.08)" }}>
            {TABS.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all relative ${tab === key ? "tab-glow-active" : "text-[#a8a8a8] hover:text-white"}`}
                style={{
                  backgroundColor: tab === key ? "#ff0069" : "transparent",
                  color: tab === key ? "#ffffff" : "#a8a8a8",
                }}
              >
                {label}
                {tab === key && <span className="tab-glow-underline" />}
              </button>
            ))}
          </div>
        </div>

        <div className="px-8 py-6 space-y-6">

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4">
            <StatCard label="Pending Review" value={counts.pending} icon={<Clock className="w-5 h-5" />} color="#f59e0b" />
            <StatCard label="Awaiting Client" value={counts.awaiting} icon={<AlertCircle className="w-5 h-5" />} color="#ff0069" />
            <StatCard label="Approved Today" value={counts.approvedToday} icon={<CheckCircle className="w-5 h-5" />} color="#22c55e" />
            <StatCard label="Published This Week" value={counts.publishedThisWeek} icon={<Send className="w-5 h-5" />} color="#833ab4" />
          </div>

          {/* Filter Row */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-xs" style={{ color: "#a8a8a8" }}>
              <Filter className="w-3.5 h-3.5" />
              <span className="font-semibold uppercase tracking-wider">Filter:</span>
            </div>

            {/* Account dropdown */}
            <div className="relative">
              <select
                value={selectedAccount}
                onChange={e => setSelectedAccount(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 rounded-xl text-xs font-medium text-white outline-none cursor-pointer transition-all"
                style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                {ACCOUNTS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: "#a8a8a8" }} />
            </div>

            {/* Content type dropdown */}
            <div className="relative">
              <select
                value={selectedType}
                onChange={e => setSelectedType(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 rounded-xl text-xs font-medium text-white outline-none cursor-pointer transition-all"
                style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                {CONTENT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none" style={{ color: "#a8a8a8" }} />
            </div>

            {/* Date range */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium"
              style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.08)", color: "#a8a8a8" }}>
              <Calendar className="w-3.5 h-3.5" />
              <span>Last 30 days</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </div>

            {/* Active filter count */}
            {(selectedAccount !== "All Accounts" || selectedType !== "All Types") && (
              <button
                onClick={() => { setSelectedAccount("All Accounts"); setSelectedType("All Types"); }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all"
                style={{ backgroundColor: "rgba(255,0,105,0.1)", color: "#ff0069", border: "1px solid rgba(255,0,105,0.2)" }}>
                <X className="w-3 h-3" />
                Clear
              </button>
            )}

            <span className="ml-auto text-xs" style={{ color: "#a8a8a8" }}>
              {filtered.length} item{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <EmptyState tab={tab} />
              ) : (
                filtered.map(item => (
                  <ApprovalCard
                    key={item.id}
                    item={item}
                    onViewApprove={setSelectedItem}
                  />
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {selectedItem && (
          <DetailModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onStatusChange={handleStatusChange}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
