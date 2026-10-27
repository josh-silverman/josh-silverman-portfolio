import { site, socials } from "../data/content";

export default function Footer() {
  return (
    <footer className="bg-panel text-panel-ink-2">
      <div className="wrap kicker flex flex-wrap items-center justify-between gap-4 py-6">
        <p className="text-panel-ink">
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="flex gap-5">
          <a href={`mailto:${socials.email}`} className="hover:text-panel-ink">Email</a>
          <a href={socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-panel-ink">LinkedIn</a>
          <a href={socials.github} target="_blank" rel="noreferrer" className="hover:text-panel-ink">GitHub</a>
        </p>
      </div>
    </footer>
  );
}
