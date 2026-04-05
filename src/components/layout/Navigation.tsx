"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Menu, X, UserCircle, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";

const mainNavLinks = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Who It's For", href: "/#who" },
  { label: "How It Works", href: "/#how" },
];

const moreLinks = [
  { label: "Dashboard", href: "/schedule" },
  { label: "Content Pipeline", href: "/content" },
  { label: "Model Platform", href: "/models" },
  { label: "Analytics", href: "/analytics" },
  { label: "Community", href: "/community" },
  { label: "Approvals", href: "/approvals" },
  { label: "Team", href: "/team" },
  { label: "Settings", href: "/settings" },
];

export function Navigation() {
  const [moreOpen, setMoreOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300"
      style={{
        borderColor: "var(--border)",
        backgroundColor: "rgba(15,0,40,0.85)",
        backdropFilter: "blur(20px)",
        boxShadow: scrolled ? "0 0 20px rgba(255,0,105,0.15), 0 0 40px rgba(255,0,105,0.05)" : "none",
        borderBottomColor: scrolled ? "rgba(255,0,105,0.35)" : "var(--border)",
        animation: scrolled ? "nav-glow 3s ease-in-out infinite" : "none",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl gradient-ig flex items-center justify-center shadow-lg flex-shrink-0">
            <span className="text-white font-black text-[11px] tracking-tight">IG</span>
          </div>
          <span className="text-lg font-black tracking-tight text-white">IGINFULL</span>
          <span
            className="hidden sm:inline text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{
              background: "linear-gradient(90deg, rgba(131,58,180,0.4), rgba(255,0,105,0.4), rgba(252,175,69,0.4))",
              backgroundSize: "200% 200%",
              color: "#ff0069",
              animation: "shimmer-badge 3s ease infinite",
            }}
          >
            Built By ALJ
          </span>
        </Link>

        {/* Center Links — desktop */}
        <div className="hidden lg:flex items-center gap-0.5">
          {mainNavLinks.map((link) => (
            <div key={link.label} className="relative">
              <a
                href={link.href}
                className="nav-link px-4 py-2 text-sm rounded-lg transition-colors hover:text-white hover:bg-white/5"
                style={{ color: "var(--muted-foreground)" }}
              >
                {link.label}
              </a>
            </div>
          ))}

          <div className="relative">
            <button
              onClick={() => router.push("/schedule")}
              className="nav-link ml-1 flex items-center gap-1 px-4 py-2 text-sm rounded-lg transition-colors hover:text-white hover:bg-white/5"
              style={{ color: "var(--muted-foreground)" }}
            >
              Platform
              <ChevronDown size={12} className="inline ml-1" />
            </button>
          </div>

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMoreOpen((o) => !o)}
              className="nav-link flex items-center gap-1 px-4 py-2 text-sm rounded-lg transition-colors hover:text-white hover:bg-white/5"
              style={{ color: "var(--muted-foreground)" }}
            >
              More
              <ChevronDown
                size={12}
                className={`transition-transform ${moreOpen ? "rotate-180" : ""}`}
              />
            </button>
            {moreOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setMoreOpen(false)} />
                <div
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-52 rounded-xl overflow-hidden z-50"
                  style={{
                    backgroundColor: "rgba(20,20,20,0.85)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderTop: "2px solid transparent",
                    borderImage: "linear-gradient(90deg, #833ab4, #ff0069, #fcaf45) 1",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  {moreLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMoreOpen(false)}
                      className="flex items-center px-4 py-2.5 text-sm transition-colors hover:text-white hover:bg-white/5"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/schedule"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:text-white hover:bg-white/5"
            style={{ color: "var(--muted-foreground)" }}
          >
            <UserCircle className="w-4 h-4" />
            Dashboard
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:scale-110"
            style={{
              backgroundColor: "var(--secondary)",
              border: "1px solid var(--border)",
              color: "var(--foreground)",
            }}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {theme === "dark"
                  ? <Sun size={15} className="text-amber-400" />
                  : <Moon size={15} className="text-[#833ab4]" />
                }
              </motion.div>
            </AnimatePresence>
          </button>

          <Link
            href="/#cta"
            className="h-9 px-5 inline-flex items-center justify-center rounded-xl text-sm font-bold text-white gradient-ig transition-all hover:shadow-[0_0_30px_rgba(255,0,105,0.5)] hover:scale-105"
            style={{ animation: "glow-nav-item 2.5s ease-in-out infinite" }}
          >
            Start Free
          </Link>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors"
            style={{ color: "var(--muted-foreground)" }}
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="lg:hidden border-t"
          style={{ borderColor: "var(--sidebar-border)", backgroundColor: "var(--sidebar)" }}
        >
          <div className="px-4 py-3 space-y-0.5">
            {mainNavLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm transition-colors hover:text-white hover:bg-white/5"
                style={{ color: "var(--muted-foreground)" }}
              >
                {link.label}
              </a>
            ))}
            <div className="border-t my-2" style={{ borderColor: "var(--border)" }} />
            {moreLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm transition-colors hover:text-white hover:bg-white/5"
                style={{ color: "var(--muted-foreground)" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 2px;
          left: 50%;
          width: calc(100% - 16px);
          height: 2px;
          background: linear-gradient(90deg, #ff0069, #fcaf45);
          border-radius: 2px;
          transform: translateX(-50%) scaleX(0);
          transform-origin: left;
          transition: transform 0.25s cubic-bezier(0.25, 0.1, 0.25, 1);
        }
        .nav-link:hover::after {
          transform: translateX(-50%) scaleX(1);
        }
      `}</style>
    </nav>
  );
}
