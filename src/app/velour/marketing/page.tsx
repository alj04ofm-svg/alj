"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Megaphone, Zap, Globe, TrendingUp, CheckCircle, ChevronRight,
  ArrowLeft, Star, DollarSign, Upload, Send, Video,
  MessageCircle, AlertCircle, Briefcase, Palette
} from "lucide-react";

const STEPS = [
  { num: 1, label: "Your Details" },
  { num: 2, label: "Portfolio" },
  { num: 3, label: "Skills Profile" },
  { num: 4, label: "Tools & Access" },
  { num: 5, label: "Review & Apply" },
];

const SKILLS = [
  { id: "video-editing", label: "Video Editing", icon: Video, desc: "Premiere, Final Cut, CapCut" },
  { id: "content-creation", label: "Content Creation", icon: Palette, desc: "Writing, captions, storytelling" },
  { id: "social-strategy", label: "Social Strategy", icon: TrendingUp, desc: "Scheduling, analytics, growth" },
  { id: "graphic-design", label: "Graphic Design", icon: Briefcase, desc: "Canva, Photoshop, thumbnails" },
  { id: "copywriting", label: "Copywriting", icon: MessageCircle, desc: "Captions, bios, ad copy" },
  { id: "analytics", label: "Analytics", icon: Globe, desc: "Reading data, reporting" },
];

const CONTENT_TYPES = ["Reels", "PPV / Drip", "Custom Content", "Stories", "Social Posts", "Email"];

const FAQS = [
  { q: "Do I need professional equipment?", a: "No. We provide AI-powered tools that handle the heavy lifting. A decent laptop and creative eye are all you need." },
  { q: "Do I need experience in adult content?", a: "Not at all. We train you on our specific style, voice, and platform requirements. Industry experience is a bonus, not a requirement." },
  { q: "How much can I earn?", a: "Rates from $800 to $4,000/month depending on output and tier. Top performers earn significantly more with bonuses." },
  { q: "How does the portfolio work?", a: "Upload any 3–5 examples of your best work. This can include content from other industries — we care more about creativity and quality than niche experience." },
  { q: "When do I get paid?", a: "Bi-weekly. We use Stripe or bank transfer. First payment after your first two weeks of work." },
];

