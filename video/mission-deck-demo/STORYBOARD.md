# Mission Deck Storyboard

**Format:** 1920×1080 landscape, 30fps  
**Audio:** local Kokoro `af_nova` voiceover at 0.82× speed, starting at 3.00s; minimal low electronic underscore only if it does not compete with narration; restrained UI SFX  
**VO direction:** calm, confident, curious; product-builder register; let approval moments breathe  
**Style basis:** `DESIGN.md` exact palette, typography, components, and prohibitions

## Global guardrails

- Keep the captured interface present as proof in the opening and closing; never turn this into an abstract logo reel.
- Push one accent at a time in story order: amber Forge, cyan Focus, violet Wild, green agent/restore confirmation.
- Use deterministic SVG path drawing, 3D cards, tool-call typing, and precise motion. No random particles or generic AI imagery.
- Each beat has at least three depth layers and two focal points. Structural rules and localized glows keep the background alive.
- Product screenshots always move through a wrapper (slow push/pan); no naked static screenshot.
- Primary transition language: 0.4–0.55s blur-through/velocity push. Wild gets the single bold diamond-iris accent. Outro resolves with a gentle color dip.

## Asset audit

| Asset | Type | Assign to beat | Role |
| --- | --- | --- | --- |
| `capture/screenshots/scroll-000.png` | Product hero screenshot | 1, 6 | Full interface proof with slow camera push; opening and closing anchor. |
| `capture/screenshots/full-page.png` | Product screenshot | 2, 5 | Wide source-of-truth canvas behind tool traces and activity proof. |
| `capture/assets/svgs/logo-79afc8c4.svg` | Brand mark | 1, 6 | First/last signature with SVG line reveal. |
| `capture/assets/svgs/svg-01907dfa.svg` | Forge emblem | 2, 3 | Amber capability card and action transformation. |
| `capture/assets/svgs/svg-2415d5f6.svg` | Focus emblem | 4 | Cyan prioritization cue. |
| `capture/assets/svgs/svg-eb37e3cf.svg` | Wild emblem | 5 | Violet hero reveal and diamond transition. |
| `capture/assets/svgs/svg-98b55b18.svg` | Undo emblem | 6 | Restoration proof beside the final activity event. |
| Remaining captured SVGs | Small UI icons | Skip | Duplicates or supporting glyphs that do not improve legibility at video scale. |

All captured product screenshots are used, the brand mark opens and closes, and the power hand remains the signature visual.

## Beat 1 — The invisible-action problem (0.00–10.09s)

**VO:** “Agent actions are powerful. But on most websites, they disappear behind the chat.”

**Concept:** We begin inside the real product, not on a title card. The interface is visible but initially held behind a narrow black aperture, as if the browser is hiding what the agent does; the aperture opens and the full Mission Deck canvas becomes legible.

**Visual:** The captured ready board fills 78% of the frame in a slightly tilted device plane. A black vertical mask hides the center, then splits apart. The logo draws at top left, `AGENT ACTIONS` types at the lower edge, and a faint oversized `VISIBLE` outline sits behind the product. A green ready dot wakes only after the board is revealed.

**Mood:** Cinematic technical reveal; calm tension, not alarm.

**Assets:** `scroll-000.png` slow scale 1.02→1.06; `logo-79afc8c4.svg` line reveal.

**Techniques and choreography:** CSS 3D screenshot plane SETTLES from rotationY -6°; SVG logo DRAWS; kinetic words CASCADE with decaying x distance; mask rails SLIDE outward; green status dot PULSES twice on the seekable timeline.

**Transition:** Blur-through into Beat 2, 0.45s, `power3.inOut`; the complete screenshot remains visible at transition start.

**Depth:** BG oversized outline type + localized green glow; MG screenshot plane; FG aperture rails, logo, and typed label.

**SFX:** Soft low thump as the aperture opens; tiny connection chime on the green dot.

## Beat 2 — WebMCP discovery (10.09–16.60s)

