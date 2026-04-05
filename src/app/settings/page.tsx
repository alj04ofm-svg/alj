"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Link2,
  Puzzle,
  Sliders,
  Users,
  CreditCard,
  Bell,
  MessageSquare,
  BellRing,
  Globe,
  Check,
  AlertCircle,
  ChevronRight,
  Plus,
  ExternalLink,
  FolderOpen,
  Zap,
  Hash,
  Shield,
  Gift,
  FileText,
  Download,
} from "lucide-react";

type Tab = "profile" | "accounts" | "integrations" | "content" | "team" | "billing";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "profile",       label: "Profile",               icon: <User size={16} /> },
  { id: "accounts",     label: "Connected Accounts",    icon: <Link2 size={16} /> },
  { id: "integrations", label: "Integrations",          icon: <Puzzle size={16} /> },
  { id: "content",      label: "Content Defaults",      icon: <Sliders size={16} /> },
  { id: "team",         label: "Team & Permissions",    icon: <Users size={16} /> },
  { id: "billing",      label: "Billing",               icon: <CreditCard size={16} /> },
];

// ─── Framer Motion Toggle ─────────────────────────────────────────────────────

function AnimatedToggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className="relative w-11 h-6 rounded-full transition-colors"
      style={{ backgroundColor: checked ? "#ff0069" : "#2a2a2a" }}
      aria-checked={checked}
      role="switch"
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 rounded-full bg-white block"
        animate={{ x: checked ? 22 : 3 }}
        style={{ left: 0 }}
      />
    </button>
  );
}

// ─── Profile Tab ──────────────────────────────────────────────────────────────

