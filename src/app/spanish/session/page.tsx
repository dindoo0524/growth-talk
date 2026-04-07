import { ChatRoom } from "@/components/chat/chat-room";
import { spanishWorld } from "@/content/worlds/spanish";
import Link from "next/link";

export default function SpanishSession() {
  return (
    <div className="flex flex-1 flex-col">
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <Link
          href="/spanish"
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition-colors hover:text-white/70"
        >
          ←
        </Link>
        <div>
          <p className="text-sm font-medium">{spanishWorld.name}</p>
          <p className="text-xs text-white/30">{spanishWorld.topic}</p>
        </div>
      </div>

      {/* Chat */}
      <ChatRoom world={spanishWorld} />
    </div>
  );
}
