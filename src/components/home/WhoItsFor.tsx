"use client";

import { motion } from "framer-motion";
import { Video, Star, UserCheck, Building2, Briefcase, Users, Store, UtensilsCrossed, ShoppingBag, Package } from "lucide-react";
import { useCategory, type Category } from "@/components/providers/CategoryProvider";
import { ScrollReveal } from "@/components/ScrollReveal";

// ─── Category data ───────────────────────────────────────────────────────────

const CATEGORIES: { id: Category; label: string; sub: string }[] = [
  { id: "creator", label: "Creator", sub: "Solopreneurs & influencers" },
  { id: "agency", label: "Agency", sub: "Management & freelancers" },
  { id: "business", label: "Small Business", sub: "Restaurants, retail & local" },
];

const CONTENT: Record<Category, {
  headline: string;
  sub: string;
  personas: { icon: React.ElementType; title: string; desc: string }[];
}> = {
  creator: {
    headline: "Your personal content machine.",
    sub: "Stop spending hours on content. Let AI do the heavy lifting — you just film.",
    personas: [
      { icon: Video, title: "Solo Creator", desc: "No time, wants results, can't do it all alone." },
      { icon: Star, title: "Influencer", desc: "Needs consistent content without an in-house team." },
      { icon: UserCheck, title: "Personal Brand", desc: "Building a following? AI keeps you posting every day." },
    ],
  },
  agency: {
    headline: "Run your agency on autopilot.",
    sub: "Scale to 10x more clients without hiring more people. AI-powered workflows for every brief.",
    personas: [
      { icon: Building2, title: "Content Agency", desc: "Manages multiple clients — needs pipeline, not more staff." },
      { icon: Briefcase, title: "Freelancer / SMM", desc: "Deliver more clients with AI generating the content for you." },
      { icon: Users, title: "Management Agency", desc: "Handle multiple models or talent — one dashboard, full control." },
    ],
  },
  business: {
    headline: "Your own social media team.",
    sub: "Great content, posted every day, without the agency fees or the time drain.",
    personas: [
      { icon: UtensilsCrossed, title: "Restaurant / Bar", desc: "Post your specials, events, and behind-the-scenes automatically." },
      { icon: ShoppingBag, title: "E-commerce Brand", desc: "Product reels, UGC, and shoppable content — generated daily." },
      { icon: Package, title: "Local Business", desc: "Build your local following with consistent, relevant content." },
    ],
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export function WhoItsFor() {
  const { category, setCategory } = useCategory();
  const data = CONTENT[category];

  return (
    <section id="who" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">

        {/* Category Switcher */}
        <ScrollReveal>
          <div className="text-center mb-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#ff0069" }}>Who It&apos;s For</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              {data.headline}
            </h2>
            <p className="text-base md:text-lg mb-12 max-w-xl mx-auto" style={{ color: "#9d7ac8" }}>
              {data.sub}
            </p>
          </div>
        </ScrollReveal>

        {/* Pill Switcher */}
        <ScrollReveal delay={0.1}>
          <div className="flex justify-center mb-14">
            <div
              className="inline-flex p-1 rounded-2xl gap-1"
              style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {CATEGORIES.map((cat) => {
                const active = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setCategory(cat.id)}
                    className="relative px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
                    style={{
                      color: active ? "#ffffff" : "#9d7ac8",
                      backgroundColor: active ? "rgba(255,0,105,0.12)" : "transparent",
                      border: active ? "1px solid rgba(255,0,105,0.2)" : "1px solid transparent",
                      boxShadow: active ? "0 0 16px rgba(255,0,105,0.12)" : "none",
                    }}
                  >
                    {active && (
                      <motion.span
                        layoutId="category-pill"
                        className="absolute inset-0 rounded-xl"
                        style={{
                          background: "rgba(255,0,105,0.08)",
                          border: "1px solid rgba(255,0,105,0.2)",
                          zIndex: -1,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                      />
                    )}
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Persona Cards */}
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          {data.personas.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className="group relative p-8 rounded-2xl border transition-all cursor-default"
                style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(18,18,18,0.4)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,0,105,0.25)"; e.currentTarget.style.backgroundColor = "rgba(18,18,18,0.65)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.backgroundColor = "rgba(18,18,18,0.4)"; }}
              >
                <div className="w-10 h-10 rounded-xl mb-5 flex items-center justify-center" style={{ backgroundColor: "rgba(255,0,105,0.08)" }}>
                  <Icon size={18} style={{ color: "#ff0069" }} />
                </div>
                <h3 className="font-bold text-white mb-2 text-base">{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#9d7ac8" }}>{p.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
