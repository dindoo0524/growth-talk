import Link from "next/link";

export default function EmotionTranslatorPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <div className="mb-12">
        <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-(--color-accent-dim) text-3xl">
          🎭
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">감정 번역기</h1>
        <p className="mt-3 text-base text-white/50">감정에 정확한 이름을 붙이다</p>
      </div>

      <div className="mb-16 max-w-xs space-y-3 text-white/35 text-sm leading-relaxed">
        <p>지금 느끼는 감정을 말해주세요</p>
        <p>AI가 더 정확한 이름을 찾아줘요</p>
        <p>이름을 붙이면 감정이 달라져요</p>
      </div>

      <Link
        href="/experiments/emotion-translator/session"
        className="inline-flex items-center justify-center rounded-full bg-(--color-accent) px-8 py-3.5 text-base font-medium text-white transition-opacity hover:opacity-90 active:opacity-80"
      >
        감정 번역 시작
      </Link>

      <Link href="/" className="mt-6 text-xs text-white/30 transition-colors hover:text-white/50">
        ← META Lab으로 돌아가기
      </Link>
    </div>
  );
}
