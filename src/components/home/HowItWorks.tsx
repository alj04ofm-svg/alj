"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Upload, Sparkles, CalendarCheck, FolderOpen, CheckCircle, Send } from "lucide-react";
import { useCategory } from "@/components/providers/CategoryProvider";
import { ScrollReveal } from "@/components/ScrollReveal";
import type { Category } from "@/components/providers/CategoryProvider";

const STEPS: Record<Category, { num: string; icon: React.ElementType; title: string; desc: string; detail: string }[]> = {
  creator: [
    { num: "01", icon: Upload, title: "Upload Your Clip", desc: "Drop your raw clip into IGINFULL. Our AI analyses it frame-by-frame — understands the setting, the energy, the money moment.", detail: "Supports video up to 4K. Any format." },
    { num: "02", icon: Sparkles, title: "IGINFULL Creates", desc: "AI generates 3–5 reel concepts tailored to your niche. Pick your favourite. We write the caption, on-screen text, hashtags, and audio.", detail: "Niche-specific. Model-aware. Trend-aware." },
    { num: "03", icon: CalendarCheck, title: "Approve & Post", desc: "Review the finished reel. Approve it. IGINFULL auto-posts at the perfect time for your audience — no manual work.", detail: "Meta Graph API integration. No logging in." },
  ],
  agency: [
    { num: "01", icon: FolderOpen, title: "Create the Brief", desc: "Add a client account, fill out the reel brief with instructions, props, and outfit notes. Assign it to your model.", detail: "Categorised by shoot type for efficient filming." },
    { num: "02", icon: Upload, title: "Model Uploads Content", desc: "The model views their brief, films the reel, and uploads the raw footage. Files land directly in your Google Drive.", detail: "Multi-file upload. No size limit. Drive auto-sync." },
    { num: "03", icon: CheckCircle, title: "AI Enhance & Approve", desc: "IGINFULL enhances the clip, generates the caption and hashtags, and routes it to the PTP approval portal. Client approves — it schedules.", detail: "PTP → Schedule → Post. Full loop automated." },
  ],
  business: [
    { num: "01", icon: Sparkles, title: "AI Creates Your Content", desc: "Tell IGINFULL about today's special, product drop, or event. AI writes the caption, picks the hashtags, and suggests the format.", detail: "Done in seconds. Every single day." },
    { num: "02", icon: CheckCircle, title: "Review & Approve", desc: "Review the generated post in your dashboard. One click to approve, or edit the copy. You decide — takes 30 seconds.", detail: "Or set to auto-post with no review needed." },
    { num: "03", icon: Send, title: "Auto-Post at Peak Time", desc: "Approved posts go out automatically at the best time for your local audience. Build consistency without the daily grind.", detail: "Meta Graph API. No manual login required." },
  ],
};

function StepCard({ num, icon: Icon, title, desc, detail, delay, isLast }: {
  num: string; icon: React.ElementType; title: string; desc: string; detail: string; delay: number; isLast: boolean
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative flex-1"
    >
      <div
        className="relative p-8 rounded-2xl border transition-all group"
        style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(18,18,18,0.6)" }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,0,105,0.2)")}
        onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
      >
        <span className="text-7xl font-black text-white/[0.04] leading-none block mb-4 select-none">{num}</span>
        <div className="w-12 h-12 rounded-xl mb-5 flex items-center justify-center" style={{ backgroundColor: "rgba(255,0,105,0.08)" }}>
          <Icon size={22} style={{ color: "#ff0069" }} />
        </div>
        <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
        <p className="text-sm leading-relaxed mb-4" style={{ color: "#9d7ac8" }}>{desc}</p>
        <p className="text-xs font-semibold" style={{ color: "#ff0069" }}>{detail}</p>
      </div>
      {!isLast && (
        <div className="hidden lg:flex absolute top-[60px] right-0 w-[calc(50%-2rem)] items-center pointer-events-none">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(255,0,105,0.4), rgba(255,0,105,0.1))" }} />
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "rgba(255,0,105,0.4)" }} />
        </div>
      )}
    </motion.div>
  );
}

export function HowItWorks() {
  const { category } = useCategory();
  const steps = STEPS[category];

  return (
    <section id="how" className="py-24 px-6" style={{ backgroundColor: "rgba(18,18,18,0.3)" }}>
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#ff0069" }}>How It Works</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Three steps. Total automation.</h2>
          </div>
        </ScrollReveal>
        <motion.div
          key={category}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col lg:flex-row gap-6 lg:gap-8"
        >
          {steps.map((step, i) => (
            <StepCard key={step.num} {...step} delay={i * 0.12} isLast={i === steps.length - 1} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
