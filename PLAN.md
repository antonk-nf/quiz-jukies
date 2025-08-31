# Quiz FE Project Plan

This plan outlines a mobile‑first, browser‑based quiz game similar to Kahoot, focused on UI-only MVP with mocked services and client-side state. Visual styling follows a Netflix‑like dark theme under the playful brand name "Streamberry" (placeholder logo). We optimize for quick iteration and future plug‑in of a simple realtime backend (e.g., Supabase/Ably/Pusher) without rewrites.

Modes supported:
- Mode A — Hosted Multiplayer: admin hosts a live quiz; players join via PIN; synchronized flow; leaderboard at end.
- Mode B — Solo Client‑Only: static site loads a predefined quiz JSON, shows a start screen, runs a single‑player flow, and stores results in localStorage, with a per‑question correctness summary on the results page.
## 1) Scope & Assumptions
- Auth: OAuth-style sign-in (mocked) + user-chosen nickname per account.
- Roles: Single host/admin per quiz; many players.
- Join: 6‑digit numeric PIN shared by host.
- Questions: Single choice (1 correct of 4). Images optional later.
- Timing: Configurable per-question timer (default 60s). Auto-lock on timeout.
- Scoring: 1 point per question; optional time bonus (config, off by default in MVP).
- Leaderboard: Shown at end (default), with a future flag to show after each question.
- Correctness Reveal: Do not show per‑question correctness in MVP; make it configurable later.
- Start: Host manual start by default. Auto-start only if host sets a value for N (OFF by default).
- Data: Quiz content stored as JSON on client. No real backend.
- Realtime (MVP): Simulated locally via `BroadcastChannel`/`localStorage` events to support multi‑tab testing on the same machine. Cross‑device requires future backend.
- Devices: Mobile-first UI; desktop usable but not optimized beyond basics.
- Non-goals: Anti-cheat, telemetry, i18n, PWA (not in MVP).

## 2) Tech Stack
- Build: Vite + React + TypeScript
- Styling: Tailwind CSS (dark theme, Netflix‑like styling), CSS variables for theme tokens
- State: Zustand (lightweight store), React Query optional later if needed
- Routing: React Router
- Validation: Zod (schemas for quiz JSON and config)
- Icons: Lucide (free) or Heroicons
- Utilities: dayjs (timing), nanoid (IDs), mitt or custom event bus for local sim
- Testing (lightweight): Vitest + React Testing Library (smoke tests only)

## 3) Data Models (TypeScript)
```ts
// Auth / profile
export type AuthProvider = 'google' | 'apple' | 'github' | 'mock';
export interface UserProfile {
  uid: string;           // stable across sessions (mocked)
  provider: AuthProvider; // mocked provider id
  email?: string;        // optional in mock
  nickname: string;      // chosen by user
  createdAt: number;     // epoch ms
}

// Quiz content (client JSON)
export interface QuizOption {
  id: string;            // e.g., 'A','B','C','D' or nanoid
  text: string;
}
export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[]; // length 4 in MVP
  correctOptionId: string; // exactly one
  imageUrl?: string;     // optional future
  timeLimitSec?: number; // override per question; default from config
}
export interface Quiz {
  id: string;
  title: string;
  description?: string;
  questions: QuizQuestion[];
}

// Session / gameplay
export interface TimeBonusConfig {
  enabled: boolean;           // MVP: false by default
  maxBonus: number;           // e.g., up to +100
  model: 'linear' | 'exponential';
}
export interface SessionConfig {
  defaultTimeLimitSec: number; // default 60
  pointsPerQuestion: number;   // default 1
  timeBonus?: TimeBonusConfig; // optional
  showLeaderboardAfterEachQuestion: boolean; // default false (end only)
  autoStartMinPlayers?: number; // optional; OFF by default (unset). Example: 4
  revealCorrectnessPerQuestion?: boolean; // default false (MVP keeps false)
  pinLength: number;           // default 6
}
export type SessionPhase = 'idle' | 'lobby' | 'question' | 'between' | 'ended';
export interface Player {
  id: string;        // generated per session; map to profile
  profileUid?: string; // link to UserProfile.uid (if signed in)
  nickname: string;
  joinedAt: number;
  connected: boolean; // for simulation
  score: number;      // cumulative
  answers: Record<string, PlayerAnswer>; // questionId -> answer
}
export interface PlayerAnswer {
  optionId: string;
  answeredAt: number;  // epoch ms
  timeTakenMs: number; // for bonus calc
  correct: boolean;
  pointsAwarded: number; // base + bonus
}
export interface GameSession {
  id: string;           // internal id
  pin: string;          // 6-digit code for join
  hostUid: string;      // host profile uid
  quizId: string;
  config: SessionConfig;
  phase: SessionPhase;
  currentQuestionIndex: number; // -1 in lobby
  players: Record<string, Player>; // id -> player
  createdAt: number;
  startedAt?: number;
  endedAt?: number;
}
export interface LeaderboardEntry {
  playerId: string;
  nickname: string;
  score: number;
}
```

