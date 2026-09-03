# Technical Spec

## Overview

Build one static, client-only React application that proves a human and a WebMCP-capable agent can collaborate on the same visible mission board. The application opens on a polished sample mission and exposes six structured browser tools. Manual controls and tool handlers call the same command layer, so both paths create identical previews, commits, history, and undo behavior.

The implementation optimizes for a reliable judged demonstration before the midnight application cutoff. It does not use a backend, authentication, a database, an embedded model API, remote content generation, or copied code/assets from the Card Master reference.

Working delivery targets:

- Static application built, tested, and deployed by 12:00 AM Australia/Sydney on 2026-09-04.
- First backup demo recording as soon as the full WebMCP loop works.
- Final 60–90 second recording and submission work after the application freeze.

## Stack

### Runtime

- **React + TypeScript:** component rendering and typed application code.
- **Vite:** local development and static production build.
- **Browser WebMCP imperative API:** tool registration through `document.modelContext.registerTool()`.
- **CSS:** design tokens, responsive layout, and short transitions; no animation runtime.
- **localStorage:** versioned committed-state persistence; no server data.

### Development and verification

- **Vitest:** focused unit tests for pure power transformations, preview/commit validation, undo, reset, and persistence parsing.
- **TypeScript compiler:** strict type checking in the production build.
- **Interactive browser verification:** desktop, 360px, keyboard, reduced-motion, refresh, manual fallback, and ChatGPT in-app browser WebMCP smoke tests.
- **Vercel:** primary static deployment target with HTTPS. If its authentication is unavailable, use another static host without changing the application architecture.

### Dependency ceiling

Runtime dependencies are limited to `react` and `react-dom`. Development dependencies are limited to Vite, the React Vite plugin, TypeScript, Vitest, and `webmcp-types` if its definitions match the browser implementation used for testing. The app uses original CSS, system fonts, and small local SVG marks rather than an icon, animation, state, or component library.

Documentation:

