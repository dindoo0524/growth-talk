"use client";

import { useEffect, useState } from "react";
import type { UserStats } from "@/lib/chat/types";
import { getStats } from "@/lib/chat/storage";

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

export function StatsWidget() {
  const [stats, setStats] = useState<UserStats>(getDefaultStats);

  useEffect(() => {
    getStats().then(setStats);
  }, []);

  // Don't render if no activity yet
  if (stats.totalSessions === 0) return null;

  return (
    <div className="w-full mb-8">
      <div className="rounded-2xl border border-(--color-border) bg-(--color-card) px-5 py-4">
        <div className="flex items-center justify-between">
          {/* Streak */}
          <div className="text-center">
            <p className="text-2xl font-bold text-(--color-accent)">
              {stats.currentStreak}
            </p>
            <p className="text-[10px] text-white/30 mt-0.5">
              {stats.currentStreak > 0 ? "일 연속" : "스트릭"}
            </p>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-white/8" />

          {/* Sessions */}
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {stats.totalSessions}
            </p>
            <p className="text-[10px] text-white/30 mt-0.5">대화</p>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-white/8" />

          {/* Messages */}
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {stats.totalMessages}
            </p>
            <p className="text-[10px] text-white/30 mt-0.5">메시지</p>
          </div>

          {/* Divider */}
          <div className="h-8 w-px bg-white/8" />

          {/* Experiments explored */}
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {stats.experimentsUsed.length}
            </p>
            <p className="text-[10px] text-white/30 mt-0.5">실험</p>
          </div>
        </div>

        {/* Streak badge */}
        {stats.currentStreak >= 3 && (
          <div className="mt-3 pt-3 border-t border-white/5 text-center">
            <p className="text-xs text-(--color-accent)/70">
              🔥 {stats.currentStreak}일 연속 탐구 중!
              {stats.currentStreak >= stats.longestStreak && stats.currentStreak >= 3 && " 최고 기록!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
