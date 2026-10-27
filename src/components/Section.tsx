import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  /** Two-digit section number, hung in the left margin. */
  number: string;
  title: string;
  /** Optional serif deck under the headline. */
  deck?: ReactNode;
  children: ReactNode;
}

export default function Section({ id, number, title, deck, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-14 pt-20 pb-4 sm:pt-28">
      <div className="wrap">
        <header className="grid grid-cols-12 gap-x-6 border-t-[3px] border-ink pt-4">
          <p
            aria-hidden="true"
            className="num col-span-12 text-sm text-signal-ink lg:col-span-2 lg:text-5xl lg:leading-none lg:text-ink"
          >
            {number}
          </p>
          <div className="col-span-12 mt-3 lg:col-span-10 lg:mt-0">
            <h2 className="display text-[clamp(2.4rem,5.5vw,4.5rem)] text-ink">{title}</h2>
            {deck && (
              <p className="mt-5 max-w-[62ch] font-serif text-lg leading-snug text-ink-2 sm:text-xl">
                {deck}
              </p>
            )}
          </div>
        </header>
        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </section>
  );
}
