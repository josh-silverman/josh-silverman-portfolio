import { pgaDetail as pga } from "../../data/content";
import { Panel, Pipeline } from "../primitives";
import DetailBlock from "../work/DetailBlock";
import MarketEdge from "./MarketEdge";

/**
 * Everything behind the PGA entry's "More detail" drawer. DataGolf's terms
 * forbid redistributing its per-player values, so this shows only the
 * project's own aggregates.
 */
export default function PgaDetail() {
  return (
    <>
      <p className="max-w-[64ch] leading-relaxed text-ink-2">{pga.whyIBuiltIt}</p>

      <DetailBlock title="How it works">
        <Pipeline steps={pga.howItWorks.map((s) => ({ label: s.step, detail: s.detail, tech: s.tech }))} />
      </DetailBlock>

      <DetailBlock title="Where the model has an edge" note={pga.findingsNote}>
        <Panel label="Out-of-sample skill vs. field base rate, by market">
          <MarketEdge rows={pga.marketSkill} />
        </Panel>
        <p className="kicker mt-3 text-ink-3">{pga.marketSkillSource}</p>
        <p className="mt-5 max-w-[70ch] text-sm leading-relaxed text-ink-2">
          Skill is Brier skill against the field base rate for each market. For players DataGolf covers, the
          served board uses DataGolf's own probabilities, so the live record mostly measures those; the
          in-house model's independent skill is measured on the uncovered remainder.
        </p>
      </DetailBlock>
    </>
  );
}
