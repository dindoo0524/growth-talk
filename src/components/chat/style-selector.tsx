"use client";

import type { ChatStyle } from "@/lib/chat/types";

interface StyleSelectorProps {
  style: ChatStyle;
  onStyleChange: (style: ChatStyle) => void;
}

const characters: {
  id: ChatStyle;
  name: string;
  label: string;
  avatar: string;
}[] = [
  {
    id: "iris",
    name: "Iris",
    label: "calm",
    // balanced eyes, neutral mouth
    avatar: [
      "_ _ _ _ _ _",
      "_ ■ _ _ ■ _",
      "_ _ _ _ _ _",
      "_ _ ── _ _",
    ].join("\n"),
  },
  {
    id: "milo",
    name: "Milo",
    label: "warm",
    // softer eyes, curved mouth
    avatar: [
      "_ _ _ _ _ _",
      "_ ● _ _ ● _",
      "_ _ _ _ _ _",
      "_ _ ◡ _ _ _",
    ].join("\n"),
  },
  {
    id: "noah",
    name: "Noah",
    label: "sharp",
    // sharper eyes, flat mouth
    avatar: [
      "_ _ _ _ _ _",
      "_ ◆ _ _ ◆ _",
      "_ _ _ _ _ _",
      "_ _ ─ _ _ _",
    ].join("\n"),
  },
];

function PixelAvatar({ characterId }: { characterId: ChatStyle }) {
  return (
    <div className="relative h-10 w-10 rounded-lg bg-white/6 flex items-center justify-center">
      {characterId === "iris" && (
        <div className="relative w-6 h-6">
          {/* eyes */}
          <div className="absolute top-1 left-0.5 w-1.5 h-1.5 rounded-sm bg-purple-300/80" />
          <div className="absolute top-1 right-0.5 w-1.5 h-1.5 rounded-sm bg-purple-300/80" />
          {/* mouth */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-px bg-purple-300/50" />
        </div>
      )}
      {characterId === "milo" && (
        <div className="relative w-6 h-6">
          {/* eyes */}
          <div className="absolute top-1 left-0.5 w-1.5 h-1.5 rounded-full bg-amber-300/80" />
          <div className="absolute top-1 right-0.5 w-1.5 h-1.5 rounded-full bg-amber-300/80" />
          {/* mouth - curved */}
          <div className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-2.5 h-1.5 border-b-2 border-amber-300/50 rounded-b-full" />
        </div>
      )}
      {characterId === "noah" && (
        <div className="relative w-6 h-6">
          {/* eyes - diamond shaped */}
          <div className="absolute top-1 left-0.5 w-1.5 h-1.5 rotate-45 bg-red-300/80" />
          <div className="absolute top-1 right-0.5 w-1.5 h-1.5 rotate-45 bg-red-300/80" />
          {/* mouth - flat line */}
          <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-px bg-red-300/50" />
        </div>
      )}
    </div>
  );
}

export function StyleSelector({ style, onStyleChange }: StyleSelectorProps) {
  return (
    <div className="flex gap-2 mb-4">
      {characters.map((char) => {
        const isActive = style === char.id;
        return (
          <button
            key={char.id}
            onClick={() => onStyleChange(char.id)}
            className={`flex flex-1 items-center gap-2.5 rounded-xl px-3 py-2.5 transition-all ${
              isActive
                ? "bg-(--color-accent-dim) border border-(--color-accent)/40 shadow-[0_0_12px_rgba(167,139,250,0.15)]"
                : "bg-white/4 border border-transparent hover:bg-white/6"
            }`}
          >
            <PixelAvatar characterId={char.id} />
            <div className="text-left">
              <p
                className={`text-xs font-medium ${isActive ? "text-foreground" : "text-white/50"}`}
              >
                {char.name}
              </p>
              <p
                className={`text-[10px] ${isActive ? "text-(--color-accent)" : "text-white/25"}`}
              >
                {char.label}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
