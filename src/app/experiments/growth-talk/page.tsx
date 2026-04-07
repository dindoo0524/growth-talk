import Link from "next/link";

export default function GrowthTalkPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <div className="mb-12">
        <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-(--color-accent-dim) text-3xl">
          🌱
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">성장톡</h1>
        <p className="mt-3 text-base text-white/50">오늘의 성장 대화</p>
      </div>

      <div className="mb-16 max-w-xs space-y-3 text-white/35 text-sm leading-relaxed">
        <p>하루, 감정, 성장에 대해</p>
        <p>자유롭게 이야기하세요</p>
        <p>주제에 맞는 대화만 가능해요</p>
      </div>

      <Link
        href="/experiments/growth-talk/session"
        className="inline-flex items-center justify-center rounded-full bg-(--color-accent) px-8 py-3.5 text-base font-medium text-white transition-opacity hover:opacity-90 active:opacity-80"
      >
        대화 시작하기
      </Link>

      <Link
        href="/"
        className="mt-6 text-xs text-white/30 transition-colors hover:text-white/50"
      >
        ← META Lab으로 돌아가기
      </Link>
    </div>
  );
}
