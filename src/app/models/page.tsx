"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/layout/Sidebar";
import {
  Users2, Send, Upload, FolderOpen, Wand2, Plus, Play, CheckCircle2,
  Clock, Film, UploadCloud, HardDrive, ArrowRight, Check,
  X, ChevronRight, ChevronLeft, MessageSquare, AlertCircle
} from "lucide-react";

interface Model {
  id: string;
  name: string;
  handle: string;
  initials: string;
  color: string;
}

interface Reel {
  id: string;
  title: string;
  category: string;
  niche: string;
  model: Model;
  status: "pending" | "filmed" | "uploaded" | "drive";
  instructions: string;
  props: string;
  outfit: string;
  created: string;
}

interface DriveFile {
  id: string;
  name: string;
  model: Model;
  size: string;
  uploaded: string;
  synced: string;
  gradient: string;
}

const MODELS: Model[] = [
  { id: "m1", name: "Tyler", handle: "@abg.ricebunny", initials: "T", color: "#ff0069" },
  { id: "m2", name: "Ren", handle: "@rhinxrenx", initials: "R", color: "#833ab4" },
  { id: "m3", name: "Ella", handle: "@ellamira", initials: "E", color: "#78c257" },
];

const CATEGORIES = ["All", "Home", "Gym", "Outdoor", "Studio"];

const STATUS_COLORS: Record<Reel["status"], string> = {
  pending: "#ff0069",
  filmed: "#fcaf45",
  uploaded: "#833ab4",
  drive: "#78c257",
};
const STATUS_LABELS: Record<Reel["status"], string> = {
  pending: "Awaiting Film",
  filmed: "Filmed",
  uploaded: "Uploaded",
  drive: "In Drive",
};

const INITIAL_REELS: Reel[] = [
  { id: "r1", title: "5AM Club Morning Routine", category: "Home", niche: "Fitness", model: MODELS[0], status: "pending", instructions: "Start in bed, alarm going off. Cut to bathroom mirror. Then kitchen making shake. Natural light preferred.", props: "Alarm clock phone, Protein shake ingredients, Gym bag packed night before", outfit: "Black sports bra + grey joggers, hair messy from sleep", created: "2h ago" },
  { id: "r2", title: "Leg Day Drop Sets", category: "Gym", niche: "Fitness", model: MODELS[0], status: "filmed", instructions: "Dumbbells in foreground, camera slightly above. 3 quick cuts: setup, grind, pump. Finish with flex.", props: "Dumbbells 15kg pair, Gym towel, Water bottle", outfit: "Black tank top + shorts, hair in bun", created: "1d ago" },
  { id: "r3", title: "ABG Golden Hour Edit", category: "Outdoor", niche: "Lifestyle", model: MODELS[1], status: "uploaded", instructions: "Sunglasses on, walking towards camera. Slow pan. Two outfit changes. End on car shot.", props: "Sunglasses, Two outfits (street + dress), Car in background", outfit: "Outfit 1: White tee + denim shorts. Outfit 2: Mini dress + heels.", created: "3d ago" },
  { id: "r4", title: "Protein Smoothie Recipe", category: "Home", niche: "Fitness", model: MODELS[2], status: "pending", instructions: "Ingredients laid out first. Blender action shots. Pour into glass. Sip + smile at camera.", props: "Blender, Banana, berries, protein powder, Nice glass + straw", outfit: "Casual loungewear, hair down, natural makeup", created: "5h ago" },
  { id: "r5", title: "Gym Bag Essentials", category: "Gym", niche: "Fitness", model: MODELS[0], status: "pending", instructions: "Bag on floor, unpack it one item at a time. Highlight the protein powder and headphones. Quick cuts.", props: "Gym bag, Protein powder, Headphones, Lock, Towel", outfit: "Pre-gym fit: black sports bra + leggings", created: "8h ago" },
  { id: "r6", title: "Studio Light Test Loop", category: "Studio", niche: "Lifestyle", model: MODELS[1], status: "drive", instructions: "Stand in centre. Three rotations. 10 seconds each. Full body + close up face.", props: "Ring light setup, White backdrop", outfit: "White cropped tee + baggy jeans", created: "2d ago" },
  { id: "r7", title: "Outdoor Sunset Vibes", category: "Outdoor", niche: "Lifestyle", model: MODELS[2], status: "pending", instructions: "Golden hour. Sitting on wall, looking away. Cut to standing, walking. Three angles total.", props: "Beanie optional, Oversized jacket", outfit: "Beige oversized jacket, black jeans, white sneakers", created: "6h ago" },
  { id: "r8", title: "Shoulders + Arms Pump", category: "Gym", niche: "Fitness", model: MODELS[0], status: "drive", instructions: "Dumbbell shoulder press foreground. Camera slightly low angle. Three sets, 8 reps each. Finish pump pose.", props: "Dumbbells 10kg pair, Gym mirror in background", outfit: "Purple sports bra + black leggings", created: "4d ago" },
];

