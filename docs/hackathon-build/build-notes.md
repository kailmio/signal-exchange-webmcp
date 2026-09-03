# Build Notes

## 2026-09-03 — Guided build started

- Entered the optional guided build path during the Resources stage.
- Participant name retrieved from Devpost: Yanghua Liu.
- Initial project idea and technical background are pending the onboarding interview.

## Reference direction

- Participant supplied https://www.youtube.com/watch?v=lpNhT6l1nKM as the inspiration.
- The video presents a card-game-style browser mod with visual page effects, utility toggles, and a card that finds or generates a script for the current site.
- Working interpretation: retain the playful visible card metaphor, but make capabilities discoverable and callable through WebMCP so the agent proposes or plays tools while the human sees and controls the outcome.
- Active-shaping moment: participant redirected ideation toward this concrete browser-mod reference.

## Onboarding rounds 1–2

- Participant regularly uses Hermes Agent and Codex as coding agents.
- Confirmed direction: polished self-contained web app, not a cross-site browser extension.
- Confirmed collaboration model: the agent recommends cards; card effects remain visible and human-controlled.
- Active shaping: the participant introduced a Wild Card that creates a surprising result and delegated selection of the remaining card powers to Codex based on the judging criteria.

## Onboarding round 3

- Participant delegated visual direction and implementation choices to Codex.
- Reference repository inspected: LYiHub/Card-master-browser-extension-public.
- Reference architecture uses React, TypeScript, Vite, GSAP, and modular capability domains; it is licensed GPL-3.0-only and includes third-party notices.
- Decision: use the repository for interaction and product-pattern research only. Do not copy its source or visual assets; build an original self-contained WebMCP-native application.
- Working demo loop: inspect the live board, recommend Forge/Focus/Wild, preview the proposed effect, obtain human approval, play the card, animate the shared state change, and retain an undoable activity history.
- Onboarding completed with three interview rounds. Next document: scope.

## Scope interview

- Participant's emotional hook: this feels like a new way for people to interact with web applications, and success means the vibe-coded product genuinely works.
- Long-term audience ambition: ordinary internet users after the interaction model becomes familiar.
- Confirmed build budget: 10–12 hours before the submission deadline.
- Participant delegated final aesthetic and scope calls to Codex; selected blend is Linear clarity, shared-board visibility, and deck-builder card theatre.
- Scope decision: narrow the MVP to a self-contained mission-planning board for solo makers and small creative teams rather than attempting a universal web-page layer.
- Core powers locked: Forge, Focus, and Wild.
- Cut by name: browser extension, third-party page modification, marketplace/SDK, accounts, backend, multiplayer, embedded model API, arbitrary code execution, large deck, and drag-and-drop dependency.
- Deepening rounds: 0. The participant explicitly delegated the final call, and the 10–12 hour budget made further expansion counterproductive.
- Created `docs/hackathon-build/scope.md`.

## PRD interview

- PRD stage started from the locked scope. Product decisions will prioritize an immediate judge demo, visible human control, graceful non-WebMCP fallback, and the 10–12 hour total budget.
- Participant confirmed the proposed defaults without changes.
- First run: open directly into a polished sample mission; starting a custom mission is secondary.
- Interaction parity: people can play cards manually, and a WebMCP agent can operate the same powers.
- Approval: every mutation creates a visible preview; approval can happen on the board or through an explicit instruction to the agent.
- Recovery edges: committed work survives refresh, pending previews do not, stale or unpreviewed commits are visibly rejected, and unsupported browsers show a clearly labeled manual demo mode.
- Deepening rounds: 0. Participant chose to write the PRD using the confirmed defaults.
- Created `docs/hackathon-build/prd.md` with ten epics, explicit user-visible states, testable acceptance criteria, edge cases, scope guards, and submission proof points.

## PRD independent review

- Hermes reviewer verdict: no blocking contradiction; the PRD is ready for technical specification after targeted clarifications.
- Review strength: WebMCP is essential to the inspect → recommend → preview → commit → undo loop rather than a decorative integration.
- Feasibility rating: amber within 10–12 hours. Keep transformations deterministic and local, prioritize the sample mission, minimize custom-mission behavior, use one compact history view, and reuse a small animation set.
- Adopted changes: a deterministic first Wild reveal, visible WebMCP preview/commit evidence in the demo path, explicit reset/undo semantics, manual/agent result parity, observable preview stability, sub-one-second non-blocking motion, a 1280×800 no-scroll target, and exact keyboard behavior.
- The reviewer suggested keeping manual fallback and agent status in the MVP because both were confirmed defaults and demonstrate honest capability handling.

## Deadline constraint

