# Mission Deck Design System

## Accepted Concepts

- `mission-deck-ready-concept.png` — canonical 1536×1024 ready-state composition, implemented at a 1280×800 CSS-pixel target.

## Visual Direction

- True near-black mission-control canvas; no warm neutral shift.
- Open asymmetric layout: main board at roughly 72%, activity rail at 28%, separated by a hairline.
- Three restrained idea cards above a dramatic, tactile three-card power hand.
- Power identity is carried by border geometry, emblem, color, and physical posture—not glow or decorative particles.
- Preview occupies a precise integrated panel beside the board while committed content remains unchanged.

## Tokens

- Background: `#070c10`
- Header: `#080d11`
- Surface: `#11181d`
- Raised surface: `#151e24`
- Border: `#334048`
- Text: `#f2f2ed`
- Muted text: `#9aa4aa`
- Forge: `#f3a237`
- Focus: `#27b9ef`
- Ready: `#17c968`
- Error: `#ef6b68`
- Radius: 10px for controls/cards; 14px for power cards.
- Motion: 160–420ms, physical lift/reveal only, disabled under reduced motion.

## Typography

- Display/power: narrow grotesk stack, 700 weight, uppercase, tracked.
- Mission heading: condensed display, 700 weight, tight line-height.
- Body: neutral system sans, 400–500 weight.
- UI labels: 12–13px, 600 weight, modest uppercase tracking.
- Control text is always explicitly styled; no browser-default typography.

## Container And Component Rules

- The page is the canvas; do not wrap the whole product in a rounded shell.
- Header and activity use hairline separators.
- Idea cards share one quiet family with a top emblem, title, description, divider, and plain status.
- Power cards share one larger family with an emblem, effect, and state treatment; Forge and Focus are amber/cyan variants.
- Avoid additional card grids, pills, fake metrics, side navigation, glass effects, neon grids, and decorative gradients.
- Icons are original inline SVG components with consistent 1.6px strokes and `currentColor`.

## Allowed First-Viewport Copy

- MISSION DECK
- Agent ready / Checking agent connection / Manual demo mode
- New mission
- Reset
- Turn a rough concept into a launch-ready WebMCP demo
- Ask your agent to inspect the board, then review and approve a card play.
- Make actions tangible
- Turn abstract steps into clear, visible outcomes.
- Create a memorable reveal
- Deliver a moment that clicks and sticks.
- Keep the human in control
- Ensure humans guide, approve, and stay in charge.
- Open
- FOCUS
- No action focused yet
- FORGE / Turn one idea into clear actions
- FOCUS / Choose the highest-leverage next move
- Recommended
- ACTIVITY
- Board ready
- Sample mission loaded
- Waiting for your agent
- Undo

## Preview-State Copy

- Exact preview
- Nothing has changed yet
- OUTCOME
- Reverse the assumption
- Design for first-time users, not agent experts.
- AFFECTED
- CHANGE PREVIEW
- BEFORE / AFTER
- Approve play
- Cancel
- Preview expires in 5 minutes
- WebMCP · Preview Forge

## Responsive Continuation

- At 1280×800: fixed header, board and activity rail share remaining height; no page scroll.
- Under 900px: activity becomes a compact bottom section and the power hand scales down.
- At 360px: header actions compact, content stacks mission → ideas → focus → powers → preview → activity; horizontal overflow is prohibited.

## Icon Inventory

- Product mark: two interlocked angular cards/diamonds.
- Status: solid dot plus text.
- Idea emblems: lightbulb, spark, person/control.
- Focus empty state: crosshair.
- Forge: angular anvil/spark.
- Focus power: aperture/target.
- Activity: check, document, clock, target.
- Undo: curved back arrow.

## Concept Acceptance

Accepted autonomously under the participant’s delegated visual authority. The implementation must match the concepts’ hierarchy, palette, density, geometry, and open-canvas container model; generated mockup text remains code-native in the app.
