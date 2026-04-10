import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      {/* Brand */}
      <div className="mb-16">
        <h1 className="text-5xl font-bold tracking-widest text-foreground">
          META
        </h1>
        <p className="mt-2 text-xs font-medium tracking-widest text-white/25 uppercase">
          Lab
        </p>
        <p className="mt-4 text-sm tracking-wide text-white/40">
          세상의 지식을 탐구하다
        </p>
      </div>

      {/* Explore experiments */}
      <div className="w-full space-y-4">
        <p className="mb-6 text-xs font-medium tracking-widest text-white/30 uppercase">
          Experiments
        </p>

        <Link
          href="/experiments/growth-talk"
          className="group flex w-full items-center gap-4 rounded-2xl border border-(--color-border) bg-(--color-card) px-5 py-5 transition-all hover:border-(--color-accent)/30 hover:bg-(--color-accent-dim)"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-accent-dim) text-lg">
            🌱
          </span>
          <div className="flex-1 text-left">
            <p className="text-base font-medium text-foreground">성장톡</p>
            <p className="mt-0.5 text-sm text-white/40">
              하루 10분, 오늘의 성장 대화
            </p>
          </div>
          <span className="text-white/20 transition-colors group-hover:text-(--color-accent)">
            →
          </span>
        </Link>

        <Link
          href="/experiments/spanish-tutor"
          className="group flex w-full items-center gap-4 rounded-2xl border border-(--color-border) bg-(--color-card) px-5 py-5 transition-all hover:border-(--color-accent)/30 hover:bg-(--color-accent-dim)"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-accent-dim) text-lg">
            🇪🇸
          </span>
          <div className="flex-1 text-left">
            <p className="text-base font-medium text-foreground">스페인어 튜터</p>
            <p className="mt-0.5 text-sm text-white/40">
              스페인어 회화 연습
            </p>
          </div>
          <span className="text-white/20 transition-colors group-hover:text-(--color-accent)">
            →
          </span>
        </Link>

        <Link
          href="/experiments/one-line"
          className="group flex w-full items-center gap-4 rounded-2xl border border-(--color-border) bg-(--color-card) px-5 py-5 transition-all hover:border-(--color-accent)/30 hover:bg-(--color-accent-dim)"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-accent-dim) text-lg">
            ✏️
          </span>
          <div className="flex-1 text-left">
            <p className="text-base font-medium text-foreground">하루 한 줄</p>
            <p className="mt-0.5 text-sm text-white/40">
              오늘을 한 문장으로
            </p>
          </div>
          <span className="text-white/20 transition-colors group-hover:text-(--color-accent)">
            →
          </span>
        </Link>

        <Link
          href="/experiments/five-whys"
          className="group flex w-full items-center gap-4 rounded-2xl border border-(--color-border) bg-(--color-card) px-5 py-5 transition-all hover:border-(--color-accent)/30 hover:bg-(--color-accent-dim)"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-accent-dim) text-lg">
            🔍
          </span>
          <div className="flex-1 text-left">
            <p className="text-base font-medium text-foreground">역질문</p>
            <p className="mt-0.5 text-sm text-white/40">왜? 를 끝까지 파고들다</p>
          </div>
          <span className="text-white/20 transition-colors group-hover:text-(--color-accent)">→</span>
        </Link>

        <Link
          href="/experiments/emotion-translator"
          className="group flex w-full items-center gap-4 rounded-2xl border border-(--color-border) bg-(--color-card) px-5 py-5 transition-all hover:border-(--color-accent)/30 hover:bg-(--color-accent-dim)"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-accent-dim) text-lg">
            🎭
          </span>
          <div className="flex-1 text-left">
            <p className="text-base font-medium text-foreground">감정 번역기</p>
            <p className="mt-0.5 text-sm text-white/40">감정에 정확한 이름을 붙이다</p>
          </div>
          <span className="text-white/20 transition-colors group-hover:text-(--color-accent)">→</span>
        </Link>

        <Link
          href="/experiments/both-sides"
          className="group flex w-full items-center gap-4 rounded-2xl border border-(--color-border) bg-(--color-card) px-5 py-5 transition-all hover:border-(--color-accent)/30 hover:bg-(--color-accent-dim)"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-(--color-accent-dim) text-lg">
            ⚖️
          </span>
          <div className="flex-1 text-left">
            <p className="text-base font-medium text-foreground">양면 사고</p>
            <p className="mt-0.5 text-sm text-white/40">모든 주제에는 두 면이 있다</p>
          </div>
          <span className="text-white/20 transition-colors group-hover:text-(--color-accent)">→</span>
        </Link>
      </div>
    </div>
  );
}