const DRIVE_FILES: DriveFile[] = [
  { id: "d1", name: "r3_ren_golden_hour_v1.mp4", model: MODELS[1], size: "387 MB", uploaded: "1h ago", synced: "45m ago", gradient: "linear-gradient(135deg, #ff0069, #fd1d1d)" },
  { id: "d2", name: "r3_ren_outfit2_dress.mp4", model: MODELS[1], size: "298 MB", uploaded: "1h ago", synced: "40m ago", gradient: "linear-gradient(135deg, #833ab4, #ff0069)" },
  { id: "d3", name: "r6_ren_studio_loop.mp4", model: MODELS[1], size: "89 MB", uploaded: "2d ago", synced: "2d ago", gradient: "linear-gradient(135deg, #833ab4, #00f4e2)" },
  { id: "d4", name: "r8_tyler_shoulders_raw.mp4", model: MODELS[0], size: "211 MB", uploaded: "4d ago", synced: "4d ago", gradient: "linear-gradient(135deg, #ff0069, #fcaf45)" },
  { id: "d5", name: "r4_ella_smoothie.mp4", model: MODELS[2], size: "156 MB", uploaded: "3d ago", synced: "3d ago", gradient: "linear-gradient(135deg, #78c257, #00f4e2)" },
  { id: "d6", name: "r2_tyler_legs_day.mp4", model: MODELS[0], size: "264 MB", uploaded: "1d ago", synced: "22h ago", gradient: "linear-gradient(135deg, #ff0069, #833ab4)" },
];

const STATS = [
  { label: "Briefs Sent", value: INITIAL_REELS.length, icon: Send, color: "#ff0069" },
  { label: "Awaiting Upload", value: INITIAL_REELS.filter(r => r.status === "filmed").length, icon: Upload, color: "#fcaf45" },
  { label: "In Drive", value: INITIAL_REELS.filter(r => r.status === "drive").length, icon: FolderOpen, color: "#833ab4" },
  { label: "Ready to Edit", value: DRIVE_FILES.length, icon: Wand2, color: "#78c257" },
];

