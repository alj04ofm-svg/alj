"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  UserPlus,
  Edit2,
  MessageSquare,
  Clock,
  Check,
  Minus,
  X,
  Shield,
  Mail,
  Loader2,
} from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = "Admin" | "VA" | "Editor" | "Model";
type Status = "Online" | "Away" | "Offline";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: Status;
  accounts: string[];
  tasksThisWeek: number;
  lastActive: string;
  initials: string;
  avatarColor: string;
}

interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  timeAgo: string;
  avatarColor: string;
}

interface PermissionRow {
  member: string;
  initials: string;
  avatarColor: string;
  schedule: boolean;
  upload: boolean;
  approve: boolean;
  analytics: boolean;
  manageTeam: boolean;
  settings: boolean;
}

// ─── Fake Data ────────────────────────────────────────────────────────────────

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "alex",
    name: "Alex / ALJ",
    email: "alex@alj.co",
    role: "Admin",
    status: "Online",
    accounts: [
      "@abg.ricebunny",
      "@onlytylerrex",
      "@rhinxrenx",
      "@ellamira",
      "@yourellamira",
      "@gaybearfitness",
      "@tyler_rex_fitness",
      "@renx_abg",
      "@mikee_viral",
      "@yssaconnect",
    ],
    tasksThisWeek: 12,
    lastActive: "Just now",
    initials: "AL",
    avatarColor: "linear-gradient(135deg, #833ab4, #ff0069)",
  },
  {
    id: "mikee",
    name: "Mikee",
    email: "mikee@alj.co",
    role: "VA",
    status: "Online",
    accounts: ["@abg.ricebunny", "@onlytylerrex"],
    tasksThisWeek: 8,
    lastActive: "5 min ago",
    initials: "MI",
    avatarColor: "#78c257",
  },
  {
    id: "yssa",
    name: "Yssa",
    email: "yssa@alj.co",
    role: "VA",
    status: "Online",
    accounts: ["@rhinxrenx", "@ellamira", "@yourellamira"],
    tasksThisWeek: 6,
    lastActive: "12 min ago",
    initials: "YS",
    avatarColor: "#fcaf45",
  },
  {
    id: "raphael",
    name: "Raphael",
    email: "raphael@alj.co",
    role: "Editor",
    status: "Away",
    accounts: [
      "@abg.ricebunny",
      "@onlytylerrex",
      "@rhinxrenx",
      "@ellamira",
      "@yourellamira",
      "@gaybearfitness",
    ],
    tasksThisWeek: 10,
    lastActive: "1h ago",
    initials: "RA",
    avatarColor: "#833ab4",
  },
];

const CONTACTS = [
  { name: "Ella", role: "Model" as Role, handle: "@ellamira" },
  { name: "Amam", role: "Model" as Role, handle: "@amamconnect" },
  { name: "Ren", role: "Model" as Role, handle: "@rhinxrenx" },
  { name: "Tyler", role: "Model" as Role, handle: "@onlytylerrex" },
];

const ACTIVITY_LOG: ActivityItem[] = [
  {
    id: "a1",
    actor: "Mikee",
    action: "approved content for",
    target: "@abg.ricebunny",
    timeAgo: "2h ago",
    avatarColor: "#78c257",
  },
  {
    id: "a2",
    actor: "Yssa",
    action: "uploaded 3 clips to",
    target: "Content Pipeline",
    timeAgo: "4h ago",
    avatarColor: "#fcaf45",
  },
  {
    id: "a3",
    actor: "Raphael",
    action: "completed 2 edits for",
    target: "@rhinxrenx",
    timeAgo: "6h ago",
    avatarColor: "#833ab4",
  },
  {
    id: "a4",
    actor: "Ella",
    action: "submitted approval request —",
    target: "Gay Bear Fitness",
    timeAgo: "1d ago",
    avatarColor: "#ff0069",
  },
  {
    id: "a5",
    actor: "Alex",
    action: "scheduled 3 posts for",
    target: "@onlytylerrex",
    timeAgo: "1d ago",
    avatarColor: "linear-gradient(135deg, #833ab4, #ff0069)",
  },
  {
    id: "a6",
    actor: "Mikee",
    action: "left a comment on",
    target: "@abg.ricebunny",
    timeAgo: "2d ago",
    avatarColor: "#78c257",
  },
];

