# Signal Exchange Two-Sided Demo Script

Target: 90–120 seconds of actual app and agent use, not a text-only introduction. This script is updated; the published 65-second video is still the earlier buyer-only version.

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

## Recording constraints

Keep the real tool conversation and page visible together. Do not simulate agent output in editing. State that credits, counterparty identity and negotiation are local simulation. Sample file delivery is real, but no commercial dataset was procured. Clearly show the human click. Do not claim secure content protection or recall of downloaded data.
