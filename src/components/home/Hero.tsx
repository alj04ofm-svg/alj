"use client";

import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useCategory } from "@/components/providers/CategoryProvider";

const CATEGORY_SUBS: Record<string, string> = {
  creator: "AI generates your content. Edits your reels. Schedules your posts. You just film.",
  agency: "AI generates content for every client. Manage multiple accounts, models, and briefs — all in one place.",
  business: "Your Instagram, handled automatically. Great content, posted every day, without lifting a finger.",
};

export function Hero() {
  const { category } = useCategory();

  return (
    <section className="pt-32 pb-24 px-6 text-center relative overflow-hidden min-h-[90vh] flex items-center justify-center">
      {/* Radial gradient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,0,105,0.08) 0%, transparent 70%)" }} />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full" style={{ background: "radial-gradient(circle, rgba(131,58,180,0.06) 0%, transparent 70%)" }} />
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

      <div className="relative mx-auto max-w-4xl">
        {/* Category + Badge row */}
        <ScrollReveal delay={0}>
          <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
            {/* Category pill */}
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold"
              style={{
                background: "rgba(255,0,105,0.1)",
                border: "1px solid rgba(255,0,105,0.2)",
                color: "#ff0069",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              {category === "creator" ? "For Creators" : category === "agency" ? "For Agencies" : "For Small Business"}
            </motion.div>
            {/* Divider dot */}
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: "#9d7ac8" }} />
            {/* Built by badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-white text-xs font-bold" style={{ borderColor: "rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.04)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Built By ALJ
            </div>
          </div>
        </ScrollReveal>

        {/* Headline */}
        <ScrollReveal delay={0.1}>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.02] mb-10">
            <span className="text-white">IGINFULL</span>
            <br />
            <span className="text-gradient-ig">
              Built for accounts
              <br />
              that mean business.
            </span>
          </h1>
        </ScrollReveal>

        {/* Subheadline — category-aware */}
        <ScrollReveal delay={0.2}>
          <p className="text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto" style={{ color: "#9d7ac8" }}>
            {CATEGORY_SUBS[category]}
          </p>
        </ScrollReveal>

        {/* CTAs */}
        <ScrollReveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#cta" className="group/btn flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold text-white transition-all hover:opacity-90 hover:shadow-[0_0_40px_rgba(255,0,105,0.4)]" style={{ background: "linear-gradient(135deg, #ff0069, #833ab4)" }}>
              Start Free
              <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
            </a>
            <a href="#features" className="group/btn flex items-center gap-2 px-8 py-4 rounded-xl text-base font-semibold text-white border transition-all hover:bg-white/5 hover:border-white/25" style={{ borderColor: "rgba(255,255,255,0.15)" }}>
              <Play size={16} className="fill-white" />
              See the Platform
            </a>
          </div>
        </ScrollReveal>

        {/* Social proof micro text */}
        <ScrollReveal delay={0.4}>
          <p className="mt-10 text-sm" style={{ color: "#9d7ac8" }}>
            Trusted by 10,000+ creators, agencies &amp; brands
          </p>
        </ScrollReveal>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to top, #0f0028 0%, transparent 100%)" }} />
    </section>
  );
}
