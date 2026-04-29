import { getCampaignStateSummary } from '@/lib/format';
import type { Campaign, CampaignStatus } from '@/types';

const stateStyles: Record<CampaignStatus, string> = {
  active: 'border-tide/25 bg-tide/10 text-pine',
  funded: 'border-sun/35 bg-sun/18 text-amber-900',
  ended: 'border-ink/15 bg-ink/7 text-ink/75',
};

export function CampaignStateBanner({
  campaign,
  status,
}: {
  campaign: Campaign;
  status: CampaignStatus;
}): JSX.Element {
  return (
    <div className={`mt-6 rounded-[28px] border p-5 ${stateStyles[status]}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.24em]">Campaign state</p>
      <p className="mt-3 text-sm leading-7">{getCampaignStateSummary(campaign)}</p>
    </div>
  );
}