**VO:** “Mission Deck makes every action visible. Through Web M C P, an agent reads the real board, discovers three powers, and recommends the one that fits the moment.”

**Concept:** The website becomes a transparent instrument panel. Tool calls travel from a compact agent trace into the exact board regions they read; the three powers rise from the page like discoverable capabilities, with Forge taking the lead.

**Visual:** Full-page capture drifts left beneath a dark glass crop. Five tool chips type on in the right third: inspect, list, preview, commit, undo. Three large card silhouettes occupy the lower half; their amber/cyan/violet edge lines draw in sequence. A connector path lands on Forge and stamps `RECOMMENDED`.

**Mood:** Precise, legible systems thinking—like a flight recorder made approachable.

**Assets:** `full-page.png` slow horizontal pan; `svg-01907dfa.svg`, `svg-2415d5f6.svg`, `svg-eb37e3cf.svg` in their semantic colors.

**Techniques and choreography:** Character typing BUILDS the tool trace; SVG connector DRAWS; card planes CASCADE in 3D with a 100ms stagger; accent rails FILL amber→cyan→violet; recommendation stamp SNAPS with a small rotation settle.

**Transition:** Velocity-matched upward push, 0.4s, `power2.inOut`.

**Depth:** BG cropped capture + faded tool schema text; MG power cards; FG connector, tool chips, and amber stamp.

**SFX:** Five muted key clicks; soft metallic tap when Forge is recommended.

## Beat 3 — Exact preview and approval (16.60–27.05s)

**VO:** “Forge turns one rough idea into concrete actions. Before anything changes, you see the exact proposal. The agent can’t swap it later. Only the preview you approve can be committed.”

**Concept:** The screen divides into “committed” and “proposed,” making the safety model instantly understandable. The proposal expands, but an amber lock line holds it outside the board until approval.

**Visual:** A compact idea card sits left. Four verb-led action rows unfold on the right inside a raised preview panel. A central amber boundary reads `NOTHING HAS CHANGED YET`. A token string types under the panel, then visually seals. `APPROVE EXACT PREVIEW` becomes the dominant control and receives a deliberate check pulse.

**Mood:** Trustworthy transaction review—clear enough for a non-developer, rigorous enough for an engineer.

**Assets:** `svg-01907dfa.svg` as the Forge seal; product card copy from the sample mission.

**Techniques and choreography:** SVG boundary DRAWS; action rows CASCADE at 90ms; token TYPES and locks; card uses a shallow 3D unfold; approval check traces with SVG path drawing. Use varied `expo.out`, `power2.out`, and `back.out(1.2)` entrances.

**Transition:** Smooth horizontal push, 0.45s, `power2.inOut`.

**Depth:** BG revision numerals + amber radial glow; MG committed/proposed panels; FG lock line, token, and approval stamp.

**SFX:** Four quiet paper ticks; single solid click on approval.

## Beat 4 — Focus the next move (27.05–29.35s)

**VO:** “Focus chooses the highest-leverage next move.”

**Concept:** After the detail of preview, the composition exhales. Four candidate action cards orbit subtly; one snaps into a cyan targeting reticle while the others recede.

**Visual:** Four action cards form an asymmetric arc. A cyan reticle draws around `Map the shared state`; its completion check expands beneath it. A small activity chip reads `WebMCP · Commit Focus` while a leverage scale resolves to `NEXT`.

**Mood:** Decisive and clean; one choice, not dashboard clutter.

**Assets:** `svg-2415d5f6.svg` enlarged behind the chosen card.

**Techniques and choreography:** CSS 3D cards ARRIVE from different directions; reticle SVG DRAWS in two arcs; selected card SNAPS forward while supporting cards dim via opacity; one numeric leverage marker COUNTS to 1. No ambient zoom—use a slow cyan arc rotation.

**Transition:** Diamond iris keyed to the Focus emblem, 0.5s, revealing violet Beat 5.

**Depth:** BG cyan target grid; MG action-card arc; FG reticle, completion check, activity chip.

