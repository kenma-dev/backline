import Link from 'next/link';

export function EmptyState({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
}: {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}): JSX.Element {
  return (
    <div className="glass-panel rounded-[28px] border border-white/70 p-8 text-center shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink/45">{eyebrow}</p>
      <h3 className="mt-3 font-display text-2xl text-ink">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-ink/68">{description}</p>
      {ctaLabel && ctaHref ? (
        <div className="mt-6 flex justify-center">
          <Link
            href={ctaHref}
            className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink/90"
          >
            {ctaLabel}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
