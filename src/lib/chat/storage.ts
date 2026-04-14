import type { ChatSession, UserStats } from "./types";
import { supabase } from "@/lib/supabase/client";
import { getDeviceId } from "./device";

const SESSIONS_KEY = "meta-lab-sessions";
const STATS_KEY = "meta-lab-stats";

// --- Helpers ---

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function getDefaultStats(): UserStats {
  return {
    totalSessions: 0,
    totalMessages: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: "",
    experimentsUsed: [],
  };
}

// --- localStorage fallback ---

function getLocalSessions(): ChatSession[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(SESSIONS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveLocalSessions(sessions: ChatSession[]): void {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

function getLocalStats(): UserStats {
  if (typeof window === "undefined") return getDefaultStats();
  const raw = localStorage.getItem(STATS_KEY);
  return raw ? JSON.parse(raw) : getDefaultStats();
}

function saveLocalStats(stats: UserStats): void {
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}

// --- Sessions (async, Supabase-first) ---

export async function getSessions(): Promise<ChatSession[]> {
  if (supabase) {
    const deviceId = getDeviceId();
    const { data } = await supabase
      .from("sessions")
      .select("*")
      .eq("device_id", deviceId)
      .order("updated_at", { ascending: false })
      .limit(50);

    if (data) {
      return data.map(mapDbToSession);
    }
  }
  return getLocalSessions();
}

export async function getSessionsByExperiment(
  experimentId: string
): Promise<ChatSession[]> {
  if (supabase) {
    const deviceId = getDeviceId();
    const { data } = await supabase
      .from("sessions")
      .select("*")
      .eq("device_id", deviceId)
      .eq("experiment_id", experimentId)
      .order("updated_at", { ascending: false });

    if (data) {
      return data.map(mapDbToSession);
    }
  }
  return getLocalSessions()
    .filter((s) => s.experimentId === experimentId)
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

export async function saveSession(session: ChatSession): Promise<void> {
  if (supabase) {
    const deviceId = getDeviceId();
    await supabase.from("sessions").upsert({
      id: session.id,
      device_id: deviceId,
      experiment_id: session.experimentId,
      messages: session.messages,
      style: session.style,
      constraint_level: session.constraintLevel,
      created_at: session.createdAt,
      updated_at: session.updatedAt,
    });
  }

  // Always save locally too (dual-write for reliability)
  const sessions = getLocalSessions();
  const index = sessions.findIndex((s) => s.id === session.id);
  if (index >= 0) {
    sessions[index] = session;
  } else {
    sessions.push(session);
  }
  const trimmed = sessions
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, 50);
  saveLocalSessions(trimmed);
}

export async function deleteSession(sessionId: string): Promise<void> {
  if (supabase) {
    await supabase.from("sessions").delete().eq("id", sessionId);
  }

  const sessions = getLocalSessions().filter((s) => s.id !== sessionId);
  saveLocalSessions(sessions);
}

// --- Stats & Streak (async, Supabase-first) ---

export async function getStats(): Promise<UserStats> {
  if (supabase) {
    const deviceId = getDeviceId();
    const { data } = await supabase
      .from("user_stats")
      .select("*")
      .eq("device_id", deviceId)
      .single();

    if (data) {
      return {
        totalSessions: data.total_sessions,
        totalMessages: data.total_messages,
        currentStreak: data.current_streak,
        longestStreak: data.longest_streak,
        lastActiveDate: data.last_active_date,
        experimentsUsed: data.experiments_used ?? [],
      };
    }
  }
  return getLocalStats();
}

export async function recordActivity(
  experimentId: string,
  messageCount: number
): Promise<void> {
  const stats = await getStats();
  const today = getToday();
  const yesterday = getYesterday();

  stats.totalMessages += messageCount;

  if (stats.lastActiveDate !== today) {
    stats.totalSessions += 1;

    if (stats.lastActiveDate === yesterday) {
      stats.currentStreak += 1;
    } else {
      stats.currentStreak = 1;
    }

    stats.longestStreak = Math.max(stats.longestStreak, stats.currentStreak);
    stats.lastActiveDate = today;
  }

  if (!stats.experimentsUsed.includes(experimentId)) {
    stats.experimentsUsed.push(experimentId);
  }

  // Save to Supabase
  if (supabase) {
    const deviceId = getDeviceId();
    await supabase.from("user_stats").upsert({
      device_id: deviceId,
      total_sessions: stats.totalSessions,
      total_messages: stats.totalMessages,
      current_streak: stats.currentStreak,
      longest_streak: stats.longestStreak,
      last_active_date: stats.lastActiveDate,
      experiments_used: stats.experimentsUsed,
    });
  }

  // Always save locally too
  saveLocalStats(stats);
}

// --- DB row → ChatSession mapper ---

function mapDbToSession(row: Record<string, unknown>): ChatSession {
  return {
    id: row.id as string,
    experimentId: row.experiment_id as string,
    messages: row.messages as ChatSession["messages"],
    style: row.style as ChatSession["style"],
    constraintLevel: row.constraint_level as ChatSession["constraintLevel"],
    createdAt: row.created_at as number,
    updatedAt: row.updated_at as number,
  };
}
