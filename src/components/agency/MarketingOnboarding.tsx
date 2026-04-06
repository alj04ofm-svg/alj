"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, ChevronRight, ChevronLeft, Megaphone,
  Camera, Film, BarChart3, Target, TrendingUp, Upload,
  Star, Clock, Palette, FileText, Wifi
} from "lucide-react";

const STEPS = [
  { id: 1, title: "Personal Info", icon: FileText },
  { id: 2, title: "Portfolio", icon: Camera },
  { id: 3, title: "Skills Profile", icon: Target },
  { id: 4, title: "Tools & Access", icon: Wifi },
  { id: 5, title: "Review & Submit", icon: CheckCircle2 },
];

const SKILL_OPTIONS = [
  { label: "Video Editing", icon: Film, desc: "Premiere Pro, CapCut, After Effects" },
  { label: "Content Creation", icon: Camera, desc: "Reels, TikToks, YouTube Shorts" },
  { label: "Analytics & SEO", icon: BarChart3, desc: "Performance tracking, growth strategy" },
  { label: "Copywriting", icon: FileText, desc: "Captions, hooks, CTA copy" },
  { label: "Graphic Design", icon: Palette, desc: "Canva, Photoshop, thumbnails" },
  { label: "Social Strategy", icon: Target, desc: "Niche research, posting strategy" },
];

const TOOLS = [
  { name: "CapCut Pro", desc: "Video editing platform", status: "Invite sent" },
  { name: "Canva Teams", desc: "Design collaboration", status: "Invite sent" },
  { name: "Buffer", desc: "Scheduling & analytics", status: "Invite sent" },
  { name: "Google Drive", desc: "Content storage & sharing", status: "Invite sent" },
];

const CONTENT_TYPES = [
  { label: "Reels / Shorts", selected: false },
  { label: "PPV Content", selected: false },
  { label: "Drip Campaigns", selected: false },
  { label: "Custom Content", selected: false },
  { label: "Social Media Posts", selected: false },
  { label: "Email Campaigns", selected: false },
];

