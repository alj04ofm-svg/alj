"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Image, Film, LayoutGrid, Star, Heart, Eye,
  Bookmark, MessageSquare, Globe, BarChart, TrendingUp,
  ArrowUp, ChevronLeft, ChevronRight, Plus, Filter,
  Camera, Zap, Award, X, Check,
} from "lucide-react";

type Tab = "calendar" | "analytics";
type ViewMode = "week" | "month";
type ContentFilter = "All" | "Reels" | "Stories" | "Carousels" | "Posts";
type TimeRange = "7D" | "30D" | "90D" | "1Y";
type PerformancePeriod = "daily" | "weekly" | "monthly";

const ACCOUNT = {
  handle: "abg.ricebunny",
  name: "Tyler — Gay Bear Fitness",
  followers: 5340,
  following: 847,
  totalPosts: 124,
  avgEngagement: 4.7,
};

const typeColorMap: Record<string, string> = {
  post: "#d4a853",
  reel: "#d4a853",
  story: "#f0c97a",
  carousel: "#a07830",
};

const TYPE_LABEL: Record<string, string> = {
  post: "Post", reel: "Reel", story: "Story", carousel: "Carousel",
};

function fmt(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

// ─── Calendar ────────────────────────────────────────────────────────────────

const CAL_GRID = [
  [{ d: 31, oth: true }, { d: 1, posts: 2 }, { d: 2, posts: 1 }, { d: 3, posts: 1 }, { d: 4, posts: 0 }, { d: 5, posts: 1 }, { d: 6, posts: 1 }],
  [{ d: 7, posts: 1 }, { d: 8, posts: 1 }, { d: 9, posts: 0 }, { d: 10, posts: 1 }, { d: 11, posts: 1 }, { d: 12, posts: 1 }, { d: 13, posts: 0 }],
  [{ d: 14, posts: 1 }, { d: 15, posts: 3 }, { d: 16, posts: 1 }, { d: 17, posts: 1 }, { d: 18, posts: 0 }, { d: 19, posts: 1 }, { d: 20, posts: 1 }],
  [{ d: 21, posts: 1 }, { d: 22, posts: 1 }, { d: 23, posts: 1 }, { d: 24, posts: 1 }, { d: 25, posts: 0 }, { d: 26, posts: 1 }, { d: 27, posts: 0 }],
  [{ d: 28, posts: 1 }, { d: 29, posts: 1 }, { d: 30, posts: 1 }, { d: 1, oth: true }, { d: 2, oth: true }, { d: 3, oth: true }, { d: 4, oth: true }],
];

const DAY_DETAIL: Record<string, { label: string; items: { type: string; caption: string; time: string; likes: number; reach: number }[] }> = {
  "Apr 1": { label: "2 posts", items: [{ type: "reel", caption: "Gym vibes 💪", time: "09:00", likes: 248, reach: 1840 }, { type: "story", caption: "Morning setup", time: "09:05", likes: 0, reach: 0 }] },
  "Apr 8": { label: "1 post", items: [{ type: "carousel", caption: "5 exercises you're doing wrong", time: "10:30", likes: 389, reach: 7640 }] },
  "Apr 15": { label: "3 posts", items: [{ type: "post", caption: "Cheat day 🐰🍔", time: "09:00", likes: 341, reach: 6210 }, { type: "post", caption: "Photo day mindset 💋", time: "15:00", likes: 287, reach: 5100 }, { type: "story", caption: "Gym drama 😂", time: "18:00", likes: 0, reach: 0 }] },
  "Apr 22": { label: "1 post", items: [{ type: "reel", caption: "Transformation check — 8 weeks", time: "12:00", likes: 512, reach: 9100 }] },
};

function CalendarView() {
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [filter, setFilter] = useState<ContentFilter>("All");
  const [selected, setSelected] = useState<string | null>(null);

  const contentFilters: ContentFilter[] = ["All", "Reels", "Stories", "Carousels", "Posts"];

  return (
    <div>
      {/* Controls */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 6, padding: "4px", borderRadius: 10, background: "var(--nva-surface)" }}>
          {(["week", "month"] as ViewMode[]).map(m => (
            <button key={m} onClick={() => setViewMode(m)}
              style={{ padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "none", transition: "all 0.15s", background: viewMode === m ? "rgba(212,168,83,0.15)" : "transparent", color: viewMode === m ? "var(--nva-gold)" : "var(--nva-muted)" }}>
              {m}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 4, padding: "4px", borderRadius: 10, background: "var(--nva-surface)" }}>
          <Filter size={12} style={{ color: "var(--nva-muted)", margin: "auto 6px" }} />
          {contentFilters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{ padding: "5px 10px", borderRadius: 7, fontSize: 11, cursor: "pointer", border: "none", background: filter === f ? "rgba(212,168,83,0.15)" : "transparent", color: filter === f ? "var(--nva-gold)" : "var(--nva-muted)", fontWeight: filter === f ? 600 : 400 }}>
              {f}
            </button>
          ))}
        </div>
        <button style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, color: "#0a0a0f", background: "var(--nva-gold)" }}>
          <Plus size={13} />Schedule Post
        </button>
      </div>

      {/* Month nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <button style={{ padding: 6, borderRadius: 8, border: "none", cursor: "pointer", background: "var(--nva-surface)", color: "var(--nva-muted)" }}><ChevronLeft size={14} /></button>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "var(--nva-text)" }}>April 2026</span>
          <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: "rgba(212,168,83,0.12)", color: "var(--nva-gold)", fontWeight: 700 }}>
            <Zap size={10} style={{ display: "inline", marginRight: 3 }} />Live
          </span>
        </div>
        <button style={{ padding: 6, borderRadius: 8, border: "none", cursor: "pointer", background: "var(--nva-surface)", color: "var(--nva-muted)" }}><ChevronRight size={14} /></button>
      </div>

      {/* Calendar grid */}
      <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid var(--nva-border)", background: "var(--nva-surface)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: "1px solid var(--nva-border)" }}>
          {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
            <div key={d} style={{ padding: "10px 8px", textAlign: "center", fontSize: 11, fontWeight: 600, color: "var(--nva-muted)" }}>{d}</div>
          ))}
        </div>
        {CAL_GRID.map((week, wi) => (
          <div key={wi} style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", borderBottom: wi < CAL_GRID.length - 1 ? "1px solid var(--nva-border)" : "none" }}>
            {week.map((day, di) => {
              const label = day.oth ? `May ${day.d}` : `Apr ${day.d}`;
              const detail = DAY_DETAIL[label];
              const isToday = day.d === 1 && !day.oth;
              return (
                <div key={di}
                  onClick={() => detail && setSelected(label)}
                  style={{
                    padding: "8px 6px", minHeight: 80, cursor: detail ? "pointer" : "default",
                    opacity: day.oth ? 0.3 : 1, borderRight: di < 6 ? "1px solid var(--nva-border)" : "none",
                  }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: isToday ? 700 : 400, margin: "0 auto 6px",
                    background: isToday ? "var(--nva-gold)" : "transparent",
                    color: isToday ? "#0a0a0f" : "var(--nva-muted)",
                  }}>{day.d}</div>
                  {detail && !day.oth && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center" }}>
                      {((day as any).posts > 0 ? [{ type: "reel" }, { type: "post" }] : []).slice(0, 2).map((_, i) => (
                        <div key={i} style={{ width: "100%", height: 6, borderRadius: 3, background: "var(--nva-gold)", opacity: 0.5 }} />
                      ))}
                    </div>
                  )}
                  {detail && (day as any).posts === 0 && (
                    <div style={{ height: 6, borderRadius: 3, border: "1px dashed rgba(212,168,83,0.3)", marginTop: 4 }} />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12, fontSize: 11, color: "var(--nva-muted)" }}>
        {Object.entries(typeColorMap).map(([t, c]) => (
          <div key={t} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />
            <span style={{ textTransform: "capitalize" }}>{t}s</span>
          </div>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 10, color: "var(--nva-gold)" }}>★ Click highlighted days to see content</span>
      </div>

      {/* Day detail modal */}
      <AnimatePresence>
        {selected && DAY_DETAIL[selected] && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)" }}
            onClick={() => setSelected(null)}>
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92 }}
              style={{ width: "100%", maxWidth: 480, borderRadius: 16, overflow: "hidden", background: "var(--nva-surface)", border: "1px solid var(--nva-border)" }}
              onClick={e => e.stopPropagation()}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid var(--nva-border)" }}>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "var(--nva-text)" }}>{selected}</p>
                  <p style={{ fontSize: 12, color: "var(--nva-muted)", marginTop: 2 }}>{DAY_DETAIL[selected].label}</p>
                </div>
                <button onClick={() => setSelected(null)} style={{ padding: 6, borderRadius: 8, border: "none", cursor: "pointer", background: "var(--nva-surface-2)", color: "var(--nva-muted)" }}><X size={14} /></button>
              </div>
              <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
                {DAY_DETAIL[selected].items.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, borderRadius: 12, background: "var(--nva-surface-2)", border: "1px solid var(--nva-border)" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: `${typeColorMap[item.type]}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, color: typeColorMap[item.type] }}>{TYPE_LABEL[item.type]}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 11, color: "var(--nva-muted)", marginBottom: 2 }}>{item.time}</div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--nva-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.caption}</div>
                    </div>
                    {item.likes > 0 && (
                      <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "#ff6b9d" }}><Heart size={11} />{fmt(item.likes)}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "var(--nva-muted)" }}><Eye size={11} />{fmt(item.reach)}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Analytics ────────────────────────────────────────────────────────────────

const GEO = [
  { city: "Manila", pct: 42 }, { city: "Quezon City", pct: 18 },
  { city: "Cebu", pct: 8 }, { city: "Davao", pct: 5 }, { city: "Other PH", pct: 27 },
];

const ENGAGEMENT = [
  { label: "Mon", v: 72 }, { label: "Tue", v: 88 }, { label: "Wed", v: 64 },
  { label: "Thu", v: 91 }, { label: "Fri", v: 78 }, { label: "Sat", v: 95 }, { label: "Sun", v: 83 },
];

const TOP_POSTS = [
  { id: "1", likes: 512, comments: 47, saves: 88, reach: 9100, engagement: 6.1, date: "Apr 22", caption: "Transformation check — 8 weeks", c1: "#d4a853", c2: "#f0c97a" },
  { id: "2", likes: 389, comments: 44, saves: 91, reach: 7640, engagement: 5.7, date: "Apr 8", caption: "5 exercises you're doing wrong", c1: "#a07830", c2: "#d4a853" },
  { id: "3", likes: 412, comments: 38, saves: 67, reach: 8420, engagement: 5.4, date: "Apr 1", caption: "After glow 🏋️💦", c1: "#d4a853", c2: "#a07830" },
];

function AnalyticsView() {
  const [period, setPeriod] = useState<PerformancePeriod>("monthly");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Account header */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, padding: 20, borderRadius: 14, background: "var(--nva-surface)", border: "1px solid var(--nva-border)" }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg, #d4a853, #a07830)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Camera size={22} style={{ color: "#0a0a0f" }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: "var(--nva-text)" }}>@{ACCOUNT.handle}</span>
            <span style={{ fontSize: 9, padding: "2px 7px", borderRadius: 20, background: "rgba(212,168,83,0.12)", color: "var(--nva-gold)", fontWeight: 700 }}><Zap size={9} style={{ display: "inline", marginRight: 2 }} />Live</span>
          </div>
          <div style={{ fontSize: 12, color: "var(--nva-muted)", marginTop: 2 }}>{ACCOUNT.name}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: "var(--nva-text)" }}>{fmt(ACCOUNT.followers)}</div>
          <div style={{ fontSize: 10, color: "var(--nva-muted)" }}>Followers</div>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {[
          { label: "Followers", value: fmt(ACCOUNT.followers), sub: "+127 this week", c: "var(--nva-gold)" },
          { label: "Total Posts", value: ACCOUNT.totalPosts, sub: "12 this month", c: "#d4a853" },
          { label: "Avg Reach", value: "6.8k", sub: "per post avg", c: "#f0c97a" },
          { label: "Engagement", value: `${ACCOUNT.avgEngagement}%`, sub: "+0.3% vs last", c: "#4ade80" },
        ].map(s => (
          <div key={s.label} style={{ padding: 16, borderRadius: 12, background: "var(--nva-surface)", border: "1px solid var(--nva-border)" }}>
            <div style={{ fontSize: 11, color: "var(--nva-muted)", marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: s.c }}>{s.value}</div>
            <div style={{ fontSize: 10, color: "var(--nva-muted)", marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Two-column row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Geography */}
        <div style={{ padding: 20, borderRadius: 14, background: "var(--nva-surface)", border: "1px solid var(--nva-border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <Globe size={15} style={{ color: "var(--nva-gold)" }} />
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--nva-text)" }}>Audience Geography</h3>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {GEO.map(g => (
              <div key={g.city} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 80, fontSize: 11, color: "var(--nva-muted)", textAlign: "right" }}>{g.city}</div>
                <div style={{ flex: 1, height: 6, borderRadius: 3, background: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${(g.pct / 42) * 100}%` }}
                    viewport={{ once: true }} transition={{ duration: 0.8 }}
                    style={{ height: "100%", borderRadius: 3, background: "var(--nva-gold)" }} />
                </div>
                <div style={{ width: 32, fontSize: 11, fontWeight: 700, color: "var(--nva-gold)", textAlign: "right" }}>{g.pct}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Engagement */}
        <div style={{ padding: 20, borderRadius: 14, background: "var(--nva-surface)", border: "1px solid var(--nva-border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <BarChart size={15} style={{ color: "var(--nva-gold)" }} />
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--nva-text)" }}>Engagement by Day</h3>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80 }}>
            {ENGAGEMENT.map(d => (
              <div key={d.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                <div style={{ width: "100%", borderRadius: "4px 4px 0 0", background: d.v === 95 ? "var(--nva-gold)" : "rgba(212,168,83,0.15)", minHeight: 4, height: `${(d.v / 95) * 100}%` }} />
                <span style={{ fontSize: 9, color: "var(--nva-muted)" }}>{d.label}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <span style={{ fontSize: 10, color: "var(--nva-muted)" }}>Peak: <span style={{ color: "var(--nva-text)", fontWeight: 600 }}>Sat (95)</span></span>
            <span style={{ fontSize: 10, color: "var(--nva-muted)" }}>Avg: <span style={{ color: "var(--nva-text)", fontWeight: 600 }}>82</span></span>
          </div>
        </div>
      </div>

      {/* Top performers */}
      <div style={{ borderRadius: 14, overflow: "hidden", background: "var(--nva-surface)", border: "1px solid var(--nva-border)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid var(--nva-border)" }}>
          <div>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--nva-text)" }}>Top Performers</h3>
            <p style={{ fontSize: 11, color: "var(--nva-muted)", marginTop: 2 }}>Filter by period to see your best content</p>
          </div>
          <div style={{ display: "flex", gap: 4, padding: "3px", borderRadius: 8, background: "rgba(0,0,0,0.2)" }}>
            {(["daily","weekly","monthly"] as PerformancePeriod[]).map(p => (
              <button key={p} onClick={() => setPeriod(p)}
                style={{ padding: "5px 12px", borderRadius: 6, fontSize: 11, cursor: "pointer", border: "none", background: period === p ? "rgba(212,168,83,0.15)" : "transparent", color: period === p ? "var(--nva-gold)" : "var(--nva-muted)", fontWeight: period === p ? 600 : 400 }}>
                {p}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
          {TOP_POSTS.map((post, i) => (
            <div key={post.id} style={{ padding: 20, borderRight: i < 2 ? "1px solid var(--nva-border)" : "none", position: "relative" }}>
              <div style={{ position: "absolute", top: 12, left: 14, width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, background: i === 0 ? "var(--nva-gold)" : i === 1 ? "#a07830" : "#555", color: "#0a0a0f" }}>{i + 1}</div>
              <div style={{ width: "100%", aspectRatio: "1", borderRadius: 12, marginBottom: 12, marginTop: 8, background: `linear-gradient(135deg, ${post.c1}, ${post.c2})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Award size={28} style={{ color: "rgba(255,255,255,0.25)" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "#ff6b9d" }}><Heart size={10} />{fmt(post.likes)}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "#60a5fa" }}><MessageSquare size={10} />{post.comments}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "#fbbf24" }}><Bookmark size={10} />{fmt(post.saves)}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 11, color: "#4ade80" }}><TrendingUp size={10} />{post.engagement}%</div>
              </div>
              <p style={{ fontSize: 10, color: "var(--nva-muted)", marginTop: 8, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{post.caption}</p>
              <p style={{ fontSize: 9, color: "var(--nva-muted)", opacity: 0.6, marginTop: 2 }}>{post.date} · {period}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────

export function AgencySchedule() {
  const [tab, setTab] = useState<Tab>("calendar");

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--nva-text)", marginBottom: 4 }}>Schedule</h2>
        <p style={{ fontSize: 13, color: "var(--nva-muted)" }}>Plan, schedule, and manage your content calendar.</p>
      </div>

      {/* Tab switcher */}
      <div style={{ display: "flex", gap: 4, padding: "4px", borderRadius: 12, background: "var(--nva-surface)", border: "1px solid var(--nva-border)", width: "fit-content", marginBottom: 24 }}>
        {(["calendar", "analytics"] as Tab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            style={{ padding: "8px 20px", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", transition: "all 0.15s", background: tab === t ? "rgba(212,168,83,0.15)" : "transparent", color: tab === t ? "var(--nva-gold)" : "var(--nva-muted)" }}>
            {t === "calendar" ? "Calendar" : "Account Analytics"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, x: tab === "analytics" ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}>
          {tab === "calendar" ? <CalendarView /> : <AnalyticsView />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
