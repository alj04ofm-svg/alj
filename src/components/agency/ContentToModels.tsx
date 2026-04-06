"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Paperclip, MessageSquare, Image, Film,
  CheckCircle2, Clock, ChevronDown, ChevronUp,
  Star, AlertCircle, ArrowRight, Filter, Plus,
  ThumbsUp, ThumbsDown, RefreshCw, X,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Chatter {
  id: string;
  name: string;
  role: string;
  models: string[];
  fansly: string[];
  onlyfans: string[];
}

interface ContentItem {
  id: string;
  chatter_id: string;
  chatter_name: string;
  model: string;
  platform: "fansly" | "onlyfans";
  content_type: "reel" | "post" | "story" | "script" | "caption" | "photo" | "feedback";
  subject: string;
  message: string;
  status: "sent" | "pending" | "approved" | "revision";
  sent_at: string;
  feedback?: {
    rating: number;
    comment: string;
    given_at: string;
  };
}

// ─── Static data (replace with API calls to shift tracker + content pipeline) ─

const CHATTERS: Chatter[] = [
  {
    id: "sofia",
    name: "Sofia",
    role: "chatter",
    models: ["Amam", "Ming's Fansly", "Kitten's Fansly", "Lalita", "Ollie", "Tyler"],
    fansly: ["Amam", "Ming's Fansly", "Kitten's Fansly"],
    onlyfans: ["Lalita", "Ollie", "Tyler"],
  },
  {
    id: "kristine",
    name: "Kristine",
    role: "chatter",
    models: ["Amam", "Ren", "Kiroko Fansly", "Ming's Fansly", "Lia's Fansly", "Ollie", "Tyler"],
    fansly: ["Amam", "Ren", "Kiroko Fansly", "Ming's Fansly", "Lia's Fansly"],
    onlyfans: ["Ren", "Ollie", "Tyler"],
  },
  {
    id: "macy",
    name: "Macy",
    role: "chatter",
    models: ["Lalita", "Ella Mira", "Kitten's Fansly", "Kiyomi", "Ruby Chan", "Cam"],
    fansly: ["Lalita", "Ella Mira", "Kitten's Fansly"],
    onlyfans: ["Kiyomi", "Ruby Chan", "Cam"],
  },
  {
    id: "dhene",
    name: "Dhene",
    role: "editor",
    models: [],
    fansly: [],
    onlyfans: [],
  },
];

const ALL_MODELS = [
  "Amam", "Ming's Fansly", "Kitten's Fansly",
  "Lalita", "Ollie", "Tyler", "Ren",
  "Kiroko Fansly", "Lia's Fansly",
  "Ella Mira", "Kiyomi", "Ruby Chan", "Cam",
];

const CONTENT_TYPES = [
  { id: "reel", label: "Reel / Clip", emoji: "🎬" },
  { id: "post", label: "Post", emoji: "📸" },
  { id: "story", label: "Story", emoji: "📱" },
  { id: "caption", label: "Caption", emoji: "✍️" },
  { id: "script", label: "Script / Idea", emoji: "📝" },
  { id: "feedback", label: "Feedback", emoji: "💬" },
  { id: "photo", label: "Photo Set", emoji: "🖼️" },
];

// ─── Sample history ───────────────────────────────────────────────────────────

const SAMPLE_HISTORY: ContentItem[] = [
  {
    id: "1",
    chatter_id: "sofia",
    chatter_name: "Sofia",
    model: "Amam",
    platform: "fansly",
    content_type: "reel",
    subject: "New bedroom lifestyle reel — Amam",
    message: "Hey! Here is the reel we discussed — let me know what you think of the pacing. The first 3 seconds need more energy.",
    status: "approved",
    sent_at: "2026-04-05T14:30:00",
    feedback: { rating: 5, comment: "Love it! Let's do more like this 💕", given_at: "2026-04-05T16:00:00" },
  },
  {
    id: "2",
    chatter_id: "kristine",
    chatter_name: "Kristine",
    model: "Ren",
    platform: "onlyfans",
    content_type: "caption",
    subject: "Caption for Ren's Thursday post",
    message: "Draft caption ready — let me know if you want me to add the emoji CTA or keep it more subtle.",
    status: "revision",
    sent_at: "2026-04-05T11:00:00",
    feedback: { rating: 3, comment: "Can we make the hook stronger? Try starting with a question instead.", given_at: "2026-04-05T12:30:00" },
  },
  {
    id: "3",
    chatter_id: "macy",
    chatter_name: "Macy",
    model: "Lalita",
    platform: "fansly",
    content_type: "script",
    subject: "Script for Lalita's Easter weekend",
    message: "Here's the script outline — needs your sign-off before we film. Main angle is 'at home comfort'.",
    status: "pending",
    sent_at: "2026-04-06T09:15:00",
  },
  {
    id: "4",
    chatter_id: "sofia",
    chatter_name: "Sofia",
    model: "Tyler",
    platform: "onlyfans",
    content_type: "feedback",
    subject: "Feedback on Tyler's latest post performance",
    message: "Tyler's engagement dropped 20% this week vs last. Here are some ideas to course-correct: more POV content, earlier posting time.",
    status: "approved",
    sent_at: "2026-04-04T17:00:00",
    feedback: { rating: 4, comment: "Good insights, let's try the POV angle this week.", given_at: "2026-04-04T18:30:00" },
  },
];

