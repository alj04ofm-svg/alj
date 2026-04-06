"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, Plus, Search, Star, TrendingUp, DollarSign,
  Globe, MessageCircle, Film, Mail, Phone, ChevronRight,
  MoreHorizontal, Filter, UserCheck, Clock, ExternalLink, Edit
} from "lucide-react";

const MODELS = [
  { id: 1, name: "Bella", stageName: "BellaNova", status: "active", tier: "Top", monthlyRevenue: "$12,840", newSubs: 48, retention: "94%", engagement: "8.2", color: "#d4a853", accounts: ["@bellanova_of"], joined: "Jan 2025" },
  { id: 2, name: "Mika", stageName: "MikaRose", status: "active", tier: "Star", monthlyRevenue: "$8,210", newSubs: 31, retention: "91%", engagement: "7.4", color: "#f0c97a", accounts: ["@mikarose_vip"], joined: "Mar 2025" },
  { id: 3, name: "Luna", stageName: "LunaNoir", status: "active", tier: "Premium", monthlyRevenue: "$6,340", newSubs: 22, retention: "88%", engagement: "6.1", color: "#a07830", accounts: ["@lunanoir_exclusive"], joined: "Aug 2024" },
  { id: 4, name: "Sofia", stageName: "SofiaStar", status: "active", tier: "Premium", monthlyRevenue: "$5,120", newSubs: 18, retention: "87%", engagement: "5.8", color: "#d4a853", accounts: ["@sofiastar_premium"], joined: "Nov 2024" },
  { id: 5, name: "Aria", stageName: "AriaBlaze", status: "paused", tier: "Rising", monthlyRevenue: "$2,840", newSubs: 12, retention: "82%", engagement: "5.2", color: "#f0c97a", accounts: ["@ariablaze"], joined: "Dec 2025" },
  { id: 6, name: "Nadia", stageName: "NadiaLux", status: "active", tier: "Rising", monthlyRevenue: "$3,190", newSubs: 15, retention: "85%", engagement: "5.5", color: "#a07830", accounts: ["@nadia_lux", "@nadia_chat"], joined: "Feb 2025" },
];

const TIER_COLORS: Record<string, string> = {
  Top: "#d4a853",
  Star: "#f0c97a",
  Premium: "#a07830",
  Rising: "#8a8070",
};

const STATUS_CONFIG = {
  active: { label: "Active", color: "var(--nva-green)" },
  paused: { label: "Paused", color: "var(--nva-amber)" },
  inactive: { label: "Inactive", color: "var(--nva-red)" },
};

