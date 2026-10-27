import { projects } from "../../data/content";
import NflDetail from "../nfl/NflDetail";
import PgaDetail from "../pga/PgaDetail";
import ReportsList from "../pga/ReportsList";
import { Panel } from "../primitives";
import SgTrust from "../research/SgTrust";
import Section from "../Section";
import ProjectEntry from "./ProjectEntry";

function Figure({ src, alt }: { src: string; alt: string }) {
  return (
    <Panel label="Figure">
      <img src={src} alt={alt} loading="lazy" className="block h-auto w-full" />
    </Panel>
  );
}

/** All projects, presented the same way, in one section. */
export default function Work() {
  return (
    <Section id="projects" number="01" title="Projects">
      <div className="space-y-16">
        {projects.map((project, i) => {
          const figure = project.image ? <Figure src={project.image} alt={project.imageAlt ?? project.title} /> : null;
          let detail = figure;
          if (project.id === "nfl") detail = <NflDetail />;
          if (project.id === "pga") detail = <PgaDetail />;
          if (project.id === "sg-reliability")
            detail = (
              <div className="grid gap-px md:grid-cols-2">
                <Panel label="Try it · how much of a hot streak is real">
                  <SgTrust />
                </Panel>
                {figure}
              </div>
            );
          return (
            <ProjectEntry
              key={project.id}
              project={project}
              index={i}
              extra={project.id === "pga" ? <ReportsList /> : undefined}
              detail={detail}
            />
          );
        })}
      </div>
    </Section>
  );
}
