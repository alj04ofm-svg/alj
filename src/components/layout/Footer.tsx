"use client";

import { Camera, Globe2, Music } from "lucide-react";

const navColumns = [
  { heading: "Platform", links: [{ label: "Features", href: "#features" }, { label: "Pricing", href: "#pricing" }, { label: "Login", href: "#" }] },
  { heading: "Services", links: [{ label: "Platform Only", href: "#services" }, { label: "Content Gen", href: "#services" }, { label: "Full Management", href: "#services" }] },
  { heading: "Company", links: [{ label: "About", href: "#" }, { label: "Contact", href: "#" }, { label: "Privacy", href: "#" }] },
];

const socialLinks = [
  { icon: Camera, label: "Instagram", href: "#" },
  { icon: Globe2, label: "Twitter / X", href: "#" },
  { icon: Music, label: "TikTok", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t py-16 px-6" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 mb-12">
          <div className="max-w-xs">
            <a href="/" className="flex items-center gap-2.5 mb-3 group">
              <div className="w-8 h-8 rounded-lg gradient-ig flex items-center justify-center">
                <span className="text-white font-black text-sm">IG</span>
              </div>
              <span className="text-lg font-bold text-white">IGINFULL</span>
            </a>
            <p className="text-xs mb-1" style={{ color: "#a8a8a8" }}>Built By ALJ</p>
            <p className="text-xs leading-relaxed max-w-[260px]" style={{ color: "#a8a8a8" }}>
              The Instagram platform that does everything — content, scheduling, community, analytics. Built for anyone who wants to win.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-10">
            {navColumns.map(col => (
              <div key={col.heading}>
                <p className="text-sm font-semibold text-white mb-4">{col.heading}</p>
                <ul className="space-y-2.5">
                  {col.links.map(link => (
                    <li key={link.label}>
                      <a href={link.href} className="text-sm transition-colors hover:text-white" style={{ color: "#a8a8a8" }}>
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <p className="text-xs" style={{ color: "#a8a8a8" }}>&copy; 2026 IGINFULL. Built By ALJ. All rights reserved.</p>
          <div className="flex items-center gap-5">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} aria-label={label} className="transition-colors hover:text-white" style={{ color: "#a8a8a8" }}>
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
