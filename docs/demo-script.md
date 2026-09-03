# 60-second judged demo

| Time | Screen action | Narration |
| --- | --- | --- |
| 0–8s | Hold on the complete board and two power cards. | “Mission Deck turns invisible agent actions into a shared game board.” |
| 8–18s | Ask the agent to inspect and recommend. Activity records both calls; Forge glows. | “The agent reads the live page through WebMCP and recommends one of two powers.” |
| 18–31s | Ask for Forge on “Make actions tangible.” Hold on the exact preview. | “Forge proposes four executable actions, but the board has not changed. The person still decides.” |
| 31–39s | Approve Forge. New parchment action cards appear. | “Approval commits exactly the visible proposal. Focus now becomes the recommended power.” |
| 39–51s | Preview and approve Focus. The Focus well names the selected action. | “Focus chooses one highest-leverage next move through the same preview boundary.” |
| 51–60s | Undo. Hold on Activity and restored board. | “Every agent action is visible, attributable, and reversible. That is WebMCP as a game mechanic.” |

Prompt sequence:

1. `Inspect this board and recommend the best power. Do not change anything yet.`
2. `Preview Forge on “Make actions tangible.” Stop for approval.`
3. `Commit that exact preview.`
4. `Recommend the next power and preview Focus. Stop for approval.`
5. `Commit Focus, then undo the last play.`
