"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderOpen, Plus, Search, Filter, Upload, Clock,
  CheckCircle2, AlertCircle, ChevronDown, X, Image,
  Film, Megaphone, Star, Send, CloudUpload, ExternalLink
} from "lucide-react";

type ContentType = "drip" | "ppv" | "custom" | "reel" | "picture";
type Status = "pending" | "in-review" | "complete" | "overdue";

const CONTENT_TYPES: { id: ContentType; label: string; icon: React.ElementType; color: string }[] = [
  { id: "drip", label: "Drip Campaign", icon: Clock, color: "#f59e0b" },
  { id: "ppv", label: "PPV Content", icon: Star, color: "#d4a853" },
  { id: "custom", label: "Custom Request", icon: Film, color: "#a07830" },
  { id: "reel", label: "Reels / Shorts", icon: Megaphone, color: "#d4a853" },
  { id: "picture", label: "Pictures", icon: Image, color: "#f0c97a" },
];

const MOCK_REQUESTS = [
  { id: "REQ-441", model: "Bella", type: "drip" as ContentType, title: "Spring Lingerie Drip — Week 3", items: ["3 teaser photos", "1 promo clip (15s)", "Caption copy draft"], status: "pending" as Status, due: "2 days", assignee: "Jamie (Marketing)", created: "Apr 2" },
  { id: "REQ-440", model: "Mika", type: "ppv" as ContentType, title: "Solo PPV Set — April Special", items: ["8 photo set", "3 video clips (30s each)", "Pricing tier guide"], status: "in-review" as Status, due: "Today", assignee: "Jamie (Marketing)", created: "Apr 1" },
  { id: "REQ-439", model: "Luna", type: "reel" as ContentType, title: "3-Part Story Reel Series", items: ["Concept & script", "3 video clips", "Captions + hashtags"], status: "complete" as Status, due: "Mar 30", assignee: "Self", created: "Mar 27" },
  { id: "REQ-438", model: "Sofia", type: "custom" as ContentType, title: "Custom Fan Request — Premium Bundle", items: ["Custom video (2min)", "Personalized caption", "Thank-you DM copy"], status: "overdue" as Status, due: "3 days ago", assignee: "Jamie (Marketing)", created: "Mar 28" },
  { id: "REQ-437", model: "Bella", type: "picture" as ContentType, title: "Beach Photo Set — 12 images", items: ["12 edited photos", "B&W alternatives", "Square + portrait crops"], status: "pending" as Status, due: "5 days", assignee: "Bella (Self)", created: "Apr 3" },
];

const STATUS_CONFIG: Record<Status, { label: string; badge: string; icon: React.ElementType; className: string }> = {
  pending: { label: "Pending", badge: "badge-pending", icon: Clock, className: "item-pending" },
  "in-review": { label: "In Review", badge: "badge-pending", icon: Clock, className: "item-pending" },
  complete: { label: "Complete", badge: "badge-complete", icon: CheckCircle2, className: "item-complete" },
  overdue: { label: "Overdue", badge: "badge-overdue", icon: AlertCircle, className: "item-overdue" },
};

interface Props {
  onNavigate?: (view: string) => void;
}

