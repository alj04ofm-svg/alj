"use client";

import { motion } from "framer-motion";
import {
  BarChart3, TrendingUp, Instagram, Twitter, Youtube,
  Users, Eye, Heart, MessageCircle, Share2, ArrowUpRight,
  ArrowDownRight, ExternalLink, Plus, Filter, RefreshCw
} from "lucide-react";

const PLATFORMS = [
  { id: "instagram", label: "Instagram", icon: Instagram, handle: "@newvaloragency", color: "#E1306C", followers: "12.4K", followersChange: "+3.2%", reach: "84.2K", reachChange: "+8.1%" },
  { id: "twitter", label: "Twitter / X", icon: Twitter, handle: "@newvaloragency", color: "#1DA1F2", followers: "4.1K", followersChange: "+1.8%", reach: "22.8K", reachChange: "+4.3%" },
  { id: "youtube", label: "YouTube", icon: Youtube, handle: "New Valor Agency", color: "#FF0000", followers: "2.8K", followersChange: "+5.4%", reach: "41.0K", reachChange: "+12.7%" },
];

const METRICS = [
  { label: "Total Reach", value: "148K", change: "+8.4%", up: true, icon: Eye, color: "#d4a853" },
  { label: "Engagement Rate", value: "6.8%", change: "+1.2%", up: true, icon: Heart, color: "#ef4444" },
  { label: "New Followers", value: "+1,842", change: "+22%", up: true, icon: Users, color: "#22c55e" },
  { label: "Link Clicks", value: "3,294", change: "-3%", up: false, icon: Share2, color: "#3b82f6" },
];

const TOP_CONTENT = [
  { platform: "Instagram", type: "Reel", title: "Day in the life with our top creators", views: "24.8K", likes: "2.1K", comments: "184", shares: "94", color: "#E1306C", daysAgo: 2 },
  { platform: "YouTube", type: "Short", title: "How we grew to 12K followers in 90 days", views: "18.2K", likes: "1.4K", comments: "92", shares: "41", color: "#FF0000", daysAgo: 5 },
  { platform: "Instagram", type: "Post", title: "Agency behind-the-scenes team tour", views: "11.4K", likes: "980", comments: "63", shares: "28", color: "#E1306C", daysAgo: 7 },
  { platform: "Twitter", type: "Thread", title: "5 things we wish we knew before starting an OF agency", views: "8.9K", likes: "742", comments: "118", shares: "203", color: "#1DA1F2", daysAgo: 3 },
];

const WEEKLY_CHART = [
  { day: "Mon", followers: 12200, engagement: 5.2 },
  { day: "Tue", followers: 12310, engagement: 6.1 },
  { day: "Wed", followers: 12350, engagement: 5.8 },
  { day: "Thu", followers: 12380, engagement: 7.2 },
  { day: "Fri", followers: 12400, engagement: 8.1 },
  { day: "Sat", followers: 12420, engagement: 6.4 },
  { day: "Sun", followers: 12410, engagement: 5.9 },
];