## 4) Routing
- `/` Landing: sign-in (mock OAuth), choose nickname.
- `/host` Host Dashboard: create/select quiz JSON; configure session; create session.
- `/host/:sessionId/lobby` Lobby: show PIN, player list, controls (start, kick, lock, toggle auto-start).
- `/host/:sessionId/play` Presenter: drive questions, timer, next/skip, end quiz.
- `/host/:sessionId/results` Leaderboard + summary.
- `/join` Join Flow: enter PIN; if found, continue to `/play/:sessionId`.
- `/play/:sessionId` Player View: waiting room → answer screens.
- `/play/:sessionId/done` Player end state: personal result + link to leaderboard.
- `/solo` Solo Start: loads quiz JSON, shows title and Start (no auth).
- `/solo/play` Solo Play: single‑player question flow.
- `/solo/results` Solo Results: total score + per‑question correctness summary.
 

Note: In MVP, sessions exist only in the host tab; other tabs read via simulated realtime.

## 5) State & Services
- Stores (Zustand):
  - `authStore`: profile, signInMock(provider), signOut, nickname update.
  - `quizStore`: list of quizzes (from bundled JSON), CRUD for a lightweight editor.
  - `sessionStore` (host): createSession, start, nextQuestion, end, kick, toggle lock, auto-start check, scoring.
  - `playerStore` (client): joinByPin, submitAnswer, listen to session updates.
- Persistence: `localStorage` keys
  - `quiz.profile`, `quiz.sessions`, `quiz.catalog`
- Simulated realtime:
  - `BroadcastChannel('quiz:<sessionId>')` for cross-tab events
  - Fallback to `storage` event if BC unsupported
  - Event types: `session:update`, `player:join`, `player:leave`, `player:answer`, `host:control`

## 6) UX Flows
- Sign-In (mock):
  - Tap provider → create mock `uid` and token → choose nickname → persist.
- Host Create Session:
  - Pick quiz (from demo JSON) → adjust settings (timer, auto-start N, leaderboard reveal) → create → see PIN in lobby.
- Lobby:
  - Shows joining players, their nicknames; host controls start/end; optional auto-start when N joined.
  - Shows joining players, their nicknames; host controls start/end; optional auto-start when N joined (OFF by default until host sets N).
- Host Play:
  - For each question: show on presenter; start timer; answers locked at zero; host can skip/next/pause; after timer, transition to between-state (optionally reveal correctness later phase).
- Player Join/Play:
  - Enter PIN, set nickname (prefilled from profile) → wait in lobby → on question, pick one option; selection locked after timeout; confirm state visible.
- End & Leaderboard:
  - Host can end anytime; all clients move to results screen; show ordered leaderboard with scores; each user also sees personal result summary.

- Solo Mode (client‑only):
  - Start: on `/solo`, display quiz title, number of questions, and a Start button (no auth, no PIN).
  - Play: single player answers each question; allow a single answer; optional timer may be added later.
  - Results: show total score and a detailed per‑question summary with correct/incorrect indication and the correct option highlighted.
## 7) Timing & Scoring
- Base: +1 point if correct; 0 otherwise.
- Bonus (config, initially disabled):
  - Linear: `bonus = maxBonus * (remainingTime / timeLimit)`
  - Exponential: `bonus = round(maxBonus * (remainingTime / timeLimit) ^ k)` with k>1
- Locking:
  - Answer cannot be changed after submit or when timer hits 0.
- Edge cases: late join during question → allowed to answer within remaining time; leaving sets `connected=false`.

## 8) Components (selected)
- Shell/Layout: `AppShell`, `TopBar`, `BottomBar`, `PageContainer`
- Auth: `AuthButtonMock`, `NicknameForm`
- Host: `HostDashboard`, `SessionConfigForm`, `Lobby`, `Presenter`, `HostControls`, `PlayerList`
- Player: `JoinForm`, `WaitingRoom`, `AnswerCard`, `TimerRing`, `AnswerLockedCard`
- Shared: `QuizCard`, `PinDisplay`, `Countdown`, `Leaderboard`, `Badge`, `Modal`, `Toast`