- Hard deadline confirmed by the participant: 5:00 AM Australia/Sydney time on 2026-09-04.
- At confirmation (4:52 PM on 2026-09-03), approximately 12 hours remained.
- The demo video is a first-class submission deliverable, including a short script, clean capture, edit, export, upload, and playback verification.
- Revised delivery rule: midnight is the hard deadline for the application to be built, tested, and deployed. No feature work continues after midnight.
- Use 12:00–12:30 AM for the final demo script and capture rehearsal; 12:30–2:00 AM for recording and editing; 2:00–2:30 AM for export, upload, and playback verification; 2:30–4:00 AM for the Devpost entry and final submission checks; keep 4:00–5:00 AM as recovery buffer.
- If schedule pressure appears, preserve the sample mission and complete WebMCP inspect → recommend → preview → commit → undo path; reduce custom-mission depth and decorative motion first.
- Capture insurance: record one clean end-to-end take as soon as the core loop is stable, even before final visual polish.

## Technical specification

- Participant locked all proposed defaults: React + TypeScript + Vite with plain CSS and localStorage; a public static deployment; deterministic local card transformations with no model API inside the app.
- Architecture confirmed: one synchronous reducer-backed external store, pure power functions, a shared command coordinator for manual and WebMCP actions, one isolated WebMCP adapter, and versioned committed-state persistence.
- Current WebMCP research confirmed the imperative API is exposed through `document.modelContext.registerTool()` and should be tested in ChatGPT’s supported in-app browser; browser support remains experimental, so manual fallback is mandatory.
- Exact preview safety uses a token, base revision, expiry, stored proposed board, one-time consumption, and structured no-change errors.
- Deployment default: Vercel static hosting, with a provider fallback only if authentication blocks delivery.
- Deepening rounds: 0. The participant explicitly said to lock the proposed architecture and write the spec.
- Created `docs/hackathon-build/spec.md`, including PRD-to-component mapping, annotated file structure, data lifecycle, six tool contracts, verification gates, and timed video/submission flow.

## Build checklist

- Participant handed checklist design to Codex and approved autonomous speed-run mode with no participant look-at-it pauses.
- Verification remains mandatory after every slice; commentary is limited to meaningful recovery milestones.
- Git recovery points are after the tested command engine, verified WebMCP loop, and frozen deployed release.
- Submission wow moment locked: a real agent triggers a bounded Wild preview, the person approves it, and undo visibly restores the prior board.
- Checklist contains 12 atomic tasks totaling approximately 5 hours 10 minutes, targets completion around 10:45 PM, and preserves at least 75 minutes of application contingency before midnight.
- Participant gut-check response: “Proceed.” The checklist is locked for autonomous execution.
- Created `docs/hackathon-build/checklist.md`.

## Build checkpoint 1 — Foundation and command engine

- Frontend App Builder required a visual concept before code. Generated and accepted a complete ready-state concept plus a Wild-preview state concept, then extracted the palette, typography, layout, component, icon, copy, and responsive rules into `docs/design/design-system.md`.
- Scaffolded React, TypeScript, Vite, Vitest, WebMCP types, strict build settings, MIT license, README, original SVG mark, and local Git repository.
- Vercel credentials were unavailable; created an anonymous HTTPS preview deployment as the single allowed early fallback. It expires after 60 minutes, so a durable GitHub Pages release is planned using the already-authenticated GitHub CLI.
- Implemented typed board state, stable sample data, deterministic Forge/Focus/Wild power engine, recommendation, preview-safe command service, synchronous external store, versioned persistence, accessible components, and the six WebMCP tool registrations.
- Verification: 11 Vitest tests passed; strict TypeScript/Vite production build passed; the in-app browser discovered all six WebMCP tools; agent-driven inspect, list, Forge preview/commit, Focus preview/commit, Wild preview/commit, and undo succeeded against live UI state.

## Build checkpoint 2 — Shared UI and live WebMCP

- Implemented and visually checked the full desktop board against the accepted concept at 1280×800, including the open-canvas layout, three idea cards, focus well, tactile power hand, preview panel, and attributed activity rail.
- Fixed the recommendation progression so a clean board recommends Forge, a forged board recommends Focus, and a focused board recommends Wild.
- Verified the complete manual Forge → Focus → Wild → undo flow with real button interactions. Verified custom-mission empty validation and neutral starter cards.
- Verified committed state survives refresh while preview state does not; the restored-state notice is visible.
- The local and durable public builds both expose all six WebMCP tools in the in-app browser. The public smoke test completed inspect, Wild preview, exact commit, and undo.
- Created public repository `https://github.com/kailmio/mission-deck-webmcp`, enabled GitHub Pages, and verified the deployment workflow passed. Durable URL: `https://kailmio.github.io/mission-deck-webmcp/`.
- Responsive check at 360×800 found no document-level horizontal overflow. Moved transient notices to the bottom on mobile so they do not cover the mission heading.

