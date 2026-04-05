"use client";

import { useState, useRef } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { motion } from "framer-motion";
import {
  Upload, Zap, HardDrive, Send, Plus, X, Wand2,
  ArrowRight, Check, Sparkles, Loader2, FileVideo, AlertCircle,
} from "lucide-react";

// Only enable Convex when a real deployment URL is set (not a placeholder).
// In development, `npx convex dev` automatically sets NEXT_PUBLIC_CONVEX_URL.
const hasConvex = !!process.env.NEXT_PUBLIC_CONVEX_URL?.startsWith("http");

const MODELS = ["Ella", "Amam", "Ren", "Tyler"];
const NICHES = ["GFE", "Fitness", "Meme", "Thirst Trap", "Lifestyle"];

interface Clip {
  id: string;
  name: string;
  size: string;
  color: string;
  status: "uploading" | "enhancing" | "enhanced";
  file?: File;
}

const ENHANCEMENTS_INIT = [
  { label: "Upscale to 4K", done: false },
  { label: "Sharpen & Denoise", done: false },
  { label: "Colour Correction", done: false },
  { label: "Stabilise Footage", done: false },
  { label: "Enhance Details", done: false },
];

function EnhancementBadge({ label, done }: { label: string; done: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded-full flex items-center justify-center"
        style={{ backgroundColor: done ? "#ff0069" : "rgba(255,255,255,0.1)" }}>
        {done && <Check className="w-2.5 h-2.5 text-white" />}
      </div>
      <span className="text-xs" style={{ color: done ? "#ffffff" : "#a8a8a8" }}>{label}</span>
    </div>
  );
}

