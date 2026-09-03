# Build Checklist

## Build Preferences

- **Status:** Locked and approved for autonomous execution
- **Build mode:** Autonomous speed-run; Codex executes the full checklist after one start confirmation.
- **Comprehension checks:** N/A during implementation; explain the finished architecture in the handoff.
- **Git:** Initialize locally and create recovery commits after items 5, 8, and 11. Never overwrite unrelated user work.
- **Verification:** Codex verifies every item and continues without participant look-at-it pauses. Stop only for an external authorization/account blocker or a choice that would materially change scope.
- **Check-in cadence:** Short commentary at the working domain engine, working WebMCP loop, deployed release, and completion.
- **Hard cutoff:** Application built, tested, and deployed before 12:00 AM Australia/Sydney on 2026-09-04.
- **Execution target:** Finish item 12 by approximately 10:45 PM, preserving at least 75 minutes of application contingency before midnight.
- **Scope guard:** If time slips, simplify custom-mission presentation and decorative motion first. Do not cut the sample mission, six WebMCP tools, exact preview/commit, visible tool activity, manual parity, or undo.
- **Submission wow moment:** A real agent previews Forge without changing the page, the person approves the exact diff, Focus identifies the next move, and one-level undo instantly restores the prior board.

## Checklist

- [x] **1. Scaffold the static app and recovery foundation — 20 minutes**
  Spec ref: `spec.md > Stack` and `spec.md > File Structure`
  What to build: Create the React + TypeScript + Vite application, strict compiler configuration, Vitest setup, base scripts, original favicon, README skeleton, open-source license, `.gitignore`, and local Git repository. Preserve the existing planning documents.
  Acceptance: The app starts without a setup wizard, the repository contains no copied Card Master source/assets, and the dependency set stays within the spec ceiling.
  Verify: Run `npm install`, `npm run test`, and `npm run build`; confirm the production output is static and Git sees the planning files plus scaffold.

- [x] **2. Establish an early HTTPS deployment path — 20 minutes**
  Spec ref: `spec.md > Stack > Development and verification` and `spec.md > External APIs And Dependencies`
  What to build: Configure the simplest working Vercel static deployment and deploy the scaffold. Record the returned URL. If Vercel authentication is unavailable, switch once to a static-host fallback rather than spending the build window debugging an account.
  Acceptance: A public HTTPS URL loads the scaffold and can later be updated from the same project without architecture changes.
  Verify: Open the returned URL in a clean browser tab, confirm an HTTP-successful page load, HTTPS, and no missing entry assets.

- [x] **3. Implement the typed board model and stable sample mission — 20 minutes**
  Spec ref: `spec.md > Data Model > Committed board` and `spec.md > Domain and power engine`
  What to build: Add domain types, length limits, stable sample IDs, a polished fuzzy-project mission, idea cards, empty focus state, and helpers for safe cloning/normalization.
  Acceptance: A clean state always contains the mission, multiple vague ideas, two power definitions, no focus, and revision zero.
  Verify: Add and run fixture tests that assert IDs are unique, text is within limits, Forge has an eligible target, and resetting twice produces deeply equivalent sample content.

- [x] **4. Build Forge, Focus, and recommendation as pure functions — 30 minutes**
  Spec ref: `spec.md > Domain and power engine`
  What to build: Implement availability checks and deterministic transformations for both powers plus the recommendation rule. Each transformation returns proposed board content, rationale, and exact human-readable changes without touching app state.
  Acceptance: Forge proposes 3–5 verb-led actions with checks; Focus proposes exactly one action; unavailable powers explain why.
  Verify: Run table-driven Vitest cases for success, missing targets, forged targets, no actionable cards, and recommendation changes after commits.

- [x] **5. Implement preview-safe commands and domain tests — 30 minutes**
  Spec ref: `spec.md > Command coordinator`, `spec.md > Preview`, and `spec.md > Data Flow > Commit and exactness`
  What to build: Implement inspect, list, preview, commit, cancel, undo, reset, and minimal custom-mission commands with origin attribution. Store proposed content once; enforce token, revision, expiry, one-time consumption, and commit guard; return structured no-change errors.
  Acceptance: A preview never mutates committed content; commit applies exactly the stored proposal once; stale, expired, missing, mismatched, duplicate, and concurrent commits leave state unchanged; reset creates a non-undoable baseline.
  Verify: Run `npm run test` with explicit assertions for every error code, manual/agent equivalence, exact preview-to-commit equality, undo restoration, and reset behavior. Create recovery commit 1 only after the suite passes.

- [x] **6. Wire the synchronous store and versioned persistence — 25 minutes**
  Spec ref: `spec.md > Synchronous application store`, `spec.md > Persistence adapter`, and `spec.md > Data Flow > Startup and persistence`
  What to build: Add the pure reducer, synchronous `getState`/`dispatch`/`subscribe` store, React subscription hook, versioned localStorage envelope, capped activity history, load fallback, and in-memory behavior when storage fails.
  Acceptance: Tool callbacks can always read the newest revision; committed board/history survive refresh; previews never persist; corrupt/incompatible storage recovers to the sample with a visible notice; storage failure does not stop play.
  Verify: Run store and persistence tests for synchronous updates, latest-state reads, valid restore, preview exclusion, corrupt JSON, wrong version, history cap, and simulated storage exceptions.

