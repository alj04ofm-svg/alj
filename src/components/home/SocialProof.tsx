"use client";

import { ScrollReveal } from "@/components/ScrollReveal";

const brands = [
  "ABG Rice Bunny",
  "REN Studio",
  "Together Group",
  "Ella ABG",
  "Amam Mira",
  "Luminary Co.",
];

export function SocialProof() {
  return (
    <ScrollReveal>
      <section className="py-16 px-6 border-y relative overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        {/* Animated gradient border — top */}
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #ff0069, #833ab4, #ff0069, transparent)", backgroundSize: "300% 100%", animation: "shimmer 4s ease-in-out infinite" }} />
        {/* Animated gradient border — bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, #fcaf45, #fd1d1d, #fcaf45, transparent)", backgroundSize: "300% 100%", animation: "shimmer 4s ease-in-out infinite reverse" }} />

        <style>{`
          @keyframes shimmer {
            0%, 100% { background-position: -100% 0; }
            50% { background-position: 200% 0; }
          }
        `}</style>

        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs mb-8 font-medium uppercase tracking-[0.2em]" style={{ color: "#a8a8a8" }}>
            Trusted by agencies, creators &amp; brands
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {brands.map((name, i) => (
              <span key={name} className="text-sm font-semibold tracking-wide cursor-default transition-colors hover:text-white" style={{ color: "rgba(255,255,255,0.25)", animationDelay: `${i * 0.1}s` }}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </ScrollReveal>
  );
}
