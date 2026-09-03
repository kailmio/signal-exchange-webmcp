# Mission Deck — How to Use It

**Format:** 1920×1080, 30fps, 67 seconds
**Audio:** Kokoro `af_nova` voiceover at 0.88 speed; no music so instructions remain primary
**VO direction:** conversational product guide, unhurried but confident, with clear emphasis on Preview, Approve, Agent Ready, and Undo
**Style basis:** `DESIGN.md`

## Global direction

This is a walkthrough, not a trailer. The real product must remain visible in every beat. A six-stop step rail, pointer beacon, target outline, state badge, and one-sentence instruction card form the recurring tutorial grammar. Camera motion is restrained: enter, point, hold, verify. The amber → cyan → violet → green progression mirrors the actual workflow, while preview and commit are always communicated with words as well as color.

Transitions use a consistent 0.35-second push/cover between related steps and a calmer 0.55-second crossfade into the final recovery beat. Every scene has a screenshot layer, an instructional layer, and foreground pointer/annotation motion. Do not animate content out before the root transition; the next composition covers it.

## Asset audit

| Asset | Type | Assign to beat | Role |
| --- | --- | --- | --- |
| `assets/01-board.png` | Product screenshot | 1, 2 | Full baseline board and manual controls |
| `assets/02-agent-tools.png` | Product/tool screenshot | 6 | Agent-ready state and six-tool trace |
| `assets/03-forge-preview.png` | Product state | 3 | Exact Forge preview and approval button |
| `assets/04-focus.png` | Product state | 4 | Committed action and selected Focus result |
| `assets/05-wild-preview.png` | Product state | 5 | Bounded Wild preview |
| `assets/06-history-undo.png` | Product state | 7 | Activity evidence, replay rejection, and undo |
| `capture/assets/svgs/logo-79afc8c4.svg` | Brand mark | 1, 7 | Opening and closing identity |
| Forge/Focus/Wild SVGs in `capture/assets/svgs/` | Product icons | 2, 4, 5 | Accent identity; referenced through captured/product imagery |

All six product screenshots are used. The product UI appears in the opening and closing. No two consecutive beats are text-only.

## Beat 1 — Orient the viewer (0.00–11.90s)

**VO:** “Here’s how to use Mission Deck. You start with a mission and three rough ideas. The orange outline marks the selected idea, and Forge is recommended because the board needs concrete actions first.”

**Concept:** The viewer lands directly on the working product, not a title card. A calm frame label says `HOW TO USE MISSION DECK`, then the tutorial rail establishes that this is a six-step loop. The eye travels from mission heading to three ideas to the power hand.

**Visual:** `assets/01-board.png` fills a browser-stage crop and slowly scales 1.00→1.025. A white pointer glides from the mission to the selected first idea. Amber target brackets draw around the outlined card and Forge. Instruction card: `START WITH THE BOARD` / `Mission → ideas → recommended power`.

**Motion techniques:** screenshot Ken Burns, SVG-style bracket drawing, pointer MotionPath, sequential label typing.
**Transition:** amber push-cover from right, 0.35s.
**Layers:** BG grid and amber bloom; MG screenshot; FG step rail, pointer, instruction card.

## Beat 2 — Select and play Forge (11.90–20.56s)

**VO:** “Choose an idea, then play Forge. Mission Deck does not change the board immediately.”

**Concept:** This beat teaches the literal first interaction. The cursor lands on the selected idea, then drops to Forge. A click pulse fires, but a large `PREVIEW FIRST` badge makes the safety boundary unmistakable.

**Visual:** Reuse `assets/01-board.png` with a tighter crop on the first idea and power hand. Target box one labels `1 — CHOOSE AN IDEA`; target box two labels `2 — PLAY FORGE`. The pointer performs two discrete moves and two click rings. Instruction card: `FORGE TURNS ONE IDEA INTO ACTIONS`.

**Motion techniques:** stepped pointer path, click-pulse rings, scale crop, numbered bracket draw.
**Transition:** amber push-cover from bottom, 0.35s.
**Layers:** BG faint giant `FORGE`; MG product crop; FG cursor, two target boxes, `PREVIEW FIRST` badge.

## Beat 3 — Review and approve (20.56–30.72s)

**VO:** “It opens an exact preview showing the actions Forge wants to add. Review them, then choose Approve Exact Preview—or cancel.”

**Concept:** The safety model becomes the hero. The current board and proposed board are visibly separated, with a lock between them. The pointer moves only after the viewer has time to read the proposed actions.

**Visual:** `assets/03-forge-preview.png` fills the stage. Amber lines trace current → preview → approval. A foreground badge reads `PREVIEW — NOTHING HAS CHANGED`. The pointer circles the proposed action list, then lands on `APPROVE EXACT PREVIEW`; a secondary `OR CANCEL` label appears without simulating a click.

