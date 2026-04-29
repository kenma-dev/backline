'use client';

import Link from 'next/link';
import { CampaignCard } from '@/components/campaign-card';
import { CachedAt } from '@/components/cached-at';
import { LoadingSpinner } from '@/components/loading-spinner';
import { useCampaigns } from '@/hooks/use-campaigns';
import { getCampaignStatus } from '@/lib/format';
import type { CampaignStatus } from '@/types';

export function CampaignGrid({
  featured = false,
  filter = 'all',
}: {
  featured?: boolean;
  filter?: 'all' | CampaignStatus;
}): JSX.Element {
  const campaignsQuery = useCampaigns();

  if (campaignsQuery.isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: featured ? 3 : 6 }).map((_, index) => (
          <div key={index} className="shimmer h-[320px] rounded-[28px] bg-white/75" />
        ))}
      </div>
    );
  }

  if (campaignsQuery.isError) {
    return (
      <div className="rounded-[28px] border border-red-200 bg-red-50 p-6 text-red-700">
        Unable to load campaigns right now.
      </div>
    );
  }

  const campaigns = campaignsQuery.data ?? [];
  const filtered = campaigns.filter((campaign) => {
    if (filter === 'all') {
      return true;
    }

    return getCampaignStatus(campaign) === filter;
  });
  const visible = featured ? filtered.slice(0, 3) : filtered;

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <LoadingSpinner label="Real-time updates every 30 seconds" size="sm" />
        <CachedAt updatedAt={campaignsQuery.dataUpdatedAt} />
      </div>
      {visible.length === 0 ? (
        <div className="glass-panel rounded-[28px] border border-white/70 p-8 text-center shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink/45">
            Nothing here yet
          </p>
          <h3 className="mt-3 font-display text-2xl text-ink">No campaigns match this view.</h3>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-ink/68">
            Try a different filter, refresh the page, or launch a new Backline campaign to get momentum started.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/create"
              className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink/90"
            >
              Launch a Campaign
            </Link>
          </div>
        </div>
      ) : (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
      )}
    </div>
  );
}
