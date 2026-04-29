import { getExplorerTransactionUrl } from '@/lib/balance';
import type { TransactionState } from '@/types';

const statusStyles: Record<TransactionState['status'], string> = {
  idle: 'border-ink/10 bg-white/70 text-ink/70',
  pending: 'border-sun/60 bg-sun/15 text-amber-900',
  success: 'border-pine/30 bg-pine/10 text-pine',
  error: 'border-red-300 bg-red-50 text-red-700',
};

export function TransactionStatus({
  state,
}: {
  state: TransactionState;
}): JSX.Element | null {
  if (state.status === 'idle') {
    return null;
  }

  return (
    <div className={`rounded-3xl border p-4 text-sm ${statusStyles[state.status]}`}>
      <p className="font-semibold">
        {state.status === 'pending'
          ? 'Pending...'
          : state.status === 'success'
            ? 'Success!'
            : 'Failed'}
      </p>
      {state.message ? <p className="mt-1">{state.message}</p> : null}
      {state.hash ? (
        <a
          href={getExplorerTransactionUrl(state.hash)}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex text-sm font-semibold underline underline-offset-4"
        >
          View transaction on Stellar Expert
        </a>
      ) : null}
    </div>
  );
}
