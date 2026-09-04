# Signal Exchange Walkthrough

A 65-second, earlier buyer-only walkthrough of the Signal Exchange WebMCP loop.

This video predates v1.1.0. It does not demonstrate seller publishing, seller proceeds or JSON/CSV sample downloads. The updated two-sided recording script is in `docs/demo-script.md`; a new live-use recording remains to be produced.

The current composition is text-led because the preferred local neural TTS dependency was unavailable during the deadline build. Every required explanation is present on screen, including the problem, tool calls, recommendation evidence, 20→22 counteroffer, UI-bound human approval, 100→78 wallet change, unlocked schema, Activity attribution, and undo.

## Preview and validation

Run with the locally available HyperFrames CLI:

```powershell
npx hyperframes lint video/signal-exchange-walkthrough
npx hyperframes validate video/signal-exchange-walkthrough
npx hyperframes inspect video/signal-exchange-walkthrough --samples 15
npx hyperframes preview video/signal-exchange-walkthrough --port 3027
```

Studio URL: `http://localhost:3027/#project/signal-exchange-walkthrough`

The deployment workflow renders the submission artifact to `dist/video/signal-exchange-walkthrough.mp4` and publishes it at:

https://kailmio.github.io/signal-exchange-webmcp/video/signal-exchange-walkthrough.mp4
