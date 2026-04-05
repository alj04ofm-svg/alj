"use client";

import { ArrowRight } from "lucide-react";
import { useCategory } from "@/components/providers/CategoryProvider";
import { ScrollReveal } from "@/components/ScrollReveal";
import type { Category } from "@/components/providers/CategoryProvider";
import { motion } from "framer-motion";

const CONTENT: Record<Category, {
  headline: string;
  sub: string;
  primary: string;
  secondary: string;
  footNote: string;
}> = {
  creator: {
    headline: "Stop spending hours\non content.",
    sub: "Join creators who are posting every single day without the grind. IGINFULL does the content — you just show up and film.",
    primary: "Start Free — No Card Needed",
    secondary: "See How It Works",
    footNote: "14-day free trial. 1 account. Unlimited posts.",
  },
  agency: {
    headline: "Scale your agency\nwithout the headcount.",
    sub: "AI-powered content for every client. Less manual work, more clients, higher margins. This is how modern agencies run.",
    primary: "Start Your Agency Trial",
    secondary: "Book a Demo Call",
    footNote: "14-day free trial. Full Agency plan access.",
  },
  business: {
    headline: "Your Instagram,\nhandled automatically.",
    sub: "Post every day without the daily grind. Great content, auto-scheduled, without hiring a social media manager.",
    primary: "Start Free — No Card Needed",
    secondary: "See an Example",
    footNote: "14-day free trial. Cancel anytime. No commitment.",
  },
};

export function FinalCTA() {
  const { category } = useCategory();
  const c = CONTENT[category];

  return (
    <section id="cta" className="py-32 px-6 text-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,0,105,0.08) 0%, transparent 70%)" }} />
      </div>
      <div className="relative mx-auto max-w-3xl">
        <ScrollReveal>
          <motion.h2
            key={category}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 whitespace-pre-line"
          >
            {c.headline}
          </motion.h2>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-lg mb-12 leading-relaxed max-w-xl mx-auto" style={{ color: "#9d7ac8" }}>
            {c.sub}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="group/btn flex items-center gap-2 px-10 py-4 rounded-xl text-base font-bold text-white transition-all hover:opacity-90 hover:shadow-[0_0_40px_rgba(255,0,105,0.4)]"
              style={{ background: "linear-gradient(135deg, #ff0069, #833ab4)" }}
            >
              {c.primary}
              <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
            </a>
            <a
              href="#how"
              className="flex items-center gap-2 px-10 py-4 rounded-xl text-base font-semibold text-white border transition-all hover:bg-white/5 hover:border-white/25"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
            >
              {c.secondary}
            </a>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
          <p className="mt-8 text-sm" style={{ color: "#9d7ac8" }}>{c.footNote}</p>
        </ScrollReveal>
      </div>
    </section>
  );
}
