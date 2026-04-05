"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Wand2, Send, Plus, X, Check, Edit3, ArrowRight,
  Loader2, RefreshCw, MessageSquare, Camera, Type, Hash, Film, Star,
  FolderOpen,
} from "lucide-react";

// ── Seed models (Yssa is VA, not a model) ──────────────────────────────
const MODELS = ["Tyler", "Ren", "Ella", "Amam"];
const NICHES = ["GFE", "Fitness", "Meme", "Thirst Trap", "Lifestyle"];
const STYLES = [
  "Unbothered / Deadpan", "Flirty / Confident", "Gym Thirst Trap",
  "POV Story", "Couple Collab", "Transition",
];

interface GeneratedBrief {
  id: string;
  hook: string;
  steps: string[];
  camera: string;
  onScreenText: string;
  endShot: string;
  captionSuggestion: string;
  caption: string;
  isDriveIdea?: boolean;
  hashtags: string[];
  model: string;
  niche: string;
  style: string;
  campaign: string;
  status: "draft" | "generating" | "ready" | "sent";
  createdAt: string;
}

// ── Seed brief data ────────────────────────────────────────────────────
const SEED_BRIEFS: GeneratedBrief[] = [
  {
    id: "seed1",
    hook: "POV: It's photo day and I pretend to eat a big bowl of rice first",
    steps: [
      "Sit at table with big bowl of rice and chicken",
      "Pick up chopsticks, pause dramatically",
      "Flash a knowing smirk at the camera",
      "Put chopsticks down, push bowl away",
      "Stand up, walk to mirror with full confidence",
    ],
    camera: "eye level, phone propped on table showing face and upper body",
    onScreenText: "photo day 🐰",
    endShot: "Standing in front of mirror flexing confidently",
    captionSuggestion: "Carbs? In THIS economy? 📦😂",
    caption: "Carbs? In THIS economy? 📦😂",
    hashtags: ["#Tyler", "#Fitness", "#GymLife", "#ThirstTrap", "#GymReels", "#PhotoDay"],
    model: "Tyler", niche: "Fitness", style: "POV Story", campaign: "April 2026",
    status: "ready", createdAt: "Just now",
  },
  {
    id: "seed2",
    hook: "He texts back. I'm still unbothered 🖤",
    steps: [
      "Sit on bed, phone in hand",
      "Look at notification, raise eyebrow",
      "Put phone face-down on bed",
      "Go back to doing your hair",
      "Glance at phone one more time, ignore it",
    ],
    camera: "close-up, vertical, soft bedroom lighting",
    onScreenText: "he texts back 🖤",
    endShot: "Hair flip, deadpan stare at camera",
    captionSuggestion: "He texts back. I'm still unbothered 🖤",
    caption: "He texts back. I'm still unbothered 🖤",
    hashtags: ["#Ella", "#GFE", "#POV", "#Unbothered", "#GFE", "#Reels"],
    model: "Ella", niche: "GFE", style: "POV Story", campaign: "Spring 2026",
    status: "sent", createdAt: "2h ago",
  },
];

// ── Mock Gemini generation (replace with real Convex call when backend is live) ──
const MOCK_BRIEFS: Partial<GeneratedBrief>[] = [
  {
    hook: "POV: You finally finish the workout but still can't outrun your fast food addiction 😂",
    steps: [
      "Walk into gym, look around",
      "Step on scale, jaw drop reaction shot",
      "Grab phone, record selfie",
      "Show 'before' photo, then current pic",
      "Post to stories with crying laughing emoji",
    ],
    camera: "eye level, phone selfie mode, gym mirror background",
    onScreenText: "POV: The scale doesn't lie 😭",
    endShot: "Shrug at camera, walk out",
    captionSuggestion: "POV: You can't outrun a poor diet 😂💀",
    caption: "POV: You can't outrun a poor diet 😂💀",
    hashtags: ["#Ren", "#Fitness", "#GymReels", "#POV", "#GymLife", "#Relatable"],
  },
  {
    hook: "POV: You tell her she's the gym. She says prove it 🏋️‍♀️",
    steps: [
      "Girl walks in gym wearing everyday clothes",
      "Opens locker revealing full gym fit",
      "Does dramatic outfit change in 3 seconds",
      "Dabs on headband, looks in mirror",
      "Strikes power pose, zooms in on face",
    ],
    camera: "close-up on face reactions, wide shot for outfit change",
    onScreenText: "prove it 🏋️‍♀️",
    endShot: "Serious face, finger guns at camera",
    captionSuggestion: "POV: You said WHAT to me? 💅",
    caption: "POV: You said WHAT to me? 💅",
    hashtags: ["#Tyler", "#Fitness", "#GymThirstTrap", "#POV", "#GymReels", "#Challenge"],
  },
  {
    hook: "POV: You walk in the room and everyone knows it's not a drill 💅",
    steps: [
      "Slow motion entrance through door",
      "Eyes scan the room from left to right",
      "Adjust earrings with full confidence",
      "Click heels, take position",
      "Deadpan stare — no words needed",
    ],
    camera: "low angle, slow motion walking, dramatic lighting",
    onScreenText: "it's giving main character 🖤",
    endShot: "One perfectly timed hair flip",
    captionSuggestion: "Walk in like it's a movie premiere 🎬",
    caption: "Walk in like it's a movie premiere 🎬",
    hashtags: ["#Ella", "#GFE", "#MainCharacter", "#Confidence", "#POV", "#Reels"],
  },
];