## 9) Theming & Styles (Streamberry / Netflix‑like)
- Dark theme base (`#141414`), surface (`#181818`), primary (`#E50914`), accent (`#B81D24`), text (`#FFFFFF`, `#B3B3B3`).
- Typography: SF Pro / Inter; bold headings, high contrast; large tap targets.
- Motion: subtle hover/press; snappy transitions (<150ms) for mobile responsiveness.
- Layout: single column; sticky bottom bar for primary actions on mobile.
- Branding: Use the name "Streamberry" and a placeholder logo asset (to be added later). No use of Netflix trademarks.
- Answer Tiles: default to neutral Streamberry styling (dark cards) with high‑contrast selection/locked states. Kahoot‑style colored tiles can be a future theme toggle.
- Timer: circular countdown ring transitions green → amber → red.

## 10) Quiz JSON Schema (example)
```json
{
  "$schema": "https://example.com/quiz.schema.json",
  "id": "general-knowledge-1",
  "title": "General Knowledge",
  "questions": [
    {
      "id": "q1",
      "text": "What is the capital of France?",
      "options": [
        { "id": "A", "text": "Paris" },
        { "id": "B", "text": "Lyon" },
        { "id": "C", "text": "Marseille" },
        { "id": "D", "text": "Nice" }
      ],
      "correctOptionId": "A",
      "timeLimitSec": 60
    }
  ]
}
```

## 11) UI User Stories (Kahoot‑style wording)
- As a host, I sign in (mock OAuth) and set my nickname so players recognize me.
- As a host, I choose a quiz from a list, tweak settings (timer, points, leaderboard timing, optional auto‑start N OFF by default), and create a session.
- As a host, I see a big 6‑digit PIN and a live list of joining players in the lobby, and I decide when to start.
- As a player, I join by entering the PIN and my nickname, then I wait in the lobby until the host starts.
- As a player, I see one question at a time with four options and a visible countdown; I pick one answer before time runs out.
- As a host, I control pacing (next/skip/end) and move everyone through questions.
- As a player and as a host, at the end I see a leaderboard with ranks and scores; I also see my personal summary.
- As a host (future), I can choose to reveal correctness after each question and/or show the leaderboard after each question.

## 11) Mock Services (UI-only)
- `AuthServiceMock`: simulates OAuth; returns `uid` + provider; persists profile.
- `SessionServiceLocal`: holds authoritative session state in host tab; publishes updates via BroadcastChannel.
- `PlayerClient`: listens to updates; sends join/answer events.
- `StorageService`: wraps `localStorage` with namespaced keys and JSON parse/stringify with Zod validation.

## 12) Agent Execution Plan (step‑by‑step)
The following steps are ordered and scoped for a coding agent to execute incrementally. Each step has concrete outputs and checkpoints.

1. Scaffold project
   - Create Vite React TS app, add Tailwind, React Router, Zustand, Zod, dayjs, nanoid, Lucide.
   - Output: running dev server; base files committed; Tailwind configured with custom theme tokens.
   - Checkpoint: landing route renders with Streamberry dark theme.

2. Add design tokens and brand shell
   - Define Tailwind config with Streamberry colors; add base CSS (fonts: Inter/system), spacing, radius.
   - Create `AppShell`, `TopBar` (logo placeholder), `PageContainer`, `BottomBar`.
   - Output: reusable layout components; example page using shell.

3. Routing skeleton
   - Add routes: `/`, `/host`, `/host/:sessionId/lobby`, `/host/:sessionId/play`, `/host/:sessionId/results`, `/join`, `/play/:sessionId`, `/play/:sessionId/done`.
   - Output: placeholder pages with headings and basic navigation.

4. Mock auth + profile store
   - Implement `authStore` (Zustand) and `AuthServiceMock` with localStorage persistence.
   - Build `AuthButtonMock` (Google, GitHub, Apple visuals) and `NicknameForm`.
   - Output: sign‑in/out works; nickname persists; profile visible in top bar.

5. Quiz catalog and schema
   - Add Zod schemas for `Quiz` and seed a demo JSON file.
   - Implement `quizStore` to load bundled quizzes and basic CRUD stubs.
   - Build `HostDashboard` with quiz cards and a `SessionConfigForm` (timer default 60s, points=1, leaderboard-at-end, autoStart OFF unless set, revealCorrectnessPerQuestion OFF).
   - Output: host can pick quiz and prepare session config.

