'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { BalancePill } from '@/components/balance-pill';
import { WalletButton } from '@/components/wallet-button';
import { useRewardBalance } from '@/hooks/use-reward-balance';
import { useWallet } from '@/hooks/use-wallet';

export function MobileNav(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const { session } = useWallet();
  const rewardBalanceQuery = useRewardBalance(session?.address ?? null);
  const navLinkClassName =
    'rounded-[20px] border border-ink/10 bg-white/85 px-4 py-3 text-left text-sm font-semibold text-ink transition hover:border-ink/30';

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-ink/10 bg-white/80 text-ink transition hover:border-ink/30"
        aria-expanded={isOpen}
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-30 bg-ink/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation menu"
          />
          <div className="fixed inset-x-4 top-20 z-40 rounded-[28px] border border-white/70 bg-cream/95 p-4 shadow-soft">
            <nav className="flex flex-col gap-3">
              <Link href="/campaigns" className={navLinkClassName} onClick={() => setIsOpen(false)}>
                Campaigns
              </Link>
              <Link href="/create" className={navLinkClassName} onClick={() => setIsOpen(false)}>
                Create Campaign
              </Link>
              {session ? (
                <Link href="/dashboard" className={navLinkClassName} onClick={() => setIsOpen(false)}>
                  Dashboard
                </Link>
              ) : null}
            </nav>
            {session?.address ? (
              <div className="mt-4 space-y-3">
                <BalancePill address={session.address} />
                <div className="rounded-[24px] border border-purple-200 bg-purple-50 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-700/70">
                    Reward balance
                  </p>
                  <p className="mt-2 font-display text-xl text-purple-900">
                    {(rewardBalanceQuery.data ?? 0).toFixed(2)} BLR
                  </p>
                </div>
              </div>
            ) : null}
            <div className="mt-4">
              <WalletButton />
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
