# Josh Silverman — Portfolio

Personal portfolio site for sports analytics work. Single-page, fully static —
React + Vite + TypeScript + Tailwind CSS v4. No backend, no CMS.

## Run locally

```bash
npm install
npm run dev       # http://localhost:5173
```

Other scripts:

```bash
npm run build     # type-check + production build → dist/
npm run preview   # serve the production build locally
```

## Edit content

**All site content lives in one file: [`src/data/content.ts`](src/data/content.ts).**
Bio, tagline, social links, resume entries, skills, and projects are plain
typed objects — edit them there and the site updates. You should never need
to touch component code to change content.

Common edits:

- **Add a project** — append an object to the `projects` array (title,
  description, tags, `github`/`demo` URLs). Leave a URL as `""` to hide
  that link. The grid layout handles any number of projects.
- **Add a job** — append to the `experience` array.
- **Resume file** — replace `public/Josh-Silverman-Resume.pdf` with the new
  version (same filename), or update `site.resumeFile` in
  `src/data/content.ts` if the name changes.
- **Change the accent color** — edit the two `--color-accent*` values at the
  top of [`src/index.css`](src/index.css).

Live site: https://josh-silverman-portfolio.vercel.app
Pinpoint Analytics live demo: https://pinpoint-golf-gray.vercel.app

## Deploy to Vercel

1. Push this repo to GitHub.
2. In [Vercel](https://vercel.com/new), import the repo.
3. Vercel auto-detects Vite — accept the defaults (build command
   `npm run build`, output directory `dist`) and deploy.

Every push to `main` redeploys automatically. No environment variables or
extra config needed.

Vercel Analytics is already wired in (`<Analytics />` in `App.tsx`) — enable
it in the Vercel dashboard under the project's **Analytics** tab to see
visitor data.

## Structure

```
src/
├── data/content.ts    # ← all editable content
├── components/        # one component per section
│   ├── Nav.tsx        # sticky header + mobile menu
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Resume.tsx     # experience timeline, education, skills, PDF button
│   ├── Projects.tsx   # project card grid
│   ├── Contact.tsx
│   ├── Footer.tsx
│   ├── Section.tsx    # shared section wrapper
│   └── icons.tsx      # inline SVG icons
├── App.tsx            # page shell
├── main.tsx           # entry point
└── index.css          # Tailwind + accent color theme
```
