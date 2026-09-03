# Mission Deck Walkthrough

This instructional Mission Deck demo demonstrates the literal two-power operating sequence: choose an idea, play Forge, review and approve the exact preview, use Focus, ask an agent through WebMCP, inspect Activity, and undo.

## Preview

From the repository root:

```bash
npx hyperframes preview video/mission-deck-walkthrough --port 3018
```

Then open `http://localhost:3018/#project/mission-deck-walkthrough`.

## Verify

```bash
npx hyperframes lint video/mission-deck-walkthrough
npx hyperframes check video/mission-deck-walkthrough --json
npx hyperframes snapshot video/mission-deck-walkthrough --at 8,17,27,38,46,54,63
```

## Render

```bash
npx hyperframes render video/mission-deck-walkthrough --output video/mission-deck-walkthrough/renders/mission-deck-walkthrough.mp4 --quality standard
```
