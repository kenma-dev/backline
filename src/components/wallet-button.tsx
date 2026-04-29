'use client';

import { useState } from 'react';
import { truncateAddress } from '@/lib/format';
import { walletOptions } from '@/lib/wallet-options';
import { useWallet } from '@/hooks/use-wallet';

export function WalletButton(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedWalletId, setSelectedWalletId] = useState<string | null>(null);
  const { session, lastWalletId, connectWallet, disconnectWallet, isConnecting, connectionLabel, errorMessage } =
    useWallet();
  const selectedWallet = walletOptions.find((wallet) => wallet.id === selectedWalletId);

  if (session) {
    return (
      <div className="flex items-center gap-3">
        <div className="rounded-full border border-white/60 bg-white/75 px-4 py-2 text-sm font-semibold text-ink">
          {truncateAddress(session.address)}
        </div>
        <button
          type="button"
          onClick={disconnectWallet}
          className="rounded-full border border-ink/10 px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/30"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-ink/90"
      >
        Connect Wallet
      </button>
      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/35 px-4">
          <div className="glass-panel w-full max-w-lg rounded-[32px] border border-white/70 p-6 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-ink/50">
                  Wallets
                </p>
                <h3 className="mt-2 font-display text-2xl text-ink">
                  Pick your Stellar wallet
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-ink/10 px-3 py-2 text-sm text-ink/70"
                aria-label="Close wallet modal"
              >
                Close
              </button>
            </div>
            <div className="mt-6 space-y-3">
              {walletOptions.map((wallet) => (
                <button
                  key={wallet.id}
                  type="button"
                  onClick={async () => {
                    setSelectedWalletId(wallet.id);
                    try {
                      await connectWallet(wallet.id);
                      setIsOpen(false);
                    } catch {
                      setIsOpen(true);
                    }
                  }}
                  className="flex w-full items-center justify-between rounded-3xl border border-white/80 bg-white/80 px-4 py-4 text-left transition hover:border-ember/40 hover:bg-white"
                >
                  <span>
                    <span className="block font-semibold text-ink">
                      {wallet.name}
                      {lastWalletId === wallet.id ? (
                        <span className="ml-2 rounded-full bg-sun/25 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-amber-900">
                          Last used
                        </span>
                      ) : null}
                    </span>
                    <span className="mt-1 block text-sm text-ink/65">{wallet.description}</span>
                  </span>
                  <span className="text-sm font-semibold text-ember">Connect</span>
                </button>
              ))}
            </div>
            {isConnecting && connectionLabel ? (
              <p className="mt-4 text-sm font-semibold text-ink/75">{connectionLabel}</p>
            ) : null}
            {errorMessage ? (
              <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                <p>{errorMessage}</p>
                {errorMessage.toLowerCase().includes('not installed') && selectedWallet ? (
                  <a
                    href={selectedWallet.installUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex font-semibold underline underline-offset-4"
                  >
                    Install {selectedWallet.name}
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
