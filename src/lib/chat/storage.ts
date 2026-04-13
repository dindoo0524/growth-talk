import type { ChatSession, UserStats } from "./types";

const SESSIONS_KEY = "meta-lab-sessions";
const STATS_KEY = "meta-lab-stats";

// --- Sessions ---

export function getSessions(): ChatSession[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(SESSIONS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function getSessionsByExperiment(experimentId: string): ChatSession[] {
  return getSessions()
    .filter((s) => s.experimentId === experimentId)
    .sort((a, b) => b.updatedAt - a.updatedAt);
}

export function getSession(sessionId: string): ChatSession | null {
  return getSessions().find((s) => s.id === sessionId) ?? null;
}

export function saveSession(session: ChatSession): void {
  const sessions = getSessions();
  const index = sessions.findIndex((s) => s.id === session.id);
  if (index >= 0) {
    sessions[index] = session;
  } else {
    sessions.push(session);
  }
  // Keep max 50 sessions
  const trimmed = sessions
    .sort((a, b) => b.updatedAt - a.updatedAt)
    .slice(0, 50);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(trimmed));
}

export function deleteSession(sessionId: string): void {
  const sessions = getSessions().filter((s) => s.id !== sessionId);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
}

// --- Stats & Streak ---

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

export function getStats(): UserStats {
  if (typeof window === "undefined") return getDefaultStats();
  const raw = localStorage.getItem(STATS_KEY);
  return raw ? JSON.parse(raw) : getDefaultStats();
}

export function recordActivity(experimentId: string, messageCount: number): void {
  const stats = getStats();
  const today = getToday();
  const yesterday = getYesterday();

  // Update counts
  stats.totalMessages += messageCount;

  // Update streak
  if (stats.lastActiveDate !== today) {
    stats.totalSessions += 1;

    if (stats.lastActiveDate === yesterday) {
      stats.currentStreak += 1;
    } else if (stats.lastActiveDate !== today) {
      stats.currentStreak = 1;
    }

    stats.longestStreak = Math.max(stats.longestStreak, stats.currentStreak);
    stats.lastActiveDate = today;
  }

  // Update experiments used
  if (!stats.experimentsUsed.includes(experimentId)) {
    stats.experimentsUsed.push(experimentId);
  }

  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
}