**SFX:** Light scan tone rising to a crisp target lock.

## Beat 5 — Bounded Wild reveal (29.35–34.67s)

**VO:** “Then there’s Wild. It delivers a bounded surprise—memorable, but still compatible with the board. Even the surprise stops for approval.”

**Concept:** This is the payoff. The Wild diamond opens like a faceted portal, but instead of chaos it reveals one legible violet preview with a compatibility badge and a human approval boundary.

**Visual:** The Wild emblem grows from the iris center. Three potential outcome labels orbit briefly—Reverse the assumption, Add a constraint, Shift the audience—then two lock away and the deterministic first result lands: `DESIGN FOR FIRST-TIME USERS`. The exact preview panel occupies the right half with `PREVIEW ONLY`; the underlying product screenshot remains visible and unchanged.

**Mood:** Surprising, premium, and controlled. The most theatrical beat without becoming magical-AI cliché.

**Assets:** `svg-eb37e3cf.svg` hero emblem; `full-page.png` as unchanged-board proof.

**Techniques and choreography:** CSS 3D diamond ROTATES 22° and SETTLES; orbital labels move on an SVG path; violet facets DRAW; result text uses per-word kinetic type; screenshot wrapper slowly pans; preview border glows once on approval readiness.

**Transition:** Blur crossfade back to the full product, 0.55s, `sine.inOut`.

**Depth:** BG product screenshot + localized violet bloom; MG giant diamond and preview; FG bounded-result chips and `PREVIEW ONLY` stamp.

**SFX:** Restrained faceted shimmer; two soft lock ticks; warm low chime when the bounded outcome lands.

## Beat 6 — Shared history, undo, thesis (34.67–60.50s)

**VO:** “Every Web M C P preview and commit appears in the shared activity rail. Refresh keeps committed work. Replayed or stale actions are rejected. And Undo restores the prior board in one move. No hidden automation. No mystery state. Just a person and an agent, acting on the same web page—with the human visibly in control.”

**Concept:** We return to the real board with evidence accumulated on the activity spine. Undo travels backward through the last violet event, restoring the prior copy; the interface then settles into the same ready composition where we began.

**Visual:** The captured board fills the frame in a clean device plane. Activity events type down the right: Preview Wild, Commit Wild, Replay rejected, Undo latest card play. A coral rejection chip appears briefly without replacing the board. The undo arrow traces backward and the violet changed copy flips to its prior version. Final lockup: Mission Deck mark, `VISIBLE AGENT ACTIONS. HUMAN CONTROL.`, live URL.

**Mood:** Evidence, recovery, confidence. End with earned calm.

**Assets:** `scroll-000.png` slow pan to activity rail; `logo-79afc8c4.svg`; `svg-98b55b18.svg` undo emblem.

**Techniques and choreography:** Tool trace TYPES; activity spine SVG DRAWS downward; rejection stamp PUNCHES once; undo path DRAWS backward; product plane eases from 1.05→1.0; final thesis words CASCADE with extreme weight contrast. Final elements may fade to the canvas over the last 0.8s.

**Transition:** Gentle color dip to `#070C10`, 0.8s, `power1.inOut`.

**Depth:** BG product screenshot + faint URL; MG activity spine and restored card; FG undo arrow, thesis, brand mark.

**SFX:** Subtle timeline ticks, short muted error knock, clean rewind sweep, resolved low chord.

## Production architecture

```text
video/mission-deck-demo/
├── index.html
├── DESIGN.md
├── SCRIPT.md
├── STORYBOARD.md
├── narration.txt
├── narration.wav
├── transcript.json
├── capture/
│   ├── screenshots/
│   ├── assets/
│   └── extracted/
├── compositions/
│   ├── beat-1-hook.html
│   ├── beat-2-discovery.html
│   ├── beat-3-preview.html
│   ├── beat-4-focus.html
│   ├── beat-5-wild.html
│   └── beat-6-undo.html
├── snapshots/
└── renders/
```
