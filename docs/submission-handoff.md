# Signal Exchange Submission Handoff

## Pitch

Trade agent-ready data with humans or agents, by humans or agents.

## Specific problem

Data suppliers need to make structured samples understandable and usable to agents. Data buyers need to inspect source, license, schema and price before allowing a transaction. A normal listing alone does not provide the whole supply-to-delivery workflow.

## Demonstrated solution

A contributor publishes a synthetic Sydney foot-traffic sample. A buyer's agent discovers the new listing through WebMCP, inspects a public row, negotiates against the seller-authorized minimum and pauses for exact human approval. Commit debits the buyer, credits the seller and enables JSON/CSV sample receipt with a manifest. Undo restores credits and revokes future delivery while preserving later listings.

Both roles can use the page or WebMCP; ten tools share one typed command layer.

## Links

- App: https://kailmio.github.io/signal-exchange-webmcp/
- Repository: https://github.com/kailmio/signal-exchange-webmcp
- Earlier buyer-only video: https://kailmio.github.io/signal-exchange-webmcp/video/signal-exchange-walkthrough.mp4
- Updated recording script: docs/demo-script.md

## Scope that must remain explicit

One shared-browser local simulation. No real payments, verified identities, networked marketplace, independent provenance validation or secure content protection. Samples are actual JSON/CSV exports, not full commercial datasets. Human approval is required in this demo; delegated automatic approval is not implemented. Downloaded copies cannot be revoked.

The existing video does not yet show the two-sided feature set. Record the updated live-use demonstration before submission.