const PERMISSIONS: PermissionRow[] = [
  {
    member: "Alex / ALJ",
    initials: "AL",
    avatarColor: "linear-gradient(135deg, #833ab4, #ff0069)",
    schedule: true,
    upload: true,
    approve: true,
    analytics: true,
    manageTeam: true,
    settings: true,
  },
  {
    member: "Mikee",
    initials: "MI",
    avatarColor: "#78c257",
    schedule: true,
    upload: true,
    approve: true,
    analytics: false,
    manageTeam: false,
    settings: false,
  },
  {
    member: "Yssa",
    initials: "YS",
    avatarColor: "#fcaf45",
    schedule: true,
    upload: true,
    approve: false,
    analytics: false,
    manageTeam: false,
    settings: false,
  },
  {
    member: "Raphael",
    initials: "RA",
    avatarColor: "#833ab4",
    schedule: false,
    upload: false,
    approve: false,
    analytics: true,
    manageTeam: false,
    settings: false,
  },
];

const ACCOUNT_OPTIONS = [
  "@abg.ricebunny",
  "@onlytylerrex",
  "@rhinxrenx",
  "@ellamira",
  "@yourellamira",
  "@gaybearfitness",
  "@tyler_rex_fitness",
  "@renx_abg",
  "@mikee_viral",
  "@yssaconnect",
];

const ROLES: Role[] = ["VA", "Editor"];

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatusDot({ status }: { status: Status }) {
  const colors: Record<Status, string> = {
    Online: "#4ade80",
    Away: "#facc15",
    Offline: "#6b7280",
  };
  return (
    <span
      className="inline-block w-2 h-2 rounded-full flex-shrink-0"
      style={{ backgroundColor: colors[status] }}
    />
  );
}

function RoleBadge({ role }: { role: Role }) {
  const styles: Record<Role, { bg: string; color: string; border: string }> = {
    Admin: { bg: "rgba(131,58,180,0.15)", color: "#a855f7", border: "rgba(131,58,180,0.25)" },
    VA: { bg: "rgba(0,244,226,0.1)", color: "#00f4e2", border: "rgba(0,244,226,0.2)" },
    Editor: { bg: "rgba(255,0,105,0.1)", color: "#ff0069", border: "rgba(255,0,105,0.2)" },
    Model: { bg: "rgba(252,175,69,0.1)", color: "#fcaf45", border: "rgba(252,175,69,0.2)" },
  };
  const s = styles[role];
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold"
      style={{ backgroundColor: s.bg, color: s.color, border: `1px solid ${s.border}` }}
    >
      {role}
    </span>
  );
}

