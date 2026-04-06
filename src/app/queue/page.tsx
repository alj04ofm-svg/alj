"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import {
  ListOrdered, Clock, RotateCcw, Copy, Check, Globe,
  ChevronRight, Zap, Filter, Calendar, TrendingUp,
  MessageSquare, Hash, Star, AlertCircle,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────────────────────────

interface QueueItem {
  id: string;
  model: string;
  niche: string;
  hook: string;
  caption: string;
  hashtags: string[];
  status: "queued" | "scheduled" | "posted" | "draft";
  account?: string;
  accountColor?: string;
  contentType?: string;
  scheduledAt?: string;
  createdAt?: string;
  thumb?: string;
  modelColor?: string;
  modelImg?: string;
}

interface ModelProfile {
  name: string;
  niche: string;
  color: string;
  img: string;
  handle: string;
}

// ── Model profiles ───────────────────────────────────────────────────────────

const MODELS: ModelProfile[] = [
  { name: "Tyler",   niche: "Fitness", color: "#ff0069", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=80&h=80&fit=crop&crop=face", handle: "@abg.ricebunny" },
  { name: "Ren",     niche: "Fitness", color: "#833ab4", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&h=80&fit=crop&crop=face", handle: "@rhinxrenx" },
  { name: "Ella",    niche: "GFE",     color: "#22c55e", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face", handle: "@ellamira" },
  { name: "Amam",    niche: "GFE",     color: "#fcaf45", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=80&h=80&fit=crop&crop=face", handle: "@amam" },
];

const MODEL_MAP: Record<string, ModelProfile> = Object.fromEntries(
  MODELS.map(m => [m.name, m])
);

// ── Seed queue items (real approved briefs) ─────────────────────────────────

const SEED_QUEUE: QueueItem[] = [
  { id: "q1", model: "Tyler", niche: "Fitness", hook: "Gym on Easter Sunday — bunny ears optional", caption: "Carbs? In THIS economy? 💪🐰", hashtags: ["#fitness", "#gymlife", "#abgricebunny", "#lgbtq", "#gymmotivation", "#easter"], status: "queued" },
  { id: "q2", model: "Ren",   niche: "Fitness", hook: "Western vs Songkran", caption: "East or West, thirst trap is best 🖤", hashtags: ["#fitness", "#rhinxrenx", "#songkran2026", "#gym", "#lgbtq", "#thirsttrap"], status: "queued" },
  { id: "q3", model: "Ella",  niche: "GFE",     hook: "POV: You sent the right text and she replied back", caption: "That feeling when the text lands 💋", hashtags: ["#gfe", "#ellamira", "#relationshiptips", "#flirty", "#lgbtq", "#gfecontent"], status: "queued" },
  { id: "q4", model: "Amam",  niche: "GFE",     hook: "Morning routine with coffee, unbothered", caption: "Coffee first, everything else later ☕", hashtags: ["#gfe", "#amam", "#morningroutine", "#coffeelover", "#gfecontent", "#lgbtq"], status: "queued" },
  { id: "q5", model: "Tyler", niche: "Fitness", hook: "POV: It's photo day and I pretend to eat a big bowl of rice first", caption: "Cheat day calories don't count 🐰", hashtags: ["#fitness", "#abgricebunny", "#cheatday", "#gymlife", "#lgbtq", "#foodie"], status: "queued" },
  { id: "q6", model: "Ren",   niche: "Fitness", hook: "Before vs During Songkran", caption: "Adapt or get soaked 💦", hashtags: ["#fitness", "#rhinxrenx", "#songkran", "#gym", "#lgbtq", "#thirsttrap"], status: "queued" },
  { id: "q7", model: "Ella",  niche: "GFE",     hook: "Late night check-in text, sends voice note", caption: "Just checking in 🤍", hashtags: ["#gfe", "#ellamira", "#voicecheck", "#gfecontent", "#lgbtq", "#latecheckin"], status: "queued" },
  { id: "q8", model: "Amam",  niche: "GFE",     hook: "Sunday reset — skincare, tea, calm energy", caption: "Reset mode: ON 🫖", hashtags: ["#gfe", "#amam", "#sundayreset", "#skincare", "#gfecontent", "#lgbtq"], status: "queued" },
  { id: "q9", model: "Tyler", niche: "Fitness", hook: "Monday recovery, on the floor, heavy breathing", caption: "Monday. I earned this. 😮‍💨", hashtags: ["#fitness", "#abgricebunny", "#mondayvibes", "#gymrecovery", "#lgbtq", "#gymlife"], status: "scheduled" },
  { id: "q10", model: "Ren",  niche: "Fitness", hook: "Diet Before vs After", caption: "Carbs hit different on a cut 🍚", hashtags: ["#fitness", "#rhinxrenx", "#cheatday", "#gymlife", "#lgbtq", "#cutseason"], status: "scheduled" },
];

// ── Storage keys ─────────────────────────────────────────────────────────────

const QUEUE_KEY = "iginfull-queue";
const PIPELINE_KEY = "iginfull-pipeline";
const SCHEDULE_KEY = "iginfull-schedule";

function loadQueue(): QueueItem[] {
  if (typeof window === "undefined") return SEED_QUEUE;
  try {
    const stored = localStorage.getItem(QUEUE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* non-blocking */ }
  return SEED_QUEUE;
}

function saveQueue(items: QueueItem[]) {
  localStorage.setItem(QUEUE_KEY, JSON.stringify(items));
}

// Pull queued items from the pipeline and schedule approvals
function loadExternalQueueItems(): QueueItem[] {
  if (typeof window === "undefined") return [];
  const items: QueueItem[] = [];
  try {
    // From schedule approvals
    const scheduled = JSON.parse(localStorage.getItem(SCHEDULE_KEY) || "[]");
    for (const s of scheduled) {
      items.push({
        id: s.id ?? `ext-${Date.now()}`,
        model: s.account?.split(" ")[0] ?? "Tyler",
        niche: "GFE",
        hook: s.caption?.slice(0, 50) ?? "",
        caption: s.caption ?? "",
        hashtags: Array.isArray(s.hashtags) ? s.hashtags : [],
        status: "queued",
        account: s.account,
        accountColor: s.accountColor,
        contentType: s.contentType,
        scheduledAt: s.scheduledAt,
        createdAt: "Just now",
      });
    }
    // From pipeline with approved status
    const pipeline = JSON.parse(localStorage.getItem(PIPELINE_KEY) || "[]");
    for (const p of pipeline) {
      if (p.status === "approved" || p.status === "clips_received") {
        items.push({
          id: p._id,
          model: p.modelName ?? p.model ?? "Tyler",
          niche: p.niche ?? "GFE",
          hook: p.hook ?? "",
          caption: p.caption ?? "",
          hashtags: Array.isArray(p.hashtags) ? p.hashtags : [],
          status: "queued",
          modelColor: MODEL_MAP[p.model ?? "Tyler"]?.color ?? "#ff0069",
          modelImg: MODEL_MAP[p.model ?? "Tyler"]?.img,
          createdAt: "Just now",
        });
      }
    }
  } catch { /* non-blocking */ }
  return items;
}

// ── Rotor logic ───────────────────────────────────────────────────────────────

// Spacing rules: don't show more than 2 posts from the same model consecutively
function applyRotorOrder(items: QueueItem[]): QueueItem[] {
  if (items.length <= 2) return items;
  const result: QueueItem[] = [];
  const remaining = [...items];
  let lastModel = "";

  while (remaining.length > 0) {
    // Find first item from a different model than the last one
    const idx = remaining.findIndex(item => item.model !== lastModel);
    if (idx === -1) {
      // All remaining are from same model — just append them
      result.push(...remaining);
      break;
    }
    const [item] = remaining.splice(idx, 1);
    result.push(item);
    lastModel = item.model;
  }
  return result;
}

// ── Meta limit constants ─────────────────────────────────────────────────────

const META_WEEKLY_LIMIT = 20; // Meta Business Suite soft limit
const META_MONTHLY_LIMIT = 150;

// ── Main Page ────────────────────────────────────────────────────────────────

export default function QueuePage() {
  const [queueItems, setQueueItems] = useState<QueueItem[]>(SEED_QUEUE);
  const [externalItems, setExternalItems] = useState<QueueItem[]>([]);
  const [activeFilter, setActiveFilter] = useState<"all" | "queued" | "scheduled">("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"queue" | "rotor">("queue");

  // Load queue from localStorage
  useEffect(() => {
    setQueueItems(loadQueue());
    setExternalItems(loadExternalQueueItems());
  }, []);

  // Refresh external items every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setExternalItems(loadExternalQueueItems());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Build rotor-ordered queue
  const allQueued = queueItems.filter(i => i.status === "queued" || i.status === "scheduled");
  const rotorOrder = applyRotorOrder([...allQueued]);

  const displayedItems = activeTab === "rotor"
    ? rotorOrder.slice(0, 10)
    : queueItems.filter(i => activeFilter === "all" || i.status === activeFilter);

  const queuedCount = queueItems.filter(i => i.status === "queued").length + externalItems.length;
  const scheduledCount = queueItems.filter(i => i.status === "scheduled").length;

  const copyToClipboard = async (item: QueueItem) => {
    const caption = item.caption;
    const hashtags = item.hashtags.join(" ");
    const text = `${caption}\n\n${hashtags}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const markQueued = (id: string) => {
    setQueueItems(prev => prev.map(i => i.id === id ? { ...i, status: "queued" as const } : i));
    saveQueue(queueItems.map(i => i.id === id ? { ...i, status: "queued" as const } : i));
  };

  const markScheduled = (id: string) => {
    setQueueItems(prev => prev.map(i => i.id === id ? { ...i, status: "scheduled" as const } : i));
    saveQueue(queueItems.map(i => i.id === id ? { ...i, status: "scheduled" as const } : i));
  };

  const removeFromQueue = (id: string) => {
    setQueueItems(prev => prev.filter(i => i.id !== id));
    saveQueue(queueItems.filter(i => i.id !== id));
  };

  const modelProfile = (modelName: string): ModelProfile =>
    MODEL_MAP[modelName] ?? { name: modelName, niche: "", color: "#ff0069", img: "", handle: "" };

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "var(--background)" }}>
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-10">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <ListOrdered className="w-4 h-4" style={{ color: "#ff0069" }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#ff0069" }}>Scheduling Queue</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-1">Content Queue</h1>
            <p className="text-sm" style={{ color: "#a8a8a8" }}>
              Your rotor. Unlimited queue — Meta handles the actual scheduling.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }} className="grid grid-cols-4 gap-3 mb-6">
            <StatCard label="In Queue" value={queuedCount} icon={<ListOrdered className="w-4 h-4" />} color="#ff0069" />
            <StatCard label="Scheduled" value={scheduledCount} icon={<Calendar className="w-4 h-4" />} color="#f59e0b" />
            <StatCard label="Meta Limit / Week" value={`${scheduledCount}/${META_WEEKLY_LIMIT}`} icon={<TrendingUp className="w-4 h-4" />} color="#833ab4" subLabel="soft cap" />
            <StatCard label="Rotor Depth" value={rotorOrder.length} icon={<RotateCcw className="w-4 h-4" />} color="#22c55e" subLabel="next 10 posts" />
          </motion.div>

          {/* Tab switcher */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="flex items-center gap-1 p-1 rounded-xl mb-6 w-fit" style={{ backgroundColor: "var(--card)" }}>
            {(["queue", "rotor"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                style={{
                  backgroundColor: activeTab === tab ? "rgba(255,0,105,0.12)" : "transparent",
                  color: activeTab === tab ? "#ffffff" : "#a8a8a8",
                }}
              >
                {tab === "queue" ? "Full Queue" : "Rotor Preview"}
              </button>
            ))}
          </motion.div>

          {/* Creator Studio CTA */}
          {activeTab === "rotor" && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mb-5 flex items-center gap-3 px-5 py-4 rounded-2xl" style={{ background: "linear-gradient(135deg, rgba(255,0,105,0.08), rgba(131,58,180,0.08))", border: "1px solid rgba(255,0,105,0.15)" }}>
              <Globe className="w-5 h-5 flex-shrink-0" style={{ color: "#ff0069" }} />
              <div>
                <p className="text-sm font-semibold text-white">Post via Creator Studio</p>
                <p className="text-xs mt-0.5" style={{ color: "#a8a8a8" }}>
                  Copy the caption + hashtags, then head to <a href="https://business.instagram.com/creator/content-publishing" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: "#ff0069" }}>Creator Studio</a> to publish. Queue is unlimited on our end — Meta caps theirs.
                </p>
              </div>
            </motion.div>
          )}

          {/* Filter pills */}
          <div className="flex gap-2 mb-5">
            {(["all", "queued", "scheduled"] as const).map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                style={{
                  backgroundColor: activeFilter === f ? "rgba(255,0,105,0.15)" : "rgba(255,255,255,0.04)",
                  color: activeFilter === f ? "#ffffff" : "#a8a8a8",
                  border: activeFilter === f ? "1px solid rgba(255,0,105,0.3)" : "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Queue list */}
          <AnimatePresence mode="popLayout">
            {displayedItems.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
                <ListOrdered className="w-10 h-10 mb-3" style={{ color: "rgba(255,0,105,0.3)" }} />
                <p className="text-white font-semibold text-base">Queue is empty</p>
                <p className="text-sm mt-1" style={{ color: "#a8a8a8" }}>Approved briefs will appear here automatically.</p>
              </motion.div>
            ) : (
              displayedItems.map((item, idx) => {
                const profile = modelProfile(item.model);
                const isCopied = copiedId === item.id;
                const rotorNumber = activeTab === "rotor" ? idx + 1 : null;

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25, delay: idx * 0.03 }}
                    className="mb-3 rounded-2xl overflow-hidden group"
                    style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="flex items-center gap-4 p-4">
                      {/* Rotor number */}
                      {rotorNumber !== null && (
                        <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm" style={{ backgroundColor: "rgba(255,0,105,0.15)", color: "#ff0069" }}>
                          {rotorNumber}
                        </div>
                      )}

                      {/* Model avatar */}
                      <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden" style={{ border: `2px solid ${profile.color}44` }}>
                        {profile.img ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={profile.img} alt={profile.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: profile.color, color: "#fff" }}>
                            {profile.name[0]}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs font-semibold text-white">{item.model}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: `${profile.color}18`, color: profile.color }}>{item.niche}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{
                            backgroundColor: item.status === "scheduled" ? "rgba(245,158,11,0.12)" : "rgba(34,197,94,0.1)",
                            color: item.status === "scheduled" ? "#f59e0b" : "#22c55e",
                          }}>
                            {item.status === "scheduled" ? "Scheduled" : "In Queue"}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-white truncate">{item.hook || item.caption}</p>
                        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                          <MessageSquare className="w-3 h-3 flex-shrink-0" style={{ color: "#a8a8a8" }} />
                          <p className="text-xs truncate" style={{ color: "#a8a8a8", maxWidth: 360 }}>{item.caption}</p>
                        </div>
                        {item.hashtags.length > 0 && (
                          <div className="flex items-center gap-1 mt-1 flex-wrap">
                            <Hash className="w-3 h-3 flex-shrink-0" style={{ color: "#a8a8a8" }} />
                            <p className="text-[10px] truncate" style={{ color: "#666" }}>{item.hashtags.slice(0, 6).join(" ")}</p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => copyToClipboard(item)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all"
                          style={{
                            backgroundColor: isCopied ? "rgba(34,197,94,0.15)" : "rgba(255,0,105,0.1)",
                            color: isCopied ? "#22c55e" : "#ff0069",
                            border: `1px solid ${isCopied ? "rgba(34,197,94,0.25)" : "rgba(255,0,105,0.2)"}`,
                          }}
                        >
                          {isCopied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          {isCopied ? "Copied!" : "Copy"}
                        </button>

                        {item.status === "queued" && (
                          <button
                            onClick={() => markScheduled(item.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:brightness-110"
                            style={{ backgroundColor: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" }}
                          >
                            <Calendar className="w-3 h-3" />
                            Schedule
                          </button>
                        )}

                        {item.status === "scheduled" && (
                          <button
                            onClick={() => markQueued(item.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all hover:brightness-110"
                            style={{ backgroundColor: "rgba(34,197,94,0.1)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }}
                          >
                            <RotateCcw className="w-3 h-3" />
                            Back to Queue
                          </button>
                        )}

                        <button
                          onClick={() => removeFromQueue(item.id)}
                          className="p-1.5 rounded-xl transition-all hover:bg-white/5"
                          style={{ color: "#a8a8a8" }}
                        >
                          <span className="sr-only">Remove</span>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                        </button>
                      </div>
                    </div>

                    {/* Model handle footer */}
                    <div className="px-4 pb-3 -mt-1">
                      <span className="text-[10px]" style={{ color: "#666" }}>{profile.handle}</span>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>

          {/* Rotor explanation */}
          {activeTab === "rotor" && displayedItems.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-6 flex items-start gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: "rgba(131,58,180,0.06)", border: "1px solid rgba(131,58,180,0.12)" }}>
              <RotateCcw className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#833ab4" }} />
              <div>
                <p className="text-xs font-semibold text-white">How the rotor works</p>
                <p className="text-[11px] mt-0.5" style={{ color: "#a8a8a8" }}>
                  No two posts from the same model appear back-to-back. Each account gets a maximum of 2 slots per week. When a scheduled post goes live on Creator Studio, mark it as posted and the rotor automatically queues the next one.
                  Queue is unlimited on our end — Meta's limit only applies when you actually publish.
                </p>
              </div>
            </motion.div>
          )}

        </div>
      </main>
    </div>
  );
}

// ── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, icon, color, subLabel }: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  subLabel?: string;
}) {
  return (
    <div className="rounded-xl p-4" style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="flex items-center gap-2 mb-2">
        <div style={{ color }}>{icon}</div>
        <span className="text-xs font-medium" style={{ color: "#a8a8a8" }}>{label}</span>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      {subLabel && <p className="text-[10px] mt-0.5" style={{ color: "#666" }}>{subLabel}</p>}
    </div>
  );
}
