import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      {/* Brand */}
      <div className="mb-16">
        <h1 className="text-5xl font-bold tracking-widest text-foreground">
          META
        </h1>
        <p className="mt-4 text-sm tracking-wide text-white/40">
          세상의 지식을 탐구하다
        </p>
      </div>

      {/* Explore worlds */}
      <div className="w-full space-y-4">
        <p className="mb-6 text-xs font-medium tracking-widest text-white/30 uppercase">
          Explore
        </p>

        <Link
          href="/growth-talk"
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

        {/* Future worlds - placeholder */}
        <div className="flex w-full items-center gap-4 rounded-2xl border border-(--color-border)/50 bg-(--color-card)/50 px-5 py-5 opacity-40">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-lg">
            🔭
          </span>
          <div className="flex-1 text-left">
            <p className="text-base font-medium">coming soon</p>
            <p className="mt-0.5 text-sm text-white/30">새로운 탐험이 열립니다</p>
          </div>
        </div>
      </div>
    </div>
  );
}
