"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/layout/Sidebar";
import {
  Users2, CheckCircle, Clock, Film, ChevronRight,
  ExternalLink, Loader2, RefreshCw,
} from "lucide-react";

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  draft:          { label: "Draft",          color: "#a8a8a8", bg: "rgba(168,168,168,0.1)" },
  sent:           { label: "Sent to Model",   color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
  in_progress:    { label: "Filming",         color: "#833ab4", bg: "rgba(131,58,180,0.1)" },
  clips_received:  { label: "Clips Back",      color: "#ff0069", bg: "rgba(255,0,105,0.1)" },
  complete:       { label: "Complete",         color: "#22c55e", bg: "rgba(34,197,94,0.1)" },
};

// ── Seed data (until Convex is wired up) ────────────────────────────────
const SEED_MODELS = [
  { _id: "m1", name: "Tyler",  niche: "Fitness", instagramHandle: "@abg.ricebunny" },
  { _id: "m2", name: "Ren",    niche: "Fitness", instagramHandle: "@rhinxrenx" },
  { _id: "m3", name: "Ella",   niche: "GFE",     instagramHandle: "@ellamira" },
  { _id: "m4", name: "Amam",   niche: "GFE",     instagramHandle: "@amam" },
];

const SEED_IDEAS = [
  { _id: "i1", modelId: "m1", niche: "Fitness", campaign: "April 2026", generatedBrief: JSON.stringify({ hook: "POV: It's photo day and I pretends to eat a big bowl of rice first", steps: ["1. Sit at table with big bowl of rice and chicken", "2. Pick up chopsticks, pause dramatically", "3. Flash a knowing smirk at the camera"], captionSuggestion: "Carbs? In THIS economy? 📦😂", hashtags: ["#Tyler","#Fitness","#GymLife","#ThirstTrap"] }), status: "in_progress", createdAt: Date.now() - 3600000 },
  { _id: "i2", modelId: "m3", niche: "GFE", campaign: "Spring 2026", generatedBrief: JSON.stringify({ hook: "He texts back. I'm still unbothered 🖤", steps: ["1. Sit on bed, phone in hand", "2. Look at notification, raise eyebrow", "3. Put phone down, go back to what you were doing"], captionSuggestion: "He texts back. I'm still unbothered 🖤", hashtags: ["#Ella","#GFE","#POV"] }), status: "clips_received", createdAt: Date.now() - 7200000 },
  { _id: "i3", modelId: "m2", niche: "Fitness", campaign: "April 2026", generatedBrief: JSON.stringify({ hook: "Gym mirror flex, unbothered energy", steps: ["1. Walk up to gym mirror", "2. Check self out confidently", "3. Flex, smirk at camera", "4. Walk away unbothered"], captionSuggestion: "POV: You know what it is 💋", hashtags: ["#Ren","#Fitness","#GymReels"] }), status: "sent", createdAt: Date.now() - 86400000 },
];

function ModelCard({
  name, niche, instagramHandle, activeCount, doneCount, inProgressCount, selected, onClick,
}: {
  name: string; niche: string; instagramHandle: string;
  activeCount: number; doneCount: number; inProgressCount: number;
  selected: boolean; onClick: () => void;
}) {
  return (
    <motion.button onClick={onClick} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
      className="w-full text-left p-4 rounded-2xl transition-all"
      style={{ backgroundColor: selected ? "rgba(255,0,105,0.08)" : "#121212", border: `1px solid ${selected ? "rgba(255,0,105,0.3)" : "rgba(255,255,255,0.08)"}` }}>
      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-black text-white flex-shrink-0"
          style={{ background: niche === "Fitness" ? "linear-gradient(135deg,#ff0069,#fcaf45)" : "linear-gradient(135deg,#833ab4,#fd1d1d)" }}>
          {name.slice(0, 2).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-0.5">
            <p className="text-sm font-semibold text-white">{name}</p>
            {activeCount > 0 && <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ backgroundColor: "rgba(255,0,105,0.12)", color: "#ff0069" }}>{activeCount} active</span>}
          </div>
          <p className="text-[11px] mb-2" style={{ color: "#a8a8a8" }}>{niche} · {instagramHandle}</p>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[10px]" style={{ color: "#22c55e" }}><CheckCircle className="w-2.5 h-2.5" /> {doneCount} done</span>
            <span className="flex items-center gap-1 text-[10px]" style={{ color: "#f59e0b" }}><Clock className="w-2.5 h-2.5" /> {inProgressCount} in progress</span>
          </div>
        </div>
        <ChevronRight className="w-4 h-4 flex-shrink-0 mt-3" style={{ color: "#a8a8a8" }} />
      </div>
    </motion.button>
  );
}