export function ModelRequests({ onNavigate }: Props) {
  const [activeTab, setActiveTab] = useState<ContentType | "all">("all");
  const [showCreate, setShowCreate] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<typeof MOCK_REQUESTS[0] | null>(null);
  const [filterStatus, setFilterStatus] = useState<Status | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [newRequest, setNewRequest] = useState({
    model: "", type: "drip" as ContentType, title: "", due: "", assignee: "", items: ["", "", ""],
  });

  const filtered = MOCK_REQUESTS.filter(r => {
    const matchType = activeTab === "all" || r.type === activeTab;
    const matchStatus = filterStatus === "all" || r.status === filterStatus;
    const matchSearch = !searchQuery || r.title.toLowerCase().includes(searchQuery.toLowerCase()) || r.model.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchStatus && matchSearch;
  });

  const counts = {
    all: MOCK_REQUESTS.length,
    pending: MOCK_REQUESTS.filter(r => r.status === "pending" || r.status === "in-review").length,
    overdue: MOCK_REQUESTS.filter(r => r.status === "overdue").length,
    complete: MOCK_REQUESTS.filter(r => r.status === "complete").length,
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--nva-text)", marginBottom: 4 }}>Model Requests</h2>
          <p style={{ fontSize: 12, color: "var(--nva-muted)" }}>Manage content briefs and track submissions — replaces Content Snare</p>
        </div>
        <button className="btn-nva-primary" onClick={() => setShowCreate(true)}>
          <Plus size={15} /> New Request
        </button>
      </div>

      {/* Summary stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Total Requests", value: MOCK_REQUESTS.length, color: "var(--nva-gold)" },
          { label: "Pending / In Review", value: counts.pending, color: "#f59e0b" },
          { label: "Overdue", value: counts.overdue, color: "var(--nva-red)" },
          { label: "Completed This Week", value: 3, color: "var(--nva-green)" },
        ].map((s, i) => (
          <div key={i} className="card-nva" style={{ padding: "16px" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color, letterSpacing: "-0.02em" }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "var(--nva-muted)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Auto-upload status */}
      <div style={{ padding: "12px 16px", borderRadius: 10, background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)", display: "flex", gap: 10, alignItems: "center", marginBottom: 24 }}>
        <CloudUpload size={15} style={{ color: "var(--nva-green)", flexShrink: 0 }} />
        <span style={{ fontSize: 12, color: "var(--nva-muted)" }}>
          <strong style={{ color: "var(--nva-green)" }}>Auto-upload active</strong> — Completed submissions are automatically uploaded to Google Drive within 2 minutes of submission.
        </span>
        <a href="#" style={{ fontSize: 11, color: "var(--nva-gold)", display: "flex", alignItems: "center", gap: 3, marginLeft: "auto" }}>
          Open Drive <ExternalLink size={10} />
        </a>
      </div>

      {/* Content Type Filter */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto", paddingBottom: 4 }}>
        <button
          onClick={() => setActiveTab("all")}
          style={{
            padding: "7px 14px", borderRadius: 20, cursor: "pointer", fontSize: 12, fontWeight: 600,
            background: activeTab === "all" ? "rgba(212,168,83,0.12)" : "var(--nva-surface)",
            border: activeTab === "all" ? "1px solid rgba(212,168,83,0.3)" : "1px solid var(--nva-border)",
            color: activeTab === "all" ? "var(--nva-gold)" : "var(--nva-muted)", transition: "all 0.15s", whiteSpace: "nowrap",
          }}
        >
          All ({counts.all})
        </button>
        {CONTENT_TYPES.map((ct) => {
          const count = MOCK_REQUESTS.filter(r => r.type === ct.id && (r.status === "pending" || r.status === "in-review")).length;
          return (
            <button
              key={ct.id}
              onClick={() => setActiveTab(ct.id)}
              style={{
                padding: "7px 14px", borderRadius: 20, cursor: "pointer", fontSize: 12, fontWeight: 600,
                background: activeTab === ct.id ? `${ct.color}18` : "var(--nva-surface)",
                border: activeTab === ct.id ? `1px solid ${ct.color}40` : "1px solid var(--nva-border)",
                color: activeTab === ct.id ? ct.color : "var(--nva-muted)", transition: "all 0.15s", whiteSpace: "nowrap",
              }}
            >
              {ct.label} {count > 0 && <span style={{ opacity: 0.8 }}>({count})</span>}
            </button>
          );
        })}
      </div>

      {/* Search + Filter */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <div style={{ position: "relative", flex: 1 }}>
          <Search size={13} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--nva-muted-2)" }} />
          <input
            className="input-nva"
            placeholder="Search by model or request title..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ paddingLeft: 34, height: 38, fontSize: 13 }}
          />
        </div>
        <select
          className="input-nva"
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value as Status | "all")}
          style={{ height: 38, fontSize: 12, width: 160, paddingLeft: 12 }}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-review">In Review</option>
          <option value="complete">Complete</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>

      {/* Request List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <AnimatePresence>
          {filtered.map((req, i) => {
            const statusCfg = STATUS_CONFIG[req.status];
            const typeCfg = CONTENT_TYPES.find(ct => ct.id === req.type)!;
            const StatusIcon = statusCfg.icon;
            const TypeIcon = typeCfg.icon;
            const isPending = req.status === "pending" || req.status === "in-review";

            return (
              <motion.div
                key={req.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`card-nva ${statusCfg.className}`}
                style={{ padding: "16px 18px", cursor: "pointer", borderLeft: isPending ? `3px solid #f59e0b` : req.status === "overdue" ? `3px solid var(--nva-red)` : `3px solid var(--nva-green)` }}
                onClick={() => setSelectedRequest(req)}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                  {/* Model avatar */}
                  <div style={{
                    width: 42, height: 42, borderRadius: 10,
                    background: `linear-gradient(135deg, ${typeCfg.color}25, ${typeCfg.color}12)`,
                    border: `1px solid ${typeCfg.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, fontSize: 15, fontWeight: 800, color: typeCfg.color,
                  }}>
                    {req.model[0]}
                  </div>

                  <div style={{ flex: 1, overflow: "hidden" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 10, color: "var(--nva-muted-2)", fontWeight: 600 }}>{req.id}</span>
                      <span style={{ fontSize: 10, color: "var(--nva-muted-2)" }}>·</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "var(--nva-text)" }}>{req.title}</span>
                    </div>

                    {/* Content items */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 8 }}>
                      {req.items.map((item, j) => (
                        <span key={j} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6, background: "var(--nva-surface-2)", color: "var(--nva-muted)", border: "1px solid var(--nva-border)" }}>
                          {item}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                      <span className={`badge-nva ${statusCfg.badge}`} style={{ fontSize: 10 }}>
                        <StatusIcon size={9} /> {statusCfg.label}
                      </span>
                      <span style={{ fontSize: 11, color: "var(--nva-muted)" }}>
                        <strong style={{ color: "var(--nva-text)" }}>{req.due}</strong> due
                      </span>
                      <span style={{ fontSize: 11, color: "var(--nva-muted-2)" }}>Assigned: {req.assignee}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", borderRadius: 8, background: `${typeCfg.color}12`, border: `1px solid ${typeCfg.color}25` }}>
                      <TypeIcon size={11} style={{ color: typeCfg.color }} />
                      <span style={{ fontSize: 10, fontWeight: 600, color: typeCfg.color }}>{typeCfg.label}</span>
                    </div>
                    <span style={{ fontSize: 10, color: "var(--nva-muted-2)" }}>Created {req.created}</span>
                    {isPending && (
                      <span style={{ fontSize: 10, color: "#f59e0b", fontWeight: 600 }}>Needs upload</span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 0", color: "var(--nva-muted)" }}>
            <FolderOpen size={32} style={{ margin: "0 auto 12px", display: "block", opacity: 0.4 }} />
            <p style={{ fontSize: 14, fontWeight: 600 }}>No requests found</p>
            <p style={{ fontSize: 12 }}>Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Create Request Modal */}
      <AnimatePresence>
        {showCreate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCreate(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="card-nva"
              style={{ width: "100%", maxWidth: 580, padding: 0, overflow: "hidden", maxHeight: "90vh", overflowY: "auto" }}
            >
              <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--nva-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--nva-text)" }}>New Content Request</h3>
                  <p style={{ fontSize: 11, color: "var(--nva-muted)" }}>Send a content brief to a model</p>
                </div>
                <button onClick={() => setShowCreate(false)} style={{ width: 30, height: 30, borderRadius: 8, background: "var(--nva-surface-2)", border: "1px solid var(--nva-border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--nva-muted)" }}>
                  <X size={14} />
                </button>
              </div>
              <div style={{ padding: "24px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--nva-muted)", display: "block", marginBottom: 6 }}>Model Name</label>
                    <select className="input-nva" value={newRequest.model} onChange={e => setNewRequest({ ...newRequest, model: e.target.value })}>
                      <option value="">Select model...</option>
                      {["Bella", "Mika", "Luna", "Sofia", "Aria", "Nadia"].map(m => <option key={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--nva-muted)", display: "block", marginBottom: 6 }}>Content Type</label>
                    <select className="input-nva" value={newRequest.type} onChange={e => setNewRequest({ ...newRequest, type: e.target.value as ContentType })}>
                      {CONTENT_TYPES.map(ct => <option key={ct.id} value={ct.id}>{ct.label}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--nva-muted)", display: "block", marginBottom: 6 }}>Request Title</label>
                  <input className="input-nva" placeholder="e.g. Spring Collection — Week 2 Drip" value={newRequest.title} onChange={e => setNewRequest({ ...newRequest, title: e.target.value })} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--nva-muted)", display: "block", marginBottom: 6 }}>Due Date</label>
                    <input className="input-nva" type="date" value={newRequest.due} onChange={e => setNewRequest({ ...newRequest, due: e.target.value })} />
                  </div>
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--nva-muted)", display: "block", marginBottom: 6 }}>Assignee</label>
                    <select className="input-nva" value={newRequest.assignee} onChange={e => setNewRequest({ ...newRequest, assignee: e.target.value })}>
                      <option value="">Auto-assign...</option>
                      <option>Jamie (Marketing)</option>
                      <option>Self (Model)</option>
                      <option>Unassigned</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--nva-muted)", display: "block", marginBottom: 6 }}>Content Items (one per line)</label>
                  <textarea
                    className="input-nva"
                    rows={4}
                    placeholder={"3 teaser photos\n1 promo clip (15s)\nCaption copy draft"}
                    onChange={e => setNewRequest({ ...newRequest, items: e.target.value.split("\n") })}
                    style={{ resize: "vertical", minHeight: 90 }}
                  />
                </div>
              </div>
              <div style={{ padding: "16px 24px", borderTop: "1px solid var(--nva-border)", display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button className="btn-nva-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
                <button className="btn-nva-primary" onClick={() => setShowCreate(false)}>
                  <Send size={13} /> Send Request
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
