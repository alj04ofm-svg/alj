"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";
import { useCategory } from "@/components/providers/CategoryProvider";
import { ScrollReveal } from "@/components/ScrollReveal";
import type { Category } from "@/components/providers/CategoryProvider";

const TIERS: Record<Category, {
  name: string; price: string; period: string; desc: string;
  features: string[]; highlight: boolean;
}[]> = {
  creator: [
    { name: "Starter", price: "$19", period: "/mo", desc: "For creators just getting started with AI content.", features: ["AI content generation", "Scheduler & calendar", "Basic analytics", "1 Instagram account", "50 posts/mo"], highlight: false },
    { name: "Growth", price: "$49", period: "/mo", desc: "For creators who are serious about growing their account.", features: ["Everything in Starter", "Caption generation", "Hashtag research", "Community inbox", "3 accounts", "Unlimited posts"], highlight: true },
    { name: "Pro", price: "$99", period: "/mo", desc: "Full AI suite with analytics and community management.", features: ["AI + editing concepts", "On-screen text", "Full analytics", "Community management", "5 accounts", "PTP approval portal"], highlight: false },
  ],
  agency: [
    { name: "Studio", price: "$299", period: "/mo", desc: "For agencies managing their first wave of content clients.", features: ["Model Brief Platform", "AI content generation", "PTP approval portal", "3 client accounts", "Google Drive sync", "Basic analytics"], highlight: false },
    { name: "Agency", price: "$599", period: "/mo", desc: "For established agencies running multiple content clients.", features: ["Everything in Studio", "Team collaboration", "Role-based access", "White-label reports", "10 client accounts", "Drive content dashboard"], highlight: true },
    { name: "Enterprise", price: "$999", period: "/mo", desc: "Full-service content agency in a box. We help you run it.", features: ["Everything in Agency", "Dedicated account manager", "Strategy sessions", "Unlimited clients", "Custom integrations", "Priority support"], highlight: false },
  ],
  business: [
    { name: "Local", price: "$49", period: "/mo", desc: "For restaurants and shops building their local following.", features: ["AI post generation", "Auto-scheduling", "Local hashtag research", "1 account", "30 posts/mo", "Basic analytics"], highlight: false },
    { name: "Growth", price: "$149", period: "/mo", desc: "For growing businesses that need daily content and reels.", features: ["Everything in Local", "Reel generation", "Review highlights", "UGC content ideas", "3 accounts", "Unlimited posts"], highlight: true },
    { name: "Pro", price: "$299", period: "/mo", desc: "Full social presence — posts, reels, and community, automated.", features: ["Everything in Growth", "Full community inbox", "Analytics dashboard", "5 accounts", "Campaign tracking", "Priority support"], highlight: false },
  ],
};

function TierCard({ name, price, period, desc, features, highlight, delay }: {
  name: string; price: string; period: string; desc: string; features: string[]; highlight: boolean; delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative flex flex-col rounded-2xl border p-8 transition-all"
      style={highlight
        ? { borderColor: "rgba(255,0,105,0.3)", backgroundColor: "rgba(255,0,105,0.04)", boxShadow: "0 0 40px rgba(255,0,105,0.15), 0 0 80px rgba(255,0,105,0.05)" }
        : { borderColor: "rgba(255,255,255,0.06)", backgroundColor: "rgba(18,18,18,0.4)" }
      }
    >
      {highlight && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: "linear-gradient(135deg, #ff0069, #833ab4)" }}>Most Popular</span>
        </div>
      )}
      <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-2" style={{ color: highlight ? "#ff0069" : "#9d7ac8" }}>
        {name}
      </p>
      <div className="mb-1">
        <span className="text-4xl font-bold text-white">{price}</span>
        <span className="text-sm" style={{ color: "#9d7ac8" }}>{period}</span>
      </div>
      <p className="text-sm mb-7 leading-relaxed" style={{ color: "#9d7ac8" }}>{desc}</p>
      <div className="h-px mb-7" style={{ backgroundColor: highlight ? "rgba(255,0,105,0.2)" : "rgba(255,255,255,0.05)" }} />
      <ul className="space-y-3 flex-1 mb-8">
        {features.map(f => (
          <li key={f} className="flex items-start gap-3 text-sm" style={{ color: "#9d7ac8" }}>
            <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: highlight ? "#ff0069" : "rgba(255,0,105,0.6)" }} />
            {f}
          </li>
        ))}
      </ul>
      <a href="#cta" className={`block text-center py-3 rounded-xl text-sm font-semibold transition-all ${highlight ? "text-white hover:opacity-90" : "text-white border hover:bg-white/5 hover:border-white/25"}`}
        style={highlight ? { background: "linear-gradient(135deg, #ff0069, #833ab4)" } : { borderColor: "rgba(255,255,255,0.15)" }}>
        Get Started
      </a>
    </motion.div>
  );
}

export function ServiceTiers() {
  const { category } = useCategory();
  const tiers = TIERS[category];

  return (
    <section id="pricing" className="py-24 px-6" style={{ backgroundColor: "rgba(18,18,18,0.2)" }}>
      <div className="mx-auto max-w-5xl">
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] mb-4" style={{ color: "#ff0069" }}>Pricing</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">Simple pricing. No surprises.</h2>
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, i) => (
            <TierCard key={tier.name} {...tier} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
