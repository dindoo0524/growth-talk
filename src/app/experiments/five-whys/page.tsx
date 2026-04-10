import Link from "next/link";

export default function FiveWhysPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <div className="mb-12">
        <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-(--color-accent-dim) text-3xl">
          🔍
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight">역질문</h1>
        <p className="mt-3 text-base text-white/50">왜? 를 끝까지 파고들다</p>
      </div>

      <div className="mb-16 max-w-xs space-y-3 text-white/35 text-sm leading-relaxed">
        <p>생각 하나를 던져주세요</p>
        <p>AI는 &quot;왜?&quot;만 물어요</p>
        <p>5번의 왜, 생각의 뿌리를 찾아요</p>
      </div>

      <Link
        href="/experiments/five-whys/session"
        className="inline-flex items-center justify-center rounded-full bg-(--color-accent) px-8 py-3.5 text-base font-medium text-white transition-opacity hover:opacity-90 active:opacity-80"
      >
        파고들기 시작
      </Link>

      <Link href="/" className="mt-6 text-xs text-white/30 transition-colors hover:text-white/50">
        ← META Lab으로 돌아가기
      </Link>
    </div>
  );
}
