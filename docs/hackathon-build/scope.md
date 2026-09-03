# Mission Deck Scope

Build a self-contained WebMCP planning game where a person and agent share one visible mission board. The product deliberately has only two powers:

- **Forge** transforms one selected idea into four clear actions with completion checks.
- **Focus** selects one available action as the highest-leverage next move.

Both powers use the same safe loop: inspect → recommend → preview → human approval → exact commit → optional undo. The preview is non-mutating, revision-bound, expiring, and single-use.

The experience must feel like an arcane fantasy tabletop while remaining readable and judgeable. The desktop target is 1280×800 and mobile target is 360×800. WebMCP and manual input share one command layer. No backend, account, arbitrary model output, or third power is in scope.
