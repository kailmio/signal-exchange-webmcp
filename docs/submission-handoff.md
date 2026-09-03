# Submission Handoff

## Links

- Live app: https://kailmio.github.io/mission-deck-webmcp/
- Public repository: https://github.com/kailmio/mission-deck-webmcp
- Demo script: `docs/demo-script.md`
- Visual proof: `docs/design/mission-deck-implementation-1280x800.png`
- Rendered demo: `video/mission-deck-demo/renders/mission-deck-demo.mp4`
- Editable video project: `video/mission-deck-demo/`

## One-line pitch

Mission Deck turns invisible agent actions into visible WebMCP power cards that people can inspect, preview, approve, and undo on a shared planning board.

## Story bullets

- **Problem:** agent actions are often hidden behind chat and difficult for ordinary people to understand or trust.
- **Insight:** familiar card mechanics give each capability a name, constraint, preview, and consequence.
- **Experience:** Forge makes ideas actionable, Focus chooses the highest-leverage move, and Wild reveals a bounded surprise.
- **WebMCP leverage:** the agent reads real page state and uses six page-defined tools across a multi-step workflow instead of scraping pixels or receiving pasted context.
- **Human control:** every mutation is an exact visible preview; stale/replayed commits fail; undo restores the prior board.
- **Execution:** static, deterministic, responsive, accessible, and usable manually when WebMCP is unavailable.

## Technical proof

- 11 automated domain/persistence/command tests.
- Strict TypeScript and Vite production build.
- Six tools discovered and invoked in the in-app browser on local and public HTTPS builds.
- Full manual Forge → Focus → Wild → undo path.
- Persistence restores committed content and discards previews.
- 1280×800 desktop without page scroll; 360px without page-level horizontal overflow.
- Keyboard Enter/Space, Escape cancellation, dialog focus trap/restore, and reduced-motion emulation verified.
- Narrated 1920×1080 demo rendered to H.264/AAC at 30fps; the 60.5-second artifact passed a complete decode check.

## AI-use disclosure

Codex served as the primary coding agent for product shaping, implementation, testing, deployment, visual QA, and submission preparation. Hermes Agent independently reviewed the PRD. Image generation created original concept art used as a design reference. The shipped app contains original code and assets, calls no model API, and computes all power outcomes locally and deterministically.

## Remaining submission work

1. Upload the rendered demo and verify public playback.
2. Run `$prepare-submission` to draft the Devpost fields from this handoff.
3. Paste the verified app, repository, and video links; complete the required declarations; submit before 5:00 AM Australia/Sydney on 2026-09-04.
