'use client';

import Link from 'next/link';
import { CampaignSkeleton } from '@/components/campaign-skeleton';
import { CampaignCard } from '@/components/campaign-card';
import { CachedAt } from '@/components/cached-at';
import { LoadingSpinner } from '@/components/loading-spinner';
import { useCampaigns } from '@/hooks/use-campaigns';
import { getCampaignStatus, matchesCampaignSearch } from '@/lib/format';
import type { CampaignStatus } from '@/types';

function getCampaignGroupRank(status: CampaignStatus): number {
  if (status === 'active') {
    return 0;
  }

  if (status === 'funded') {
    return 1;
  }

  return 2;
}

export function CampaignGrid({
  featured = false,
  filter = 'all',
  searchTerm = '',
  sortBy = 'deadline',
}: {
  featured?: boolean;
  filter?: 'all' | CampaignStatus;
  searchTerm?: string;
  sortBy?: 'deadline' | 'raised' | 'goal' | 'backers';
}): JSX.Element {
  const campaignsQuery = useCampaigns();

  if (campaignsQuery.isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
        {Array.from({ length: featured ? 3 : 6 }).map((_, index) => (
          <CampaignSkeleton key={index} />
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
      return matchesCampaignSearch(campaign, searchTerm);
    }

    return getCampaignStatus(campaign) === filter && matchesCampaignSearch(campaign, searchTerm);
  });
  const sorted = [...filtered].sort((left, right) => {
    const leftStatus = getCampaignStatus(left);
    const rightStatus = getCampaignStatus(right);
    const groupDiff = getCampaignGroupRank(leftStatus) - getCampaignGroupRank(rightStatus);

    if (groupDiff !== 0) {
      return groupDiff;
    }

    if (sortBy === 'raised') {
      return right.raised - left.raised;
    }

    if (sortBy === 'goal') {
      return right.goal - left.goal;
    }

    if (sortBy === 'backers') {
      return right.backers.length - left.backers.length;
    }

    return new Date(left.deadline).getTime() - new Date(right.deadline).getTime();
  });
  const visible = featured ? sorted.slice(0, 3) : sorted;

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <LoadingSpinner label="Live updates" size="sm" />
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
        {visible.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
      )}
    </div>
  );
}
