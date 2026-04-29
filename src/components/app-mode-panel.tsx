import { appMode, env } from '@/lib/env';

export function AppModePanel(): JSX.Element {
  return (
    <section className="glass-panel rounded-[28px] border border-white/70 p-6 shadow-soft">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-ink/45">
            Network mode
          </p>
          <h3 className="mt-2 font-display text-2xl text-ink">
            {appMode === 'contract' ? 'Soroban contract mode' : 'Demo data mode'}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-ink/68">
            Network: {env.network}. {appMode === 'contract'
              ? 'The frontend is configured to use a deployed contract id.'
              : 'The frontend is using local demo campaign state until a deployed contract id is provided.'}
          </p>
        </div>
        <span
          className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] ${
            appMode === 'contract'
              ? 'bg-pine/15 text-pine'
              : 'bg-sun/20 text-amber-900'
          }`}
        >
          {appMode}
        </span>
      </div>
    </section>
  );
}
