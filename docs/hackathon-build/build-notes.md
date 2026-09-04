# Signal Exchange Build Notes

## Locked pivot

The project pivoted from an abstract planning-card metaphor to a specific marketplace problem: small operators need current, structured data for real decisions, while agents need typed page capabilities and people need a visible consent boundary.

The judge scenario is deliberately narrow and deterministic: choose a Sydney weekend pop-up location using three foot-traffic offers, a 40-credit budget, a seven-day rental, and a 100-credit wallet.

## Implementation evidence

- Replaced the earlier planning domain with typed offers, buyer brief, wallet, active access, recommendation, pending deal, and Activity state.
- Added deterministic search, comparison, negotiation, and exact proposed snapshots.
- Registered seven WebMCP tools against the same command service used by manual controls.
- Limited read-only annotation to inspection; agent-driven search and comparison visibly update the page.
- Separated preview from commit. Commits require the active one-time token and matching base revision before expiry.
- Added clear errors for missing offers, invalid bid/duration, approved budget, wallet, existing access, missing/mismatched/stale/expired/replayed previews, undo, and reset confirmation.
- Persisted only safe committed state; pending approval is never restored.
- Produced and implemented an original Signal Exchange visual concept.
- Applied the independent review: commit now requires a page-level human approval bound to the exact preview token; the initial screen no longer pre-claims an agent recommendation; rental duration is fixed at the advertised seven days; and provenance language is explicitly seller-provided demo metadata.

## Verified scenario

Starting wallet 100 → search three matching offers → recommend MetroPulse at 98 trust and two-hour freshness → bid 20 → seller counters at 22 → preview shows wallet 78 but committed state remains 100 → commit unlocks `zone_id`, `observed_at`, `footfall`, and `confidence` → undo returns wallet to 100 and removes access.

## Earlier buyer-only release evidence

- Final app verification: 15 Vitest checks pass across four files and the strict TypeScript/Vite production build passes.
- Browser verification at 1280×800 and 360×800 confirms the complete interface with no horizontal overflow.
- Real WebMCP discovery exposes all seven tools; the full preview → blocked commit → human click → commit → undo loop passes.
- The 65-second walkthrough passes HyperFrames runtime, WCAG contrast, console, and 15-sample layout validation with zero errors.
- GitHub Pages renders the MP4 with pinned HyperFrames 0.8.27 and FFmpeg, then publishes it with the tested app.
- Public deployment `33785590857` passed on commit `bce1cd4`; both the app and 19.7 MB MP4 returned HTTP 200.
- The deployed WebMCP smoke test passed search, comparison, a 20→22 counteroffer, pre-approval commit rejection, exact human approval, commit, undo, and reset.

## Two-sided trading extension (4 September 2026)

The participant clarified the goal: “trade agent-ready data with humans or agents by humans or agents.” The approved extension adds seller publishing and actual sample delivery, retaining a shared-browser simulation rather than claiming a networked marketplace.

- Added validated structured sample publication with source, exact license, seller-authorized minimum and manual/agent attribution.
- Added three WebMCP tools: publication, read-only offer inspection and read-only rented sample delivery, for ten total tools.
- Rental commit debits buyer and credits seller. Delivery returns JSON/CSV plus source/license/expiry manifest; denial is enforced before rental, after expiry and after undo.
- Undo preserves listings published after the latest rental. Publication invalidates pending approvals. Agent search synchronizes the visible search controls.
- Added publishing/search/details/download UI in the existing design system; replaced misleading verification labels with honest attribution.
- v2 persistence validates nested sample structures and retains old v1 storage untouched.
- Verification: 29 tests pass across five files; TypeScript/Vite production build passes.
- Browser proof: manually published four-row Laneway sample → WebMCP search/inspect/compare → 20→22 preview → blocked unapproved commit → page approval → WebMCP commit → four-row JSON/CSV delivery and seller +22.
- Download proof: JSON, CSV and license-manifest buttons created files on disk; JSON contains all four rows and manifest preserves the exact terms.
- Reverse-role proof: WebMCP published a two-row Beacon sample; a person using mobile controls bid 10, reviewed the 12-credit counteroffer, approved and committed. Buyer 88; seller +12.
- Revocation and persistence proof: refresh retained listing, access and proceeds; undo blocked subsequent delivery and preserved the later Beacon listing.
- Visual proof: 1280×800 and 360×800 reviewed against the existing concept and extension spec; direct browser measurements found no overflowing elements; no app console errors.
- Existing video is clearly marked as the earlier buyer-only text walkthrough. An updated live-use recording is still outstanding; the script is ready.
