import { ChatRoom } from "@/components/chat/chat-room";
import { bothSidesExperiment } from "@/content/experiments/both-sides";
import Link from "next/link";

export default function BothSidesSession() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-4 flex items-center gap-3">
        <Link href="/experiments/both-sides" className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition-colors hover:text-white/70">←</Link>
        <div>
          <p className="text-sm font-medium">⚖️ {bothSidesExperiment.name}</p>
          <p className="text-xs text-white/30">{bothSidesExperiment.topic}</p>
        </div>
      </div>
      <ChatRoom experiment={bothSidesExperiment} />
    </div>
  );
}
