import { Analytics } from "@vercel/analytics/react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Resume from "./components/Resume";
import PredictionModel from "./components/PredictionModel";
import Research from "./components/Research";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ReportPage from "./components/ReportPage";
import { useRoute } from "./lib/router";
import { getReport } from "./data/reports";

export default function App() {
  const route = useRoute();
  const report = route.view === "report" ? getReport(route.slug) : undefined;

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-400 antialiased selection:bg-accent/20 selection:text-accent-bright">
      <Nav />
      {report ? (
        <main>
          <ReportPage report={report} />
        </main>
      ) : (
        <main>
          <Hero />
          <About />
          <Resume />
          <PredictionModel />
          <Research />
          <Contact />
        </main>
      )}
      <Footer />
      <Analytics />
    </div>
  );
}