export function MarketingOnboarding() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", portfolio: "", bio: "", tools: false, agree: false });
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [contentTypes, setContentTypes] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const isLast = step === STEPS.length - 1;
  const isFirst = step === 0;

  const toggleSkill = (label: string) => {
    setSelectedSkills(prev => prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]);
  };

  const toggleContent = (label: string) => {
    setContentTypes(prev => prev.includes(label) ? prev.filter(c => c !== label) : [...prev, label]);
  };

  const handleNext = () => {
    if (isLast) { setSubmitted(true); return; }
    setStep(step + 1);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 400, textAlign: "center" }}
      >
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(34,197,94,0.12)", border: "2px solid var(--nva-green)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
          <CheckCircle2 size={36} style={{ color: "var(--nva-green)" }} />
        </div>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: "var(--nva-text)", marginBottom: 10 }}>Application Received!</h2>
        <p style={{ fontSize: 14, color: "var(--nva-muted)", maxWidth: 440, lineHeight: 1.6, marginBottom: 24 }}>
          Welcome to New Valor Agency, <strong style={{ color: "var(--nva-gold)" }}>{form.name || "there"}</strong>! Check your email — tool invites and your first content brief are on the way.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn-nva-secondary" onClick={() => { setStep(0); setSubmitted(false); setForm({ name: "", email: "", portfolio: "", bio: "", tools: false, agree: false }); setSelectedSkills([]); setContentTypes([]); }}>
            Submit Another
          </button>
          <button className="btn-nva-primary" onClick={() => setStep(0)}>Back to Dashboard</button>
        </div>
      </motion.div>
    );
  }

  return (
    <div style={{ maxWidth: 780, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(212,168,83,0.12)", border: "1px solid rgba(212,168,83,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Megaphone size={18} style={{ color: "var(--nva-gold)" }} />
          </div>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--nva-text)" }}>Marketing Team Onboarding</h2>
            <p style={{ fontSize: 12, color: "var(--nva-muted)" }}>Join the New Valor Agency creative & marketing team</p>
          </div>
        </div>

        {/* Step Progress */}
        <div style={{ display: "flex", alignItems: "center", gap: 0, marginTop: 20 }}>
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            const done = i < step;
            const active = i === step;
            return (
              <div key={s.id} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : 0 }}>
                <button
                  onClick={() => i <= step ? setStep(i) : undefined}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: i <= step ? "pointer" : "default", background: "none", border: "none" }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: done ? "var(--nva-green)" : active ? "var(--nva-gold)" : "var(--nva-surface-2)",
                    border: done ? "2px solid var(--nva-green)" : active ? "2px solid var(--nva-gold)" : "2px solid var(--nva-border)",
                    display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s",
                    boxShadow: active ? "0 0 12px rgba(212,168,83,0.3)" : "none",
                  }}>
                    {done ? <CheckCircle2 size={15} style={{ color: "#0a0a0f" }} /> : <Icon size={14} style={{ color: active ? "#0a0a0f" : "var(--nva-muted)" }} />}
                  </div>
                  <span style={{ fontSize: 10, fontWeight: active ? 700 : 400, color: active ? "var(--nva-gold)" : done ? "var(--nva-green)" : "var(--nva-muted)", whiteSpace: "nowrap" }}>
                    {s.title}
                  </span>
                </button>
                {i < STEPS.length - 1 && <div className="step-connector" style={{ margin: "0 4px", marginBottom: 18 }} />}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="card-nva"
          style={{ padding: "28px", marginBottom: 20 }}
        >
          {/* Step 0: Personal Info */}
          {step === 0 && (
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--nva-text)", marginBottom: 4 }}>About You</h3>
              <p style={{ fontSize: 12, color: "var(--nva-muted)", marginBottom: 20 }}>Tell us about yourself and your background.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--nva-muted)", display: "block", marginBottom: 6 }}>Full Name</label>
                  <input className="input-nva" placeholder="e.g. Jamie Rivera" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--nva-muted)", display: "block", marginBottom: 6 }}>Email Address</label>
                  <input className="input-nva" type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--nva-muted)", display: "block", marginBottom: 6 }}>Portfolio / Showreel URL</label>
                  <input className="input-nva" placeholder="https://youtube.com/... or Canva link" value={form.portfolio} onChange={e => setForm({ ...form, portfolio: e.target.value })} />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--nva-muted)", display: "block", marginBottom: 6 }}>Bio / Experience Summary</label>
                  <textarea className="input-nva" rows={3} placeholder="Tell us about your experience with content creation, social media marketing..." value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} style={{ resize: "vertical", minHeight: 80 }} />
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Portfolio */}
          {step === 1 && (
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--nva-text)", marginBottom: 4 }}>Show Us Your Work</h3>
              <p style={{ fontSize: 12, color: "var(--nva-muted)", marginBottom: 20 }}>Upload 3–5 examples of your best content work. Reels, edits, campaigns — show us what you've got.</p>
              <div
                style={{
                  border: "2px dashed var(--nva-border)", borderRadius: 14,
                  padding: "40px 20px", textAlign: "center",
                  background: "rgba(212,168,83,0.02)",
                  cursor: "pointer", transition: "all 0.2s",
                  marginBottom: 16,
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(212,168,83,0.35)"; e.currentTarget.style.background = "rgba(212,168,83,0.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--nva-border)"; e.currentTarget.style.background = "rgba(212,168,83,0.02)"; }}
              >
                <Upload size={28} style={{ color: "var(--nva-gold)", margin: "0 auto 12px", display: "block" }} />
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--nva-text)", marginBottom: 6 }}>Drop files here or click to upload</div>
                <div style={{ fontSize: 12, color: "var(--nva-muted)" }}>MP4, MOV, JPG, PNG — up to 500MB each</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                {[
                  { name: "Summer_reel_v2.mp4", type: "Video", size: "48 MB", done: true },
                  { name: "PPV_campaign_final.png", type: "Image", size: "2.1 MB", done: true },
                ].map((file, i) => (
                  <div key={i} style={{ padding: "10px 12px", borderRadius: 8, background: "var(--nva-surface-2)", border: "1px solid var(--nva-border)", display: "flex", gap: 8, alignItems: "center" }}>
                    <CheckCircle2 size={13} style={{ color: "var(--nva-green)", flexShrink: 0 }} />
                    <div style={{ overflow: "hidden" }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: "var(--nva-text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</div>
                      <div style={{ fontSize: 10, color: "var(--nva-muted)" }}>{file.size}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Skills Profile */}
          {step === 2 && (
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--nva-text)", marginBottom: 4 }}>Skills & Expertise</h3>
              <p style={{ fontSize: 12, color: "var(--nva-muted)", marginBottom: 20 }}>Select the areas where you have the strongest skills. Choose at least 2.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
                {SKILL_OPTIONS.map((skill) => {
                  const Icon = skill.icon;
                  const selected = selectedSkills.includes(skill.label);
                  return (
                    <button
                      key={skill.label}
                      onClick={() => toggleSkill(skill.label)}
                      style={{
                        padding: "14px", borderRadius: 12, cursor: "pointer",
                        background: selected ? "rgba(212,168,83,0.1)" : "var(--nva-surface-2)",
                        border: selected ? "1px solid rgba(212,168,83,0.35)" : "1px solid var(--nva-border)",
                        display: "flex", gap: 12, alignItems: "center",
                        transition: "all 0.15s", textAlign: "left",
                      }}
                      onMouseEnter={(e) => { if (!selected) { e.currentTarget.style.borderColor = "var(--nva-border-hover)"; } }}
                      onMouseLeave={(e) => { if (!selected) { e.currentTarget.style.borderColor = "var(--nva-border)"; } }}
                    >
                      <div style={{ width: 34, height: 34, borderRadius: 9, background: selected ? "rgba(212,168,83,0.2)" : "var(--nva-surface)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Icon size={15} style={{ color: selected ? "var(--nva-gold)" : "var(--nva-muted)" }} />
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: selected ? "var(--nva-gold)" : "var(--nva-text)" }}>{skill.label}</div>
                        <div style={{ fontSize: 11, color: "var(--nva-muted)" }}>{skill.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <h4 style={{ fontSize: 13, fontWeight: 700, color: "var(--nva-text)", marginBottom: 12 }}>Content Types You Can Handle</h4>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {CONTENT_TYPES.map((ct) => {
                  const selected = contentTypes.includes(ct.label);
                  return (
                    <button
                      key={ct.label}
                      onClick={() => toggleContent(ct.label)}
                      style={{
                        padding: "7px 14px", borderRadius: 20, cursor: "pointer",
                        background: selected ? "rgba(212,168,83,0.12)" : "var(--nva-surface-2)",
                        border: selected ? "1px solid rgba(212,168,83,0.3)" : "1px solid var(--nva-border)",
                        color: selected ? "var(--nva-gold)" : "var(--nva-muted)",
                        fontSize: 12, fontWeight: selected ? 600 : 400,
                        transition: "all 0.15s",
                      }}
                    >
                      {selected && <CheckCircle2 size={11} style={{ marginRight: 4, display: "inline" }} />}
                      {ct.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Tools & Access */}
          {step === 3 && (
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--nva-text)", marginBottom: 4 }}>Tools & Platform Access</h3>
              <p style={{ fontSize: 12, color: "var(--nva-muted)", marginBottom: 20 }}>We've sent invites to the tools you'll need. Confirm you've received them and can access each one.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {TOOLS.map((tool, i) => (
                  <div key={i} style={{ padding: "14px 16px", borderRadius: 12, background: "var(--nva-surface-2)", border: "1px solid var(--nva-border)", display: "flex", gap: 12, alignItems: "center" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 9, background: "rgba(212,168,83,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <CheckCircle2 size={15} style={{ color: "var(--nva-gold)" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--nva-text)" }}>{tool.name}</div>
                      <div style={{ fontSize: 11, color: "var(--nva-muted)" }}>{tool.desc}</div>
                    </div>
                    <span className="badge-nva badge-pending" style={{ fontSize: 11 }}>{tool.status}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, padding: "14px 16px", borderRadius: 10, background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.15)", display: "flex", gap: 12, alignItems: "center" }}>
                <Wifi size={15} style={{ color: "var(--nva-blue)", flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: "var(--nva-muted)" }}>You will also receive access to the NVA Content Hub on Google Drive where all briefs and final content live.</span>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--nva-text)", marginBottom: 4 }}>Review & Submit</h3>
              <p style={{ fontSize: 12, color: "var(--nva-muted)", marginBottom: 20 }}>Everything looks good? Submit your application to go live.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { label: "Name", value: form.name || "—" },
                  { label: "Email", value: form.email || "—" },
                  { label: "Portfolio", value: form.portfolio || "—" },
                  { label: "Skills", value: selectedSkills.join(", ") || "—" },
                  { label: "Content Types", value: contentTypes.join(", ") || "—" },
                ].map((row) => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--nva-border)" }}>
                    <span style={{ fontSize: 12, color: "var(--nva-muted)" }}>{row.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--nva-text)", maxWidth: "60%", textAlign: "right" }}>{row.value}</span>
                  </div>
                ))}
              </div>
              <div
                onClick={() => setForm({ ...form, agree: !form.agree })}
                style={{
                  marginTop: 20, padding: "14px 16px", borderRadius: 10,
                  background: form.agree ? "rgba(212,168,83,0.08)" : "var(--nva-surface-2)",
                  border: form.agree ? "1px solid rgba(212,168,83,0.25)" : "1px solid var(--nva-border)",
                  cursor: "pointer", display: "flex", gap: 12, alignItems: "flex-start",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ width: 18, height: 18, borderRadius: 4, background: form.agree ? "var(--nva-gold)" : "transparent", border: form.agree ? "none" : "1px solid var(--nva-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, transition: "all 0.2s" }}>
                  {form.agree && <CheckCircle2 size={11} style={{ color: "#0a0a0f" }} />}
                </div>
                <span style={{ fontSize: 12, color: "var(--nva-muted)", lineHeight: 1.6 }}>
                  I agree to the New Valor Agency <strong style={{ color: "var(--nva-gold)" }}>Terms of Service</strong> and <strong style={{ color: "var(--nva-gold)" }}>NDA</strong>, and confirm that all portfolio work is my own.
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button className="btn-nva-secondary" onClick={() => setStep(Math.max(0, step - 1))} disabled={isFirst} style={{ opacity: isFirst ? 0.4 : 1 }}>
          <ChevronLeft size={15} /> Back
        </button>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 11, color: "var(--nva-muted)" }}>Step {step + 1} of {STEPS.length}</span>
          <button className="btn-nva-primary" onClick={handleNext}>
            {isLast ? "Submit Application" : "Continue"} <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
