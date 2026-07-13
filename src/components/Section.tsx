import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  kicker: string;
  title: string;
  children: ReactNode;
}

export default function Section({ id, kicker, title, children }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-16 border-t border-zinc-900 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <p className="font-mono text-xs tracking-[0.25em] text-accent uppercase">{kicker}</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
          {title}
        </h2>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
