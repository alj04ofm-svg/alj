"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Users, MessageSquare, Megaphone, FolderOpen, Clock,
  TrendingUp, DollarSign, Star, Globe, Radio, Video,
  UserPlus, FileText, ChevronRight
} from "lucide-react";

import type { AgencyView } from "./AgencyDashboardLayout";

interface Props {
  onViewChange?: (view: AgencyView) => void;
}

const STATS = [
  { label: "Active Models", value: "13", change: "All info sheets complete", up: true, icon: Users, color: "#d4a853" },
  { label: "Velour Applicants", value: "0", change: "Pending review", up: false, icon: UserPlus, color: "#f59e0b" },
  { label: "Avg. Response Rate", value: "94%", change: "+2.1% vs last month", up: true, icon: TrendingUp, color: "#d4a853" },
  { label: "Content Delivered", value: "312", change: "This month", up: true, icon: Star, color: "#d4a853" },
];

const QUICK_ACTIONS = [
  { label: "Model Info Sheets", desc: "View all 13 model profiles", icon: FileText, color: "#d4a853", action: "navigate", view: "model-management" as AgencyView },
  { label: "Model Requests", desc: "Track content requests", icon: FolderOpen, color: "#a07830", action: "navigate", view: "model-requests" as AgencyView },
  { label: "Recruit — Chatter", desc: "Open Velour chatter recruitment", icon: MessageSquare, color: "#d4a853", action: "external", href: "/velour/chatter" },
  { label: "Recruit — Marketing", desc: "Open Velour marketing recruitment", icon: Megaphone, color: "#f0c97a", action: "external", href: "/velour/marketing" },
];

const VELOUR_APPLICANTS = [
  { name: "No applicants yet", status: "pending", type: "Chatter", applied: "—", note: "Share the Velour link to start receiving applications" },
];

const RECENT_ACTIVITY = [
  { user: "Model: Tyler", action: "Info sheet complete", time: "Today", type: "content" },
  { user: "Model: Ella Mira", action: "Info sheet complete", time: "Today", type: "content" },
  { user: "Model: Amam", action: "Info sheet complete", time: "Today", type: "content" },
  { user: "Admin", action: "Viewed all model profiles", time: "Today", type: "admin" },
];

const TOP_PERFORMERS = [
  { name: "Tyler Rex", type: "Model", metric: "$8.4K", metricLabel: "Monthly revenue", avatar: "TR", color: "#8B5CF6" },
  { name: "Amam", type: "Model", metric: "8 accts", metricLabel: "Social accounts", avatar: "AM", color: "#F472B6" },
  { name: "Ella Mira", type: "Model", metric: "2 accts", metricLabel: "Social accounts", avatar: "EM", color: "#F59E0B" },
  { name: "Ren / Rin", type: "Model", metric: "7 accts", metricLabel: "Social accounts", avatar: "RK", color: "#EF4444" },
];

const SOCIAL_ACCOUNTS = [
  { platform: "Instagram", icon: Globe, handle: "@newvaloragency", followers: "12.4K", growth: "+3.2%", color: "#E1306C" },
  { platform: "Twitter", icon: Radio, handle: "@newvaloragency", followers: "4.1K", growth: "+1.8%", color: "#1DA1F2" },
  { platform: "YouTube", icon: Video, handle: "New Valor Agency", followers: "2.8K", growth: "+5.4%", color: "#FF0000" },
];

