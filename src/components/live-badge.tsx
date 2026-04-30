export function LiveBadge(): JSX.Element {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-red-700">
      <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
      Live
    </span>
  );
}
