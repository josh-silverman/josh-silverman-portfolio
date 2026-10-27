import { useId, useState } from "react";
import { sgStabilization } from "../../data/content";
import { pct } from "../../lib/format";

const reliability = (n: number, k: number) => n / (n + k);

/**
 * Interactive version of the stabilization study: for a given number of
 * rounds, how much of a player's above- or below-average strokes gained is
 * likely to hold up, per category. Uses the study's fitted R(n) = n / (n + k).
 */
export default function SgTrust() {
  const id = useId();
  const [rounds, setRounds] = useState(12);
  const putting = sgStabilization.find((c) => c.category === "Putting");
  const tee = sgStabilization.find((c) => c.category === "Off the tee");

  return (
    <div className="p-4 sm:p-5">
      <label htmlFor={id} className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="kicker text-panel-ink-2">Rounds in the sample</span>
        <span className="num text-2xl text-panel-ink">{rounds}</span>
      </label>
      <input
        id={id}
        type="range"
        min={1}
        max={120}
        value={rounds}
        onChange={(e) => setRounds(Number(e.target.value))}
        className="mt-2 w-full accent-[var(--color-signal)]"
      />
      <div className="num flex justify-between text-[10px] text-panel-ink-3" aria-hidden="true">
        <span>1</span>
        <span>40</span>
        <span>80</span>
        <span>120</span>
      </div>

      <dl className="mt-5 space-y-3">
        {sgStabilization.map((c) => {
          const r = reliability(rounds, c.k);
          return (
            <div key={c.category} className="grid grid-cols-[8.5rem_1fr_3rem] items-center gap-3 text-sm">
              <dt className="text-panel-ink-2">
                {c.category}
                <span className="num block text-[10px] text-panel-ink-3">k = {c.k}</span>
              </dt>
              <dd className="relative h-3 bg-panel-rule" aria-hidden="true">
                <span className="absolute inset-y-0 left-0 bg-panel-ink-2" style={{ width: pct(r, 1) }} />
                <span className="absolute inset-y-[-3px] left-1/2 w-px bg-panel-ink-3" />
              </dd>
              <dd className="num text-right text-panel-ink">{pct(r)}</dd>
            </div>
          );
        })}
      </dl>

      {putting && tee && (
        <p className="mt-5 border-t border-panel-rule pt-4 text-sm leading-relaxed text-panel-ink-2" aria-live="polite">
          With {rounds} {rounds === 1 ? "round" : "rounds"} of data, about{" "}
          <span className="text-panel-ink">{pct(reliability(rounds, putting.k))}</span> of a player's
          above-average putting is likely to hold up. For driving it is about{" "}
          <span className="text-panel-ink">{pct(reliability(rounds, tee.k))}</span>.
        </p>
      )}
      <p className="num mt-3 text-[11px] text-panel-ink-3">
        R(n) = n / (n + k). k is the number of rounds where reliability reaches 0.5 (center line).
      </p>
    </div>
  );
}