// ─── Helper ────────────────────────────────────────────────────────────────────

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function statusStyle(status: ContentItem["status"]) {
  switch (status) {
    case "approved": return { bg: "rgba(34,197,94,0.1)", text: "#22c55e", label: "Approved ✅" };
    case "revision": return { bg: "rgba(251,191,36,0.1)", text: "#fbbf24", label: "Needs Revision 🔄" };
    case "pending": return { bg: "rgba(148,163,184,0.1)", text: "#94a3b8", label: "Pending ⏳" };
    default: return { bg: "rgba(148,163,184,0.1)", text: "#94a3b8", label: status };
  }
}

// ─── Compose Form ──────────────────────────────────────────────────────────────

function ComposeForm({ onSent }: { onSent: () => void }) {
  const [chatterId, setChatterId] = useState("");
  const [platform, setPlatform] = useState<"fansly" | "onlyfans">("fansly");
  const [model, setModel] = useState("");
  const [contentType, setContentType] = useState("reel");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const chatter = CHATTERS.find((c) => c.id === chatterId);
  const modelOptions =
    !chatter || platform === "both"
      ? ALL_MODELS
      : platform === "fansly"
      ? chatter.fansly.length > 0
        ? chatter.fansly
        : chatter.models.filter((m) => !chatter.onlyfans.includes(m))
      : chatter.onlyfans.length > 0
      ? chatter.onlyfans
      : chatter.models;

  const canSend = chatterId && model && subject && message;

  const handleSend = async () => {
    if (!canSend) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
    onSent();
    setTimeout(() => {
      setChatterId("");
      setModel("");
      setSubject("");
      setMessage("");
      setSent(false);
    }, 2000);
  };

  return (
    <div className="card-nva" style={{ padding: 24, marginBottom: 24 }}>
      <div style={{ fontSize: 14, fontWeight: 700, color: "var(--nva-text)", marginBottom: 16 }}>
        ✉️ Send Content / Feedback
      </div>

      <AnimatePresence>
        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              padding: 32, textAlign: "center",
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.2)",
              borderRadius: 12,
            }}
          >
            <CheckCircle2 size={32} style={{ color: "#22c55e", marginBottom: 8 }} />
            <div style={{ fontSize: 14, fontWeight: 700, color: "#22c55e" }}>Sent!</div>
            <div style={{ fontSize: 12, color: "var(--nva-muted)", marginTop: 4 }}>
              {chatter?.name} will receive this shortly.
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Step 1: Who */}
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: "var(--nva-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Step 1 — Select Chatter
              </div>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {CHATTERS.filter((c) => c.role === "chatter").map((c) => (
                  <button
                    key={c.id}
                    onClick={() => { setChatterId(c.id); setModel(""); }}
                    style={{
                      padding: "7px 14px", borderRadius: 10, cursor: "pointer",
                      fontSize: 12, fontWeight: 600,
                      background: chatterId === c.id ? "rgba(212,168,83,0.15)" : "var(--nva-surface-2)",
                      border: chatterId === c.id ? "1px solid rgba(212,168,83,0.3)" : "1px solid var(--nva-border)",
                      color: chatterId === c.id ? "var(--nva-gold)" : "var(--nva-muted)",
                      transition: "all 0.15s",
                    }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Model + Platform */}
            {chatterId && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--nva-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Step 2 — Platform & Model
                </div>
                <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                  {(["fansly", "onlyfans"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => { setPlatform(p); setModel(""); }}
                      style={{
                        padding: "6px 14px", borderRadius: 8, cursor: "pointer",
                        fontSize: 12, fontWeight: 600,
                        background: platform === p
                          ? p === "fansly" ? "rgba(139,92,246,0.15)" : "rgba(5,150,105,0.15)"
                          : "var(--nva-surface-2)",
                        border: platform === p
                          ? p === "fansly" ? "1px solid rgba(139,92,246,0.3)" : "1px solid rgba(5,150,105,0.3)"
                          : "1px solid var(--nva-border)",
                        color: platform === p ? (p === "fansly" ? "#a78bfa" : "#34d399") : "var(--nva-muted)",
                        transition: "all 0.15s",
                      }}
                    >
                      {p === "fansly" ? "🍆 Fansly" : "🌐 OnlyFans"}
                    </button>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {modelOptions.map((m) => (
                    <button
                      key={m}
                      onClick={() => setModel(m)}
                      style={{
                        padding: "5px 12px", borderRadius: 8, cursor: "pointer",
                        fontSize: 11, fontWeight: 600,
                        background: model === m ? "rgba(212,168,83,0.15)" : "var(--nva-surface-2)",
                        border: model === m ? "1px solid rgba(212,168,83,0.3)" : "1px solid var(--nva-border)",
                        color: model === m ? "var(--nva-gold)" : "var(--nva-muted)",
                        transition: "all 0.15s",
                      }}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Content type */}
            {model && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--nva-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Step 3 — Content Type
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {CONTENT_TYPES.map((ct) => (
                    <button
                      key={ct.id}
                      onClick={() => setContentType(ct.id)}
                      style={{
                        padding: "6px 12px", borderRadius: 8, cursor: "pointer",
                        fontSize: 12, fontWeight: 600,
                        background: contentType === ct.id ? "rgba(212,168,83,0.15)" : "var(--nva-surface-2)",
                        border: contentType === ct.id ? "1px solid rgba(212,168,83,0.3)" : "1px solid var(--nva-border)",
                        color: contentType === ct.id ? "var(--nva-gold)" : "var(--nva-muted)",
                        transition: "all 0.15s",
                      }}
                    >
                      {ct.emoji} {ct.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Message */}
            {model && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "var(--nva-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Step 4 — Subject & Message
                </div>
                <input
                  className="input-nva"
                  placeholder="Subject line..."
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  style={{ marginBottom: 10, height: 40, fontSize: 13 }}
                />
                <textarea
                  className="input-nva"
                  placeholder="Write your message, instructions, or feedback here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  style={{ width: "100%", resize: "vertical", fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}
                />
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={handleSend}
                    disabled={!canSend || sending}
                    style={{
                      padding: "9px 20px", borderRadius: 10, cursor: canSend && !sending ? "pointer" : "not-allowed",
                      background: canSend ? "var(--nva-gold)" : "var(--nva-surface-2)",
                      border: "none",
                      color: canSend ? "#0a0a0f" : "var(--nva-muted)",
                      fontWeight: 700, fontSize: 13, display: "flex", alignItems: "center", gap: 8,
                      opacity: sending ? 0.7 : 1, transition: "all 0.15s",
                    }}
                  >
                    {sending ? (
                      <><RefreshCw size={13} style={{ animation: "spin 1s linear infinite" }} /> Sending...</>
                    ) : (
                      <><Send size={13} /> Send to {chatter?.name}</>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── History Item ──────────────────────────────────────────────────────────────

function HistoryItem({ item }: { item: ContentItem }) {
  const [expanded, setExpanded] = useState(false);
  const sc = statusStyle(item.status);
  const ct = CONTENT_TYPES.find((c) => c.id === item.content_type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-nva"
      style={{ padding: 0, overflow: "hidden", marginBottom: 8 }}
    >
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: "14px 16px", cursor: "pointer",
          display: "flex", alignItems: "center", gap: 12,
        }}
      >
        {/* Icon */}
        <div style={{
          width: 36, height: 36, borderRadius: 9,
          background: item.platform === "fansly" ? "rgba(139,92,246,0.12)" : "rgba(5,150,105,0.12)",
          border: item.platform === "fansly" ? "1px solid rgba(139,92,246,0.2)" : "1px solid rgba(5,150,105,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 14,
        }}>
          {item.platform === "fansly" ? "🍆" : "🌐"}
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--nva-text)" }}>{item.subject}</span>
          </div>
          <div style={{ fontSize: 11, color: "var(--nva-muted)" }}>
            {ct?.emoji} {ct?.label} · {item.model} · via {item.chatter_name}
          </div>
        </div>

        {/* Meta */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
          <span style={{
            padding: "2px 8px", borderRadius: 20,
            background: sc.bg, color: sc.text,
            fontSize: 10, fontWeight: 600,
          }}>
            {sc.label}
          </span>
          <span style={{ fontSize: 10, color: "var(--nva-muted)" }}>{timeAgo(item.sent_at)}</span>
        </div>

        {expanded ? (
          <ChevronUp size={14} style={{ color: "var(--nva-muted)", flexShrink: 0 }} />
        ) : (
          <ChevronDown size={14} style={{ color: "var(--nva-muted)", flexShrink: 0 }} />
        )}
      </div>

      {/* Expanded */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 16px 16px", borderTop: "1px solid var(--nva-border)", paddingTop: 12 }}>
              <div style={{
                padding: "10px 14px", borderRadius: 10,
                background: "var(--nva-surface-2)",
                fontSize: 12, color: "var(--nva-muted)", lineHeight: 1.7,
                marginBottom: 12,
              }}>
                {item.message}
              </div>

              {item.feedback ? (
                <div style={{
                  padding: "10px 14px", borderRadius: 10,
                  background: "rgba(34,197,94,0.06)",
                  border: "1px solid rgba(34,197,94,0.15)",
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#22c55e", marginBottom: 6 }}>
                    💬 Model Feedback · {timeAgo(item.feedback.given_at)}
                  </div>
                  <div style={{ display: "flex", gap: 2, marginBottom: 6 }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        fill={i < item.feedback!.rating ? "#d4a853" : "transparent"}
                        stroke={i < item.feedback!.rating ? "#d4a853" : "var(--nva-muted-2)"}
                      />
                    ))}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--nva-text)", lineHeight: 1.6 }}>
                    "{item.feedback.comment}"
                  </div>
                </div>
              ) : (
                <div style={{
                  padding: "10px 14px", borderRadius: 10,
                  background: "var(--nva-surface-2)",
                  fontSize: 12, color: "var(--nva-muted)", textAlign: "center",
                }}>
                  ⏳ Awaiting feedback from {item.model}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ContentToModels() {
  const [filter, setFilter] = useState<"all" | "pending" | "revision" | "approved">("all");
  const [refreshKey, setRefreshKey] = useState(0);

  const history = SAMPLE_HISTORY.filter(
    (h) => filter === "all" || h.status === filter
  );

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--nva-text)" }}>Content & Feedback</h2>
          <span style={{
            padding: "3px 10px", borderRadius: 20,
            background: "rgba(139,92,246,0.1)",
            border: "1px solid rgba(139,92,246,0.2)",
            fontSize: 10, fontWeight: 700, color: "#a78bfa",
          }}>
            💬 ↔️ 🤖
          </span>
        </div>
        <p style={{ fontSize: 12, color: "var(--nva-muted)" }}>
          Send content, scripts, captions, and feedback directly to chatters — with model-level feedback loops.
        </p>
      </div>

      {/* Compose */}
      <ComposeForm onSent={() => setRefreshKey((k) => k + 1)} key={`compose-${refreshKey}`} />

      {/* Filters */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--nva-text)" }}>
          History ({history.length})
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {(["all", "pending", "revision", "approved"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "4px 12px", borderRadius: 8, cursor: "pointer",
                fontSize: 11, fontWeight: 600,
                background: filter === f ? "rgba(212,168,83,0.12)" : "transparent",
                border: filter === f ? "1px solid rgba(212,168,83,0.2)" : "1px solid var(--nva-border)",
                color: filter === f ? "var(--nva-gold)" : "var(--nva-muted)",
                transition: "all 0.15s", textTransform: "capitalize",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* History list */}
      {history.length === 0 ? (
        <div style={{ textAlign: "center", padding: 40, color: "var(--nva-muted)", fontSize: 13 }}>
          No items in this category yet.
        </div>
      ) : (
        history.map((item) => (
          <HistoryItem key={`${item.id}-${refreshKey}`} item={item} />
        ))
      )}
    </div>
  );
}
