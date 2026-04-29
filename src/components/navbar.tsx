'use client';

import Link from 'next/link';
import { WalletButton } from '@/components/wallet-button';
import { useWallet } from '@/hooks/use-wallet';

export function Navbar(): JSX.Element {
  const { session } = useWallet();
  const navLinkClassName =
    'inline-flex items-center justify-center rounded-full border border-ink/10 bg-white/78 px-4 py-2 text-sm font-semibold text-ink transition hover:border-ink/30 hover:bg-white';

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-cream/80 backdrop-blur-lg">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <div>
            <Link href="/" className="font-display text-2xl font-bold text-ink">
              Backline
            </Link>
            <p className="hidden text-xs uppercase tracking-[0.26em] text-ink/45 sm:block">Creator funding platform</p>
          </div>
          <nav className="hidden items-center gap-3 md:flex">
            <Link href="/campaigns" className={navLinkClassName}>
              Campaigns
            </Link>
            <Link href="/create" className={navLinkClassName}>
              Create
            </Link>
            {session ? (
              <Link href="/dashboard" className={navLinkClassName}>
                Dashboard
              </Link>
            ) : null}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <WalletButton />
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-7xl gap-2 px-4 pb-4 md:hidden sm:px-6 lg:px-8">
        <Link
          href="/campaigns"
          className="rounded-full border border-ink/10 bg-white/75 px-4 py-2 text-sm font-semibold text-ink"
        >
          Campaigns
        </Link>
        <Link
          href="/create"
          className="rounded-full border border-ink/10 bg-white/75 px-4 py-2 text-sm font-semibold text-ink"
        >
          Create
        </Link>
        {session ? (
          <Link
            href="/dashboard"
            className="rounded-full border border-ink/10 bg-white/75 px-4 py-2 text-sm font-semibold text-ink"
          >
            Dashboard
          </Link>
        ) : null}
      </div>
    </header>
  );
}
