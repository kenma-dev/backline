import { formatXlm } from '@/lib/format';

const suggestionValues = [10, 25, 50, 100];

export function SupportSuggestions({
  remaining,
  onSelect,
}: {
  remaining: number;
  onSelect: (value: number) => void;
}): JSX.Element {
  const suggested = suggestionValues.filter((value) => value < remaining).slice(0, 3);
  const includeRemaining = remaining > 0 && remaining <= 250;
  const options = includeRemaining ? [...suggested, Math.ceil(remaining)] : suggested;

  return (
    <div className="mt-5 rounded-[24px] border border-white/70 bg-white/70 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-ink">Support suggestions</p>
          <p className="mt-1 text-sm leading-6 text-ink/62">
            {remaining > 0
              ? `${formatXlm(remaining)} remains to reach the goal.`
              : 'This campaign has already reached its goal.'}
          </p>
        </div>
      </div>
      {options.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {options.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onSelect(value)}
              className="rounded-full border border-ink/10 bg-white/85 px-4 py-2 text-sm font-semibold text-ink transition hover:border-ember/35"
            >
              {formatXlm(value)}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
