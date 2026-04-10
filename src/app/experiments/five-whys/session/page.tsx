import { ChatRoom } from "@/components/chat/chat-room";
import { fiveWhysExperiment } from "@/content/experiments/five-whys";
import Link from "next/link";

export default function FiveWhysSession() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-4 flex items-center gap-3">
        <Link href="/experiments/five-whys" className="flex h-8 w-8 items-center justify-center rounded-full text-white/40 transition-colors hover:text-white/70">←</Link>
        <div>
          <p className="text-sm font-medium">🔍 {fiveWhysExperiment.name}</p>
          <p className="text-xs text-white/30">{fiveWhysExperiment.topic}</p>
        </div>
      </div>
      <ChatRoom experiment={fiveWhysExperiment} />
    </div>
  );
}
