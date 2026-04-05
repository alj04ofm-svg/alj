"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, FileText, BarChart2, MessageCircle, CheckCircle, Users,
  Settings, ChevronLeft, ChevronRight, Plus, Filter,
  Image, Film, LayoutGrid, Star, Camera, Heart,
  MessageSquare, Bookmark, Eye, TrendingUp, ArrowUp, Clock,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "calendar" | "analytics";
type ContentFilter = "All" | "Reels" | "Stories" | "Carousels" | "Posts";
type TopFilter = "Top by Likes" | "Top by Comments" | "Top by Saves";

interface DayPost {
  id: string;
  type: "post" | "reel" | "story" | "carousel";
  thumbnailColor: string;
  time: string;
}

interface CalendarDay {
  date: number;
  posts: DayPost[];
  isToday?: boolean;
  isOtherMonth?: boolean;
}

interface TopPost {
  id: string;
  thumbnailColor: string;
  likes: number;
  comments: number;
  saves: number;
  reach: number;
  date: string;
}

// ─── Fake Data ────────────────────────────────────────────────────────────────

const ACCOUNT = {
  handle: "abg.ricebunny",
  name: "Tyler — Gay Bear Fitness",
  avatarColor: "#ff0069",
  plan: "Platform",
  followers: 5340,
  following: 847,
  totalPosts: 124,
  avgEngagement: 4.7,
};

const WEEKLY_STATS = { posts: 8, stories: 2, reels: 1 };

const CALENDAR_WEEKS: CalendarDay[][] = [
  [
    { date: 31, posts: [{ id: "p1", type: "carousel", thumbnailColor: "#833ab4", time: "09:00" }], isOtherMonth: true },
    { date: 1, posts: [{ id: "p2", type: "post", thumbnailColor: "#fd1d1d", time: "10:30" }], isToday: true },
    { date: 2, posts: [{ id: "p3", type: "reel", thumbnailColor: "#ff0069", time: "14:00" }] },
    { date: 3, posts: [{ id: "p4", type: "story", thumbnailColor: "#fcaf45", time: "18:00" }] },
    { date: 4, posts: [] },
    { date: 5, posts: [{ id: "p5", type: "post", thumbnailColor: "#833ab4", time: "08:00" }] },
    { date: 6, posts: [{ id: "p6", type: "story", thumbnailColor: "#ff0069", time: "12:00" }] },
  ],
  [
    { date: 7, posts: [{ id: "p7", type: "carousel", thumbnailColor: "#fd1d1d", time: "09:00" }] },
    { date: 8, posts: [{ id: "p8", type: "reel", thumbnailColor: "#fcaf45", time: "11:00" }] },
    { date: 9, posts: [] },
    { date: 10, posts: [{ id: "p9", type: "post", thumbnailColor: "#ff0069", time: "15:00" }] },
    { date: 11, posts: [{ id: "p10", type: "story", thumbnailColor: "#833ab4", time: "19:00" }] },
    { date: 12, posts: [{ id: "p11", type: "post", thumbnailColor: "#fd1d1d", time: "09:00" }] },
    { date: 13, posts: [] },
  ],
  [
    { date: 14, posts: [{ id: "p12", type: "reel", thumbnailColor: "#833ab4", time: "10:00" }] },
    { date: 15, posts: [{ id: "p13", type: "carousel", thumbnailColor: "#fcaf45", time: "14:00" }] },
    { date: 16, posts: [{ id: "p14", type: "story", thumbnailColor: "#ff0069", time: "18:00" }] },
    { date: 17, posts: [{ id: "p15", type: "post", thumbnailColor: "#fd1d1d", time: "09:00" }] },
    { date: 18, posts: [] },
    { date: 19, posts: [{ id: "p16", type: "reel", thumbnailColor: "#833ab4", time: "12:00" }] },
    { date: 20, posts: [{ id: "p17", type: "post", thumbnailColor: "#fcaf45", time: "08:00" }] },
  ],
  [
    { date: 21, posts: [{ id: "p18", type: "carousel", thumbnailColor: "#ff0069", time: "10:00" }] },
    { date: 22, posts: [{ id: "p19", type: "story", thumbnailColor: "#fd1d1d", time: "16:00" }] },
    { date: 23, posts: [{ id: "p20", type: "post", thumbnailColor: "#833ab4", time: "09:00" }] },
    { date: 24, posts: [{ id: "p21", type: "reel", thumbnailColor: "#fcaf45", time: "14:00" }] },
    { date: 25, posts: [{ id: "p22", type: "story", thumbnailColor: "#ff0069", time: "18:00" }] },
    { date: 26, posts: [] },
    { date: 27, posts: [{ id: "p23", type: "post", thumbnailColor: "#fd1d1d", time: "10:00" }] },
  ],
  [
    { date: 28, posts: [{ id: "p24", type: "reel", thumbnailColor: "#fcaf45", time: "11:00" }] },
    { date: 29, posts: [{ id: "p25", type: "carousel", thumbnailColor: "#ff0069", time: "15:00" }] },
    { date: 30, posts: [{ id: "p26", type: "post", thumbnailColor: "#833ab4", time: "09:00" }], isOtherMonth: true },
    { date: 1, posts: [], isOtherMonth: true },
    { date: 2, posts: [], isOtherMonth: true },
    { date: 3, posts: [], isOtherMonth: true },
    { date: 4, posts: [], isOtherMonth: true },
  ],
];