export function AgencyLanding({ onViewChange }: Props) {
  const router = useRouter();

  const handleAction = (action: typeof QUICK_ACTIONS[0]) => {
    if (action.action === "navigate" && onViewChange && action.view) {
      onViewChange(action.view);
    } else if (action.action === "external" && action.href) {
      router.push(action.href);
    }
  };

  return (
    <div>
      {/* Welcome */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--nva-text)", marginBottom: 4 }}>
          Good morning, Admin.
        </h2>
        <p style={{ fontSize: 13, color: "var(--nva-muted)" }}>
          13 models on board &mdash; all info sheets complete. View all in <button onClick={() => onViewChange?.("model-management")} style={{ background: "none", border: "none", cursor: "pointer", color: "#d4a853", fontWeight: 700, fontSize: 13 }}>Model Management</button>.
        </p>
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {STATS.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.35 }}
              className="card-nva"
              style={{ padding: "20px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${s.color || "#d4a853"}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={16} style={{ color: "var(--nva-gold)" }} />
                </div>
                {s.up && (
                  <span style={{ fontSize: 10, color: "var(--nva-green)", fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
                    <TrendingUp size={9} /> {s.change}
                  </span>
                )}
              </div>
              <div style={{ fontSize: 26, fontWeight: 800, color: "var(--nva-text)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: 12, color: "var(--nva-muted)", marginTop: 6, fontWeight: 500 }}>{s.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.35 }}
        style={{ marginBottom: 28 }}
      >
        <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--nva-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
          Quick Actions
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {QUICK_ACTIONS.map((action, i) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={action.label}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAction(action)}
                style={{
                  padding: "18px 16px",
                  borderRadius: 14,
                  background: "var(--nva-surface)",
                  border: "1px solid var(--nva-border)",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,168,83,0.3)";
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--nva-surface-2)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--nva-border)";
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--nva-surface)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
                }}
              >
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${action.color}18`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <Icon size={16} style={{ color: action.color }} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--nva-text)", marginBottom: 3 }}>{action.label}</div>
                <div style={{ fontSize: 11, color: "var(--nva-muted)", lineHeight: 1.4 }}>{action.desc}</div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Bottom grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
        {/* Velour Applicants */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.35 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--nva-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Velour Applicants
            </h3>
            <button onClick={() => router.push("/velour")}
              style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", color: "var(--nva-gold)", fontSize: 11, fontWeight: 600 }}>
              View site <ChevronRight size={11} />
            </button>
          </div>
          <div className="card-nva" style={{ padding: "8px", overflow: "hidden" }}>
            {VELOUR_APPLICANTS.map((app, i) => (
              <div key={i} style={{ padding: "12px", borderBottom: i < VELOUR_APPLICANTS.length - 1 ? "1px solid var(--nva-border)" : "none", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(212,168,83,0.08)", border: "1px solid rgba(212,168,83,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <UserPlus size={15} style={{ color: "var(--nva-gold)" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--nva-text)" }}>{app.name}</div>
                  <div style={{ fontSize: 11, color: "var(--nva-muted)" }}>{app.note}</div>
                </div>
              </div>
            ))}
            <div style={{ padding: "14px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "var(--nva-muted)", lineHeight: 1.6 }}>
                Share <button onClick={() => router.push("/velour")} style={{ background: "none", border: "none", cursor: "pointer", color: "#d4a853", fontWeight: 600, fontSize: 11 }}>/velour</button> to start receiving chatter and marketing applications.
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top Performers */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.35 }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--nva-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Model Profiles
            </h3>
            <button onClick={() => onViewChange?.("model-management")}
              style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", color: "var(--nva-gold)", fontSize: 11, fontWeight: 600 }}>
              View all 13 <ChevronRight size={11} />
            </button>
          </div>
          <div className="card-nva" style={{ padding: "8px", overflow: "hidden" }}>
            {TOP_PERFORMERS.map((p, i) => (
              <div key={i} style={{ padding: "10px 12px", borderBottom: i < TOP_PERFORMERS.length - 1 ? "1px solid var(--nva-border)" : "none", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: `linear-gradient(135deg, ${p.color}, ${p.color}60)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, fontSize: 12, color: "#0a0a0f",
                }}>
                  {p.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--nva-text)" }}>{p.name}</div>
                  <div style={{ fontSize: 10, color: "var(--nva-muted)" }}>{p.type}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "var(--nva-gold)" }}>{p.metric}</div>
                  <div style={{ fontSize: 10, color: "var(--nva-muted)" }}>{p.metricLabel}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Social Accounts */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.35 }}
        >
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--nva-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
            Social Accounts
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {SOCIAL_ACCOUNTS.map((account, i) => {
              const Icon = account.icon;
              return (
                <div key={i} className="card-nva" style={{ padding: "14px 16px", display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 9, background: `${account.color}18`, border: `1px solid ${account.color}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={16} style={{ color: account.color }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--nva-text)" }}>{account.platform}</div>
                    <div style={{ fontSize: 11, color: "var(--nva-muted)" }}>{account.handle}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--nva-text)" }}>{account.followers}</div>
                    <div style={{ fontSize: 10, color: "var(--nva-green)", fontWeight: 600 }}>{account.growth}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
