# Signal Exchange Product Requirements

## Product promise

Tell an agent what decision you need to make. Let it find and negotiate the right data. Approve the exact deal before anything changes.

## Audience

Solo operators, small retailers, researchers, and agent users who need current, structured data but lack the time or expertise to compare marketplace listings and license terms manually.

## Core journey

1. The page shows a buyer goal, budget, rental duration, wallet, and three machine-ready offers.
2. An agent inspects without mutation and searches within the visible constraint.
3. The agent compares trust, freshness, price, formats, and fit, then visibly recommends one offer.
4. The agent submits a bid. The seller simulation accepts or counters deterministically.
5. The UI presents the exact price and wallet/access/delivery changes. No credits move.
6. Only after explicit approval may the agent commit the currently visible token.
7. The wallet and access update, schema fields unlock, and Activity records attribution.
8. Undo restores the prior wallet and access state.

## Functional requirements

- The source of truth is one typed store used by the page and all tools.
- Inspection is side-effect-free; all other tool effects are truthfully described.
- Search accepts a query and optional credit ceiling.
- Comparison defaults to currently visible offers and returns a reason.
- Preview validates listing, bid, duration, buyer budget, wallet, and existing access.
- Commit rejects missing, mismatched, stale, expired, or replayed preview tokens.
- Reset requires explicit confirmation when it would replace changed state.
- WebMCP-unavailable browsers retain a manual fallback and label it honestly.

## Experience requirements

- The decision, offers, recommendation, approval boundary, and activity are visible in one screen at 1280×800.
- The design feels like a premium signal terminal: midnight surfaces, brass dividers, cyan machine-readable accents, precise typography, and restrained motion.
- At 360px, no content or actions require horizontal page scrolling.
- Controls have semantic labels, keyboard focus, and readable status feedback.

## Acceptance scenario

Starting from 100 credits, a 20-credit bid on MetroPulse produces a non-mutating 22-credit counteroffer. An approved commit advances the revision, leaves 78 credits, and exposes four schema fields. Undo restores 100 credits and removes access.

## Honest limitations

This is a deterministic, local proof of interaction design. It does not execute payments, validate third-party data, contact sellers, or transfer a real dataset.