**Motion techniques:** path drawing, cursor MotionPath, callout wipe, proof-badge stamp.
**Transition:** cyan push-cover from right, 0.35s.
**Layers:** BG amber-to-cyan local blooms; MG exact-preview screenshot; FG proof badge, pointer, approval callout.

## Beat 4 — Focus the next move (30.72–41.08s)

**VO:** “After approval, those actions become committed board state. Focus is now available. Play Focus to select one highest-leverage next move, review the preview, and approve it the same way.”

**Concept:** Complexity resolves to one next action. The four candidate actions sit in the background while the chosen action moves forward. The tutorial repeats the same preview-and-approve rhythm so the interaction becomes learnable.

**Visual:** `assets/04-focus.png` fills the stage with a subtle 3D perspective settle. The `1 NEXT` counter is targeted, then the selected action card receives a cyan scan. Instruction card: `FOCUS CHOOSES ONE NEXT MOVE`. Footer chips animate in: `PLAY → PREVIEW → APPROVE`.

**Motion techniques:** CSS 3D perspective, cyan scan line, counter emphasis, staggered footer chips.
**Transition:** violet diagonal cover, 0.35s.
**Layers:** BG cyan reticle; MG Focus screenshot; FG pointer, selected-card outline, repeatable workflow chips.

## Beat 5 — Try Wild safely (41.08–49.23s)

**VO:** “Wild adds one bounded surprise. It can reframe the mission or add a useful constraint, but it still stops at preview. You remain in control.”

**Concept:** Wild feels surprising without feeling reckless. Violet geometry opens around one deterministic result while two incompatible alternatives remain visibly locked. The human-control badge stays present for the full hold.

**Visual:** `assets/05-wild-preview.png` fills the frame and pans gently toward the preview panel. A violet pointer circle reveals `DESIGN FOR FIRST-TIME USERS`. Badge: `BOUNDED SURPRISE — PREVIEW ONLY`. Instruction card: `WILD SURPRISES WITHIN SAFE LIMITS`.

**Motion techniques:** diamond path drawing, selective camera pan, lock-chip cascade, proof-badge stamp.
**Transition:** green push-cover from left, 0.35s.
**Layers:** BG violet bloom; MG Wild screenshot; FG outcome highlight, safe-limit card, human-approval badge.

## Beat 6 — Let the agent recommend (49.23–57.42s)

**VO:** “An agent can use the same workflow through Web M C P. Ask it to inspect the board, recommend a card, and preview the result. The green Agent Ready status means the page has exposed its six tools.”

**Concept:** The viewer learns the alternative input method: natural language. The page is still the source of truth; the agent simply invokes the same visible workflow. A real prompt appears character by character beside the tool trace.

**Visual:** `assets/02-agent-tools.png` fills the stage. The tool trace lights inspect, list, and preview in sequence. A large prompt card types: `Inspect this board, recommend the best card, and preview it. Do not commit.` The green `AGENT READY` pill pulses once.

**Motion techniques:** character typing, tool-step cascade, connection path drawing, single status pulse.
**Transition:** gentle crossfade, 0.55s.
**Layers:** BG green signal lines; MG agent-tool screenshot; FG prompt card, tool highlights, status callout.

## Beat 7 — Verify, undo, remember the loop (57.42–67.00s)

**VO:** “Every preview, approval, rejection, and commit appears in Activity. If the last play was wrong, choose Undo and the previous board returns. That’s the complete loop: inspect, recommend, preview, approve, commit, and recover—on one shared web page.”

**Concept:** The tutorial closes with recovery, not hype. The activity record proves what happened; Undo proves the person can recover. The six-step rail resolves into one compact mnemonic.

**Visual:** `assets/06-history-undo.png` fills the stage. Activity events illuminate top-to-bottom, then the pointer lands on `UNDO`. A green `RESTORED` stamp lands beside the prior board. Final overlay: `INSPECT → RECOMMEND → PREVIEW → APPROVE → COMMIT → RECOVER` with Mission Deck mark.

**Motion techniques:** vertical path drawing, event cascade, cursor click pulse, word-by-word mnemonic reveal.
**Final resolve:** product dims slightly while the mnemonic and live URL hold for 2.5 seconds; no new content appears.
**Layers:** BG product evidence; MG activity spine; FG pointer, restored stamp, mnemonic.

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
├── capture/
├── assets/
├── compositions/
│   ├── beat-1-orient.html
│   ├── beat-2-forge.html
│   ├── beat-3-approve.html
│   ├── beat-4-focus.html
│   ├── beat-5-wild.html
│   ├── beat-6-agent.html
│   └── beat-7-undo.html
├── snapshots/
└── renders/
```
