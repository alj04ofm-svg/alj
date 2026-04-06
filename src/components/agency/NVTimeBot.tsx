"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock, Calendar, ChevronLeft, ChevronRight, Users,
  Filter, Download, TrendingUp, CheckCircle2, AlertCircle,
  Coffee, Play, Square, User, Building2, Zap, DollarSign
} from "lucide-react";

const EMPLOYEES = [
  { id: 1, name: "Alex", role: "Chatter", dept: "Chatting", avatar: "A", color: "#d4a853" },
  { id: 2, name: "Jamie", role: "Marketer", dept: "Marketing", avatar: "J", color: "#f0c97a" },
  { id: 3, name: "Sam", role: "Chatter", dept: "Chatting", avatar: "S", color: "#a07830" },
  { id: 4, name: "Riley", role: "Marketer", dept: "Marketing", avatar: "R", color: "#d4a853" },
  { id: 5, name: "Jordan", role: "Chatter", dept: "Chatting", avatar: "J", color: "#f0c97a" },
];

const DEPARTMENTS = ["All Departments", "Chatting", "Marketing", "Management"];

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_DAYS = Array.from({ length: 28 }, (_, i) => i + 1);

function generateTimeEntries(employeeId: number, weekOffset: number) {
  const seed = employeeId * 7 + weekOffset;
  return WEEK_DAYS.map((_, dayIndex) => {
    const isWeekend = dayIndex >= 5;
    const hours = isWeekend ? 0 : Math.floor(4 + ((seed + dayIndex * 3) % 5));
    const clockIn = isWeekend ? null : `${8 + Math.floor((seed * dayIndex) % 2)}:${((seed * 7 + dayIndex * 13) % 60).toString().padStart(2, "0")}`;
    const clockOut = isWeekend ? null : `${18 + Math.floor((seed * 2 + dayIndex) % 2)}:${((seed * 11 + dayIndex * 17) % 60).toString().padStart(2, "0")}`;
    return { day: WEEK_DAYS[dayIndex], hours, clockIn, clockOut, date: dayIndex + 1 + weekOffset * 7 };
  });
}

function generateMonthEntries(employeeId: number, month: number) {
  return MONTH_DAYS.map((day) => {
    const isWeekend = (day - 1) % 7 >= 5;
    const isToday = day === 6; // Apr 6
    const hours = isWeekend ? 0 : Math.floor(4 + ((employeeId * day + month) % 5));
    return { day, hours, isToday, isWeekend };
  });
}

const MONTHLY_SUMMARY = [
  { label: "Total Hours Logged", value: "1,842", change: "+6.3% vs last month", icon: Clock, color: "var(--nva-gold)" },
  { label: "Avg Hours / Day", value: "6.4 hrs", change: "Across all employees", icon: TrendingUp, color: "var(--nva-green)" },
  { label: "On-Time Rate", value: "97.2%", change: "+1.4% improvement", icon: CheckCircle2, color: "var(--nva-green)" },
  { label: "Total Payout Est.", value: "$24,580", change: "Based on $15/hr avg", icon: DollarSign, color: "var(--nva-gold)" },
];

