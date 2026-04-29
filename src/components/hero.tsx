import Link from 'next/link';

const supportedWallets = ['Freighter', 'Albedo', 'xBull'];

export function Hero(): JSX.Element {
  return (
    <section className="fade-in glass-panel relative overflow-hidden rounded-[36px] border border-white/70 px-6 py-12 shadow-soft sm:px-10 lg:px-14 lg:py-16">
      <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,_rgba(255,122,69,0.25),_transparent_70%)] lg:block" />
      <div className="relative max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-ember">
          Stellar Testnet Crowdfunding
        </p>
        <h1 className="mt-5 font-display text-4xl leading-tight text-ink sm:text-5xl lg:text-6xl">
          Fund artists, community projects, and live ideas with instant XLM support.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-ink/72 sm:text-lg">
          Backline gives creators a clean, transparent way to launch campaigns on Stellar with visible progress, wallet-native transactions, and refund-safe campaign rules.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/campaigns"
            className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink/90"
          >
            Browse All Campaigns
          </Link>
          <Link
            href="/create"
            className="inline-flex items-center justify-center rounded-full border border-ink/10 bg-white/85 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink/30"
          >
            Create Campaign
          </Link>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.26em] text-ink/45">
            Works with
          </span>
          {supportedWallets.map((wallet) => (
            <span
              key={wallet}
              className="rounded-full border border-white/80 bg-white/75 px-3 py-2 text-sm font-semibold text-ink/75"
            >
              {wallet}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
