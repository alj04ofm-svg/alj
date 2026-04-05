"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, FileText, BarChart2, MessageCircle, CheckCircle, Users,
  Settings, ChevronLeft, ChevronRight, Plus, Filter,
  Image, Film, LayoutGrid, Star, Camera, Heart,
  MessageSquare, Bookmark, Eye, TrendingUp, ArrowUp, Clock, MapPin, Globe,
  Share2, ThumbsUp, Download, X, Zap, Award, BarChart, Check,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "calendar" | "analytics";
type ViewMode = "week" | "month";
type ContentFilter = "All" | "Reels" | "Stories" | "Carousels" | "Posts";
type TimeRange = "7D" | "30D" | "90D" | "1Y";
type PerformancePeriod = "daily" | "weekly" | "monthly";

interface DayPost {
  id: string;
  type: "post" | "reel" | "story" | "carousel";
  thumbnailColor: string;
  gradientFrom: string;
  gradientTo: string;
  time: string;
  caption: string;
  likes: number;
  comments: number;
  saves: number;
  reach: number;
  engagement: number;
}

interface CalendarDay {
  date: number;
  posts: DayPost[];
  isToday?: boolean;
  isOtherMonth?: boolean;
  dayLabel?: string;
}

interface LivePost {
  id: string;
  type: "post" | "reel" | "story" | "carousel";
  thumbnailColor: string;
  gradientFrom: string;
  gradientTo: string;
  caption: string;
  postedAt: string;
  model: string;
  likes: number;
  comments: number;
  saves: number;
  reach: number;
  engagement: number;
  geoData: { city: string; pct: number }[];
  period: "daily" | "weekly" | "monthly";
}

