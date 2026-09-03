# Signal Exchange Walkthrough Storyboard

**Format:** 1920×1080, landscape
**Audio:** Kokoro voiceover; no music required, restrained synthetic UI SFX optional
**VO direction:** calm, assured product-demo delivery; crisp on numbers; leave air around the approval moment
**Style basis:** `DESIGN.md`; exact Signal Exchange palette and product capture

## Global guardrails

- Start in the product immediately; no logo-only intro.
- Use the real 1920×1080 capture in beats 1–3 and the captured compass logo in beats 1 and 4.
- Make the page legible through crops, masks, and 3D device framing; never use an iframe.
- Every scene has a background grid/glow, product/content layer, and foreground callout layer.
- Primary transition: directional push with brief blur. Accent transition into the approval climax: brass shutter.
- The product is a local simulation; never imply real money or real data delivery.

## Asset audit

| Asset | Type | Beat | Role |
| --- | --- | --- | --- |
| `capture/screenshots/scroll-000.png` | Product screenshot | 1, 2, 3 | Full market, search/compare crop, approval context |
| `capture/assets/svgs/logo-2685cc99.svg` | Brand mark | 1, 4 | Opening corner mark and closing lockup |
| Captured cyan/brass SVG icons | Interface icons | 2, 3 | Tool/data accents where useful |

## Beat 1 — The missing interface (0–13s)

**VO:** “Your agent can research the web… consent built into the page.”

**Concept:** We begin already inside a real marketplace, but a crisp question interrupts the screen: research is not procurement. The full Signal Exchange interface resolves behind it, establishing that this is an operating product rather than a pitch deck.

**Visual:** Canvas grid and localized cyan glow. The real product screenshot fills a brass device frame at a slight perspective angle. The first question assembles word by word at left; a thin cyan path draws from “agent” to the market. The compass mark stamps into the top corner. A three-item human ledger—GOAL, 40 CREDIT LIMIT, APPROVAL—cascades at lower left.

**Techniques:** per-word kinetic typography; SVG path drawing; CSS 3D screenshot frame.

**Motion:** question words punch in with decaying horizontal distance; screenshot glides from right and slowly pushes 1→1.025; path draws toward the sidebar; ledger rows cascade with varied duration.

**Transition:** directional push left with 12px blur, 0.4s, revealing beat 2.

**Depth:** BG grid/glow; MG screenshot; FG question, path, ledger, compass.

## Beat 2 — Search and compare (13–29s)

**VO:** “Here, a retailer needs… MetroPulse is the strongest fit.”

**Concept:** The agent's invisible reasoning becomes a visible market operation. A tool rail types each WebMCP capability while the real offer table is magnified and MetroPulse earns the recommendation rather than simply appearing selected.

**Visual:** The screenshot crop favors the three offer rows. At left, `inspect_exchange`, `search_data_offers`, and `compare_data_offers` type onto a cyan terminal rail with checkmarks. Trust, freshness, formats, and price labels travel along a connector line into a brass recommendation frame around MetroPulse. “98 TRUST · 2 HOURS · 24 CREDITS” counts into place.

**Techniques:** character typing; SVG connector drawing; tabular counter animation; perspective pan.

**Motion:** tools type sequentially; offer crop pans upward; metrics count and snap to columns; recommendation border draws last.

**Transition:** brass shutter closes around the recommendation and opens on the deal preview, 0.45s.

**Depth:** BG enlarged market crop; MG tool rail and recommendation frame; FG metric chips and moving signal dot.

## Beat 3 — Preview, approve, commit (29–52s)

**VO:** “The agent bids twenty… Every step is attributed in Activity.”

**Concept:** This is the payoff. The bid and counteroffer sit on opposite sides of a negotiation line, then freeze at a bright human approval gate. Only after the approval seal lands do wallet and schema change together.

**Visual:** A reconstructed approval desk matches the app. Left: BID 20. Right: SELLER COUNTER 22. Center: a pulse travels once. Below, the exact change ledger reads wallet 100→78, access locked→seven days, delivery metadata→JSON/CSV/Parquet. The approval button is visibly locked until a brass HUMAN APPROVES seal stamps down. Then wallet digits roll to 78, schema fields cascade in cyan, and Activity logs `WebMCP · Rental unlocked`.

**Techniques:** SVG negotiation path; number counter; staggered schema reveal; CSS 3D approval seal.

**Motion:** 20 arrives from left; 22 counters from right; change rows reveal one by one; approval seal drops with weight; wallet rolls and schema types only afterward; screenshot remains as a softly moving contextual plane.

**Transition:** gentle blur crossfade, 0.6s, into restored state.

**Depth:** BG product screenshot at 55% opacity; MG approval desk; FG seal, wallet, schema, Activity callout.

## Beat 4 — Reversible agency (52–65s)

**VO:** “Undo restores… intent, limits, and consent.”

**Concept:** The transaction rewinds cleanly, then the product thesis resolves as three aligned roles. The close feels confident and useful, not futuristic.

**Visual:** A horizontal state strip shows 78 credits/access granted reversing to 100 credits/access locked. Three large words enter in order: AGENTS OPERATE, PEOPLE DECIDE, WEBMCP CONNECTS. The compass mark and Signal Exchange lockup settle at the lower right; a final brass line binds the statements.

**Techniques:** reversible counter; per-word typography; SVG line draw.

**Motion:** state chips slide backward along the line; 100 lands with a green check; thesis phrases enter from different axes; compass rotates a restrained 20 degrees and settles. Final scene may fade to canvas in the last 0.7s.

**Transition:** final color dip to `#040A10`.

**Depth:** BG grid and oversized faint “SIGNAL”; MG state strip and thesis; FG compass and closing rule.

## Production architecture

```text
signal-exchange-walkthrough/
├── index.html
├── DESIGN.md
├── SCRIPT.md
├── STORYBOARD.md
├── narration.txt
├── narration.wav
├── transcript.json
├── capture/
└── compositions/
    ├── beat-1-interface.html
    ├── beat-2-compare.html
    ├── beat-3-approval.html
    └── beat-4-thesis.html
```
