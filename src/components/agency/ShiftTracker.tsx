"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock, Calendar, ChevronLeft, ChevronRight, Users,
  Filter, Download, TrendingUp, CheckCircle2, Coffee,
  Play, Square, Wifi, WifiOff, RefreshCw, User,
  MessageSquare, Star, ArrowRight, AlertCircle, Check,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StaffMember {
  id: string;
  name: string;
  dept: string;
  role: string;
  connected: boolean;
  shift_start: string;
  shift_end: string;
  rest_day: string;
  status_cls: string;
  status_text: string;
  shift_started: string;
  shift_finished: string;
  is_on_shift: boolean;
  is_on_break: boolean;
  break_time: string;
  month_lates: number;
  ot_hrs: number;
  fansly_models: string[];
  onlyfans_models: string[];
  all_models: string[];
  approved_leaves: { date: string; reason: string; status: string }[];
  pending_leaves: { date: string; reason: string; status: string }[];
}

interface ShiftData {
  staff: StaffMember[];
  chatters: StaffMember[];
  total_staff: number;
  connected_count: number;
  chatter_count: number;
  va_count: number;
  pending_leaves: { date: string; reason: string; employee: string }[];
  pending_count: number;
  today: string;
  week_start: string;
  week_end: string;
  month_name: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const ROLE_LABELS: Record<string, string> = {
  owner: "👑 Owner",
  partner: "🤝 Partner",
  manager: "🗂️ Manager",
  chatter: "💬 Chatter",
  va: "🎬 VA",
  editor: "✂️ Editor",
};

function getInitials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "—";
  try {
    return new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function statusColor(cls: string): { bg: string; text: string; dot: string } {
  switch (cls) {
    case "on-shift":
      return { bg: "rgba(34,197,94,0.1)", text: "#22c55e", dot: "#22c55e" };
    case "on-break":
      return { bg: "rgba(251,191,36,0.1)", text: "#fbbf24", dot: "#fbbf24" };
    case "finished":
      return { bg: "rgba(59,130,246,0.1)", text: "#3b82f6", dot: "#3b82f6" };
    case "rest":
      return { bg: "rgba(148,163,184,0.1)", text: "#94a3b8", dot: "#94a3b8" };
    default:
      return { bg: "rgba(239,68,68,0.1)", text: "#ef4444", dot: "#ef4444" };
  }
}

const AVATAR_COLORS = [
  "#d4a853", "#a78bfa", "#34d399", "#60a5fa",
  "#f472b6", "#fb923c", "#e879f9", "#2dd4bf",
];

function avatarColor(name: string): string {
  let hash = 0;
  for (const c of name) hash = (hash << 5) - hash + c.charCodeAt(0);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  color,
  delay,
}: {
  label: string;
  value: string | number;
  sub?: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="card-nva"
      style={{ padding: 18 }}
    >
      <div style={{
        width: 34, height: 34, borderRadius: 9,
        background: `${color}15`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 10,
      }}>
        <Clock size={15} style={{ color }} />
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, color: "var(--nva-text)", letterSpacing: "-0.02em" }}>
        {value}
      </div>
      <div style={{ fontSize: 11, color: "var(--nva-muted)", marginTop: 4 }}>{label}</div>
      {sub && <div style={{ fontSize: 10, color, marginTop: 4 }}>{sub}</div>}
    </motion.div>
  );
}

