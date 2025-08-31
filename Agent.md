# Streamberry Quiz — Agent Guide

This document summarizes the project, current code, design system, and the next steps so future agents (or future you) can pick up quickly.

## Summary
- Goal: Mobile-first quiz game (Kahoot-like) with Netflix-style dark UI, called "Streamberry".
- MVP: UI-only, quizzes as local JSON, mock auth, simulated realtime later. No backend for now.
- Roles: Single host/admin; players join via 6-digit PIN.
- Gameplay: Single-choice questions (1 of 4), per-question timer (60s default), end-only leaderboard (configurable in future).

## Stack
- Build: Vite + React + TypeScript
- Styling: Tailwind CSS, custom tokens (Streamberry palette), small utility classes in `src/styles/index.css`
- Routing: React Router v6
- Icons: Inline SVGs (swap to Lucide later if desired)
- State: Not introduced yet (Zustand planned in later phases)

## Repo Layout
- `index.html` — Vite entry
- `src/main.tsx` — router and app bootstrap
- `src/styles/index.css` — Tailwind directives + custom utilities (buttons, cards, headings)
- `src/shell/AppShell.tsx` — global layout, top bar + page container
- `src/ui/*` — reusable UI components (atoms/molecules)
- `src/pages/*` — route components (Landing, Host dashboard, Playbook, Lobby)
- `src/types/models.ts` — shared TypeScript types for quiz/session config
- `PLAN.md` — high-level plan and execution steps
- `Components.md` — component playbook/inventory
- `Step.md` — running log of what’s implemented and how to verify

## Reference Docs
- PLAN.md — detailed architecture, data models, routes, and execution plan.
- Components.md — complete component inventory with props and build order.
- Step.md — incremental change log with verification steps and affected files.

## Implemented (Phases 1–3)
- Phase 1: App scaffold; Theme tokens; AppShell; TopBar; Button; TextField; Logo; Playbook page for manual verification.
- Phase 1 styling: Distinct button variants, improved focus states, cinematic section headers, card gradients/lift, IconButton + basic icon set.
- Phase 2: QuizCard, SessionConfigForm, HostDashboardPage (`/host`).
- Phase 3: Lobby components (PinDisplay, PlayerList, HostControls, BottomBar) and `HostLobbyPage` (`/host/:sessionId/lobby`).

## How to Run
- Install: `npm install`
- Dev server / playbook: `npm run playbook` (or `npm run dev`)
- Open:
  - Playbook: `http://localhost:5173/playbook`
  - Landing: `http://localhost:5173/`
  - Host Dashboard: `http://localhost:5173/host`
  - Host Lobby (demo): `http://localhost:5173/host/demo-session/lobby?pin=123456`

## Deploying Solo as Static Site (GitHub Pages)
- Router base: app uses `import.meta.env.BASE_URL` as the basename; Vite `base` is taken from `VITE_BASE`.
- Workflow: `.github/workflows/pages.yml` builds with `VITE_BASE=/<repo>/`, generates a `404.html` for SPA fallback, and deploys to Pages.
- Steps:
  1) Push to `main`/`master` — workflow builds and deploys automatically.
  2) Enable Pages → Source: GitHub Actions in repo settings (if not already).
  3) Access Solo: `https://<user>.github.io/<repo>/solo` (JSON loaded from `<base>/quiz.json`).

## Optional: Encrypted Solo Quiz
- Use `npm run encrypt:quiz` with a strong password. This reads `public/quiz.json` and writes `public/quiz.enc` (AES-256-GCM, PBKDF2-SHA256 with 250k iterations). Keep the password out of the repo.
- At runtime, Solo detects `quiz.enc` and prompts for the password to decrypt client-side via Web Crypto. If `quiz.enc` is absent, it falls back to `quiz.json`.
- For better secrecy, do not deploy `public/quiz.json` alongside `public/quiz.enc`.
- Security note: client-side decryption prevents casual inspection but cannot protect against determined reverse engineering.


## Design System
- Colors (Streamberry / Netflix-like):
  - Background `#141414`, Surface `#181818`, Primary `#E50914`, Accent `#B81D24`, Text `#FFFFFF`, Muted `#B3B3B3`.
  - Defined in `tailwind.config.js` under `theme.extend.colors.sb`.
- Typography: Inter/system stack, bold headings, high contrast.
- Motion: 150ms transitions; hover lift on interactive cards.
- Components styling:
  - Buttons: `btn-primary` (solid gradient red), `btn-secondary` (elevated surface), `btn-ghost` (minimal), `btn-danger` (red outline).
  - Cards: `.card` (surface) and `.card-interactive` (gradient + lift).
  - Section heading: `.section-heading` with Streamberry underline.
  - Inputs: `.textfield` with improved focus ring; number/text fields as atoms.

## Current Routes
- `/` Landing (mock auth UI placeholder + nickname input field only)
- `/playbook` Component gallery for manual verification
- `/host` Host dashboard (pick a quiz, configure session)
- `/host/:sessionId/lobby` Host lobby (PIN display, players list, sticky controls)
- `/solo` Solo start (loads quiz.json)
- `/solo/play` Solo question flow
- `/solo/results` Solo results with per‑question summary

## UX/Feature Notes
- Auto-start is OFF by default; host can set an N value to enable.
- No per-question correctness reveal in MVP; planned as a config later.
- Quizzes are local JSON; two sample quizzes are inline in the dashboard page for now.

## Next Steps (Phases)
1. Phase 4 — Join Flow
   - Components: JoinForm, WaitingRoom.
   - Pages: `/join`, `/play/:sessionId` base (waiting state).
   - Update Playbook with demos.
2. Phase 5 — Gameplay (Presenter/Player)
   - Presenter page: question display, timer ring, sticky controls (next/skip/end).
   - Player page: AnswerGrid, AnswerCard, AnswerLockedCard; selection and lock behavior.
3. Phase 6 — Scoring & Progression
   - Base scoring (+1 correct), optional time bonus scaffold (disabled default).
   - Session progression: between-state → next question → end.
4. Phase 7 — Results
   - Leaderboard component and pages: host results, player done page.
5. Phase 8 — Polish
   - Toasts, empty/error states, responsive tweaks, touch ergonomics.

## Future Architecture (after MVP)
- State management: Introduce Zustand stores (`authStore`, `quizStore`, `sessionStore`, `playerStore`).
- Simulated realtime: `BroadcastChannel`/`storage` events for multi-tab.
- Backend ready: Swap a `SessionServiceLocal` with a remote service (Supabase/Ably/Pusher or Firestore).
- Auth: Real OAuth for host; players anonymous with nickname.

## Conventions
- Keep components presentational; logic goes into stores/services in later phases.
- Strong typing via `src/types/models.ts`.
- Prefer small, focused components; update `Components.md` as inventory evolves.
- Maintain `Step.md` after each phase for reproducibility.

## Quick Checklist for Picking Up Work
- Run the dev server and verify `/playbook`, `/host`, and the lobby route.
- Skim `Step.md` for current status and verification steps.
- Implement next phase from the “Next Steps” list above.
- Add demos to `/playbook` for new components.
- Update `Step.md` upon completion.

If anything in the plan should change (e.g., defaults, fields in SessionConfig), update `PLAN.md` and `Components.md` first, then proceed with implementation.
