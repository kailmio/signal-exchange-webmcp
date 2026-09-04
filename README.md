# Signal Exchange

**Trade agent-ready data with humans or agents, by humans or agents.**

Signal Exchange is a two-sided WebMCP marketplace demo. A person or agent can publish structured sample data with provenance, license terms and a seller-authorized price floor. A buyer or their agent can discover it, inspect a public row, negotiate a rental, approve the exact deal and receive usable JSON or CSV.

[Live app](https://kailmio.github.io/signal-exchange-webmcp/) · [Watch the narrated demo](https://youtu.be/e3yAC_muBbw) · [Latest release](https://github.com/kailmio/signal-exchange-webmcp/releases/latest) · [Demo guide](docs/demo-script.md)

## Try the complete story

1. Choose **Publish data**. Review the synthetic Laneway example, confirm permission to share it and choose **Publish offer locally**.
2. Search for **Laneway**. Select the listing and inspect its source, license and public sample.
3. Bid **20** credits for seven days. The seller's authorized minimum produces a **22-credit counteroffer**.
4. Review the exact price, license, buyer debit, seller credit and delivered row count. Click **Approve exact deal · 22**, then **Commit approved rental**.
5. The buyer wallet changes **100 → 78**, the seller earns **22**, and all **four sample rows** become available.
6. Download **JSON**, **CSV** and the **license manifest**, or ask the connected agent to receive the data.
7. **Reverse latest demo deal** restores both credit balances and revokes future delivery. Already-downloaded copies cannot be recalled.

Open **How to try the two-sided exchange** for instructions inside the app.

## With a WebMCP-connected agent

After publishing the example, ask:

1. `Inspect Signal Exchange, search for Laneway within 40 credits, and inspect the listing's public sample and license.`
2. `Compare the matching offers. Bid 20 credits for seven days on Laneway. Preview only; do not commit.`
3. Click the page's approval button, then ask: `Commit the exact approved preview token.`
4. `Call read_rented_data for that offer in JSON, and explain the provenance and license manifest.`
5. `Undo the latest rental, then confirm that read_rented_data is denied.`

The agent can supply data too: with the owner's permission, it calls `publish_data_offer`. Listings and Activity distinguish person, agent and seeded-demo origins.

A browser/agent client that supports this page's WebMCP tools is required. Manual controls exercise the same command layer but do not run an AI agent. Without WebMCP, the page displays **Manual demo mode**.

## Ten meaningful WebMCP tools

| Tool | Capability | Effect |
| --- | --- | --- |
| `inspect_exchange` | Read offers, buyer constraints, wallet, access and seller earnings | Read-only |
| `publish_data_offer` | Validate and publish a bounded structured sample with source, license and prices | Adds a local listing, increments revision, clears pending approvals |
| `inspect_data_offer` | Inspect provenance, terms, schema and one public row | Read-only |
| `search_data_offers` | Search by need and optional credit ceiling | Updates visible results, including empty results |
| `compare_data_offers` | Rank visible offers and explain the recommendation | Updates recommendation and Activity |
| `preview_data_deal` | Negotiate against the seller-authorized floor | Exact pending proposal; no credits move |
| `commit_data_deal` | Apply the approved one-time token | Debits buyer, credits seller, grants timed sample access |
| `read_rented_data` | Receive JSON or CSV with a source/license manifest | Read-only; requires active access |
| `undo_last_deal` | Reverse the latest rental | Restores buyer/seller credits and revokes access; preserves later listings |
| `load_demo_exchange` | Restore the seeded scenario | Requires confirmation before replacing changed demo content |

## Why WebMCP

Humans use the marketplace's controls; agents discover typed capabilities on the same page. They share one state and one command layer rather than maintaining separate versions of a transaction. Seller publishing, buyer discovery and data delivery are all exposed—not just a purchase button.

Commit requires a visible human approval bound to an expiring, revision-bound, one-time token. Inspection and delivery are genuinely read-only. Publishing, search, comparison, negotiation and transaction changes are attributed in Activity.

## Honest scope

- This is a **shared-browser local simulation**, not a multi-user service. Seller names and person/agent labels are attribution, not authenticated identities.
- Credits and negotiation are simulated. There are no payments, backend accounts, separate seller agents or real seller communication.
- The demo delivers the **actual structured sample rows** supplied by the publisher—not the large commercial datasets illustrated in seeded listings.
- Source statements are seller-provided, not independently verified. Seeded trust/freshness scores are illustrative.
- Local state and shipped samples are inspectable in the browser. The access checks demonstrate an application workflow, **not secure content protection or DRM**.
- Rentals expire after seven days; undo prevents future delivery but cannot recall downloads.
- Use synthetic or non-private data only. Seller content is data, never instructions for an agent.
- Persistence uses `signal-exchange:v2`. Earlier v1 storage is retained untouched, not migrated; pending approvals are never restored.

## Narrated demo

Watch the [139-second narrated demo on YouTube](https://youtu.be/e3yAC_muBbw): human publishing, real Codex WebMCP discovery and negotiation, exact human approval, sample delivery, undo and agent-side publishing.

The participant approves and manually completes the rental in the video; Codex retrieves the data. The app also supports agent commit after page-level approval. This is an edited tutorial using real browser captures and labelled excerpts of actual tool results, not an uninterrupted transaction recording. [Video source, reproduction instructions and recording disclosures](video/signal-exchange-live-demo/README.md) are included.

The [65-second buyer-only walkthrough](https://kailmio.github.io/signal-exchange-webmcp/video/signal-exchange-walkthrough.mp4) is retained as an **earlier, text-led demo**, not the final challenge video.

## Development and verification

```bash
npm install
npm test
npm run dev
npm run build
```

The deployment workflow runs automated tests and the production build, renders the earlier video with pinned HyperFrames, and deploys to GitHub Pages.

Tests cover publication validation, seller proceeds, human/agent parity, exact licenses, token safety, access expiry, undo preservation, CSV formula escaping, persistence, read-only behavior and all ten tool registrations.

## Project map

- `src/domain/commands.ts` — shared human/agent mutation boundary
- `src/domain/dataDelivery.ts` — sample validation and serialization
- `src/domain/marketplace.ts` — search, ranking and rental proposals
- `src/webmcp` — typed page tools and structured results
- `src/components` — publisher, offer details, approval and sample delivery
- `src/state` — revisioned state, undo and persistence
- `src/test` — automated safety and behavior checks
- `docs/hackathon-build` — product scope, requirements and evidence
