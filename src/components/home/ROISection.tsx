"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const oldWayItems = [
  "In-house social manager: $3,000–$6,000/mo",
  "Content creation (outsourced): $500–$2,000/mo",
  "Scheduling tool: $40–$160/mo",
  "Community VA: $1,000–$2,000/mo",
  "Analytics tool: $30–$80/mo",
];

const iginItems = [
  "Platform (self-manage): from $19/mo",
  "Content generation: from $299/mo",
  "Full editing: from $499/mo",
  "Full management: from $999/mo",
  "No extra tools needed",
];

export function ROISection() {
  return (
    <section id="pricing" className="py-24 px-6">
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="rounded-3xl border p-8 md:p-14 text-center" style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(18,18,18,0.4)" }}>
            <ScrollReveal>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#ff0069" }}>Return on Investment</p>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">What agencies currently pay.</h2>
              <p className="mb-14" style={{ color: "#a8a8a8" }}>And what IGINFULL actually costs.</p>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <OldWayCard />
              <IginCard />
            </div>
            <ScrollReveal delay={0.2}>
              <p className="text-sm" style={{ color: "#a8a8a8" }}>
                <span className="font-semibold text-white">Solo creator pricing:</span> Platform from $19/month. Less than a coffee a day.
              </p>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function OldWayCard() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -24 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="text-left p-8 rounded-2xl text-left"
      style={{ backgroundColor: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.15)" }}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-5" style={{ color: "#ef4444" }}>Old Way</p>
      <ul className="space-y-3 mb-8">
        {oldWayItems.map(item => <li key={item} className="text-sm" style={{ color: "#a8a8a8" }}>{item}</li>)}
      </ul>
      <div className="pt-5 border-t" style={{ borderColor: "rgba(239,68,68,0.15)" }}>
        <p className="text-2xl font-bold" style={{ color: "#ef4444" }}>$5,000–$10,000/month</p>
        <p className="text-xs mt-1" style={{ color: "rgba(239,68,68,0.5)" }}>And you&apos;re still managing the manager</p>
      </div>
    </motion.div>
  );
}

function IginCard() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: 24 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="text-left p-8 rounded-2xl"
      style={{ backgroundColor: "rgba(255,0,105,0.04)", border: "1px solid rgba(255,0,105,0.15)" }}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-5" style={{ color: "#ff0069" }}>IGINFULL</p>
      <ul className="space-y-3 mb-8">
        {iginItems.map(item => <li key={item} className="text-sm" style={{ color: "#a8a8a8" }}>{item}</li>)}
      </ul>
      <div className="pt-5 border-t" style={{ borderColor: "rgba(255,0,105,0.15)" }}>
        <p className="text-2xl font-bold" style={{ color: "#ff0069" }}>From $19/month</p>
        <p className="text-xs mt-1" style={{ color: "rgba(255,0,105,0.5)" }}>Save 60–90% vs the old way</p>
      </div>
    </motion.div>
  );
}
