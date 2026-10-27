import { useSyncExternalStore } from "react";
import { snapshot } from "../data/nfl";
import type { NflData } from "../data/nfl/types";
import { generatedKey, normalizeNfl } from "./nfl-parse";

/**
 * NFL model data for every component on the page.
 *
 * Renders the build-time snapshot immediately, then asks /api/nfl once for
 * the CDN-cached latest. The newer copy wins; any failure (including plain
 * `vite dev`, where /api does not exist) keeps the snapshot.
 */
let current: NflData = snapshot;
const listeners = new Set<() => void>();
let requested = false;

function refresh() {
  if (requested) return;
  requested = true;
  fetch("/api/nfl")
    .then((res) => {
      const type = res.headers.get("content-type") ?? "";
      if (!res.ok || !type.includes("json")) throw new Error(`api/nfl ${res.status}`);
      return res.json();
    })
    .then((raw) => {
      const next = normalizeNfl(raw);
      if (generatedKey(next.meta.generated) > generatedKey(current.meta.generated)) {
        current = next;
        listeners.forEach((notify) => notify());
      }
    })
    .catch(() => {
      /* keep the snapshot */
    });
}

function subscribe(notify: () => void) {
  listeners.add(notify);
  refresh();
  return () => {
    listeners.delete(notify);
  };
}

export function useNflData(): NflData {
  return useSyncExternalStore(subscribe, () => current);
}