export function AgencyAnalytics() {
  const maxFollowers = Math.max(...WEEKLY_CHART.map(d => d.followers));

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--nva-text)", marginBottom: 4 }}>Agency Analytics</h2>
          <p style={{ fontSize: 12, color: "var(--nva-muted)" }}>Social media performance across all agency accounts</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <select className="input-nva" style={{ height: 36, fontSize: 12, width: 140 }}>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This quarter</option>
          </select>
          <button className="btn-nva-secondary" style={{ fontSize: 12 }}>
            <RefreshCw size={13} /> Refresh
          </button>
        </div>
      </div>

      {/* Overview stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {METRICS.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="card-nva"
              style={{ padding: "18px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${m.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={15} style={{ color: m.color }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  {m.up ? <ArrowUpRight size={12} style={{ color: "var(--nva-green)" }} /> : <ArrowDownRight size={12} style={{ color: "var(--nva-red)" }} />}
                  <span style={{ fontSize: 11, fontWeight: 600, color: m.up ? "var(--nva-green)" : "var(--nva-red)" }}>{m.change}</span>
                </div>
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "var(--nva-text)", letterSpacing: "-0.02em" }}>{m.value}</div>
              <div style={{ fontSize: 11, color: "var(--nva-muted)", marginTop: 4 }}>{m.label}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Weekly Chart */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="card-nva"
        style={{ padding: "20px 24px", marginBottom: 20 }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--nva-text)" }}>Follower Growth — This Week</h3>
            <p style={{ fontSize: 11, color: "var(--nva-muted)" }}>12,410 → 12,410 (+210 this week)</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: "var(--nva-gold)" }} />
              <span style={{ fontSize: 11, color: "var(--nva-muted)" }}>Followers</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: "var(--nva-green)" }} />
              <span style={{ fontSize: 11, color: "var(--nva-muted)" }}>Engagement %</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 140 }}>
          {WEEKLY_CHART.map((d, i) => {
            const barH = ((d.followers - 12000) / (maxFollowers - 12000)) * 120;
            const engH = (d.engagement / 10) * 120;
            return (
              <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{ width: "100%", display: "flex", gap: 4, alignItems: "flex-end", height: 120 }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: barH }}
                    transition={{ delay: i * 0.06, duration: 0.5 }}
                    style={{
                      flex: 1, borderRadius: "4px 4px 0 0",
                      background: "linear-gradient(180deg, rgba(212,168,83,0.5) 0%, rgba(212,168,83,0.15) 100%)",
                      borderTop: "2px solid var(--nva-gold)",
                    }}
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: engH }}
                    transition={{ delay: i * 0.06 + 0.1, duration: 0.5 }}
                    style={{
                      flex: 1, borderRadius: "4px 4px 0 0",
                      background: "linear-gradient(180deg, rgba(34,197,94,0.5) 0%, rgba(34,197,94,0.15) 100%)",
                      borderTop: "2px solid var(--nva-green)",
                    }}
                  />
                </div>
                <span style={{ fontSize: 10, color: "var(--nva-muted)", fontWeight: 500 }}>{d.day}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Platform Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ marginBottom: 20 }}
      >
        <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--nva-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
          Platform Breakdown
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {PLATFORMS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.07 }}
                className="card-nva"
                style={{ padding: "18px" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: `${p.color}15`, border: `1px solid ${p.color}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={18} style={{ color: p.color }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--nva-text)" }}>{p.label}</div>
                    <div style={{ fontSize: 11, color: "var(--nva-muted)" }}>{p.handle}</div>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "var(--nva-text)" }}>{p.followers}</div>
                    <div style={{ fontSize: 10, color: "var(--nva-muted)" }}>Followers</div>
                    <div style={{ fontSize: 11, color: "var(--nva-green)", fontWeight: 600 }}>+{p.followersChange}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "var(--nva-text)" }}>{p.reach}</div>
                    <div style={{ fontSize: 10, color: "var(--nva-muted)" }}>Reach (7d)</div>
                    <div style={{ fontSize: 11, color: "var(--nva-green)", fontWeight: 600 }}>+{p.reachChange}</div>
                  </div>
                </div>
                <div style={{ height: 4, borderRadius: 2, background: "var(--nva-surface-2)", overflow: "hidden" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, parseFloat(p.followersChange) * 20 + 60)}%` }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                    style={{ height: "100%", borderRadius: 2, background: `linear-gradient(90deg, ${p.color}, ${p.color}80)` }}
                  />
                </div>
                <button style={{ marginTop: 12, width: "100%", padding: "8px", borderRadius: 8, background: "var(--nva-surface-2)", border: "1px solid var(--nva-border)", cursor: "pointer", fontSize: 11, fontWeight: 600, color: "var(--nva-muted)", display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
                  <ExternalLink size={10} /> View on {p.label}
                </button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Top Performing Content */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--nva-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
          Top Performing Content
        </h3>
        <div className="card-nva" style={{ padding: 0, overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 80px", padding: "12px 16px", borderBottom: "1px solid var(--nva-border)", background: "var(--nva-surface-2)" }}>
            {["Content", "Platform", "Views", "Likes", "Comments", "Shares", ""].map(h => (
              <div key={h} style={{ fontSize: 10, fontWeight: 700, color: "var(--nva-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{h}</div>
            ))}
          </div>
          {TOP_CONTENT.map((c, i) => (
            <div
              key={i}
              style={{
                padding: "12px 16px", borderBottom: i < TOP_CONTENT.length - 1 ? "1px solid var(--nva-border)" : "none",
                display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 80px",
                alignItems: "center", transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "var(--nva-surface-2)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--nva-text)", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.title}</div>
                <div style={{ fontSize: 10, color: "var(--nva-muted)" }}>{c.daysAgo}d ago · <span style={{ color: c.color }}>{c.type}</span></div>
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, color: c.color }}>{c.platform}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--nva-text)" }}>{c.views}</div>
              <div style={{ fontSize: 11, color: "var(--nva-muted)" }}>{c.likes}</div>
              <div style={{ fontSize: 11, color: "var(--nva-muted)" }}>{c.comments}</div>
              <div style={{ fontSize: 11, color: "var(--nva-muted)" }}>{c.shares}</div>
              <div>
                <button style={{ padding: "5px 10px", borderRadius: 6, background: "rgba(212,168,83,0.08)", border: "1px solid rgba(212,168,83,0.15)", cursor: "pointer", fontSize: 10, color: "var(--nva-gold)", fontWeight: 600 }}>
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