export default function MarketingApplicationPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", portfolio: "", experience: "", why: "",
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const updateForm = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const toggleSkill = (id: string) => setSelectedSkills(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]);
  const toggleType = (t: string) => setSelectedTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  if (submitted) {
    return (
      <div className="min-h-full bg-[#0a0a0f] text-[#e8e8f0]" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 24px" }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
          style={{ textAlign: "center", maxWidth: 520 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(74,222,128,0.12)", border: "2px solid var(--nva-green)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <CheckCircle size={36} style={{ color: "var(--nva-green)" }} />
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 900, color: "#fff", marginBottom: 12 }}>Application Received!</h2>
          <p style={{ fontSize: 16, color: "rgba(232,232,240,0.6)", lineHeight: 1.65, marginBottom: 32 }}>
            Thanks, {form.firstName}. We review every application personally. You&apos;ll hear from us within 48 hours on email.
          </p>
          <Link href="/velour" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 12, border: "1px solid rgba(212,168,83,0.3)", color: "#d4a853", fontSize: 14, fontWeight: 600 }}>
            <ArrowLeft size={14} /> Back to Velour
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#0a0a0f] text-[#e8e8f0]">
      {/* Nav */}
      <nav style={{ borderBottom: "1px solid rgba(212,168,83,0.15)", background: "rgba(10,10,15,0.9)", backdropFilter: "blur(20px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/velour" style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(212,168,83,0.7)", fontSize: 13, fontWeight: 600 }}>
            <ArrowLeft size={14} /> Velour
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: "linear-gradient(135deg, #d4a853, #a07830)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontWeight: 900, fontSize: 10, color: "#0a0a0f" }}>NV</span>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#d4a853", letterSpacing: "0.05em" }}>MARKETING APPLICATION</span>
          </div>
          <div style={{ width: 80 }} />
        </div>
      </nav>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, border: "1px solid rgba(212,168,83,0.3)", background: "rgba(212,168,83,0.06)", marginBottom: 20 }}>
            <Megaphone size={12} style={{ color: "#d4a853" }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: "#d4a853", letterSpacing: "0.05em" }}>MARKETING ROLES — NOW OPEN</span>
          </div>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", marginBottom: 12 }}>
            Apply to become<br />
            <span style={{ background: "linear-gradient(135deg, #d4a853, #f0c97a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>a Velour Marketer</span>
          </h1>
          <p style={{ fontSize: 16, color: "rgba(232,232,240,0.6)", lineHeight: 1.65, marginBottom: 40 }}>
            Earn $800–$4,000/month. Create content for our top creator network using cutting-edge AI tools. Creative freedom, real portfolio-building, and genuine growth.
          </p>
        </motion.div>

        {/* Step Progress */}
        <div style={{ display: "flex", gap: 0, marginBottom: 40, position: "relative" }}>
          <div style={{ position: "absolute", top: 16, left: 24, right: 24, height: 1, background: "rgba(212,168,83,0.15)" }} />
          <div style={{ position: "absolute", top: 16, left: 24, height: 1, background: "linear-gradient(90deg, #d4a853, #a07830)", width: `${((step - 1) / 4) * 100}%`, transition: "width 0.3s" }} />
          {STEPS.map(s => (
            <div key={s.num} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, position: "relative", zIndex: 1 }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 800,
                background: step > s.num ? "var(--nva-green)" : step === s.num ? "#d4a853" : "rgba(212,168,83,0.08)",
                color: step >= s.num ? "#0a0a0f" : "var(--nva-muted)",
                border: step >= s.num ? "none" : "1px solid rgba(212,168,83,0.2)",
                transition: "all 0.3s",
              }}>
                {step > s.num ? <CheckCircle size={14} /> : s.num}
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, color: step === s.num ? "#d4a853" : "var(--nva-muted)", textAlign: "center" }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            <div style={{ borderRadius: 20, border: "1px solid rgba(212,168,83,0.15)", background: "rgba(10,10,15,0.8)", padding: "32px", marginBottom: 24 }}>

              {step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Your Details</h3>
                  <p style={{ fontSize: 13, color: "var(--nva-muted)", marginBottom: 8 }}>Tell us a bit about yourself. No adult-industry experience required.</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <Field label="First Name" placeholder="Alex" value={form.firstName} onChange={v => updateForm("firstName", v)} />
                    <Field label="Last Name" placeholder="Rivera" value={form.lastName} onChange={v => updateForm("lastName", v)} />
                  </div>
                  <Field label="Email Address" placeholder="alex@example.com" value={form.email} onChange={v => updateForm("email", v)} type="email" />
                  <Field label="Portfolio / Website" placeholder="https://yourportfolio.com" value={form.portfolio} onChange={v => updateForm("portfolio", v)} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "var(--nva-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Experience Level</div>
                    <div style={{ display: "flex", gap: 8 }}>
                      {["Beginner", "Intermediate", "Professional"].map(l => (
                        <button key={l}
                          onClick={() => updateForm("experience", l)}
                          style={{ padding: "8px 16px", borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "1px solid rgba(212,168,83,0.2)", background: form.experience === l ? "rgba(212,168,83,0.12)" : "transparent", color: form.experience === l ? "#d4a853" : "var(--nva-muted)" }}>
                          {l}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Portfolio Upload</h3>
                  <p style={{ fontSize: 13, color: "var(--nva-muted)" }}>Upload 3–5 examples of your best content work. Any industry is fine — we care about creativity and quality.</p>
                  <div style={{ padding: "40px", borderRadius: 16, border: "2px dashed rgba(212,168,83,0.25)", background: "rgba(212,168,83,0.03)", textAlign: "center", cursor: "pointer" }}>
                    <Upload size={28} style={{ color: "rgba(212,168,83,0.5)", margin: "0 auto 12px", display: "block" }} />
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 6 }}>Drop files here or click to upload</p>
                    <p style={{ fontSize: 12, color: "var(--nva-muted)" }}>PDF, MP4, PNG, JPG — up to 50MB each</p>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["Portfolio URL", "Google Drive Link", "Behance / Dribbble"].map(tag => (
                      <span key={tag} style={{ padding: "4px 12px", borderRadius: 8, border: "1px solid rgba(212,168,83,0.2)", fontSize: 11, color: "#d4a853)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Skills Profile</h3>
                  <p style={{ fontSize: 13, color: "var(--nva-muted)" }}>Select all skills you bring to the table. More skills = higher tier.</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {SKILLS.map(skill => {
                      const Icon = skill.icon;
                      const active = selectedSkills.includes(skill.id);
                      return (
                        <button key={skill.id} onClick={() => toggleSkill(skill.id)}
                          style={{ padding: "14px 16px", borderRadius: 12, cursor: "pointer", textAlign: "left", transition: "all 0.15s",
                            background: active ? "rgba(212,168,83,0.1)" : "var(--nva-surface)",
                            border: `1px solid ${active ? "rgba(212,168,83,0.4)" : "rgba(212,168,83,0.12)"}`,
                          }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                            <Icon size={15} style={{ color: active ? "#d4a853" : "var(--nva-muted)" }} />
                            <span style={{ fontSize: 13, fontWeight: 700, color: active ? "#d4a853" : "#fff" }}>{skill.label}</span>
                          </div>
                          <div style={{ fontSize: 11, color: "var(--nva-muted)" }}>{skill.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "var(--nva-muted)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Content Types You Can Create</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {CONTENT_TYPES.map(t => {
                        const active = selectedTypes.includes(t);
                        return (
                          <button key={t} onClick={() => toggleType(t)}
                            style={{ padding: "6px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all 0.15s",
                              background: active ? "rgba(212,168,83,0.12)" : "transparent",
                              border: `1px solid ${active ? "rgba(212,168,83,0.4)" : "rgba(212,168,83,0.15)"}`,
                              color: active ? "#d4a853" : "var(--nva-muted)",
                            }}>
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Tools & Access</h3>
                  <p style={{ fontSize: 13, color: "var(--nva-muted)" }}>After approval, we&apos;ll invite you to our creator accounts and AI tools. This can take 24–48 hours.</p>
                  {[
                    { tool: "Content Pipeline", desc: "Our proprietary upload → AI enhance → Google Drive → Airtable system", status: "Invite after approval" },
                    { tool: "AI Writing Tools", desc: "Gemini-powered scripts and caption generation", status: "Invite after approval" },
                    { tool: "Creator Accounts", desc: "Access to managed Instagram, Twitter, OFTV accounts", status: "Invite after approval" },
                    { tool: "Analytics Dashboard", desc: "Full social media stats and performance reporting", status: "Invite after approval" },
                  ].map(item => (
                    <div key={item.tool} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderRadius: 12, background: "var(--nva-surface)", border: "1px solid rgba(212,168,83,0.1)" }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{item.tool}</div>
                        <div style={{ fontSize: 11, color: "var(--nva-muted)" }}>{item.desc}</div>
                      </div>
                      <span style={{ padding: "4px 10px", borderRadius: 8, fontSize: 10, fontWeight: 700, background: "rgba(212,168,83,0.08)", color: "#d4a853)", border: "1px solid rgba(212,168,83,0.15)", flexShrink: 0, marginLeft: 12 }}>
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {step === 5 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Review & Submit</h3>
                  <div style={{ padding: "16px", borderRadius: 12, background: "rgba(212,168,83,0.04)", border: "1px solid rgba(212,168,83,0.15)" }}>
                    {[
                      ["Name", `${form.firstName} ${form.lastName}`],
                      ["Email", form.email],
                      ["Portfolio", form.portfolio || "Not provided"],
                      ["Experience", form.experience || "Not selected"],
                      ["Skills", selectedSkills.length > 0 ? selectedSkills.join(", ") : "None selected"],
                      ["Content Types", selectedTypes.length > 0 ? selectedTypes.join(", ") : "None selected"],
                    ].map(([label, value]) => (
                      <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(212,168,83,0.08)" }}>
                        <span style={{ fontSize: 12, color: "var(--nva-muted)" }}>{label}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "#e8e8f0" }}>{value || "—"}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px", borderRadius: 10, background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.15)" }}>
                    <AlertCircle size={14} style={{ color: "var(--nva-amber)", flexShrink: 0, marginTop: 2 }} />
                    <p style={{ fontSize: 12, color: "var(--nva-muted)", lineHeight: 1.6 }}>By submitting, you confirm all information is accurate and you are at least 18 years old. We review all applications within 48 hours.</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <button onClick={() => setStep(s => s - 1)} disabled={step === 1}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 10, border: "1px solid rgba(212,168,83,0.2)", background: "transparent", color: step === 1 ? "rgba(212,168,83,0.3)" : "#d4a853", fontSize: 13, fontWeight: 600, cursor: step === 1 ? "default" : "pointer" }}>
            <ArrowLeft size={13} /> Back
          </button>
          {step < 5 ? (
            <button onClick={() => setStep(s => s + 1)}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 24px", borderRadius: 10, background: "linear-gradient(135deg, #d4a853, #a07830)", border: "none", color: "#0a0a0f", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
              Continue <ChevronRight size={13} />
            </button>
          ) : (
            <button onClick={() => setSubmitted(true)}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 28px", borderRadius: 10, background: "linear-gradient(135deg, #d4a853, #a07830)", border: "none", color: "#0a0a0f", fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 20px rgba(212,168,83,0.3)" }}>
              <Send size={13} /> Submit Application
            </button>
          )}
        </div>

        {/* FAQ */}
        <div style={{ marginTop: 64 }}>
          <h3 style={{ fontSize: 20, fontWeight: 800, color: "#fff", marginBottom: 20, textAlign: "center" }}>Frequently Asked Questions</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ borderRadius: 12, border: "1px solid rgba(212,168,83,0.1)", overflow: "hidden" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", background: "var(--nva-surface)", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#e8e8f0" }}>{faq.q}</span>
                  <ChevronRight size={14} style={{ color: "#d4a853", transform: openFaq === i ? "rotate(90deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <div style={{ padding: "12px 18px 14px", fontSize: 13, color: "var(--nva-muted)", lineHeight: 1.65, background: "rgba(212,168,83,0.02)" }}>{faq.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, placeholder, value, onChange, type = "text" }: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, color: "var(--nva-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: "100%", background: "var(--nva-surface)", border: "1px solid rgba(212,168,83,0.15)", borderRadius: 10, padding: "10px 12px", fontSize: 13, color: "#e8e8f0", outline: "none", fontFamily: "inherit" }} />
    </div>
  );
}
