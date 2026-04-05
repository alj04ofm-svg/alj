"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "@/components/layout/Sidebar";
import {
  Search, Home, Compass, Heart, PlusSquare, Bell, Bookmark,
  MoreHorizontal, Send, MessageCircle, Eye, BookmarkIcon,
  BarChart2, ExternalLink, ChevronDown, Check, Play, TrendingUp,
  Award, Users, Sparkles, Grid3X3, Film,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Post {
  id: string;
  creator: Creator;
  thumbnail: string;
  video?: boolean;
  caption: string;
  hashtags: string[];
  likes: number;
  comments: number;
  views: number;
  igHandle: string;
  igUrl: string;
  niche: string;
  postedAt: string;
  igPosted: boolean;
  igLink?: string;
  gradient: string;
}

interface Creator {
  handle: string;
  name: string;
  initials: string;
  color: string;
  followers: number;
  niche: string;
  igVerified: boolean;
}

// ─── Feed data ────────────────────────────────────────────────────────────────

const NICHES = ["All", "Fitness", "Lifestyle", "Fashion", "Food", "Travel", "Beauty", "Comedy"];

const CREATORS: Creator[] = [
  { handle: "@tyler_fitspo", name: "Tyler", initials: "T", color: "#ff0069", followers: 84200, niche: "Fitness", igVerified: true },
  { handle: "@ren.abg", name: "Ren", initials: "R", color: "#833ab4", followers: 124000, niche: "Lifestyle", igVerified: true },
  { handle: "@ellamira.xo", name: "Ella", initials: "E", color: "#78c257", followers: 56700, niche: "Fashion", igVerified: false },
  { handle: "@chef.marcus", name: "Marcus", initials: "M", color: "#fcaf45", followers: 231000, niche: "Food", igVerified: true },
  { handle: "@jade.lux", name: "Jade", initials: "J", color: "#00f4e2", followers: 41000, niche: "Beauty", igVerified: false },
  { handle: "@theace.fit", name: "Ace", initials: "A", color: "#a78bfa", followers: 98300, niche: "Fitness", igVerified: true },
];

const GRADIENTS = [
  "linear-gradient(135deg, #ff0069 0%, #fd1d1d 50%, #fcaf45 100%)",
  "linear-gradient(135deg, #833ab4 0%, #ff0069 100%)",
  "linear-gradient(135deg, #fcaf45 0%, #ff0069 100%)",
  "linear-gradient(135deg, #78c257 0%, #00f4e2 100%)",
  "linear-gradient(135deg, #833ab4 0%, #fd1d1d 100%)",
  "linear-gradient(135deg, #ff0069 0%, #833ab4 100%)",
];

const POSTS: Post[] = [
  { id: "1", creator: CREATORS[0], thumbnail: "https://picsum.photos/seed/fit1/400/500", video: true, caption: "The 5am club is real. Day 47. This is what showing up every single day looks like.", hashtags: ["#fitness", "#gymtok", "#5amclub", "#consistency"], likes: 8412, comments: 234, views: 89400, igHandle: "@tyler_fitspo", igUrl: "https://instagram.com", niche: "Fitness", postedAt: "2h ago", igPosted: true, igLink: "https://instagram.com/p/abc123", gradient: GRADIENTS[0] },
  { id: "2", creator: CREATORS[1], thumbnail: "https://picsum.photos/seed/life1/400/500", caption: "Vibes only. ABG aesthetic at its finest.", hashtags: ["#abg", "#lifestyle", "#aesthetic", "#aestheticvibes"], likes: 6200, comments: 89, views: 67200, igHandle: "@ren.abg", igUrl: "https://instagram.com", niche: "Lifestyle", postedAt: "4h ago", igPosted: true, igLink: "https://instagram.com/p/def456", gradient: GRADIENTS[1] },
  { id: "3", creator: CREATORS[2], thumbnail: "https://picsum.photos/seed/fash1/400/500", caption: "OOTD but make it intentional. Every detail matters.", hashtags: ["#ootd", "#fashion", "#style", "#fashionblogger"], likes: 4120, comments: 56, views: 34100, igHandle: "@ellamira.xo", igUrl: "https://instagram.com", niche: "Fashion", postedAt: "6h ago", igPosted: true, igLink: "https://instagram.com/p/ghi789", gradient: GRADIENTS[2] },
  { id: "4", creator: CREATORS[3], thumbnail: "https://picsum.photos/seed/food1/400/500", caption: "This dish took 3 hours to make. Worth every second. Recipe up now on the link.", hashtags: ["#foodie", "#chef", "#foodporn", "#homemade"], likes: 18200, comments: 445, views: 201000, igHandle: "@chef.marcus", igUrl: "https://instagram.com", niche: "Food", postedAt: "8h ago", igPosted: true, igLink: "https://instagram.com/p/jkl012", gradient: GRADIENTS[3] },
  { id: "5", creator: CREATORS[4], thumbnail: "https://picsum.photos/seed/beauty1/400/500", caption: "Minimal makeup, maximum glow. This lighting changed everything.", hashtags: ["#beauty", "#makeup", "#glow", "#skincare"], likes: 3870, comments: 42, views: 28900, igHandle: "@jade.lux", igUrl: "https://instagram.com", niche: "Beauty", postedAt: "12h ago", igPosted: false, gradient: GRADIENTS[4] },
  { id: "6", creator: CREATORS[5], thumbnail: "https://picsum.photos/seed/fit2/400/500", video: true, caption: "Pull-up progression: Week 1 to Week 12. No shortcuts. No excuses.", hashtags: ["#fitness", "#gymprogress", "#pullup", "#progress"], likes: 12300, comments: 312, views: 145000, igHandle: "@theace.fit", igUrl: "https://instagram.com", niche: "Fitness", postedAt: "1d ago", igPosted: true, igLink: "https://instagram.com/p/mno345", gradient: GRADIENTS[5] },
  { id: "7", creator: CREATORS[0], thumbnail: "https://picsum.photos/seed/fit3/400/500", caption: "Leg day isn't popular. But neither is giving up.", hashtags: ["#legs", "#gym", "#legday", "#fitnessmotivation"], likes: 7100, comments: 178, views: 76300, igHandle: "@tyler_fitspo", igUrl: "https://instagram.com", niche: "Fitness", postedAt: "1d ago", igPosted: true, igLink: "https://instagram.com/p/pqr678", gradient: GRADIENTS[0] },
  { id: "8", creator: CREATORS[1], thumbnail: "https://picsum.photos/seed/life2/400/500", video: true, caption: "Golden hour never disappoints.", hashtags: ["#golden", "#lifestyle", "#hour", "#vibes"], likes: 9800, comments: 145, views: 91200, igHandle: "@ren.abg", igUrl: "https://instagram.com", niche: "Lifestyle", postedAt: "2d ago", igPosted: true, igLink: "https://instagram.com/p/stu901", gradient: GRADIENTS[1] },
];

// ─── Leaderboard ──────────────────────────────────────────────────────────────

const LEADERBOARD: (Creator & { rank: number; igfViews: number })[] = [
  { rank: 1, ...CREATORS[3], igfViews: 1240000 },
  { rank: 2, ...CREATORS[5], igfViews: 890000 },
  { rank: 3, ...CREATORS[1], igfViews: 674000 },
  { rank: 4, ...CREATORS[0], igfViews: 521000 },
  { rank: 5, ...CREATORS[2], igfViews: 312000 },
  { rank: 6, ...CREATORS[4], igfViews: 198000 },
];

// ─── Format numbers ──────────────────────────────────────────────────────────

function formatNum(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return n.toString();
}

// ─── Post Card ────────────────────────────────────────────────────────────────

function PostCard({
  post,
  liked,
  saved,
  onToggleLike,
  onToggleSave,
}: {
  post: Post;
  liked: boolean;
  saved: boolean;
  onToggleLike: (id: string) => void;
  onToggleSave: (id: string) => void;
}) {
  const [likeCount, setLikeCount] = useState(post.likes);
  const [localLiked, setLocalLiked] = useState(liked);
  const [localSaved, setLocalSaved] = useState(saved);

  const handleLike = () => {
    setLocalLiked(l => !l);
    if (!localLiked) {
      setLikeCount(c => c + 1);
    } else {
      setLikeCount(c => c - 1);
    }
    onToggleLike(post.id);
  };

  const handleSave = () => {
    setLocalSaved(s => !s);
    onToggleSave(post.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl overflow-hidden border"
      style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "var(--card)" }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={post.thumbnail}
          alt={`Post by ${post.creator.name}`}
          className="w-full h-full object-cover"
          onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        {/* Fallback gradient if image fails */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{ background: post.gradient }}
        />
        {/* Video play button */}
        {post.video && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)" }}>
              <Play size={20} className="text-white fill-white ml-1" />
            </div>
          </div>
        )}
        {/* Views badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium" style={{ background: "rgba(0,0,0,0.6)", color: "#fff" }}>
          <Eye size={10} />
          {formatNum(post.views)}
        </div>
        {/* IG Posted badge */}
        {post.igPosted && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold" style={{ background: "linear-gradient(135deg, #ff0069, #833ab4)", color: "#fff" }}>
            <Check size={9} /> IG Posted
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4">
        {/* Creator row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ backgroundColor: post.creator.color }}
            >
              {post.creator.initials}
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-white text-xs font-semibold">{post.creator.handle}</span>
                {post.creator.igVerified && (
                  <Check size={10} className="text-ig-pink" />
                )}
              </div>
              <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>{post.creator.niche} · {post.postedAt}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "var(--muted-foreground)" }}>
              {post.niche}
            </span>
            <a href={post.igUrl} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-full flex items-center justify-center transition-colors hover:bg-white/10" style={{ color: "var(--muted-foreground)" }}>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Caption */}
        <p className="text-sm text-white leading-relaxed mb-2">{post.caption}</p>
        <p className="text-xs mb-3" style={{ color: "#ff0069" }}>{post.hashtags.slice(0, 2).join(" ")}</p>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <div className="flex items-center gap-1">
            <button
              onClick={handleLike}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
              style={{ color: localLiked ? "#ff0069" : "var(--muted-foreground)", background: localLiked ? "rgba(255,0,105,0.1)" : "transparent" }}
            >
              <Heart size={15} className={localLiked ? "fill-current" : ""} />
            </button>
            <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{formatNum(likeCount)}</span>

            <button className="w-8 h-8 rounded-full flex items-center justify-center transition-colors ml-1" style={{ color: "var(--muted-foreground)" }}>
              <MessageCircle size={14} />
            </button>
            <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>{formatNum(post.comments)}</span>
          </div>
          <button
            onClick={handleSave}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ color: localSaved ? "#fcaf45" : "var(--muted-foreground)" }}
          >
            <BookmarkIcon size={14} className={localSaved ? "fill-current" : ""} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Leaderboard sidebar card ─────────────────────────────────────────────────

function LeaderboardCard({ entries }: { entries: typeof LEADERBOARD }) {
  return (
    <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "var(--card)" }}>
      <div className="px-5 py-4 flex items-center gap-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <Award size={15} style={{ color: "#fcaf45" }} />
        <span className="text-white text-sm font-semibold">IGINFULL Leaderboard</span>
      </div>
      <div>
        {entries.map((entry, i) => (
          <div key={entry.handle} className="px-5 py-3 flex items-center gap-3 hover:bg-white/5 transition-colors" style={{ borderBottom: i < entries.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
            <span
              className="text-sm font-black w-5 flex-shrink-0 text-center"
              style={{ color: entry.rank === 1 ? "#fcaf45" : entry.rank === 2 ? "#a8a8a8" : entry.rank === 3 ? "#cd7f32" : "var(--muted-foreground)" }}
            >
              {entry.rank}
            </span>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
              style={{ backgroundColor: entry.color }}
            >
              {entry.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-medium truncate">{entry.handle}</p>
              <p className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>{entry.niche}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-white text-xs font-bold">{formatNum(entry.igfViews)}</p>
              <p className="text-[9px]" style={{ color: "var(--muted-foreground)" }}>views</p>
            </div>
          </div>
        ))}
      </div>
      <div className="px-5 py-3 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <a href="#" className="text-xs font-medium hover:underline" style={{ color: "#ff0069" }}>View full leaderboard →</a>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type View = "for-you" | "following" | "niche";

const VIEWS: { id: View; label: string; icon: React.ElementType }[] = [
  { id: "for-you", label: "For You", icon: Sparkles },
  { id: "following", label: "Following", icon: Users },
  { id: "niche", label: "By Niche", icon: Grid3X3 },
];

export default function CommunityPage() {
  const [activeView, setActiveView] = useState<View>("for-you");
  const [activeNiche, setActiveNiche] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());
  const [feed, setFeed] = useState<Post[]>(POSTS);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [following, setFollowing] = useState<Set<string>>(new Set());

  const filteredPosts = feed.filter(post => {
    const matchesSearch = !searchQuery ||
      post.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.creator.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.hashtags.some(h => h.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesNiche = activeNiche === "All" || post.niche === activeNiche;
    return matchesSearch && matchesNiche;
  });

  const handleToggleLike = (postId: string) => {
    setLikedPosts(prev => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  };

  const handleToggleSave = (postId: string) => {
    setSavedPosts(prev => {
      const next = new Set(prev);
      if (next.has(postId)) next.delete(postId);
      else next.add(postId);
      return next;
    });
  };

  const handleToggleFollow = (handle: string) => {
    setFollowing(prev => {
      const next = new Set(prev);
      if (next.has(handle)) next.delete(handle);
      else next.add(handle);
      return next;
    });
  };

  const topCreators = CREATORS.sort((a, b) => b.followers - a.followers).slice(0, 4);

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "var(--background)" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", backgroundColor: "var(--background)" }}
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {/* Typeless logo */}
              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[9px] font-black text-white" style={{ background: "linear-gradient(135deg, #ff0069, #833ab4)" }}>
                IG
              </div>
              <span className="text-white font-black text-base tracking-tight">IGINFULL</span>
            </div>
            <div className="hidden md:flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-medium" style={{ backgroundColor: "rgba(255,0,105,0.08)", border: "1px solid rgba(255,0,105,0.15)", color: "#ff0069" }}>
              <TrendingUp size={10} /> IGINFULL Community
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl flex-shrink-0"
              style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <Search size={13} style={{ color: "var(--muted-foreground)" }} />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search reels, creators, hashtags..."
                className="bg-transparent text-white text-xs outline-none placeholder:text-muted-foreground w-52"
              />
            </div>

            {/* View toggles */}
            <div className="hidden md:flex items-center gap-1 p-1 rounded-xl" style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.06)" }}>
              {VIEWS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveView(id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{
                    backgroundColor: activeView === id ? "rgba(255,0,105,0.1)" : "transparent",
                    color: activeView === id ? "#ff0069" : "var(--muted-foreground)",
                  }}
                >
                  <Icon size={11} />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Niche filter pills */}
        <div className="flex items-center gap-2 px-6 py-3 overflow-x-auto flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          {NICHES.map(niche => (
            <button
              key={niche}
              onClick={() => setActiveNiche(niche)}
              className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-all"
              style={
                activeNiche === niche
                  ? { backgroundColor: "#ff0069", color: "#fff" }
                  : { backgroundColor: "rgba(255,255,255,0.05)", color: "var(--muted-foreground)", border: "1px solid rgba(255,255,255,0.06)" }
              }
            >
              {niche}
            </button>
          ))}
        </div>

        {/* Feed body */}
        <div className="flex flex-1 min-h-0 overflow-hidden">

          {/* ── Feed ── */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {/* Stats strip */}
            <div className="flex items-center gap-4 mb-6 overflow-x-auto pb-2">
              {topCreators.map((c, i) => (
                <motion.div
                  key={c.handle}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex flex-col items-center gap-1.5 flex-shrink-0"
                >
                  <div className="relative">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ backgroundColor: c.color, boxShadow: `0 0 0 2px var(--background), 0 0 0 4px #ff0069` }}
                    >
                      {c.initials}
                    </div>
                    {i === 0 && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: "#fcaf45" }}>
                        <Award size={9} className="text-white" />
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-white font-medium truncate max-w-[60px] text-center">{c.handle.replace("@", "")}</span>
                </motion.div>
              ))}
              <div className="h-8 w-px flex-shrink-0" style={{ backgroundColor: "rgba(255,255,255,0.06)" }} />
              <div className="flex-shrink-0 text-center">
                <p className="text-white text-xs font-semibold">+2,847</p>
                <p className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>creators</p>
              </div>
              <div className="flex-shrink-0 text-center">
                <p className="text-white text-xs font-semibold">14.2M</p>
                <p className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>views/mo</p>
              </div>
            </div>

            {/* Feed grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeView}-${activeNiche}-${searchQuery}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
              >
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post, i) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <PostCard
                        post={post}
                        liked={likedPosts.has(post.id)}
                        saved={savedPosts.has(post.id)}
                        onToggleLike={handleToggleLike}
                        onToggleSave={handleToggleSave}
                      />
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full py-20 text-center">
                    <Film size={40} style={{ color: "var(--muted-foreground)" }} className="mx-auto mb-3 opacity-40" />
                    <p className="text-white font-semibold">No reels found</p>
                    <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Try a different niche or search term</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Right sidebar ── */}
          <div className="hidden xl:flex w-80 flex-shrink-0 flex-col gap-5 px-5 py-6 overflow-y-auto" style={{ borderLeft: "1px solid rgba(255,255,255,0.04)" }}>

            {/* Leaderboard */}
            <LeaderboardCard entries={LEADERBOARD} />

            {/* IG link CTA */}
            <div
              className="rounded-2xl p-5 border"
              style={{ background: "linear-gradient(135deg, rgba(131,58,180,0.12), rgba(255,0,105,0.08))", borderColor: "rgba(131,58,180,0.2)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <ExternalLink size={14} style={{ color: "#ff0069" }} />
                <span className="text-white text-sm font-semibold">Promote on Instagram</span>
              </div>
              <p className="text-xs mb-4 leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                Every reel you post through IGINFULL gets featured here. Drive views to your real profile and grow your audience.
              </p>
              <button
                onClick={() => alert("Connect your Instagram account in Settings → Connected Accounts")}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:opacity-90"
                style={{ background: "linear-gradient(135deg, #ff0069, #833ab4)" }}
              >
                Connect IG Account
              </button>
            </div>

            {/* Discover creators */}
            <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "var(--card)" }}>
              <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span className="text-white text-sm font-semibold">Discover Creators</span>
                <button className="text-xs font-medium" style={{ color: "#ff0069" }}>See all</button>
              </div>
              <div className="p-4 space-y-3">
                {CREATORS.slice(0, 4).map(c => {
                  const isFollowing = following.has(c.handle);
                  return (
                    <div key={c.handle} className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                        style={{ backgroundColor: c.color }}
                      >
                        {c.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1">
                          <span className="text-white text-xs font-medium truncate">{c.handle}</span>
                          {c.igVerified && <Check size={9} className="text-ig-pink flex-shrink-0" />}
                        </div>
                        <p className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>{c.niche} · {formatNum(c.followers)} followers</p>
                      </div>
                      <button
                        onClick={() => handleToggleFollow(c.handle)}
                        className="px-3 py-1 rounded-lg text-[10px] font-semibold flex-shrink-0 transition-all"
                        style={
                          isFollowing
                            ? { backgroundColor: "transparent", color: "var(--muted-foreground)", border: "1px solid rgba(255,255,255,0.1)" }
                            : { backgroundColor: "rgba(255,0,105,0.08)", color: "#ff0069", border: "1px solid rgba(255,0,105,0.15)" }
                        }
                      >
                        {isFollowing ? "Following" : "Follow"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer links */}
            <div className="text-[10px] leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
              <div className="flex flex-wrap gap-x-2 gap-y-1 mb-3">
                {["About", "Privacy", "Terms", "Help", "Creator Guidelines"].map(l => (
                  <a key={l} href="#" className="hover:underline">{l}</a>
                ))}
              </div>
              <p>© 2026 IGINFULL · Built By ALJ</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
