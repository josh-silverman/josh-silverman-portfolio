/**
 * Model vs. Vegas on a 0-100% line. Square = model, ring = Vegas.
 * Drawn with positioned HTML so marks stay crisp at any width.
 */
export default function Dumbbell({
  ours,
  vegas,
  label,
}: {
  ours: number;
  vegas: number | null;
  label: string;
}) {
  const lo = vegas == null ? ours : Math.min(ours, vegas);
  const hi = vegas == null ? ours : Math.max(ours, vegas);
  return (
    <div className="relative h-5 w-full" role="img" aria-label={label}>
      <div className="absolute inset-x-0 top-1/2 h-px bg-panel-rule" />
      <div className="absolute top-0.5 bottom-0.5 left-1/2 w-px bg-panel-ink-3/60" />
      {vegas != null && (
        <>
          <div
            className="absolute top-1/2 h-[2px] -translate-y-1/2 bg-panel-ink-3"
            style={{ left: `${lo * 100}%`, width: `${(hi - lo) * 100}%` }}
          />
          <span
            className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-panel-ink bg-panel"
            style={{ left: `${vegas * 100}%` }}
          />
        </>
      )}
      <span
        className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 bg-signal"
        style={{ left: `${ours * 100}%` }}
      />
    </div>
  );
}
