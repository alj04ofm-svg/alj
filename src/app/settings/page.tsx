"use client";

import { useState, useEffect } from "react";
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
  Loader2,
  X,
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
  const [displayName, setDisplayName] = useState("Alex / ALJ");
  const [email, setEmail] = useState("alex@alj.co");
  const [timezone, setTimezone] = useState("Asia/Manila (UTC+8)");
  const [toggles, setToggles] = useState({ email: true, slack: false, push: true });
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("iginfull-profile");
      if (saved) {
        const data = JSON.parse(saved);
        if (data.displayName) setDisplayName(data.displayName);
        if (data.email) setEmail(data.email);
        if (data.timezone) setTimezone(data.timezone);
        if (data.toggles) setToggles(data.toggles);
      }
    } catch {}
  }, []);

  const handleSave = () => {
    localStorage.setItem("iginfull-profile", JSON.stringify({ displayName, email, timezone, toggles }));
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

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

      <div className="rounded-xl p-6 border" style={{ backgroundColor: "var(--card)", borderColor: "rgba(255,255,255,0.08)" }}>
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
            { label: "Display Name", value: displayName, setValue: setDisplayName },
            { label: "Email", value: email, setValue: setEmail },
            { label: "Timezone", value: timezone, setValue: setTimezone },
            { label: "Role", value: "Admin", readonly: true },
          ].map((field) => (
            <div key={field.label}>
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: "#a8a8a8" }}>{field.label}</p>
              {"setValue" in field ? (
                <input
                  value={field.value}
                  onChange={e => field.setValue?.(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm text-white outline-none"
                  style={{ backgroundColor: "#1e1e1e", border: "1px solid rgba(255,255,255,0.08)" }}
                />
              ) : (
                <p className="text-white">{field.value}</p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3">
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #ff0069, #833ab4)" }}
          >
            Save Changes
          </button>
          {saveSuccess && (
            <span className="text-sm font-medium" style={{ color: "#22c55e" }}>
              ✓ Saved!
            </span>
          )}
        </div>
      </div>

      <div className="rounded-xl p-6 border" style={{ backgroundColor: "var(--card)", borderColor: "rgba(255,255,255,0.08)" }}>
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

// ─── Drive Config Modal ────────────────────────────────────────────────────────

interface DriveAccount {
  handle: string;
  name: string;
  followers: string;
  connected: boolean;
  driveConnected?: boolean;
  driveFolderId?: string | null;
  modelId?: string;
}

function DriveConfigModal({
  account,
  onClose,
  onConfigured,
}: {
  account: DriveAccount;
  onClose: () => void;
  onConfigured: (folderId: string) => void;
}) {
  const [folderId, setFolderId] = useState(account.driveFolderId ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!folderId.trim()) { setError("Paste a Drive Folder ID"); return; }
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/drive/configure", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ modelId: account.modelId, tokens: null, folderId: folderId.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed");
      onConfigured(folderId.trim());
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md rounded-2xl p-6 border"
        style={{ backgroundColor: "var(--card)", borderColor: "rgba(255,255,255,0.1)" }}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white">
          <X size={16} />
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "rgba(66,133,244,0.15)" }}>
            <FolderOpen size={20} style={{ color: "#4285f4" }} />
          </div>
          <div>
            <h3 className="text-white font-semibold">Configure Google Drive</h3>
            <p className="text-xs" style={{ color: "#a8a8a8" }}>{account.handle}</p>
          </div>
        </div>

        <p className="text-sm mb-4" style={{ color: "#a8a8a8" }}>
          Enter the <strong className="text-white">Drive Folder ID</strong> for this account. Videos in this folder will auto-sync and be analyzed by Gemini.
        </p>

        <div className="mb-2">
          <p className="text-xs uppercase tracking-wider mb-2" style={{ color: "#a8a8a8" }}>Folder ID</p>
          <input
            value={folderId}
            onChange={e => setFolderId(e.target.value)}
            placeholder="e.g. 1X2Y3Z4abcDEFghijK"
            className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
            style={{ backgroundColor: "#1e1e1e", border: "1px solid rgba(255,255,255,0.1)" }}
          />
        </div>

        <div className="flex items-start gap-2 mb-4">
          <FolderOpen size={12} className="mt-0.5 flex-shrink-0" style={{ color: "#4285f4" }} />
          <p className="text-xs" style={{ color: "#a8a8a8" }}>
            Find the ID in your Drive URL: <code className="text-white">drive.google.com/drive/folders/</code>
            <strong className="text-white">[FOLDER_ID]</strong>
          </p>
        </div>

        {error && (
          <p className="text-xs mb-3 px-3 py-2 rounded-lg" style={{ backgroundColor: "rgba(239,68,68,0.1)", color: "#ef4444" }}>{error}</p>
        )}

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl text-sm text-white border" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-50 flex items-center justify-center gap-2"
            style={{ background: saving ? "#333" : "linear-gradient(135deg, #4285f4, #34a853)" }}
          >
            {saving ? <><Loader2 size={14} className="animate-spin" /> Saving...</> : "Save Folder"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Connected Accounts Tab ───────────────────────────────────────────────────

// These IDs match what you'll create in Convex models table
const HARDCODED_ACCOUNTS: DriveAccount[] = [
  { handle: "@abg.ricebunny", name: "Tyler",    followers: "5,340", connected: true,  modelId: "model_tyler_1"   },
  { handle: "@onlytylerrex",  name: "Tyler Rex",followers: "1,200", connected: true,  modelId: "model_tyler_2"   },
  { handle: "@rhinxrenx",     name: "Ren",       followers: "3,100", connected: true,  modelId: "model_ren_1"      },
  { handle: "@ellamara",      name: "Ella",      followers: "2,800", connected: false, modelId: "model_ella_1"     },
];

function ConnectedAccountsTab() {
  const [accounts, setAccounts] = useState<DriveAccount[]>(HARDCODED_ACCOUNTS);
  const [configModal, setConfigModal] = useState<DriveAccount | null>(null);
  const [driveTokens, setDriveTokens] = useState<Record<string, any>>({});

  // Read OAuth callback params from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const connected = params.get("drive_connected");
    const modelId = params.get("modelId");
    const tokensB64 = params.get("tokens");
    const driveError = params.get("drive_error");

    if (driveError) {
      console.warn("Drive OAuth error:", driveError);
    }

    if (connected && modelId && tokensB64) {
      try {
        const tokens = JSON.parse(atob(tokensB64));
        setDriveTokens(prev => ({ ...prev, [modelId]: tokens }));
        // Clean URL
        window.history.replaceState({}, "", "/settings");
      } catch {}
    }
  }, []);

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
        {accounts.map((acc) => {
          const hasTokens = !!driveTokens[acc.modelId ?? acc.handle];
          const isDriveConfigured = acc.driveFolderId || hasTokens;
          return (
            <div
              key={acc.handle}
              className="rounded-xl p-5 border"
              style={{ backgroundColor: "var(--card)", borderColor: "rgba(255,255,255,0.08)" }}
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

              <div className="flex items-center justify-between mb-3">
                <p className="text-xs" style={{ color: "#a8a8a8" }}>{acc.followers} followers</p>
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

              {/* Drive row */}
              <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <div className="flex items-center gap-2">
                  <FolderOpen size={14} style={{ color: isDriveConfigured ? "#4285f4" : "#555" }} />
                  <span className="text-xs" style={{ color: isDriveConfigured ? "#a8a8a8" : "#555" }}>
                    {isDriveConfigured ? "Drive synced" : "Drive not set up"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {isDriveConfigured && (
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#22c55e" }} />
                  )}
                  <button
                    onClick={() => setConfigModal(acc)}
                    className="text-xs px-2.5 py-1 rounded-lg font-medium text-white"
                    style={{
                      background: isDriveConfigured
                        ? "rgba(66,133,244,0.15)"
                        : "linear-gradient(135deg, #4285f4, #34a853)",
                    }}
                  >
                    {isDriveConfigured ? "Configure" : "Set up"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {configModal && (
        <DriveConfigModal
          account={configModal}
          onClose={() => setConfigModal(null)}
          onConfigured={(folderId) => {
            setAccounts(prev =>
              prev.map(a => a.handle === configModal.handle ? { ...a, driveFolderId: folderId } : a)
            );
            // If we have OAuth tokens from callback, save them now
            const tokens = driveTokens[configModal.modelId ?? configModal.handle];
            if (tokens) {
              fetch("/api/drive/configure", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ modelId: configModal.modelId, tokens, folderId }),
              }).then(() => setConfigModal(null));
            } else {
              setConfigModal(null);
            }
          }}
        />
      )}

      <button className="w-full py-3 rounded-xl text-white font-medium text-sm gradient-ig flex items-center justify-center gap-2">
        <Plus size={16} />
        Connect New Account
      </button>
    </motion.div>
  );
}

// ─── Integrations Tab ─────────────────────────────────────────────────────────

function IntegrationsTab({ modelId }: { modelId?: string }) {
  const [driveConnected, setDriveConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("drive_connected") === "true") {
      setDriveConnected(true);
      window.history.replaceState({}, "", "/settings");
    }
  }, []);

  const handleConnectDrive = () => {
    const id = modelId ?? "model_tyler_1";
    window.location.href = `/api/auth/google-drive?modelId=${id}`;
  };

  const integrations = [
    {
      name: "Google Drive",
      status: driveConnected,
      lastSynced: "—",
      icon: <FolderOpen size={20} style={{ color: "#4285f4" }} />,
      note: "Auto-sync clips from Drive — per-account folder config in Connected Accounts",
      connectedLabel: "Active",
      action: driveConnected ? "Configure" : null,
    },
    {
      name: "Airtable",
      status: true,
      lastSynced: "1h ago",
      icon: <Zap size={20} style={{ color: "#ff0069" }} />,
      note: "Pipeline & content management",
      connectedLabel: "Connected",
      action: "Configure",
    },
    {
      name: "Telegram Bot",
      status: true,
      lastSynced: "5m ago",
      icon: <Globe size={20} style={{ color: "#0088cc" }} />,
      note: "@NVTIMEBOT — clip received & approval notifications",
      connectedLabel: "Connected",
      action: "Configure",
    },
    {
      name: "Meta Graph API",
      status: false,
      lastSynced: null,
      icon: <ExternalLink size={20} style={{ color: "#833ab4" }} />,
      note: "Post scheduling & real Instagram analytics",
      connectedLabel: null,
      action: null,
    },
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
            style={{ backgroundColor: "var(--card)", borderColor: "rgba(255,255,255,0.08)" }}
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
                    <span className="connected-glow relative w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#22c55e" }} />
                    {intg.action && (
                      <button
                        onClick={() => alert("Integration configuration coming soon")}
                        className="text-xs px-3 py-1.5 rounded-lg border text-white"
                        style={{ borderColor: "rgba(255,255,255,0.08)" }}
                      >
                        {intg.action}
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: "rgba(255,166,0,0.15)", color: "#ffa600" }}>
                      Not Connected
                    </span>
                    <button
                      onClick={intg.name === "Google Drive" ? handleConnectDrive : undefined}
                      disabled={connecting}
                      className="text-xs px-3 py-1.5 rounded-lg text-white font-medium disabled:opacity-50 flex items-center gap-1.5"
                      style={{ background: "linear-gradient(135deg, #4285f4, #34a853)" }}
                    >
                      {connecting ? <Loader2 size={12} className="animate-spin" /> : null}
                      {connecting ? "Connecting..." : "Connect"}
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

  const persist = (key: string, val: any) => {
    try {
      const existing = JSON.parse(localStorage.getItem("iginfull-defaults") || "{}");
      localStorage.setItem("iginfull-defaults", JSON.stringify({ ...existing, [key]: val }));
    } catch {}
  };

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

      <div className="rounded-xl p-6 border space-y-5" style={{ backgroundColor: "var(--card)", borderColor: "rgba(255,255,255,0.08)" }}>
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

      <div className="rounded-xl p-6 border" style={{ backgroundColor: "var(--card)", borderColor: "rgba(255,255,255,0.08)" }}>
        <h3 className="text-white font-medium text-sm mb-4">AI Enhancement</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Auto-enhance clips</p>
              <p className="text-xs" style={{ color: "#a8a8a8" }}>Automatically enhance video clips on upload</p>
            </div>
            <AnimatedToggle checked={autoEnhance} onChange={() => { setAutoEnhance(v => !v); persist("autoEnhance", !autoEnhance); }} />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <p className="text-xs" style={{ color: "#a8a8a8" }}>Enhancement level</p>
              <p className="text-xs font-medium text-white">{sliderVal < 33 ? "Subtle" : sliderVal < 66 ? "Moderate" : "Aggressive"}</p>
            </div>
            <input type="range" min={0} max={100} value={sliderVal}
              onChange={(e) => { const v = Number(e.target.value); setSliderVal(v); persist("sliderVal", v); }}
              className="w-full accent-pink-500" />
          </div>
        </div>
      </div>

      <div className="rounded-xl p-6 border space-y-4" style={{ backgroundColor: "var(--card)", borderColor: "rgba(255,255,255,0.08)" }}>
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
          <AnimatedToggle checked={autoHashtags} onChange={() => { setAutoHashtags(v => !v); persist("autoHashtags", !autoHashtags); }} />
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
            <tr style={{ backgroundColor: "var(--card)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
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
          <button onClick={() => alert("Billing portal coming soon")} className="flex-1 py-2.5 rounded-lg text-white font-medium text-sm gradient-ig">Upgrade Plan</button>
          <button onClick={() => alert("Billing portal coming soon")} className="flex-1 py-2.5 rounded-lg border text-sm font-medium"
            style={{ borderColor: "rgba(255,255,255,0.15)", color: "#a8a8a8" }}>Manage Subscription</button>
        </div>
      </div>

      <div className="rounded-xl border overflow-hidden" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="px-5 py-4" style={{ backgroundColor: "var(--card)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
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

      <div className="rounded-xl p-5 border flex items-center gap-4" style={{ backgroundColor: "var(--card)", borderColor: "rgba(255,255,255,0.08)" }}>
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
    integrations:  <IntegrationsTab modelId="model_tyler_1" />,
    content:       <ContentDefaultsTab />,
    team:          <TeamTab />,
    billing:       <BillingTab />,
  };

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "var(--background)" }}>
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Tab Sidebar */}
              <div className="sm:w-52 flex-shrink-0">
                <div className="rounded-xl border overflow-hidden sticky top-6"
                  style={{ backgroundColor: "var(--card)", borderColor: "rgba(255,255,255,0.08)" }}>
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
