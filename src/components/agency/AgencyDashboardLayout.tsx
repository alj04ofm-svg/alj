"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Users, MessageSquare, Megaphone, Clock,
  BarChart3, FolderOpen, ChevronLeft, ChevronRight,
  Shield, LogOut, Settings, Bell, Search, User,
  Zap, HelpCircle
} from "lucide-react";

export type AgencyView =
  | "landing"
  | "chatter-onboarding"
  | "marketing-onboarding"
  | "model-requests"
  | "time-tracking"
  | "analytics"
  | "model-management";

const NAV_ITEMS: { id: AgencyView; label: string; icon: React.ElementType; badge?: string }[] = [
  { id: "landing", label: "Overview", icon: LayoutDashboard },
  { id: "chatter-onboarding", label: "Chatter Onboarding", icon: MessageSquare, badge: "New" },
  { id: "marketing-onboarding", label: "Marketing Onboarding", icon: Megaphone, badge: "New" },
  { id: "model-requests", label: "Model Requests", icon: FolderOpen },
  { id: "time-tracking", label: "NV Time Bot", icon: Clock },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "model-management", label: "Model Management", icon: Users },
];

interface Props {
  activeView: AgencyView;
  onViewChange: (v: AgencyView) => void;
  children: React.ReactNode;
}

