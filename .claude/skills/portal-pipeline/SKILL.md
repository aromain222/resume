---
name: portal-pipeline
description: Work on the transfer-portal data pipeline in portal/ — a standalone Playwright + Supabase scraper/enricher, separate from the portfolio site. Use when touching anything under portal/.
---

# Transfer portal pipeline (`portal/`)

A self-contained sub-project (`transfer-portal-pipeline`) that scrapes college-football transfer-portal entrants, queues them, enriches them, and syncs to a Supabase database. **It is not part of the Next.js site** — it has its own `package.json` and `tsconfig.json`, runs via `tsx`, and nothing in `app/` or `components/` imports it.

## Layout

| Path | Role |
|------|------|
| `checkNewPortalEntrants.ts` | Playwright scrape for new portal entrants → ingestion queue |
| `processIngestionQueue.ts` | drains the ingestion queue |
| `enrichQueuedPlayers.ts` | enriches queued players |
| `syncEnrichedPlayersToDb.ts` | writes enriched players to the DB |
| `db/client.ts` | Supabase client — all DB access goes through here |
| `schema.sql` | source of truth for table shapes |
| `shared/` | `logger.ts`, `normalizer.ts`, `position-config.ts` |
| `types.ts` | shared types for the pipeline stages |

## Running

```bash
cd portal
npm install            # separate node_modules from the site
npm run check-portal
npm run process-queue
npm run enrich
```

Scripts need `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in the environment (consumed in `db/client.ts`). Playwright is a dependency here — if the browser is missing, note that in this remote environment Chromium is pre-installed at `/opt/pw-browsers/chromium` (`PLAYWRIGHT_BROWSERS_PATH` is set); do not run `playwright install`.

## Conventions

- Stage boundaries are the queue tables — don't have one script reach into another stage's responsibility; add a new script per stage if needed.
- Normalization (names, positions, schools) belongs in `shared/normalizer.ts` / `shared/position-config.ts`, not inline in scrape code.
- Schema changes: update `schema.sql` and `types.ts` together.
- There are no tests; verify by running the affected stage against the queue and checking logger output and the resulting rows.
