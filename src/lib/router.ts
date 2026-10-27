import { useEffect, useState } from "react";

/**
 * Minimal hash routing. Two shapes only:
 *   #/reports/<slug>  -> a report page
 *   anything else     -> the portfolio, optionally scrolled to a section anchor
 *
 * Hash-based so the site stays a static single-page deploy with no
 * server rewrite rules, while each report still gets a shareable URL.
 */
export type Route =
  | { view: "report"; slug: string }
  | { view: "home"; anchor: string | null };

export function parseRoute(hash: string): Route {
  const clean = hash.replace(/^#/, "");
  const match = clean.match(/^\/reports\/([\w-]+)$/);
  if (match) return { view: "report", slug: match[1] };
  return { view: "home", anchor: clean && !clean.startsWith("/") ? clean : null };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.hash));

  useEffect(() => {
    const onChange = () => setRoute(parseRoute(window.location.hash));
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  useEffect(() => {
    if (route.view === "report") {
      window.scrollTo(0, 0);
      return;
    }
    // Returning from a report page: the target section did not exist in the
    // DOM when the hash changed, so the browser's native jump was a no-op.
    if (route.anchor) {
      document.getElementById(route.anchor)?.scrollIntoView();
    }
  }, [route]);

  return route;
}

export const reportHref = (slug: string) => `#/reports/${slug}`;
