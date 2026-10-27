import { labCopy, nflProject, ratingsCopy, scorecardCopy, thisWeekCopy } from "../../data/nfl/content";
import { featuredGame } from "../../lib/nfl-select";
import { useNflData } from "../../lib/useNflData";
import DetailBlock from "../work/DetailBlock";
import MatchupLab from "./MatchupLab";
import NflMethod from "./NflMethod";
import PowerRatings from "./PowerRatings";
import Scorecard from "./Scorecard";
import ThisWeek from "./ThisWeek";

/** Everything behind the NFL entry's "More detail" drawer. */
export default function NflDetail() {
  const data = useNflData();
  const featured = featuredGame(data);
  const pair = featured ? [featured.game.home, featured.game.away] : [data.rankings[0].team];

  return (
    <>
      <div className="max-w-[64ch] space-y-4 leading-relaxed text-ink-2">
        {nflProject.intro.map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>

      <DetailBlock title={thisWeekCopy.title} note={thisWeekCopy.note}>
        <ThisWeek data={data} />
      </DetailBlock>

      <DetailBlock title={ratingsCopy.title} note={ratingsCopy.note}>
        <PowerRatings data={data} initial={pair} />
      </DetailBlock>

      <DetailBlock title={labCopy.title} note={labCopy.note}>
        <MatchupLab
          data={data}
          initialHome={featured?.game.home ?? data.rankings[0].team}
          initialAway={featured?.game.away ?? data.rankings[1].team}
          initialNeutral={featured?.game.neutral}
        />
      </DetailBlock>

      <DetailBlock title={scorecardCopy.title}>
        <Scorecard data={data} />
      </DetailBlock>

      <DetailBlock title="Method">
        <NflMethod />
      </DetailBlock>
    </>
  );
}
