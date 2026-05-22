# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server with HMR
- `npm run build` — production build into `dist/`
- `npm run preview` — serve the built `dist/` locally

There is no test runner and no lint script configured. Don't suggest `npm test` or `npm run lint`.

## Architecture

Single-page React 18 + Vite 5 sales dashboard. All data is synthesized client-side — there is no backend, no fetching, and no persistence.

**Entry chain**: `index.html` → `src/main.jsx` → `src/App.jsx`.

**State and data flow** — `src/App.jsx` is the only stateful component. It owns the `timeRange` selection, memoizes `generateDummyData(timeRange)`, and fans the resulting object out as props to presentational children (`KpiCard`, `SalesTrendChart`, `CategoryChart`, `TopProductsTable`, `RecentActivity`). There is no context, store, or props drilling beyond one level.

**Single source of truth for data**: `src/utils/generateData.js`. A `multiplier` derived from `timeRange` (`'Last 7 Days'`, `'Last 30 Days'`, `'Last 90 Days'`, `'Year to Date'`) scales every KPI, top-products row, and category bucket. Changing the shape of its return value cascades through `App.jsx` and every component — update the destructuring in `App.jsx` accordingly.

**Chart.js registration is centralized in `src/App.jsx`** — `CategoryScale`, `LinearScale`, `PointElement`, `LineElement`, `ArcElement`, `Title`, `Tooltip`, `Legend`, `Filler` are registered once at module load. Adding a new chart type (e.g. Bar) requires registering its elements there, not in the chart component.

## Gotchas

- **Legacy root files**: `script.js` and `style.css` at the repo root are the pre-React vanilla implementation. `index.html` no longer references them; only `/src/main.jsx` is loaded. Editing these has no effect on the running app — the active stylesheet is `src/index.css`.
- `dist/` is a Vite build artifact. Don't edit it by hand.

## Custom agents

`.claude/agents/` defines two project-specific subagents invokable via the Agent tool: `code-quality-reviewer` and `code-reviewer`.
