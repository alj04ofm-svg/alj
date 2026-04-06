"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, Circle, ChevronRight, ChevronLeft, Upload,
  MessageSquare, Clock, DollarSign, Shield, Star, Users,
  AlertCircle, FileText, Wifi
} from "lucide-react";

const STEPS = [
  { id: 1, title: "Personal Info", icon: FileText },
  { id: 2, title: "Discord Setup", icon: Wifi },
  { id: 3, title: "Training", icon: Star },
  { id: 4, title: "First Shift", icon: Clock },
  { id: 5, title: "Go Live", icon: CheckCircle2 },
];

const CRITERIA = [
  "You have a reliable laptop and stable internet connection",
  "You can commit to a minimum of 4 hours per day",
  "You have excellent written English communication skills",
  "You are based in the Balkans, Philippines, or Europe",
  "You are 18+ and can work in a professional environment",
];

const REQUIREMENTS = [
  { label: "Device", desc: "Laptop or desktop (no mobile-only)", met: true },
  { label: "Internet", desc: "10+ Mbps upload speed", met: true },
  { label: "English", desc: "Fluent written communication", met: true },
  { label: "Availability", desc: "Minimum 4 hours/day, 6 days/week", met: false },
  { label: "Age", desc: "Must be 18 years or older", met: true },
  { label: "Location", desc: "Balkans, Philippines, or Europe", met: null },
];

const PACKAGES = [
  { name: "Starter", payout: "$650 – $1,200/mo", desc: "Up to 20 concurrent chats", features: ["Basic training", "Standard support", "Weekly payouts"], color: "#8a8070" },
  { name: "Pro Chatter", payout: "$1,200 – $2,800/mo", desc: "Up to 50 concurrent chats", features: ["Advanced training", "Priority support", "Weekly payouts", "Performance bonuses"], color: "#d4a853", popular: true },
  { name: "Elite", payout: "$2,800 – $5,500+/mo", desc: "Unlimited concurrent chats", features: ["VIP training", "Dedicated manager", "Daily payouts", "Revenue share"], color: "#f0c97a" },
];

const FAQ = [
  { q: "What does a chatter actually do?", a: "You chat with fans on behalf of our top models. It's text-based conversation — flirty, engaging, and professional. We provide the scripts and training." },
  { q: "Do I need experience?", a: "No prior experience needed. We provide full training, scripts, and ongoing support. Most chatters are fully comfortable within their first week." },
  { q: "How and when do I get paid?", a: "Pay is based on performance metrics (response rate, conversation quality, fan satisfaction). Payouts are weekly via Wise, PayPal, or bank transfer." },
  { q: "What if I can't work every day?", a: "Consistency is important to us. We ask for a minimum commitment of 4 hours per day, 6 days per week. Occasional time off can be arranged with notice." },
  { q: "Is this work confidential?", a: "Yes. All chatters sign an NDA. The models' identities and all fan interactions are strictly confidential." },
];