- [WebMCP explainer and imperative API](https://github.com/webmachinelearning/webmcp)
- [WebMCP implementation status](https://github.com/webmachinelearning/webmcp/blob/main/implementation-status.md)
- [webmcp-types](https://www.npmjs.com/package/webmcp-types)
- [React documentation](https://react.dev/)
- [Vite documentation](https://vite.dev/guide/)
- [Vitest documentation](https://vitest.dev/guide/)
- [Vercel Vite deployment documentation](https://vercel.com/docs/frameworks/frontend/vite)

## Architecture

### Static application shell

`App` composes the status/header, mission board, power hand, pending-preview surface, activity rail, notices, and custom-mission dialog. It contains no power logic. At 1280×800, the primary mission, three powers, agent status, preview area, and recent activity remain within the viewport. At 360px, the same sections form a deliberate vertical sequence.

Implements: `prd.md > Epic 1`, `Epic 2`, `Epic 9`, `Epic 10`.

### Synchronous application store

A tiny external store owns one `AppState` and applies one pure reducer synchronously. React reads it through `useSyncExternalStore`. Manual event handlers and WebMCP callbacks both receive `getState()` and `dispatch()` from this store, eliminating stale React closure problems and making duplicate-commit rejection deterministic.

The store owns:

- current committed board and monotonic revision;
- active preview, which is never persisted;
- one previous committed board for undo;
- compact history and recent tool activity;
- recommendation highlight and transient notice;
- WebMCP connection state and commit-in-progress guard.

Implements: `prd.md > Epic 2`, `Epic 3`, `Epic 4`, `Epic 8`, `Epic 9`.

### Domain and power engine

Pure functions validate a requested power and return a complete proposed board plus a human-readable change list. They never access React, DOM APIs, storage, time, or WebMCP directly. Forge, Focus, and Wild use fixed local templates so the sample mission remains fast and repeatable.

- **Forge:** targets one un-forged idea and proposes 3–5 verb-led action cards with completion checks.
- **Focus:** chooses or accepts one actionable card and proposes it as the sole focus.
- **Wild:** chooses one compatible bounded template. The first Wild draw on a clean sample board is fixed; later draws rotate through compatible templates.

Implements: `prd.md > Epic 5`, `Epic 6`, `Epic 7`.

### Command coordinator

All user-visible operations pass through commands rather than manipulating state directly:

- inspect committed board;
- list power availability and recommendation;
- create or replace a preview;
- commit the active preview;
- cancel the preview;
- undo the latest committed power;
- reset the sample;
- create a minimal custom mission.

The coordinator creates tool activity and human-readable history entries, consumes preview tokens exactly once, and centralizes known error results. `origin: "agent" | "manual" | "system"` changes attribution only; it does not select a different transformation.

Implements: `prd.md > Epic 3`, `Epic 4`, `Epic 8`, `Epic 9`.

### WebMCP adapter

One adapter detects `document.modelContext`, registers all six tools, maps tool inputs to commands, and converts command results into concise WebMCP results. It owns an `AbortController` used to unregister tools during cleanup. The UI reports `Agent ready` only after registration succeeds; missing API, rejected registration, or a permission error produces `Manual demo mode` with a short explanation.

Tools remain registered for the page lifetime. Current availability is returned by `list_card_powers`; a currently invalid invocation returns a structured no-change error rather than unregistering and re-registering tools.

Implements: `prd.md > Epic 1`, `Epic 3`, `Epic 4`, `Epic 8`, `Epic 9`.

### Persistence adapter

Persistence subscribes to committed-state changes and stores a versioned envelope. It excludes the active preview, connection status, transient notices, recommendation highlight, and commit guard. Startup validates the envelope; invalid or incompatible data falls back to the sample and raises a recoverable notice. Storage write failure disables refresh persistence for the session without breaking play.

Implements: `prd.md > Epic 2`, `Epic 8`.

### Presentation components

Components receive typed view data and dispatch commands. They never duplicate domain rules. Semantic buttons, dialog focus handling, visible focus rings, non-color labels, `aria-live` notices, and reduced-motion styles provide the required accessible behavior.

Implements: `prd.md > Epic 1`, `Epic 2`, `Epic 4`, `Epic 8`, `Epic 9`, `Epic 10`.

## Data Model

### Committed board

```ts
type PowerId = "forge" | "focus" | "wild";
type CardKind = "idea" | "action";
type CardStatus = "open" | "forged" | "focused";
type Origin = "agent" | "manual" | "system";

interface MissionCard {
  id: string;
  kind: CardKind;
  title: string;
  detail: string;
  completionCheck?: string;
  status: CardStatus;
  sourceCardId?: string;
}

interface BoardContent {
  missionId: string;
  mode: "sample" | "custom";
  goal: string;
  cards: MissionCard[];
  focusedCardId: string | null;
  wildDrawIndex: number;
}

interface CommittedBoard {
  revision: number;
  content: BoardContent;
}
```

IDs use `crypto.randomUUID()` for custom or generated cards. The sample fixture uses stable readable IDs for repeatable tests and video capture. Goal, title, detail, and completion-check lengths are capped before entering state.

### Preview

```ts
interface ChangeSummary {
  kind: "add" | "update" | "focus" | "combine";
  cardId?: string;
  label: string;
  before?: string;
  after?: string;
}

interface PendingPreview {
  token: string;
  baseRevision: number;
  origin: Origin;
  power: PowerId;
  targetCardId?: string;
  outcomeKey?: string;
  rationale: string;
  changes: ChangeSummary[];
  proposedContent: BoardContent;
  createdAt: number;
  expiresAt: number;
}
```

The proposed board is computed once and stored with the preview. Commit never regenerates it. A preview expires after five minutes, is replaced by a newer preview, and becomes stale when its `baseRevision` differs from the committed revision.

### History and tool activity

```ts
interface ActivityEntry {
  id: string;
  sequence: number;
  origin: Origin;
  kind: "inspect" | "recommend" | "preview" | "commit" | "cancel" | "undo" | "reset" | "error";
  power?: PowerId;
  summary: string;
  createdAt: number;
}
```

The visible rail keeps the newest eight entries; persistence keeps at most twenty. Raw tool payloads and internal snapshots are not rendered. Entries for WebMCP preview and commit explicitly say `WebMCP · Preview Forge` and `WebMCP · Commit Forge` so the judged path is visible.

### Full application state

```ts
interface AppState {
  board: CommittedBoard;
  undoBoard: BoardContent | null;
  preview: PendingPreview | null;
  history: ActivityEntry[];
  recommendation: { power: PowerId; reason: string } | null;
  connection: "checking" | "ready" | "manual";
  persistence: "available" | "unavailable";
  committing: boolean;
  notice: { tone: "info" | "success" | "error"; text: string } | null;
}
```

## File Structure

```text
.
├─ index.html                         # Vite entry document and page metadata
├─ package.json                       # scripts and deliberately small dependency set
├─ tsconfig.json                      # strict shared TypeScript settings
├─ tsconfig.app.json                  # browser application compilation
├─ tsconfig.node.json                 # Vite configuration compilation
├─ vite.config.ts                     # React plugin and Vitest configuration
├─ vercel.json                        # SPA rewrite only if deployment requires it
├─ public/
│  └─ mark.svg                        # original project mark/favicon
├─ src/
│  ├─ main.tsx                        # mounts React and starts the app
│  ├─ App.tsx                         # top-level composition; no domain logic
│  ├─ styles/
│  │  ├─ tokens.css                   # color, type, spacing, radius, shadow, motion tokens
│  │  └─ app.css                      # layout, card states, responsive and reduced-motion rules
│  ├─ domain/
│  │  ├─ types.ts                     # board, preview, history, command, and error types
│  │  ├─ sampleMission.ts             # stable judge-ready fixture and deterministic Wild sequence
│  │  ├─ powers.ts                    # pure Forge, Focus, Wild availability and transformations
│  │  ├─ recommendation.ts            # deterministic suggested power and short reason
│  │  └─ commands.ts                  # inspect/list/preview/commit/cancel/undo/reset/custom logic
│  ├─ state/
│  │  ├─ reducer.ts                   # single AppState transition function
│  │  ├─ store.ts                     # synchronous dispatch/getState/subscribe interface
│  │  └─ persistence.ts               # versioned localStorage parse, load, save, and limits
│  ├─ webmcp/
│  │  ├─ registerTools.ts             # feature detection, six registrations, cleanup
│  │  ├─ schemas.ts                   # JSON Schemas and tool descriptions
│  │  ├─ results.ts                   # concise success/error result formatting
│  │  └─ webmcp.d.ts                  # minimal fallback typing only if package typing is insufficient
│  ├─ components/
│  │  ├─ AppHeader.tsx                # mission title, reset/custom actions, agent status
│  │  ├─ MissionBoard.tsx             # mission, idea/action lanes, and focus zone
│  │  ├─ MissionCardView.tsx           # semantic card display and manual targeting
│  │  ├─ PowerHand.tsx                # three power cards and availability states
│  │  ├─ PowerCard.tsx                # manual selection and recommendation treatment
│  │  ├─ PreviewPanel.tsx             # exact change list, approve, cancel, expiry copy
│  │  ├─ ActivityRail.tsx             # compact attributed event history
│  │  ├─ CustomMissionDialog.tsx       # goal plus up to three optional ideas
│  │  └─ NoticeRegion.tsx             # aria-live success and recoverable errors
│  └─ test/
│     ├─ powers.test.ts                # all power success/unavailable/determinism cases
│     ├─ commands.test.ts              # preview safety, parity, commit, undo, reset, concurrency
│     └─ persistence.test.ts           # valid, corrupt, incompatible, and unavailable storage
├─ docs/
│  ├─ demo-script.md                  # timed 60–90 second narration and capture checklist
│  └─ hackathon-build/                 # guided scope, PRD, spec, checklist, and notes
├─ README.md                           # setup, WebMCP testing, architecture, attribution
└─ LICENSE                             # project open-source license
```

## Data Flow

### 1. Startup and persistence

1. `main.tsx` creates the synchronous store.
2. `persistence.load()` parses the versioned envelope or returns the sample fixture plus a notice.
3. React subscribes to the store and renders the committed board immediately.
4. The WebMCP adapter sets connection state to `checking`, attempts registration, then sets `ready` or `manual`.
5. Persistence subscribes to changes in committed board, undo board, and history only.

### 2. Manual card play

1. The visitor selects a power and, for Forge, a target idea.
2. The component calls `previewCardPlay(input, "manual")`.
3. The command reads the latest board, calls the pure power engine once, and stores the preview with exact proposed content.
4. `PreviewPanel` renders `changes`; the committed board remains unchanged.
5. Approve calls `commitCardPlay(preview.token, "manual")`; cancel calls `cancelPreview()`.

### 3. Agent card play

1. The browser agent discovers the registered tools.
2. `inspect_mission_board` returns the latest committed public state and current preview status.
3. `list_card_powers` returns availability plus a deterministic recommendation; the UI highlights the same recommendation without changing board content.
4. `preview_card_play` passes structured arguments to the same preview command used manually.
5. The user reviews the visible preview in the page.
6. `commit_card_play` or the page’s Approve button submits the same token to the same commit command.

### 4. Commit and exactness

1. Commit rejects a missing token, consumed token, expired preview, mismatched token, or mismatched board revision.
2. The command sets the commit guard before applying state.
3. The existing board content becomes `undoBoard`.
4. The stored `proposedContent` becomes the committed content and revision increments once.
5. The preview is cleared, the history receives a commit entry, and persistence saves the committed envelope.
6. The consumed token cannot be replayed.

### 5. Undo and reset

- Undo replaces current content with `undoBoard`, increments the revision, clears the preview, clears `undoBoard`, and records an undo entry. It does not delete earlier visible history.
- Reset requires confirmation when work differs from the sample, loads a fresh sample baseline, increments revision, clears preview and undo, resets the Wild sequence, and records a reset entry. Reset is not undoable.

### 6. Refresh

Committed content and compact history reload. Preview, connection state, recommendation, commit guard, and notices start fresh. If the previous session had a preview, it is absent after refresh by construction rather than restored and expired later.

## Components And Responsibilities

### AppHeader

Shows the current mission, `Agent ready`/`Checking`/`Manual demo mode`, and secondary custom/reset actions. It does not infer capability; it renders store state.

Implements: `prd.md > Epic 1`, `Epic 2`, `Epic 9`.

### MissionBoard and MissionCardView

Render committed content, recently changed states, the empty or selected focus zone, Forge target affordances, and readable relationships between source ideas and generated actions.

Implements: `prd.md > Epic 2`, `Epic 5`, `Epic 6`, `Epic 7`, `Epic 10`.

### PowerHand and PowerCard

Render Forge, Focus, and Wild with descriptions, availability, recommendation, selection, and recently-played treatments. Manual selection begins the same preview command used by the WebMCP adapter.

Implements: `prd.md > Epic 3`, `Epic 5`, `Epic 6`, `Epic 7`, `Epic 9`, `Epic 10`.

### PreviewPanel

Acts as the trust surface: selected power, target, rationale, exact additions/updates/focus, unchanged-state message, expiry, Approve, and Cancel. It uses a modal dialog on narrow screens and an in-layout panel on desktop while preserving the same semantics.

Implements: `prd.md > Epic 4`, `Epic 5`, `Epic 6`, `Epic 7`, `Epic 10`.

### ActivityRail

Shows the newest activity with text attribution, order, action, result, and undoable marker. It visibly distinguishes WebMCP and manual events and never exposes raw internal payloads.

Implements: `prd.md > Epic 3`, `Epic 4`, `Epic 8`, `Epic 9`.

### CustomMissionDialog

Accepts one required goal and up to three optional ideas. Empty optional ideas receive two neutral starter cards. Submission confirms replacement when needed and resets preview/undo/history baseline.

Implements: `prd.md > Epic 2`, `Epic 10`.

### NoticeRegion

Announces errors, cancellation, commit, undo, reset, corrupt persistence recovery, and manual fallback using visible text and an appropriate polite `aria-live` region.

Implements: `prd.md > Epic 1`, `Epic 4`, `Epic 8`, `Epic 9`, `Epic 10`.

## WebMCP Tool Contracts

All schemas use `type: "object"` and `additionalProperties: false`. Known validation failures return `{ ok: false, error: { code, message, nextAction } }` without changing committed state. Successful results return `{ ok: true, data: ... }`. The adapter serializes this payload in a concise text content item for broad implementation compatibility.

### `inspect_mission_board`

Input: `{}`.

Returns the mission goal, current revision, ordered public cards, focus, pending-preview summary if present, and the newest five history entries. It does not return stored proposed content, an undo snapshot, or raw internal tokens beyond the active preview token needed for an explicitly requested commit.

### `list_card_powers`

Input: `{}`.

Returns each power’s ID, description, `available`, and unavailable reason. It also returns `{ recommendedPower, reason }` and places the same non-mutating recommendation highlight in the UI.

### `preview_card_play`

Input:

```json
{
  "power": "forge | focus | wild",
  "targetCardId": "optional string"
}
```

`targetCardId` is required for Forge and optional for Focus/Wild. Returns the preview token, base revision, five-minute expiry, rationale, exact change summaries, and explicit `committed: false`. It replaces any earlier preview visibly.

### `commit_card_play`

Input:

```json
{ "previewToken": "required string" }
```

Returns the new revision, power, changed-card summaries, history summary, and `committed: true`. It never accepts a power or replacement content, preventing the commit call from substituting a new effect.

### `undo_last_play`

Input: `{}`.

Returns the new revision and restored-state summary. If no committed card play is undoable, returns `NOTHING_TO_UNDO` with the unchanged board.

### `load_demo_mission`

Input:

```json
{ "confirmReplace": true }
```

If the current board differs from the sample and confirmation is missing, returns `CONFIRMATION_REQUIRED`. Success creates a fresh baseline, clears preview and undo, resets deterministic Wild order, records reset, and returns the sample summary.

### Error codes

- `POWER_UNAVAILABLE`
- `TARGET_REQUIRED`
- `TARGET_NOT_FOUND`
- `PREVIEW_NOT_FOUND`
- `PREVIEW_TOKEN_MISMATCH`
- `PREVIEW_STALE`
- `PREVIEW_EXPIRED`
- `COMMIT_IN_PROGRESS`
- `NOTHING_TO_UNDO`
- `CONFIRMATION_REQUIRED`
- `INVALID_INPUT`

Every error includes a short next valid action suitable for both the agent and visible notice.

## External APIs And Dependencies

The application calls no remote data API. WebMCP is an in-page browser API, and all tool execution occurs against client-side state. HTTPS static hosting is the only runtime infrastructure.

The adapter uses the current imperative shape:

```ts
await document.modelContext.registerTool(
  {
    name,
    description,
    inputSchema,
    execute: async (input) => toToolResult(runCommand(input)),
  },
  { signal: controller.signal },
);
```

Feature detection and a registration `try/catch` are mandatory because support is experimental outside the supported ChatGPT environment. No polyfill pretends to provide a real agent connection.

## AI Usage

The application itself does not call an AI model. The connected browser agent supplies reasoning: it reads structured board state, weighs the available powers, explains a recommendation, and invokes tools. Deterministic local transformations keep the demo fast and ensure the human can inspect the exact effect.

The submission will disclose that Codex and Hermes Agent supported product planning, implementation, review, testing, and submission preparation. Generated source will be reviewed and verified through builds, tests, and the live interaction path. The Card Master repository is inspiration only; no GPL source or visual asset is copied.

## Error Strategy

### Invalid or out-of-order action

Return a structured no-change error, display the explanation, and preserve committed state. This covers missing targets, unavailable powers, commits without previews, stale previews, duplicate commits, and undo without an eligible play.

### WebMCP unavailable or registration rejected

Switch to `Manual demo mode`, keep all card behavior usable, and show one line explaining how to test the real tool path. Do not label simulated clicks as agent actions.

### Persistence failure

Continue in memory, set persistence status unavailable, and warn that refresh recovery is disabled. Corrupt stored JSON is ignored and replaced with the sample rather than repaired speculatively.

### Render or transformation exception

Catch at the command boundary before dispatch. Return `INVALID_INPUT` or a generic recoverable failure, log only safe development details to the console, and leave committed state unchanged.

## Risks And Verification

### Risk 1 — Experimental WebMCP API drift

Mitigation: isolate all browser-specific code in `registerTools.ts`, use the official current `document.modelContext.registerTool()` form, and smoke-test in ChatGPT’s in-app browser before visual polish. Verification requires discovering all six tools and successfully executing inspect, list, preview, commit, undo, and reset.

### Risk 2 — Stale state inside agent callbacks

Mitigation: callbacks call the synchronous store’s `getState()` at execution time; they do not capture rendered state. Unit test that a tool preview after a manual commit uses the newest revision.

### Risk 3 — Preview/commit drift or replay

Mitigation: store proposed content once, validate token/revision/expiry, synchronously consume the token, and reject concurrent or repeated commits. Tests cover exact content equality and every rejection reason.

### Risk 4 — Scope misses midnight

Mitigation: implement in this order: domain loop, visible desktop loop, WebMCP, persistence/recovery, responsive/accessibility, then decorative refinement. If behind, simplify custom-mission presentation and card motion; never cut the sample mission, WebMCP path, preview, activity evidence, or undo.

### Risk 5 — A good build produces a weak video

Mitigation: keep a stable sample fixture and deterministic first Wild result, create the script before feature freeze, record an insurance take immediately after the real tool loop works, and verify the uploaded video from its public playback URL.

### Verification gates

1. `npm run test` passes the domain safety suite.
2. `npm run build` passes strict type checking and production bundling.
3. Clean load shows the complete sample without console errors.
4. Manual Forge → commit → Focus → commit → Wild → commit → undo succeeds.
5. The same starting state and inputs produce equivalent manual and WebMCP results.
6. WebMCP activity visibly names preview and commit calls.
7. Missing/stale/expired/replayed commits do not mutate state.
8. Refresh restores committed work and discards preview.
9. Reset establishes a new baseline and disables undo.
10. 1280×800 has no page scroll; 360px has no horizontal clipping.
11. Tab order, Enter/Space activation, Escape cancellation, focus visibility, and reduced motion work.
12. Production URL loads over HTTPS and repeats the clean demo path.

## Demo And Submission Flow

### Video sequence

The script targets 60–90 seconds:

1. **0–10s:** show the sample mission, visible power cards, and `Agent ready`; state the idea: agent actions are visible cards.
2. **10–25s:** ask the agent to inspect and recommend; show Forge highlighted with a short reason.
3. **25–42s:** ask for a Forge preview; point to the exact proposed actions and unchanged-board message; approve and show the WebMCP commit activity.
4. **42–55s:** ask for Focus; approve the highest-leverage next action.
5. **55–70s:** ask to be surprised; reveal the deterministic first Wild transformation and approve it.
6. **70–82s:** undo Wild and show restoration/history; close on human control and shared state.

The recording must show the browser agent invoking real tools, not only manual UI. Capture at a readable desktop viewport, hide unrelated windows and notifications, use a fresh sample baseline, and verify audio and text legibility before editing.

### Submission artifacts

- Public HTTPS application URL.
- Public source repository with README, license, setup, architecture, WebMCP testing notes, and AI-use disclosure.
- Uploaded public demo video with verified playback.
- Devpost description emphasizing usefulness, originality, execution, WebMCP leverage, and human-agent collaboration.
- Screenshots from the deployed build, including the board, preview, and committed state.

## Build Checklist Input

The checklist should divide work into independently verifiable slices in this order:

1. scaffold the static React/TypeScript/Vite project and scripts;
2. implement data types, sample fixture, three pure powers, recommendation, commands, and unit tests;
3. implement synchronous store, reducer, persistence, preview safety, and undo;
4. build the complete manual desktop UI and core accessibility;
5. register and verify all six WebMCP tools against the same commands;
6. finish responsive layout, reduced motion, recovery states, and minimal visual theatre;
7. run the full verification matrix and deploy the exact production build before midnight;
8. create the timed script, capture insurance and final takes, edit/export/upload, then prepare submission artifacts.

Each checklist task must name its files, acceptance test, and stop condition. Tasks after the WebMCP loop should never destabilize the shared command layer.
