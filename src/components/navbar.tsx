'use client';

import Link from 'next/link';
import { BalancePill } from '@/components/balance-pill';
import { WalletButton } from '@/components/wallet-button';
import { useWallet } from '@/hooks/use-wallet';

export function Navbar(): JSX.Element {
  const { session } = useWallet();

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-cream/80 backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-display text-2xl font-bold text-ink">
            Backline
          </Link>
          <nav className="hidden items-center gap-4 text-sm font-semibold text-ink/70 md:flex">
            <Link href="/campaigns">Campaigns</Link>
            <Link href="/create">Create</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <BalancePill address={session?.address ?? null} />
          <WalletButton />
        </div>
      </div>
    </header>
  );
}