async function generateMockBriefs(
  niche: string, model: string, style: string,
  campaign: string
): Promise<GeneratedBrief[]> {
  await new Promise(r => setTimeout(r, 2200));
  return MOCK_BRIEFS.map((b, i) => ({
    ...b,
    id: `gen_${Date.now()}_${i}`,
    model, niche, style, campaign,
    status: "ready" as const,
    createdAt: "Just now",
  })) as GeneratedBrief[];
}

// ── Components ────────────────────────────────────────────────────────
function BriefCard({
  brief, selected, onClick,
}: {
  brief: GeneratedBrief;
  selected: boolean;
  onClick: () => void;
}) {
  const statusColors: Record<string, string> = {
    draft: "#a8a8a8", generating: "#f59e0b", ready: "#833ab4", sent: "#78c257",
  };
  const statusLabels: Record<string, string> = {
    draft: "Draft", generating: "Generating...", ready: "Ready", sent: "Sent",
  };
  const sc = statusColors[brief.status] ?? "#a8a8a8";

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="w-full text-left px-4 py-3 rounded-xl transition-all"
      style={{
        backgroundColor: selected ? "rgba(255,0,105,0.08)" : "transparent",
        border: `1px solid ${selected ? "rgba(255,0,105,0.25)" : "transparent"}`,
      }}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium truncate">{brief.hook.split(".")[0]}</p>
          <p className="text-xs mt-0.5 truncate" style={{ color: "#a8a8a8" }}>
            {brief.model}{brief.niche ? ` · ${brief.niche}` : ""}
            {brief.isDriveIdea && (
              <span className="ml-1.5 inline-flex items-center gap-0.5" style={{ color: "#4285f4" }}>
                <FolderOpen size={9} /> Drive
              </span>
            )}
          </p>
        </div>
        <span
          className="flex-shrink-0 text-[9px] font-semibold px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: `${sc}18`,
            color: sc,
          }}
        >
          {statusLabels[brief.status]}
        </span>
      </div>
      {brief.hashtags?.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {brief.hashtags.slice(0, 3).map(t => (
            <span
              key={t}
              className="text-[9px] px-1.5 py-0.5 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "#a8a8a8" }}
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </motion.button>
  );
}

function GenerateForm({
  onGenerate,
  loading,
}: {
  onGenerate: (niche: string, model: string, style: string, campaign: string) => void;
  loading: boolean;
}) {
  const [niche, setNiche] = useState(NICHES[0]);
  const [model, setModel] = useState(MODELS[0]);
  const [style, setStyle] = useState(STYLES[0]);
  const [campaign, setCampaign] = useState("");

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <Wand2 className="w-4 h-4" style={{ color: "#ff0069" }} />
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#ff0069" }}>
          AI Generator
        </span>
      </div>
      <p className="text-xs" style={{ color: "#a8a8a8" }}>
        Describe what you want — Gemini writes the brief.
      </p>

      <div>
        <label className="text-[11px] font-semibold mb-2 block" style={{ color: "#a8a8a8" }}>
          Campaign
        </label>
        <input
          value={campaign}
          onChange={e => setCampaign(e.target.value)}
          className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
          style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.08)", color: "white" }}
          placeholder="e.g. April 2026, Spring Drop..."
        />
      </div>

      <div>
        <label className="text-[11px] font-semibold mb-2 block" style={{ color: "#a8a8a8" }}>
          Model
        </label>
        <div className="flex flex-wrap gap-1.5">
          {MODELS.map(m => (
            <button
              key={m}
              onClick={() => setModel(m)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                backgroundColor: model === m ? "rgba(255,0,105,0.12)" : "#1a1a1a",
                border: `1px solid ${model === m ? "rgba(255,0,105,0.3)" : "rgba(255,255,255,0.08)"}`,
                color: model === m ? "#ff0069" : "#a8a8a8",
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-[11px] font-semibold mb-2 block" style={{ color: "#a8a8a8" }}>
          Niche
        </label>
        <div className="flex flex-wrap gap-1.5">
          {NICHES.map(n => (
            <button
              key={n}
              onClick={() => setNiche(n)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                backgroundColor: niche === n ? "rgba(131,58,180,0.12)" : "#1a1a1a",
                border: `1px solid ${niche === n ? "rgba(131,58,180,0.3)" : "rgba(255,255,255,0.08)"}`,
                color: niche === n ? "#833ab4" : "#a8a8a8",
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-[11px] font-semibold mb-2 block" style={{ color: "#a8a8a8" }}>
          Style
        </label>
        <div className="flex flex-wrap gap-1.5">
          {STYLES.map(s => (
            <button
              key={s}
              onClick={() => setStyle(s)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                backgroundColor: style === s ? "rgba(255,0,105,0.08)" : "#1a1a1a",
                border: `1px solid ${style === s ? "rgba(255,0,105,0.2)" : "rgba(255,255,255,0.08)"}`,
                color: style === s ? "#ff0069" : "#a8a8a8",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => onGenerate(niche, model, style, campaign)}
        disabled={loading}
        className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all flex items-center justify-center gap-2 disabled:opacity-60"
        style={{ background: loading ? "#333" : "linear-gradient(135deg, #ff0069, #fd1d1d)" }}
      >
        {loading ? (
          <>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Generating with Gemini...
          </>
        ) : (
          <>
            <Sparkles className="w-3.5 h-3.5" />
            Generate Ideas
          </>
        )}
      </button>

      {!loading && (
        <p className="text-[10px] text-center" style={{ color: "#555" }}>
          Requires Gemini API key in .env.local
        </p>
      )}
    </div>
  );
}

function BriefDetail({
  brief,
  onSend,
  onDelete,
}: {
  brief: GeneratedBrief;
  onSend: () => void;
  onDelete: () => void;
}) {
  return (
    <motion.div
      key={brief.id}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-2 mb-2">
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
              style={{ backgroundColor: "rgba(255,0,105,0.1)", color: "#ff0069" }}
            >
              {brief.model}
            </span>
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
              style={{ backgroundColor: "rgba(131,58,180,0.1)", color: "#833ab4" }}
            >
              {brief.niche}
            </span>
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
              style={{ backgroundColor: "rgba(255,255,255,0.04)", color: "#a8a8a8" }}
            >
              {brief.style}
            </span>
            {brief.campaign && (
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                style={{ backgroundColor: "rgba(255,255,255,0.04)", color: "#a8a8a8" }}
              >
                {brief.campaign}
              </span>
            )}
          </div>
          <h2 className="text-white font-bold text-lg leading-snug">{brief.hook}</h2>
        </div>
        <button
          onClick={onDelete}
          className="flex-shrink-0 p-2 rounded-xl transition-colors"
          style={{ backgroundColor: "rgba(255,255,255,0.04)", color: "#a8a8a8" }}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Steps */}
      <div>
        <div className="flex items-center gap-1.5 mb-3">
          <Film className="w-3.5 h-3.5" style={{ color: "#ff0069" }} />
          <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#ff0069" }}>
            Filming Steps
          </span>
        </div>
        <div className="space-y-2">
          {brief.steps.map((step, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span
                className="w-5 h-5 rounded-full text-[9px] font-black flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ backgroundColor: "rgba(255,0,105,0.12)", color: "#ff0069" }}
              >
                {i + 1}
              </span>
              <p className="text-sm text-white/80 leading-snug">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Camera + On-Screen Text */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Camera className="w-3 h-3" style={{ color: "#833ab4" }} />
            <span className="text-[10px] font-semibold uppercase" style={{ color: "#833ab4" }}>Camera</span>
          </div>
          <p className="text-xs" style={{ color: "#d1d1d1" }}>{brief.camera}</p>
        </div>
        <div className="p-3 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Type className="w-3 h-3" style={{ color: "#f59e0b" }} />
            <span className="text-[10px] font-semibold uppercase" style={{ color: "#f59e0b" }}>On-Screen Text</span>
          </div>
          <p className="text-xs" style={{ color: "#d1d1d1" }}>{brief.onScreenText}</p>
        </div>
      </div>

      {/* End Shot */}
      <div className="p-3 rounded-xl" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center gap-1.5 mb-1.5">
          <Star className="w-3 h-3" style={{ color: "#22c55e" }} />
          <span className="text-[10px] font-semibold uppercase" style={{ color: "#22c55e" }}>End Shot</span>
        </div>
        <p className="text-xs" style={{ color: "#d1d1d1" }}>{brief.endShot}</p>
      </div>

      {/* Caption + Hashtags */}
      <div className="p-4 rounded-xl" style={{ backgroundColor: "rgba(255,0,105,0.04)", border: "1px solid rgba(255,0,105,0.1)" }}>
        <div className="flex items-center gap-1.5 mb-2">
          <MessageSquare className="w-3.5 h-3.5" style={{ color: "#ff0069" }} />
          <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "#ff0069" }}>
            Caption Suggestion
          </span>
        </div>
        <p className="text-sm text-white/90 italic mb-3">&ldquo;{brief.captionSuggestion}&rdquo;</p>
        <div className="flex flex-wrap gap-1.5">
          {brief.hashtags.map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-full text-[10px] font-medium"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "#a8a8a8" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      {brief.status !== "sent" && (
        <button
          onClick={onSend}
          className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #78c257, #5ba81a)" }}
        >
          <Send className="w-3.5 h-3.5" />
          Send to {brief.model}&rsquo;s Dashboard
        </button>
      )}
      {brief.status === "sent" && (
        <div
          className="w-full py-3 rounded-xl text-sm font-bold text-center flex items-center justify-center gap-2"
          style={{ backgroundColor: "rgba(120,194,87,0.1)", color: "#78c257", border: "1px solid rgba(120,194,87,0.2)" }}
        >
          <Check className="w-3.5 h-3.5" />
          Sent to {brief.model}&rsquo;s Dashboard
        </div>
      )}
    </motion.div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────
export default function IdeasPage() {
  const [briefs, setBriefs] = useState<GeneratedBrief[]>(SEED_BRIEFS);
  const [selectedId, setSelectedId] = useState<string | null>("seed1");
  const [generating, setGenerating] = useState(false);
  const [generationDone, setGenerationDone] = useState(false);

  // Backend integration: wire this up to Convex / Supabase when backend is live
  const allBriefs: GeneratedBrief[] = briefs;

  const selected = allBriefs.find(b => b.id === selectedId) ?? null;

  const handleGenerate = async (
    niche: string, model: string, style: string, campaign: string
  ) => {
    setGenerating(true);
    setGenerationDone(false);
    setSelectedId(null);

    try {
      // Try Gemini API first
      let generated: GeneratedBrief[] = [];
      try {
        const res = await fetch("/api/generate-ideas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model, niche, style, campaign }),
        });
        const text = await res.text();
        console.log("[/api/generate-ideas] status:", res.status, "body:", text);
        if (res.ok) {
          const data = JSON.parse(text);
          generated = data.briefs.map((b: any, i: number) => ({
            id: `gemini-${Date.now()}-${i}`,
            ...b,
            status: "draft" as const,
          }));
        } else {
          console.warn("Gemini API error, falling back to mock:", text);
        }
      } catch (apiErr) {
        console.warn("Gemini API unreachable, using mock generation:", apiErr);
      }

      // Fallback to mock generation if API failed or returned nothing
      if (generated.length === 0) {
        generated = await generateMockBriefs(niche, model, style, campaign);
      }

      setBriefs(prev => [...generated, ...prev]);
      setSelectedId(generated[0].id);
      setGenerationDone(true);
    } catch (err) {
      console.error("Generation failed:", err);
    } finally {
      setGenerating(false);
    }
  };

  const handleSend = (id: string) => {
    setBriefs(prev => prev.map(b => b.id === id ? { ...b, status: "sent" } : b));
  };

  const handleDelete = (id: string) => {
    setBriefs(prev => prev.filter(b => b.id !== id));
    if (selectedId === id) setSelectedId(allBriefs.find(b => b.id !== id)?.id ?? null);
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "var(--background)" }}>
      <Sidebar />
      <div className="flex-1 flex min-w-0 overflow-hidden">

        {/* ── Left panel: AI Generator + Brief List ── */}
        <div
          className="w-80 flex-shrink-0 flex flex-col overflow-hidden"
          style={{ borderRight: "1px solid rgba(255,255,255,0.06)", backgroundColor: "#0a0a0a" }}
        >
          {/* Generator section */}
          <div className="px-4 pt-5 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <GenerateForm onGenerate={handleGenerate} loading={generating} />
          </div>

          {/* Brief list */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div
              className="px-4 py-3 text-xs font-semibold uppercase tracking-wide flex items-center justify-between"
              style={{ color: "#a8a8a8", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
            >
              <span>{allBriefs.length} Brief{allBriefs.length !== 1 ? "s" : ""}</span>
              <span style={{ color: "#22c55e" }}>{allBriefs.filter(b => b.status === "ready").length} ready</span>
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
              <AnimatePresence>
                {allBriefs.map(b => (
                  <motion.div
                    key={b.id}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <BriefCard
                      brief={b}
                      selected={selectedId === b.id}
                      onClick={() => setSelectedId(b.id)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
              {allBriefs.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Wand2 className="w-6 h-6 mb-2" style={{ color: "#333" }} />
                  <p className="text-xs" style={{ color: "#555" }}>Generate your first idea above</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Center panel: Brief Detail ── */}
        <div className="flex-1 overflow-y-auto p-8">
          {generating ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-full"
            >
              <div className="relative mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #ff0069, #833ab4)" }}
                >
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div
                  className="absolute -inset-2 rounded-3xl animate-ping opacity-20"
                  style={{ background: "linear-gradient(135deg, #ff0069, #833ab4)" }}
                />
              </div>
              <h3 className="text-white font-bold text-lg mb-1">Gemini is thinking...</h3>
              <p className="text-sm mb-6" style={{ color: "#a8a8a8" }}>
                Crafting 3 creative brief{`'`}s tailored for your model
              </p>
              <div className="flex items-center gap-1">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#ff0069" }}
                    animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                  />
                ))}
              </div>
            </motion.div>
          ) : selected ? (
            <BriefDetail
              brief={selected}
              onSend={() => handleSend(selected.id)}
              onDelete={() => handleDelete(selected.id)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center mb-5"
                style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <Sparkles className="w-8 h-8" style={{ color: "#333" }} />
              </div>
              <h3 className="text-white font-bold text-lg mb-1">Select a brief</h3>
              <p className="text-sm" style={{ color: "#a8a8a8" }}>
                Choose from the list or generate new ideas with AI
              </p>
            </div>
          )}
        </div>

        {/* ── Right panel: Quick Stats ── */}
        <div
          className="w-56 flex-shrink-0 overflow-y-auto p-5"
          style={{ borderLeft: "1px solid rgba(255,255,255,0.06)", backgroundColor: "#0a0a0a" }}
        >
          <h3 className="text-xs font-semibold uppercase tracking-wider mb-4" style={{ color: "#a8a8a8" }}>
            Pipeline Stats
          </h3>

          <div className="space-y-3">
            {[
              { label: "Total Briefs", value: allBriefs.length, color: "#833ab4" },
              { label: "Ready to Send", value: allBriefs.filter(b => b.status === "ready").length, color: "#ff0069" },
              { label: "Sent to Model", value: allBriefs.filter(b => b.status === "sent").length, color: "#22c55e" },
            ].map(stat => (
              <div
                key={stat.label}
                className="p-3 rounded-xl"
                style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <p className="text-xl font-black" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-[10px] font-semibold uppercase tracking-wider mt-0.5" style={{ color: "#a8a8a8" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: "#a8a8a8" }}>
              Model Breakdown
            </h3>
            <div className="space-y-2">
              {MODELS.map(m => {
                const modelBriefs = allBriefs.filter(b => b.model === m);
                const sent = modelBriefs.filter(b => b.status === "sent").length;
                return (
                  <div key={m} className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: "#d1d1d1" }}>{m}</span>
                    <div className="flex items-center gap-1.5">
                      <div className="flex gap-0.5">
                        {modelBriefs.length === 0 ? (
                          <span className="text-[10px]" style={{ color: "#555" }}>No briefs</span>
                        ) : (
                          Array.from({ length: Math.min(modelBriefs.length, 5) }).map((_, i) => (
                            <div
                              key={i}
                              className="w-1.5 h-1.5 rounded-full"
                              style={{ backgroundColor: i < sent ? "#22c55e" : "#ff0069" }}
                            />
                          ))
                        )}
                      </div>
                      <span className="text-[10px]" style={{ color: "#666" }}>
                        {sent}/{modelBriefs.length}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {generationDone && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-3 rounded-xl"
              style={{ backgroundColor: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)" }}
            >
              <p className="text-[11px] font-semibold" style={{ color: "#22c55e" }}>
                ✦ Ideas generated!
              </p>
              <p className="text-[10px] mt-1" style={{ color: "#78c257" }}>
                3 new briefs ready to review and send to your model.
              </p>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}
