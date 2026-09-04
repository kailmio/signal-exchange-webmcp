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
- Final narrated public YouTube demo (139.4 seconds): https://youtu.be/e3yAC_muBbw
- Updated recording script: docs/demo-script.md

## Scope that must remain explicit

One shared-browser local simulation. No real payments, verified identities, networked marketplace, independent provenance validation or secure content protection. Samples are actual JSON/CSV exports, not full commercial datasets. Human approval is required in this demo; delegated automatic approval is not implemented. Downloaded copies cannot be revoked.

The final video shows the two-sided flow with real browser captures and WebMCP calls. It is an edited tutorial; the participant approved and manually committed, and Codex retrieved the data. Full recording provenance is in `video/signal-exchange-live-demo/README.md`.

Use the final YouTube URL above for the challenge entry, not the earlier buyer-only MP4. Publishing the repository or video does not itself submit a Devpost entry; completion must be verified separately on Devpost.
