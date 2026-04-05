"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "@/components/layout/Sidebar";
import {
  Users2, CheckCircle, Clock, Film, ChevronRight,
  ExternalLink, Loader2, RefreshCw, Play, MessageSquare,
  Send, Star, Zap, Heart, Dumbbell,
} from "lucide-react";

// ── Status config ─────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  draft:           { label: "Draft",           color: "#a8a8a8", bg: "rgba(168,168,168,0.1)" },
  sent:            { label: "Sent",             color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  in_progress:     { label: "Filming",          color: "#833ab4", bg: "rgba(131,58,180,0.1)" },
  clips_received:  { label: "Clips Back",       color: "#ff0069", bg: "rgba(255,0,105,0.1)" },
  editing:         { label: "Editing",          color: "#06b6d4", bg: "rgba(6,182,212,0.1)" },
  complete:        { label: "Complete",         color: "#22c55e", bg: "rgba(34,197,94,0.1)" },
};

// ── Models ─────────────────────────────────────────────────────────────────────
const MODELS = [
  { _id: "m1", name: "Tyler",   niche: "Fitness", handle: "@abg.ricebunny", color: "#ff0069", gender: "boy", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=200&h=200&fit=crop&crop=face" },
  { _id: "m2", name: "Ren",     niche: "Fitness", handle: "@rhinxrenx",    color: "#833ab4", gender: "girl", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&h=200&fit=crop&crop=face" },
  { _id: "m3", name: "Ella",    niche: "GFE",     handle: "@ellamira",      color: "#22c55e", gender: "girl", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
  { _id: "m4", name: "Amam",    niche: "GFE",     handle: "@amam",          color: "#fcaf45", gender: "girl", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop&crop=face" },
];

// Reel thumbnail images (random fitness/lifestyle pics for demo)
const REEL_THUMBS = [
  "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=320&h=400&fit=crop",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=320&h=400&fit=crop",
  "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=320&h=400&fit=crop",
  "https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=320&h=400&fit=crop",
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=320&h=400&fit=crop",
  "https://images.unsplash.com/photo-1533681904393-9ab6eee7e408?w=320&h=400&fit=crop",
  "https://images.unsplash.com/photo-1552196563-55cd5e9efd6b?w=320&h=400&fit=crop",
  "https://images.unsplash.com/photo-1526506118085-60ce8714f130?w=320&h=400&fit=crop",
  "https://images.unsplash.com/photo-1583190844035-9f9e4f3cf51b?w=320&h=400&fit=crop",
  "https://images.unsplash.com/photo-1549480017-d76466a4b7e8?w=320&h=400&fit=crop",
  "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=320&h=400&fit=crop",
  "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=320&h=400&fit=crop",
  "https://images.unsplash.com/photo-1597347316205-36f6c451d5b1?w=320&h=400&fit=crop",
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=320&h=400&fit=crop",
  "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=320&h=400&fit=crop",
  "https://images.unsplash.com/photo-1581009146145-b5ef050c149a?w=320&h=400&fit=crop",
  "https://images.unsplash.com/photo-1506126613408-eca07ce12873?w=320&h=400&fit=crop",
  "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=320&h=400&fit=crop",
  "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=320&h=400&fit=crop",
  "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=320&h=400&fit=crop",
  "https://images.unsplash.com/photo-1483721310020-03333e577078?w=320&h=400&fit=crop",
  "https://images.unsplash.com/photo-1522013458775-80942b7e5f32?w=320&h=400&fit=crop",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=320&h=400&fit=crop",
];

// ── Reel ideas per model ────────────────────────────────────────────────────────
const REEL_IDEAS = [
  // Tyler — Easter batch
  { _id: "r1", modelId: "m1", hook: "Gym on Easter Sunday — bunny ears optional", niche: "Fitness", campaign: "Easter 2026", steps: ["Ring light ON, gym vest", "Flex at mirror, smirk camera", "Hold bunny ears up, grin", "Drop ears, back to flexing"], caption: "Carbs? In THIS economy? 💪🐰", status: "complete", sentAt: "Apr 4", thumb: REEL_THUMBS[0] },
  { _id: "r2", modelId: "m1", hook: "Six Pack and It's Easter", niche: "Fitness", campaign: "Easter 2026", steps: ["T-shirt off, phone up high", "Point at abs, raise eyebrow", "Cut to bunny ears", "End on smirk"], caption: "Hidden six pack? Found it. 🐰", status: "complete", sentAt: "Apr 4", thumb: REEL_THUMBS[1] },
  { _id: "r3", modelId: "m1", hook: "Easter Monday Recovery", niche: "Fitness", campaign: "Easter 2026", steps: ["Face in palms, on gym floor", "Look up, heavy breathing", "Slow smile at camera"], caption: "Monday. I earned this. 😮‍💨", status: "complete", sentAt: "Apr 4", thumb: REEL_THUMBS[2] },
  { _id: "r4", modelId: "m1", hook: "POV: It's photo day and I pretend to eat a big bowl of rice first", niche: "Fitness", campaign: "April 2026", steps: ["Sit at table, big bowl rice + chicken", "Pick up chopsticks, pause dramatically", "Flash a knowing smirk at camera"], caption: "Cheat day calories don't count 🐰", status: "in_progress", sentAt: "Apr 5", thumb: REEL_THUMBS[3] },
  { _id: "r5", modelId: "m1", hook: "Gym mirror flex, unbothered energy", niche: "Fitness", campaign: "April 2026", steps: ["Walk up to gym mirror", "Check self out confidently", "Flex, smirk at camera", "Walk away unbothered"], caption: "POV: You know what it is 💋", status: "sent", sentAt: "Apr 5", thumb: REEL_THUMBS[4] },

  // Ren — Easter batch
  { _id: "r6", modelId: "m2", hook: "Chocolate on My Face", niche: "Fitness", campaign: "Easter 2026", steps: ["Touch chocolate to cheek", "Look at camera unbothered", "Lick it off slowly, side-eye", "Cut"], caption: "Unbothered is a lifestyle 🖤", status: "complete", sentAt: "Apr 4", thumb: REEL_THUMBS[5] },
  { _id: "r7", modelId: "m2", hook: "Diet Before vs After", niche: "Fitness", campaign: "Easter 2026", steps: ["Look at bowl of rice sadly", "Look at camera", "Pick up chopsticks", "Back to eating rice"], caption: "Carbs hit different on a cut 🍚", status: "complete", sentAt: "Apr 4", thumb: REEL_THUMBS[6] },
  { _id: "r8", modelId: "m2", hook: "Western vs Songkran", niche: "Fitness", campaign: "Songkran 2026", steps: ["Dry gym look, unbothered", "Cut — soaking wet, holding water gun", "Cut — smirk at camera"], caption: "East or West, thirst trap is best 🖤", status: "clips_received", sentAt: "Apr 10", thumb: REEL_THUMBS[7] },
  { _id: "r9", modelId: "m2", hook: "Before vs During Songkran", niche: "Fitness", campaign: "Songkran 2026", steps: ["Full gym outfit, check phone", "Cut — wet hair, no shirt, holding bucket", "Look at camera like nothing happened"], caption: "Adapt or get soaked 💦", status: "in_progress", sentAt: "Apr 10", thumb: REEL_THUMBS[8] },

  // Ella — Easter batch
  { _id: "r10", modelId: "m3", hook: "The Easter Bunny Came", niche: "GFE", campaign: "Easter 2026", steps: ["Sit on bed, bunny ears in hand", "Put ears on slowly, smile", "Look at camera, hold smile 3s", "Cut"], caption: "The bunny came early 🐰💋", status: "complete", sentAt: "Apr 4", thumb: REEL_THUMBS[9] },
  { _id: "r11", modelId: "m3", hook: "One Egg a Day", niche: "GFE", campaign: "Easter 2026", steps: ["Hold egg, look at camera", "Put egg on forehead", "Let it roll down face", "Laugh at camera"], caption: "One egg a day keeps the boredom away 🥚😂", status: "complete", sentAt: "Apr 4", thumb: REEL_THUMBS[10] },
  { _id: "r12", modelId: "m3", hook: "Diet Before vs After Easter", niche: "GFE", campaign: "Easter 2026", steps: ["Look at chocolate box sadly", "Pick up chocolate", "Raise eyebrow, take a bite", "Shrug at camera"], caption: "Diet starts Monday. Today is not Monday 🖤", status: "complete", sentAt: "Apr 4", thumb: REEL_THUMBS[11] },
  { _id: "r13", modelId: "m3", hook: "Chocolate on My Face", niche: "GFE", campaign: "Easter 2026", steps: ["Touch chocolate to cheek", "Look at camera unbothered", "Lick it off slowly, smile", "Cut"], caption: "Chocolate face check 🍫", status: "complete", sentAt: "Apr 4", thumb: REEL_THUMBS[12] },
  { _id: "r14", modelId: "m3", hook: "Western vs Asian Easter", niche: "GFE", campaign: "Easter 2026", steps: ["Bunny ears on, Easter eggs", "Cut — no ears, home food bowl", "Cut — back to bunny ears, smile"], caption: "Two Easters. One me 🐰🍜", status: "complete", sentAt: "Apr 4", thumb: REEL_THUMBS[13] },
  { _id: "r15", modelId: "m3", hook: "He texts back. I'm still unbothered 🖤", niche: "GFE", campaign: "Spring 2026", steps: ["Sit on bed, phone in hand", "Look at notification, raise eyebrow", "Put phone down, go back to what you were doing"], caption: "He texts back. I'm still unbothered 🖤", status: "clips_received", sentAt: "Apr 5", thumb: REEL_THUMBS[14] },
  { _id: "r16", modelId: "m3", hook: "POV: You just got approved to post", niche: "GFE", campaign: "April 2026", steps: ["Look at phone, eyes widen", "Slow smile creeping in", "Put phone down, exhale", "Look at camera, nod once"], caption: "POV: The content cleared 🖤✨", status: "sent", sentAt: "Apr 5", thumb: REEL_THUMBS[15] },
  { _id: "r17", modelId: "m3", hook: "Western vs Songkran — unbothered", niche: "GFE", campaign: "Songkran 2026", steps: ["Dry, unbothered look", "Cut — soaking wet, ring light", "Hold water gun, don't blink", "Slow smirk"], caption: "Wet but unbothered 💦🖤", status: "in_progress", sentAt: "Apr 10", thumb: REEL_THUMBS[16] },

  // Amam — Easter batch
  { _id: "r18", modelId: "m4", hook: "The Easter Bunny Came (Amam)", niche: "GFE", campaign: "Easter 2026", steps: ["Sit on bed, bunny ears", "Put ears on slowly", "Look at camera, hold smile", "Cut"], caption: "The bunny came early 🐰💋", status: "complete", sentAt: "Apr 4", thumb: REEL_THUMBS[17] },
  { _id: "r19", modelId: "m4", hook: "Following the Smell", niche: "GFE", campaign: "Easter 2026", steps: ["Close eyes, sniff", "Open eyes, look at bowl", "Eat, nod at camera", "Cut"], caption: "Follow your nose to the good stuff 👃🍜", status: "complete", sentAt: "Apr 4", thumb: REEL_THUMBS[18] },
  { _id: "r20", modelId: "m4", hook: "Western vs Asian Easter (Amam)", niche: "GFE", campaign: "Easter 2026", steps: ["Bunny ears on, chocolate", "Cut — no ears, Thai home food", "Cut — bunny ears again, smile"], caption: "Bunny mode → Thai mode → Bunny mode 🐰🇹🇭", status: "complete", sentAt: "Apr 4", thumb: REEL_THUMBS[19] },
  { _id: "r21", modelId: "m4", hook: "Plastic Bag Over My Phone", niche: "GFE", campaign: "Songkran 2026", steps: ["Hold plastic bag up", "Show putting phone inside", "Seal it tight", "Splash water on bag, smile"], caption: "Thai phone protection technology 🛍️💦", status: "clips_received", sentAt: "Apr 10", thumb: REEL_THUMBS[20] },
  { _id: "r22", modelId: "m4", hook: "Stay Dry, I Said", niche: "GFE", campaign: "Songkran 2026", steps: ["Full outfit, unbothered face", "Get splashed", "Look at camera", "Shrug, smile"], caption: "I SAID I'd stay dry 😂💦", status: "sent", sentAt: "Apr 10", thumb: REEL_THUMBS[21] },
];

// ── Filter tabs ────────────────────────────────────────────────────────────────
const FILTER_TABS = ["All", "Draft", "Sent", "Filming", "Clips Back", "Editing", "Complete"];

// ── Components ─────────────────────────────────────────────────────────────────

function ModelHeader({ model, ideas }: { model: typeof MODELS[0]; ideas: typeof REEL_IDEAS }) {
  const done = ideas.filter(i => i.status === "complete").length;
  const active = ideas.filter(i => !["complete","draft"].includes(i.status)).length;
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-11 h-11 rounded-xl overflow-hidden flex-shrink-0">
        <img src={model.img} alt={model.name} className="w-full h-full object-cover" style={{ display: "block" }} />
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-base font-semibold text-white">{model.name}</h2>
        <p className="text-[11px]" style={{ color: "#a8a8a8" }}>{model.niche} · {model.handle}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-xs font-bold" style={{ color: model.color }}>{done} done</p>
          <p className="text-[10px]" style={{ color: "#a8a8a8" }}>{active} in progress</p>
        </div>
        <a href={`https://instagram.com/${model.handle.replace("@", "")}`} target="_blank" rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all hover:opacity-80"
          style={{ backgroundColor: `${model.color}18`, color: model.color, border: `1px solid ${model.color}33` }}>
          <ExternalLink className="w-3 h-3" /> IG
        </a>
      </div>
    </div>
  );
}

function ReelCard({ idea }: { idea: typeof REEL_IDEAS[0] }) {
  const cfg = STATUS_CONFIG[idea.status] ?? STATUS_CONFIG.draft;
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl overflow-hidden transition-all" style={{ backgroundColor: "#0e0e0e", border: "1px solid rgba(255,255,255,0.07)" }}>
      {/* Header — always visible */}
      <button onClick={() => setExpanded(e => !e)} className="w-full text-left p-3 flex items-start gap-3 hover:bg-white/3 transition-colors">
        {/* Thumbnail */}
        <div className="w-14 h-16 rounded-xl overflow-hidden flex-shrink-0 relative">
          <img src={idea.thumb} alt="" className="w-full h-full object-cover" style={{ display: "block" }} />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <Play className="w-4 h-4 text-white" fill="white" />
          </div>
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="text-sm font-medium text-white leading-snug line-clamp-2">{idea.hook}</p>
          <div className="flex flex-wrap gap-1.5 mt-1.5">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ backgroundColor: cfg.bg, color: cfg.color }}>{cfg.label}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px]" style={{ backgroundColor: "rgba(131,58,180,0.1)", color: "#833ab4" }}>{idea.niche}</span>
            <span className="px-2 py-0.5 rounded-full text-[10px]" style={{ backgroundColor: "rgba(255,255,255,0.04)", color: "#a8a8a8" }}>{idea.campaign}</span>
          </div>
          <p className="text-[10px] mt-1" style={{ color: "#666" }}>Sent {idea.sentAt}</p>
        </div>
        <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-1 transition-transform ${expanded ? "rotate-90" : ""}`} style={{ color: "#a8a8a8" }} />
      </button>

      {/* Expanded detail */}
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
            className="px-3 pb-3 overflow-hidden">
            <div className="pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="space-y-1 mb-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "#a8a8a8" }}>Steps</p>
                {idea.steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full text-[9px] font-black flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "rgba(255,0,105,0.1)", color: "#ff0069" }}>{i + 1}</span>
                    <p className="text-[11px] text-white/60 leading-snug">{step}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-1.5 mb-3">
                <MessageSquare className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: "#a8a8a8" }} />
                <p className="text-[11px] italic" style={{ color: "#a8a8a8" }}>&ldquo;{idea.caption}&rdquo;</p>
              </div>
              <div className="flex items-center gap-2">
                {idea.status === "sent" && (
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all hover:opacity-80"
                    style={{ backgroundColor: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" }}>
                    <Send className="w-3 h-3" /> Resend Reminder
                  </button>
                )}
                {idea.status === "clips_received" && (
                  <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all hover:opacity-80"
                    style={{ backgroundColor: "rgba(6,182,212,0.1)", color: "#06b6d4", border: "1px solid rgba(6,182,212,0.2)" }}>
                    <Zap className="w-3 h-3" /> Send to Editing
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function ModelsPage() {
  const [selectedId, setSelectedId] = useState<string>("m1");
  const [activeTab, setActiveTab] = useState<string>("All");
  const [refreshing, setRefreshing] = useState(false);

  const model = MODELS.find(m => m._id === selectedId)!;
  const modelIdeas = REEL_IDEAS.filter(i => i.modelId === selectedId);
  const filtered = activeTab === "All" ? modelIdeas : modelIdeas.filter(i => {
    if (activeTab === "Filming") return i.status === "in_progress";
    if (activeTab === "Sent") return i.status === "sent";
    if (activeTab === "Clips Back") return i.status === "clips_received";
    if (activeTab === "Editing") return i.status === "editing";
    if (activeTab === "Draft") return i.status === "draft";
    if (activeTab === "Complete") return i.status === "complete";
    return true;
  });

  // Model-wide stats
  const total = modelIdeas.length;
  const done = modelIdeas.filter(i => i.status === "complete").length;
  const active = modelIdeas.filter(i => !["complete","draft"].includes(i.status)).length;

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#000000" }}>
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-8 py-10">

          {/* Page header */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Users2 className="w-4 h-4" style={{ color: "#ff0069" }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#ff0069" }}>Team</span>
              </div>
              <button onClick={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 600); }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all hover:opacity-80"
                style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "#a8a8a8", border: "1px solid rgba(255,255,255,0.08)" }}>
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} /> Refresh
              </button>
            </div>
            <h1 className="text-3xl font-bold text-white">Model Dashboard</h1>
            <p className="text-sm mt-1" style={{ color: "#a8a8a8" }}>Ideas sent from Idea Gen → track filming → manage editing pipeline</p>
          </motion.div>

          {/* Summary stats */}
          <div className="grid grid-cols-4 gap-3 mb-8">
            {[
              { label: "Total Sent",       value: total,  color: "#833ab4", icon: Film },
              { label: "In Progress",      value: active, color: "#ff0069", icon: Clock },
              { label: "Clips Back",        value: modelIdeas.filter(i => i.status === "clips_received").length, color: "#06b6d4", icon: Play },
              { label: "Completed",         value: done,   color: "#22c55e", icon: CheckCircle },
            ].map(stat => (
              <div key={stat.label} className="p-4 rounded-xl flex items-center gap-3"
                style={{ backgroundColor: "#0e0e0e", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}18` }}>
                  <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-xl font-black" style={{ color: stat.color }}>{stat.value}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#a8a8a8" }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Two-column layout: model list + reel feed */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left: model list */}
            <div className="col-span-3">
              <h3 className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#a8a8a8" }}>Models</h3>
              <div className="space-y-1">
                {(["Girls", "Boys"] as const).map(group => {
                  const members = MODELS.filter(m => m.gender === group.toLowerCase());
                  return (
                    <div key={group}>
                      <div className="flex items-center gap-1.5 px-1 mb-1.5">
                        <div className="w-4 h-4 rounded flex items-center justify-center" style={{ backgroundColor: group === "Girls" ? "rgba(255,0,105,0.15)" : "rgba(131,58,180,0.15)" }}>
                          {group === "Girls" ? <Heart className="w-2.5 h-2.5" style={{ color: "#ff0069" }} /> : <Dumbbell className="w-2.5 h-2.5" style={{ color: "#833ab4" }} />}
                        </div>
                        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: group === "Girls" ? "#ff0069" : "#833ab4" }}>{group}</span>
                        <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full ml-auto" style={{ backgroundColor: group === "Girls" ? "rgba(255,0,105,0.08)" : "rgba(131,58,180,0.08)", color: group === "Girls" ? "#ff0069" : "#833ab4" }}>{members.length}</span>
                      </div>
                      {members.map(m => {
                        const mi = REEL_IDEAS.filter(i => i.modelId === m._id);
                        const miActive = mi.filter(i => !["complete","draft"].includes(i.status)).length;
                        const miDone = mi.filter(i => i.status === "complete").length;
                        return (
                          <motion.button key={m._id} onClick={() => { setSelectedId(m._id); setActiveTab("All"); }}
                            whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                            className="w-full text-left p-3 rounded-2xl transition-all mb-1"
                            style={{ backgroundColor: selectedId === m._id ? "rgba(255,0,105,0.08)" : "#0e0e0e", border: `1px solid ${selectedId === m._id ? "rgba(255,0,105,0.3)" : "rgba(255,255,255,0.07)"}` }}>
                            <div className="flex items-center gap-2.5 mb-1">
                              <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0">
                                <img src={m.img} alt={m.name} className="w-full h-full object-cover" style={{ display: "block" }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white">{m.name}</p>
                                <p className="text-[10px]" style={{ color: "#a8a8a8" }}>{m.niche}</p>
                              </div>
                              {miActive > 0 && <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold" style={{ backgroundColor: `${m.color}18`, color: m.color }}>{miActive}</span>}
                            </div>
                            <div className="flex items-center gap-3 ml-10">
                              <span className="text-[10px]" style={{ color: "#22c55e" }}><CheckCircle className="w-2.5 h-2.5 inline" /> {miDone}</span>
                              <span className="text-[10px]" style={{ color: "#f59e0b" }}><Clock className="w-2.5 h-2.5 inline" /> {miActive}</span>
                            </div>
                          </motion.button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: reel feed */}
            <div className="col-span-9">
              <ModelHeader model={model} ideas={modelIdeas} />

              {/* Filter tabs */}
              <div className="flex items-center gap-1.5 mb-4 flex-wrap">
                {FILTER_TABS.map(tab => {
                  const count = tab === "All" ? modelIdeas.length :
                    modelIdeas.filter(i => {
                      if (tab === "Filming") return i.status === "in_progress";
                      if (tab === "Sent") return i.status === "sent";
                      if (tab === "Clips Back") return i.status === "clips_received";
                      if (tab === "Editing") return i.status === "editing";
                      if (tab === "Draft") return i.status === "draft";
                      if (tab === "Complete") return i.status === "complete";
                      return 0;
                    }).length;
                  return (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
                      style={{ backgroundColor: activeTab === tab ? "rgba(255,0,105,0.1)" : "rgba(255,255,255,0.04)", color: activeTab === tab ? "#ff0069" : "#a8a8a8", border: `1px solid ${activeTab === tab ? "rgba(255,0,105,0.25)" : "rgba(255,255,255,0.06)"}` }}>
                      {tab} {count > 0 && <span className="text-[10px] font-bold" style={{ color: activeTab === tab ? "#ff0069" : "#666" }}>{count}</span>}
                    </button>
                  );
                })}
              </div>

              {/* Reel list */}
              {filtered.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 rounded-2xl"
                  style={{ backgroundColor: "#0e0e0e", border: "2px dashed rgba(255,255,255,0.06)" }}>
                  <Film className="w-8 h-8 mb-3" style={{ color: "#a8a8a8" }} />
                  <p className="text-white font-semibold mb-1">No ideas in this stage</p>
                  <p className="text-xs" style={{ color: "#a8a8a8" }}>Try switching the filter above</p>
                </motion.div>
              ) : (
                <div className="space-y-2">
                  <AnimatePresence mode="popLayout">
                    {filtered.map((idea, i) => (
                      <motion.div key={idea._id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, delay: i * 0.04 }}>
                        <ReelCard idea={idea} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}