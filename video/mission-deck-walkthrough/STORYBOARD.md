# Mission Deck — How to Use It

**Format:** 1920×1080, 30fps, approximately 59 seconds
**Audio:** Kokoro `af_nova` voiceover at 0.88 speed; no music
**Style basis:** `DESIGN.md`

## Global direction

This is a walkthrough, not a trailer. The real two-power product remains visible in every beat. A six-stop step rail, pointer beacon, target outline, state badge, and one-sentence instruction card form the recurring tutorial grammar. The color progression is Forge amber → Focus cyan → Agent Ready green. Preview and commit are always communicated with words as well as color.

Transitions use a consistent 0.35-second push/cover between related steps and a calmer transition into recovery. Every scene has a screenshot layer, an instructional layer, and foreground pointer/annotation motion.

## Asset audit

| Asset | Beats | Role |
| --- | --- | --- |
| `assets/01-board.png` | 1, 2 | Live two-power baseline and manual controls |
| `assets/02-agent-tools.png` | 5 | Agent-ready state and six-tool trace |
| `assets/03-forge-preview.png` | 3 | Exact Forge preview and approval button |
| `assets/04-focus.png` | 4 | Committed action and selected Focus result |
| `assets/06-history-undo.png` | 6 | Activity evidence and Undo |
| `assets/mark.svg` | 1, 6 | Mission Deck identity |

## Beat 1 — Orient (0.00–12.70s)

Show the mission, three rough ideas, selected orange outline, and the two-card hand. Target Forge as the first recommendation. Establish the six-step rail: Orient, Forge, Approve, Focus, Agent, Recover.

## Beat 2 — Select and play Forge (12.70–19.55s)

Move the pointer from the selected idea to the enlarged Forge card. A `PREVIEW FIRST` badge makes the safety boundary explicit. No board content changes yet.

## Beat 3 — Review and approve (19.55–32.28s)

Use the exact Forge preview screenshot. Trace current → preview → approval, hold on `Nothing has changed yet`, then land the pointer on Approve while keeping Cancel visible.

## Beat 4 — Focus the next move (32.28–39.90s)

Show the committed Forge actions and the single focused action. Target the `1 NEXT` result and repeat the learnable workflow: Play → Preview → Approve.

## Beat 5 — Let the agent recommend (39.90–48.20s)

Show the two-card board with Agent Ready. Type the prompt `Inspect this board, recommend Forge or Focus, and preview it. Do not commit.` Illuminate inspect, list, and preview in the visible tool trace.

## Beat 6 — Verify, undo, remember (48.20–58.85s)

Illuminate Activity events, point to Undo, and show the prior board returning. Resolve into the mnemonic `INSPECT → RECOMMEND → PREVIEW → APPROVE → COMMIT → RECOVER` and hold the public URL.

## Production architecture

```text
mission-deck-walkthrough/
├── index.html
├── DESIGN.md
├── SCRIPT.md
├── STORYBOARD.md
├── narration.txt
├── narration.wav
├── transcript.json
├── assets/
├── compositions/
│   ├── beat-1-orient.html
│   ├── beat-2-forge.html
│   ├── beat-3-approve.html
│   ├── beat-4-focus.html
│   ├── beat-6-agent.html
│   └── beat-7-undo.html
├── snapshots/
└── renders/
```
