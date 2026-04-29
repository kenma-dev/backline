import { CampaignGrid } from '@/components/campaign-grid';
import { ConnectedOverview } from '@/components/connected-overview';
import { Hero } from '@/components/hero';
import { HomeHighlights } from '@/components/home-highlights';
import { RecentActivity } from '@/components/recent-activity';

export default function HomePage(): JSX.Element {
  return (
    <div className="space-y-10">
      <Hero />
      <ConnectedOverview />
      <HomeHighlights />
      <section className="space-y-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink/45">
              Featured campaigns
            </p>
            <h2 className="mt-2 font-display text-3xl text-ink">Momentum worth backing</h2>
          </div>
        </div>
        <CampaignGrid featured />
      </section>
      <RecentActivity />
      <section className="glass-panel rounded-[32px] border border-white/70 p-8 shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink/45">
          Built for clarity
        </p>
        <div className="mt-4 grid gap-6 md:grid-cols-3">
          <div>
            <h3 className="font-display text-2xl text-ink">Transparent progress</h3>
            <p className="mt-2 text-sm leading-7 text-ink/68">
              Every campaign shows clear goals, backer counts, and deadline-sensitive status.
            </p>
          </div>
          <div>
            <h3 className="font-display text-2xl text-ink">Wallet-native flows</h3>
            <p className="mt-2 text-sm leading-7 text-ink/68">
              Supporters connect a Stellar wallet, confirm intent, and get transaction feedback instantly.
            </p>
          </div>
          <div>
            <h3 className="font-display text-2xl text-ink">Refund-safe outcomes</h3>
            <p className="mt-2 text-sm leading-7 text-ink/68">
              Campaigns are designed around clear claim and refund paths once deadlines are reached.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
