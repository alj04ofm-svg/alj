"use client";
import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { motion } from "framer-motion";
import { Sparkles, Wand2, Send, Plus, X, Check, Edit3, ArrowRight, Target } from "lucide-react";

const MODELS = ["Ella", "Amam", "Ren", "Tyler"];
const NICHES = ["GFE", "Fitness", "Meme", "Thirst Trap", "Lifestyle"];
const STYLES = ["Unbothered / Deadpan", "Flirty / Confident", "Gym Thirst Trap", "POV Story", "Couple Collab", "Transition"];

interface Brief {
  id: string;
  title: string;
  model: string;
  niche: string;
  style: string;
  tags: string[];
  context: string;
  status: "draft" | "sent";
  createdAt: string;
}

export default function IdeasPage() {
  const [briefs, setBriefs] = useState<Brief[]>([
    { id: "1", title: "Morning Motivation", model: "Tyler", niche: "Fitness", style: "POV Story", tags: ["#fitness", "#motivation", "#gym"], context: "Filmed at home before gym session", status: "sent", createdAt: "2h ago" },
    { id: "2", title: "Couple Workout", model: "Ella", niche: "GFE", style: "Couple Collab", tags: ["#couple", "#fitcouple", "#gym"], context: "Filmed at gym with partner", status: "draft", createdAt: "5h ago" },
  ]);
  const [selected, setSelected] = useState<string | null>("1");
  const [editingTags, setEditingTags] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", model: MODELS[0], niche: NICHES[0], style: STYLES[0], tags: [] as string[], context: "" });

  const selectedBrief = briefs.find(b => b.id === selected);

  const addTag = (tag: string, briefId: string) => {
    if (!tag.trim()) return;
    setBriefs(prev => prev.map(b => b.id === briefId ? { ...b, tags: [...b.tags, tag.trim()] } : b));
    setTagInput("");
  };

  const removeTag = (tag: string, briefId: string) => {
    setBriefs(prev => prev.map(b => b.id === briefId ? { ...b, tags: b.tags.filter(t => t !== tag) } : b));
  };

  const createBrief = () => {
    if (!form.title) return;
    const newBrief: Brief = { id: Date.now().toString(), ...form, status: "draft", createdAt: "Just now" };
    setBriefs(prev => [newBrief, ...prev]);
    setForm({ title: "", model: MODELS[0], niche: NICHES[0], style: STYLES[0], tags: [], context: "" });
    setShowForm(false);
    setSelected(newBrief.id);
  };

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "var(--background)" }}>
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", backgroundColor: "var(--background)" }}>
          <div className="flex items-center gap-2">
            <Sparkles size={18} style={{ color: "#ff0069" }} />
            <h1 className="text-white font-bold text-lg">Content Ideas</h1>
          </div>
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, #ff0069, #fd1d1d)" }}>
            <Plus size={15} /> New Brief
          </button>
        </div>

        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Brief list */}
          <div className="w-80 flex-shrink-0 flex flex-col overflow-hidden" style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="px-4 py-3 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted-foreground)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              {briefs.length} Brief{briefs.length !== 1 ? "s" : ""}
            </div>
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
              {briefs.map(b => (
                <button key={b.id} onClick={() => setSelected(b.id)} className="w-full text-left px-4 py-3 rounded-xl transition-all" style={{ backgroundColor: selected === b.id ? "rgba(255,0,105,0.08)" : "transparent", border: selected === b.id ? "1px solid rgba(255,0,105,0.25)" : "1px solid transparent" }}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{b.title}</p>
                      <p className="text-xs mt-0.5 truncate" style={{ color: "var(--muted-foreground)" }}>{b.model} · {b.niche}</p>
                    </div>
                    <span className="flex-shrink-0 text-[9px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: b.status === "sent" ? "rgba(120,194,87,0.12)" : "rgba(255,255,255,0.06)", color: b.status === "sent" ? "#78c257" : "var(--muted-foreground)" }}>
                      {b.status === "sent" ? "Sent" : "Draft"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {b.tags.slice(0, 3).map(t => <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "var(--muted-foreground)" }}>{t}</span>)}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Detail */}
          <div className="flex-1 overflow-y-auto p-6">
            {showForm ? (
              <div className="max-w-xl space-y-4">
                <h2 className="text-white font-bold text-lg">New Content Brief</h2>
                <div>
                  <label className="text-xs font-semibold mb-2 block" style={{ color: "var(--muted-foreground)" }}>Title</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.08)", color: "white" }} placeholder="Brief title..." />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-2 block" style={{ color: "var(--muted-foreground)" }}>Context / Idea</label>
                  <textarea value={form.context} onChange={e => setForm(f => ({ ...f, context: e.target.value }))} rows={3} className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none" style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.08)", color: "white" }} placeholder="Describe the content idea..." />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-2 block" style={{ color: "var(--muted-foreground)" }}>Model</label>
                  <div className="flex flex-wrap gap-2">
                    {MODELS.map(m => <button key={m} onClick={() => setForm(f => ({ ...f, model: m }))} className="px-4 py-2 rounded-xl text-sm font-medium transition-all" style={{ backgroundColor: form.model === m ? "rgba(255,0,105,0.12)" : "var(--card)", border: `1px solid ${form.model === m ? "rgba(255,0,105,0.3)" : "rgba(255,255,255,0.08)"}`, color: form.model === m ? "#ff0069" : "var(--muted-foreground)" }}>{m}</button>)}
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold mb-2 block" style={{ color: "var(--muted-foreground)" }}>Style</label>
                  <div className="flex flex-wrap gap-2">
                    {STYLES.map(s => <button key={s} onClick={() => setForm(f => ({ ...f, style: s }))} className="px-4 py-2 rounded-xl text-sm font-medium transition-all" style={{ backgroundColor: form.style === s ? "rgba(255,0,105,0.12)" : "var(--card)", border: `1px solid ${form.style === s ? "rgba(255,0,105,0.3)" : "rgba(255,255,255,0.08)"}`, color: form.style === s ? "#ff0069" : "var(--muted-foreground)" }}>{s}</button>)}
                  </div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={createBrief} className="flex-1 py-3 rounded-xl text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, #ff0069, #fd1d1d)" }}>Create Brief</button>
                  <button onClick={() => setShowForm(false)} className="px-6 py-3 rounded-xl text-sm font-medium" style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--muted-foreground)" }}>Cancel</button>
                </div>
              </div>
            ) : selectedBrief ? (
              <div className="max-w-xl">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-white font-bold text-xl">{selectedBrief.title}</h2>
                    <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>{selectedBrief.model} · {selectedBrief.niche} · {selectedBrief.style}</p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold" style={{ backgroundColor: "rgba(120,194,87,0.1)", color: "#78c257", border: "1px solid rgba(120,194,87,0.2)" }}>
                    <Send size={13} /> Send to Model
                  </button>
                </div>
                <div className="mb-6 p-4 rounded-xl" style={{ backgroundColor: "var(--card)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>{selectedBrief.context}</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted-foreground)" }}>Tags</span>
                    <button onClick={() => setEditingTags(editingTags === selectedBrief.id ? null : selectedBrief.id)} className="text-xs font-medium" style={{ color: "#ff0069" }}>
                      {editingTags === selectedBrief.id ? "Done" : "Edit Tags"}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedBrief.tags.map(t => (
                      <span key={t} className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium" style={{ backgroundColor: "rgba(255,0,105,0.08)", color: "#ff0069", border: "1px solid rgba(255,0,105,0.15)" }}>
                        {t}
                        {editingTags === selectedBrief.id && <button onClick={() => removeTag(t, selectedBrief.id)}><X size={10} /></button>}
                      </span>
                    ))}
                    {editingTags === selectedBrief.id && (
                      <div className="flex items-center gap-1 px-3 py-1.5 rounded-full" style={{ border: "1px dashed rgba(255,255,255,0.2)" }}>
                        <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") { addTag(tagInput, selectedBrief.id); setTagInput(""); }}} placeholder="+" className="bg-transparent text-xs outline-none w-12 placeholder:text-muted-foreground" style={{ color: "white" }} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Wand2 size={40} style={{ color: "var(--muted-foreground)" }} className="mb-3 opacity-40" />
                <p className="text-white font-semibold">Select a brief or create a new one</p>
                <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Your content ideas pipeline</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
