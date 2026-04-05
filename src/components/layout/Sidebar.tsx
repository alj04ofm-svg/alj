"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  Calendar, FileText, BarChart2, MessageCircle, CheckCircle, Users,
  Settings, ChevronRight, ChevronLeft, Users2, Sparkles,
} from "lucide-react";
import { useState } from "react";

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { icon: Calendar, label: "Schedule", href: "/schedule" },
  { icon: FileText, label: "Content", href: "/content" },
  { icon: Sparkles, label: "Ideas", href: "/ideas" },
  { icon: Users2, label: "Models", href: "/models" },
  { icon: BarChart2, label: "Analytics", href: "/analytics" },
  { icon: MessageCircle, label: "Community", href: "/community" },
  { icon: CheckCircle, label: "Approvals", href: "/approvals" },
  { icon: Users, label: "Team", href: "/team" },
];

const ACCOUNTS = [
  { handle: "@abg.ricebunny", initials: "T", color: "#ff0069", label: "Tyler — Gay Bear Fitness" },
  { handle: "@onlytylerrex", initials: "T", color: "#fcaf45", label: "Tyler Rex — Fitness" },
  { handle: "@rhinxrenx", initials: "R", color: "#833ab4", label: "Ren — ABG" },
  { handle: "@ellamira", initials: "E", color: "#78c257", label: "Ella — Lifestyle" },
];

interface SidebarProps {
  showCollapseToggle?: boolean;
}

const springTransition = {
  type: "spring" as const,
  stiffness: 280,
  damping: 26,
};

const accountVariants: Variants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
  exit: {
    opacity: 0,
    y: -4,
    scale: 0.97,
    transition: { duration: 0.15 },
  },
};

