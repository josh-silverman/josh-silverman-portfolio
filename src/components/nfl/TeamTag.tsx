import type { NflTeam } from "../../data/nfl/types";

/** Team abbreviation with a thin team-color tick. Team colors are never used as fills. */
export default function TeamTag({
  abbr,
  team,
  className = "",
}: {
  abbr: string;
  team?: NflTeam;
  className?: string;
}) {
  return (
    <span className={`num inline-flex items-center gap-1.5 ${className}`} title={team?.name}>
      <span aria-hidden="true" className="inline-block h-3 w-[3px]" style={{ background: team?.color ?? "currentColor" }} />
      {abbr}
    </span>
  );
}
