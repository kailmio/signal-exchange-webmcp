# Signal Exchange Two-Sided Demo Script

The final [139.4-second narrated demo is public on YouTube](https://youtu.be/e3yAC_muBbw). It demonstrates the two-sided workflow through real browser captures and Codex WebMCP calls. [Source, exact narration and recording disclosures](../video/signal-exchange-live-demo/README.md) are available in the repository.

## Published video chapters

- 00:00 — Problem and marketplace.
- 00:13 — Human publishing controls.
- 00:30 — Agent discovery and inspection.
- 00:47 — Negotiation preview without spending.
- 01:04 — Participant approval and manual completion.
- 01:21 — Actual sample delivery.
- 01:41 — Undo and agent-side publishing.
- 01:58 — WebMCP implementation and limits.

The participant approved and manually committed in the recorded take, then Codex received the data through WebMCP. Equivalent Laneway examples were used in two tabs; the edit is not one continuous transaction. The exact approval click fell between capture segments; real before/after states and the manual commit transition are shown. These details differ from the original agent-commit recording plan below.

## Original recording plan and repeatable agent-commit path

The following 90–120-second plan is retained as a rehearsal guide, not as the timeline or transcript of the finished video. Both manual and agent commit require the same page-level human approval.

| Time | Actual screen action | Explanation |
| --- | --- | --- |
| 0–10s | Show “Human or agent, either side” and the visible demo boundary. | “Signal Exchange lets people and agents supply and acquire agent-ready data.” |
| 10–28s | Open Publish data, show the synthetic Laneway rows, source, license and seller minimum. Confirm and publish. | “I am the supplier. My offer includes usable data and clear terms—not just a listing description.” |
| 28–43s | Agent searches Laneway, inspects the public sample and compares. | “The buyer's agent discovers my new offer through WebMCP and reads its schema and license.” |
| 43–60s | Agent bids 20. Show the 22-credit counteroffer and exact license. | “The seller-authorized minimum produces a counteroffer. No credits move yet.” |
| 60–75s | Person clicks approval; agent commits. Show buyer 78 and seller +22. | “The owner approves the exact deal. Both sides update in the same page.” |
| 75–95s | Agent calls read_rented_data. Download JSON/CSV and manifest; open a sample file. | “The buyer now receives actual structured sample rows, with source and permitted use attached.” |
| 95–110s | Undo, then attempt read_rented_data and show denial. | “Undo reverses the simulated credits and revokes future delivery. It cannot recall downloaded copies.” |
| 110–120s | Show agent-published label or mention the reverse path. | “Either side can use page controls or an authorized agent. This build is a local demo—not live payments or authenticated multi-user trading.” |

## Exact prompts

1. After manually publishing: `Inspect this exchange. Search for Laneway within 40 credits and inspect its public sample, source and license.`
2. `Compare the matching offers. Preview a seven-day Laneway rental with a 20-credit bid. Do not commit.`
3. Click **Approve exact deal · 22**, then: `Commit the exact approved preview token.`
4. `Read the rented sample as JSON with read_rented_data. Explain the schema, source and permitted use.`
5. `Undo the rental, then try reading it again to verify revocation.`

For the reverse path, authorize the agent to publish a synthetic two-row listing through `publish_data_offer`, with title, seller, source, terms, prices and confirmation. Then rent it manually.

## Constraints for future recordings

Keep the real tool conversation and page visible together. Do not simulate agent output in editing. State that credits, counterparty identity and negotiation are local simulation. Sample file delivery is real, but no commercial dataset was procured. Clearly show the human click. Do not claim secure content protection or recall of downloaded data.