function ReelCard({ reel, active, onClick }: { reel: Reel; active: boolean; onClick: () => void }) {
  const color = STATUS_COLORS[reel.status];
  return (
    <motion.button
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={onClick}
      className="w-full text-left px-4 py-3 rounded-xl transition-all"
      style={{
        backgroundColor: active ? "rgba(255,0,105,0.08)" : "transparent",
        border: active ? `1px solid rgba(255,0,105,0.25)` : `1px solid transparent`,
      }}
    >
      <div className="flex items-start gap-2.5">
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5"
          style={{ backgroundColor: reel.model.color }}
        >
          {reel.model.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-xs font-medium truncate leading-tight">{reel.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>{reel.model.name}</span>
            <span
              className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
              style={{ backgroundColor: `${color}18`, color }}
            >
              {STATUS_LABELS[reel.status]}
            </span>
          </div>
          <p className="text-[10px] mt-0.5" style={{ color: "var(--muted-foreground)" }}>{reel.created}</p>
        </div>
      </div>
    </motion.button>
  );
}

function BriefComposer({ models, onSend }: { models: Model[]; onSend: (r: Reel) => void }) {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [niche, setNiche] = useState("");
  const [instructions, setInstructions] = useState("");
  const [props, setProps] = useState("");
  const [outfit, setOutfit] = useState("");

  const handleSend = () => {
    if (!selectedModel || !title || !category) return;
    onSend({
      id: `r${Date.now()}`,
      title,
      category,
      niche,
      model: selectedModel,
      status: "pending",
      instructions,
      props,
      outfit,
      created: "Just now",
    });
    setTitle(""); setCategory(""); setNiche(""); setInstructions(""); setProps(""); setOutfit("");
    setSelectedModel(null);
  };

  const fieldStyle = { backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.08)", color: "white" };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-white font-bold text-lg">Send a New Brief</h2>
      </div>

      {/* Model select */}
      <div>
        <label className="text-xs font-semibold mb-2 block" style={{ color: "var(--muted-foreground)" }}>Model</label>
        <div className="flex flex-wrap gap-2">
          {models.map(m => (
            <button
              key={m.id}
              onClick={() => setSelectedModel(m)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all"
              style={{
                backgroundColor: selectedModel?.id === m.id ? `${m.color}20` : "var(--card)",
                border: `1px solid ${selectedModel?.id === m.id ? m.color : "rgba(255,255,255,0.08)"}`,
                color: "white",
              }}
            >
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold text-white" style={{ backgroundColor: m.color }}>{m.initials}</div>
              {m.name}
            </button>
          ))}
        </div>
      </div>

      {/* Title */}
      <div>
        <label className="text-xs font-semibold mb-2 block" style={{ color: "var(--muted-foreground)" }}>Reel Title</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="e.g. 5AM Morning Routine"
          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none placeholder:text-muted-foreground"
          style={fieldStyle}
        />
      </div>

      {/* Category */}
      <div>
        <label className="text-xs font-semibold mb-2 block" style={{ color: "var(--muted-foreground)" }}>Shoot Category</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.slice(1).map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className="px-4 py-1.5 rounded-full text-xs font-medium transition-all"
              style={{
                backgroundColor: category === c ? "rgba(255,0,105,0.12)" : "var(--card)",
                border: `1px solid ${category === c ? "rgba(255,0,105,0.3)" : "rgba(255,255,255,0.08)"}`,
                color: category === c ? "#ff0069" : "var(--muted-foreground)",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Niche */}
      <div>
        <label className="text-xs font-semibold mb-2 block" style={{ color: "var(--muted-foreground)" }}>Niche</label>
        <input
          value={niche}
          onChange={e => setNiche(e.target.value)}
          placeholder="e.g. Fitness, Lifestyle"
          className="w-full px-4 py-2.5 rounded-xl text-sm outline-none placeholder:text-muted-foreground"
          style={fieldStyle}
        />
      </div>

      {/* Instructions */}
      <div>
        <label className="text-xs font-semibold mb-2 block" style={{ color: "var(--muted-foreground)" }}>Filming Instructions</label>
        <textarea
          value={instructions}
          onChange={e => setInstructions(e.target.value)}
          placeholder="Describe exactly what to film, camera angles, cuts, etc."
          rows={4}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none placeholder:text-muted-foreground resize-none"
          style={fieldStyle}
        />
      </div>

      {/* Props */}
      <div>
        <label className="text-xs font-semibold mb-2 block" style={{ color: "var(--muted-foreground)" }}>Props Needed</label>
        <textarea
          value={props}
          onChange={e => setProps(e.target.value)}
          placeholder="e.g. Gym towel, protein shaker, headphones"
          rows={2}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none placeholder:text-muted-foreground resize-none"
          style={fieldStyle}
        />
      </div>

      {/* Outfit */}
      <div>
        <label className="text-xs font-semibold mb-2 block" style={{ color: "var(--muted-foreground)" }}>Outfit Notes</label>
        <textarea
          value={outfit}
          onChange={e => setOutfit(e.target.value)}
          placeholder="e.g. Black sports bra + grey joggers, hair in bun"
          rows={2}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none placeholder:text-muted-foreground resize-none"
          style={fieldStyle}
        />
      </div>

      <button
        onClick={handleSend}
        disabled={!selectedModel || !title || !category}
        className="w-full py-3 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-40"
        style={{ background: "linear-gradient(135deg, #ff0069, #fd1d1d)" }}
      >
        Send Brief
      </button>
    </div>
  );
}

function ReelDetail({ reel, onBack }: { reel: Reel; onBack: () => void }) {
  const color = STATUS_COLORS[reel.status];

  return (
    <div className="flex-1 overflow-y-auto p-6">
      <button onClick={onBack} className="flex items-center gap-1 text-xs mb-5 hover:text-white transition-colors" style={{ color: "var(--muted-foreground)" }}>
        <ChevronLeft size={14} /> Back to Backlog
      </button>

      <div className="flex items-start gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ backgroundColor: reel.model.color }}>
          {reel.model.initials}
        </div>
        <div>
          <h2 className="text-white font-bold text-base leading-tight">{reel.title}</h2>
          <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{reel.model.handle} · {reel.model.name}</p>
        </div>
      </div>

      {/* Status + category */}
      <div className="flex items-center gap-2 mb-6">
        <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ backgroundColor: `${color}18`, color }}>
          {STATUS_LABELS[reel.status]}
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "var(--muted-foreground)" }}>
          {reel.category}
        </span>
        <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: "rgba(255,255,255,0.04)", color: "var(--muted-foreground)" }}>
          {reel.niche}
        </span>
        <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>· {reel.created}</span>
      </div>

      {/* Sections */}
      {[
        { label: "Filming Instructions", value: reel.instructions, icon: Film },
        { label: "Props Needed", value: reel.props, icon: CheckCircle2 },
        { label: "Outfit Notes", value: reel.outfit, icon: Users2 },
      ].map(({ label, value, icon: Icon }) => (
        value ? (
          <div key={label} className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <Icon size={13} style={{ color }} />
              <span className="text-xs font-semibold" style={{ color }}>{label}</span>
            </div>
            <div
              className="p-4 rounded-xl text-sm leading-relaxed"
              style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.06)", color: "var(--muted-foreground)" }}
            >
              {value}
            </div>
          </div>
        ) : null
      ))}

      {/* Actions */}
      <div className="flex flex-wrap gap-3 mt-8">
        {reel.status === "pending" && (
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, #ff0069, #fd1d1d)" }}>
            <CheckCircle2 size={14} /> Mark as Filmed
          </button>
        )}
        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "var(--muted-foreground)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <MessageSquare size={14} /> Send Reminder
        </button>
        {reel.status === "drive" && (
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ backgroundColor: "rgba(131,58,180,0.12)", color: "#833ab4", border: "1px solid rgba(131,58,180,0.2)" }}>
            <FolderOpen size={14} /> View in Drive
          </button>
        )}
      </div>
    </div>
  );
}

