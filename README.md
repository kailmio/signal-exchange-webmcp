# Mission Deck

Mission Deck is a client-only WebMCP experiment where agent actions become visible, previewable, and reversible power cards on a shared mission board.

## Live demo

The durable public URL will be published with GitHub Pages from the `main` branch.

## Development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run test
npm run build
```

Full WebMCP setup, tool contracts, deployment, and AI-use notes will be completed with the implementation.

## WebMCP tools

- `inspect_mission_board`
- `list_card_powers`
- `preview_card_play`
- `commit_card_play`
- `undo_last_play`
- `load_demo_mission`

WebMCP is registered through the experimental `document.modelContext.registerTool()` API. Use ChatGPT’s in-app browser for the supported judged path; unsupported browsers display a truthful manual demo mode.

## AI use and inspiration

Codex and Hermes Agent supported product planning, independent PRD review, implementation, testing, and submission preparation. All transformations in the running app are deterministic local functions; the app does not call a model API. The GPL-licensed Card Master browser extension informed the visible-card interaction metaphor only—no source code or visual asset was copied.