function IdeaRow({ idea }: { idea: typeof SEED_IDEAS[0] }) {
  const cfg = STATUS_CONFIG[idea.status] ?? STATUS_CONFIG.draft;
  let brief: { hook?: string; steps?: string[]; captionSuggestion?: string } = {};
  try { brief = JSON.parse(idea.generatedBrief); } catch {}

  return (
    <div className="p-4 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white mb-0.5 truncate">{brief.hook || "No hook"}</p>
          <div className="flex flex-wrap gap-2">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ backgroundColor: cfg.bg, color: cfg.color }}>{cfg.label}</span>
            {idea.niche && <span className="px-2 py-0.5 rounded-full text-[10px]" style={{ backgroundColor: "rgba(131,58,180,0.1)", color: "#833ab4" }}>{idea.niche}</span>}
            {idea.campaign && <span className="px-2 py-0.5 rounded-full text-[10px]" style={{ backgroundColor: "rgba(255,255,255,0.04)", color: "#a8a8a8" }}>{idea.campaign}</span>}
          </div>
        </div>
      </div>
      {brief.steps?.slice(0, 3).map((step: string, i: number) => (
        <div key={i} className="flex items-start gap-1.5 mb-1">
          <span className="w-4 h-4 rounded-full text-[9px] font-black flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: "rgba(255,0,105,0.12)", color: "#ff0069" }}>{i + 1}</span>
          <p className="text-[11px] text-white/60 leading-snug">{step}</p>
        </div>
      ))}
      {brief.captionSuggestion && <p className="text-[11px] italic mt-2" style={{ color: "#a8a8a8" }}>&ldquo;{brief.captionSuggestion}&rdquo;</p>}
    </div>
  );
}

export default function ModelsPage() {
  const [selectedId, setSelectedId] = useState<string>("m1");
  const [refreshing, setRefreshing] = useState(false);

  const model = SEED_MODELS.find(m => m._id === selectedId)!;
  const modelIdeas = SEED_IDEAS.filter(i => i.modelId === selectedId);

  const stats = {
    total: SEED_IDEAS.length,
    active: SEED_IDEAS.filter(i => ["sent","in_progress","clips_received"].includes(i.status)).length,
    complete: SEED_IDEAS.filter(i => i.status === "complete").length,
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#000000" }}>
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-8 py-10">

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Users2 className="w-4 h-4" style={{ color: "#ff0069" }} />
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#ff0069" }}>Team</span>
                </div>
                <h1 className="text-3xl font-bold text-white">Model Dashboard</h1>
                <p className="text-sm mt-1" style={{ color: "#a8a8a8" }}>Ideas land here from Idea Gen. Track filming progress and clips.</p>
              </div>
              <button onClick={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 600); }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all"
                style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "#a8a8a8", border: "1px solid rgba(255,255,255,0.08)" }}>
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} /> Refresh
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: "Total Ideas", value: stats.total, color: "#833ab4", icon: Film },
              { label: "Active Now", value: stats.active, color: "#ff0069", icon: Clock },
              { label: "Completed", value: stats.complete, color: "#22c55e", icon: CheckCircle },
            ].map(stat => (
              <div key={stat.label} className="p-4 rounded-xl flex items-center gap-3"
                style={{ backgroundColor: "#121212", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}18` }}>
                  <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div>
                  <p className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#a8a8a8" }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-5 gap-6">
            <div className="col-span-2 space-y-2">
              <h2 className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "#a8a8a8" }}>Models</h2>
              {SEED_MODELS.map(m => {
                const mi = SEED_IDEAS.filter(i => i.modelId === m._id);
                return (
                  <ModelCard key={m._id} {...m}
                    activeCount={mi.filter(i => !["complete","draft"].includes(i.status)).length}
                    doneCount={mi.filter(i => i.status === "complete").length}
                    inProgressCount={mi.filter(i => ["sent","in_progress"].includes(i.status)).length}
                    selected={selectedId === m._id}
                    onClick={() => setSelectedId(m._id)}
                  />
                );
              })}
            </div>

            <div className="col-span-3 space-y-4">
              {model && (
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black text-white"
                    style={{ background: "linear-gradient(135deg,#833ab4,#ff0069)" }}>
                    {model.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-base font-semibold text-white">{model.name}</h2>
                    <p className="text-[11px]" style={{ color: "#a8a8a8" }}>{model.niche} · {model.instagramHandle}</p>
                  </div>
                  <a href={`https://instagram.com/${model.instagramHandle.replace("@", "")}`} target="_blank" rel="noopener noreferrer"
                    className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold"
                    style={{ backgroundColor: "rgba(255,0,105,0.08)", color: "#ff0069", border: "1px solid rgba(255,0,105,0.2)" }}>
                    <ExternalLink className="w-3 h-3" /> IG Profile
                  </a>
                </div>
              )}

              {modelIdeas.length === 0 ? (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-20 rounded-2xl"
                  style={{ backgroundColor: "#121212", border: "2px dashed rgba(255,255,255,0.06)" }}>
                  <Film className="w-8 h-8 mb-3" style={{ color: "#a8a8a8" }} />
                  <p className="text-white font-semibold mb-1">No ideas assigned yet</p>
                  <p className="text-xs" style={{ color: "#a8a8a8" }}>Send ideas from Idea Generation to see them here</p>
                </motion.div>
              ) : modelIdeas.map((idea, i) => (
                <motion.div key={idea._id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: i * 0.06 }}>
                  <IdeaRow idea={idea} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
