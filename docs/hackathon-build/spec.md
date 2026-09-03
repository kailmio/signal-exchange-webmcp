# Mission Deck Technical Specification

## Stack

React 19, TypeScript, Vite, Vitest, native `document.modelContext.registerTool`, original CSS, and inline SVG. There is no server runtime.

## Domain model

`PowerId` is the closed union `forge | focus`. `BoardContent` stores mission metadata, cards, and `focusedCardId`; it contains no random draw state. Pure functions compute availability, recommendations, and complete proposed boards.

## Commands

The shared command service owns inspect, list, preview, commit, undo, reset, and custom-mission behavior. A preview stores its proposed board in memory, binds to the current revision, expires after five minutes, and is never persisted. Commit applies only that object once.

## WebMCP

Six tools mirror the visible product: `inspect_mission_board`, `list_card_powers`, `preview_card_play`, `commit_card_play`, `undo_last_play`, and `load_demo_mission`. The preview schema enum is limited to `forge` and `focus`. Inspect is strictly side-effect-free and carries the read-only annotation; recommendation intentionally updates the visible page and is not labeled read-only. Every result includes structured content alongside its readable JSON text.

## Persistence

Only committed board, one undo snapshot, and recent Activity persist under the version-two storage key. Older state is ignored so removed mechanics cannot reappear from local storage.

## UI and responsive behavior

At 1280×800 the board uses a fixed header, flexible board stage, 303px power table, and 278px Activity rail. At 360px the board becomes a vertical document; mission cards swipe horizontally, Forge/Focus stack, and Activity follows. Reduced motion collapses every animation.

## Verification

- Pure engine and command safety tests.
- Strict TypeScript production build.
- In-app browser WebMCP discovery and full two-power agent loop.
- 1280×800 and 360×800 visual inspection.
