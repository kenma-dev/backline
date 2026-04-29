'use client';

import Link from 'next/link';
import { useCampaigns } from '@/hooks/use-campaigns';
import { formatXlm, getCampaignStatus } from '@/lib/format';

export function HomeHighlights(): JSX.Element {
  const campaignsQuery = useCampaigns();

  if (campaignsQuery.isLoading) {
    return (
      <section className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="shimmer h-36 rounded-[28px] bg-white/75" />
        ))}
      </section>
    );
  }

  const campaigns = campaignsQuery.data ?? [];
  const totalRaised = campaigns.reduce((sum, campaign) => sum + campaign.raised, 0);
  const activeCount = campaigns.filter((campaign) => getCampaignStatus(campaign) === 'active').length;
  const supporterCount = campaigns.reduce((sum, campaign) => sum + campaign.backers.length, 0);

  return (
    <section className="grid gap-4 md:grid-cols-[1fr_1fr_1.15fr]">
      <article className="glass-panel rounded-[28px] border border-white/70 p-6 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-ink/45">Raised so far</p>
        <p className="mt-3 font-display text-4xl text-ink">{formatXlm(totalRaised)}</p>
        <p className="mt-2 text-sm text-ink/65">Tracked across every campaign currently visible in Backline.</p>
      </article>
      <article className="glass-panel rounded-[28px] border border-white/70 p-6 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-ink/45">Live campaigns</p>
        <p className="mt-3 font-display text-4xl text-ink">{activeCount}</p>
        <p className="mt-2 text-sm text-ink/65">Actively raising with countdowns, progress, and refund-safe rules.</p>
      </article>
      <article className="glass-panel rounded-[28px] border border-white/70 p-6 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-ink/45">Supporter momentum</p>
        <p className="mt-3 font-display text-4xl text-ink">{supporterCount}</p>
        <p className="mt-2 text-sm text-ink/65">
          Backers are building public traction campaign by campaign.
        </p>
        <Link
          href="/campaigns"
          className="mt-5 inline-flex rounded-full border border-ink/10 bg-white/80 px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/30"
        >
          Explore activity
        </Link>
      </article>
    </section>
  );
}
