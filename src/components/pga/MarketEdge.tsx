import type { PgaDetail } from "../../data/content";
import { fixed, signed } from "../../lib/format";

/**
 * Interval plot of out-of-sample skill by market. A market counts as skilled
 * only when its whole interval sits right of zero.
 */
export default function MarketEdge({ rows }: { rows: PgaDetail["marketSkill"] }) {
  const lo = -0.1;
  const hi = 0.4;
  const pos = (v: number) => `${((v - lo) / (hi - lo)) * 100}%`;
  const ticks = [-0.1, 0, 0.1, 0.2, 0.3, 0.4];

  return (
    <div className="px-4 pt-4 pb-5">
      <table className="w-full text-sm">
        <caption className="sr-only">
          Brier skill versus the field base rate, by market, with 90% intervals
        </caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Market</th>
            <th scope="col">Skill and interval</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          {[...rows].reverse().map((r) => {
            const skilled = r.lo > 0;
            return (
              <tr key={r.market} className="border-b border-panel-rule">
                <th scope="row" className="w-24 py-3 pr-3 text-left font-normal text-panel-ink sm:w-28">
                  {r.market}
                </th>
                <td className="py-3">
                  <div
                    className="relative h-4"
                    aria-label={`${signed(r.skill, 3)}, interval ${fixed(r.lo, 3)} to ${fixed(r.hi, 3)}`}
                  >
                    <div className="absolute inset-y-0 w-px bg-panel-ink-3" style={{ left: pos(0) }} />
                    <div
                      className={`absolute top-1/2 h-[3px] -translate-y-1/2 ${skilled ? "bg-panel-ink" : "bg-panel-ink-3"}`}
                      style={{ left: pos(r.lo), width: `calc(${pos(r.hi)} - ${pos(r.lo)})` }}
                    />
                    <span
                      className={`absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 ${skilled ? "bg-signal" : "border-2 border-panel-ink-2 bg-panel"}`}
                      style={{ left: pos(r.skill) }}
                    />
                  </div>
                </td>
                <td className="num w-20 py-3 pl-3 text-right text-xs whitespace-nowrap sm:w-48">
                  <span className={skilled ? "text-panel-ink" : "text-panel-ink-2"}>{signed(r.skill, 3)}</span>
                  <span className="ml-2 hidden text-panel-ink-3 sm:inline">
                    [{fixed(r.lo, 3)}, {fixed(r.hi, 3)}]
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot aria-hidden="true">
          <tr>
            <td />
            <td className="relative h-6">
              {ticks.map((t) => (
                <span key={t} className="num absolute top-1.5 -translate-x-1/2 text-[10px] text-panel-ink-3" style={{ left: pos(t) }}>
                  {t === 0 ? "0" : signed(t, 1)}
                </span>
              ))}
            </td>
            <td />
          </tr>
        </tfoot>
      </table>
      <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-panel-ink-2">
        <span className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 bg-signal" /> Interval clears zero: real edge
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 border-2 border-panel-ink-2" /> Interval includes zero: no claimed edge
        </span>
      </p>
    </div>
  );
}