export function ChatterOnboarding() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", discord: "", location: "", experience: "", agree: false });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [trainingComplete, setTrainingComplete] = useState(false);

  const isLast = step === STEPS.length - 1;
  const isFirst = step === 0;

  const handleNext = () => {
    if (isLast) { setSubmitted(true); return; }
    setStep(step + 1);
  };
  const handleBack = () => { if (!isFirst) setStep(step - 1); };

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
        <p style={{ fontSize: 14, color: "var(--nva-muted)", maxWidth: 420, lineHeight: 1.6, marginBottom: 24 }}>
          Thanks for applying to New Valor Agency, <strong style={{ color: "var(--nva-gold)" }}>{form.name || "there"}</strong>! Our team will review your application and reach out via Discord within <strong>24–48 hours</strong>.
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn-nva-secondary" onClick={() => { setStep(0); setSubmitted(false); setForm({ name: "", email: "", discord: "", location: "", experience: "", agree: false }); }}>
            Submit Another
          </button>
          <button className="btn-nva-primary" onClick={() => { setStep(0); setSubmitted(false); }}>
            Back to Dashboard
          </button>
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
            <MessageSquare size={18} style={{ color: "var(--nva-gold)" }} />
          </div>
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--nva-text)" }}>Chatter Onboarding</h2>
            <p style={{ fontSize: 12, color: "var(--nva-muted)" }}>Join the New Valor Agency chattering team</p>
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
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                    cursor: i <= step ? "pointer" : "default", background: "none", border: "none",
                  }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: "50%",
                    background: done ? "var(--nva-green)" : active ? "var(--nva-gold)" : "var(--nva-surface-2)",
                    border: done ? "2px solid var(--nva-green)" : active ? "2px solid var(--nva-gold)" : "2px solid var(--nva-border)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.2s",
                    boxShadow: active ? "0 0 12px rgba(212,168,83,0.3)" : "none",
                  }}>
                    {done ? <CheckCircle2 size={15} style={{ color: "#0a0a0f" }} /> : <Icon size={14} style={{ color: active ? "#0a0a0f" : "var(--nva-muted)" }} />}
                  </div>
                  <span style={{ fontSize: 10, fontWeight: active ? 700 : 400, color: active ? "var(--nva-gold)" : done ? "var(--nva-green)" : "var(--nva-muted)", whiteSpace: "nowrap" }}>
                    {s.title}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <div className="step-connector" style={{ margin: "0 4px", marginBottom: 18 }} />
                )}
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
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--nva-text)", marginBottom: 4 }}>Personal Information</h3>
              <p style={{ fontSize: 12, color: "var(--nva-muted)", marginBottom: 20 }}>Tell us a bit about yourself to get started.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--nva-muted)", display: "block", marginBottom: 6 }}>Full Name</label>
                  <input className="input-nva" placeholder="e.g. Alex Johnson" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--nva-muted)", display: "block", marginBottom: 6 }}>Email Address</label>
                  <input className="input-nva" type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--nva-muted)", display: "block", marginBottom: 6 }}>Discord Username</label>
                  <input className="input-nva" placeholder="yourname#0000" value={form.discord} onChange={e => setForm({ ...form, discord: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--nva-muted)", display: "block", marginBottom: 6 }}>Location</label>
                  <select className="input-nva" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}>
                    <option value="">Select region...</option>
                    <option>Balkans (Serbia, Croatia, Bosnia, etc.)</option>
                    <option>Philippines</option>
                    <option>Europe (other)</option>
                    <option>Other</option>
                  </select>
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--nva-muted)", display: "block", marginBottom: 6 }}>Any relevant experience?</label>
                  <textarea className="input-nva" rows={3} placeholder="e.g. I've done customer service chat support for 2 years..." value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} style={{ resize: "vertical", minHeight: 80 }} />
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Discord Setup */}
          {step === 1 && (
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--nva-text)", marginBottom: 4 }}>Join Our Discord</h3>
              <p style={{ fontSize: 12, color: "var(--nva-muted)", marginBottom: 20 }}>All communication and shift coordination happens through our private Discord server.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ padding: "16px 18px", borderRadius: 12, background: "rgba(88,101,242,0.08)", border: "1px solid rgba(88,101,242,0.2)", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(88,101,242,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Wifi size={18} style={{ color: "#5865F2" }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--nva-text)", marginBottom: 4 }}>Join the NVA Chatter Hub</div>
                    <div style={{ fontSize: 12, color: "var(--nva-muted)", marginBottom: 10 }}>Your Discord username: <strong style={{ color: "var(--nva-gold)" }}>{form.discord || "Not provided yet"}</strong></div>
                    <button className="btn-nva-primary" style={{ fontSize: 12, padding: "8px 16px" }}>
                      Open Discord Invite Link
                    </button>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {["✅ Read the #rules and #info channels", "✅ Set your Discord status to 'Available'", "✅ Change your nickname to your real name", "✅ React to the onboarding message in #welcome"].map((step, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, background: "var(--nva-surface-2)" }}>
                      <CheckCircle2 size={14} style={{ color: "var(--nva-green)", flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: "var(--nva-text)" }}>{step.replace("✅ ", "")}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Training */}
          {step === 2 && (
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--nva-text)", marginBottom: 4 }}>Complete Your Training</h3>
              <p style={{ fontSize: 12, color: "var(--nva-muted)", marginBottom: 20 }}>Watch the training modules and complete the quiz to get certified.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { n: "Module 1", title: "Introduction to New Valor Agency", dur: "5 min", done: true },
                  { n: "Module 2", title: "Our Models & Brand Voice", dur: "12 min", done: true },
                  { n: "Module 3", title: "Chatting Scripts & Conversation Flow", dur: "18 min", done: false },
                  { n: "Module 4", title: "Platform Tools & Dashboard", dur: "10 min", done: false },
                  { n: "Module 5", title: "Performance Metrics & Expectations", dur: "8 min", done: false },
                ].map((mod, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "14px 16px",
                      borderRadius: 10,
                      background: "var(--nva-surface-2)",
                      border: mod.done ? "1px solid rgba(34,197,94,0.2)" : "1px solid var(--nva-border)",
                      display: "flex", alignItems: "center", gap: 12,
                      borderLeft: mod.done ? "3px solid var(--nva-green)" : "3px solid var(--nva-border)",
                    }}
                  >
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: mod.done ? "rgba(34,197,94,0.12)" : "var(--nva-surface)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {mod.done ? <CheckCircle2 size={15} style={{ color: "var(--nva-green)" }} /> : <span style={{ fontSize: 12, fontWeight: 700, color: "var(--nva-muted)" }}>{mod.n.replace("Module ", "")}</span>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: mod.done ? "var(--nva-muted)" : "var(--nva-text)", textDecoration: mod.done ? "none" : "none" }}>{mod.title}</div>
                      <div style={{ fontSize: 11, color: "var(--nva-muted)" }}>{mod.dur}</div>
                    </div>
                    {!mod.done && <button className="btn-nva-secondary" style={{ fontSize: 11, padding: "6px 12px" }}>Watch</button>}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, padding: "14px 16px", borderRadius: 10, background: "rgba(212,168,83,0.06)", border: "1px solid rgba(212,168,83,0.15)", display: "flex", gap: 12, alignItems: "center" }}>
                <Shield size={16} style={{ color: "var(--nva-gold)", flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: "var(--nva-muted)" }}>Complete all 5 modules and pass the quiz (80%+) to unlock your first shift assignment.</span>
              </div>
            </div>
          )}

          {/* Step 3: First Shift */}
          {step === 3 && (
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--nva-text)", marginBottom: 4 }}>Schedule Your First Shift</h3>
              <p style={{ fontSize: 12, color: "var(--nva-muted)", marginBottom: 20 }}>Choose your availability and we'll match you with your first model assignment.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {["Monday – Friday", "Saturday – Sunday", "Morning (6am–2pm GMT)", "Afternoon (2pm–8pm GMT)", "Evening (8pm–2am GMT)", "Flexible / Any time"].map((slot) => (
                  <button
                    key={slot}
                    onClick={(e) => {
                      const els = e.currentTarget.parentElement?.querySelectorAll("button") || [];
                    }}
                    style={{
                      padding: "12px 14px", borderRadius: 10, cursor: "pointer",
                      background: "var(--nva-surface-2)", border: "1px solid var(--nva-border)",
                      color: "var(--nva-muted)", fontSize: 12, fontWeight: 500,
                      textAlign: "left", transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--nva-border-hover)"; e.currentTarget.style.color = "var(--nva-text)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--nva-border)"; e.currentTarget.style.color = "var(--nva-muted)"; }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 16 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: "var(--nva-muted)", display: "block", marginBottom: 6 }}>Preferred start date</label>
                <input className="input-nva" type="date" />
              </div>
            </div>
          )}

          {/* Step 4: Go Live */}
          {step === 4 && (
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--nva-text)", marginBottom: 4 }}>Review & Submit</h3>
              <p style={{ fontSize: 12, color: "var(--nva-muted)", marginBottom: 20 }}>Confirm your details and agree to the terms before going live.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { label: "Full Name", value: form.name || "—" },
                  { label: "Email", value: form.email || "—" },
                  { label: "Discord", value: form.discord || "—" },
                  { label: "Location", value: form.location || "—" },
                ].map((row) => (
                  <div key={row.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--nva-border)" }}>
                    <span style={{ fontSize: 12, color: "var(--nva-muted)" }}>{row.label}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "var(--nva-text)" }}>{row.value}</span>
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
                  I confirm that I am 18+ years old, I have read and agree to the <strong style={{ color: "var(--nva-gold)" }}>NDA</strong> and <strong style={{ color: "var(--nva-gold)" }}>Terms of Service</strong>, and I commit to a minimum of 4 hours/day, 6 days/week.
                </span>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          className="btn-nva-secondary"
          onClick={handleBack}
          disabled={isFirst}
          style={{ opacity: isFirst ? 0.4 : 1 }}
        >
          <ChevronLeft size={15} /> Back
        </button>
        <div style={{ display: "flex", gap: 8 }}>
          <span style={{ fontSize: 11, color: "var(--nva-muted)", alignSelf: "center" }}>Step {step + 1} of {STEPS.length}</span>
          <button className="btn-nva-primary" onClick={handleNext}>
            {isLast ? "Submit Application" : "Continue"} <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* Benefits */}
      <div style={{ marginTop: 40, padding: "24px", borderRadius: 16, background: "linear-gradient(135deg, rgba(212,168,83,0.06) 0%, rgba(240,201,122,0.04) 100%)", border: "1px solid rgba(212,168,83,0.15)" }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--nva-gold)", marginBottom: 16, textAlign: "center" }}>Why Join New Valor Agency</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { icon: DollarSign, label: "$650–$5,500/mo", sub: "Top earners bonus" },
            { icon: Star, label: "Full Training", sub: "No experience needed" },
            { icon: Clock, label: "Weekly Payouts", sub: "Never wait to get paid" },
          ].map((b, i) => {
            const Icon = b.icon;
            return (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(212,168,83,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                  <Icon size={18} style={{ color: "var(--nva-gold)" }} />
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--nva-text)" }}>{b.label}</div>
                <div style={{ fontSize: 11, color: "var(--nva-muted)" }}>{b.sub}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ */}
      <div style={{ marginTop: 40 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--nva-text)", marginBottom: 14 }}>Frequently Asked Questions</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {FAQ.map((item, i) => (
            <div key={i} style={{ borderRadius: 10, overflow: "hidden", border: "1px solid var(--nva-border)" }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: "100%", padding: "14px 16px", background: openFaq === i ? "var(--nva-surface-2)" : "var(--nva-surface)",
                  border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
                  color: "var(--nva-text)", fontSize: 13, fontWeight: 600, textAlign: "left",
                  transition: "background 0.15s",
                }}
              >
                {item.q}
                <ChevronRight size={14} style={{ color: "var(--nva-muted)", transform: openFaq === i ? "rotate(90deg)" : "none", transition: "transform 0.2s" }} />
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    style={{ padding: "0 16px 14px", background: "var(--nva-surface-2)" }}
                  >
                    <p style={{ fontSize: 12, color: "var(--nva-muted)", lineHeight: 1.7 }}>{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
