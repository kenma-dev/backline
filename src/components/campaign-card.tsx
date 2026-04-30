import Link from 'next/link';
import { LiveBadge } from '@/components/live-badge';
import { formatCountdownLabel, formatXlm, getCampaignStatus, truncateAddress } from '@/lib/format';
import type { Campaign, CampaignStatus } from '@/types';
import { ProgressBar } from '@/components/progress-bar';

const badgeStyles: Record<CampaignStatus, string> = {
  active: 'bg-tide/15 text-pine',
  funded: 'bg-sun/20 text-amber-900',
  ended: 'bg-ink/10 text-ink/70',
};

export function CampaignCard({
  campaign,
}: {
  campaign: Campaign;
}): JSX.Element {
  const status = getCampaignStatus(campaign);
  const isEnded = status === 'ended';

  return (
    <article
      className={`glass-panel fade-in relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/70 p-6 shadow-soft ${
        isEnded ? 'opacity-80 saturate-75' : ''
      }`}
    >
      {isEnded ? (
        <div className="pointer-events-none absolute inset-0 bg-cream/45" aria-hidden="true" />
      ) : null}
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeStyles[status]}`}>
            {status}
          </span>
          {campaign.claimed ? (
            <span className="ml-2 inline-flex rounded-full bg-pine/12 px-3 py-1 text-xs font-semibold text-pine">
              claimed
            </span>
          ) : null}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <h3 className="font-display text-2xl text-ink">{campaign.title}</h3>
            {!isEnded ? <LiveBadge /> : null}
          </div>
        </div>
        <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-ink/60">
          {formatCountdownLabel(campaign.deadline)}
        </span>
      </div>
      <p className="mt-4 line-clamp-3 text-sm leading-6 text-ink/72">{campaign.description}</p>
      <div className="mt-6">
        <ProgressBar raised={campaign.raised} goal={campaign.goal} />
      </div>
      <dl className="mt-6 grid grid-cols-2 gap-4 text-sm text-ink/80">
        <div>
          <dt className="text-ink/45">Goal</dt>
          <dd className="mt-1 font-semibold">{formatXlm(campaign.goal)}</dd>
        </div>
        <div>
          <dt className="text-ink/45">Raised</dt>
          <dd className="mt-1 font-semibold">{formatXlm(campaign.raised)}</dd>
        </div>
        <div>
          <dt className="text-ink/45">Backers</dt>
          <dd className="mt-1 font-semibold">{campaign.backers.length}</dd>
        </div>
        <div>
          <dt className="text-ink/45">Creator</dt>
          <dd className="mt-1 font-semibold">{truncateAddress(campaign.creator)}</dd>
        </div>
      </dl>
      <Link
        href={`/campaign/${campaign.id}`}
        className="relative mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink/90"
      >
        View Details
      </Link>
    </article>
  );
}
