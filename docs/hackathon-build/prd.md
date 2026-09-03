# Mission Deck Product Requirements

## Product promise

Mission Deck makes agent action tangible. A person sees a mission, idea cards, a Focus well, two power cards, an exact preview, and an attributed Activity chronicle on one board.

## Requirements

1. The board exposes exactly Forge and Focus.
2. An agent can inspect current committed state and receive a contextual recommendation without mutation.
3. Forge requires an open idea and proposes four deterministic action cards.
4. Focus requires action cards and proposes exactly one focused action, optionally honoring an explicit action target.
5. Every play renders an exact preview and requires its active token for commit.
6. Stale, expired, replayed, missing, or mismatched tokens fail without mutation.
7. One-level Undo restores the board before the latest commit.
8. Manual controls and WebMCP tools produce equivalent committed boards.
9. The initial board fits 1280×800; the complete experience remains operable at 360px.
10. Unsupported WebMCP and unavailable storage degrade honestly without blocking manual use.

## Experience

The visual language is an arcane observatory: parchment mission cards, midnight surfaces, antique brass, amber Forge, cyan Focus, restrained constellations, and physical card motion. Drama must strengthen hierarchy and approval—not obscure state or add random mechanics.

## Success proof

A judge can ask an agent to inspect and recommend, preview Forge, approve its exact proposal, observe Focus become recommended, preview/approve Focus, and undo—all with visible page changes and Activity evidence in under 60 seconds.
