import { site } from "../data/content";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 py-8">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-6 text-xs text-zinc-600">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p className="font-mono">Built with React + Vite + Tailwind</p>
      </div>
    </footer>
  );
}
