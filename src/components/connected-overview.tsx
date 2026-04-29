'use client';

import Link from 'next/link';
import { useBalance } from '@/hooks/use-balance';
import { useCampaigns } from '@/hooks/use-campaigns';
import { useWallet } from '@/hooks/use-wallet';
import { formatXlm, getUserContribution, truncateAddress } from '@/lib/format';

export function ConnectedOverview(): JSX.Element | null {
  const { session } = useWallet();
  const campaignsQuery = useCampaigns();
  const balanceQuery = useBalance(session?.address ?? null);

  if (!session?.address) {
    return null;
  }

  const campaigns = campaignsQuery.data ?? [];
  const createdCount = campaigns.filter((campaign) => campaign.creator === session.address).length;
  const backedCount = campaigns.filter((campaign) => getUserContribution(campaign, session.address) > 0).length;
  const backedTotal = campaigns.reduce((sum, campaign) => {
    return sum + getUserContribution(campaign, session.address);
  }, 0);

  return (
    <section className="glass-panel rounded-[32px] border border-white/70 p-8 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink/45">
            Account overview
          </p>
          <h2 className="mt-2 font-display text-3xl text-ink">
            Connected as {truncateAddress(session.address)}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/68">
            Review your balance, track campaigns you launched, and keep an eye on your support activity in one place.
          </p>
        </div>
        <div className="rounded-[24px] border border-white/75 bg-white/75 px-5 py-4 text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ink/45">
            Available balance
          </p>
          <p className="mt-2 font-display text-3xl text-ink">
            {balanceQuery.isLoading ? 'Loading...' : formatXlm(balanceQuery.data ?? 0)}
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <article className="rounded-[24px] border border-white/75 bg-white/75 p-5">
          <p className="text-sm text-ink/45">Campaigns created</p>
          <p className="mt-2 font-display text-3xl text-ink">{createdCount}</p>
        </article>
        <article className="rounded-[24px] border border-white/75 bg-white/75 p-5">
          <p className="text-sm text-ink/45">Campaigns backed</p>
          <p className="mt-2 font-display text-3xl text-ink">{backedCount}</p>
        </article>
        <article className="rounded-[24px] border border-white/75 bg-white/75 p-5">
          <p className="text-sm text-ink/45">Total supported</p>
          <p className="mt-2 font-display text-3xl text-ink">{formatXlm(backedTotal)}</p>
        </article>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/create"
          className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink/90"
        >
          Launch another campaign
        </Link>
        <Link
          href="/campaigns"
          className="rounded-full border border-ink/10 bg-white/80 px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink/30"
        >
          Review campaigns
        </Link>
        <Link
          href="/dashboard"
          className="rounded-full border border-ink/10 bg-white/80 px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink/30"
        >
          Open dashboard
        </Link>
      </div>
    </section>
  );
}
