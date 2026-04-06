"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  MessageSquare, Zap, Clock, TrendingUp, Shield, Users, Globe,
  CheckCircle, ChevronRight, ArrowLeft, Star, DollarSign, Video,
  Send, User, Mail, MessageCircle, AlertCircle
} from "lucide-react";

const STEPS = [
  { num: 1, label: "Your Details" },
  { num: 2, label: "Discord Setup" },
  { num: 3, label: "Training" },
  { num: 4, label: "First Shift" },
  { num: 5, label: "Review & Apply" },
];

const MODULES = [
  { title: "Platform Basics", desc: "Navigate our tools, dashboards, and chat systems.", duration: "45 min", status: "required" },
  { title: "Fan Engagement 101", desc: "Learn how to build rapport, upsell, and retain subscribers.", duration: "60 min", status: "required" },
  { title: "Content Knowledge", desc: "Understand our creator roster so you can sell confidently.", duration: "30 min", status: "required" },
  { title: "Compliance & Safety", desc: "Platform rules, boundaries, and how to protect yourself.", duration: "45 min", status: "required" },
  { title: "Advanced Upselling", desc: "Maximise earnings with proven script techniques.", duration: "45 min", status: "required" },
];

const FAQS = [
  { q: "What equipment do I need?", a: "A laptop or desktop computer, a reliable internet connection, and Discord. No cam or special equipment required." },
  { q: "How many hours do I need to commit?", a: "Flexible — minimum 10 hours per week, maximum is uncapped. You choose your own schedule around your availability." },
  { q: "When do I get paid?", a: "Bi-weekly payouts via bank transfer or PayPal. First payout after your first 2 weeks of active shifts." },
  { q: "Is this job safe and discreet?", a: "Yes. All chats are managed through secure platforms. Your identity is protected and never shared with fans." },
  { q: "Do I need experience?", a: "No. Full training is provided. The right personality and communication skills matter more than experience." },
];

const TIERS = [
  { label: "Starter", range: "$650 – $1,200/mo", perks: ["Up to 20 hrs/week", "Standard creator roster", "Community access"] },
  { label: "Growth", range: "$1,200 – $2,800/mo", perks: ["Up to 35 hrs/week", "Full creator roster", "Priority support", "Bonus incentives"] },
  { label: "Elite", range: "$2,800 – $5,500+/mo", perks: ["Unlimited hours", "Top-tier creators", "1-on-1 coaching", "Performance bonuses"] },
];

