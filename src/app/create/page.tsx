'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateCampaign } from '@/hooks/use-create-campaign';
import { useWallet } from '@/hooks/use-wallet';
import { LoadingOverlay } from '@/components/loading-overlay';
import { TransactionStatus } from '@/components/transaction-status';
import { fromDateInputValue, toDateInputValue } from '@/lib/format';
import type { CampaignFormValues, TransactionState } from '@/types';

const initialValues: CampaignFormValues = {
  title: '',
  description: '',
  goal: 0,
  deadline: '',
};

export default function CreateCampaignPage(): JSX.Element {
  const router = useRouter();
  const { session } = useWallet();
  const createMutation = useCreateCampaign(session?.address ?? null);
  const [values, setValues] = useState<CampaignFormValues>(initialValues);
  const [txState, setTxState] = useState<TransactionState>({ status: 'idle' });

  return (
    <div className="mx-auto w-full max-w-3xl">
      <section className="glass-panel relative rounded-[32px] border border-white/70 p-8 shadow-soft">
        {createMutation.isPending ? <LoadingOverlay label="Creating campaign..." /> : null}
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/45">Launch a campaign</p>
        <h1 className="mt-3 font-display text-4xl text-ink">Create your Backline page</h1>
        <p className="mt-4 text-base leading-8 text-ink/72">
          Add a clear title, explain the story, set an XLM target, and choose a deadline.
        </p>
        {!session?.address ? (
          <div className="mt-6 rounded-3xl border border-sun/35 bg-sun/15 p-4 text-sm text-amber-900">
            Connect a wallet first so the campaign can be created under your Stellar address.
          </div>
        ) : null}
        <form
          className="mt-8 space-y-5"
          onSubmit={async (event) => {
            event.preventDefault();

            if (!session?.address) {
              setTxState({
                status: 'error',
                message: 'Connect a wallet before launching a campaign.',
              });
              return;
            }

            if (!values.title.trim() || !values.description.trim() || values.goal <= 0 || !values.deadline) {
              setTxState({
                status: 'error',
                message: 'Complete every required field before launching.',
              });
              return;
            }

            if (new Date(values.deadline).getTime() <= Date.now()) {
              setTxState({
                status: 'error',
                message: 'Choose a deadline in the future.',
              });
              return;
            }

            setTxState({
              status: 'pending',
              message: 'Processing transaction...',
            });

            try {
              const result = await createMutation.mutateAsync(values);
              setTxState({
                status: 'success',
                message: 'Campaign created successfully.',
                hash: result.hash,
              });
              router.push(`/campaign/${result.campaign.id}`);
            } catch (error) {
              setTxState({
                status: 'error',
                message: error instanceof Error ? error.message : 'Unable to create campaign.',
              });
            }
          }}
        >
          <div>
            <label htmlFor="title" className="text-sm font-semibold text-ink">
              Campaign title
            </label>
            <input
              id="title"
              value={values.title}
              onChange={(event) =>
                setValues((current) => ({ ...current, title: event.target.value }))
              }
              className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/90 px-4 py-3 outline-none transition focus:border-ember"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="text-sm font-semibold text-ink">
              Description
            </label>
            <textarea
              id="description"
              value={values.description}
              onChange={(event) =>
                setValues((current) => ({ ...current, description: event.target.value }))
              }
              className="mt-2 min-h-40 w-full rounded-2xl border border-ink/10 bg-white/90 px-4 py-3 outline-none transition focus:border-ember"
              required
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="goal" className="text-sm font-semibold text-ink">
                Goal amount in XLM
              </label>
              <input
                id="goal"
                type="number"
                min="1"
                value={values.goal || ''}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    goal: Number(event.target.value),
                  }))
                }
                className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/90 px-4 py-3 outline-none transition focus:border-ember"
                required
              />
            </div>
            <div>
              <label htmlFor="deadline" className="text-sm font-semibold text-ink">
                Deadline
              </label>
              <input
                id="deadline"
                type="date"
                value={toDateInputValue(values.deadline)}
                onChange={(event) =>
                  setValues((current) => ({
                    ...current,
                    deadline: fromDateInputValue(event.target.value),
                  }))
                }
                className="mt-2 w-full rounded-2xl border border-ink/10 bg-white/90 px-4 py-3 outline-none transition focus:border-ember"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={createMutation.isPending || !session?.address}
            className="inline-flex w-full items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {createMutation.isPending ? 'Processing transaction...' : 'Launch Campaign'}
          </button>
        </form>
        <div className="mt-6">
          <TransactionStatus state={txState} />
        </div>
      </section>
    </div>
  );
}
