"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Zap, Star, Shield, TrendingUp, Clock, Heart,
  ChevronRight, Users, Briefcase, Video, MessageSquare,
  Megaphone, CheckCircle, Globe, Award, ArrowRight,
  Play, Sparkles, Target, HeartHandshake
} from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

const ROLES = [
  {
    id: "chatter",
    icon: MessageSquare,
    label: "Chatter",
    tagline: "Be the voice of our top creators",
    desc: "Engage fans, build loyalty, and drive revenue — all from your laptop. Flexible hours, uncapped earnings, and full training provided.",
    cta: "Apply as Chatter",
    href: "/velour/chatter",
    color: "#d4a853",
    perks: ["$650 – $5,500/mo", "Flexible remote work", "Discord community", "Full chat training"],
  },
  {
    id: "marketing",
    icon: Megaphone,
    label: "Marketing",
    tagline: "Create content that converts",
    desc: "Produce viral content for our creator network. Work with top talent, use cutting-edge AI tools, and build a portfolio that stands out.",
    cta: "Apply as Marketer",
    href: "/velour/marketing",
    color: "#d4a853",
    perk: ["$800 – $4,000/mo", "AI-powered workflow", "Creative freedom", "Portfolio building"],
  },
];

const WHY_JOIN = [
  {
    icon: TrendingUp,
    title: "Uncapped Earning Potential",
    desc: "Performance bonuses and tier upgrades mean your income grows as fast as you do. Top chatters earn $5,500+/month.",
  },
  {
    icon: Globe,
    title: "100% Remote",
    desc: "Work from anywhere. We provide the tools, the training, and the support — you bring the talent.",
  },
  {
    icon: HeartHandshake,
    title: "World-Class Community",
    desc: "Join a team of ambitious people who support each other. Our Discord is active, helpful, and genuinely fun.",
  },
  {
    icon: Zap,
    title: "AI-Powered Tools",
    desc: "Never start from scratch. Our proprietary AI tools help you work smarter, not harder — generated scripts, content briefs, and analytics at your fingertips.",
  },
  {
    icon: Star,
    title: "Real Career Growth",
    desc: "Prove yourself and climb: Chatter → Senior Chatter → Team Lead → Management. No politics, just results.",
  },
  {
    icon: Shield,
    title: "Stable, Reputable Agency",
    desc: "New Valor Agency manages top-tier creators with a proven track record. You're joining something real, not a fly-by-night operation.",
  },
];

const TESTIMONIALS = [
  {
    quote: "I went from $800 to $3,200 in my first three months. The training is genuinely excellent — they teach you exactly what works.",
    name: "Jamie R.",
    role: "Chatter — 8 months",
    initials: "JR",
  },
  {
    quote: "The AI tools they give you are insane. I produce twice the content in half the time. My creators love the results.",
    name: "Chris M.",
    role: "Marketing — 1 year",
    initials: "CM",
  },
  {
    quote: "Best remote job I've ever had. Flexible hours, supportive team, and my income has fully replaced my old 9-to-5.",
    name: "Alex T.",
    role: "Chatter — 14 months",
    initials: "AT",
  },
];

const PROCESS_STEPS = [
  { num: "01", title: "Apply Online", desc: "Fill out the quick application — tell us about yourself, your experience, and what you're looking for." },
  { num: "02", title: "Interview & Trial", desc: "A short friendly call, then a paid trial shift to see if we're the right fit for each other." },
  { num: "03", title: "Onboarding", desc: "Full training programme — learn our tools, meet your team, and get set up on your first shifts." },
  { num: "04", title: "Go Live", desc: "Start earning. We'll support you every step of the way as you build your client roster and income." },
];

const PERKS_GRID = [
  { icon: Clock, label: "Flexible Hours" },
  { icon: Video, label: "AI Content Tools" },
  { icon: Users, label: "Team Discord" },
  { icon: Award, label: "Performance Bonuses" },
  { icon: Target, label: "Clear Growth Path" },
  { icon: Sparkles, label: "Creator Network" },
];

