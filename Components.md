# Components Playbook

Curated inventory of pages and UI components for the Streamberry quiz MVP. Each item lists purpose, key props, states, and status so we can implement and verify one by one.

Status legend: planned | in-progress | done

## 0) Conventions
- Props use TypeScript types; optional props marked with `?`.
- Visuals follow Streamberry dark theme (Netflix-like) with strong contrast and mobile-first layout.
- Keep components presentational where possible; stateful logic lives in stores/services.

---

## A) Pages (Routes)

1. LandingPage (`/`)
   - Purpose: Sign-in (mock OAuth) and nickname setup.
   - Uses: `AppShell`, `TopBar`, `AuthButtonMock`, `NicknameForm`, `Button`.
   - Status: planned

2. HostDashboardPage (`/host`)
   - Purpose: Choose quiz and configure session.
   - Uses: `QuizCard`, `SessionConfigForm`, `Button`.
   - Status: planned

3. HostLobbyPage (`/host/:sessionId/lobby`)
   - Purpose: Show PIN, player list, and start controls.
   - Uses: `PinDisplay`, `PlayerList`, `HostControls`, `BottomBar`.
   - Status: planned

4. HostPlayPage (`/host/:sessionId/play`)
   - Purpose: Present questions and control pacing.
   - Uses: `Presenter`, `HostControls`.
   - Status: planned

5. HostResultsPage (`/host/:sessionId/results`)
   - Purpose: Show final leaderboard and summary.
   - Uses: `Leaderboard`, `Button`.
   - Status: planned

6. JoinPage (`/join`)
   - Purpose: Enter PIN and nickname to join.
   - Uses: `JoinForm`, `Button`.
   - Status: planned

7. PlayerPlayPage (`/play/:sessionId`)
   - Purpose: Show waiting room and answer UI per question.
   - Uses: `WaitingRoom`, `AnswerGrid`, `AnswerCard`, `TimerRing`, `AnswerLockedCard`.
   - Status: planned

8. PlayerDonePage (`/play/:sessionId/done`)
   - Purpose: Personal results and link to leaderboard.
   - Uses: `LeaderboardSummary`, `Button`.
   - Status: planned

9. SoloStartPage (`/solo`)
   - Purpose: Solo mode start; load quiz JSON; start CTA.
   - Uses: `AppShell`, `Card`, `Button`.
   - Status: done

10. SoloPlayPage (`/solo/play`)
   - Purpose: Solo question flow; one answer per question.
   - Uses: `AnswerGrid`, `AnswerCard`, `Button`.
   - Status: done

11. SoloResultsPage (`/solo/results`)
   - Purpose: Solo results; total score and per‑question correctness summary.
   - Uses: `AnswerCard`, `Button`.
   - Status: done

---

## B) Layout & Branding

1. AppShell
   - Purpose: Global layout wrapper with theme, safe-areas, and container.
   - Props: `{ children: ReactNode }`
   - Status: planned

2. TopBar
   - Purpose: Top navigation with logo, profile quick access.
   - Props: `{ rightSlot?: ReactNode }`
   - Status: planned

3. BottomBar
   - Purpose: Sticky bottom actions on mobile (host controls, primary CTA).
   - Props: `{ children: ReactNode }`
   - Status: planned

4. PageContainer
   - Purpose: Constrain width and provide padding/scroll.
   - Props: `{ children: ReactNode, variant?: 'default' | 'full' }`
   - Status: planned

5. LogoStreamberry
   - Purpose: Placeholder brand logo component (text or SVG stub).
   - Props: `{ size?: number, variant?: 'wordmark' | 'glyph' }`
   - Status: planned

---

## C) Atoms

1. Button
   - Props: `{ variant?: 'primary' | 'secondary' | 'ghost' | 'danger', size?: 'sm'|'md'|'lg', fullWidth?: boolean, disabled?: boolean, onClick?: () => void }`
   - Status: planned

2. IconButton
   - Props: `{ icon: ReactNode, ariaLabel: string, variant?: 'ghost'|'primary'|'danger', onClick?: () => void }`
   - Status: planned

3. TextField
   - Props: `{ label?: string, placeholder?: string, value: string, onChange: (v:string)=>void, error?: string }`
   - Status: planned

4. NumberField
   - Props: `{ label?: string, value?: number, onChange: (v:number|undefined)=>void, min?: number, max?: number, step?: number }`
   - Status: planned

5. Select
   - Props: `{ label?: string, value: string, onChange: (v:string)=>void, options: {value:string,label:string}[] }`
   - Status: planned

6. Toggle
   - Props: `{ label?: string, checked: boolean, onChange: (v:boolean)=>void }`
   - Status: planned

7. Badge
   - Props: `{ children: ReactNode, color?: 'default'|'success'|'warning'|'danger' }`
   - Status: planned

8. Card
   - Props: `{ children: ReactNode, interactive?: boolean }`
   - Status: planned

9. Modal
   - Props: `{ open: boolean, title?: string, onClose: ()=>void, children: ReactNode, footer?: ReactNode }`
   - Status: planned

10. Toast
   - Props: `{ message: string, type?: 'info'|'success'|'warning'|'error', onDismiss?: ()=>void }`
   - Status: planned

---

## D) Auth

1. AuthButtonMock
   - Purpose: Mock OAuth buttons (Google/GitHub/Apple visuals only).
   - Props: `{ provider: 'google'|'github'|'apple', onClick: ()=>void }`
   - Status: planned

