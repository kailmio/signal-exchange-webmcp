# Submission handoff

Mission Deck is a polished arcane planning game built around exactly two powers: Forge makes ideas executable and Focus chooses the next move. Six WebMCP tools let an agent inspect, recommend, preview, commit, undo, and reset against the same visible state used by manual controls.

The judged proof is the approval boundary: agent-authored changes appear as an exact on-page preview, nothing mutates until approval, and Activity plus Undo keep the person in control.

## Current evidence

- `npm test`: 10 tests pass.
- `npm run build`: strict TypeScript and Vite production build pass.
- Live local WebMCP discovery exposes six tools; the power enum contains only `forge` and `focus`.
- Verified agent loop: inspect → recommend Forge → preview/commit Forge → recommend Focus → preview/commit Focus → undo.
- Visual QA completed at 1280×800 and 360×800.
- Canonical images live in `docs/design/`.

The public GitHub Pages link still points at the earlier release until this revision is explicitly deployed. Existing video renders also describe the earlier mechanic and must be recut before submission.
