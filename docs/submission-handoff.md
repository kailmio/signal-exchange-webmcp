# Signal Exchange Submission Handoff

## One-line pitch

Signal Exchange lets agents find and negotiate access to machine-ready data while people retain the budget, approval, and undo controls.

## Problem and audience

Small operators increasingly delegate decisions to agents, but the data those agents need is scattered across marketplace pages with inconsistent freshness, formats, prices, and terms. Manual procurement is slow; autonomous purchase is risky. Signal Exchange turns one marketplace page into a typed, visible collaboration surface.

## What is new with WebMCP

The agent does more than summarize the page. It discovers seven native capabilities, searches the live inventory, compares offers against the person's visible constraint, negotiates a specific rental, and commits only the approved proposal. The person watches the same state change, sees which actions came from WebMCP, and can reverse the result.

## Judge proof points

- Real browser discovery exposes seven typed tools.
- `inspect_exchange` is genuinely read-only; search and compare truthfully create visible Activity.
- Preview returns a seller counteroffer and exact changes without spending credits.
- Commit accepts only the active revision-bound, expiring token after a person clicks approval for that exact token.
- A successful commit changes wallet 100 → 78 and unlocks the selected schema.
- Replay and stale tokens are rejected; undo restores wallet 100 and revokes access.
- Manual and agent paths share the same command service.
- The product clearly labels all commerce and access as a local simulation.

## Demo path

Inspect → search within 40 credits → compare → recommend MetroPulse → bid 20 for seven days → show 22-credit counteroffer → explicitly approve → commit → show unlocked schema and Activity → undo.

## Links

- Live app: https://kailmio.github.io/mission-deck-webmcp/
- Repository: https://github.com/kailmio/mission-deck-webmcp
- Walkthrough: https://kailmio.github.io/mission-deck-webmcp/video/signal-exchange-walkthrough.mp4

## Honest scope

The marketplace, sellers, credits, negotiation, and data access are deterministic local demo state. Real payments, identity, seller communication, and dataset delivery are intentionally outside the hackathon build.