export function Sidebar({ showCollapseToggle = true }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(ACCOUNTS[0]);
  const [accountsOpen, setAccountsOpen] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 240 }}
      transition={springTransition}
      className="flex-shrink-0 flex flex-col h-screen sticky top-0 relative"
      style={{ backgroundColor: "var(--sidebar)", borderRight: "1px solid var(--sidebar-border)" }}
    >
      {/* Collapse toggle */}
      {showCollapseToggle && (
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="absolute top-20 z-10 w-6 h-6 rounded-full flex items-center justify-center text-xs transition-all hover:scale-110"
          style={{
            right: collapsed ? -14 : -14,
            backgroundColor: "#1f1f1f",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          {collapsed ? (
            <ChevronRight className="w-3 h-3" style={{ color: "var(--muted-foreground)" }} />
          ) : (
            <ChevronLeft className="w-3 h-3" style={{ color: "var(--muted-foreground)" }} />
          )}
        </button>
      )}

      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 px-4 py-5 border-b transition-all hover:opacity-80"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <motion.div
          whileHover={{ rotate: 5, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-8 h-8 rounded-xl gradient-ig flex items-center justify-center text-[9px] font-black text-white flex-shrink-0"
        >
          IG
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="overflow-hidden"
        >
          <span className="font-bold text-white tracking-tight text-sm whitespace-nowrap">IGINFULL</span>
        </motion.div>
      </Link>

      {/* Account selector */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            key="account-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="px-3 py-3 border-b"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <button
              onClick={() => setAccountsOpen((o) => !o)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors hover:bg-white/5"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{ backgroundColor: selectedAccount.color }}
              >
                {selectedAccount.initials}
              </div>
              <div className="flex-1 text-left min-w-0">
                <p className="text-white font-medium truncate text-sm">{selectedAccount.handle}</p>
                <p className="text-[10px] truncate" style={{ color: "var(--muted-foreground)" }}>
                  {selectedAccount.label}
                </p>
              </div>
              <ChevronRight
                className={`w-3 h-3 transition-transform flex-shrink-0 ${accountsOpen ? "rotate-90" : ""}`}
                style={{ color: "var(--muted-foreground)" }}
              />
            </button>

            {/* Account dropdown with spring animation */}
            <AnimatePresence>
              {accountsOpen && (
                <motion.div
                  key="account-dropdown"
                  variants={accountVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="mt-2 rounded-xl overflow-hidden"
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    backgroundColor: "#1a1a1a",
                  }}
                >
                  {ACCOUNTS.map((acc) => (
                    <button
                      key={acc.handle}
                      onClick={() => {
                        setSelectedAccount(acc);
                        setAccountsOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-sm transition-colors hover:bg-white/5"
                      style={
                        selectedAccount.handle === acc.handle
                          ? { backgroundColor: "rgba(255,0,105,0.08)" }
                          : {}
                      }
                    >
                      <div
                        className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold text-white"
                        style={{ backgroundColor: acc.color }}
                      >
                        {acc.initials}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-white text-xs font-medium">{acc.handle}</p>
                        <p className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>
                          {acc.label}
                        </p>
                      </div>
                      {selectedAccount.handle === acc.handle && (
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: "#ff0069" }}
                        />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={[
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group",
                active ? "glow-active-pulse" : "glow-nav-item",
              ].join(" ")}
              style={{
                backgroundColor: active ? "rgba(255,0,105,0.1)" : "transparent",
                color: active ? "#ff0069" : "#a8a8a8",
                border: active
                  ? "1px solid rgba(255,0,105,0.2)"
                  : "1px solid transparent",
              }}
              title={collapsed ? label : undefined}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex-1 whitespace-nowrap"
                >
                  {label}
                </motion.span>
              )}
            </Link>
          );
        })}

        {/* Settings at bottom */}
        <Link
          key="settings"
          href="/settings"
          className={[
            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all glow-nav-item",
            pathname === "/settings" ? "glow-active-pulse" : "",
          ].join(" ")}
          style={{
            color: pathname === "/settings" ? "#ff0069" : "#a8a8a8",
            backgroundColor: pathname === "/settings" ? "rgba(255,0,105,0.1)" : "transparent",
            border:
              pathname === "/settings"
                ? "1px solid rgba(255,0,105,0.2)"
                : "1px solid transparent",
          }}
          title={collapsed ? "Settings" : undefined}
        >
          <Settings className="w-4 h-4 flex-shrink-0" />
          {!collapsed && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="whitespace-nowrap">
              Settings
            </motion.span>
          )}
        </Link>
      </nav>

      {/* Upgrade Banner */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            key="upgrade-banner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="px-3 py-3 border-t"
            style={{ borderColor: "rgba(255,255,255,0.06)" }}
          >
            <div
              className="rounded-xl p-3"
              style={{
                background: "linear-gradient(135deg, rgba(131,58,180,0.15) 0%, rgba(255,0,105,0.1) 100%)",
                border: "1px solid rgba(131,58,180,0.25)",
              }}
            >
              <p className="text-white text-xs font-semibold mb-0.5">IGINFULL Pro</p>
              <p className="text-[10px] mb-2" style={{ color: "var(--muted-foreground)" }}>
                Unlimited clips, AI enhance, Drive sync
              </p>
              <button className="w-full py-1.5 rounded-lg text-[10px] font-bold text-white transition-all hover:opacity-90 gradient-ig">
                Upgrade
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient glow + User Profile */}
      <div className="relative">
        {/* Ambient glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background: "linear-gradient(to top, rgba(255,0,105,0.06) 0%, transparent 100%)",
            animation: "ambient-pulse 4s ease-in-out infinite",
          }}
        />
        <div
          className="px-3 py-3 border-t relative z-10"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors hover:bg-white/5">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #833ab4, #ff0069)" }}
            >
              A
            </div>
            {!collapsed && (
              <div className="flex-1 text-left min-w-0">
                <p className="text-white text-xs font-medium truncate">Alex / ALJ</p>
                <p className="text-[10px]" style={{ color: "var(--muted-foreground)" }}>
                  Admin
                </p>
              </div>
            )}
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