6. Local session service and lobby
   - Implement `SessionServiceLocal` (host authority) and `playerStore` (client view) with BroadcastChannel/storage events.
   - Implement `sessionStore` actions: createSession (generate 6‑digit PIN), start, end, nextQuestion, kick.
   - Build `Lobby` with `PinDisplay`, `PlayerList`, and host controls (start, end, optional auto‑start N OFF by default).
   - Output: second tab can join and appear in lobby list.

7. Player join flow
   - Build `/join` page (`JoinForm`) to enter PIN and nickname; navigate to `/play/:sessionId`.
   - Implement `playerStore.joinByPin(pin)` and presence updates.
   - Output: multi‑tab join works; host sees player appear.

8. Presenter and player question UIs
   - Build `Presenter` view: question text, timer ring, 2x2 neutral answer tiles; host controls sticky bottom bar (next/skip/end).
   - Build `Player` view: waiting room → answer grid; selection locks on submit/timeout; show “Answer locked” state.
   - Output: answers flow end‑to‑end with timer and lock.

9. Scoring and progression
   - Implement base scoring (+1 if correct) and optional time bonus (config object exists but disabled by default).
   - Advance through questions; transition to `between` and then next `question`; end when last question completes.
   - Output: per‑player scores accumulate; session reaches `ended`.

10. Results and leaderboard
   - Build `Leaderboard` component; show ranks, nicknames, scores, tie handling.
   - Player done screen shows personal summary and link back to leaderboard.
   - Output: all clients show final results when host ends or questions complete.

11. Polish and UX refinements
   - Add toasts, empty/edge states, basic error boundaries, subtle animations.
   - Optimize mobile layouts (safe areas, sticky actions, tap sizes).
   - Output: stable, demo‑ready MVP.

12. Solo Mode (client‑only)
   - Add routes `/solo`, `/solo/play`, `/solo/results`.
   - Load `public/quiz.json`; fallback to embedded sample.
   - Implement single‑player flow with localStorage persistence; show per‑question summary on results.
   - Output: static deployable solo quiz flow (e.g., GitHub Pages).
## 13) Acceptance Criteria (MVP)
- User can sign in (mock), set nickname; state persists across reloads.
- Host can create a session from a demo quiz, see 6‑digit PIN and lobby.
- Another tab can join with PIN and nickname; appears in host lobby.
- Host can start quiz; players receive questions; can submit one answer per question.
- Timer enforces lock; scoring awards +1 for correct answers.
- Host can advance through all questions and end the quiz.
- All clients show final leaderboard; personal results visible to each player.
- Per‑question correctness is not revealed in MVP; only final leaderboard is shown (future toggle).
- Solo Mode: User can open `/solo`, start a predefined quiz from JSON, answer questions, and see a results page with total score and per‑question correctness summary. Progress/resume stored locally.

## 14) Risks & Limitations
- No real backend: multi‑device play not supported; only multi‑tab simulation.
- Timer accuracy: subject to browser throttling on background tabs; acceptable for MVP.
- Data persistence: local to browser; clearing storage resets data.

## 15) Future Backend Integration (outline)
- Replace `SessionServiceLocal` with `SessionServiceRemote` using:
  - Supabase (Auth + Realtime via Postgres changes) or
  - Ably/Pusher channels for events, Firestore for storage.
- Map session state to a `sessions` document and per‑session `events` channel.
- Auth: real OAuth for host; players anonymous with nickname.

## 16) Implementation Notes
- Prefer pure functions for scoring and timer math (unit test friendly).
- Keep `GameSession` the single source of truth for scoring and progression.
- Derive leaderboard from `GameSession.players` at render time.
- Guard rails: disable actions when phase doesn’t allow them.

## 17) Open Questions
- Default `autoStartMinPlayers`: Resolved — OFF by default (unset). Host may set a number per session.
- PIN collision handling (local only): regenerate until unique among in‑memory sessions.
- Do we want per‑question review (correct answer reveal) in MVP? (Planned later)
- Brand assets: provide a Streamberry placeholder logo and app icon later; continue generic Netflix‑like styling until assets exist.

---
If this plan looks good, next step is to scaffold the project (Milestone 1) and lay down types, theme tokens, and the basic routes/shell.
