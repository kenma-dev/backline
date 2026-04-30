'use client';

import { ToastMessage } from '@/components/toast-message';
import { useWallet } from '@/hooks/use-wallet';

export function WalletButton(): JSX.Element {
  const {
    session,
    lastWalletId,
    connectWallet,
    disconnectWallet,
    isConnecting,
    connectionLabel,
    errorMessage,
    clearWalletError,
  } = useWallet();

  if (session) {
    return (
      <>
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-white/60 bg-white/75 px-4 py-2 text-sm font-semibold text-ink hidden md:flex">
            Freighter connected
          </div>
          <button
            type="button"
            onClick={disconnectWallet}
            className="rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/30"
          >
            Disconnect
          </button>
        </div>
        {errorMessage ? (
          <ToastMessage
            variant="error"
            title="Wallet error"
            message={errorMessage}
            onDismiss={clearWalletError}
          />
        ) : null}
      </>
    );
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <button
        type="button"
        onClick={async () => {
          clearWalletError();
          try {
            await connectWallet();
          } catch {
            return;
          }
        }}
        disabled={isConnecting}
        className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink/90"
      >
        {isConnecting ? 'Connecting to Freighter...' : 'Connect Freighter'}
      </button>
      {lastWalletId === 'freighter' ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/45">
          Freighter ready
        </p>
      ) : null}
      {errorMessage ? (
        <ToastMessage
          variant="error"
          title="Wallet error"
          message={errorMessage}
          onDismiss={clearWalletError}
        />
      ) : null}
    </div>
  );
}