interface TopPost {
  id: string;
  thumbnailColor: string;
  gradientFrom: string;
  gradientTo: string;
  likes: number;
  comments: number;
  saves: number;
  reach: number;
  engagement: number;
  date: string;
  caption: string;
  period: PerformancePeriod;
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

const ACCOUNT = {
  handle: "abg.ricebunny",
  name: "Tyler — Gay Bear Fitness",
  avatarColor: "#ff0069",
  followers: 5340,
  following: 847,
  totalPosts: 124,
  avgEngagement: 4.7,
};

const WEEKLY_STATS = { posts: 8, stories: 2, reels: 1 };

const DAY_DETAIL_EXAMPLES: Record<string, { headline: string; posts: DayPost[] }> = {
  "Apr 1": {
    headline: "3 Stories · 2 Reels",
    posts: [
      { id: "d1", type: "story", thumbnailColor: "#fcaf45", gradientFrom: "#fcaf45", gradientTo: "#ff0069", time: "09:00", caption: "Morning gym setup 🏋️", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 },
      { id: "d2", type: "story", thumbnailColor: "#833ab4", gradientFrom: "#833ab4", gradientTo: "#fd1d1d", time: "09:05", caption: "Protein shake #2 💪", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 },
      { id: "d3", type: "story", thumbnailColor: "#ff0069", gradientFrom: "#ff0069", gradientTo: "#fcaf45", time: "09:10", caption: "Cheat meal preview 😈", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 },
      { id: "d4", type: "reel", thumbnailColor: "#fd1d1d", gradientFrom: "#fd1d1d", gradientTo: "#833ab4", time: "14:00", caption: "POV: When the gym is empty and you have it all to yourself", likes: 248, comments: 31, saves: 19, reach: 1840, engagement: 4.8 },
      { id: "d5", type: "reel", thumbnailColor: "#4ade80", gradientFrom: "#4ade80", gradientTo: "#60a5fa", time: "19:00", caption: "After glow 🏋️💦", likes: 412, comments: 38, saves: 67, reach: 8420, engagement: 5.4 },
    ],
  },
  "Apr 8": {
    headline: "1 Carousel Post",
    posts: [
      { id: "d6", type: "carousel", thumbnailColor: "#833ab4", gradientFrom: "#833ab4", gradientTo: "#ff0069", time: "10:30", caption: "5 exercises you're doing wrong (and how to fix them)", likes: 389, comments: 44, saves: 91, reach: 7640, engagement: 5.7 },
    ],
  },
  "Apr 15": {
    headline: "2 Posts · 1 Story",
    posts: [
      { id: "d7", type: "post", thumbnailColor: "#ff0069", gradientFrom: "#ff0069", gradientTo: "#fcaf45", time: "09:00", caption: "Cheat day and not even sorry 🐰🍔", likes: 341, comments: 29, saves: 55, reach: 6210, engagement: 4.2 },
      { id: "d8", type: "post", thumbnailColor: "#fd1d1d", gradientFrom: "#fd1d1d", gradientTo: "#833ab4", time: "15:00", caption: "Photo day mindset only 💋", likes: 287, comments: 22, saves: 43, reach: 5100, engagement: 3.9 },
      { id: "d9", type: "story", thumbnailColor: "#fcaf45", gradientFrom: "#fcaf45", gradientTo: "#ff0069", time: "18:00", caption: "Storytime: gym drama 😂", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 },
    ],
  },
  "Apr 22": {
    headline: "1 Reel",
    posts: [
      { id: "d10", type: "reel", thumbnailColor: "#4ade80", gradientFrom: "#4ade80", gradientTo: "#60a5fa", time: "12:00", caption: "Transformation check — 8 weeks in", likes: 512, comments: 47, saves: 88, reach: 9100, engagement: 6.1 },
    ],
  },
};

const MONTHLY_CALENDAR: CalendarDay[][] = [
  [
    { date: 31, posts: [{ id: "p1", type: "carousel", thumbnailColor: "#833ab4", gradientFrom: "#833ab4", gradientTo: "#fd1d1d", time: "09:00", caption: "Carousel post", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 }], isOtherMonth: true },
    { date: 1, posts: [{ id: "p2", type: "post", thumbnailColor: "#fd1d1d", gradientFrom: "#fd1d1d", gradientTo: "#ff0069", time: "10:30", caption: "", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 }], isToday: true, dayLabel: "Apr 1" },
    { date: 2, posts: [{ id: "p3", type: "reel", thumbnailColor: "#ff0069", gradientFrom: "#ff0069", gradientTo: "#fcaf45", time: "14:00", caption: "", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 }] },
    { date: 3, posts: [{ id: "p4", type: "story", thumbnailColor: "#fcaf45", gradientFrom: "#fcaf45", gradientTo: "#833ab4", time: "18:00", caption: "", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 }] },
    { date: 4, posts: [] },
    { date: 5, posts: [{ id: "p5", type: "post", thumbnailColor: "#833ab4", gradientFrom: "#833ab4", gradientTo: "#fd1d1d", time: "08:00", caption: "", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 }] },
    { date: 6, posts: [{ id: "p6", type: "story", thumbnailColor: "#ff0069", gradientFrom: "#ff0069", gradientTo: "#4ade80", time: "12:00", caption: "", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 }] },
  ],
  [
    { date: 7, posts: [{ id: "p7", type: "carousel", thumbnailColor: "#fd1d1d", gradientFrom: "#fd1d1d", gradientTo: "#833ab4", time: "09:00", caption: "", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 }] },
    { date: 8, posts: [{ id: "p8", type: "reel", thumbnailColor: "#fcaf45", gradientFrom: "#fcaf45", gradientTo: "#ff0069", time: "11:00", caption: "", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 }], dayLabel: "Apr 8" },
    { date: 9, posts: [] },
    { date: 10, posts: [{ id: "p9", type: "post", thumbnailColor: "#ff0069", gradientFrom: "#ff0069", gradientTo: "#fcaf45", time: "15:00", caption: "", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 }] },
    { date: 11, posts: [{ id: "p10", type: "story", thumbnailColor: "#833ab4", gradientFrom: "#833ab4", gradientTo: "#fd1d1d", time: "19:00", caption: "", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 }] },
    { date: 12, posts: [{ id: "p11", type: "post", thumbnailColor: "#fd1d1d", gradientFrom: "#fd1d1d", gradientTo: "#ff0069", time: "09:00", caption: "", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 }] },
    { date: 13, posts: [] },
  ],
  [
    { date: 14, posts: [{ id: "p12", type: "reel", thumbnailColor: "#833ab4", gradientFrom: "#833ab4", gradientTo: "#ff0069", time: "10:00", caption: "", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 }] },
    { date: 15, posts: [{ id: "p13", type: "carousel", thumbnailColor: "#fcaf45", gradientFrom: "#fcaf45", gradientTo: "#833ab4", time: "14:00", caption: "", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 }], dayLabel: "Apr 15" },
    { date: 16, posts: [{ id: "p14", type: "story", thumbnailColor: "#ff0069", gradientFrom: "#ff0069", gradientTo: "#4ade80", time: "18:00", caption: "", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 }] },
    { date: 17, posts: [{ id: "p15", type: "post", thumbnailColor: "#fd1d1d", gradientFrom: "#fd1d1d", gradientTo: "#833ab4", time: "09:00", caption: "", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 }] },
    { date: 18, posts: [] },
    { date: 19, posts: [{ id: "p16", type: "reel", thumbnailColor: "#833ab4", gradientFrom: "#833ab4", gradientTo: "#fcaf45", time: "12:00", caption: "", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 }] },
    { date: 20, posts: [{ id: "p17", type: "post", thumbnailColor: "#fcaf45", gradientFrom: "#fcaf45", gradientTo: "#ff0069", time: "08:00", caption: "", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 }] },
  ],
  [
    { date: 21, posts: [{ id: "p18", type: "carousel", thumbnailColor: "#ff0069", gradientFrom: "#ff0069", gradientTo: "#833ab4", time: "10:00", caption: "", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 }] },
    { date: 22, posts: [{ id: "p19", type: "story", thumbnailColor: "#fd1d1d", gradientFrom: "#fd1d1d", gradientTo: "#ff0069", time: "16:00", caption: "", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 }], dayLabel: "Apr 22" },
    { date: 23, posts: [{ id: "p20", type: "post", thumbnailColor: "#833ab4", gradientFrom: "#833ab4", gradientTo: "#fd1d1d", time: "09:00", caption: "", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 }] },
    { date: 24, posts: [{ id: "p21", type: "reel", thumbnailColor: "#fcaf45", gradientFrom: "#fcaf45", gradientTo: "#833ab4", time: "14:00", caption: "", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 }] },
    { date: 25, posts: [{ id: "p22", type: "story", thumbnailColor: "#ff0069", gradientFrom: "#ff0069", gradientTo: "#fcaf45", time: "18:00", caption: "", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 }] },
    { date: 26, posts: [] },
    { date: 27, posts: [{ id: "p23", type: "post", thumbnailColor: "#fd1d1d", gradientFrom: "#fd1d1d", gradientTo: "#833ab4", time: "10:00", caption: "", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 }] },
  ],
  [
    { date: 28, posts: [{ id: "p24", type: "reel", thumbnailColor: "#fcaf45", gradientFrom: "#fcaf45", gradientTo: "#ff0069", time: "11:00", caption: "", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 }] },
    { date: 29, posts: [{ id: "p25", type: "carousel", thumbnailColor: "#ff0069", gradientFrom: "#ff0069", gradientTo: "#833ab4", time: "15:00", caption: "", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 }] },
    { date: 30, posts: [{ id: "p26", type: "post", thumbnailColor: "#833ab4", gradientFrom: "#833ab4", gradientTo: "#fcaf45", time: "09:00", caption: "", likes: 0, comments: 0, saves: 0, reach: 0, engagement: 0 }] },
    { date: 1, posts: [], isOtherMonth: true },
    { date: 2, posts: [], isOtherMonth: true },
    { date: 3, posts: [], isOtherMonth: true },
    { date: 4, posts: [], isOtherMonth: true },
  ],
];

const LIVE_POSTS: LivePost[] = [
  { id: "lp1", type: "reel", thumbnailColor: "#4ade80", gradientFrom: "#4ade80", gradientTo: "#60a5fa", caption: "POV: You finally finish the workout but still can't outrun your fast food addiction 😂", postedAt: "Apr 1, 14:00", model: "Tyler", likes: 248, comments: 31, saves: 19, reach: 1840, engagement: 4.8, geoData: [{ city: "Manila", pct: 42 }, { city: "Quezon City", pct: 18 }, { city: "Cebu", pct: 8 }, { city: "Davao", pct: 5 }], period: "daily" },
  { id: "lp2", type: "reel", thumbnailColor: "#ff0069", gradientFrom: "#ff0069", gradientTo: "#fcaf45", caption: "After glow 🏋️💦", postedAt: "Apr 1, 19:00", model: "Tyler", likes: 412, comments: 38, saves: 67, reach: 8420, engagement: 5.4, geoData: [{ city: "Manila", pct: 52 }, { city: "Quezon City", pct: 14 }, { city: "Cebu", pct: 11 }, { city: "Davao", pct: 7 }], period: "weekly" },
  { id: "lp3", type: "carousel", thumbnailColor: "#833ab4", gradientFrom: "#833ab4", gradientTo: "#ff0069", caption: "5 exercises you're doing wrong (and how to fix them)", postedAt: "Apr 8, 10:30", model: "Tyler", likes: 389, comments: 44, saves: 91, reach: 7640, engagement: 5.7, geoData: [{ city: "Manila", pct: 38 }, { city: "Quezon City", pct: 22 }, { city: "Cebu", pct: 9 }, { city: "Davao", pct: 6 }], period: "monthly" },
  { id: "lp4", type: "post", thumbnailColor: "#ff0069", gradientFrom: "#ff0069", gradientTo: "#833ab4", caption: "Cheat day and not even sorry 🐰🍔", postedAt: "Apr 15, 09:00", model: "Tyler", likes: 341, comments: 29, saves: 55, reach: 6210, engagement: 4.2, geoData: [{ city: "Manila", pct: 45 }, { city: "Quezon City", pct: 16 }, { city: "Cebu", pct: 7 }, { city: "Davao", pct: 4 }], period: "monthly" },
  { id: "lp5", type: "reel", thumbnailColor: "#4ade80", gradientFrom: "#4ade80", gradientTo: "#60a5fa", caption: "Transformation check — 8 weeks in", postedAt: "Apr 22, 12:00", model: "Tyler", likes: 512, comments: 47, saves: 88, reach: 9100, engagement: 6.1, geoData: [{ city: "Manila", pct: 48 }, { city: "Quezon City", pct: 19 }, { city: "Cebu", pct: 10 }, { city: "Davao", pct: 8 }], period: "monthly" },
];

const ALL_TOP_POSTS: TopPost[] = [
  { id: "tp1", thumbnailColor: "#4ade80", gradientFrom: "#4ade80", gradientTo: "#60a5fa", likes: 512, comments: 47, saves: 88, reach: 9100, engagement: 6.1, date: "Apr 22", caption: "Transformation check — 8 weeks in", period: "monthly" },
  { id: "tp2", thumbnailColor: "#833ab4", gradientFrom: "#833ab4", gradientTo: "#ff0069", likes: 389, comments: 44, saves: 91, reach: 7640, engagement: 5.7, date: "Apr 8", caption: "5 exercises you're doing wrong", period: "monthly" },
  { id: "tp3", thumbnailColor: "#ff0069", gradientFrom: "#ff0069", gradientTo: "#fcaf45", likes: 412, comments: 38, saves: 67, reach: 8420, engagement: 5.4, date: "Apr 1", caption: "After glow 🏋️💦", period: "weekly" },
  { id: "tp4", thumbnailColor: "#4ade80", gradientFrom: "#4ade80", gradientTo: "#ff0069", likes: 248, comments: 31, saves: 19, reach: 1840, engagement: 4.8, date: "Apr 1", caption: "When the gym is empty", period: "daily" },
  { id: "tp5", thumbnailColor: "#ff0069", gradientFrom: "#ff0069", gradientTo: "#833ab4", likes: 341, comments: 29, saves: 55, reach: 6210, engagement: 4.2, date: "Apr 15", caption: "Cheat day and not even sorry", period: "monthly" },
  { id: "tp6", thumbnailColor: "#fcaf45", gradientFrom: "#fcaf45", gradientTo: "#833ab4", likes: 287, comments: 22, saves: 43, reach: 5100, engagement: 3.9, date: "Apr 15", caption: "Photo day mindset only", period: "weekly" },
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

const TYPE_LABEL: Record<string, string> = {
  post: "Post", reel: "Reel", story: "Story", carousel: "Carousel",
};

function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function formatEngagement(n: number): string {
  return n.toFixed(1) + "%";
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
};

// ─── Day Detail Modal ──────────────────────────────────────────────────────────

function DayDetailModal({
  dayKey,
  onClose,
  pendingItems,
  onAddToDay,
}: {
  dayKey: string;
  onClose: () => void;
  pendingItems: any[];
  onAddToDay: (item: any) => void;
}) {
  const example = DAY_DETAIL_EXAMPLES[dayKey] ?? {
    headline: "No posts scheduled",
    posts: [],
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-lg rounded-2xl overflow-hidden"
        style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.08)" }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div>
            <p className="text-white font-bold text-base">{dayKey}</p>
            <p className="text-xs mt-0.5" style={{ color: "#a8a8a8" }}>{example.headline}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl transition-colors hover:bg-white/5" style={{ color: "#a8a8a8" }}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
          {example.posts.length === 0 && pendingItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <Calendar className="w-8 h-8 mb-2" style={{ color: "#333" }} />
              <p className="text-white font-semibold">Nothing scheduled</p>
              <p className="text-xs mt-1" style={{ color: "#a8a8a8" }}>No posts for this day</p>
            </div>
          ) : (
            example.posts.map((post) => (
              <div key={post.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${post.gradientFrom}44, ${post.gradientTo}22)` }}>
                  {TYPE_ICON[post.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${typeColorMap[post.type]}18`, color: typeColorMap[post.type] }}>{TYPE_LABEL[post.type]}</span>
                    <span className="text-[10px]" style={{ color: "#a8a8a8" }}>{post.time}</span>
                  </div>
                  <p className="text-xs truncate" style={{ color: "#d1d1d1" }}>{post.caption || TYPE_LABEL[post.type]}</p>
                </div>
                {post.likes > 0 && (
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="flex items-center gap-1 text-[10px]" style={{ color: "#ff0069" }}>
                      <Heart className="w-3 h-3" /> {post.likes}
                    </div>
                    <div className="flex items-center gap-1 text-[10px]" style={{ color: "#833ab4" }}>
                      <Eye className="w-3 h-3" /> {formatNumber(post.reach)}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}

          {pendingItems.length > 0 && (
            <>
              <div className="text-xs font-semibold uppercase tracking-wide pt-2" style={{ color: "#a8a8a8", borderTop: "1px solid rgba(255,255,255,0.06)" }}>From Approvals</div>
              {pendingItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.15)" }}>
                  <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${item.accountColor ?? "#ff0069"}44, #833ab422)` }}>
                    <Check className="w-4 h-4" style={{ color: "#22c55e" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(34,197,94,0.12)", color: "#22c55e" }}>{item.contentType}</span>
                      <span className="text-[10px]" style={{ color: "#a8a8a8" }}>{item.account}</span>
                    </div>
                    <p className="text-xs truncate" style={{ color: "#d1d1d1" }}>{item.caption?.slice(0, 60)}</p>
                  </div>
                  <button
                    onClick={() => onAddToDay(item)}
                    className="px-2 py-1 rounded-lg text-[10px] font-bold text-white flex-shrink-0 transition-all hover:brightness-110"
                    style={{ backgroundColor: "#22c55e" }}
                  >
                    Add
                  </button>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button className="w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90" style={{ background: "linear-gradient(135deg, #ff0069, #fd1d1d)" }}>
            <Plus className="w-3.5 h-3.5 inline mr-2" />Add Post to {dayKey}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Calendar View ────────────────────────────────────────────────────────────
const SCHEDULE_KEY = "iginfull-schedule";

function CalendarView() {
  const [contentFilter, setContentFilter] = useState<ContentFilter>("All");
  const [viewMode, setViewMode] = useState<ViewMode>("month");
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [pendingItems, setPendingItems] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 1)); // April 2026

  const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const prevMonth = () => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  const monthLabel = `${MONTH_NAMES[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(SCHEDULE_KEY) || "[]");
      setPendingItems(stored);
    } catch { /* non-blocking */ }
  }, []);

  const contentFilters: ContentFilter[] = ["All", "Reels", "Stories", "Carousels", "Posts"];

  const calendarWeeks = MONTHLY_CALENDAR.map(week =>
    week.map(day => ({
      ...day,
      dayKey: day.dayLabel ?? (day.isOtherMonth ? `May ${day.date}` : `Apr ${day.date}`),
    }))
  );

  return (
    <div>
      <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mb-5">
        <div className="flex gap-2 flex-wrap">
          {[
            { label: "posts", count: WEEKLY_STATS.posts },
            { label: "stories", count: WEEKLY_STATS.stories },
            { label: "reels", count: WEEKLY_STATS.reels },
          ].map(({ label, count }) => (
            <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs" style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <span className="text-white font-semibold">{count}</span>
              <span className="text-slate-400">{label}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs" style={{ backgroundColor: "rgba(255,0,105,0.08)", border: "1px solid rgba(255,0,105,0.15)" }}>
            <span className="text-white font-semibold">11</span>
            <span className="text-slate-400">scheduled</span>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-lg" style={{ backgroundColor: "var(--card)" }}>
            {(["week", "month"] as ViewMode[]).map(mode => (
              <button key={mode} onClick={() => setViewMode(mode)} className="px-3 py-1.5 rounded-md text-xs font-medium transition-all capitalize"
                style={{ backgroundColor: viewMode === mode ? "rgba(255,0,105,0.12)" : "transparent", color: viewMode === mode ? "#ffffff" : "#a8a8a8" }}>
                {mode}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1 p-1 rounded-lg" style={{ backgroundColor: "var(--card)" }}>
            <Filter className="w-3.5 h-3.5 text-slate-400 ml-2" />
            {contentFilters.map((f) => (
              <button key={f} onClick={() => setContentFilter(f)} className="px-2.5 py-1 rounded-md text-xs transition-all"
                style={{ backgroundColor: contentFilter === f ? "rgba(255,0,105,0.12)" : "transparent", color: contentFilter === f ? "#ffffff" : "#a8a8a8" }}>
                {f}
              </button>
            ))}
          </div>
          <button onClick={() => window.location.href = "/content"} className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:brightness-110" style={{ background: "linear-gradient(135deg, #ff0069, #fd1d1d)" }}>
            <Plus className="w-3.5 h-3.5" />Schedule Post
          </button>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-2 rounded-lg transition-colors hover:bg-white/5" style={{ color: "#a8a8a8" }}><ChevronLeft className="w-4 h-4" /></button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">{monthLabel}</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ backgroundColor: "rgba(255,0,105,0.1)", color: "#ff0069" }}>
            <Zap className="w-2.5 h-2.5 inline mr-1" />Live
          </span>
        </div>
        <button onClick={nextMonth} className="p-2 rounded-lg transition-colors hover:bg-white/5" style={{ color: "#a8a8a8" }}><ChevronRight className="w-4 h-4" /></button>
      </motion.div>

      <motion.div variants={fadeUp} className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.06)", backgroundColor: "var(--card)" }}>
        <div className="grid grid-cols-7 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="py-3 text-center text-xs font-medium text-slate-400">{day}</div>
          ))}
        </div>

        {calendarWeeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7" style={{ borderBottom: wi < calendarWeeks.length - 1 ? "1px solid rgba(255,255,255,0.04)" : undefined }}>
            {week.map((day, di) => {
              const hasExample = !!DAY_DETAIL_EXAMPLES[day.dayKey];
              return (
                <div key={di}
                  className={`relative p-2 min-h-[88px] transition-all ${hasExample ? "cursor-pointer hover:bg-white/[0.03]" : ""}`}
                  style={{ borderRight: di < 6 ? "1px solid rgba(255,255,255,0.04)" : undefined, opacity: day.isOtherMonth ? 0.3 : 1 }}
                  onClick={() => hasExample && setSelectedDay(day.dayKey)}
                >
                  <div className="text-xs mb-1.5 flex items-center justify-center"
                    style={{ color: day.isToday ? "#ffffff" : "#a8a8a8", fontWeight: day.isToday ? 700 : 400, width: day.isToday ? 20 : undefined, height: day.isToday ? 20 : undefined, borderRadius: day.isToday ? "50%" : undefined, backgroundColor: day.isToday ? "#ff0069" : undefined }}>
                    {day.isToday ? "" : day.date}
                  </div>
                  <div className="space-y-1">
                    {day.posts.slice(0, 2).map((post) => (
                      <div key={post.id} className="h-8 rounded-lg overflow-hidden relative flex items-center justify-center" style={{ backgroundColor: post.thumbnailColor }}>
                        <div className="absolute inset-0 flex items-center justify-center opacity-60">{TYPE_ICON[post.type]}</div>
                      </div>
                    ))}
                    {day.posts.length > 2 && <div className="text-[10px] text-slate-500 pl-0.5">+{day.posts.length - 2}</div>}
                    {hasExample && day.posts.length === 0 && (
                      <div className="h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(255,0,105,0.08)", border: "1px dashed rgba(255,0,105,0.2)" }}>
                        <span className="text-[10px] font-semibold" style={{ color: "#ff0069" }}>★ View</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="flex items-center gap-4 mt-4 text-xs text-slate-400 flex-wrap">
        <span>Post types:</span>
        {Object.entries(typeColorMap).map(([type, color]) => (
          <div key={type} className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-sm" style={{ backgroundColor: color }} /><span className="capitalize">{type}s</span></div>
        ))}
        <span className="ml-auto text-[10px]" style={{ color: "#ff0069" }}>★ Click highlighted days to see posted content</span>
      </motion.div>

      <AnimatePresence>{selectedDay && <DayDetailModal dayKey={selectedDay} onClose={() => setSelectedDay(null)} pendingItems={pendingItems} onAddToDay={(item) => {
        const updated = pendingItems.filter((p: any) => p.id !== item.id);
        setPendingItems(updated);
        localStorage.setItem(SCHEDULE_KEY, JSON.stringify(updated));
        setSelectedDay(null);
      }} />}</AnimatePresence>
    </div>
  );
}

// ─── Analytics View ───────────────────────────────────────────────────────────

function AnalyticsView() {
  const [timeRange, setTimeRange] = useState<TimeRange>('30D');
  const [performancePeriod, setPerformancePeriod] = useState<PerformancePeriod>('weekly');
  const [postSort, setPostSort] = useState<'likes' | 'comments' | 'saves' | 'engagement'>('likes');

  const timeRanges: TimeRange[] = ['7D', '30D', '90D', '1Y'];
  const performancePeriods: PerformancePeriod[] = ['daily', 'weekly', 'monthly'];

  const filteredPosts = ALL_TOP_POSTS.filter(p => p.period === performancePeriod);
  const sortedPosts = [...filteredPosts].sort((a, b) => b[postSort] - a[postSort]);

  const accountStats = [
    { label: 'Followers', value: formatNumber(ACCOUNT.followers), sub: '+127 this week', delta: 2.4, color: '#833ab4', icon: <Users className='w-4 h-4' /> },
    { label: 'Total Posts', value: formatNumber(ACCOUNT.totalPosts), sub: '12 this month', delta: null, color: '#ff0069', icon: <Image className='w-4 h-4' /> },
    { label: 'Avg Reach', value: '6.8k', sub: 'per post avg', delta: null, color: '#fcaf45', icon: <Eye className='w-4 h-4' /> },
    { label: 'Engagement', value: formatEngagement(ACCOUNT.avgEngagement), sub: '+0.3% vs last', delta: 0.3, color: '#4ade80', icon: <TrendingUp className='w-4 h-4' /> },
  ];

  const geoData = [
    { city: 'Manila', pct: 42, color: '#ff0069' },
    { city: 'Quezon City', pct: 18, color: '#833ab4' },
    { city: 'Cebu', pct: 8, color: '#fd1d1d' },
    { city: 'Davao', pct: 5, color: '#fcaf45' },
    { city: 'Other PH', pct: 27, color: '#4ade80' },
  ];

  const engagementByDay = [
    { label: 'Mon', value: 72 }, { label: 'Tue', value: 88 }, { label: 'Wed', value: 64 },
    { label: 'Thu', value: 91 }, { label: 'Fri', value: 78 }, { label: 'Sat', value: 95 }, { label: 'Sun', value: 83 },
  ];
  const maxDay = Math.max(...engagementByDay.map(d => d.value));

  const visibleLivePosts = LIVE_POSTS.filter(lp => lp.period === performancePeriod || performancePeriod === 'weekly');

  return (
    <div className='space-y-6'>
      <motion.div variants={fadeUp} className='flex items-center gap-4 p-5 rounded-2xl' style={{ backgroundColor: 'var(--card)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className='w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0' style={{ background: 'linear-gradient(135deg, #833ab4, #ff0069)' }}>
          <Camera className='w-6 h-6 text-white' />
        </div>
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2 mb-0.5'>
            <span className='text-base font-semibold text-white'>@{ACCOUNT.handle}</span>
            <span className='px-2 py-0.5 rounded-full text-[10px] font-semibold' style={{ backgroundColor: 'rgba(255,0,105,0.1)', color: '#ff0069' }}>
              <Zap className='w-2.5 h-2.5 inline mr-1' />Live
            </span>
          </div>
          <div className='text-sm text-slate-400'>{ACCOUNT.name}</div>
          <div className='text-xs text-slate-500 mt-0.5'>{ACCOUNT.totalPosts} posts · {formatNumber(ACCOUNT.followers)} followers · {ACCOUNT.avgEngagement}% avg engagement</div>
        </div>
        <div className='text-right flex-shrink-0'>
          <div className='text-2xl font-black text-white'>{formatNumber(ACCOUNT.followers)}</div>
          <div className='text-[10px] text-slate-500'>Followers</div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className='grid grid-cols-4 gap-3'>
        {accountStats.map(({ label, value, sub, delta, color, icon }) => (
          <div key={label} className='p-4 rounded-xl' style={{ backgroundColor: 'var(--card)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className='flex items-center justify-between mb-2'><span className='text-xs text-slate-400'>{label}</span><span style={{ color }}>{icon}</span></div>
            <div className='text-xl font-black mb-1' style={{ color }}>{value}</div>
            <div className='flex items-center gap-1'>
              {delta !== null && delta > 0 && <ArrowUp className='w-3 h-3 text-green-400' />}
              <span className='text-[10px]' style={{ color: delta !== null && delta > 0 ? '#4ade80' : '#a8a8a8' }}>{sub}</span>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className='rounded-2xl overflow-hidden' style={{ backgroundColor: 'var(--card)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className='p-5' style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className='flex items-center justify-between mb-4'>
            <div>
              <h3 className='text-sm font-semibold text-white'>Live Post Performance</h3>
              <p className='text-xs text-slate-400 mt-0.5'>Data pulled from scheduled &amp; posted content</p>
            </div>
            <div className='flex items-center gap-1 p-1 rounded-lg' style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
              {timeRanges.map(r => (
                <button key={r} onClick={() => setTimeRange(r)} className='px-2.5 py-1 rounded-md text-[10px] font-medium transition-all'
                  style={{ backgroundColor: timeRange === r ? 'rgba(255,0,105,0.12)' : 'transparent', color: timeRange === r ? '#ff0069' : '#a8a8a8' }}>{r}</button>
              ))}
            </div>
          </div>
          <div className='flex items-center gap-3 mb-3'>
            <span className='text-[10px] font-semibold uppercase tracking-wider' style={{ color: '#444' }}>Period:</span>
            <div className='flex items-center gap-1 p-1 rounded-lg' style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
              {performancePeriods.map(p => (
                <button key={p} onClick={() => setPerformancePeriod(p)} className='px-2.5 py-1 rounded-md text-[10px] font-medium capitalize transition-all'
                  style={{ backgroundColor: performancePeriod === p ? 'rgba(255,0,105,0.12)' : 'transparent', color: performancePeriod === p ? '#ff0069' : '#a8a8a8' }}>{p}</button>
              ))}
            </div>
          </div>
          <div className='grid grid-cols-12 gap-2 text-[10px] font-semibold uppercase tracking-wider px-3 pb-2' style={{ color: '#444' }}>
            <div className='col-span-3'>Post</div>
            <div className='col-span-1 text-center'>Type</div>
            <div className='col-span-1 text-center'>Likes</div>
            <div className='col-span-1 text-center'>Cmts</div>
            <div className='col-span-1 text-center'>Saves</div>
            <div className='col-span-1 text-center'>Reach</div>
            <div className='col-span-1 text-center'>Eng%</div>
            <div className='col-span-3'>Geography</div>
            <div className='col-span-1 text-center'>Date</div>
          </div>
        </div>
        <div>
          {visibleLivePosts.length === 0 ? (
            <div className='flex flex-col items-center justify-center py-12 text-center'>
              <BarChart className='w-8 h-8 mb-2' style={{ color: '#333' }} />
              <p className='text-sm text-slate-600 font-semibold'>No posts in this period</p>
              <p className='text-xs text-slate-700 mt-1'>Switch to a different time period to see data</p>
            </div>
          ) : visibleLivePosts.map((post) => (
            <div key={post.id} className='grid grid-cols-12 gap-2 items-center px-5 py-3 transition-all hover:bg-white/[0.02]' style={{ borderTop: '1px solid rgba(255,255,255,0.03)' }}>
              <div className='col-span-3 min-w-0'>
                <div className='flex items-center gap-2'>
                  <div className='w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center' style={{ background: 'linear-gradient(135deg, ' + post.gradientFrom + '44, ' + post.gradientTo + '22)' }}>{TYPE_ICON[post.type]}</div>
                  <p className='text-xs text-white truncate'>{post.caption.split('—')[0].trim() || 'Reel post'}</p>
                </div>
              </div>
              <div className='col-span-1 text-center'>
                <span className='text-[9px] font-semibold px-1.5 py-0.5 rounded-full' style={{ backgroundColor: typeColorMap[post.type] + '18', color: typeColorMap[post.type] }}>{TYPE_LABEL[post.type]}</span>
              </div>
              <div className='col-span-1 text-center flex items-center justify-center gap-0.5'><Heart className='w-3 h-3 text-pink-400' /><span className='text-xs text-white font-semibold'>{formatNumber(post.likes)}</span></div>
              <div className='col-span-1 text-center flex items-center justify-center gap-0.5'><MessageSquare className='w-3 h-3 text-blue-400' /><span className='text-xs text-white font-semibold'>{post.comments}</span></div>
              <div className='col-span-1 text-center flex items-center justify-center gap-0.5'><Bookmark className='w-3 h-3 text-yellow-400' /><span className='text-xs text-white font-semibold'>{post.saves}</span></div>
              <div className='col-span-1 text-center flex items-center justify-center gap-0.5'><Eye className='w-3 h-3 text-purple-400' /><span className='text-xs text-white font-semibold'>{formatNumber(post.reach)}</span></div>
              <div className='col-span-1 text-center'><span className='text-xs font-bold' style={{ color: post.engagement >= 5 ? '#4ade80' : '#fcaf45' }}>{post.engagement}%</span></div>
              <div className='col-span-3'>
                <div className='space-y-1'>
                  {post.geoData.slice(0, 2).map(g => (
                    <div key={g.city} className='flex items-center gap-2'>
                      <div className='w-14 text-[9px] text-slate-400 truncate'>{g.city}</div>
                      <div className='flex-1 h-1 bg-white/5 rounded-full overflow-hidden'><div className='h-full rounded-full' style={{ width: (g.pct / 50) * 100 + '%', backgroundColor: '#ff0069' }} /></div>
                      <div className='text-[9px] font-bold w-7 text-right' style={{ color: '#ff0069' }}>{g.pct}%</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='col-span-1 text-center'><span className='text-[10px] text-slate-500'>{post.postedAt.split(',')[0]}</span></div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className='grid grid-cols-2 gap-4'>
        <div className='p-5 rounded-2xl' style={{ backgroundColor: 'var(--card)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className='flex items-center gap-2 mb-4'>
            <Globe className='w-4 h-4' style={{ color: '#ff0069' }} />
            <h3 className='text-sm font-semibold text-white'>Audience Geography</h3>
            <span className='px-2 py-0.5 rounded-full text-[10px] font-semibold ml-auto' style={{ backgroundColor: 'rgba(255,0,105,0.1)', color: '#ff0069' }}>PH dominant</span>
          </div>
          <div className='space-y-3'>
            {geoData.map(({ city, pct, color }) => (
              <div key={city} className='flex items-center gap-3'>
                <div className='w-20 text-xs text-slate-300 text-right'>{city}</div>
                <div className='flex-1 h-2 bg-white/5 rounded-full overflow-hidden'>
                  <motion.div className='h-full rounded-full' style={{ backgroundColor: color }}
                    initial={{ width: 0 }} whileInView={{ width: (pct / 42) * 100 + '%' }}
                    viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                </div>
                <div className='w-8 text-xs font-bold text-right' style={{ color }}>{pct}%</div>
              </div>
            ))}
          </div>
          <div className='mt-4 p-3 rounded-xl' style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className='text-[10px] text-slate-400'>Primary audience in <span className='text-white font-semibold'>Metro Manila</span> + Quezon City. Strong secondary reach in <span className='text-white font-semibold'>Cebu</span> and <span className='text-white font-semibold'>Davao</span>.</p>
          </div>
        </div>
        <div className='p-5 rounded-2xl' style={{ backgroundColor: 'var(--card)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div className='flex items-center gap-2 mb-4'>
            <BarChart className='w-4 h-4' style={{ color: '#833ab4' }} />
            <h3 className='text-sm font-semibold text-white'>Engagement by Day</h3>
          </div>
          <div className='flex items-end gap-2 h-32'>
            {engagementByDay.map((d) => (
              <div key={d.label} className='flex-1 flex flex-col items-center gap-2'>
                <div className='w-full rounded-t-lg transition-all' style={{ height: (d.value / maxDay) * 100 + '%', minHeight: 4, background: d.value === maxDay ? '#ff0069' : 'rgba(255,0,105,0.15)' }} />
                <span className='text-[10px] text-slate-500'>{d.label}</span>
              </div>
            ))}
          </div>
          <div className='mt-3 flex items-center justify-between'>
            <span className='text-[10px] text-slate-500'>Peak: <span className='text-white font-semibold'>Sat (95)</span></span>
            <span className='text-[10px] text-slate-500'>Avg: <span className='text-white font-semibold'>82</span></span>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className='rounded-2xl overflow-hidden' style={{ backgroundColor: 'var(--card)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className='p-5 flex items-center justify-between' style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <h3 className='text-sm font-semibold text-white'>Top Performers</h3>
            <p className='text-xs text-slate-400 mt-0.5'>Filter by period to see your best content</p>
          </div>
          <div className='flex items-center gap-2'>
            <div className='flex items-center gap-1 p-1 rounded-lg' style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
              {performancePeriods.map(p => (
                <button key={p} onClick={() => setPerformancePeriod(p)} className='px-3 py-1 rounded-md text-[11px] font-medium capitalize transition-all'
                  style={{ backgroundColor: performancePeriod === p ? 'rgba(255,0,105,0.12)' : 'transparent', color: performancePeriod === p ? '#ff0069' : '#a8a8a8' }}>{p}</button>
              ))}
            </div>
            <div className='flex items-center gap-1 p-1 rounded-lg' style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
              {(['likes', 'comments', 'saves', 'engagement'] as const).map(s => (
                <button key={s} onClick={() => setPostSort(s)} className='px-2.5 py-1 rounded-md text-[10px] font-medium capitalize transition-all'
                  style={{ backgroundColor: postSort === s ? 'rgba(131,58,180,0.12)' : 'transparent', color: postSort === s ? '#833ab4' : '#a8a8a8' }}>{s === 'engagement' ? 'Eng%' : s}</button>
              ))}
            </div>
          </div>
        </div>
        <div className='grid grid-cols-3'>
          {sortedPosts.length === 0 ? (
            <div className='col-span-3 flex flex-col items-center justify-center py-12 text-center'>
              <Award className='w-8 h-8 mb-2' style={{ color: '#333' }} />
              <p className='text-sm text-slate-600 font-semibold'>No posts in this period yet</p>
            </div>
          ) : sortedPosts.map((post, i) => (
            <div key={post.id} className='p-5 cursor-pointer relative transition-all hover:bg-white/[0.02]' style={{ borderRight: i < 2 ? '1px solid rgba(255,255,255,0.04)' : undefined }}>
              <div className='absolute top-4 left-4 w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black'
                style={{ backgroundColor: i === 0 ? '#ff0069' : i === 1 ? '#833ab4' : '#444', color: '#fff' }}>{i + 1}</div>
              <div className='w-full aspect-square rounded-xl mb-4 overflow-hidden flex items-center justify-center' style={{ background: 'linear-gradient(135deg, ' + post.gradientFrom + ', ' + post.gradientTo + ')' }}>
                <Award className='w-8 h-8 text-white/30' />
              </div>
              <div className='grid grid-cols-2 gap-2'>
                <div className='flex items-center gap-1'><Heart className='w-3 h-3 text-pink-400' /><span className='text-xs font-bold text-white'>{formatNumber(post.likes)}</span><span className='text-[9px] text-slate-500'>likes</span></div>
                <div className='flex items-center gap-1'><MessageSquare className='w-3 h-3 text-blue-400' /><span className='text-xs font-bold text-white'>{post.comments}</span><span className='text-[9px] text-slate-500'>cmts</span></div>
                <div className='flex items-center gap-1'><Bookmark className='w-3 h-3 text-yellow-400' /><span className='text-xs font-bold text-white'>{post.saves}</span><span className='text-[9px] text-slate-500'>saves</span></div>
                <div className='flex items-center gap-1'><TrendingUp className='w-3 h-3 text-green-400' /><span className='text-xs font-bold' style={{ color: '#4ade80' }}>{post.engagement}%</span><span className='text-[9px] text-slate-500'>eng</span></div>
              </div>
              <p className='text-[10px] text-slate-500 mt-3 truncate'>{post.caption}</p>
              <p className='text-[9px] text-slate-600 mt-1'>{post.date} · {post.period}</p>
            </div>
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
