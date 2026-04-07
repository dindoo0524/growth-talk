import Link from "next/link";

export default function GrowthTalkPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <div className="mb-12">
        <p className="mb-3 text-xs font-medium tracking-widest text-(--color-accent) uppercase">
          META
        </p>
        <h1 className="text-3xl font-bold tracking-tight">성장톡</h1>
        <p className="mt-3 text-base text-white/50">
          오늘의 성장 대화
        </p>
      </div>

      <div className="mb-16 max-w-xs space-y-3 text-white/40 text-sm leading-relaxed">
        <p>하루 10분, 3가지 질문으로</p>
        <p>오늘을 돌아보고</p>
        <p>내일의 한 걸음을 정해요</p>
      </div>

      <Link
        href="/growth-talk/session"
        className="inline-flex items-center justify-center rounded-full bg-(--color-accent) px-8 py-3.5 text-base font-medium text-white transition-opacity hover:opacity-90 active:opacity-80"
      >
        오늘의 대화 시작하기
      </Link>

      <p className="mt-8 text-xs text-white/30">약 10분 소요</p>
    </div>
  );
}
