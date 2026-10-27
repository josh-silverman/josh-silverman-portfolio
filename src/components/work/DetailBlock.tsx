import type { ReactNode } from "react";

/** A labeled block inside a project's "More detail" drawer. */
export default function DetailBlock({
  title,
  note,
  children,
}: {
  title: string;
  note?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mt-12 first:mt-2">
      <p className="kicker text-ink">{title}</p>
      {note && <p className="mt-2 max-w-[64ch] text-sm leading-relaxed text-ink-2">{note}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}
