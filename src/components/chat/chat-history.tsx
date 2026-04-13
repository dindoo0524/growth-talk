"use client";

import type { ChatSession } from "@/lib/chat/types";
import { deleteSession } from "@/lib/chat/storage";
import { useState } from "react";

interface ChatHistoryProps {
  sessions: ChatSession[];
  currentSessionId: string;
  onSelect: (session: ChatSession) => void;
  onClose: () => void;
}

function formatTime(timestamp: number): string {
  const d = new Date(timestamp);
  const now = new Date();
  const isToday = d.toDateString() === now.toDateString();

  if (isToday) {
    return d.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" });
  }

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) {
    return "어제";
  }

  return d.toLocaleDateString("ko-KR", { month: "short", day: "numeric" });
}

function getPreview(session: ChatSession): string {
  const firstUserMsg = session.messages.find((m) => m.role === "user");
  if (!firstUserMsg) return "새 대화";
  const text = firstUserMsg.content;
  return text.length > 30 ? text.slice(0, 30) + "..." : text;
}

export function ChatHistory({
  sessions,
  currentSessionId,
  onSelect,
  onClose,
}: ChatHistoryProps) {
  const [items, setItems] = useState(sessions);

  const handleDelete = (sessionId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteSession(sessionId);
    setItems((prev) => prev.filter((s) => s.id !== sessionId));
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <p className="text-sm text-white/30">대화 기록이 없어요</p>
        <button
          onClick={onClose}
          className="mt-4 text-xs text-(--color-accent) hover:underline"
        >
          새 대화 시작하기
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-y-auto">
      <div className="flex flex-col gap-1.5 pb-4">
        {items.map((session) => {
          const isCurrent = session.id === currentSessionId;
          return (
            <button
              key={session.id}
              onClick={() => onSelect(session)}
              className={`group flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left transition-all ${
                isCurrent
                  ? "bg-(--color-accent-dim) border border-(--color-accent)/30"
                  : "bg-white/3 border border-transparent hover:bg-white/5"
              }`}
            >
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm truncate ${isCurrent ? "text-foreground" : "text-white/60"}`}
                >
                  {getPreview(session)}
                </p>
                <p className="text-[10px] text-white/25 mt-0.5">
                  {formatTime(session.updatedAt)} · {session.messages.length}개 메시지
                </p>
              </div>
              {!isCurrent && (
                <button
                  onClick={(e) => handleDelete(session.id, e)}
                  className="opacity-0 group-hover:opacity-100 text-white/20 hover:text-white/50 text-xs transition-opacity"
                >
                  ✕
                </button>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