function StaffCard({ s, onClick }: { s: StaffMember; onClick: () => void }) {
  const sc = statusColor(s.status_cls);
  const color = avatarColor(s.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-nva"
      style={{ padding: "16px 18px", cursor: "pointer" }}
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.15 }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10,
          background: `${color}20`,
          border: `1px solid ${color}40`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 800, fontSize: 13, color, flexShrink: 0,
        }}>
          {getInitials(s.name)}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "var(--nva-text)" }}>{s.name}</div>
          <div style={{ fontSize: 11, color: "var(--nva-muted)" }}>
            {ROLE_LABELS[s.role] ?? s.role} · {s.dept}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
          {s.connected ? (
            <span style={{ fontSize: 10, fontWeight: 600, color: "#22c55e", display: "flex", alignItems: "center", gap: 4 }}>
              <Wifi size={10} /> Bot
            </span>
          ) : (
            <span style={{ fontSize: 10, fontWeight: 600, color: "var(--nva-muted)", display: "flex", alignItems: "center", gap: 4 }}>
              <WifiOff size={10} /> No Bot
            </span>
          )}
          <span style={{
            padding: "2px 8px", borderRadius: 20,
            background: sc.bg, color: sc.text,
            fontSize: 10, fontWeight: 600,
          }}>
            {s.status_text}
          </span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
        {[
          { label: "Shift", value: s.shift_start !== "Always" ? `${s.shift_start}–${s.shift_end}` : "Always" },
          { label: "Rest", value: s.rest_day === "Always" ? "Always" : s.rest_day },
          { label: "Lates", value: s.month_lates, color: s.month_lates > 0 ? "#ef4444" : undefined },
        ].map(({ label, value, color: vc }) => (
          <div key={label} style={{ background: "var(--nva-surface-2)", borderRadius: 8, padding: "8px 10px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: "var(--nva-muted)", marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 12, fontWeight: 700, color: vc ?? "var(--nva-text)" }}>{value}</div>
          </div>
        ))}
      </div>

      {(s.fansly_models.length > 0 || s.onlyfans_models.length > 0) && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 10, color: "var(--nva-muted)", marginBottom: 6, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
            Models ({s.all_models.length})
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {s.fansly_models.slice(0, 3).map((m) => (
              <span key={m} style={{
                padding: "2px 8px", borderRadius: 6, fontSize: 10, fontWeight: 600,
                background: "rgba(139,92,246,0.12)", color: "#a78bfa",
                border: "1px solid rgba(139,92,246,0.2)",
              }}>
                🍆 {m}
              </span>
            ))}
            {s.onlyfans_models.slice(0, 3).map((m) => (
              <span key={m} style={{
                padding: "2px 8px", borderRadius: 6, fontSize: 10, fontWeight: 600,
                background: "rgba(5,150,105,0.12)", color: "#34d399",
                border: "1px solid rgba(5,150,105,0.2)",
              }}>
                🌐 {m}
              </span>
            ))}
            {s.all_models.length > 6 && (
              <span style={{ fontSize: 10, color: "var(--nva-muted)", padding: "2px 4px" }}>
                +{s.all_models.length - 6} more
              </span>
            )}
          </div>
        </div>
      )}

      {s.pending_leaves.length > 0 && (
        <div style={{
          padding: "8px 10px", borderRadius: 8,
          background: "rgba(251,191,36,0.08)",
          border: "1px solid rgba(251,191,36,0.15)",
          fontSize: 11, color: "#fbbf24",
        }}>
          ⏳ {s.pending_leaves.length} pending leave request{s.pending_leaves.length > 1 ? "s" : ""}
        </div>
      )}
    </motion.div>
  );
}

