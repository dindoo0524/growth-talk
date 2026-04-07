interface NextActionCardProps {
  action: string;
}

export function NextActionCard({ action }: NextActionCardProps) {
  return (
    <div className="rounded-xl border border-(--color-border) bg-(--color-accent-dim) px-5 py-5">
      <p className="mb-2 text-sm font-medium text-(--color-accent)">
        내일의 한 가지
      </p>
      <p className="text-base font-medium leading-relaxed">{action}</p>
    </div>
  );
}
