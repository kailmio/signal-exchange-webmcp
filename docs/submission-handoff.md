# Submission handoff

Mission Deck is a polished arcane planning game built around exactly two powers: Forge makes ideas executable and Focus chooses the next move. Six WebMCP tools let an agent inspect, recommend, preview, commit, undo, and reset against the same visible state used by manual controls.

The judged proof is the approval boundary: agent-authored changes appear as an exact on-page preview, nothing mutates until approval, and Activity plus Undo keep the person in control.

## Current evidence

- `npm test`: 13 tests pass, including WebMCP registration, annotation, structured-result, cleanup, and fallback coverage.
- `npm run build`: strict TypeScript and Vite production build pass.
- Live local WebMCP discovery exposes six tools; the power enum contains only `forge` and `focus`.
- Inspect is side-effect-free and truthfully read-only; recommendation visibly updates the board and is intentionally not annotated read-only.
- Verified agent loop: inspect → recommend Forge → preview/commit Forge → recommend Focus → preview/commit Focus → undo.
- Visual QA completed at 1280×800 and 360×800.
- Canonical images live in `docs/design/`.
- Guided walkthrough: https://github.com/kailmio/mission-deck-webmcp/releases/download/v0.2.0/mission-deck-walkthrough.mp4
- Release page: https://github.com/kailmio/mission-deck-webmcp/releases/tag/v0.2.0

The current release is designed to deploy through the repository's GitHub Pages workflow. The recut video contains only Forge and Focus and matches the arcane two-power interface.
