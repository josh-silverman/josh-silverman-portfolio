import { site, socials } from "../data/content";

/** Front page: nameplate, one-line tagline, intro, and links. */
export default function Masthead() {
  return (
    <header id="top" className="wrap pt-4 sm:pt-6">
      <div className="kicker flex items-center justify-between gap-x-6 border-y border-ink py-2 text-ink-2">
        <span>{site.location}</span>
        <span>{site.tagline}</span>
      </div>

      <div className="border-b-[3px] border-ink pt-6 pb-5 sm:pt-10">
        <h1 className="display text-[clamp(3.25rem,11.5vw,10rem)] leading-[0.85] tracking-[-0.045em]">
          {site.name}
        </h1>
      </div>

      <div className="grid grid-cols-12 gap-x-6 pt-8 pb-6 sm:pt-12">
        <div className="col-span-12 lg:col-span-8 lg:col-start-3">
          <p className="font-serif text-[1.3rem] leading-[1.45] text-ink sm:text-[1.5rem]">{site.intro}</p>
          <ul className="kicker mt-8 flex flex-wrap gap-x-6 gap-y-3 text-ink">
            <li>
              <a className="link" href="#projects">Projects</a>
            </li>
            <li>
              <a className="link" href={site.resumeFile} download>
                Resume (PDF)
              </a>
            </li>
            <li>
              <a className="link" href={`mailto:${socials.email}`}>
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
