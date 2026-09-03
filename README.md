# Mission Deck

Mission Deck is a self-contained WebMCP planning game where agent actions become visible, previewable, and reversible power cards. The experience has exactly two powers: **Forge** turns one idea into executable actions, and **Focus** selects the highest-leverage next move.

**Live app:** https://kailmio.github.io/mission-deck-webmcp/

## Judge-ready demo

Open the app in a WebMCP-capable browser, then ask the agent:

1. `Inspect this mission board and recommend the best power. Do not change anything yet.`
2. `Preview Forge on “Make actions tangible.” Stop for my approval.`
3. `Commit that exact preview.`
4. `Recommend the next power, preview Focus, and stop for approval.`
5. `Commit Focus, then undo the last play.`

The dramatic moment is not randomness: it is the handoff from an agent-authored proposal to a visible human decision. The board shows every recommendation, preview, commit, and undo in the Activity rail. Browsers without WebMCP honestly report **Manual demo mode** and keep the same card loop playable.

The primary demo is a narrated 59-second [guided walkthrough](https://github.com/kailmio/mission-deck-webmcp/releases/download/v0.2.0/mission-deck-walkthrough.mp4). Its editable HyperFrames project lives in `video/mission-deck-walkthrough/`.

## WebMCP tools

| Tool | Input | Purpose |
| --- | --- | --- |
| `inspect_mission_board` | `{}` | Reads committed board state, preview status, and recent activity. |
| `list_card_powers` | `{}` | Returns Forge and Focus availability plus a contextual recommendation. |
| `preview_card_play` | `{ power, targetCardId? }` | Displays an exact, non-mutating Forge or Focus proposal. |
| `commit_card_play` | `{ previewToken }` | Applies only the stored active preview once. |
| `undo_last_play` | `{}` | Restores the board before the latest committed card play. |
| `load_demo_mission` | `{ confirmReplace }` | Loads the deterministic sample and clears preview/undo. |

Preview tokens are bound to a board revision, expire, and are consumed once. Stale, expired, replayed, or mismatched commits fail without changing the board.

## Local development

```bash
npm install
npm run dev
npm test
npm run build
```

The production output is the static `dist/` directory. The app has no backend, login, analytics, or model API. Committed state persists locally; pending previews intentionally do not.

## Architecture and resilience

- `src/domain/` contains the two pure power transformations and shared preview-safe command service.
- `src/state/` contains the synchronous store and versioned persistence adapter.
- `src/webmcp/` registers six page tools that call the same commands as manual controls.
- `src/test/` proves exact preview/commit semantics, parity, persistence, undo, and recommendation progression.
- Semantic controls, visible focus, Escape cancellation, live status, reduced-motion support, and the 360px layout preserve access to the complete experience.

Codex was the primary coding agent. Hermes Agent provided an independent product review. Image generation produced original visual concept references; the shipped interface uses original HTML, CSS, and SVG assets.

## License

[MIT](LICENSE)