export default function VelourPage() {
  return (
    <div className="min-h-full bg-[#0a0a0f] text-[#e8e8f0]">
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b" style={{ borderColor: "rgba(212,168,83,0.15)", backgroundColor: "rgba(10,10,15,0.9)", backdropFilter: "blur(20px)" }}>
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #d4a853, #a07830)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontWeight: 900, fontSize: 12, color: "#0a0a0f" }}>NV</span>
            </div>
            <div>
              <span className="text-sm font-black tracking-tight text-white">VELOUR</span>
              <span style={{ display: "block", fontSize: 9, color: "rgba(212,168,83,0.7)", fontWeight: 600, letterSpacing: "0.1em" }}>BY NEW VALOR AGENCY</span>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" style={{ fontSize: 13, color: "rgba(212,168,83,0.6)" }} className="hidden sm:block hover:text-[#d4a853] transition-colors">
              ← Back to IGINFULL
            </Link>
            <Link
              href="/velour/chatter"
              className="px-5 py-2 rounded-xl text-sm font-bold text-[#0a0a0f] transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #d4a853, #a07830)", boxShadow: "0 0 20px rgba(212,168,83,0.25)" }}
            >
              Apply Now
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ paddingTop: 160, paddingBottom: 100, paddingLeft: 24, paddingRight: 24, textAlign: "center", position: "relative", overflow: "hidden" }}>
        {/* Background glow */}
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "radial-gradient(ellipse, rgba(212,168,83,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: 760, margin: "0 auto" }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 100, border: "1px solid rgba(212,168,83,0.3)", background: "rgba(212,168,83,0.06)", marginBottom: 32 }}>
              <Zap size={12} style={{ color: "#d4a853" }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: "#d4a853", letterSpacing: "0.05em" }}>NOW HIRING — REMOTE POSITIONS</span>
            </div>

            <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 24, color: "#ffffff" }}>
              Build your career.<br />
              <span style={{ background: "linear-gradient(135deg, #d4a853, #f0c97a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Work with the best.
              </span>
            </h1>

            <p style={{ fontSize: 18, lineHeight: 1.65, color: "rgba(232,232,240,0.6)", maxWidth: 560, margin: "0 auto 40px" }}>
              Join New Valor Agency's Velour team. Remote flexibility, uncapped earnings, and the tools to do your best work. We train you — then we trust you.
            </p>

            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/velour/chatter"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-[#0a0a0f] transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #d4a853, #a07830)", boxShadow: "0 4px 30px rgba(212,168,83,0.35)" }}
              >
                <MessageSquare size={16} />
                Chatter Roles
              </Link>
              <Link
                href="/velour/marketing"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-[#d4a853] transition-all hover:scale-105"
                style={{ border: "1px solid rgba(212,168,83,0.4)", background: "rgba(212,168,83,0.06)" }}
              >
                <Megaphone size={16} />
                Marketing Roles
              </Link>
            </div>
          </motion.div>
        </ScrollReveal>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, maxWidth: 900, margin: "64px auto 0", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(212,168,83,0.15)" }}
          className="velour-stats"
        >
          {[
            { value: "200+", label: "Team Members" },
            { value: "$5.5K+", label: "Top Monthly Earner" },
            { value: "94%", label: "Retention Rate" },
            { value: "100%", label: "Remote-First" },
          ].map((s) => (
            <div key={s.label} style={{ padding: "28px 20px", background: "rgba(212,168,83,0.04)", textAlign: "center" }}>
              <div style={{ fontSize: 32, fontWeight: 900, background: "linear-gradient(135deg, #d4a853, #f0c97a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "rgba(232,232,240,0.5)", marginTop: 4, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── WHY JOIN ── */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#d4a853", textTransform: "uppercase", marginBottom: 12 }}>Why Join Velour</p>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, letterSpacing: "-0.02em", color: "#fff" }}>
                Everything you need to thrive
              </h2>
            </div>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
            {WHY_JOIN.map((item, i) => {
              const Icon = item.icon;
              return (
                <ScrollReveal key={item.title} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    style={{ padding: 28, borderRadius: 16, border: "1px solid rgba(212,168,83,0.12)", background: "rgba(212,168,83,0.02)", transition: "all 0.2s", cursor: "default" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(212,168,83,0.06)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,168,83,0.25)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = "rgba(212,168,83,0.02)"; (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(212,168,83,0.12)"; }}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                      <Icon size={20} style={{ color: "#d4a853" }} />
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{item.title}</h3>
                    <p style={{ fontSize: 14, lineHeight: 1.6, color: "rgba(232,232,240,0.55)" }}>{item.desc}</p>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── ROLES ── */}
      <section style={{ padding: "80px 24px", background: "rgba(212,168,83,0.02)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#d4a853", textTransform: "uppercase", marginBottom: 12 }}>Open Roles</p>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, letterSpacing: "-0.02em", color: "#fff" }}>
                Find your position
              </h2>
              <p style={{ fontSize: 16, color: "rgba(232,232,240,0.5)", marginTop: 12, maxWidth: 480, margin: "12px auto 0" }}>
                Two ways to join the team. Both are remote, flexible, and come with full training and support.
              </p>
            </div>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 20 }}>
            {ROLES.map((role, i) => {
              const Icon = role.icon;
              return (
                <ScrollReveal key={role.id} delay={i * 0.1}>
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{ borderRadius: 20, border: "1px solid rgba(212,168,83,0.2)", background: "rgba(10,10,15,0.8)", overflow: "hidden" }}
                  >
                    {/* Top accent bar */}
                    <div style={{ height: 4, background: "linear-gradient(90deg, #d4a853, #a07830)" }} />

                    <div style={{ padding: 32 }}>
                      <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                        <Icon size={24} style={{ color: "#d4a853" }} />
                      </div>

                      <div style={{ display: "inline-block", padding: "4px 12px", borderRadius: 100, border: "1px solid rgba(212,168,83,0.3)", background: "rgba(212,168,83,0.06)", fontSize: 11, fontWeight: 700, color: "#d4a853", marginBottom: 12, letterSpacing: "0.05em" }}>
                        OPEN ROLE
                      </div>

                      <h3 style={{ fontSize: 24, fontWeight: 900, color: "#fff", marginBottom: 6 }}>{role.label}</h3>
                      <p style={{ fontSize: 15, fontWeight: 600, color: "#d4a853", marginBottom: 14 }}>{role.tagline}</p>
                      <p style={{ fontSize: 14, lineHeight: 1.65, color: "rgba(232,232,240,0.55)", marginBottom: 24 }}>{role.desc}</p>

                      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
                        {(role.perks ?? role.perk ?? []).map((perk) => (
                          <div key={perk} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "rgba(232,232,240,0.7)" }}>
                            <CheckCircle size={14} style={{ color: "#d4a853", flexShrink: 0 }} />
                            {perk}
                          </div>
                        ))}
                      </div>

                      <Link
                        href={role.href}
                        className="inline-flex items-center gap-2 w-full justify-center px-6 py-3.5 rounded-xl font-bold text-[#0a0a0f] transition-all hover:scale-[1.02]"
                        style={{ background: "linear-gradient(135deg, #d4a853, #a07830)", boxShadow: "0 4px 20px rgba(212,168,83,0.25)" }}
                      >
                        {role.cta}
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#d4a853", textTransform: "uppercase", marginBottom: 12 }}>Process</p>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, letterSpacing: "-0.02em", color: "#fff" }}>
                From application to your first shift
              </h2>
            </div>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 0, position: "relative" }}>
            {/* Connector line */}
            <div style={{ position: "absolute", top: 36, left: "calc(11.1%)", right: "calc(11.1%)", height: 1, background: "rgba(212,168,83,0.2)", zIndex: 0, display: "none" }} />

            {PROCESS_STEPS.map((step, i) => (
              <ScrollReveal key={step.num} delay={i * 0.1}>
                <div style={{ padding: "0 20px", textAlign: "center", position: "relative", zIndex: 1 }}>
                  <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(212,168,83,0.08)", border: "2px solid rgba(212,168,83,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <span style={{ fontSize: 18, fontWeight: 900, color: "#d4a853" }}>{step.num}</span>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{step.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.65, color: "rgba(232,232,240,0.5)" }}>{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "80px 24px", background: "rgba(212,168,83,0.02)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <ScrollReveal>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: "#d4a853", textTransform: "uppercase", marginBottom: 12 }}>Voices</p>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900, letterSpacing: "-0.02em", color: "#fff" }}>
                From our team
              </h2>
            </div>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.1}>
                <div style={{ padding: 28, borderRadius: 16, border: "1px solid rgba(212,168,83,0.12)", background: "rgba(10,10,15,0.6)", height: "100%" }}>
                  <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                    {[1,2,3,4,5].map(s => <Star key={s} size={14} style={{ color: "#d4a853", fill: "#d4a853" }} />)}
                  </div>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(232,232,240,0.75)", marginBottom: 20, fontStyle: "italic" }}>&ldquo;{t.quote}&rdquo;</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #d4a853, #a07830)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12, color: "#0a0a0f", flexShrink: 0 }}>
                      {t.initials}
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{t.name}</p>
                      <p style={{ fontSize: 11, color: "rgba(212,168,83,0.6)" }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERKS GRID ── */}
      <section style={{ padding: "60px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <ScrollReveal>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Plus, all the basics you&apos;d expect</h2>
            <p style={{ fontSize: 14, color: "rgba(232,232,240,0.5)", marginBottom: 36 }}>Everything below is included with every role</p>
          </ScrollReveal>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            {PERKS_GRID.map((perk) => {
              const Icon = perk.icon;
              return (
                <ScrollReveal key={perk.label}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 18px", borderRadius: 100, border: "1px solid rgba(212,168,83,0.15)", background: "rgba(212,168,83,0.04)" }}>
                    <Icon size={14} style={{ color: "#d4a853" }} />
                    <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(232,232,240,0.7)" }}>{perk.label}</span>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: "100px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: "10%", left: "50%", transform: "translateX(-50%)", width: 500, height: 300, background: "radial-gradient(ellipse, rgba(212,168,83,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <ScrollReveal>
          <div style={{ maxWidth: 640, margin: "0 auto", position: "relative" }}>
            <Sparkles size={32} style={{ color: "#d4a853", margin: "0 auto 24px" }} />
            <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", marginBottom: 20 }}>
              Ready to do the best work<br />of your life?
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "rgba(232,232,240,0.55)", marginBottom: 36 }}>
              Applications take less than 10 minutes. We review every one personally — no automated rejections.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/velour/chatter"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-[#0a0a0f] transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #d4a853, #a07830)", boxShadow: "0 4px 40px rgba(212,168,83,0.4)" }}
              >
                <MessageSquare size={16} />
                Apply as Chatter
                <ChevronRight size={16} />
              </Link>
              <Link
                href="/velour/marketing"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-[#d4a853] transition-all hover:scale-105"
                style={{ border: "1px solid rgba(212,168,83,0.4)", background: "rgba(212,168,83,0.06)" }}
              >
                <Megaphone size={16} />
                Apply as Marketer
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: "32px 24px", borderTop: "1px solid rgba(212,168,83,0.1)", textAlign: "center" }}>
        <p style={{ fontSize: 12, color: "rgba(232,232,240,0.3)" }}>
          &copy; 2026 Velour by New Valor Agency &nbsp;&bull;&nbsp; <a href="mailto:careers@newvaloragency.com" style={{ color: "rgba(212,168,83,0.5)" }}>careers@newvaloragency.com</a>
        </p>
      </footer>
    </div>
  );
}
