"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const stats = [
  { value: "250K+", label: "Followers", sub: "Grown across managed accounts" },
  { value: "1,200+", label: "Reels Posted", sub: "In the last 6 months" },
  { value: "30hrs", label: "Saved Per Week", sub: "Per manager, on average" },
  { value: "+47%", label: "Engagement Lift", sub: "Month-over-month average" },
];

function StatItem({ value, label, sub, delay }: (typeof stats)[0] & { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }} className="text-center p-6">
      <p className="text-5xl md:text-6xl font-black mb-2 tracking-tight" style={{ color: "#ff0069" }}>{value}</p>
      <p className="text-sm font-semibold text-white mb-1">{label}</p>
      <p className="text-xs" style={{ color: "#a8a8a8" }}>{sub}</p>
    </motion.div>
  );
}

export function StatsSection() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: "rgba(18,18,18,0.3)" }}>
      <div className="mx-auto max-w-6xl">
        <ScrollReveal>
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#ff0069" }}>Results</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Real accounts. Real growth.</h2>
          </div>
        </ScrollReveal>
        <div className="relative rounded-2xl border overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(18,18,18,0.4)" }}>
          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
            {stats.map((s, i) => <StatItem key={s.label} {...s} delay={i * 0.1} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
