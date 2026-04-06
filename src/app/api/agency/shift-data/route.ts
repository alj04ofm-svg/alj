import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const SHIFT_DIR = "/Users/cam/Desktop/ALJ-HOME/shift_tracker";

function readJson(filename: string, fallback: unknown = null): unknown {
  try {
    const filePath = path.join(SHIFT_DIR, filename);
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
  } catch {
    // ignore
  }
  return fallback;
}

export async function GET() {
  const profiles = (readJson("employee_profiles.json", {})) as Record<
    string,
    {
      name: string;
      dept: string;
      role: string;
      telegram_id: string;
      connected: boolean;
      shift_start: string;
      shift_end: string;
      rest_day: string;
      fansly_handled: string[];
      onlyfans_handled: string[];
      all_models: string[];
    }
  >;

  const state = (readJson("shift_state.json", {})) as Record<
    string,
    {
      date: string;
      shift_start?: string;
      shift_end?: string;
      on_break?: boolean;
      break_start?: string;
      break_end?: string;
    }
  >;

  const leave = (readJson("leave_requests.json", {})) as Record<
    string,
    {
      uid: string;
      date: string;
      reason: string;
      status: string;
      employee?: string;
    }
  >;

  const late = (readJson("late_log.json", {})) as Record<
    string,
    { count: number; reset_month: string }
  >;

  const ot = (readJson("overtime_log.json", {})) as Record<
    string,
    Record<string, { total_ot_mins: number }>
  >;

  const today = new Date();
  const monthKey = today.toISOString().slice(0, 7);

  const staff = Object.entries(profiles).map(([key, emp]) => {
    const uid = String(emp.telegram_id ?? "");
    const s = state[uid] ?? {};
    const ldata = late[parseInt(uid)];
    const month_lates =
      ldata?.reset_month === monthKey ? ldata.count ?? 0 : 0;
    const ot_month = (ot[monthKey] ?? {})[emp.name] ?? {};
    const ot_hrs = Math.round((ot_month.total_ot_mins ?? 0) / 60 * 10) / 10;

    const uidStr = uid;
    const todayStr = today.toISOString().slice(0, 10);
    let status_cls = "off";
    let status_text = "Not Started";

    if (s.shift_start && !s.shift_end && s.date === todayStr) {
      status_cls = s.on_break ? "on-break" : "on-shift";
      status_text = s.on_break ? "On Break" : "On Shift";
    } else if (emp.rest_day === today.toLocaleDateString("en-US", { weekday: "long" })) {
      status_cls = "rest";
      status_text = "Rest Day";
    } else if (s.shift_end && s.date === todayStr) {
      status_cls = "finished";
      status_text = "Finished";
    }

    const approvedLeaves = Object.values(leave)
      .filter(
        (lv) =>
          lv.uid === uidStr &&
          lv.status === "approved"
      )
      .slice(-5)
      .map((lv) => ({
        date: lv.date,
        reason: lv.reason,
        status: lv.status,
      }));

    const pendingLeaves = Object.values(leave)
      .filter((lv) => lv.uid === uidStr && lv.status === "pending")
      .map((lv) => ({
        date: lv.date,
        reason: lv.reason,
        status: lv.status,
      }));

    return {
      id: key,
      name: emp.name,
      dept: emp.dept,
      role: emp.role,
      connected: emp.connected ?? false,
      shift_start: emp.shift_start ?? "—",
      shift_end: emp.shift_end ?? "—",
      rest_day: emp.rest_day ?? "—",
      status_cls,
      status_text,
      shift_started: s.shift_start ?? "—",
      shift_finished: s.shift_end ?? "—",
      is_on_shift: status_cls === "on-shift" || status_cls === "on-break",
      is_on_break: status_cls === "on-break",
      break_time:
        s.break_start
          ? `${s.break_start} → ${s.break_end ?? "—"}`
          : "—",
      month_lates,
      ot_hrs,
      fansly_models: emp.fansly_handled ?? [],
      onlyfans_models: emp.onlyfans_handled ?? [],
      all_models: emp.all_models ?? [],
      approved_leaves: approvedLeaves,
      pending_leaves: pendingLeaves,
    };
  });

  const chatters = staff.filter(
    (s) => s.role === "chatter" || s.role === "editor"
  );

  const connectedCount = staff.filter((s) => s.connected).length;
  const chatterCount = staff.filter((s) => s.role === "chatter").length;
  const vaCount = staff.filter((s) => s.role === "va").length;
  const pendingLeaves = Object.values(leave)
    .filter((lv) => lv.status === "pending")
    .map((lv) => ({
      date: lv.date,
      reason: lv.reason,
      employee: lv.employee ?? "?",
    }));

  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay() + 1);

  return NextResponse.json({
    staff,
    chatters,
    total_staff: staff.length,
    connected_count: connectedCount,
    chatter_count: chatterCount,
    va_count: vaCount,
    pending_leaves: pendingLeaves,
    pending_count: pendingLeaves.length,
    today: today.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    week_start: weekStart.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    }),
    week_end: new Date(
      weekStart.getTime() + 6 * 24 * 60 * 60 * 1000
    ).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }),
    month_name: today.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
  });
}
