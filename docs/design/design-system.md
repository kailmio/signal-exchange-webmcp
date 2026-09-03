# Mission Deck Design System

## Canonical concept

`mission-deck-arcane-two-power-concept.png` is the accepted visual direction. `mission-deck-arcane-implementation-1280x800.png` and `mission-deck-arcane-implementation-360x800.png` are the current implementation proofs.

## Direction

- Arcane observatory and tabletop atmosphere: midnight blue-black, antique brass, faint constellations, and restrained runic geometry.
- A readable game board, not a decorative fantasy poster. Mission state, approval state, and Activity remain immediate.
- Three parchment idea cards lead into a dark engraved Focus well.
- Exactly two oversized power cards form the central hand: amber Forge and cyan Focus.
- Drama comes from scale, material, light, hover lift, preview reveal, and commit motion.

## Tokens

- Background `#040a10`; raised surface `#10202a`.
- Parchment `#d9c8a7`; parchment highlight `#eadfc7`; ink `#201a13`.
- Antique brass `#c99748`; bright brass `#efc46d`.
- Forge `#f2a33b`; Focus `#6bc8e8`; ready `#65d49a`; error `#e8756d`.
- Display typography uses Georgia/Times for the engraved fantasy tone; supporting UI uses the system sans stack.
- Motion runs 180–680ms and is disabled by the reduced-motion override.

## Component rules

- The page remains an open canvas with board left and a narrow Activity chronicle right.
- Parchment cards use dark ink, inset frames, circular emblems, and clear status labels.
- Power cards share one ornate geometry and differ through emblem, accent color, availability, and recommendation state.
- Preview occupies the board’s right well and never obscures the committed cards.
- Original inline SVGs use consistent strokes and `currentColor`.
- No third power, random mechanic, extra dashboard widgets, or novelty statistics.

## Responsive continuation

- At 1280×800 the complete initial board and both powers fit without page scroll.
- Under 840px Activity moves below the board.
- At 360px mission cards remain horizontally swipeable and Forge/Focus become stacked full-width invocations.
