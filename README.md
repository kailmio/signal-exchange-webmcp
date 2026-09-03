# Mission Deck

Mission Deck is a self-contained WebMCP planning board where agent actions become visible, previewable, and reversible power cards. An agent can inspect live state, recommend Forge or Focus, preview an exact change, and commit only the proposal the person approved.

**Live app:** https://kailmio.github.io/mission-deck-webmcp/

## Why it exists

Most agent actions disappear behind a chat transcript. Mission Deck gives them a shared visual language: Forge turns an idea into concrete actions, Focus chooses the next move, every mutation is previewed on the page, and every committed play can be undone.

## Judge-ready demo

Open the live app in ChatGPT's WebMCP-capable in-app browser, then ask the agent:

1. `Inspect this mission board and recommend the best card. Do not change anything yet.`
2. `Preview Forge on the “Make actions tangible” idea. Stop for my approval.`
3. `Commit that exact preview.`
4. `Preview and commit Focus.`
5. `Undo the Focus play.`

The board should visibly move from Forge → Focus → Undo while the activity rail attributes each WebMCP preview, commit, and recovery. In a browser without WebMCP, the header honestly reports **Manual demo mode** and both cards remain playable with the pointer or keyboard.

The primary demo is a narrated 59-second [guided walkthrough](https://github.com/kailmio/mission-deck-webmcp/releases/download/v0.2.0/mission-deck-walkthrough.mp4) in `video/mission-deck-walkthrough/`. It teaches both the manual card flow and the agent/WebMCP flow, including the exact-preview approval boundary and Undo. Open the editable version with `npx hyperframes preview video/mission-deck-walkthrough --port 3018`.

## WebMCP tools

| Tool | Input | Purpose |
| --- | --- | --- |
| `inspect_mission_board` | `{}` | Reads committed board state, preview status, and recent activity. |
| `list_card_powers` | `{}` | Returns availability and the contextual recommendation. |
| `preview_card_play` | `{ power, targetCardId? }` | Displays an exact, non-mutating Forge or Focus proposal. |
| `commit_card_play` | `{ previewToken }` | Applies only the stored active preview once. |
| `undo_last_play` | `{}` | Restores the board before the latest committed card play. |
| `load_demo_mission` | `{ confirmReplace }` | Loads the deterministic sample and clears preview/undo. |

Tools are registered with the experimental `document.modelContext.registerTool()` API. Preview tokens are bound to a board revision, expire, and are consumed once; stale, expired, replayed, or mismatched commits fail without mutating the board.

## Local development

Requires a current Node.js release with npm.

```bash
git clone https://github.com/kailmio/mission-deck-webmcp.git
cd mission-deck-webmcp
npm install
npm run dev
```

Run the release checks:

```bash
npm run test
npm run build
npm run preview
```

The production output is a static `dist/` directory. Pushes to `main` deploy that exact build through GitHub Pages.

## Architecture

- `src/domain/` contains pure deterministic card transformations and the shared preview-safe command service.
- `src/state/` contains the synchronous reducer store and versioned localStorage adapter.
- `src/webmcp/` is the isolated six-tool adapter; tool handlers call the same commands as manual controls.
- `src/components/` renders the shared board, preview, powers, dialog, and activity rail.
- `src/test/` proves deterministic powers, exact preview/commit semantics, recovery, persistence, undo, and recommendation progression.

There is no backend, login, analytics, or model API inside the app. Committed state persists locally; pending previews intentionally do not.

## Accessibility and resilience

Mission Deck supports semantic button controls, Enter/Space activation, Escape cancellation, a trapped and restoring dialog focus loop, visible focus, live status messages, a 360px layout without page-level horizontal overflow, and reduced-motion overrides. Unsupported WebMCP and unavailable storage both degrade without blocking the manual experience.

## AI use and inspiration

Codex was the primary coding agent for product shaping, implementation, testing, deployment, visual QA, and submission preparation. Hermes Agent provided an independent PRD review. Image generation produced original visual concept references; the shipped interface uses original HTML, CSS, and SVG assets.

The GPL-licensed [Card Master browser extension](https://github.com/LYiHub/Card-master-browser-extension-public) informed the visible-card interaction metaphor only. No source code or visual assets were copied. All runtime card outcomes in Mission Deck are deterministic local functions.

## License

[MIT](LICENSE)
