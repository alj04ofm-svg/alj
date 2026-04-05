"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Sidebar } from "@/components/layout/Sidebar";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Heart,
  MessageCircle,
  Bookmark,
  Eye,
  Download,
  MapPin,
  Clock,
  LayoutGrid,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatCard {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
}

interface GrowthDataPoint {
  label: string;
  value: number;
}

interface ContentPost {
  id: number;
  thumbnailColor: string;
  gradientFrom: string;
  gradientTo: string;
  likes: number;
  comments: number;
  saves: number;
  reach: number;
  posted: string;
  caption: string;
  likesChange?: number;
}

interface EngagementDataPoint {
  week: string;
  rate: number;
}

// ─── Fake Data ─────────────────────────────────────────────────────────────────

const FOLLOWER_GROWTH_DATA: GrowthDataPoint[] = [
  { label: "Jan", value: 4200 },
  { label: "Feb", value: 4350 },
  { label: "Mar", value: 4480 },
  { label: "Apr", value: 4600 },
  { label: "May", value: 4720 },
  { label: "Jun", value: 4850 },
  { label: "Jul", value: 4910 },
  { label: "Aug", value: 4980 },
  { label: "Sep", value: 5050 },
  { label: "Oct", value: 5120 },
  { label: "Nov", value: 5200 },
  { label: "Dec", value: 5340 },
];

const TOP_POSTS: ContentPost[] = [
  {
    id: 1,
    thumbnailColor: "#1a2332",
    gradientFrom: "#ccff47",
    gradientTo: "#4ade80",
    likes: 1247,
    comments: 89,
    saves: 64,
    reach: 8420,
    posted: "Mar 28, 2026",
    caption: "Gym flex reveal",
    likesChange: 18,
  },
  {
    id: 2,
    thumbnailColor: "#0e1320",
    gradientFrom: "#4ade80",
    gradientTo: "#60a5fa",
    likes: 892,
    comments: 67,
    saves: 41,
    reach: 6200,
    posted: "Mar 22, 2026",
    caption: "Morning grind",
  },
  {
    id: 3,
    thumbnailColor: "#1a2332",
    gradientFrom: "#f472b6",
    gradientTo: "#ccff47",
    likes: 756,
    comments: 54,
    saves: 38,
    reach: 5100,
    posted: "Mar 15, 2026",
    caption: "Cheat day vibes",
  },
];

const ENGAGEMENT_DATA: EngagementDataPoint[] = [
  { week: "W1", rate: 3.8 },
  { week: "W2", rate: 4.1 },
  { week: "W3", rate: 3.9 },
  { week: "W4", rate: 4.4 },
  { week: "W5", rate: 4.2 },
  { week: "W6", rate: 4.7 },
  { week: "W7", rate: 4.5 },
  { week: "W8", rate: 4.7 },
];

const AUDIENCE_LOCATIONS = [
  { city: "Manila", pct: 42 },
  { city: "Quezon City", pct: 18 },
  { city: "Cebu", pct: 8 },
  { city: "Davao", pct: 5 },
  { city: "Other", pct: 27 },
];

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  duration = 1.5,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setDisplay(end);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}

// ─── Section Wrapper ────────────────────────────────────────────────────────────

function SectionCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`rounded-2xl border border-subtle bg-surface p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"7D" | "30D" | "90D" | "1Y">("1Y");
  const [postFilter, setPostFilter] = useState<"likes" | "comments" | "saves" | "reach">("likes");
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sortedPosts = [...TOP_POSTS].sort((a, b) => {
    if (postFilter === "likes") return b.likes - a.likes;
    if (postFilter === "comments") return b.comments - a.comments;
    if (postFilter === "saves") return b.saves - a.saves;
    return b.reach - a.reach;
  });

  const maxGrowth = Math.max(...FOLLOWER_GROWTH_DATA.map((d) => d.value));
  const minGrowth = Math.min(...FOLLOWER_GROWTH_DATA.map((d) => d.value));
  const chartMin = Math.floor(minGrowth / 1000) * 1000;
  const chartMax = Math.ceil(maxGrowth / 1000) * 1000;

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "var(--background)" }}>
      <Sidebar />

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Radar/scan-line background effect on header */}
        <div
          className="sticky top-0 z-30 border-b border-subtle px-8 py-4 flex items-center justify-between"
          style={{
            background: "linear-gradient(135deg, rgba(26,31,46,0.92) 0%, rgba(18,18,18,0.92) 100%)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Animated radar sweep lines */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            aria-hidden="true"
          >
            <div
              className="absolute inset-0"
              style={{
                background: `repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 39px,
                  rgba(120,194,87,0.03) 39px,
                  rgba(120,194,87,0.03) 40px
                )`,
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background: `repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 39px,
                  rgba(120,194,87,0.03) 39px,
                  rgba(120,194,87,0.03) 40px
                )`,
              }}
            />
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                background: "linear-gradient(135deg, rgba(120,194,87,0.04) 0%, transparent 50%, rgba(255,0,105,0.04) 100%)",
              }}
            />
          </div>
          <div className="relative z-10">
            <h1 className="text-white font-bold text-xl">Analytics</h1>
            <p className="text-muted-foreground text-sm">@abg.ricebunny</p>
          </div>
          <div className="relative z-10 flex items-center gap-3">
            <button
              className="btn-glitch flex items-center gap-2 px-4 py-2 rounded-xl border border-subtle text-muted-foreground hover:text-white hover:border-white/20 transition-all text-sm"
              data-text="Export Report"
            >
              <Download size={14} />
              Export Report
            </button>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Account Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-start gap-5 p-6 rounded-2xl border border-subtle bg-surface"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-lime to-emerald-400 flex items-center justify-center flex-shrink-0">
              <span className="text-navy font-black text-3xl">T</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-white font-bold text-2xl">@abg.ricebunny</h2>
                <span className="px-3 py-1 rounded-full bg-lime/10 text-lime text-xs font-semibold border border-lime/20">
                  Creator Account
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 text-muted-foreground text-xs border border-subtle">
                  Connected
                </span>
              </div>
              <p className="text-muted-foreground text-sm mt-2">
                Gay bear fitness | Content creator | Manila
              </p>
            </div>
          </motion.div>

          {/* Top Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
            {[
              {
                label: "Followers",
                value: 5340,
                prefix: "",
                suffix: "",
                change: 2.4,
                changeLabel: "+127 this week",
                icon: <Users size={16} className="text-lime" />,
              },
              {
                label: "Following",
                value: 847,
                prefix: "",
                suffix: "",
                icon: <Users size={16} className="text-lime" />,
              },
              {
                label: "Posts",
                value: 124,
                prefix: "",
                suffix: "",
                icon: <LayoutGrid size={16} className="text-lime" />,
              },
              {
                label: "Engagement Rate",
                value: 4.7,
                prefix: "",
                suffix: "%",
                change: 0.3,
                changeLabel: "vs last period",
                icon: <TrendingUp size={16} className="text-lime" />,
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="rounded-2xl border border-subtle bg-surface p-5 hover:border-lime/20 transition-all group scan-on-hover"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-muted-foreground text-sm">{stat.label}</span>
                  {stat.icon}
                </div>
                <div className="text-white font-black text-3xl tracking-tight">
                  <AnimatedNumber
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={1.2 + i * 0.1}
                  />
                </div>
                {stat.change !== undefined && (
                  <div className="flex items-center gap-1 mt-2">
                    {stat.change >= 0 ? (
                      <TrendingUp size={12} className="text-green-400" />
                    ) : (
                      <TrendingDown size={12} className="text-red-400" />
                    )}
                    <span
                      className={`text-xs ${stat.change >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {stat.change >= 0 ? "+" : ""}
                      {stat.change}
                      {stat.suffix || ""}
                    </span>
                    <span className="text-muted-foreground text-xs">{stat.changeLabel}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Row 2 Stats */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "Avg Likes", value: 248, icon: <Heart size={16} className="text-lime" /> },
              { label: "Avg Comments", value: 31, icon: <MessageCircle size={16} className="text-lime" /> },
              { label: "Avg Saves", value: 19, icon: <Bookmark size={16} className="text-lime" /> },
              { label: "Avg Reach", value: 1840, prefix: "", icon: <Eye size={16} className="text-lime" /> },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 + i * 0.08, duration: 0.5 }}
                className="rounded-2xl border border-subtle bg-surface p-5 hover:border-lime/20 transition-all scan-on-hover"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-muted-foreground text-sm">{stat.label}</span>
                  {stat.icon}
                </div>
                <div className="text-white font-black text-3xl tracking-tight">
                  <AnimatedNumber value={stat.value} prefix={(stat as { prefix?: string }).prefix || ""} />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Growth Chart */}
          <SectionCard>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-bold text-base">Follower Growth</h3>
              <div className="flex gap-1">
                {(["7D", "30D", "90D", "1Y"] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      timeRange === range
                        ? "bg-lime text-navy font-bold"
                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* Chart */}
            <div className="relative h-48">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-8 w-10 flex flex-col justify-between items-end pr-2 text-muted-foreground text-xs">
                <span>6K</span>
                <span>5K</span>
                <span>4K</span>
              </div>

              {/* Bars */}
              <div className="absolute left-12 right-0 top-0 bottom-8 flex items-end gap-2">
                {FOLLOWER_GROWTH_DATA.map((point, i) => {
                  const pct = ((point.value - chartMin) / (chartMax - chartMin)) * 100;
                  return (
                    <div
                      key={point.label}
                      className="relative flex-1 flex flex-col items-center group/bar"
                      onMouseEnter={() => setHoveredBar(i)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      {/* Tooltip */}
                      <AnimatePresence>
                        {hoveredBar === i && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.15 }}
                            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover border border-subtle rounded-lg px-2 py-1 text-xs text-white whitespace-nowrap z-10 shadow-xl"
                          >
                            {point.value.toLocaleString()}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Bar */}
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${pct}%` }}
                        transition={{ delay: i * 0.05, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                        className="w-full rounded-t-md bg-gradient-to-t from-lime/80 to-lime cursor-pointer transition-all hover:brightness-110 neon-bar"
                        style={{ minHeight: 4 }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* X-axis labels */}
              <div className="absolute left-12 right-0 bottom-0 h-8 flex items-end gap-2">
                {FOLLOWER_GROWTH_DATA.map((point) => (
                  <div key={point.label} className="flex-1 text-center text-muted-foreground text-xs">
                    {point.label}
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* Top Posts + Engagement side by side */}
          <div className="grid grid-cols-5 gap-4">
            {/* Top Posts — 3 cols */}
            <div className="col-span-3 space-y-4">
              <SectionCard>
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-white font-bold text-base">Top Posts</h3>
                  <div className="flex gap-1">
                    {(["likes", "comments", "saves", "reach"] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setPostFilter(f)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                          postFilter === f
                            ? "bg-lime text-navy font-bold"
                            : "text-muted-foreground hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {f === "likes" ? "Top Likes" : f === "comments" ? "Top Comments" : f === "saves" ? "Top Saves" : "Top Reach"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {sortedPosts.map((post, i) => (
                    <div
                      key={post.id}
                      className="flex gap-4 rounded-xl border border-subtle hover:border-lime/20 transition-all p-3 group/post"
                    >
                      {/* Thumbnail */}
                      <div
                        className="w-20 h-20 rounded-xl flex-shrink-0 flex items-center justify-center holo-thumb"
                        style={{
                          background: `linear-gradient(135deg, ${post.gradientFrom}22, ${post.gradientTo}22)`,
                          border: `1px solid ${post.gradientFrom}33`,
                        }}
                      >
                        <div
                          className="w-12 h-12 rounded-lg"
                          style={{
                            background: `linear-gradient(135deg, ${post.gradientFrom}66, ${post.gradientTo}44)`,
                          }}
                        />
                      </div>

                      {/* Stats */}
                      <div className="flex-1 min-w-0 grid grid-cols-4 gap-2">
                        <div>
                          <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                            <Heart size={10} /> Likes
                          </div>
                          <p className="text-white font-bold text-sm">{post.likes.toLocaleString()}</p>
                          {post.likesChange && (
                            <span className="text-green-400 text-xs">
                              +{post.likesChange}% vs avg
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                            <MessageCircle size={10} /> Cmts
                          </div>
                          <p className="text-white font-bold text-sm">{post.comments}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                            <Bookmark size={10} /> Saves
                          </div>
                          <p className="text-white font-bold text-sm">{post.saves}</p>
                        </div>
                        <div>
                          <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                            <Eye size={10} /> Reach
                          </div>
                          <p className="text-white font-bold text-sm">{post.reach.toLocaleString()}</p>
                        </div>
                      </div>

                      {/* Caption + Date */}
                      <div className="hidden md:flex flex-col items-end justify-between min-w-0">
                        <p className="text-xs text-muted-foreground truncate max-w-[100px] text-right">
                          {post.caption}
                        </p>
                        <p className="text-xs text-muted-foreground">{post.posted}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>

            {/* Engagement + Audience — 2 cols */}
            <div className="col-span-2 space-y-4">
              {/* Engagement Over Time */}
              <SectionCard>
                <h3 className="text-white font-bold text-base mb-5">Engagement Over Time</h3>
                <div className="space-y-3">
                  {ENGAGEMENT_DATA.map((point, i) => {
                    const pct = (point.rate / 6) * 100;
                    return (
                      <div key={point.week} className="flex items-center gap-3">
                        <span className="text-muted-foreground text-xs w-6">{point.week}</span>
                        <div className="flex-1 h-2 bg-surface-light rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ delay: 0.1 + i * 0.05, duration: 0.5 }}
                            className="h-full rounded-full bg-gradient-to-r from-lime to-emerald-400"
                          />
                        </div>
                        <span className="text-lime text-xs font-bold w-8 text-right">
                          {point.rate}%
                        </span>
                      </div>
                    );
                  })}
                </div>
              </SectionCard>

              {/* Audience Insights */}
              <SectionCard>
                <h3 className="text-white font-bold text-base mb-5">Audience Insights</h3>
                <div className="space-y-5">
                  {/* Locations */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={12} className="text-lime" />
                      <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">Top Locations</span>
                    </div>
                    <div className="space-y-2">
                      {AUDIENCE_LOCATIONS.slice(0, 3).map((loc) => (
                        <div key={loc.city} className="flex items-center gap-3">
                          <span className="text-white text-xs w-20">{loc.city}</span>
                          <div className="flex-1 h-1.5 bg-surface-light rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full bg-lime"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${(loc.pct / 42) * 100}%` }}
                              viewport={{ once: true, margin: "-20px" }}
                              transition={{ duration: 0.7, type: "spring", stiffness: 120, damping: 14 }}
                            />
                          </div>
                          <span className="text-lime text-xs font-bold w-8 text-right">{loc.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Age */}
                  <div>
                    <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-2 block">
                      Top Age Range
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-white font-bold text-2xl">25-34</span>
                      <div className="flex-1 h-1.5 bg-surface-light rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-lime"
                          initial={{ width: 0 }}
                          whileInView={{ width: "75%" }}
                          viewport={{ once: true, margin: "-20px" }}
                          transition={{ duration: 0.7, type: "spring", stiffness: 120, damping: 14 }}
                        />
                      </div>
                      <span className="text-lime text-xs font-bold">47%</span>
                    </div>
                  </div>

                  {/* Gender */}
                  <div>
                    <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide mb-2 block">
                      Gender Split
                    </span>
                    <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
                      <motion.div
                        className="bg-lime rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "75%" }}
                        viewport={{ once: true, margin: "-20px" }}
                        transition={{ duration: 0.7, type: "spring", stiffness: 120, damping: 14 }}
                      />
                      <motion.div
                        className="bg-pink-400 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "25%" }}
                        viewport={{ once: true, margin: "-20px" }}
                        transition={{ duration: 0.7, type: "spring", stiffness: 120, damping: 14, delay: 0.1 }}
                      />
                    </div>
                    <div className="flex gap-4 mt-2">
                      <span className="text-muted-foreground text-xs">Male <span className="text-lime font-bold">78%</span></span>
                      <span className="text-muted-foreground text-xs">Female <span className="text-pink-400 font-bold">22%</span></span>
                    </div>
                  </div>

                  {/* Active Hours */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={12} className="text-lime" />
                      <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">Active Hours</span>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {["8-11am", "7-10pm"].map((hour) => (
                        <span
                          key={hour}
                          className="px-3 py-1 rounded-full bg-lime/10 border border-lime/20 text-lime text-xs font-medium"
                        >
                          {hour}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </SectionCard>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}