export default function ModelsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedReel, setSelectedReel] = useState<Reel | null>(null);
  const [showComposer, setShowComposer] = useState(false);
  const [rightTab, setRightTab] = useState<"upload" | "drive">("drive");
  const [reels, setReels] = useState<Reel[]>(INITIAL_REELS);

  const filtered = activeFilter === "All" ? reels : reels.filter(r => r.category === activeFilter);

  const addReel = (r: Reel) => {
    setReels(prev => [r, ...prev]);
    setShowComposer(false);
    setSelectedReel(r);
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "var(--background)" }}>
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", backgroundColor: "var(--background)" }}
        >
          <div>
            <div className="flex items-center gap-2">
              <Users2 size={18} style={{ color: "#ff0069" }} />
              <h1 className="text-white font-bold text-lg">Model Platform</h1>
            </div>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Brief → Film → Upload → Drive</p>
          </div>
          <button
            onClick={() => { setShowComposer(true); setSelectedReel(null); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #ff0069, #fd1d1d)" }}
          >
            <Plus size={15} /> New Brief
          </button>
        </div>

        {/* Stats strip */}
        <div
          className="grid flex-shrink-0"
          style={{ gridTemplateColumns: "repeat(4, 1fr)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="px-6 py-4" style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <div className="flex items-center gap-2 mb-1">
                  <Icon size={13} style={{ color: stat.color }} />
                  <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>{stat.label}</span>
                </div>
                <p className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Body */}
        <div className="flex flex-1 min-h-0 overflow-hidden">

          {/* Left — Backlog */}
          <div
            className="w-72 flex-shrink-0 flex flex-col overflow-hidden"
            style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}
          >
            {/* Filter tabs */}
            <div className="flex items-center gap-1 px-3 py-3 overflow-x-auto flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={
                    activeFilter === cat
                      ? { backgroundColor: "rgba(255,0,105,0.12)", color: "#ff0069" }
                      : { backgroundColor: "transparent", color: "var(--muted-foreground)" }
                  }
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Reel list */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
              {filtered.map(reel => (
                <ReelCard
                  key={reel.id}
                  reel={reel}
                  active={selectedReel?.id === reel.id}
                  onClick={() => { setSelectedReel(reel); setShowComposer(false); }}
                />
              ))}
              {filtered.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>No reels in this category</p>
                </div>
              )}
            </div>
          </div>

          {/* Center — Composer or Detail */}
          <div
            className="flex-1 min-w-0 overflow-hidden"
            style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}
          >
            {showComposer ? (
              <BriefComposer models={MODELS} onSend={addReel} />
            ) : selectedReel ? (
              <ReelDetail reel={selectedReel} onBack={() => setSelectedReel(null)} />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center px-8">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(255,0,105,0.08)" }}>
                  <Users2 size={28} style={{ color: "#ff0069" }} />
                </div>
                <p className="text-white font-semibold text-base mb-2">Select a reel or create a brief</p>
                <p className="text-sm mb-6" style={{ color: "var(--muted-foreground)" }}>Click any reel on the left to see the full brief, or create a new one.</p>
                <button
                  onClick={() => setShowComposer(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
                  style={{ background: "linear-gradient(135deg, #ff0069, #fd1d1d)" }}
                >
                  <Plus size={15} /> New Brief
                </button>
              </div>
            )}
          </div>

          {/* Right — Upload + Drive */}
          <div className="w-80 flex-shrink-0 flex flex-col overflow-hidden">

            {/* Tabs */}
            <div className="flex items-center p-1 m-3 rounded-xl flex-shrink-0" style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.06)" }}>
              {([["drive", "Drive", HardDrive], ["upload", "Upload", UploadCloud]] as const).map(([id, label, Icon]) => (
                <button
                  key={id}
                  onClick={() => setRightTab(id)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all"
                  style={{ color: rightTab === id ? "white" : "var(--muted-foreground)", backgroundColor: rightTab === id ? "rgba(255,0,105,0.12)" : "transparent" }}
                >
                  <Icon size={12} /> {label}
                </button>
              ))}
            </div>

            {rightTab === "upload" ? (
              <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
                {/* Drop zone */}
                <div
                  className="rounded-2xl border-2 border-dashed flex flex-col items-center justify-center py-10 px-4 text-center transition-colors cursor-pointer hover:border-pink-500/40"
                  style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: "var(--card)" }}
                >
                  <UploadCloud size={32} style={{ color: "var(--muted-foreground)" }} className="mb-3" />
                  <p className="text-white text-sm font-medium mb-1">Drop files here</p>
                  <p className="text-xs mb-4" style={{ color: "var(--muted-foreground)" }}>or click to upload · No size limit</p>
                  <button className="px-5 py-2 rounded-xl text-xs font-semibold text-white" style={{ background: "linear-gradient(135deg, #ff0069, #fd1d1d)" }}>
                    Select Files
                  </button>
                </div>

                {/* Recent uploads */}
                <div>
                  <p className="text-xs font-semibold mb-2" style={{ color: "var(--muted-foreground)" }}>Recent Uploads</p>
                  {INITIAL_REELS.filter(r => r.status === "uploaded" || r.status === "drive").map(r => (
                    <div key={r.id} className="flex items-center gap-3 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: r.model.color }}>
                        <Film size={12} className="text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs truncate">{r.title}</p>
                        <p className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>{r.model.name} · {r.created}</p>
                      </div>
                      <span className="text-[9px] font-semibold" style={{ color: STATUS_COLORS[r.status] }}>{STATUS_LABELS[r.status]}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-4 pb-4">
                {/* Drive header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FolderOpen size={14} style={{ color: "#833ab4" }} />
                    <span className="text-white text-sm font-semibold">Google Drive</span>
                  </div>
                  <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>1.4 GB synced</span>
                </div>

                {/* Files */}
                <div className="space-y-2">
                  {DRIVE_FILES.map(f => (
                    <motion.div
                      key={f.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors hover:bg-white/5"
                      style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      {/* Thumbnail */}
                      <div className="relative w-12 h-14 rounded-lg overflow-hidden flex-shrink-0" style={{ background: f.gradient }}>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play size={14} className="text-white fill-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-medium truncate leading-tight">{f.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white" style={{ backgroundColor: f.model.color }}>
                            {f.model.initials}
                          </div>
                          <span className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>{f.model.name}</span>
                        </div>
                        <p className="text-[10px] mt-0.5" style={{ color: "var(--muted-foreground)" }}>{f.size} · {f.synced}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Sync status */}
                <div className="mt-4 flex items-center gap-2 p-3 rounded-xl" style={{ backgroundColor: "rgba(120,194,87,0.08)", border: "1px solid rgba(120,194,87,0.15)" }}>
                  <CheckCircle2 size={14} style={{ color: "#78c257" }} />
                  <p className="text-xs" style={{ color: "#78c257" }}>Auto-sync active · Last sync: just now</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