2. NicknameForm
   - Purpose: Set/update nickname after sign-in.
   - Props: `{ value: string, onSubmit: (v:string)=>void }`
   - Status: planned

---

## E) Host: Catalog & Config

1. QuizCard
   - Purpose: Display a quiz with title/description and select action.
   - Props: `{ quiz: Quiz, onSelect: (id:string)=>void }`
   - Status: planned

2. SessionConfigForm
   - Purpose: Configure session: default timer, points per question, leaderboard reveal timing, auto-start N (OFF by default), correctness reveal (OFF).
   - Props: `{ config: SessionConfig, onChange: (c:SessionConfig)=>void }`
   - Status: planned

---

## F) Host: Lobby & Presenter

1. PinDisplay
   - Purpose: Prominent 6-digit PIN with copy action.
   - Props: `{ pin: string, onCopy?: ()=>void }`
   - Status: planned

2. PlayerList
   - Purpose: List players in lobby with presence.
   - Props: `{ players: {id:string,nickname:string,connected:boolean}[], onKick?: (id:string)=>void }`
   - Status: planned

3. HostControls
   - Purpose: Start, next, skip, end, and auto-start configuration.
   - Props: `{ phase: SessionPhase, canNext: boolean, onStart: ()=>void, onNext: ()=>void, onSkip: ()=>void, onEnd: ()=>void, autoStartMinPlayers?: number, onAutoStartChange?: (n:number|undefined)=>void }`
   - Status: planned

4. Presenter
   - Purpose: Show current question for host screen: text, timer, options.
   - Props: `{ question: QuizQuestion, timeLeftSec: number, totalTimeSec: number }`
   - Status: planned

---

## G) Player Experience

1. JoinForm
   - Purpose: Enter PIN and nickname to join a session.
   - Props: `{ onSubmit: (pin:string, nickname:string)=>void, loading?: boolean, error?: string }`
   - Status: planned

2. WaitingRoom
   - Purpose: Show lobby wait state until quiz starts.
   - Props: `{ playersCount?: number, pin?: string }`
   - Status: planned

3. AnswerGrid
   - Purpose: 2x2 grid layout for answer options on mobile.
   - Props: `{ children: ReactNode }`
   - Status: planned

4. AnswerCard
   - Purpose: Single answer option card with selection/locked states.
   - Props: `{ option: QuizOption, selected?: boolean, locked?: boolean, onSelect?: (id:string)=>void }`
   - Status: planned

5. AnswerLockedCard
   - Purpose: Feedback after answering or timeout.
   - Props: `{ option?: QuizOption, correct?: boolean }` (MVP: no correctness reveal yet)
   - Status: planned

6. TimerRing
   - Purpose: Circular countdown with color transitions.
   - Props: `{ timeLeftSec: number, totalTimeSec: number, size?: number }`
   - Status: planned

7. AnswerGrid
   - Purpose: 2x2 grid layout for answers.
   - Props: `{ children: ReactNode }`
   - Status: done

8. AnswerCard
   - Purpose: Single answer option with selected/locked and correctness display.
   - Props: `{ option: QuizOption, selected?: boolean, locked?: boolean, correct?: boolean, showCorrectness?: boolean, onSelect?: (id:string)=>void }`
   - Status: done

---

## H) Results & Leaderboard

1. Leaderboard
   - Purpose: Final ranking list for session.
   - Props: `{ entries: LeaderboardEntry[], highlightPlayerId?: string }`
   - Status: planned

2. LeaderboardSummary
   - Purpose: Player personal result summary (score, rank snippet).
   - Props: `{ entry: LeaderboardEntry, totalPlayers: number }`
   - Status: planned

---

## I) Utilities (UI)

1. Countdown
   - Purpose: Textual countdown timer (e.g., mm:ss) for fallback.
   - Props: `{ timeLeftSec: number }`
   - Status: planned

2. EmptyState
   - Purpose: Friendly empty state with icon and message.
   - Props: `{ title: string, description?: string, action?: ReactNode }`
   - Status: planned

3. ErrorState
   - Purpose: Error fallback with retry.
   - Props: `{ message: string, onRetry?: ()=>void }`
   - Status: planned

---

## J) Build Order (aligned with plan)
- Phase 1: AppShell, TopBar, Button, TextField, LogoStreamberry, LandingPage.
- Phase 2: QuizCard, SessionConfigForm, HostDashboardPage.
- Phase 3: PinDisplay, PlayerList, HostControls, HostLobbyPage.
- Phase 4: JoinForm, WaitingRoom, PlayerPlayPage base.
- Phase 5: Presenter, AnswerGrid, AnswerCard, TimerRing.
- Phase 6: Scoring integration, AnswerLockedCard.
- Phase 7: Leaderboard, LeaderboardSummary, HostResultsPage, PlayerDonePage.
- Phase 8: Toast, Modal, EmptyState, ErrorState polish.

---

## K) Acceptance Checks per Component
- Visual: matches theme (colors, radius, spacing), responsive on 360–414px width.
- Interaction: keyboard and touch work; disabled states present (basic but not full a11y scope).
- Props contract: required props enforced, optional handled gracefully.
- No global side effects: presentational unless explicitly a controller component.

---

This playbook is the source of truth for component scope and order. We will update statuses as components are implemented.
