# Signal Exchange

Signal Exchange is a self-contained WebMCP marketplace where people set the goal, budget, and approval boundary while agents find and negotiate access to machine-ready data.

The judge-ready scenario is concrete: a small retailer needs fresh Sydney foot-traffic data to choose a weekend pop-up location. Instead of manually opening listings, translating metadata, and comparing incompatible terms, the agent can inspect the live marketplace, search within a 40-credit budget, compare trust and freshness, negotiate a seven-day rental, and present one exact deal for approval. Nothing is purchased until the person approves the visible preview.

## 65-second demo

Watch the [guided Signal Exchange walkthrough](https://kailmio.github.io/mission-deck-webmcp/video/signal-exchange-walkthrough.mp4), or run the live agent flow below.

Open the [live app](https://kailmio.github.io/mission-deck-webmcp/) in a WebMCP-capable browser and ask:

1. `Inspect this exchange and find data for my visible goal within budget.`
2. `Compare the matching offers and explain your recommendation.`
3. `Bid 20 credits for seven days on the recommended offer. Preview only—do not commit.`
4. Click `Approve exact deal · 22`, then ask: `Commit the approved deal.`
5. `Undo that simulated rental.`

Watch the same page change after each tool call: filtered offers, the recommendation badge, an attributed Activity entry, an exact counteroffer, wallet/access changes, and reversal.

## Why WebMCP

A normal marketplace page is legible to a person but opaque to an agent: the agent must infer controls from pixels or bespoke APIs, and its work is often invisible. Signal Exchange registers the page's actual capabilities as typed tools while keeping one shared UI and state model.

| Tool | What the agent can do | Visible effect |
| --- | --- | --- |
| `inspect_exchange` | Read the goal, budget, offers, wallet, and state | None; genuinely read-only |
| `search_data_offers` | Search listings by need and credit ceiling | Filters the visible market and logs the call |
| `compare_data_offers` | Rank trust, freshness, formats, and price | Marks the recommendation and explains why |
| `preview_data_deal` | Bid and receive an exact accepted price or counteroffer | Opens a non-mutating deal preview |
| `commit_data_deal` | Apply only the approved preview token | Deducts credits and unlocks schema access |
| `undo_last_deal` | Reverse the latest simulated rental | Restores credits and revokes access |
| `load_demo_exchange` | Restore the deterministic judging scenario | Resets transaction state with confirmation |

The implementation is non-trivial: all seven tools call the same typed command layer as manual controls; search and ranking are deterministic; preview and commit are separate; commits use one-time, revision-bound, expiring tokens; replay, stale-token, wallet, budget, duration, and confirmation errors are explicit; and every state-changing agent action is visible and attributed.

## Human control and demo honesty

- Search and comparison may change presentation, but never spend credits.
- Preview calculates the exact wallet, access, and delivery change without mutating committed state.
- Commit requires the token from the currently visible preview and a human click bound to that exact token.
- Undo restores the prior snapshot in one action.
- Credits, sellers, negotiations, and access are simulated locally. There is no payment processor, account system, or real dataset transfer.
- Local persistence keeps committed demo state; pending approvals are deliberately not restored.

## Local development

```bash
npm install
npm test
npm run dev
```

Production verification:

```bash
npm run build
```

The GitHub Pages workflow runs tests, the production build, and the validated HyperFrames video render before deployment.

## Project map

- `src/webmcp/registerTools.ts` — seven browser-native tool registrations
- `src/domain/commands.ts` — shared safety and transaction boundary
- `src/domain/marketplace.ts` — search, comparison, negotiation, and proposal logic
- `src/state/reducer.ts` — committed state, pending preview, activity, and undo
- `src/test` — marketplace, command safety, persistence, and WebMCP coverage
- `docs/demo-script.md` — narrated walkthrough and exact agent prompts
- `video/signal-exchange-walkthrough` — editable 65-second HyperFrames walkthrough
- `docs/hackathon-build` — scope, PRD, specification, checklist, and evidence

## Accessibility and responsive behavior

The app uses semantic buttons, visible keyboard focus, live status announcements, restrained motion with reduced-motion support, readable contrast, and a complete 360px mobile layout. WebMCP absence is shown honestly as `Manual demo mode`; the same core flow remains usable through page controls.
