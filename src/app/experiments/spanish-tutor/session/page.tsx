import { ChatRoom } from "@/components/chat/chat-room";
import { spanishTutorExperiment } from "@/content/experiments/spanish-tutor";
import Link from "next/link";

export default function SpanishTutorSession() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-4 flex items-center gap-3">
        <Link
          href="/experiments/spanish-tutor"
          className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition-colors hover:text-white/70"
        >
          ←
        </Link>
        <div>
          <p className="text-sm font-medium">{spanishTutorExperiment.name}</p>
          <p className="text-xs text-white/30">{spanishTutorExperiment.topic}</p>
        </div>
      </div>

      <ChatRoom experiment={spanishTutorExperiment} />
    </div>
  );
}