## Build checkpoint 3 — Responsive and accessibility polish

- At 1280×800 the document measured exactly 1280×800 with no page scroll; at 360×800 the document width measured 345px inside a 360px viewport with no page-level horizontal overflow.
- Verified keyboard activation with Enter for Forge and Space for Focus, Escape preview cancellation, and visible button focus.
- Added a trapped Tab/Shift+Tab loop to the custom-mission dialog and verified focus returns to the New mission trigger after Escape.
- Emulated `prefers-reduced-motion: reduce`; interactive transition and animation durations resolve to 0.01ms while controls remain usable.
- Browser console inspection returned no warnings or errors after the keyboard and responsive paths.
- Inspected the accepted ready-state concept and the final 1280×800 implementation screenshot together. The fidelity ledger records seven comparison points, the copy diff, intentional viewport adaptation, and the resolved fallback-label overlap.

## Build checkpoint 4 — Frozen public release

- Recovery commit `5837a1f0b2bf27222f395b5a39418859d33c4c87` passed 11 Vitest tests and the strict TypeScript/Vite production build in GitHub Actions run `33730207725`.
- GitHub Pages deployed the passing artifact to `https://kailmio.github.io/mission-deck-webmcp/`; the returned stylesheet fingerprint `index-FaHiGzsE.css` confirms the polished build is live.
- On the frozen HTTPS release, the in-app browser discovered all six page-defined tools and reported `Agent ready`.
- Repeated the complete public WebMCP path: reset → inspect → recommend Forge → Forge preview/commit → Focus preview/commit → Wild preview/commit → replay rejection → refresh → undo → reset.
- Refresh restored committed revision 6 with focused and forged state while discarding the preview; undo advanced to revision 7; reset advanced to revision 8 and a following undo returned `NOTHING_TO_UNDO` without mutation.
- A replay of the consumed Wild token returned `PREVIEW_NOT_FOUND` and left the committed board intact. Automated tests separately cover stale, expired, missing, and mismatched guards.
- Final public app URL: `https://kailmio.github.io/mission-deck-webmcp/`. Public repository: `https://github.com/kailmio/mission-deck-webmcp`.

## Build checkpoint 5 — Video and submission handoff

- Produced a self-contained 60.5-second HyperFrames judge demo from the frozen public deployment, with six timed beats covering the hook, tool discovery, exact preview/approval, Focus, bounded Wild surprise, commit history, undo, and the closing thesis.
- Recorded original `af_nova` narration at a measured pace, aligned it to the scene, and preserved the editable script, storyboard, composition sources, captured site assets, and deterministic transcript timing alongside the render.
- HyperFrames validation reports zero runtime, layout, motion, or contrast errors; all 65 sampled text pairs pass contrast. The remaining lint warning is non-blocking and concerns the readable size of the standalone Wild composition.
- Inspected every selected 1920×1080 hero frame, including a clean final Focus count at 29.1 seconds. The render is H.264 video plus stereo AAC audio at 30fps, 60.500 seconds, 17,600,923 bytes, and decodes end to end without ffmpeg errors.
- Re-ran the application release checks after video production: all 11 Vitest tests pass and the strict TypeScript/Vite build succeeds.
- Build checklist item 12 is complete. The editable Studio preview is available locally at `http://localhost:3017/#project/mission-deck-demo`; the rendered artifact is `video/mission-deck-demo/renders/mission-deck-demo.mp4`.

## Build checkpoint 6 — Instructional walkthrough

- Participant feedback identified that the first film worked as an introduction but did not adequately teach operation. Kept that cut as the cinematic trailer and produced a separate self-contained guided walkthrough as the primary submission demo.
- The 67-second walkthrough explicitly teaches orientation, idea selection, Forge preview and approval, Focus, bounded Wild, the recommended agent prompt, visible WebMCP tool calls, Activity evidence, and Undo.
- HyperFrames lint has zero errors; the two non-blocking warnings concern composition file length. Runtime, layout, and contrast checks report zero issues, with all 90 sampled text pairs passing contrast.
- Inspected every selected 1920×1080 beat frame after a final overlap polish pass. The H.264/AAC stereo render is 30fps, 67.000 seconds, 29,066,891 bytes, and decodes end to end without ffmpeg errors.
- Re-ran the application tests after walkthrough production: all 11 Vitest tests pass. The editable Studio preview is at `http://localhost:3018/#project/mission-deck-walkthrough`; the render is `video/mission-deck-walkthrough/renders/mission-deck-walkthrough.mp4`.
- Tagged the walkthrough release as `v0.1.1`; the public asset reports the exact 29,066,891-byte size and the matching Pages workflow for commit `721c4c285317e034e85efc3f224488048aec6a5b` completed successfully.