export function NVTimeBot() {
  const [view, setView] = useState<"week" | "month">("week");
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [weekOffset, setWeekOffset] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "employees" | "calendar">("overview");

  const weekEntries = selectedEmployee
    ? generateTimeEntries(selectedEmployee, weekOffset)
    : EMPLOYEES.slice(0, 2).flatMap(emp =>
        generateTimeEntries(emp.id, weekOffset).map(e => ({ ...e, employee: emp }))
      );

  const monthEntries = EMPLOYEES.map(emp => ({
    employee: emp,
    days: generateMonthEntries(emp.id, 4),
  }));

  const totalHoursWeek = weekEntries.reduce((sum, e) => sum + (e.hours || 0), 0);
  const totalHoursMonth = EMPLOYEES.reduce((sum, emp) =>
    sum + emp.id * 12, 0
  );

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--nva-text)" }}>NV Time Bot</h2>
            <span style={{ padding: "3px 10px", borderRadius: 20, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", fontSize: 10, fontWeight: 700, color: "var(--nva-green)" }}>
              ● Live Tracking
            </span>
          </div>
          <p style={{ fontSize: 12, color: "var(--nva-muted)" }}>Track employee time by week or month. Filter by department.</p>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button className="btn-nva-secondary" style={{ fontSize: 12 }}>
            <Download size={13} /> Export Report
          </button>
        </div>
      </div>

      {/* Summary stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {MONTHLY_SUMMARY.map((s, i) => {
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
              <div style={{ fontSize: 20, fontWeight: 800, color: "var(--nva-text)", letterSpacing: "-0.02em" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: "var(--nva-muted)", marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: 10, color: "var(--nva-green)", marginTop: 4 }}>{s.change}</div>
            </motion.div>
          );
        })}
      </div>

      {/* View Toggle + Filters */}
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
        <div style={{ display: "flex", background: "var(--nva-surface)", border: "1px solid var(--nva-border)", borderRadius: 10, padding: 3, gap: 2 }}>
          {(["overview", "employees", "calendar"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "6px 14px", borderRadius: 7, cursor: "pointer", fontSize: 12, fontWeight: 600,
                background: activeTab === tab ? "rgba(212,168,83,0.12)" : "transparent",
                border: activeTab === tab ? "1px solid rgba(212,168,83,0.2)" : "1px solid transparent",
                color: activeTab === tab ? "var(--nva-gold)" : "var(--nva-muted)", transition: "all 0.15s", textTransform: "capitalize",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", background: "var(--nva-surface)", border: "1px solid var(--nva-border)", borderRadius: 10, padding: 3, gap: 2 }}>
          {(["week", "month"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: "6px 14px", borderRadius: 7, cursor: "pointer", fontSize: 12, fontWeight: 600,
                background: view === v ? "rgba(212,168,83,0.12)" : "transparent",
                border: view === v ? "1px solid rgba(212,168,83,0.2)" : "1px solid transparent",
                color: view === v ? "var(--nva-gold)" : "var(--nva-muted)", transition: "all 0.15s",
              }}
            >
              {v === "week" ? "This Week" : "This Month"}
            </button>
          ))}
        </div>

        <select
          className="input-nva"
          value={selectedDept}
          onChange={e => setSelectedDept(e.target.value)}
          style={{ height: 36, fontSize: 12, width: 180, paddingLeft: 12 }}
        >
          {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
        </select>

        {/* Employee filter */}
        <select
          className="input-nva"
          value={selectedEmployee ?? ""}
          onChange={e => setSelectedEmployee(e.target.value ? parseInt(e.target.value) : null)}
          style={{ height: 36, fontSize: 12, width: 160, paddingLeft: 12 }}
        >
          <option value="">All Employees</option>
          {EMPLOYEES.map(emp => <option key={emp.id} value={emp.id}>{emp.name} ({emp.role})</option>)}
        </select>
      </div>

      {/* ── Overview / Employee Rows ── */}
      {activeTab !== "calendar" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {EMPLOYEES.filter(e => selectedDept === "All Departments" || e.dept === selectedDept).map((emp, i) => {
            const entries = generateTimeEntries(emp.id, weekOffset);
            const totalHrs = entries.reduce((s, e) => s + e.hours, 0);
            return (
              <motion.div
                key={emp.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="card-nva"
                style={{ padding: "16px 18px" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${emp.color}20`, border: `1px solid ${emp.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: emp.color, flexShrink: 0 }}>
                    {emp.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--nva-text)" }}>{emp.name}</div>
                    <div style={{ fontSize: 11, color: "var(--nva-muted)" }}>{emp.role} · {emp.dept}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--nva-green)", boxShadow: "0 0 6px var(--nva-green)" }} />
                    <span style={{ fontSize: 11, color: "var(--nva-green)", fontWeight: 600 }}>Active</span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "var(--nva-gold)" }}>{totalHrs}h</div>
                    <div style={{ fontSize: 10, color: "var(--nva-muted)" }}>this week</div>
                  </div>
                </div>

                {/* Daily breakdown */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 6 }}>
                  {entries.map((entry, j) => {
                    const isWeekend = j >= 5;
                    const maxHrs = 8;
                    const barHeight = isWeekend ? 0 : Math.max(4, (entry.hours / maxHrs) * 50);
                    return (
                      <div key={j} style={{ textAlign: "center" }}>
                        <div style={{ height: 50, display: "flex", flexDirection: "column", justifyContent: "flex-end", marginBottom: 4 }}>
                          {isWeekend ? (
                            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                              <span style={{ fontSize: 9, color: "var(--nva-muted-2)" }}>—</span>
                            </div>
                          ) : (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={{ height: barHeight }}
                              transition={{ delay: j * 0.04 + i * 0.05, duration: 0.4 }}
                              style={{
                                width: "100%", borderRadius: 4,
                                background: entry.hours >= 6 ? "rgba(34,197,94,0.5)" : entry.hours >= 4 ? "rgba(212,168,83,0.5)" : "rgba(212,168,83,0.25)",
                                border: entry.hours >= 6 ? "1px solid rgba(34,197,94,0.6)" : "1px solid rgba(212,168,83,0.3)",
                              }}
                            />
                          )}
                        </div>
                        <div style={{ fontSize: 9, fontWeight: 600, color: isWeekend ? "var(--nva-muted-2)" : "var(--nva-muted)" }}>{entry.day}</div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: isWeekend ? "var(--nva-muted-2)" : entry.hours >= 6 ? "var(--nva-green)" : "var(--nva-gold)" }}>
                          {isWeekend ? "—" : `${entry.hours}h`}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Today's status */}
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--nva-border)", display: "flex", gap: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <Clock size={11} style={{ color: "var(--nva-muted)" }} />
                    <span style={{ fontSize: 11, color: "var(--nva-muted)" }}>Clock In:</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "var(--nva-text)" }}>8:47 AM</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <Square size={11} style={{ color: "var(--nva-red)" }} />
                    <span style={{ fontSize: 11, color: "var(--nva-muted)" }}>Clock Out:</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "var(--nva-muted)" }}>—</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <TrendingUp size={11} style={{ color: "var(--nva-green)" }} />
                    <span style={{ fontSize: 11, color: "var(--nva-muted)" }}>Today:</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "var(--nva-green)" }}>5h 13m logged</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* ── Calendar View ── */}
      {activeTab === "calendar" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "var(--nva-text)" }}>April 2026 — Calendar View</h3>
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => setWeekOffset(w => w - 1)} style={{ width: 30, height: 30, borderRadius: 8, background: "var(--nva-surface)", border: "1px solid var(--nva-border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--nva-muted)" }}>
                <ChevronLeft size={13} />
              </button>
              <button onClick={() => setWeekOffset(0)} style={{ padding: "0 12px", height: 30, borderRadius: 8, background: "rgba(212,168,83,0.08)", border: "1px solid rgba(212,168,83,0.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--nva-gold)", fontSize: 11, fontWeight: 600 }}>
                Today
              </button>
              <button onClick={() => setWeekOffset(w => w + 1)} style={{ width: 30, height: 30, borderRadius: 8, background: "var(--nva-surface)", border: "1px solid var(--nva-border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--nva-muted)" }}>
                <ChevronRight size={13} />
              </button>
            </div>
          </div>

          {/* Calendar grid */}
          <div className="card-nva" style={{ padding: 0, overflow: "hidden" }}>
            {/* Header */}
            <div style={{ display: "grid", gridTemplateColumns: "140px repeat(28, 1fr)", borderBottom: "1px solid var(--nva-border)" }}>
              <div style={{ padding: "10px 14px", fontSize: 11, fontWeight: 700, color: "var(--nva-muted)", borderRight: "1px solid var(--nva-border)" }}>Employee</div>
              {MONTH_DAYS.map(d => (
                <div key={d} style={{
                  padding: "10px 4px", textAlign: "center", fontSize: 10, fontWeight: d === 6 ? 700 : 400,
                  color: d === 6 ? "var(--nva-gold)" : d % 7 >= 5 ? "var(--nva-muted-2)" : "var(--nva-muted)",
                  background: d === 6 ? "rgba(212,168,83,0.06)" : "transparent",
                }}>
                  {d}
                </div>
              ))}
            </div>

            {/* Employee rows */}
            {EMPLOYEES.filter(e => selectedDept === "All Departments" || e.dept === selectedDept).map((emp, rowIdx) => (
              <div key={emp.id} style={{ display: "grid", gridTemplateColumns: "140px repeat(28, 1fr)", borderBottom: rowIdx < EMPLOYEES.length - 1 ? "1px solid var(--nva-border)" : "none" }}>
                <div style={{ padding: "8px 14px", display: "flex", alignItems: "center", gap: 8, borderRight: "1px solid var(--nva-border)" }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, background: `${emp.color}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: emp.color }}>
                    {emp.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--nva-text)" }}>{emp.name}</div>
                    <div style={{ fontSize: 9, color: "var(--nva-muted)" }}>{emp.role}</div>
                  </div>
                </div>
                {MONTH_DAYS.map(d => {
                  const isWeekend = (d - 1) % 7 >= 5;
                  const isToday = d === 6;
                  const hours = isWeekend ? 0 : Math.floor(4 + ((emp.id * d) % 5));
                  return (
                    <div
                      key={d}
                      style={{
                        padding: "4px 2px", minHeight: 48,
                        background: isToday ? "rgba(212,168,83,0.06)" : "transparent",
                        borderRight: "1px solid rgba(212,168,83,0.04)",
                        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2,
                      }}
                    >
                      {isWeekend ? null : (
                        <>
                          <div style={{
                            width: "80%", height: 4, borderRadius: 2,
                            background: hours >= 6 ? "var(--nva-green)" : hours >= 4 ? "var(--nva-gold)" : "var(--nva-border)",
                            opacity: hours >= 6 ? 0.8 : hours >= 4 ? 0.6 : 0.4,
                          }} />
                          <span style={{ fontSize: 8, color: hours >= 4 ? "var(--nva-muted)" : "var(--nva-muted-2)" }}>{hours}h</span>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div style={{ display: "flex", gap: 16, marginTop: 12, paddingLeft: 4 }}>
            {[
              { color: "var(--nva-green)", label: "6+ hours" },
              { color: "var(--nva-gold)", label: "4–5 hours" },
              { color: "var(--nva-border)", label: "< 4 hours" },
              { color: "var(--nva-muted-2)", label: "Off / Weekend" },
            ].map((leg) => (
              <div key={leg.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div style={{ width: 24, height: 4, borderRadius: 2, background: leg.color }} />
                <span style={{ fontSize: 11, color: "var(--nva-muted)" }}>{leg.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