const ENGAGEMENT_DATA = [
  { label: "Mon", value: 72 },
  { label: "Tue", value: 88 },
  { label: "Wed", value: 64 },
  { label: "Thu", value: 91 },
  { label: "Fri", value: 78 },
  { label: "Sat", value: 95 },
  { label: "Sun", value: 83 },
];

const TOP_POSTS: TopPost[] = [
  { id: "tp1", thumbnailColor: "#833ab4", likes: 412, comments: 38, saves: 67, reach: 8420, date: "Mar 29" },
  { id: "tp2", thumbnailColor: "#fd1d1d", likes: 389, comments: 44, saves: 91, reach: 7640, date: "Mar 22" },
  { id: "tp3", thumbnailColor: "#ff0069", likes: 341, comments: 29, saves: 55, reach: 6210, date: "Mar 15" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TYPE_ICON: Record<string, React.ReactNode> = {
  post: <Image className="w-2.5 h-2.5 text-white/70" />,
  reel: <Film className="w-2.5 h-2.5 text-white/70" />,
  story: <Star className="w-2.5 h-2.5 text-white/70" />,
  carousel: <LayoutGrid className="w-2.5 h-2.5 text-white/70" />,
};

const typeColorMap: Record<string, string> = {
  post: "#ff0069",
  reel: "#fd1d1d",
  story: "#fcaf45",
  carousel: "#833ab4",
};

function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
};

// ─── Calendar View ────────────────────────────────────────────────────────────

function CalendarView() {
  const [contentFilter, setContentFilter] = useState<ContentFilter>("All");

  const contentFilters: ContentFilter[] = ["All", "Reels", "Stories", "Carousels", "Posts"];

  return (
    <div>
      <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-5">
        <div className="flex gap-2 flex-wrap">
          {[
            { label: "posts", count: WEEKLY_STATS.posts },
            { label: "stories", count: WEEKLY_STATS.stories },
            { label: "reels", count: WEEKLY_STATS.reels },
          ].map(({ label, count }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
              style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span className="text-white font-semibold">{count}</span>
              <span className="text-slate-400">{label}</span>
            </div>
          ))}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs"
            style={{ backgroundColor: "rgba(255,0,105,0.08)", border: "1px solid rgba(255,0,105,0.15)" }}
          >
            <span className="text-white font-semibold">11</span>
            <span className="text-slate-400">scheduled</span>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-lg" style={{ backgroundColor: "var(--card)" }}>
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-2" />
            {contentFilters.map((f) => (
              <button
                key={f}
                onClick={() => setContentFilter(f)}
                className={`px-2.5 py-1 rounded-md text-xs transition-all ${
                  contentFilter === f ? "pill-shimmer" : ""
                }`}
                style={{
                  backgroundColor: contentFilter === f ? "rgba(255,0,105,0.12)" : "transparent",
                  color: contentFilter === f ? "#ffffff" : "#a8a8a8",
                }}
              >
                {f}
              </button>
            ))}
          </div>

          <button
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all hover:brightness-110 gradient-ig text-white hover:animate-[glow-pulse_1.5s_ease-in-out_infinite]"
          >
            <Plus className="w-3.5 h-3.5" />
            Schedule Post
          </button>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="flex items-center justify-between mb-4">
        <button className="p-2 rounded-lg transition-colors hover:bg-white/5" style={{ color: "#a8a8a8" }}>
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="text-sm font-semibold text-white">April 2026</div>
        <button className="p-2 rounded-lg transition-colors hover:bg-white/5" style={{ color: "#a8a8a8" }}>
          <ChevronRight className="w-4 h-4" />
        </button>
      </motion.div>

      <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)", backgroundColor: "var(--card)" }}>
        <div className="grid grid-cols-7 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="py-3 text-center text-xs font-medium text-slate-400">{day}</div>
          ))}
        </div>

        {CALENDAR_WEEKS.map((week, wi) => (
          <div
            key={wi}
            className="grid grid-cols-7"
            style={{ borderBottom: wi < CALENDAR_WEEKS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : undefined }}
          >
            {week.map((day, di) => (
              <div
                key={di}
                className={`relative p-2 min-h-[88px] cursor-pointer group transition-all hover:bg-white/[0.03] group-hover:shadow-[inset_0_0_20px_rgba(255,0,105,0.07)] ${
                  day.isToday ? "animate-[pulse-ring_2s_ease-out_infinite]" : ""
                }`}
                style={{
                  borderRight: di < 6 ? "1px solid rgba(255,255,255,0.04)" : undefined,
                  opacity: day.isOtherMonth ? 0.3 : 1,
                  boxShadow: day.isToday ? "none" : undefined,
                }}
              >
                <div
                  className="text-xs mb-1.5"
                  style={{
                    color: day.isToday ? "#ffffff" : "#a8a8a8",
                    fontWeight: day.isToday ? 700 : 400,
                    width: day.isToday ? 20 : undefined,
                    height: day.isToday ? 20 : undefined,
                    borderRadius: day.isToday ? "50%" : undefined,
                    backgroundColor: day.isToday ? "#ff0069" : undefined,
                    display: day.isToday ? "flex" : undefined,
                    alignItems: day.isToday ? "center" : undefined,
                    justifyContent: day.isToday ? "center" : undefined,
                  }}
                >
                  {day.isToday ? "" : day.date}
                </div>
                <div className="space-y-1">
                  {day.posts.slice(0, 2).map((post) => (
                    <div
                      key={post.id}
                      className="h-8 rounded-lg overflow-hidden relative"
                      style={{ backgroundColor: post.thumbnailColor }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        {TYPE_ICON[post.type]}
                      </div>
                    </div>
                  ))}
                  {day.posts.length > 2 && (
                    <div className="text-[10px] text-slate-500 pl-0.5">+{day.posts.length - 2} more</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="flex items-center gap-4 mt-4 text-xs text-slate-400">
        <span>Post types:</span>
        {Object.entries(typeColorMap).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: color }} />
            <span className="capitalize">{type}s</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// ─── Analytics View ───────────────────────────────────────────────────────────

function AnalyticsView() {
  const [topFilter, setTopFilter] = useState<TopFilter>("Top by Likes");
  const topFilters: TopFilter[] = ["Top by Likes", "Top by Comments", "Top by Saves"];

  const maxBar = Math.max(...ENGAGEMENT_DATA.map((d) => d.value));

  return (
    <div className="space-y-5">
      <motion.div variants={fadeUp} className="flex items-center gap-4 p-5 rounded-2xl" style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #833ab4, #ff0069)", color: "#fff" }}
        >
          <Camera className="w-7 h-7" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-base font-semibold text-white">@{ACCOUNT.handle}</span>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ backgroundColor: "rgba(255,0,105,0.1)", color: "#ff0069" }}>
              <TrendingUp className="w-2.5 h-2.5" />
              PRO
            </div>
          </div>
          <div className="text-sm text-slate-400 mb-1">{ACCOUNT.name}</div>
          <div className="text-xs text-slate-500">{ACCOUNT.totalPosts} posts this month</div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-xl font-bold text-white">{formatNumber(ACCOUNT.followers)}</div>
          <div className="text-xs text-slate-400">Followers</div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="grid grid-cols-4 gap-4">
        {[
          { label: "Followers", value: formatNumber(ACCOUNT.followers), sub: "+12% this week", positive: true },
          { label: "Following", value: formatNumber(ACCOUNT.following), sub: null, positive: null },
          { label: "Total Posts", value: formatNumber(ACCOUNT.totalPosts), sub: "124 lifetime", positive: null },
          { label: "Avg Engagement", value: `${ACCOUNT.avgEngagement}%`, sub: "Last 30 days", positive: true },
        ].map(({ label, value, sub, positive }) => (
          <div
            key={label}
            className="p-4 rounded-xl scan-on-hover transition-all hover:border-[rgba(255,0,105,0.2)]"
            style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="text-xs text-slate-400 mb-1">{label}</div>
            <div className="text-xl font-bold text-white mb-1">{value}</div>
            {sub && (
              <div className="flex items-center gap-1 text-[11px]" style={{ color: positive ? "#4ade80" : "#a8a8a8" }}>
                {positive && <ArrowUp className="w-3 h-3" />}
                {sub}
              </div>
            )}
          </div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="p-5 rounded-2xl" style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-semibold text-white mb-0.5">Engagement This Week</h3>
            <p className="text-xs text-slate-400">Average post interactions per day</p>
          </div>
          <div className="text-sm font-semibold text-white">87 avg</div>
        </div>
        <div className="flex items-end gap-3 h-32">
          {ENGAGEMENT_DATA.map((d) => (
            <div key={d.label} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full rounded-lg transition-all"
                style={{
                  height: `${(d.value / maxBar) * 100}%`,
                  minHeight: 8,
                  background: d.value === maxBar ? "#ff0069" : "rgba(255,0,105,0.15)",
                }}
              />
              <span className="text-xs text-slate-500">{d.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="p-5 rounded-2xl" style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-semibold text-white mb-0.5">Top Posts</h3>
            <p className="text-xs text-slate-400">Your best performing content this month</p>
          </div>
          <div className="flex items-center gap-1 p-1 rounded-lg" style={{ backgroundColor: "var(--background)" }}>
            {topFilters.map((f) => (
              <button
                key={f}
                onClick={() => setTopFilter(f)}
                className="px-2.5 py-1 rounded-md text-[11px] transition-all whitespace-nowrap"
                style={{
                  backgroundColor: topFilter === f ? "rgba(255,0,105,0.12)" : "transparent",
                  color: topFilter === f ? "#ffffff" : "#a8a8a8",
                }}
              >
                {f.replace("Top by ", "")}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {TOP_POSTS.map((post, i) => (
            <motion.div
              key={post.id}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="rounded-xl overflow-hidden cursor-pointer"
              style={{ border: "1px solid rgba(255,255,255,0.06)", backgroundColor: "var(--card)" }}
            >
              <div className="relative">
                <div className="aspect-square" style={{ backgroundColor: post.thumbnailColor }} />
                <div
                  className="absolute top-2 left-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold"
                  style={{ backgroundColor: i === 0 ? "#ff0069" : "#121212", color: i === 0 ? "#ffffff" : "#a8a8a8" }}
                >
                  {i + 1}
                </div>
              </div>
              <div className="p-3 space-y-2">
                <div className="grid grid-cols-2 gap-1">
                  {[
                    { icon: Heart, value: post.likes, label: "likes" },
                    { icon: MessageSquare, value: post.comments, label: "cmts" },
                    { icon: Bookmark, value: post.saves, label: "saves" },
                    { icon: Eye, value: post.reach, label: "reach" },
                  ].map(({ icon: Icon, value, label }) => (
                    <div key={label} className="flex items-center gap-1">
                      <Icon className="w-3 h-3 flex-shrink-0 text-slate-500" />
                      <span className="text-xs font-semibold text-white">{formatNumber(value)}</span>
                      <span className="text-[10px] text-slate-500">{label}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-500">
                  <Clock className="w-2.5 h-2.5" />
                  {post.date}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default function SchedulePage() {
  const [activeTab, setActiveTab] = useState<Tab>("calendar");

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "var(--background)" }}>
      <Sidebar />

      <main className="flex-1 overflow-y-auto relative">
        {/* Frosted glass gradient overlay at top */}
        <div
          className="sticky top-0 left-0 right-0 h-24 pointer-events-none z-10"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
          }}
        />
        <div className="max-w-6xl mx-auto px-6 py-8">
          <motion.div variants={containerVariants} initial="hidden" animate="visible">
            <motion.div variants={fadeUp} className="mb-8">
              <h1 className="text-2xl font-semibold text-white mb-1">Schedule</h1>
              <p className="text-sm text-slate-400">Plan, schedule, and manage your content calendar.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-1 p-1 rounded-xl mb-6 w-fit" style={{ backgroundColor: "var(--card)" }}>
              {(["calendar", "analytics"] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{
                    backgroundColor: activeTab === tab ? "rgba(255,0,105,0.12)" : "transparent",
                    color: activeTab === tab ? "#ffffff" : "#a8a8a8",
                  }}
                >
                  {tab === "calendar" ? "Calendar" : "Account Analytics"}
                </button>
              ))}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: activeTab === "analytics" ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: activeTab === "analytics" ? -20 : 20 }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {activeTab === "calendar" ? <CalendarView /> : <AnalyticsView />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
