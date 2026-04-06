"use client";

import { motion } from "framer-motion";
import {
  Users, MessageSquare, Megaphone, FolderOpen, Clock, BarChart3,
  TrendingUp, DollarSign, Star, ArrowUpRight, Zap, CheckCircle2,
  Instagram, Twitter, Youtube
} from "lucide-react";

const STATS = [
  { label: "Active Models", value: "24", change: "+3 this month", up: true, icon: Users },
  { label: "Monthly Revenue", value: "$84.2K", change: "+18% vs last month", up: true, icon: DollarSign },
  { label: "Avg. Response Rate", value: "94%", change: "+2.1% improvement", up: true, icon: TrendingUp },
  { label: "Content Delivered", value: "312", change: "This month", up: true, icon: Star },
];

const QUICK_ACTIONS = [
  { label: "Chatter Onboarding", desc: "Add a new chatter to the team", icon: MessageSquare, color: "#d4a853", view: "chatter-onboarding" as const },
  { label: "Marketing Onboarding", desc: "Onboard a marketing team member", icon: Megaphone, color: "#f0c97a", view: "marketing-onboarding" as const },
  { label: "Model Requests", desc: "Send or track content requests", icon: FolderOpen, color: "#a07830", view: "model-requests" as const },
  { label: "NV Time Bot", desc: "Log or review employee hours", icon: Clock, color: "#d4a853", view: "time-tracking" as const },
];

const RECENT_ACTIVITY = [
  { user: "Alex (Chatter)", action: "completed onboarding", time: "2 min ago", type: "chatter" },
  { user: "Model: Bella", action: "uploaded 3 reels for review", time: "18 min ago", type: "content" },
  { user: "Marketing: Jamie", action: "submitted weekly report", time: "1 hr ago", type: "marketing" },
  { user: "Model: Mika", action: "accepted content request #442", time: "2 hr ago", type: "content" },
  { user: "Chatter: Sam", action: "clocked in via NV Time Bot", time: "3 hr ago", type: "time" },
  { user: "Model: Luna", action: "uploaded PPV content for review", time: "5 hr ago", type: "content" },
];

const TOP_PERFORMERS = [
  { name: "Bella", type: "Model", metric: "342", metricLabel: "New subs this week", avatar: "B" },
  { name: "Alex", type: "Chatter", metric: "98%", metricLabel: "Response rate", avatar: "A" },
  { name: "Jamie", type: "Marketing", metric: "28", metricLabel: "Reels published", avatar: "J" },
  { name: "Mika", type: "Model", metric: "$4.2K", metricLabel: "This week's PPV", avatar: "M" },
];

const SOCIAL_ACCOUNTS = [
  { platform: "Instagram", icon: Instagram, handle: "@newvaloragency", followers: "12.4K", growth: "+3.2%", color: "#E1306C" },
  { platform: "Twitter", icon: Twitter, handle: "@newvaloragency", followers: "4.1K", growth: "+1.8%", color: "#1DA1F2" },
  { platform: "YouTube", icon: Youtube, handle: "New Valor Agency", followers: "2.8K", growth: "+5.4%", color: "#FF0000" },
];

export function AgencyLanding() {
  return (
    <div>
      {/* Welcome */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--nva-text)", marginBottom: 4 }}>
          Good morning, Admin.
        </h2>
        <p style={{ fontSize: 13, color: "var(--nva-muted)" }}>
          Here's what's happening across your agency today.
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
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(212,168,83,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={16} style={{ color: "var(--nva-gold)" }} />
                </div>
                {s.up && (
                  <span style={{ fontSize: 11, color: "var(--nva-green)", fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
                    <TrendingUp size={10} /> {s.change}
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
                  e.currentTarget.style.borderColor = "rgba(212,168,83,0.3)";
                  e.currentTarget.style.background = "var(--nva-surface-2)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--nva-border)";
                  e.currentTarget.style.background = "var(--nva-surface)";
                  e.currentTarget.style.boxShadow = "none";
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
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.35 }}
        >
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--nva-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
            Recent Activity
          </h3>
          <div className="card-nva" style={{ padding: "8px", overflow: "hidden" }}>
            {RECENT_ACTIVITY.map((item, i) => (
              <div
                key={i}
                style={{
                  padding: "10px 12px",
                  borderBottom: i < RECENT_ACTIVITY.length - 1 ? "1px solid var(--nva-border)" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: item.type === "chatter" ? "rgba(212,168,83,0.12)" :
                    item.type === "content" ? "rgba(34,197,94,0.12)" :
                    item.type === "marketing" ? "rgba(59,130,246,0.12)" :
                    "rgba(160,120,48,0.12)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, fontSize: 11, fontWeight: 700,
                  color: item.type === "chatter" ? "var(--nva-gold)" :
                    item.type === "content" ? "var(--nva-green)" :
                    item.type === "marketing" ? "var(--nva-blue)" :
                    "var(--nva-gold-dark)",
                }}>
                  {item.user[0]}
                </div>
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "var(--nva-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {item.user}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--nva-muted)" }}>{item.action}</div>
                </div>
                <div style={{ fontSize: 10, color: "var(--nva-muted-2)", whiteSpace: "nowrap" }}>{item.time}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Performers */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.35 }}
        >
          <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--nva-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
            Top Performers
          </h3>
          <div className="card-nva" style={{ padding: "8px", overflow: "hidden" }}>
            {TOP_PERFORMERS.map((p, i) => (
              <div
                key={i}
                style={{
                  padding: "12px",
                  borderBottom: i < TOP_PERFORMERS.length - 1 ? "1px solid var(--nva-border)" : "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: "linear-gradient(135deg, rgba(212,168,83,0.2), rgba(240,201,122,0.15))",
                  border: "1px solid rgba(212,168,83,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800, fontSize: 14, color: "var(--nva-gold)", flexShrink: 0,
                }}>
                  {p.avatar}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--nva-text)" }}>{p.name}</div>
                  <div style={{ fontSize: 10, color: "var(--nva-muted)" }}>{p.type}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "var(--nva-gold)" }}>{p.metric}</div>
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
