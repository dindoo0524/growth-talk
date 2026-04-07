"use client";

import type { ConstraintLevel } from "@/lib/chat/types";

interface ConstraintSelectorProps {
  level: ConstraintLevel;
  onLevelChange: (level: ConstraintLevel) => void;
}

const options: { id: ConstraintLevel; label: string; hint: string }[] = [
  { id: "free", label: "Free", hint: "answers openly" },
  { id: "guided", label: "Guided", hint: "asks and guides" },
  { id: "strict", label: "Strict", hint: "no direct answers" },
];

export function ConstraintSelector({
  level,
  onLevelChange,
}: ConstraintSelectorProps) {
  return (
    <div className="flex gap-1.5 mb-4">
      {options.map((opt) => {
        const isActive = level === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onLevelChange(opt.id)}
            className={`flex flex-1 flex-col items-center rounded-lg px-2 py-2 transition-all ${
              isActive
                ? "bg-(--color-accent-dim) border border-(--color-accent)/30"
                : "bg-white/3 border border-transparent hover:bg-white/5"
            }`}
          >
            <p
              className={`text-xs font-medium ${isActive ? "text-foreground" : "text-white/40"}`}
            >
              {opt.label}
            </p>
            <p
              className={`text-[9px] mt-0.5 ${isActive ? "text-(--color-accent)/70" : "text-white/20"}`}
            >
              {opt.hint}
            </p>
          </button>
        );
      })}
    </div>
  );
}
