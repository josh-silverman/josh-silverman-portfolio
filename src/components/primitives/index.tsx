import type { ReactNode } from "react";

/**
 * Shared building blocks. Structure comes from rules and type, not cards:
 * no rounded corners, no shadows, no gradients.
 */

export function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`kicker text-ink-3 ${className}`}>{children}</p>;
}

/** External link with the one functional glyph we allow. */
export function ExtLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={`link ${className}`}>
      {children}
      <span aria-hidden="true"> ↗</span>
    </a>
  );
}

/**
 * Dark "terminal" panel for every data module. The title bar carries a
 * mono label on the left and an optional status (with a signal square)
 * on the right.
 */
export function Panel({
  label,
  status,
  children,
  className = "",
}: {
  label: ReactNode;
  status?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`min-w-0 bg-panel text-panel-ink ${className}`}>
      <div className="kicker flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-panel-rule px-4 py-2.5 text-panel-ink-2">
        <span>{label}</span>
        {status && (
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 bg-signal" />
            {status}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

/**
 * Native <details> drawer for the technical layer. Works without JS and is
 * keyboard accessible by default.
 */
export function Drawer({
  title,
  hint,
  children,
  tone = "paper",
}: {
  title: string;
  hint?: string;
  children: ReactNode;
  tone?: "paper" | "panel";
}) {
  const rule = tone === "panel" ? "border-panel-rule" : "border-ink";
  const muted = tone === "panel" ? "text-panel-ink-2" : "text-ink-3";
  return (
    <details className={`group border-t ${rule}`}>
      <summary className="flex cursor-pointer items-baseline justify-between gap-4 py-4 select-none">
        <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="kicker">{title}</span>
          {hint && <span className={`text-sm ${muted}`}>{hint}</span>}
        </span>
        <span
          aria-hidden="true"
          className="num text-lg leading-none transition-transform duration-150 group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="pb-10">{children}</div>
    </details>
  );
}

export interface PipelineStep {
  label: string;
  detail: string;
  /** Technical note, shown in mono under the detail. */
  tech?: string;
}

/** Left-to-right process schematic. Stacks vertically on small screens. */
export function Pipeline({ steps, tone = "paper" }: { steps: PipelineStep[]; tone?: "paper" | "panel" }) {
  const rule = tone === "panel" ? "border-panel-rule" : "border-rule";
  const muted = tone === "panel" ? "text-panel-ink-2" : "text-ink-2";
  const faint = tone === "panel" ? "text-panel-ink-3" : "text-ink-3";
  return (
    <ol
      className="grid gap-px md:grid-flow-col md:auto-cols-fr"
      aria-label="Pipeline, in order"
    >
      {steps.map((step, i) => (
        <li key={step.label} className={`relative border-t-2 pt-3 pr-5 pb-6 ${i === 0 ? "border-signal" : tone === "panel" ? "border-panel-ink-2" : "border-ink"}`}>
          <span className={`num text-[11px] ${faint}`}>
            {String(i + 1).padStart(2, "0")}
            {i < steps.length - 1 && <span aria-hidden="true" className="hidden md:inline"> ──→</span>}
          </span>
          <p className="mt-2 font-semibold">{step.label}</p>
          <p className={`mt-1.5 text-sm leading-relaxed ${muted}`}>{step.detail}</p>
          {step.tech && (
            <p className={`num mt-3 border-t ${rule} pt-2 text-[11px] leading-relaxed ${faint}`}>
              {step.tech}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}

/** Figure with a kicker caption and a source line. */
export function Figure({
  caption,
  source,
  children,
  className = "",
}: {
  caption?: ReactNode;
  source?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure className={className}>
      {children}
      {(caption || source) && (
        <figcaption className="mt-3 space-y-1 text-sm leading-relaxed text-ink-2">
          {caption && <p>{caption}</p>}
          {source && <p className="kicker text-ink-3">{source}</p>}
        </figcaption>
      )}
    </figure>
  );
}
