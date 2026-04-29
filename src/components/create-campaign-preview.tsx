import { appMode } from '@/lib/env';
import { formatDeadline, formatXlm } from '@/lib/format';
import type { CampaignFormValues } from '@/types';

export function CreateCampaignPreview({
  values,
}: {
  values: CampaignFormValues;
}): JSX.Element {
  const isReady =
    values.title.trim().length > 0 &&
    values.description.trim().length > 0 &&
    values.goal > 0 &&
    values.deadline.length > 0;

  return (
    <aside className="glass-panel rounded-[32px] border border-white/70 p-8 shadow-soft">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink/45">Preview</p>
      <h2 className="mt-3 font-display text-3xl text-ink">
        {values.title.trim() || 'Your campaign title'}
      </h2>
      <p className="mt-4 text-sm leading-7 text-ink/68">
        {values.description.trim() ||
          'Describe what you are funding, why it matters, and what backers are helping unlock.'}
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[24px] border border-white/70 bg-white/75 p-4">
          <p className="text-sm text-ink/45">Goal</p>
          <p className="mt-2 font-display text-2xl text-ink">
            {values.goal > 0 ? formatXlm(values.goal) : '0.00 XLM'}
          </p>
        </div>
        <div className="rounded-[24px] border border-white/70 bg-white/75 p-4">
          <p className="text-sm text-ink/45">Deadline</p>
          <p className="mt-2 font-semibold text-ink">
            {values.deadline ? formatDeadline(values.deadline) : 'Choose a date'}
          </p>
        </div>
      </div>
      <div className="mt-6 rounded-[24px] border border-white/70 bg-white/75 p-5">
        <p className="text-sm font-semibold text-ink">Launch checklist</p>
        <div className="mt-3 space-y-2 text-sm text-ink/68">
          <p>{values.title.trim() ? 'Ready' : 'Missing'}: Clear campaign title</p>
          <p>{values.description.trim() ? 'Ready' : 'Missing'}: Full project story</p>
          <p>{values.goal > 0 ? 'Ready' : 'Missing'}: Goal amount in XLM</p>
          <p>{values.deadline ? 'Ready' : 'Missing'}: Future deadline</p>
        </div>
      </div>
      <div className="mt-6 rounded-[24px] border border-sun/35 bg-sun/15 p-4 text-sm text-amber-900">
        Launch mode: {appMode}. Until a live contract id is configured, create/back/claim/refund flows use demo transaction state.
      </div>
      {!isReady ? (
        <p className="mt-4 text-sm text-ink/55">
          Fill in every field to make this preview fully representative of the published campaign.
        </p>
      ) : null}
    </aside>
  );
}