export function AgencyDashboardLayout({ activeView, onViewChange, children }: Props) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const activeItem = NAV_ITEMS.find((n) => n.id === activeView) ?? NAV_ITEMS[0];

  return (
    <div className="nva-root" style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* ── Sidebar ── */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 68 : 248 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          background: "var(--nva-surface)",
          borderRight: "1px solid var(--nva-border)",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          overflow: "hidden",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "20px 16px 16px",
            borderBottom: "1px solid var(--nva-border)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            minHeight: 72,
          }}
        >
          <div
            className="gradient-nva"
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontWeight: 900,
              fontSize: 13,
              color: "#0a0a0f",
              letterSpacing: "-0.02em",
            }}
          >
            NV
          </div>
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.2 }}
                style={{ overflow: "hidden", whiteSpace: "nowrap" }}
              >
                <div style={{ fontSize: 14, fontWeight: 800, color: "var(--nva-text)", letterSpacing: "-0.01em" }}>
                  New Valor
                </div>
                <div style={{ fontSize: 10, color: "var(--nva-muted)", fontWeight: 500, letterSpacing: "0.05em" }}>
                  AGENCY
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Search */}
        {!sidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ padding: "12px 12px 8px" }}
          >
            <div style={{ position: "relative" }}>
              <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--nva-muted-2)" }} />
              <input
                className="input-nva"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ paddingLeft: 30, fontSize: 12, height: 34 }}
              />
            </div>
          </motion.div>
        )}

        {/* Nav items */}
        <nav style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "4px 8px" }} className="nva-scrollbar">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                title={sidebarCollapsed ? item.label : undefined}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "9px 10px",
                  borderRadius: 10,
                  marginBottom: 2,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  background: isActive ? "rgba(212,168,83,0.12)" : "transparent",
                  border: isActive ? "1px solid rgba(212,168,83,0.2)" : "1px solid transparent",
                  color: isActive ? "var(--nva-gold)" : "var(--nva-muted)",
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 500,
                  textAlign: "left",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(212,168,83,0.06)";
                    e.currentTarget.style.color = "var(--nva-text)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "var(--nva-muted)";
                  }
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="nva-active"
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "20%",
                      bottom: "20%",
                      width: 3,
                      borderRadius: 2,
                      background: "var(--nva-gold)",
                    }}
                  />
                )}
                <Icon size={16} style={{ flexShrink: 0 }} />
                {!sidebarCollapsed && (
                  <span style={{ overflow: "hidden", whiteSpace: "nowrap", flex: 1 }}>{item.label}</span>
                )}
                {!sidebarCollapsed && item.badge && (
                  <span
                    style={{
                      background: "var(--nva-gold)",
                      color: "#0a0a0f",
                      fontSize: 9,
                      fontWeight: 700,
                      padding: "2px 6px",
                      borderRadius: 10,
                      letterSpacing: "0.05em",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div
          style={{
            padding: "8px 8px 16px",
            borderTop: "1px solid var(--nva-border)",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <button
            onClick={() => onViewChange("landing")}
            title="Help"
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: "9px 10px", borderRadius: 10, cursor: "pointer",
              background: "transparent", border: "none",
              color: "var(--nva-muted)", fontSize: 13, fontWeight: 500,
              textAlign: "left", transition: "all 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,168,83,0.06)"; e.currentTarget.style.color = "var(--nva-text)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--nva-muted)"; }}
          >
            <HelpCircle size={16} style={{ flexShrink: 0 }} />
            {!sidebarCollapsed && <span>Help & Support</span>}
          </button>
          <button
            onClick={() => onViewChange("landing")}
            title="Settings"
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: "9px 10px", borderRadius: 10, cursor: "pointer",
              background: "transparent", border: "none",
              color: "var(--nva-muted)", fontSize: 13, fontWeight: 500,
              textAlign: "left", transition: "all 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,168,83,0.06)"; e.currentTarget.style.color = "var(--nva-text)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--nva-muted)"; }}
          >
            <Settings size={16} style={{ flexShrink: 0 }} />
            {!sidebarCollapsed && <span>Settings</span>}
          </button>

          {/* User profile */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "10px",
              borderRadius: 10,
              background: "var(--nva-surface-2)",
              marginTop: 4,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #d4a853, #f0c97a)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontWeight: 700,
                fontSize: 12,
                color: "#0a0a0f",
              }}
            >
              NV
            </div>
            {!sidebarCollapsed && (
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--nva-text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  Admin
                </div>
                <div style={{ fontSize: 10, color: "var(--nva-muted)" }}>Owner</div>
              </div>
            )}
          </div>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          style={{
            position: "absolute",
            top: "50%",
            right: -12,
            transform: "translateY(-50%)",
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "var(--nva-surface-2)",
            border: "1px solid var(--nva-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "var(--nva-muted)",
            zIndex: 20,
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--nva-border-hover)"; e.currentTarget.style.color = "var(--nva-gold)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--nva-border)"; e.currentTarget.style.color = "var(--nva-muted)"; }}
        >
          {sidebarCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </motion.aside>

      {/* ── Main content ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <header
          style={{
            height: 64,
            borderBottom: "1px solid var(--nva-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 28px",
            flexShrink: 0,
            background: "rgba(10,10,15,0.8)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div>
            <h1 style={{ fontSize: 15, fontWeight: 700, color: "var(--nva-text)" }}>
              {activeItem.label}
            </h1>
            <p style={{ fontSize: 11, color: "var(--nva-muted)", marginTop: 1 }}>
              New Valor Agency — Internal Dashboard
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button
              style={{
                width: 36, height: 36, borderRadius: 10,
                background: "var(--nva-surface)", border: "1px solid var(--nva-border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "var(--nva-muted)", position: "relative",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--nva-border-hover)"; e.currentTarget.style.color = "var(--nva-gold)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--nva-border)"; e.currentTarget.style.color = "var(--nva-muted)"; }}
            >
              <Bell size={15} />
              <span style={{
                position: "absolute", top: 7, right: 7, width: 7, height: 7,
                borderRadius: "50%", background: "#ef4444", border: "1.5px solid var(--nva-surface)",
              }} />
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 8, paddingLeft: 8, borderLeft: "1px solid var(--nva-border)" }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--nva-text)" }}>Admin</div>
                <div style={{ fontSize: 10, color: "var(--nva-muted)" }}>New Valor Agency</div>
              </div>
              <div style={{
                width: 34, height: 34, borderRadius: "50%",
                background: "linear-gradient(135deg, #d4a853, #f0c97a)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 12, color: "#0a0a0f",
                cursor: "pointer",
              }}>
                NV
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main
          style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}
          className="nva-scrollbar"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ padding: "28px" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
