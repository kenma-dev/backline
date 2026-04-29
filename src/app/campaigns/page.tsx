'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AppModePanel } from '@/components/app-mode-panel';
import { CampaignGrid } from '@/components/campaign-grid';
import { useWallet } from '@/hooks/use-wallet';
import type { CampaignStatus } from '@/types';

const filters: Array<{ label: string; value: 'all' | CampaignStatus }> = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Funded', value: 'funded' },
  { label: 'Ended', value: 'ended' },
];

export default function CampaignsPage(): JSX.Element {
  const [filter, setFilter] = useState<'all' | CampaignStatus>('all');
  const { session } = useWallet();

  return (
    <div className="space-y-8">
      <section className="glass-panel rounded-[32px] border border-white/70 p-8 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/45">Campaigns</p>
        <h1 className="mt-3 font-display text-4xl text-ink">Browse every Backline project</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-ink/72">
          Track live progress, see how many supporters joined, and back projects with your Stellar wallet.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {session ? (
            <Link
              href="/create"
              className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink/90"
            >
              Create Campaign
            </Link>
          ) : (
            <span className="rounded-full bg-sun/18 px-4 py-2 text-sm font-semibold text-amber-900">
              Connect a wallet to create a campaign
            </span>
          )}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                filter === item.value
                  ? 'bg-ink text-white'
                  : 'border border-ink/10 bg-white/85 text-ink hover:border-ink/30'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>
      <AppModePanel />
      <CampaignGrid filter={filter} />
    </div>
  );
}
