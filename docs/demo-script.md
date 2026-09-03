# Mission Deck Demo Script

The rendered submission walkthrough now lives in `video/mission-deck-walkthrough/`. Its final narration, timing, and frame plan are in that folder's `SCRIPT.md` and `STORYBOARD.md`. The timed take below remains the live-demo rehearsal script for a judge or presenter who wants to operate the deployed app in real time.

Target runtime: 58–66 seconds. Record the deployed app at 1280×800 in ChatGPT's WebMCP-capable in-app browser. Use a fresh sample baseline and keep the full board, activity rail, and agent conversation visible when tool calls occur.

## Timed take

| Time | On screen | Voiceover |
| --- | --- | --- |
| 0–8s | Open the live sample. Hold on `Agent ready`, the mission, and the two powers. | “Agent actions on the web are powerful—but usually invisible. Mission Deck turns them into cards we can inspect, preview, approve, and undo.” |
| 8–20s | Prompt: `Inspect this board and recommend the best card. Do not change anything.` Agent calls inspect and list; Forge remains highlighted. | “Through WebMCP, the agent reads the actual board and discovers the powers available right now. It recommends Forge because our ideas are still abstract.” |
| 20–36s | Prompt: `Preview Forge on Make actions tangible. Stop for approval.` Show the amber preview and `Nothing has changed yet`; then say/type `Approve that exact preview.` | “Forge proposes concrete actions, but the board has not changed. The preview is a stored proposal—not a promise made in chat. I approve that exact version.” |
| 36–52s | Forge commits; activity names WebMCP. Prompt: `Preview and commit the recommended next card.` Focus preview and commit. | “The same shared command applies it, and the page records that WebMCP made the play. Focus selects the highest-leverage move.” |
| 52–61s | Prompt: `Undo the last play.` Show restoration and the Undo activity. | “One tool call restores the prior board. Human control is part of the interaction model, not an afterthought.” |
| 61–66s | Hold on the restored board, Forge, Focus, and the activity rail. | “Mission Deck: a new, legible way for people and agents to act on the same web page.” |

## Exact prompt card

Paste these one at a time if narration and typing are recorded separately:

1. `Inspect this board and recommend the best card. Do not change anything.`
2. `Preview Forge on “Make actions tangible.” Stop for my approval.`
3. `Approve and commit that exact preview.`
4. `Preview and commit the recommended next card.`
5. `Undo the last play.`

## Capture checklist

- Turn off notifications and close unrelated tabs/windows.
- Use the public HTTPS URL and confirm `Agent ready` before recording.
- Reset the sample; confirm Undo is disabled and no preview is open.
- Keep the activity rail readable and do not crop the preview approval controls.
- Record one uninterrupted insurance take before experimenting with edits.
- Check voice level, cursor visibility, text legibility, and the exported video's first and last frames.
- Play the uploaded public video from a logged-out/private window before pasting it into Devpost.

## Screenshot shortlist

1. Ready board at 1280×800: `docs/design/mission-deck-implementation-1280x800.png`.
2. Forge preview with `Nothing has changed yet`, the exact amber proposal, and WebMCP activity.
3. Focused action with attributed activity.
4. Undo-restored board proving reversibility.

## Claims to keep visible

- Six page-defined WebMCP tools are discoverable on the deployed URL.
- Manual and agent plays share one command layer.
- Preview does not mutate committed state.
- Commit applies only the stored preview token once.
- Only the visible Forge and Focus powers are accepted.
- One-level undo restores the previous committed board.