function StaffDetailPanel({ s, onClose }: { s: StaffMember; onClose: () => void }) {
  const sc = statusColor(s.status_cls);
  const color = avatarColor(s.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="card-nva"
      style={{ padding: 24, marginBottom: 16 }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 52, height: 52, borderRadius: 14,
            background: `${color}20`, border: `1px solid ${color}40`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 800, fontSize: 18, color,
          }}>
            {getInitials(s.name)}
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "var(--nva-text)" }}>{s.name}</div>
            <div style={{ fontSize: 12, color: "var(--nva-muted)", marginTop: 2 }}>
              {ROLE_LABELS[s.role] ?? s.role} · {s.dept}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{
            padding: "4px 12px", borderRadius: 20,
            background: sc.bg, color: sc.text, fontSize: 12, fontWeight: 600,
          }}>
            {s.status_text}
          </span>
          <button onClick={onClose} className="btn-nva-ghost" style={{ padding: "4px 8px", fontSize: 12 }}>
            Close
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 20 }}>
        {[
          { label: "Shift", value: s.shift_start !== "Always" ? `${s.shift_start}–${s.shift_end}` : "Always" },
          { label: "Rest Day", value: s.rest_day === "Always" ? "Always" : s.rest_day },
          { label: "Lates (Month)", value: s.month_lates, color: s.month_lates > 0 ? "#ef4444" : undefined },
          { label: "Overtime (Month)", value: s.ot_hrs > 0 ? `+${s.ot_hrs}h` : "—", color: s.ot_hrs > 0 ? "#22c55e" : undefined },
        ].map(({ label, value, color: vc }) => (
          <div key={label} style={{ background: "var(--nva-surface-2)", borderRadius: 10, padding: "12px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 10, color: "var(--nva-muted)", marginBottom: 4 }}>{label}</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: vc ?? "var(--nva-text)" }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Current shift status */}
      {s.is_on_shift && (
        <div style={{
          padding: "12px 16px", borderRadius: 10,
          background: sc.bg, border: `1px solid ${sc.dot}30`,
          marginBottom: 16,
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: sc.text, marginBottom: 6 }}>
            {s.status_text === "On Break" ? "☕ Currently on Break" : "⏳ Currently on Shift"}
          </div>
          <div style={{ fontSize: 11, color: "var(--nva-muted)" }}>
            Shift started: <strong style={{ color: "var(--nva-text)" }}>{s.shift_started}</strong>
            {s.break_time !== "—" && (
              <> · Break: <strong style={{ color: "var(--nva-text)" }}>{s.break_time}</strong></>
            )}
          </div>
        </div>
      )}

      {/* Bot connection */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
        {s.connected ? (
          <CheckCircle2 size={14} style={{ color: "#22c55e" }} />
        ) : (
          <AlertCircle size={14} style={{ color: "var(--nva-muted)" }} />
        )}
        <span style={{ fontSize: 12, color: s.connected ? "#22c55e" : "var(--nva-muted)", fontWeight: 600 }}>
          {s.connected ? "Connected to Telegram Bot" : "Not connected — needs Telegram setup"}
        </span>
      </div>

      {/* Models */}
      {(s.fansly_models.length > 0 || s.onlyfans_models.length > 0) && (
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--nva-text)", marginBottom: 10 }}>
            Assigned Models ({s.all_models.length})
          </div>
          {s.fansly_models.length > 0 && (
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 10, color: "var(--nva-muted)", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                🍆 Fansly
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {s.fansly_models.map((m) => (
                  <span key={m} style={{
                    padding: "4px 10px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                    background: "rgba(139,92,246,0.12)", color: "#a78bfa",
                    border: "1px solid rgba(139,92,246,0.2)",
                  }}>
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}
          {s.onlyfans_models.length > 0 && (
            <div>
              <div style={{ fontSize: 10, color: "var(--nva-muted)", marginBottom: 6, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                🌐 OnlyFans
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {s.onlyfans_models.map((m) => (
                  <span key={m} style={{
                    padding: "4px 10px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                    background: "rgba(5,150,105,0.12)", color: "#34d399",
                    border: "1px solid rgba(5,150,105,0.2)",
                  }}>
                    {m}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Leave */}
      {(s.approved_leaves.length > 0 || s.pending_leaves.length > 0) && (
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "var(--nva-text)", marginBottom: 8 }}>🏖 Leave</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {s.pending_leaves.map((lv, i) => (
              <div key={i} style={{
                padding: "8px 12px", borderRadius: 8,
                background: "rgba(251,191,36,0.08)",
                border: "1px solid rgba(251,191,36,0.15)",
                display: "flex", justifyContent: "space-between",
              }}>
                <span style={{ fontSize: 12, color: "#fbbf24" }}>{formatDate(lv.date)}</span>
                <span style={{ fontSize: 11, color: "var(--nva-muted)" }}>{lv.reason}</span>
                <span style={{ fontSize: 11, color: "#fbbf24", fontWeight: 600 }}>⏳ Pending</span>
              </div>
            ))}
            {s.approved_leaves.map((lv, i) => (
              <div key={i} style={{
                padding: "8px 12px", borderRadius: 8,
                background: "rgba(34,197,94,0.06)",
                border: "1px solid rgba(34,197,94,0.15)",
                display: "flex", justifyContent: "space-between",
              }}>
                <span style={{ fontSize: 12, color: "#22c55e" }}>{formatDate(lv.date)}</span>
                <span style={{ fontSize: 11, color: "var(--nva-muted)" }}>{lv.reason}</span>
                <span style={{ fontSize: 11, color: "#22c55e", fontWeight: 600 }}>✅ Approved</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ShiftTracker() {
  const [data, setData] = useState<ShiftData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "chatters" | "vas" | "management">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/agency/shift-data");
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (e) {
      setError("Could not load shift data. Is the shift tracker running?");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300 }}>
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
          <RefreshCw size={24} style={{ color: "var(--nva-gold)" }} />
        </motion.div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <AlertCircle size={32} style={{ color: "#ef4444", marginBottom: 12 }} />
        <div style={{ color: "var(--nva-text)", fontWeight: 700, marginBottom: 8 }}>Shift Tracker Offline</div>
        <div style={{ color: "var(--nva-muted)", fontSize: 12, marginBottom: 16 }}>{error ?? "No data"}</div>
        <button onClick={fetchData} className="btn-nva-secondary" style={{ fontSize: 12 }}>
          <RefreshCw size={12} /> Retry
        </button>
      </div>
    );
  }

  const filtered = data.staff.filter((s) => {
    const matchesSearch = !searchQuery ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.dept.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "chatters" && (s.role === "chatter" || s.role === "editor")) ||
      (activeTab === "vas" && s.role === "va") ||
      (activeTab === "management" && ["owner", "partner", "manager"].includes(s.role));
    return matchesSearch && matchesTab;
  });

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--nva-text)" }}>Agency Dashboard</h2>
            <span style={{
              padding: "3px 10px", borderRadius: 20,
              background: "rgba(34,197,94,0.1)",
              border: "1px solid rgba(34,197,94,0.2)",
              fontSize: 10, fontWeight: 700, color: "#22c55e",
              display: "flex", alignItems: "center", gap: 5,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              Live
            </span>
          </div>
          <p style={{ fontSize: 12, color: "var(--nva-muted)" }}>{data.today} · Week of {data.week_start} – {data.week_end}</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button onClick={fetchData} className="btn-nva-ghost" style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 5 }}>
            <RefreshCw size={12} /> Refresh
          </button>
          <button className="btn-nva-secondary" style={{ fontSize: 12 }}>
            <Download size={12} /> Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        <StatCard label="Total Staff" value={data.total_staff} sub="Registered" color="var(--nva-gold)" delay={0} />
        <StatCard label="Bot Connected" value={data.connected_count} sub={`${data.total_staff - data.connected_count} pending setup`} color="#22c55e" delay={0.06} />
        <StatCard label="On Shift Now" value={data.staff.filter(s => s.is_on_shift).length} sub={`${data.chatter_count} chatters`} color="#3b82f6" delay={0.12} />
        <StatCard label="Pending Leave" value={data.pending_count} sub="Awaiting approval" color="#fbbf24" delay={0.18} />
      </div>

      {/* Tabs + Search */}
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", background: "var(--nva-surface)", border: "1px solid var(--nva-border)", borderRadius: 10, padding: 3, gap: 2 }}>
          {(["all", "chatters", "vas", "management"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "6px 14px", borderRadius: 7, cursor: "pointer", fontSize: 12, fontWeight: 600,
                background: activeTab === tab ? "rgba(212,168,83,0.12)" : "transparent",
                border: activeTab === tab ? "1px solid rgba(212,168,83,0.2)" : "1px solid transparent",
                color: activeTab === tab ? "var(--nva-gold)" : "var(--nva-muted)",
                transition: "all 0.15s", textTransform: "capitalize",
              }}
            >
              {tab === "all" ? "All Staff" : tab === "chatters" ? "💬 Chatters" : tab === "vas" ? "🎬 VAs" : "Management"}
            </button>
          ))}
        </div>

        <input
          className="input-nva"
          placeholder="Search staff..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ height: 36, fontSize: 12, width: 200, paddingLeft: 12 }}
        />
      </div>

      {/* Pending leave alerts */}
      <AnimatePresence>
        {data.pending_leaves.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{ marginBottom: 16 }}
          >
            <div style={{
              padding: "12px 16px", borderRadius: 10,
              background: "rgba(251,191,36,0.08)",
              border: "1px solid rgba(251,191,36,0.2)",
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fbbf24", marginBottom: 8 }}>
                ⏳ Pending Leave Requests ({data.pending_count})
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {data.pending_leaves.slice(0, 4).map((lv, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", fontSize: 12 }}>
                    <span style={{ fontWeight: 600, color: "var(--nva-text)", minWidth: 80 }}>{lv.employee}</span>
                    <span style={{ color: "var(--nva-muted)" }}>{formatDate(lv.date)}</span>
                    <span style={{ color: "var(--nva-muted)", flex: 1 }}>{lv.reason}</span>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button style={{ padding: "3px 10px", borderRadius: 6, background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.2)", color: "#22c55e", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                        ✅ Approve
                      </button>
                      <button style={{ padding: "3px 10px", borderRadius: 6, background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                        ❌ Deny
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected staff detail */}
      <AnimatePresence>
        {selectedStaff && (
          <StaffDetailPanel s={selectedStaff} onClose={() => setSelectedStaff(null)} />
        )}
      </AnimatePresence>

      {/* Staff grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: 40, color: "var(--nva-muted)", fontSize: 13 }}>
            No staff found matching your search.
          </div>
        ) : (
          filtered.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(i * 0.04, 0.4) }}
            >
              <StaffCard s={s} onClick={() => setSelectedStaff(selectedStaff?.id === s.id ? null : s)} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
