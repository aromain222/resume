<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

This repo pins **Next.js 16.2.4, React 19, Tailwind CSS 4** — all newer than most training data. The `next16` skill in `.claude/skills/` describes how to consult the bundled docs before writing framework-touching code. Fresh clones have no `node_modules`; run `npm install` first (the docs above live inside it).

## What this repo is

A personal portfolio/resume site (deployed on Vercel) plus an unrelated background data pipeline:

- `app/` — App Router pages. `app/page.tsx` composes the landing page from `components/`; `app/resume/` is a printable resume page (`PrintButton.tsx`).
- `components/` — one file per landing-page section (Hero, About, WhatImBuilding, …) plus interaction toys (CustomCursor, Magnetic, ClickBurst, FootballAnimation). Heavy use of `framer-motion`; shared animation variants in `lib/animations.ts`.
- `portal/` — **a separate sub-project** (`transfer-portal-pipeline`): a college-football transfer-portal scraper/enricher with its own `package.json`, `tsconfig.json`, and Supabase-backed DB (`portal/schema.sql`). It is not imported by the site. See the `portal-pipeline` skill before touching it.

## Commands

```bash
npm install
npm run dev      # dev server on :3000
npm run build    # production build — run before committing framework/type changes
npm run lint     # eslint (flat config, eslint.config.mjs)
```

There is no test suite; `npm run build` + eyeballing `npm run dev` is the verification bar. Tailwind 4 is configured via `@tailwindcss/postcss` in `postcss.config.mjs` and CSS-first config in `app/globals.css` — there is no `tailwind.config.js`, and that's intentional.

## Portal pipeline commands (run inside `portal/`)

```bash
cd portal && npm install
npm run check-portal   # scrape for new portal entrants (Playwright)
npm run process-queue  # process ingestion queue
npm run enrich         # enrich queued players
```

Requires Supabase credentials in env; scripts talk to the DB in `portal/db/client.ts`.