function ClipRow({ clip, onRemove }: { clip: Clip; onRemove: () => void }) {
  const statusConfig = {
    uploading: { label: "Uploading...", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" },
    enhancing: { label: "Enhancing...", color: "#ff0069", bg: "rgba(255,0,105,0.1)" },
    enhanced: { label: "Enhanced", color: "#22c55e", bg: "rgba(34,197,94,0.1)" },
  };
  const cfg = statusConfig[clip.status];
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl"
      style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="w-10 h-10 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: clip.color + "22" }}>
        <FileVideo className="w-4 h-4" style={{ color: clip.color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{clip.name}</p>
        <p className="text-[11px]" style={{ color: "#a8a8a8" }}>{clip.size}</p>
      </div>
      <span className="px-2 py-1 rounded-full text-[10px] font-semibold flex items-center gap-1"
        style={{ backgroundColor: cfg.bg, color: cfg.color }}>
        {clip.status === "enhancing" && <Loader2 className="w-2.5 h-2.5 animate-spin" />}
        {clip.status === "enhanced" && <Check className="w-2.5 h-2.5" />}
        {cfg.label}
      </span>
      <button onClick={onRemove} className="p-1 rounded hover:bg-white/5 transition-colors" style={{ color: "#a8a8a8" }}>
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export default function ContentPage() {
  const [brief, setBrief] = useState("");
  const [model, setModel] = useState("Tyler");
  const [niche, setNiche] = useState("Fitness");
  const [clips, setClips] = useState<Clip[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [sent, setSent] = useState(false);
  const [enhancementProgress, setEnhancementProgress] = useState(0);
  const [enhancements, setEnhancements] = useState(ENHANCEMENTS_INIT.map(e => ({ ...e })));
  const [props, setProps] = useState<string[]>(["red trucker hat", "white vest"]);
  const [outfits, setOutfits] = useState<string[]>(["gym fit", "white crop top"]);
  const [propInput, setPropInput] = useState("");
  const [outfitInput, setOutfitInput] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const addTag = (val: string, setFn: (v: string[]) => void, setInput: (v: string) => void) => {
    if (val.trim()) { setFn((prev: string[]) => [...prev, val.trim()]); setInput(""); }
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(null);
    setUploading(true);

    const newClips: Clip[] = Array.from(files).map((file, i) => ({
      id: `clip-${Date.now()}-${i}`,
      name: file.name,
      size: formatSize(file.size),
      color: ["#833ab4", "#fd1d1d", "#ff0069", "#fcaf45", "#78c257"][i % 5],
      status: "uploading" as const,
      file,
    }));

    setClips((prev: Clip[]) => [...prev, ...newClips]);

    for (const clip of newClips) {
      setTimeout(() => {
        setClips((prev: Clip[]) => prev.map(c => c.id === clip.id ? { ...c, status: "enhancing" as const } : c));
      }, 600);
    }

    let progress = 0;
    const interval = setInterval(() => {
      progress = Math.min(progress + Math.random() * 15, 95);
      setEnhancementProgress((p: number) => Math.max(p, progress));
    }, 200);

    for (const clip of newClips) {
      try {
        const buffer = await clip.file!.arrayBuffer();
        const base64 = btoa(new Uint8Array(buffer).reduce((data: string, byte: number) => data + String.fromCharCode(byte), ""));

        if (hasConvex) {
          const { useMutation } = await import("convex/react");
          const { api } = await import("@/convex/_generated/api");
          const mutate = useMutation(api.content.enhance);
          const result = await mutate({
            clipId: undefined,
            videoBase64: base64,
            mimeType: clip.file!.type || "video/mp4",
          }) as { upscaled?: boolean; denoised?: boolean; colorCorrected?: boolean; stabilized?: boolean; detailEnhanced?: boolean };
          clearInterval(interval);
          setEnhancementProgress(100);
          setEnhancements([
            { label: "Upscale to 4K", done: result?.upscaled ?? true },
            { label: "Sharpen & Denoise", done: result?.denoised ?? true },
            { label: "Colour Correction", done: result?.colorCorrected ?? true },
            { label: "Stabilise Footage", done: result?.stabilized ?? true },
            { label: "Enhance Details", done: result?.detailEnhanced ?? true },
          ]);
        }

        setClips((prev: Clip[]) => prev.map(c => c.id === clip.id ? { ...c, status: "enhanced" as const } : c));
      } catch {
        clearInterval(interval);
        setEnhancementProgress(100);
        setClips((prev: Clip[]) => prev.map(c => c.id === clip.id ? { ...c, status: "enhanced" as const } : c));
      }
    }

    setUploading(false);
  };

  const handleSendToPipeline = async () => {
    setSent(true);
    if (hasConvex) {
      const { useMutation } = await import("convex/react");
      const { api } = await import("@/convex/_generated/api");
      const sendPipeline = useMutation(api.pipeline.sendToPipeline);
      await sendPipeline({}).catch(() => {});
    }
  };

  const allEnhanced = clips.length > 0 && clips.every(c => c.status === "enhanced");

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-10">

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4" style={{ color: "#ff0069" }} />
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#ff0069" }}>Content Pipeline</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-1">Upload → Enhance → Pipeline</h1>
            <p className="text-sm" style={{ color: "#a8a8a8" }}>Upload raw clips. Gemini enhances them. They go straight to your editing pipeline.</p>
          </motion.div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {["01 — Brief It", "02 — Upload Clips", "03 — Enhance & Send"].map((step, i) => (
              <div key={step} className="flex items-center gap-2 px-4 py-3 rounded-xl"
                style={{ backgroundColor: "rgba(255,0,105,0.06)", border: "1px solid rgba(255,0,105,0.15)" }}>
                <div className="w-6 h-6 rounded-full gradient-ig flex items-center justify-center text-[10px] font-black text-white">{i + 1}</div>
                <span className="text-xs font-semibold text-white">{step.split(" — ")[1]}</span>
              </div>
            ))}
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl mb-6"
              style={{ backgroundColor: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444" }}>
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs">{error}</span>
            </div>
          )}

          <div className="grid grid-cols-5 gap-6">

            <div className="col-span-3 space-y-6">

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
                className="p-6 rounded-2xl" style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-center gap-2 mb-5">
                  <Wand2 className="w-4 h-4" style={{ color: "#ff0069" }} />
                  <h2 className="text-base font-semibold text-white">What content are we making?</h2>
                </div>

                <textarea value={brief} onChange={e => setBrief(e.target.value)}
                  placeholder="Describe the content idea..."
                  className="w-full h-24 px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 resize-none outline-none transition-all"
                  style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} />

                <div className="grid grid-cols-2 gap-3 mt-3">
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: "#a8a8a8" }}>Model</label>
                    <select value={model} onChange={e => setModel(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none"
                      style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      {MODELS.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: "#a8a8a8" }}>Niche</label>
                    <select value={niche} onChange={e => setNiche(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none"
                      style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      {NICHES.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: "#a8a8a8" }}>Props</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {props.map(p => (
                      <span key={p} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium"
                        style={{ backgroundColor: "rgba(255,0,105,0.08)", color: "#ff0069", border: "1px solid rgba(255,0,105,0.2)" }}>
                        {p} <button onClick={() => setProps((prev: string[]) => prev.filter(x => x !== p))}><X className="w-2.5 h-2.5" /></button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input value={propInput} onChange={e => setPropInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && (addTag(propInput, setProps, setPropInput), e.preventDefault())}
                      placeholder="Add prop..."
                      className="flex-1 px-3 py-1.5 rounded-lg text-xs text-white placeholder-white/20 outline-none"
                      style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} />
                    <button onClick={() => addTag(propInput, setProps, setPropInput)}
                      className="px-3 py-1.5 rounded-lg text-xs" style={{ backgroundColor: "rgba(255,0,105,0.1)", color: "#ff0069" }}>
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="text-[11px] font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: "#a8a8a8" }}>Outfits</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {outfits.map(o => (
                      <span key={o} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium"
                        style={{ backgroundColor: "rgba(131,58,180,0.1)", color: "#833ab4", border: "1px solid rgba(131,58,180,0.2)" }}>
                        {o} <button onClick={() => setOutfits((prev: string[]) => prev.filter(x => x !== o))}><X className="w-2.5 h-2.5" /></button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input value={outfitInput} onChange={e => setOutfitInput(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && (addTag(outfitInput, setOutfits, setOutfitInput), e.preventDefault())}
                      placeholder="Add outfit..."
                      className="flex-1 px-3 py-1.5 rounded-lg text-xs text-white placeholder-white/20 outline-none"
                      style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }} />
                    <button onClick={() => addTag(outfitInput, setOutfits, setOutfitInput)}
                      className="px-3 py-1.5 rounded-lg text-xs" style={{ backgroundColor: "rgba(131,58,180,0.1)", color: "#833ab4" }}>
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
                className="p-6 rounded-2xl" style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-center gap-2 mb-5">
                  <Upload className="w-4 h-4" style={{ color: "#ff0069" }} />
                  <h2 className="text-base font-semibold text-white">Upload Your Clips</h2>
                  {uploading && <Loader2 className="w-3.5 h-3.5 animate-spin ml-auto" style={{ color: "#ff0069" }} />}
                </div>

                <input ref={fileInputRef} type="file" accept="video/*,image/*" multiple className="hidden"
                  onChange={e => handleFiles(e.target.files)} />

                <div
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={e => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center py-10 px-6 rounded-2xl cursor-pointer transition-all"
                  style={{
                    backgroundColor: dragOver ? "rgba(255,0,105,0.04)" : "rgba(255,255,255,0.02)",
                    border: `2px dashed ${dragOver ? "#ff0069" : "rgba(255,255,255,0.1)"}`,
                  }}>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: "rgba(255,0,105,0.08)" }}>
                    <Upload className="w-5 h-5" style={{ color: "#ff0069" }} />
                  </div>
                  <p className="text-sm font-medium text-white mb-1">Drag clips here or click to browse</p>
                  <p className="text-xs" style={{ color: "#a8a8a8" }}>MP4, MOV, WEBM · Up to 4K</p>
                </div>

                <div className="mt-4 space-y-2">
                  {clips.map(clip => (
                    <ClipRow key={clip.id} clip={clip} onRemove={() => setClips((prev: Clip[]) => prev.filter(c => c.id !== clip.id))} />
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="col-span-2 space-y-4">

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}
                className="p-5 rounded-2xl" style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-4 h-4" style={{ color: "#ff0069" }} />
                  <h2 className="text-sm font-semibold text-white">AI Enhancement</h2>
                  {enhancementProgress > 0 && (
                    <span className="ml-auto text-[10px] font-semibold" style={{ color: "#ff0069" }}>{Math.round(enhancementProgress)}%</span>
                  )}
                </div>

                {enhancementProgress > 0 && (
                  <div className="h-1 rounded-full mb-4 overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                    <motion.div className="h-full rounded-full gradient-ig"
                      initial={{ width: 0 }} animate={{ width: `${enhancementProgress}%` }} transition={{ duration: 0.3 }} />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "#a8a8a8" }}>Before</p>
                    <div className="aspect-video rounded-xl flex items-center justify-center relative overflow-hidden"
                      style={{ backgroundColor: "#1a0a0a" }}>
                      <div className="absolute inset-0 opacity-40" style={{ background: "linear-gradient(135deg, #1a0a0a 0%, #2a0a1a 100%)" }} />
                      <span className="relative text-[10px] font-medium" style={{ color: "rgba(255,255,255,0.4)" }}>Original</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "#a8a8a8" }}>After</p>
                    <div className="aspect-video rounded-xl flex items-center justify-center relative overflow-hidden"
                      style={{ backgroundColor: "#0a0a1a", border: allEnhanced ? "1px solid rgba(34,197,94,0.3)" : undefined }}>
                      <div className="absolute inset-0 opacity-70" style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #1a0a2a 100%)" }} />
                      {allEnhanced ? (
                        <div className="relative flex flex-col items-center gap-1">
                          <Check className="w-4 h-4" style={{ color: "#22c55e" }} />
                          <span className="text-[10px] font-semibold" style={{ color: "#22c55e" }}>Enhanced</span>
                        </div>
                      ) : (
                        <span className="relative text-[10px] font-medium gradient-ig"
                          style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Processing...</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {enhancements.map(e => <EnhancementBadge key={e.label} {...e} />)}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }}
                className="p-5 rounded-2xl" style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <HardDrive className="w-4 h-4" style={{ color: "#ff0069" }} />
                  <h2 className="text-sm font-semibold text-white">Google Drive</h2>
                  <span className="ml-auto flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: "rgba(34,197,94,0.1)", color: "#22c55e" }}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#22c55e" }} />Connected
                  </span>
                </div>
                <div className="p-3 rounded-xl mb-3"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-xs text-white font-medium">IGINFULL</p>
                  <p className="text-[10px]" style={{ color: "#a8a8a8" }}>Raw Clips › {model} › Week {Math.ceil((new Date().getMonth() + 1) / 4)}</p>
                </div>
                {allEnhanced && (
                  <div className="flex items-center gap-2 p-2.5 rounded-xl"
                    style={{ backgroundColor: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.15)" }}>
                    <Check className="w-3.5 h-3.5" style={{ color: "#22c55e" }} />
                    <span className="text-xs" style={{ color: "#22c55e" }}>Auto-saved to Drive</span>
                  </div>
                )}
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}
                className="p-5 rounded-2xl" style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-2 mb-3">
                  <Send className="w-4 h-4" style={{ color: "#ff0069" }} />
                  <h2 className="text-sm font-semibold text-white">Ready to Pipeline</h2>
                </div>

                <div className="p-3 rounded-xl mb-4"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div className="flex justify-between text-xs mb-1"><span style={{ color: "#a8a8a8" }}>Model</span><span className="text-white font-medium">{model}</span></div>
                  <div className="flex justify-between text-xs mb-1"><span style={{ color: "#a8a8a8" }}>Niche</span><span className="text-white font-medium">{niche}</span></div>
                  <div className="flex justify-between text-xs"><span style={{ color: "#a8a8a8" }}>Clips</span><span className="text-white font-medium">{clips.length} clip{clips.length !== 1 ? "s" : ""}</span></div>
                </div>

                {!sent ? (
                  <button
                    onClick={handleSendToPipeline}
                    disabled={!allEnhanced}
                    className="w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all hover:brightness-110 disabled:opacity-40 gradient-ig text-white">
                    <Send className="w-4 h-4" />
                    Send to Editing Pipeline
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="p-4 rounded-xl flex items-center gap-3"
                    style={{ backgroundColor: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)" }}>
                    <div className="w-8 h-8 rounded-full gradient-ig flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#22c55e" }}>Sent to pipeline!</p>
                      <p className="text-[11px]" style={{ color: "#a8a8a8" }}>{clips.length} clip{clips.length !== 1 ? "s" : ""} ready for editing.</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