function AccountPill({ handle }: { handle: string }) {
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium"
      style={{
        backgroundColor: "rgba(255,255,255,0.06)",
        color: "#a8a8a8",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {handle}
    </span>
  );
}

// ─── Invite Modal ──────────────────────────────────────────────────────────────

function InviteModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Role>("VA");
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const toggleAccount = (acc: string) => {
    setSelectedAccounts((prev) =>
      prev.includes(acc) ? prev.filter((a) => a !== acc) : [...prev, acc]
    );
  };

  const handleInvite = async () => {
    if (!name || !email) return;
    setLoading(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/team/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, accountIds: selectedAccounts }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setFeedback({ type: "error", message: data.message || "Something went wrong." });
        setLoading(false);
        return;
      }

      setFeedback({ type: "success", message: data.message });
      // Persist to localStorage
      try {
        const raw = localStorage.getItem("iginfull-team-invites");
        const existing: unknown[] = raw ? JSON.parse(raw) : [];
        localStorage.setItem("iginfull-team-invites", JSON.stringify([...existing, data.invite]));
      } catch {
        // localStorage unavailable (e.g. SSR); ignore
      }

      // Brief delay so user reads the success message, then close
      setTimeout(() => {
        setName("");
        setEmail("");
        setRole("VA");
        setSelectedAccounts([]);
        setLoading(false);
        setFeedback(null);
        onClose();
      }, 1500);
    } catch {
      setFeedback({ type: "error", message: "Network error — please try again." });
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
            onClick={onClose}
          />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
            <div
              className="rounded-2xl border overflow-hidden"
              style={{
                backgroundColor: "var(--card)",
                borderColor: "rgba(255,255,255,0.1)",
                boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
              }}
            >
              <div
                className="flex items-center justify-between px-6 py-4 border-b"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <div>
                  <h2 className="text-white font-semibold text-base">Invite Team Member</h2>
                  <p className="text-xs mt-0.5" style={{ color: "#a8a8a8" }}>
                    They&apos;ll receive an email invitation
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg transition-colors hover:bg-white/5"
                  style={{ color: "#a8a8a8" }}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="px-6 py-5 space-y-5">
                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "#a8a8a8" }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Jamie Chen"
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder:text-gray-600 transition-all"
                    style={{
                      backgroundColor: "#1f1f1f",
                      border: "1px solid rgba(255,255,255,0.1)",
                      outline: "none",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#ff0069")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "#a8a8a8" }}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. jamie@alj.co"
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white placeholder:text-gray-600 transition-all"
                    style={{
                      backgroundColor: "#1f1f1f",
                      border: "1px solid rgba(255,255,255,0.1)",
                      outline: "none",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#ff0069")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "#a8a8a8" }}>
                    Role
                  </label>
                  <div className="flex gap-2">
                    {ROLES.map((r) => (
                      <button
                        key={r}
                        onClick={() => setRole(r)}
                        className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all"
                        style={{
                          backgroundColor: role === r ? "rgba(255,0,105,0.1)" : "#1f1f1f",
                          color: role === r ? "#ff0069" : "#a8a8a8",
                          border: role === r
                            ? "1px solid rgba(255,0,105,0.3)"
                            : "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-2" style={{ color: "#a8a8a8" }}>
                    Account Access
                  </label>
                  <div className="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto pr-1">
                    {ACCOUNT_OPTIONS.map((acc) => {
                      const checked = selectedAccounts.includes(acc);
                      return (
                        <button
                          key={acc}
                          onClick={() => toggleAccount(acc)}
                          className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs transition-all text-left"
                          style={{
                            backgroundColor: checked ? "rgba(255,0,105,0.08)" : "#1f1f1f",
                            border: checked
                              ? "1px solid rgba(255,0,105,0.25)"
                              : "1px solid rgba(255,255,255,0.08)",
                            color: checked ? "#ff0069" : "#a8a8a8",
                          }}
                        >
                          <div
                            className="w-3.5 h-3.5 rounded flex items-center justify-center flex-shrink-0"
                            style={{
                              backgroundColor: checked ? "#ff0069" : "transparent",
                              border: checked
                                ? "1px solid #ff0069"
                                : "1px solid rgba(255,255,255,0.2)",
                            }}
                          >
                            {checked && <Check className="w-2.5 h-2.5 text-white" />}
                          </div>
                          {acc}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {feedback && (
                  <div
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs"
                    style={{
                      backgroundColor: feedback.type === "success"
                        ? "rgba(74,222,128,0.08)"
                        : "rgba(255,82,82,0.08)",
                      color: feedback.type === "success" ? "#4ade80" : "#ff5252",
                      border: `1px solid ${feedback.type === "success"
                        ? "rgba(74,222,128,0.2)"
                        : "rgba(255,82,82,0.2)"
                      }`,
                    }}
                  >
                    {feedback.type === "success" ? (
                      <Check className="w-3.5 h-3.5 flex-shrink-0" />
                    ) : (
                      <X className="w-3.5 h-3.5 flex-shrink-0" />
                    )}
                    {feedback.message}
                  </div>
                )}
              </div>

              <div
                className="flex items-center gap-3 px-6 py-4 border-t"
                style={{ borderColor: "rgba(255,255,255,0.08)" }}
              >
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
                  style={{ color: "#a8a8a8", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleInvite}
                  disabled={!name || !email || loading}
                  className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed gradient-ig flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Invite"
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function TeamPage() {
  const [inviteOpen, setInviteOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: "var(--background)" }}>
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* ── Page Header ─────────────────────────────────── */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-semibold text-white">Team</h1>
                <p className="text-sm mt-0.5" style={{ color: "#a8a8a8" }}>
                  Manage members, permissions, and team activity
                </p>
              </div>
              <button
                onClick={() => setInviteOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:brightness-110 gradient-ig glow-ig-sm"
              >
                <UserPlus className="w-4 h-4" />
                Invite Member
              </button>
            </div>

            {/* ── Stats Row ───────────────────────────────────── */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                {
                  label: "Total Members",
                  value: "4",
                  sub: "with login access",
                  icon: <Users className="w-4 h-4" style={{ color: "#833ab4" }} />,
                },
                {
                  label: "Online Now",
                  value: "3",
                  sub: "active this hour",
                  icon: (
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#4ade80" }} />
                  ),
                },
                {
                  label: "Accounts Managed",
                  value: "10",
                  sub: "across all members",
                  icon: <Shield className="w-4 h-4" style={{ color: "#ff0069" }} />,
                },
                {
                  label: "Tasks This Week",
                  value: "36",
                  sub: "across all members",
                  icon: <Check className="w-4 h-4" style={{ color: "#fcaf45" }} />,
                },
              ].map(({ label, value, sub, icon }) => (
                <div
                  key={label}
                  className="rounded-2xl p-4 border transition-all hover:border-white/12"
                  style={{
                    backgroundColor: "var(--card)",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs" style={{ color: "#a8a8a8" }}>{label}</span>
                    {icon}
                  </div>
                  <div className="text-2xl font-black text-white mb-0.5">{value}</div>
                  <div className="text-[11px]" style={{ color: "#a8a8a8" }}>{sub}</div>
                </div>
              ))}
            </div>

            {/* ── Team Members + Contacts Layout ──────────────── */}
            <div className="grid grid-cols-3 gap-5 mb-8">
              {/* ── Team Members Grid ────────────────────── */}
              <div className="col-span-2 space-y-4">
                <h2 className="text-sm font-semibold text-white">Team Members</h2>
                {TEAM_MEMBERS.map((member) => (
                  <div
                    key={member.id}
                    className="rounded-2xl p-4 border transition-all hover:border-white/12"
                    style={{
                      backgroundColor: "var(--card)",
                      borderColor: "rgba(255,255,255,0.08)",
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                        style={{ background: member.avatarColor }}
                      >
                        {member.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <span className="text-sm font-semibold text-white">{member.name}</span>
                          <RoleBadge role={member.role} />
                          <div className="flex items-center gap-1">
                            <StatusDot status={member.status} />
                            <span className="text-[10px]" style={{ color: "#a8a8a8" }}>
                              {member.status}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <Mail className="w-3 h-3 flex-shrink-0" style={{ color: "#6b7280" }} />
                          <span className="text-[11px] truncate" style={{ color: "#6b7280" }}>
                            {member.email}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {member.accounts.slice(0, 4).map((acc) => (
                            <AccountPill key={acc} handle={acc} />
                          ))}
                          {member.accounts.length > 4 && (
                            <span
                              className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px]"
                              style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "#a8a8a8" }}
                            >
                              +{member.accounts.length - 4} more
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="text-[11px]" style={{ color: "#6b7280" }}>
                            <span className="text-white font-semibold">{member.tasksThisWeek}</span>{" "}
                            tasks this week
                          </span>
                          <span className="text-[11px]" style={{ color: "#6b7280" }}>
                            Active{" "}
                            <span className="text-white font-medium">{member.lastActive}</span>
                          </span>
                          <div className="ml-auto flex items-center gap-1.5">
                            <button
                              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all hover:bg-white/5"
                              style={{ color: "#a8a8a8", border: "1px solid rgba(255,255,255,0.1)" }}
                            >
                              <Edit2 className="w-3 h-3" />
                              Edit
                            </button>
                            <button
                              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all hover:bg-white/5"
                              style={{ color: "#a8a8a8", border: "1px solid rgba(255,255,255,0.1)" }}
                            >
                              <MessageSquare className="w-3 h-3" />
                              Message
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Contacts ──────────────────────────── */}
              <div className="space-y-4">
                <h2 className="text-sm font-semibold text-white">Contacts (No Login Access)</h2>
                {CONTACTS.map((contact) => (
                  <div
                    key={contact.name}
                    className="flex items-center gap-3 rounded-xl p-3 border"
                    style={{
                      backgroundColor: "var(--card)",
                      borderColor: "rgba(255,255,255,0.06)",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                      style={{ background: "linear-gradient(135deg, #833ab4, #fd1d1d)" }}
                    >
                      {contact.name[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{contact.name}</p>
                      <p className="text-[11px] truncate" style={{ color: "#6b7280" }}>
                        {contact.handle}
                      </p>
                    </div>
                    <RoleBadge role={contact.role} />
                  </div>
                ))}
              </div>
            </div>

            {/* ── Activity Log ────────────────────────────────── */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-white mb-4">Activity</h2>
              <div
                className="rounded-2xl border overflow-hidden"
                style={{
                  backgroundColor: "var(--card)",
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                <div className="max-h-[420px] overflow-y-auto">
                  {ACTIVITY_LOG.map((item, i) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-white/[0.02]"
                      style={{
                        borderBottom:
                          i < ACTIVITY_LOG.length - 1
                            ? "1px solid rgba(255,255,255,0.05)"
                            : undefined,
                      }}
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5"
                        style={{ background: item.avatarColor }}
                      >
                        {item.actor[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] leading-relaxed">
                          <span className="font-semibold text-white">{item.actor}</span>
                          {" "}
                          <span style={{ color: "#a8a8a8" }}>{item.action}</span>
                          {" "}
                          <span style={{ color: "#ff0069" }}>{item.target}</span>
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Clock className="w-2.5 h-2.5 flex-shrink-0" style={{ color: "#4b5563" }} />
                          <span className="text-[10px]" style={{ color: "#4b5563" }}>
                            {item.timeAgo}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Permissions Matrix ──────────────────────────── */}
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-white mb-4">Permissions Matrix</h2>
              <div
                className="rounded-2xl border overflow-hidden"
                style={{
                  backgroundColor: "var(--card)",
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                <div
                  className="grid px-4 py-3 border-b"
                  style={{
                    gridTemplateColumns: "2fr repeat(6, 1fr)",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                >
                  {["", "Schedule", "Upload", "Approve", "Analytics", "Manage Team", "Settings"].map((col) => (
                    <div key={col} className="text-[11px] font-semibold text-center" style={{ color: "#6b7280" }}>
                      {col}
                    </div>
                  ))}
                </div>
                {PERMISSIONS.map((row, i) => (
                  <div
                    key={row.member}
                    className="grid px-4 py-3 items-center transition-colors hover:bg-white/[0.02]"
                    style={{
                      gridTemplateColumns: "2fr repeat(6, 1fr)",
                      borderBottom:
                        i < PERMISSIONS.length - 1 ? "1px solid rgba(255,255,255,0.05)" : undefined,
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                        style={{ background: row.avatarColor }}
                      >
                        {row.initials}
                      </div>
                      <span className="text-sm font-medium text-white truncate">{row.member}</span>
                    </div>
                    {[
                      { value: row.schedule, label: "Schedule Posts" },
                      { value: row.upload, label: "Upload Content" },
                      { value: row.approve, label: "Approve" },
                      { value: row.analytics, label: "View Analytics" },
                      { value: row.manageTeam, label: "Manage Team" },
                      { value: row.settings, label: "Edit Settings" },
                    ].map(({ value, label }) => (
                      <div key={label} className="flex justify-center">
                        {value ? (
                          <Check className="w-4 h-4" style={{ color: "#4ade80" }} />
                        ) : (
                          <Minus className="w-4 h-4" style={{ color: "#374151" }} />
                        )}
                      </div>
                    ))}
                  </div>
                ))}
                <div
                  className="flex items-center gap-5 px-4 py-3 border-t"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" style={{ color: "#4ade80" }} />
                    <span className="text-[10px]" style={{ color: "#6b7280" }}>Allowed</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Minus className="w-3.5 h-3.5" style={{ color: "#374151" }} />
                    <span className="text-[10px]" style={{ color: "#6b7280" }}>No access</span>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </main>
      <InviteModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </div>
  );
}