export default function ChatterApplicationPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", discord: "", availability: "",
    experience: "", why: "",
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const updateForm = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

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
            Thanks, {form.firstName}. We review every application personally. You&apos;ll hear from us within 48 hours on Discord or email.
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
            <span style={{ fontSize: 12, fontWeight: 700, color: "#d4a853", letterSpacing: "0.05em" }}>CHATTER APPLICATION</span>
          </div>
          <div style={{ width: 80 }} />
        </div>
      </nav>

      <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 24px" }}>
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 100, border: "1px solid rgba(212,168,83,0.3)", background: "rgba(212,168,83,0.06)", marginBottom: 20 }}>
            <MessageSquare size={12} style={{ color: "#d4a853" }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: "#d4a853", letterSpacing: "0.05em" }}>CHATTER ROLES — NOW OPEN</span>
          </div>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", marginBottom: 12 }}>
            Apply to become<br />
            <span style={{ background: "linear-gradient(135deg, #d4a853, #f0c97a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>a Velour Chatter</span>
          </h1>
          <p style={{ fontSize: 16, color: "rgba(232,232,240,0.6)", lineHeight: 1.65, marginBottom: 40 }}>
            Earn $650–$5,500/month. Work from anywhere, set your own hours, and join one of the best-performing chat teams in the industry.
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
                  <p style={{ fontSize: 13, color: "var(--nva-muted)", marginBottom: 8 }}>Tell us a bit about yourself. No experience required.</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <Field label="First Name" placeholder="Jane" value={form.firstName} onChange={v => updateForm("firstName", v)} />
                    <Field label="Last Name" placeholder="Smith" value={form.lastName} onChange={v => updateForm("lastName", v)} />
                  </div>
                  <Field label="Email Address" placeholder="jane@example.com" value={form.email} onChange={v => updateForm("email", v)} type="email" />
                  <Field label="Discord Username" placeholder="jane#1234" value={form.discord} onChange={v => updateForm("discord", v)} prefix={<MessageCircle size={13} />} />
                  <Field label="Availability (hours/week)" placeholder="e.g. 20" value={form.availability} onChange={v => updateForm("availability", v)} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "var(--nva-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Any previous chat or sales experience?</div>
                    <textarea value={form.experience} onChange={e => updateForm("experience", e.target.value)} rows={3}
                      style={{ width: "100%", background: "var(--nva-surface)", border: "1px solid rgba(212,168,83,0.15)", borderRadius: 10, padding: "10px 12px", fontSize: 13, color: "#e8e8f0", resize: "vertical", outline: "none", fontFamily: "inherit" }}
                      placeholder="Optional — tell us about any relevant experience (customer service, sales, social media management, etc.)" />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Discord Setup</h3>
                  <p style={{ fontSize: 13, color: "var(--nva-muted)" }}>Our team operates entirely through Discord. Make sure you have it installed and your username is correct above.</p>
                  <div style={{ padding: 16, borderRadius: 12, background: "rgba(212,168,83,0.04)", border: "1px solid rgba(212,168,83,0.15)" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#d4a853", marginBottom: 8 }}>Discord Server</div>
                    <p style={{ fontSize: 12, color: "var(--nva-muted)", lineHeight: 1.6 }}>Once your application is approved, you&apos;ll receive an invite link to the Velour Chatter workspace on Discord.</p>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    {["Mic", "Camera", "Text Chat"].map(tag => (
                      <span key={tag} style={{ padding: "5px 12px", borderRadius: 8, border: "1px solid rgba(212,168,83,0.2)", fontSize: 12, color: "#d4a853", fontWeight: 600 }}>{tag}</span>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Training Modules</h3>
                  <p style={{ fontSize: 13, color: "var(--nva-muted)" }}>Complete these before your first paid shift. All self-paced, all included.</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {MODULES.map(m => (
                      <div key={m.title} style={{ padding: "14px 16px", borderRadius: 12, background: "var(--nva-surface)", border: "1px solid rgba(212,168,83,0.12)", display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(212,168,83,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <Video size={15} style={{ color: "#d4a853" }} />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{m.title}</div>
                          <div style={{ fontSize: 11, color: "var(--nva-muted)" }}>{m.desc}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          {m.status === "required" && <span style={{ padding: "2px 8px", borderRadius: 6, fontSize: 9, fontWeight: 700, background: "rgba(212,168,83,0.1)", color: "#d4a853)" }}>REQUIRED</span>}
                          <span style={{ fontSize: 11, color: "var(--nva-muted)" }}>{m.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 4 }}>First Shift</h3>
                  <p style={{ fontSize: 13, color: "var(--nva-muted)" }}>After completing your training, you&apos;ll do a paid trial shift to get comfortable with our platform and creators.</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[
                      { icon: Clock, label: "Duration", value: "2–4 hours" },
                      { icon: DollarSign, label: "Paid", value: "Yes — full rate" },
                      { icon: Users, label: "Supervised", value: "Yes — senior lead" },
                      { icon: Zap, label: "Outcome", value: "Permanent role" },
                    ].map(item => {
                      const Icon = item.icon;
                      return (
                        <div key={item.label} style={{ padding: "16px", borderRadius: 12, background: "var(--nva-surface)", border: "1px solid rgba(212,168,83,0.1)" }}>
                          <Icon size={16} style={{ color: "#d4a853", marginBottom: 8 }} />
                          <div style={{ fontSize: 10, color: "var(--nva-muted)", marginBottom: 4 }}>{item.label}</div>
                          <div style={{ fontSize: 14, fontWeight: 800, color: "#fff" }}>{item.value}</div>
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "var(--nva-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Why do you want to join Velour? (Optional)</div>
                    <textarea value={form.why} onChange={e => updateForm("why", e.target.value)} rows={3}
                      style={{ width: "100%", background: "var(--nva-surface)", border: "1px solid rgba(212,168,83,0.15)", borderRadius: 10, padding: "10px 12px", fontSize: 13, color: "#e8e8f0", resize: "vertical", outline: "none", fontFamily: "inherit" }}
                      placeholder="Tell us what draws you to this role..." />
                  </div>
                </div>
              )}

              {step === 5 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 4 }}>Review & Submit</h3>
                  <div style={{ padding: "16px", borderRadius: 12, background: "rgba(212,168,83,0.04)", border: "1px solid rgba(212,168,83,0.15)" }}>
                    {[
                      ["Name", `${form.firstName} ${form.lastName}`],
                      ["Email", form.email],
                      ["Discord", form.discord],
                      ["Availability", form.availability || "Not specified"],
                    ].map(([label, value]) => (
                      <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(212,168,83,0.08)" }}>
                        <span style={{ fontSize: 12, color: "var(--nva-muted)" }}>{label}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: "#e8e8f0" }}>{value || "—"}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: "16px", borderRadius: 12, background: "var(--nva-surface)", border: "1px solid rgba(212,168,83,0.12)" }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 12 }}>Earning Tiers</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {TIERS.map(t => (
                        <div key={t.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div>
                            <span style={{ fontSize: 13, fontWeight: 700, color: "#d4a853)" }}>{t.label}</span>
                            <span style={{ fontSize: 12, color: "var(--nva-muted)", marginLeft: 8 }}>{t.range}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px", borderRadius: 10, background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.15)" }}>
                    <AlertCircle size={14} style={{ color: "var(--nva-amber)", flexShrink: 0, marginTop: 2 }} />
                    <p style={{ fontSize: 12, color: "var(--nva-muted)", lineHeight: 1.6 }}>By submitting, you confirm that the information provided is accurate and that you are at least 18 years old. Applications are reviewed within 48 hours.</p>
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

function Field({ label, placeholder, value, onChange, type = "text", prefix }: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void;
  type?: string; prefix?: React.ReactNode;
}) {
  return (
    <div>
      <div style={{ fontSize: 11, fontWeight: 600, color: "var(--nva-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
      <div style={{ position: "relative" }}>
        {prefix && <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--nva-muted)" }}>{prefix}</div>}</div>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ width: "100%", background: "var(--nva-surface)", border: "1px solid rgba(212,168,83,0.15)", borderRadius: 10, padding: prefix ? "10px 12px 10px 34px" : "10px 12px", fontSize: 13, color: "#e8e8f0", outline: "none", fontFamily: "inherit" }} />
    </div>
  );
}
