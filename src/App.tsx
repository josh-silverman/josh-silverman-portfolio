import { Analytics } from "@vercel/analytics/react";
import Masthead from "./components/Masthead";
import SectionRail from "./components/SectionRail";
import Work from "./components/work/Work";
import Background from "./components/Background";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ReportPage from "./components/ReportPage";
import { useRoute } from "./lib/router";
import { getReport } from "./data/reports";

export default function App() {
  const route = useRoute();
  const report = route.view === "report" ? getReport(route.slug) : undefined;

  return (
    <div className="min-h-screen bg-paper text-ink">
      <a
        href="#main"
        className="kicker sr-only bg-ink px-3 py-2 text-paper focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50"
      >
        Skip to content
      </a>
      {!report && <Masthead />}
      <SectionRail view={report ? `report:${report.slug}` : "home"} />
      <main id="main">
        {report ? (
          <ReportPage report={report} />
        ) : (
          <>
            <Work />
            <Background />
            <Contact />
          </>
        )}
      </main>
      <Footer />
      <Analytics />
    </div>
  );
}
