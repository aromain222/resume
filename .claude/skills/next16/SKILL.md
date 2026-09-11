---
name: next16
description: Consult the bundled Next.js 16 docs before writing or reviewing any framework-touching code (routing, data fetching, metadata, config, server/client components). This repo runs Next 16.2.4 + React 19 + Tailwind 4, all newer than typical training data.
---

# Writing code against Next.js 16 in this repo

Your training data likely predates Next 16. **Do not write framework code from memory** — verify against the docs shipped inside the installed package.

## Procedure

1. Ensure deps are installed: `npm install` (fresh clones have no `node_modules`).
2. List the bundled docs and open the guide matching your task:

   ```bash
   ls node_modules/next/dist/docs/
   ```

   Read the relevant file(s) with the Read tool before writing code. Heed deprecation notices — an API that worked in Next 14/15 may be removed or renamed.
3. If a doc contradicts what you remember, the doc wins.

## Repo-specific stack notes

- **React 19** — new APIs (`use`, ref-as-prop, form actions) are available; legacy patterns like `forwardRef` may be unnecessary.
- **Tailwind CSS 4** — CSS-first configuration in `app/globals.css` (`@theme`, `@import "tailwindcss"`). There is **no** `tailwind.config.js` and none should be added; the PostCSS plugin is `@tailwindcss/postcss` (see `postcss.config.mjs`).
- **ESLint 9 flat config** — rules live in `eslint.config.mjs`, not `.eslintrc`.
- All landing-page sections are client components under `components/` using `framer-motion`; shared motion variants live in `lib/animations.ts` — reuse them rather than inlining new variants.

## Verify

`npm run build` is the gate — Next 16 surfaces most misuse (invalid segment config, server/client boundary violations, removed APIs) at build time. Then spot-check visually with `npm run dev`.
