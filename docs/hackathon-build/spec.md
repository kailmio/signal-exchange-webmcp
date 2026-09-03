# Signal Exchange Technical Specification

## Architecture

React renders a single external store. Pure marketplace functions search, rank, and calculate a proposed exchange snapshot. `CommandService` is the only mutation boundary. Both manual controls and WebMCP registrations call this service, so agent and person paths cannot drift.

## State model

`ExchangeContent` contains buyer brief, wallet, offers, and active access. `CommittedExchange` adds a monotonic revision. Pending deals store the proposed snapshot separately with origin, base revision, one-time token, and five-minute expiry. UI-only state holds visible offers, recommendation, Activity, connection status, and notices.

## Tool surface

Seven tools are registered through `document.modelContext.registerTool`: `inspect_exchange`, `search_data_offers`, `compare_data_offers`, `preview_data_deal`, `commit_data_deal`, `undo_last_deal`, and `load_demo_exchange`. Inputs use closed JSON schemas with bounds and no additional properties. Results provide readable JSON plus structured content.

`inspect_exchange` alone declares `readOnlyHint: true`. Search and comparison intentionally update visible state and Activity. Preview creates visible pending state but does not mutate committed exchange content. Commit applies only the exact active preview after token, revision, expiry, budget, wallet, and replay checks.

## Deterministic market logic

Search tokenizes the need and filters by the optional credit ceiling. Comparison scores trust, freshness, affordability, and format coverage. Negotiation caps at list price and counters bids below the seller minimum. The demo always resolves a 20-credit MetroPulse bid to 22 credits.

## Persistence

Committed exchange state and safe UI history use the versioned `signal-exchange:v1` local key. Pending approvals, committing state, notices, and connection state are not restored. Malformed or incompatible data falls back to the sample exchange.

## Presentation

Desktop uses a marketplace/sidebar split at 1280×800. Mobile becomes one vertical document with compact offer rows and the complete deal panel below. `prefers-reduced-motion` disables transitions and animated accents.

## Verification

Vitest covers deterministic sample data, search, ranking, negotiation, validation, read-only inspection, preview/commit separation, stale/mismatch/expiry/replay handling, parity, undo, persistence, and seven tool registrations. Browser QA covers discovered WebMCP tools, the live transaction, undo, console health, desktop, and 360px rendering.
