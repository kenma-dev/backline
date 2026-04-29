'use client';

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
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}
