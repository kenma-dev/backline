'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { useCampaign } from '@/hooks/use-campaign';
import { useWallet } from '@/hooks/use-wallet';
import { useBackCampaign } from '@/hooks/use-back-campaign';
import { useBalance } from '@/hooks/use-balance';
import { useClaimFunds } from '@/hooks/use-claim-funds';
import { useRefundCampaign } from '@/hooks/use-refund-campaign';
import { CachedAt } from '@/components/cached-at';
import { LoadingSpinner } from '@/components/loading-spinner';
import { LoadingOverlay } from '@/components/loading-overlay';
import { ProgressBar } from '@/components/progress-bar';
import { TransactionStatus } from '@/components/transaction-status';
import { formatXlm, getCampaignStatus, getDaysRemaining, truncateAddress } from '@/lib/format';
import type { TransactionState } from '@/types';

export default function CampaignDetailsPage(): JSX.Element {
  const params = useParams<{ id: string }>();
  const campaignId = Number(params.id);
  const campaignQuery = useCampaign(campaignId);
  const { session } = useWallet();
  const balanceQuery = useBalance(session?.address ?? null);
  const backMutation = useBackCampaign(session?.address ?? null);
  const claimMutation = useClaimFunds();
  const refundMutation = useRefundCampaign(session?.address ?? null);
  const [amount, setAmount] = useState('25');
  const [txState, setTxState] = useState<TransactionState>({ status: 'idle' });

  const insufficientLabel = useMemo(() => {
    const numericAmount = Number(amount);
    const balance = balanceQuery.data ?? 0;

    if (!numericAmount || numericAmount <= balance) {
      return null;
    }

    return `Insufficient XLM balance. Required ${formatXlm(numericAmount)}, available ${formatXlm(balance)}.`;
  }, [amount, balanceQuery.data]);

  if (campaignQuery.isLoading) {
    return (
      <div className="glass-panel rounded-[32px] border border-white/70 p-8 shadow-soft">
        <div className="shimmer h-12 rounded-2xl bg-white/75" />
        <div className="mt-4 shimmer h-40 rounded-3xl bg-white/75" />
      </div>
    );
  }

  if (campaignQuery.isError || !campaignQuery.data) {
    return (
      <div className="rounded-[32px] border border-red-200 bg-red-50 p-8 text-red-700">
        Campaign not found or unavailable.
      </div>
    );
  }

  const campaign = campaignQuery.data;
  const status = getCampaignStatus(campaign);
  const isCreator = session?.address === campaign.creator;
  const deadlinePassed = new Date(campaign.deadline).getTime() <= Date.now();
  const canClaim = isCreator && deadlinePassed && campaign.raised >= campaign.goal && !campaign.claimed;
  const canRefund =
    Boolean(session?.address) &&
    deadlinePassed &&
    campaign.raised < campaign.goal &&
    campaign.backers.some((backer) => backer.address === session?.address);

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
      <section className="glass-panel rounded-[32px] border border-white/70 p-8 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-ink/60">
            {status}
          </span>
          <CachedAt updatedAt={campaignQuery.dataUpdatedAt} />
        </div>
        <h1 className="mt-5 font-display text-4xl text-ink">{campaign.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-ink/72">{campaign.description}</p>
        <div className="mt-8">
          <ProgressBar raised={campaign.raised} goal={campaign.goal} large />
        </div>
        <dl className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-sm text-ink/45">Creator</dt>
            <dd className="mt-2 font-semibold text-ink">{truncateAddress(campaign.creator)}</dd>
          </div>
          <div>
            <dt className="text-sm text-ink/45">Goal</dt>
            <dd className="mt-2 font-semibold text-ink">{formatXlm(campaign.goal)}</dd>
          </div>
          <div>
            <dt className="text-sm text-ink/45">Raised</dt>
            <dd className="mt-2 font-semibold text-ink">{formatXlm(campaign.raised)}</dd>
          </div>
          <div>
            <dt className="text-sm text-ink/45">Backers</dt>
            <dd className="mt-2 font-semibold text-ink">{campaign.backers.length}</dd>
          </div>
          <div>
            <dt className="text-sm text-ink/45">Deadline</dt>
            <dd className="mt-2 font-semibold text-ink">
              {new Date(campaign.deadline).toLocaleString()}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-ink/45">Countdown</dt>
            <dd className="mt-2 font-semibold text-ink">{getDaysRemaining(campaign.deadline)} days</dd>
          </div>
        </dl>
        <div className="mt-10">
          <h2 className="font-display text-2xl text-ink">Recent backers</h2>
          <div className="mt-4 space-y-3">
            {campaign.backers.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-ink/15 bg-white/55 p-5 text-sm text-ink/60">
                No contributions yet. Be the first to back this campaign.
              </div>
            ) : (
              campaign.backers.slice(0, 6).map((backer) => (
                <div
                  key={`${backer.address}-${backer.timestamp}`}
                  className="flex items-center justify-between rounded-3xl border border-white/70 bg-white/70 px-4 py-4"
                >
                  <div>
                    <p className="font-semibold text-ink">{truncateAddress(backer.address)}</p>
                    <p className="text-sm text-ink/55">
                      {new Date(backer.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <p className="font-semibold text-ink">{formatXlm(backer.amount)}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      <aside className="glass-panel sticky top-28 relative h-fit rounded-[32px] border border-white/70 p-8 shadow-soft">
        {backMutation.isPending || claimMutation.isPending || refundMutation.isPending ? (
          <LoadingOverlay label="Updating campaign..." />
        ) : null}
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/45">Back this campaign</p>
        <h2 className="mt-3 font-display text-3xl text-ink">Support with XLM</h2>
        <p className="mt-3 text-sm leading-7 text-ink/68">
          Connect your wallet, enter an amount, and confirm the backing transaction.
        </p>
        <label className="mt-6 block text-sm font-semibold text-ink" htmlFor="amount">
          Amount in XLM
        </label>
        <input
          id="amount"
          type="number"
          min="1"
          step="0.01"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/90 px-4 py-3 outline-none transition focus:border-ember"
        />
        <div className="mt-4 rounded-3xl border border-white/70 bg-white/70 p-4">
          <p className="text-sm text-ink/55">Your balance</p>
          {balanceQuery.isLoading ? (
            <div className="mt-2">
              <LoadingSpinner label="Loading balance..." size="sm" />
            </div>
          ) : (
            <p className="mt-2 font-display text-2xl text-ink">{formatXlm(balanceQuery.data ?? 0)}</p>
          )}
        </div>
        {insufficientLabel ? (
          <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {insufficientLabel}
          </div>
        ) : null}
        <button
          type="button"
          onClick={async () => {
            const numericAmount = Number(amount);

            if (!session?.address) {
              setTxState({
                status: 'error',
                message: 'Connect a wallet before backing a campaign.',
              });
              return;
            }

            if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
              setTxState({
                status: 'error',
                message: 'Enter a valid amount greater than zero.',
              });
              return;
            }

            if (insufficientLabel) {
              setTxState({ status: 'error', message: insufficientLabel });
              return;
            }

            const shouldContinue = window.confirm(
              `Confirm backing ${campaign.title} with ${formatXlm(numericAmount)}?`,
            );

            if (!shouldContinue) {
              setTxState({
                status: 'error',
                message: 'Transaction cancelled by user.',
              });
              return;
            }

            setTxState({
              status: 'pending',
              message: 'Processing transaction...',
            });

            try {
              const result = await backMutation.mutateAsync({
                campaignId: campaign.id,
                amount: numericAmount,
              });
              setAmount('25');
              setTxState({
                status: 'success',
                message: `Contribution confirmed in ${result.mode} mode.`,
                hash: result.hash,
              });
            } catch (error) {
              setTxState({
                status: 'error',
                message: error instanceof Error ? error.message : 'Unable to process transaction.',
              });
            }
          }}
          disabled={backMutation.isPending}
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {backMutation.isPending ? 'Processing transaction...' : 'Back This Campaign'}
        </button>
        <div className="mt-5">
          <TransactionStatus state={txState} />
        </div>
        {(canClaim || canRefund) && (
          <div className="mt-5 space-y-3">
            {canClaim ? (
              <button
                type="button"
                onClick={async () => {
                  setTxState({
                    status: 'pending',
                    message: 'Processing transaction...',
                  });

                  try {
                    const result = await claimMutation.mutateAsync(campaign.id);
                    setTxState({
                      status: 'success',
                      message: `Funds claimed in ${result.mode} mode.`,
                      hash: result.hash,
                    });
                  } catch (error) {
                    setTxState({
                      status: 'error',
                      message: error instanceof Error ? error.message : 'Unable to claim funds.',
                    });
                  }
                }}
                disabled={claimMutation.isPending}
                className="inline-flex w-full items-center justify-center rounded-full border border-pine/25 bg-pine/10 px-5 py-3 text-sm font-semibold text-pine transition hover:bg-pine/15 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {claimMutation.isPending ? 'Processing transaction...' : 'Claim Funds'}
              </button>
            ) : null}
            {canRefund ? (
              <button
                type="button"
                onClick={async () => {
                  setTxState({
                    status: 'pending',
                    message: 'Processing transaction...',
                  });

                  try {
                    const result = await refundMutation.mutateAsync(campaign.id);
                    setTxState({
                      status: 'success',
                      message: `Refund processed in ${result.mode} mode.`,
                      hash: result.hash,
                    });
                  } catch (error) {
                    setTxState({
                      status: 'error',
                      message: error instanceof Error ? error.message : 'Unable to process refund.',
                    });
                  }
                }}
                disabled={refundMutation.isPending}
                className="inline-flex w-full items-center justify-center rounded-full border border-ink/15 bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-ink/30 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {refundMutation.isPending ? 'Processing transaction...' : 'Request Refund'}
              </button>
            ) : null}
          </div>
        )}
      </aside>
    </div>
  );
}
