export interface RulerMark {
  value: number;
  label: string;
  emphasis?: boolean;
}

/**
 * One horizontal scale with labeled marks, for comparing a few numbers that
 * share a unit (e.g. share of winners picked). Labels alternate above and
 * below the line so close values do not collide.
 */
export default function Ruler({
  marks,
  domain,
  ticks,
  format,
  label,
}: {
  marks: RulerMark[];
  domain: [number, number];
  ticks: number[];
  format: (v: number) => string;
  label: string;
}) {
  const [lo, hi] = domain;
  const pos = (v: number) => `${((v - lo) / (hi - lo)) * 100}%`;
  const sorted = [...marks].sort((a, b) => a.value - b.value);
  return (
    <div role="img" aria-label={label} className="relative h-36 select-none">
      {/* axis */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-ink" />
      {ticks.map((t) => (
        <div key={t} className="absolute top-1/2" style={{ left: pos(t) }}>
          <div className="h-2 w-px -translate-y-1 bg-ink" />
          <p className="num absolute top-3 -translate-x-1/2 text-[10px] text-ink-3">{format(t)}</p>
        </div>
      ))}
      {sorted.map((m, i) => {
        const above = i % 2 === 0;
        return (
          <div key={m.label} className="absolute top-1/2" style={{ left: pos(m.value) }}>
            <span
              className={`absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 ${
                m.emphasis ? "bg-signal" : "border-2 border-ink bg-paper"
              }`}
            />
            <div
              className={`absolute w-px bg-ink/40 ${above ? "bottom-2 h-6" : "top-2 h-6"}`}
            />
            <div
              className={`absolute w-max max-w-[9rem] -translate-x-1/2 text-center ${
                above ? "bottom-9" : "top-9"
              }`}
            >
              <p className={`num text-sm ${m.emphasis ? "text-signal-ink" : "text-ink"}`}>
                {format(m.value)}
              </p>
              <p className="text-xs leading-tight text-ink-2">{m.label}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
