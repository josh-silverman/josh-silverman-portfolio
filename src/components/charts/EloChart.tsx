import { useMemo, useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import { MEAN_RATING } from "../../lib/elo";

const W = 480;
const H = 340;
const M = { l: 38, r: 40, t: 12, b: 24 };

/**
 * Every team's rating by week. All lines are drawn in gray; `active` teams
 * are drawn on top (first in signal, the rest in panel ink) with end labels.
 * Pointer or arrow keys move a week crosshair; the readout is plain HTML.
 */
export default function EloChart({
  history,
  active,
}: {
  history: Record<string, [number, number][]>;
  active: string[];
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState<number | null>(null);

  const { maxWeek, lo, hi } = useMemo(() => {
    const all = Object.values(history).flat();
    const ratings = all.map(([, r]) => r);
    return {
      maxWeek: Math.max(...all.map(([w]) => w)),
      lo: Math.floor(Math.min(...ratings) / 50) * 50,
      hi: Math.ceil(Math.max(...ratings) / 50) * 50,
    };
  }, [history]);

  const x = (w: number) => M.l + (w / maxWeek) * (W - M.l - M.r);
  const y = (r: number) => M.t + ((hi - r) / (hi - lo)) * (H - M.t - M.b);
  const path = (pts: [number, number][]) =>
    pts.map(([w, r], i) => `${i ? "L" : "M"}${x(w).toFixed(1)},${y(r).toFixed(1)}`).join("");

  const grid: number[] = [];
  for (let r = lo; r <= hi; r += 50) grid.push(r);

  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    const box = svgRef.current?.getBoundingClientRect();
    if (!box) return;
    const vx = ((e.clientX - box.left) / box.width) * W;
    const w = Math.round(((vx - M.l) / (W - M.l - M.r)) * maxWeek);
    setCursor(Math.max(0, Math.min(maxWeek, w)));
  };
  const onKey = (e: KeyboardEvent<SVGSVGElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const step = e.key === "ArrowLeft" ? -1 : 1;
    setCursor((c) => Math.max(0, Math.min(maxWeek, (c ?? maxWeek) + step)));
  };

  const at = (team: string, w: number) => history[team]?.find(([wk]) => wk === w)?.[1];
  const shownWeek = cursor ?? maxWeek;
  const color = (i: number) => (i === 0 ? "var(--color-signal)" : "var(--color-panel-ink)");

  return (
    <div>
      <p className="num min-h-5 px-4 pt-3 text-[12px] text-panel-ink-2" aria-live="polite">
        <span className="text-panel-ink">{shownWeek === 0 ? "Preseason" : `After week ${shownWeek}`}</span>
        {active.map((t, i) => {
          const r = at(t, shownWeek);
          return r == null ? null : (
            <span key={t} className="ml-4" style={{ color: color(i) }}>
              {t} {r.toFixed(0)}
            </span>
          );
        })}
      </p>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full touch-none outline-none"
        role="img"
        aria-label={`Elo rating by week for all 32 teams${active.length ? `, highlighting ${active.join(", ")}` : ""}. Use left and right arrow keys to move between weeks.`}
        tabIndex={0}
        onPointerMove={onMove}
        onPointerLeave={() => setCursor(null)}
        onKeyDown={onKey}
        onBlur={() => setCursor(null)}
      >
        {grid.map((r) => (
          <g key={r}>
            <line x1={M.l} x2={W - M.r} y1={y(r)} y2={y(r)} stroke="var(--color-panel-rule)" />
            <text x={M.l - 8} y={y(r) + 3.5} textAnchor="end" className="num" fontSize="11" fill="var(--color-panel-ink-3)">
              {r}
            </text>
          </g>
        ))}
        <line
          x1={M.l}
          x2={W - M.r}
          y1={y(MEAN_RATING)}
          y2={y(MEAN_RATING)}
          stroke="var(--color-panel-ink-3)"
          strokeDasharray="2 4"
        />
        {Array.from({ length: maxWeek + 1 }, (_, w) => (
          <text key={w} x={x(w)} y={H - 8} textAnchor="middle" className="num" fontSize="11" fill="var(--color-panel-ink-3)">
            {w === 0 ? "Pre" : `W${w}`}
          </text>
        ))}

        {Object.entries(history)
          .filter(([t]) => !active.includes(t))
          .map(([t, pts]) => (
            <path key={t} d={path(pts)} fill="none" stroke="var(--color-panel-ink-3)" strokeOpacity="0.32" strokeWidth="1" />
          ))}

        {cursor != null && (
          <line x1={x(cursor)} x2={x(cursor)} y1={M.t} y2={H - M.b} stroke="var(--color-panel-ink-2)" strokeWidth="1" />
        )}

        {[...active].reverse().map((t) => {
          const i = active.indexOf(t);
          const pts = history[t];
          if (!pts) return null;
          const [lw, lr] = pts[pts.length - 1];
          const cr = at(t, shownWeek);
          return (
            <g key={t}>
              <path d={path(pts)} fill="none" stroke={color(i)} strokeWidth="2" />
              <text x={x(lw) + 6} y={y(lr) + 3.5} className="num" fontSize="12" fill={color(i)}>
                {t}
              </text>
              {cursor != null && cr != null && (
                <rect x={x(shownWeek) - 3} y={y(cr) - 3} width="6" height="6" fill={color(i)} />
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
