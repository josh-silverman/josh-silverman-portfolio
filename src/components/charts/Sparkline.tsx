/** Inline trend line. Pass a shared domain so rows are comparable. */
export default function Sparkline({
  values,
  domain,
  width = 72,
  height = 18,
  className = "",
}: {
  values: number[];
  domain: [number, number];
  width?: number;
  height?: number;
  className?: string;
}) {
  if (values.length < 2) return null;
  const [lo, hi] = domain;
  const x = (i: number) => (i / (values.length - 1)) * (width - 3) + 1.5;
  const y = (v: number) => 1.5 + ((hi - v) / (hi - lo || 1)) * (height - 3);
  const points = values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const last = values.length - 1;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      className={className}
    >
      <polyline points={points} fill="none" stroke="currentColor" strokeWidth="1.25" />
      <rect x={x(last) - 1.5} y={y(values[last]) - 1.5} width="3" height="3" fill="var(--color-signal)" />
    </svg>
  );
}