function ProfileTab() {
  const [toggles, setToggles] = useState({ email: true, slack: false, push: true });

  return (
    <motion.div
      key="profile"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.22 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Profile</h2>
        <p className="text-sm" style={{ color: "#a8a8a8" }}>Manage your personal account settings.</p>
      </div>

      <div className="rounded-xl p-6 border" style={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-5 mb-6">
          {/* Avatar with hover rotation */}
          <div className="settings-avatar-wrapper w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg gradient-ig-warm">
            AL
          </div>
          <div>
            <p className="text-white font-medium text-lg">Alex / ALJ</p>
            <p className="text-sm" style={{ color: "#a8a8a8" }}>alex@alj.co</p>
            <p className="text-sm" style={{ color: "#a8a8a8" }}>Asia/Manila (UTC+8)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Display Name", value: "Alex / ALJ" },
            { label: "Email", value: "alex@alj.co" },
            { label: "Timezone", value: "Asia/Manila (UTC+8)" },
            { label: "Role", value: "Admin" },
          ].map((field) => (
            <div key={field.label}>
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "#a8a8a8" }}>{field.label}</p>
              <p className="text-white">{field.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl p-6 border" style={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.08)" }}>
        <h3 className="text-white font-medium mb-4">Notifications</h3>
        <div className="space-y-4">
          {[
            { key: "email", label: "Email alerts",       desc: "Get notified via email for important updates",         icon: <Bell size={16}      style={{ color: "#ff0069" }} /> },
            { key: "slack", label: "Slack notifications",desc: "Push updates to your Slack workspace",                icon: <MessageSquare size={16} style={{ color: "#833ab4" }} /> },
            { key: "push",  label: "Push notifications", desc: "In-app and browser push notifications",               icon: <BellRing size={16}  style={{ color: "#fcaf45" }} /> },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {item.icon}
                <div>
                  <p className="text-white text-sm">{item.label}</p>
                  <p className="text-xs" style={{ color: "#a8a8a8" }}>{item.desc}</p>
                </div>
              </div>
              <AnimatedToggle
                checked={toggles[item.key as keyof typeof toggles]}
                onChange={() => setToggles((t) => ({ ...t, [item.key]: !t[item.key as keyof typeof t] }))}
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Connected Accounts Tab ───────────────────────────────────────────────────

function ConnectedAccountsTab() {
  const accounts = [
    { handle: "@abg.ricebunny", name: "Tyler",    followers: "5,340", connected: true  },
    { handle: "@onlytylerrex",  name: "Tyler Rex",followers: "1,200", connected: true  },
    { handle: "@rhinxrenx",     name: "Ren",       followers: "3,100", connected: true  },
    { handle: "@ellamira",      name: "Ella",      followers: "2,800", connected: false },
  ];

  return (
    <motion.div
      key="accounts"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.22 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Connected Accounts</h2>
        <p className="text-sm" style={{ color: "#a8a8a8" }}>Manage your Instagram accounts linked to IGINFULL.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {accounts.map((acc) => (
          <div
            key={acc.handle}
            className="rounded-xl p-5 border"
            style={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-ig flex items-center justify-center text-white text-xs font-bold">
                  {acc.name.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{acc.handle}</p>
                  <p className="text-xs" style={{ color: "#a8a8a8" }}>{acc.name}</p>
                </div>
              </div>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{
                  backgroundColor: acc.connected ? "rgba(34,197,94,0.15)" : "rgba(255,166,0,0.15)",
                  color: acc.connected ? "#22c55e" : "#ffa600",
                }}
              >
                {acc.connected ? "Connected" : "Not Connected"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-xs" style={{ color: "#a8a8a8" }}>{acc.followers.toLocaleString()} followers</p>
              {acc.connected ? (
                <span className="flex items-center gap-1 text-xs" style={{ color: "#22c55e" }}>
                  <Check size={12} /> Active
                </span>
              ) : (
                <span className="flex items-center gap-1 text-xs" style={{ color: "#ffa600" }}>
                  <AlertCircle size={12} /> Reconnect
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-3 rounded-xl text-white font-medium text-sm gradient-ig flex items-center justify-center gap-2">
        <Plus size={16} />
        Connect New Account
      </button>
    </motion.div>
  );
}

// ─── Integrations Tab ─────────────────────────────────────────────────────────

function IntegrationsTab() {
  const integrations = [
    { name: "Google Drive",  status: true,  lastSynced: "2h ago", icon: <FolderOpen   size={20} style={{ color: "#4285f4" }} />, note: "Auto-sync clips to Drive" },
    { name: "Airtable",       status: true,  lastSynced: "1h ago", icon: <Zap          size={20} style={{ color: "#ff0069" }} />, note: "Pipeline & content management" },
    { name: "Telegram Bot",   status: true,  lastSynced: "5m ago", icon: <Globe        size={20} style={{ color: "#0088cc" }} />, note: "@NVTIMEBOT" },
    { name: "Meta Graph API", status: false, lastSynced: null,     icon: <ExternalLink size={20} style={{ color: "#833ab4" }} />, note: "Post scheduling & insights" },
  ];

  return (
    <motion.div
      key="integrations"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.22 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Integrations</h2>
        <p className="text-sm" style={{ color: "#a8a8a8" }}>Connect and manage third-party services.</p>
      </div>

      <div className="space-y-3">
        {integrations.map((intg) => (
          <div
            key={intg.name}
            className="rounded-xl p-5 border"
            style={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                  {intg.icon}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{intg.name}</p>
                  <p className="text-xs" style={{ color: "#a8a8a8" }}>{intg.note}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {intg.status ? (
                  <>
                    <div className="text-right hidden sm:block">
                      <p className="text-xs" style={{ color: "#a8a8a8" }}>Last synced</p>
                      <p className="text-xs text-white">{intg.lastSynced}</p>
                    </div>
                    {/* Breathing glow dot */}
                    <span className="connected-glow relative w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#22c55e" }} />
                    <button className="text-xs px-3 py-1.5 rounded-lg border text-white" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                      Configure
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: "rgba(255,166,0,0.15)", color: "#ffa600" }}>
                      Not Connected
                    </span>
                    <button className="text-xs px-3 py-1.5 rounded-lg text-white font-medium"
                      style={{ background: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcaf45 100%)" }}>
                      Connect
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ─── Content Defaults Tab ─────────────────────────────────────────────────────

function ContentDefaultsTab() {
  const [autoEnhance, setAutoEnhance]   = useState(true);
  const [autoHashtags, setAutoHashtags] = useState(true);
  const [sliderVal, setSliderVal]       = useState(50);

  return (
    <motion.div
      key="content"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.22 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Content Defaults</h2>
        <p className="text-sm" style={{ color: "#a8a8a8" }}>Set default behaviours for content generation and posting.</p>
      </div>

      <div className="rounded-xl p-6 border space-y-5" style={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.08)" }}>
        <h3 className="text-white font-medium text-sm">Model & Niche</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Default Niche", options: ["GFE", "Fitness", "Meme", "Thirst Trap", "Lifestyle"] },
            { label: "Default Model", options: ["Ella", "Amam", "Ren", "Tyler"] },
          ].map((sel) => (
            <div key={sel.label}>
              <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "#a8a8a8" }}>{sel.label}</p>
              <select
                className="w-full rounded-lg px-3 py-2 text-sm text-white border appearance-none cursor-pointer"
                style={{ backgroundColor: "#1e1e1e", borderColor: "rgba(255,255,255,0.08)" }}
              >
                {sel.options.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl p-6 border" style={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.08)" }}>
        <h3 className="text-white font-medium text-sm mb-4">AI Enhancement</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Auto-enhance clips</p>
              <p className="text-xs" style={{ color: "#a8a8a8" }}>Automatically enhance video clips on upload</p>
            </div>
            <AnimatedToggle checked={autoEnhance} onChange={() => setAutoEnhance(v => !v)} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <p className="text-xs" style={{ color: "#a8a8a8" }}>Enhancement level</p>
              <p className="text-xs font-medium text-white">{sliderVal < 33 ? "Subtle" : sliderVal < 66 ? "Moderate" : "Aggressive"}</p>
            </div>
            <input type="range" min={0} max={100} value={sliderVal}
              onChange={(e) => setSliderVal(Number(e.target.value))}
              className="w-full accent-pink-500" />
          </div>
        </div>
      </div>

      <div className="rounded-xl p-6 border space-y-4" style={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.08)" }}>
        <h3 className="text-white font-medium text-sm">Posting Defaults</h3>
        <div>
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "#a8a8a8" }}>Default Drive Folder</p>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
            style={{ backgroundColor: "#1e1e1e", border: "1px solid rgba(255,255,255,0.08)" }}>
            <FolderOpen size={14} style={{ color: "#a8a8a8" }} />
            <span style={{ color: "#a8a8a8" }}>IGINFULL Content / {"{account}"}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white text-sm flex items-center gap-1.5">
              <Hash size={14} style={{ color: "#ff0069" }} /> Auto-generate hashtags
            </p>
            <p className="text-xs" style={{ color: "#a8a8a8" }}>Generate relevant hashtags for each post</p>
          </div>
          <AnimatedToggle checked={autoHashtags} onChange={() => setAutoHashtags(v => !v)} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "#a8a8a8" }}>Default Post Time</p>
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="w-4 h-4 rounded-full flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #833ab4 0%, #fd1d1d 50%, #fcaf45 100%)" }}>
              <span className="w-2 h-2 rounded-full bg-white" />
            </div>
            <span className="text-sm text-white">Best performing hours</span>
            <span className="text-xs ml-1" style={{ color: "#a8a8a8" }}>(recommended)</span>
          </label>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Team Tab ──────────────────────────────────────────────────────────────────

function TeamTab() {
  const members = [
    { name: "Alex / ALJ", email: "alex@alj.co",  role: "Admin",  badge: "bg-pink-600"  },
    { name: "Tyler",       email: "tyler@alj.co",  role: "Editor", badge: "bg-purple-600" },
    { name: "Ren",         email: "ren@alj.co",    role: "Viewer", badge: "bg-gray-600"  },
  ];

  return (
    <motion.div
      key="team"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.22 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white mb-1">Team & Permissions</h2>
          <p className="text-sm" style={{ color: "#a8a8a8" }}>Manage team members and their access levels.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium gradient-ig">
          <Plus size={14} />
          Generate Invite Link
        </button>
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <table className="w-full">
          <thead>
            <tr style={{ backgroundColor: "#1a1a1a", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <th className="text-left px-5 py-3 text-xs uppercase tracking-wider" style={{ color: "#a8a8a8" }}>Member</th>
              <th className="text-left px-5 py-3 text-xs uppercase tracking-wider" style={{ color: "#a8a8a8" }}>Role</th>
              <th className="text-left px-5 py-3 text-xs uppercase tracking-wider" style={{ color: "#a8a8a8" }}>Access</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.email} className="border-b last:border-0" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full gradient-ig-warm flex items-center justify-center text-white text-xs font-bold">
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{m.name}</p>
                      <p className="text-xs" style={{ color: "#a8a8a8" }}>{m.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium text-white ${m.badge}`}>{m.role}</span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-1 text-xs" style={{ color: "#a8a8a8" }}>
                    <Shield size={12} />
                    {m.role === "Admin" ? "Full access" : m.role === "Editor" ? "Can edit & post" : "View only"}
                  </div>
                </td>
                <td className="px-5 py-4 text-right">
                  <button className="text-xs" style={{ color: "#a8a8a8" }}><ChevronRight size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

// ─── Billing Tab ───────────────────────────────────────────────────────────────

function BillingTab() {
  const invoices = [
    { month: "March 2026",    date: "Mar 1, 2026",  amount: "$19.00", status: "Paid" },
    { month: "February 2026", date: "Feb 1, 2026",  amount: "$19.00", status: "Paid" },
    { month: "January 2026",  date: "Jan 1, 2026",  amount: "$19.00", status: "Paid" },
  ];

  return (
    <motion.div
      key="billing"
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.22 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-semibold text-white mb-1">Billing</h2>
        <p className="text-sm" style={{ color: "#a8a8a8" }}>Manage your subscription and billing details.</p>
      </div>

      {/* Holographic plan card */}
      <div className="billing-plan-card rounded-xl p-6 border">
        <div className="flex items-start justify-between mb-5">
          <div>
            <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "#a8a8a8" }}>Current Plan</p>
            <p className="text-white text-2xl font-bold">IGINFULL Platform</p>
            <p className="text-sm mt-0.5" style={{ color: "#a8a8a8" }}>$19 <span className="text-xs">/ month</span></p>
          </div>
          <div className="px-3 py-1 rounded-full text-xs font-medium"
            style={{ background: "linear-gradient(135deg, rgba(131,58,180,0.2) 0%, rgba(253,29,29,0.2) 50%, rgba(252,175,69,0.2) 100%)", color: "#fcaf45" }}>
            Active
          </div>
        </div>

        {/* Animated progress bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {[
            { label: "Accounts",        pct: "30%", warm: false },
            { label: "Clips this month", pct: "47%", warm: true  },
          ].map(({ label, pct, warm }) => (
            <div key={label} className="rounded-lg p-4" style={{ backgroundColor: "rgba(255,255,255,0.04)" }}>
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs" style={{ color: "#a8a8a8" }}>{label}</p>
                <p className="text-xs text-white font-medium">{pct}</p>
              </div>
              <div className="w-full rounded-full h-1.5" style={{ backgroundColor: "#2a2a2a" }}>
                <motion.div
                  className="h-1.5 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: pct }}
                  transition={{ duration: 1.0, ease: "easeOut", delay: 0.1 }}
                  style={{ background: warm ? "linear-gradient(90deg, #ff0069, #fcaf45)" : "linear-gradient(90deg, #ff0069, #fd1d1d)" }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3">
          <button className="flex-1 py-2.5 rounded-lg text-white font-medium text-sm gradient-ig">Upgrade Plan</button>
          <button className="flex-1 py-2.5 rounded-lg border text-sm font-medium"
            style={{ borderColor: "rgba(255,255,255,0.15)", color: "#a8a8a8" }}>Manage Subscription</button>
        </div>
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="px-5 py-4" style={{ backgroundColor: "#121212", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <h3 className="text-white font-medium text-sm">Invoice History</h3>
        </div>
        <table className="w-full">
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.month} className="border-b last:border-0" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <FileText size={14} style={{ color: "#a8a8a8" }} />
                    <div>
                      <p className="text-white text-sm">{inv.month}</p>
                      <p className="text-xs" style={{ color: "#a8a8a8" }}>{inv.date}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ backgroundColor: "rgba(34,197,94,0.15)", color: "#22c55e" }}>{inv.status}</span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <p className="text-white text-sm font-medium">{inv.amount}</p>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <button className="text-xs flex items-center gap-1 ml-auto" style={{ color: "#a8a8a8" }}>
                    <Download size={12} /> PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="rounded-xl p-5 border flex items-center gap-4" style={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="w-10 h-10 rounded-full gradient-ig flex items-center justify-center flex-shrink-0">
          <Gift size={18} className="text-white" />
        </div>
        <div>
          <p className="text-white font-medium text-sm">Refer a friend, earn free months</p>
          <p className="text-xs" style={{ color: "#a8a8a8" }}>Get 1 month free for every friend who subscribes to a paid plan.</p>
        </div>
        <button className="ml-auto text-xs px-3 py-1.5 rounded-lg border text-white flex-shrink-0"
          style={{ borderColor: "rgba(255,255,255,0.15)" }}>Get link</button>
      </div>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  const tabComponents: Record<Tab, React.ReactNode> = {
    profile:       <ProfileTab />,
    accounts:      <ConnectedAccountsTab />,
    integrations:  <IntegrationsTab />,
    content:       <ContentDefaultsTab />,
    team:          <TeamTab />,
    billing:       <BillingTab />,
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#000000" }}>
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Tab Sidebar */}
              <div className="sm:w-52 flex-shrink-0">
                <div className="rounded-xl border overflow-hidden sticky top-6"
                  style={{ backgroundColor: "#121212", borderColor: "rgba(255,255,255,0.08)" }}>
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-sm settings-tab-btn relative"
                      style={{
                        backgroundColor: activeTab === tab.id ? "rgba(255,0,105,0.1)" : "transparent",
                        color: activeTab === tab.id ? "#ff0069" : "#a8a8a8",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {activeTab === tab.id && (
                        <motion.span
                          layoutId="settings-tab-indicator"
                          className="settings-tab-glow absolute left-0 top-0 bottom-0 w-0.5 rounded-r-full"
                          style={{ background: "#ff0069" }}
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      <span style={{ color: activeTab === tab.id ? "#ff0069" : "#a8a8a8" }}>{tab.icon}</span>
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="flex-1 min-w-0">
                <AnimatePresence mode="wait">
                  <motion.div key={activeTab}>
                    {tabComponents[activeTab]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
