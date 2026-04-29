import { CampaignGrid } from '@/components/campaign-grid';
import { Hero } from '@/components/hero';

export default function HomePage(): JSX.Element {
  return (
    <div className="space-y-10">
      <Hero />
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
    </div>
  );
}
