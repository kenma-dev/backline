'use client';

import Link from 'next/link';
import { useCampaigns } from '@/hooks/use-campaigns';
import { formatXlm, truncateAddress } from '@/lib/format';

export function RecentActivity(): JSX.Element {
  const campaignsQuery = useCampaigns();

  if (campaignsQuery.isLoading) {
    return (
      <section className="glass-panel rounded-[28px] border border-white/70 p-6 shadow-soft">
        <div className="shimmer h-10 rounded-2xl bg-white/75" />
        <div className="mt-4 space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="shimmer h-20 rounded-[24px] bg-white/75" />
          ))}
        </div>
      </section>
    );
  }

  const items = (campaignsQuery.data ?? [])
    .flatMap((campaign) =>
      campaign.backers.map((backer) => ({
        campaignId: campaign.id,
        campaignTitle: campaign.title,
        address: backer.address,
        amount: backer.amount,
        timestamp: backer.timestamp,
      })),
    )
    .sort((left, right) => new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime())
    .slice(0, 5);

  return (
    <section className="glass-panel rounded-[28px] border border-white/70 p-6 shadow-soft">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-ink/45">
            Recent activity
          </p>
          <h3 className="mt-2 font-display text-2xl text-ink">Latest support across Backline</h3>
        </div>
        <Link
          href="/campaigns"
          className="rounded-full border border-ink/10 bg-white/80 px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/30"
        >
          See all campaigns
        </Link>
      </div>
      <div className="mt-5 space-y-3">
        {items.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-ink/15 bg-white/60 p-5 text-sm text-ink/60">
            Contributions will appear here as soon as supporters start backing campaigns.
          </div>
        ) : (
          items.map((item) => (
            <Link
              key={`${item.campaignId}-${item.address}-${item.timestamp}`}
              href={`/campaign/${item.campaignId}`}
              className="flex items-center justify-between gap-4 rounded-[24px] border border-white/75 bg-white/75 px-4 py-4 transition hover:border-ember/30 hover:bg-white"
            >
              <div>
                <p className="font-semibold text-ink">{truncateAddress(item.address)}</p>
                <p className="mt-1 text-sm text-ink/62">
                  backed <span className="font-semibold text-ink">{item.campaignTitle}</span>
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-ink/45">
                  {new Date(item.timestamp).toLocaleString()}
                </p>
              </div>
              <p className="whitespace-nowrap font-semibold text-ink">{formatXlm(item.amount)}</p>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