- [x] **7. Build the complete manual desktop interaction loop — 30 minutes**
  Spec ref: `spec.md > Static application shell` and `spec.md > Components And Responsibilities`
  What to build: Compose the header/status, mission board, cards, focus zone, two-card power hand, Forge target selection, preview panel, approve/cancel actions, activity rail, notices, undo, and reset using the shared commands. Implement the dark restrained mission-control visual direction with original CSS.
  Acceptance: At 1280×800 the complete sample loop is visible without page scrolling; manual Forge → Focus → undo succeeds; preview preserves committed text/order/focus/history; activity clearly attributes manual actions.
  Verify: Run the production build, open a clean sample, execute the complete manual path twice, cancel one preview, attempt one invalid play, and confirm the board stays usable with no console errors.

- [x] **8. Register and prove the real WebMCP loop — 30 minutes**
  Spec ref: `spec.md > WebMCP adapter` and `spec.md > WebMCP Tool Contracts`
  What to build: Add the current `document.modelContext.registerTool()` adapter, schemas, result formatting, AbortController cleanup, capability state, and all six tools. Each handler calls the same commands as the manual interface. Update the HTTPS deployment and test with a supported browser agent.
  Acceptance: The agent discovers all six tools; inspect returns current committed state; list returns availability/recommendation and highlights it; preview renders exact pending changes; commit visibly names the WebMCP action; undo and demo reset work; unsupported environments truthfully show manual mode.
  Verify: In ChatGPT’s in-app browser, invoke `inspect_mission_board`, `list_card_powers`, `preview_card_play`, `commit_card_play`, `undo_last_play`, and `load_demo_mission`; compare one agent and manual result from the same baseline; save a backup screen capture or screenshots of the working loop. Create recovery commit 2.

- [x] **9. Finish custom mission, recovery states, and compact activity — 25 minutes**
  Spec ref: `spec.md > CustomMissionDialog`, `spec.md > ActivityRail`, and `spec.md > Error Strategy`
  What to build: Add the small custom-mission dialog, inline validation, neutral starter ideas, replacement confirmation, long-text constraints/detail reveal, persistence notices, connection explanations, and readable activity trimming.
  Acceptance: Whitespace goals are rejected inline; a goal without ideas creates at least two usable starters; cancelling preserves the prior board; reset confirmation protects modified work; no visible state exposes raw payloads or claims a false connection.
  Verify: Exercise empty, minimal, long, cancelled, confirmed, refreshed, corrupt-storage, and WebMCP-unavailable paths; confirm every failure leaves committed state intact and names a next action.

- [x] **10. Complete responsive, keyboard, reduced-motion, and visual polish — 30 minutes**
  Spec ref: `spec.md > Presentation components` and `spec.md > Risks And Verification > Verification gates`
  What to build: Finish 360px layout, semantic controls, dialog focus behavior, logical tab order, Enter/Space activation, Escape preview cancellation, visible focus, non-color status cues, `aria-live` notices, reduced-motion overrides, and reusable sub-one-second power/commit/undo transitions.
  Acceptance: No essential content clips horizontally at 360px; the mobile section order is clear; all core actions work without a pointer; motion never blocks controls and reduced motion preserves meaning; desktop retains the no-scroll demo frame.
  Verify: Check 1280×800 and 360px; keyboard-run preview/approve/cancel/undo/reset/custom mission; emulate reduced motion; inspect headings, labels, dialog semantics, focus visibility, contrast, overflow, and console output.

- [x] **11. Run the release matrix and deploy the frozen application — 30 minutes**
  Spec ref: `spec.md > Risks And Verification > Verification gates`
  What to build: Fix only release-blocking defects, complete automated and manual checks, finalize metadata/README/WebMCP instructions/AI-use disclosure, deploy the exact passing build, and tag the frozen release. No new features enter after this item.
  Acceptance: All twelve verification gates in the spec pass; the public HTTPS build repeats the sample WebMCP path; manual fallback remains usable; repository instructions reproduce the build; the release is complete before midnight.
  Verify: Run `npm run test` and `npm run build`; run the full clean-session demo on the deployed URL; refresh after a commit; verify preview discard, stale/replay rejection, reset/undo semantics, mobile, keyboard, and public asset loading. Create recovery commit 3 and record the deployed URL plus commit hash.

- [x] **12. Prepare the Devpost and video handoff — 30 minutes**
  Spec ref: `spec.md > Demo And Submission Flow` and `prd.md > Submission Proof Points`
  What to build: Create the timed 60–90 second `docs/demo-script.md`, capture checklist, screenshot shortlist, project-story bullets, setup/test instructions, deployed URL, repository status/link placeholder, AI-use disclosure, and proof checklist. Ensure the hero sequence is real WebMCP Forge preview → approval → Focus → undo. This item prepares materials; final editing/upload/submission continues with `$prepare-submission` after the application build.
  Acceptance: The script shows the sample board and agent readiness within 10 seconds, starts inspect → recommend → preview within 15 seconds, visibly proves WebMCP preview/commit, ends with undo, and leaves enough material to prepare the Devpost entry without rediscovering facts.
  Verify: Rehearse once against the frozen URL with a stopwatch, confirm every narrated claim is visible, open each selected screenshot, confirm the insurance capture is playable, and verify the next command is `$prepare-submission`.