export function ModelManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTier, setFilterTier] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedModel, setSelectedModel] = useState<typeof MODELS[0] | null>(null);

  const filtered = MODELS.filter(m => {
    const matchSearch = !searchQuery || m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.stageName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchTier = filterTier === "All" || m.tier === filterTier;
    const matchStatus = filterStatus === "All" || m.status === filterStatus;
    return matchSearch && matchTier && matchStatus;
  });

  const totalRevenue = MODELS.reduce((s, m) => s + parseInt(m.monthlyRevenue.replace(/[^0-9]/g, "")), 0);
  const activeModels = MODELS.filter(m => m.status === "active").length;

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--nva-text)", marginBottom: 4 }}>Model Management</h2>
          <p style={{ fontSize: 12, color: "var(--nva-muted)" }}>Manage all models and their accounts in one place</p>
        </div>
        <button className="btn-nva-primary">
          <Plus size={15} /> Add New Model
        </button>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {[
          { label: "Total Models", value: MODELS.length, sub: `${activeModels} active`, icon: Users, color: "var(--nva-gold)" },
          { label: "Total Monthly Revenue", value: `$${(totalRevenue / 1000).toFixed(1)}K`, sub: "Combined across all", icon: DollarSign, color: "var(--nva-green)" },
          { label: "New Subs This Month", value: "146", sub: "+23 vs last month", icon: TrendingUp, color: "var(--nva-gold)" },
          { label: "Avg. Engagement", value: "6.4", sub: "Across all accounts", icon: Star, color: "var(--nva-amber)" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="card-nva"
              style={{ padding: "18px" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: `${s.color}15`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={15} style={{ color: s.color }} />
                </div>
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, color: "var(--nva-text)", letterSpacing: "-0.02em" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "var(--nva-muted)", marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: 10, color: "var(--nva-green)", marginTop: 2 }}>{s.sub}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
          <Search size={13} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--nva-muted-2)" }} />
          <input
            className="input-nva"
            placeholder="Search by name or handle..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ paddingLeft: 34, height: 38, fontSize: 13 }}
          />
        </div>
        <select className="input-nva" value={filterTier} onChange={e => setFilterTier(e.target.value)} style={{ height: 38, fontSize: 12, width: 140, paddingLeft: 12 }}>
          <option>All</option>
          {["Top", "Star", "Premium", "Rising"].map(t => <option key={t}>{t}</option>)}
        </select>
        <select className="input-nva" value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ height: 38, fontSize: 12, width: 140, paddingLeft: 12 }}>
          <option>All</option>
          {["active", "paused", "inactive"].map(s => <option key={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      {/* Model Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
        {filtered.map((model, i) => {
          const statusCfg = STATUS_CONFIG[model.status as keyof typeof STATUS_CONFIG];
          const tierColor = TIER_COLORS[model.tier];
          return (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="card-nva"
              style={{ padding: "18px", cursor: "pointer" }}
              onClick={() => setSelectedModel(model)}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(212,168,83,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--nva-border)"; }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: `linear-gradient(135deg, ${model.color}30, ${model.color}15)`,
                  border: `1px solid ${model.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 18, fontWeight: 800, color: model.color, flexShrink: 0,
                }}>
                  {model.name[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: "var(--nva-text)" }}>{model.name}</span>
                    <span style={{
                      padding: "2px 8px", borderRadius: 10, fontSize: 9, fontWeight: 700,
                      background: `${statusCfg.color}15`, border: `1px solid ${statusCfg.color}25`,
                      color: statusCfg.color,
                    }}>
                      {statusCfg.label}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: "var(--nva-muted)" }}>{model.stageName} · Joined {model.joined}</div>
                </div>
                <span style={{
                  padding: "3px 10px", borderRadius: 8, fontSize: 10, fontWeight: 700,
                  background: `${tierColor}18`, border: `1px solid ${tierColor}30`,
                  color: tierColor,
                }}>
                  {model.tier}
                </span>
              </div>

              {/* Metrics */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 14 }}>
                {[
                  { label: "Revenue", value: model.monthlyRevenue, icon: DollarSign },
                  { label: "New Subs", value: `+${model.newSubs}`, icon: TrendingUp },
                  { label: "Retention", value: model.retention, icon: UserCheck },
                  { label: "Engage", value: `${model.engagement}%`, icon: Star },
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <div key={m.label} style={{ padding: "8px", borderRadius: 8, background: "var(--nva-surface-2)", textAlign: "center" }}>
                      <Icon size={11} style={{ color: "var(--nva-muted)", margin: "0 auto 4px", display: "block" }} />
                      <div style={{ fontSize: 13, fontWeight: 800, color: "var(--nva-text)" }}>{m.value}</div>
                      <div style={{ fontSize: 9, color: "var(--nva-muted)" }}>{m.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Accounts */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {model.accounts.map((acc) => (
                  <span key={acc} style={{ padding: "3px 10px", borderRadius: 6, background: "rgba(88,101,242,0.08)", border: "1px solid rgba(88,101,242,0.15)", fontSize: 10, color: "#5865F2", display: "flex", alignItems: "center", gap: 4 }}>
                    <Globe size={9} /> {acc}
                  </span>
                ))}
                <span style={{ padding: "3px 10px", borderRadius: 6, background: "var(--nva-surface-2)", border: "1px solid var(--nva-border)", fontSize: 10, color: "var(--nva-muted)" }}>
                  <MessageCircle size={9} style={{ display: "inline", marginRight: 3 }} />
                  Chat assigned
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px 0", color: "var(--nva-muted)" }}>
          <Users size={32} style={{ margin: "0 auto 12px", display: "block", opacity: 0.4 }} />
          <p style={{ fontSize: 14, fontWeight: 600 }}>No models found</p>
          <p style={{ fontSize: 12 }}>Try adjusting your search or filters</p>
        </div>
      )}

      {/* Model Detail Modal */}
      {selectedModel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedModel(null)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={e => e.stopPropagation()}
            className="card-nva"
            style={{ width: "100%", maxWidth: 560, padding: 0, overflow: "hidden" }}
          >
            <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--nva-border)", display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: `linear-gradient(135deg, ${selectedModel.color}30, ${selectedModel.color}15)`,
                border: `1px solid ${selectedModel.color}30`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22, fontWeight: 800, color: selectedModel.color,
              }}>
                {selectedModel.name[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "var(--nva-text)" }}>{selectedModel.name}</div>
                <div style={{ fontSize: 12, color: "var(--nva-muted)" }}>{selectedModel.stageName} · Joined {selectedModel.joined}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 6 }}>
                  <span className="badge-nva badge-complete">{selectedModel.status}</span>
                  <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 10, fontWeight: 700, background: `${TIER_COLORS[selectedModel.tier]}18`, border: `1px solid ${TIER_COLORS[selectedModel.tier]}30`, color: TIER_COLORS[selectedModel.tier] }}>
                    {selectedModel.tier}
                  </span>
                </div>
              </div>
              <button onClick={() => setSelectedModel(null)} style={{ width: 30, height: 30, borderRadius: 8, background: "var(--nva-surface-2)", border: "1px solid var(--nva-border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--nva-muted)" }}>
                ✕
              </button>
            </div>
            <div style={{ padding: "20px 24px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 18 }}>
                {[
                  { label: "Monthly Revenue", value: selectedModel.monthlyRevenue },
                  { label: "New Subs", value: `+${selectedModel.newSubs}` },
                  { label: "Retention Rate", value: selectedModel.retention },
                  { label: "Engagement", value: `${selectedModel.engagement}%` },
                ].map(m => (
                  <div key={m.label} style={{ padding: "12px", borderRadius: 10, background: "var(--nva-surface-2)", textAlign: "center" }}>
                    <div style={{ fontSize: 16, fontWeight: 800, color: "var(--nva-gold)" }}>{m.value}</div>
                    <div style={{ fontSize: 10, color: "var(--nva-muted)", marginTop: 2 }}>{m.label}</div>
                  </div>
                ))}
              </div>

              <h4 style={{ fontSize: 13, fontWeight: 700, color: "var(--nva-text)", marginBottom: 10 }}>Accounts Managed</h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
                {selectedModel.accounts.map(acc => (
                  <div key={acc} style={{ padding: "12px 14px", borderRadius: 10, background: "var(--nva-surface-2)", border: "1px solid var(--nva-border)", display: "flex", alignItems: "center", gap: 10 }}>
                    <Globe size={15} style={{ color: "#E1306C" }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--nva-text)", flex: 1 }}>{acc}</span>
                    <button style={{ padding: "5px 10px", borderRadius: 6, background: "rgba(212,168,83,0.08)", border: "1px solid rgba(212,168,83,0.15)", cursor: "pointer", fontSize: 10, color: "var(--nva-gold)", fontWeight: 600 }}>
                      <ExternalLink size={9} style={{ marginRight: 3, display: "inline" }} />
                      Open
                    </button>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn-nva-primary" style={{ flex: 1 }}>
                  <Edit size={13} /> Edit Profile
                </button>
                <button className="btn-nva-secondary" style={{ flex: 1 }}>
                  <Film size={13} /> View Content
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
