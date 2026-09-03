# Visual Fidelity Ledger

Reference: `mission-deck-arcane-two-power-concept.png`

Implementation: `mission-deck-arcane-implementation-1280x800.png`

Verification: 1280×800 desktop and 360×800 mobile.

| Comparison point | Reference intent | Implemented result | Status |
| --- | --- | --- | --- |
| Composition | Open arcane board with Activity rail and a dramatic two-card hand. | Board/rail split, three idea cards, Focus well, and two centered powers preserve the composition. | Faithful |
| Power hierarchy | Forge and Focus are the dominant choice; no third power. | Two 318px engraved cards occupy the full lower stage and expose recommendation/availability. | Faithful |
| Material | Parchment, antique brass, blue-black stone, and subtle celestial marks. | Layered CSS gradients, noise, inset frames, brass rules, and constellation points reproduce the material language. | Faithful |
| Typography | Classical fantasy display text with compact readable support copy. | Georgia/Times display and system sans support retain the hierarchy without an external font dependency. | Faithful adaptation |
| Mission cards | Three bright parchment cards anchor the mission state. | Selectable cards preserve title, detail, status, hover, Forge target, and action-card continuation. | Faithful |
| Focus well | A dark engraved target balances the parchment row. | Cyan target emblem, clipped corners, dashed inner frame, and focused-action state match the role. | Faithful |
| Activity rail | An ornate vertical chronicle makes agent actions visible. | Attributed events, power-aware icons, timestamps, and anchored Undo retain the same rhythm. | Faithful |
| Responsive behavior | Fantasy styling survives a narrow phone layout. | At 360px cards swipe horizontally, powers stack legibly, and Activity follows without horizontal page overflow. | Faithful adaptation |

## Above-fold copy diff

The mission title, instruction, three idea cards, Focus state, Forge/Focus names and effects, recommendation, Activity, initial events, and Undo match the concept. The implementation adds truthful operational status: `Manual demo mode` appears only when WebMCP is unavailable, while the in-app browser displays `Agent ready`. `CURRENT MISSION` and `CHOOSE YOUR POWER` were retained as compact game-board wayfinding.

## Accepted deviations

- The concept uses denser hand-drawn ornament. The implementation uses lighter original CSS/SVG ornament to protect clarity and performance.
- The concept’s larger 16:10 canvas was tightened to the strict 1280×800 judged viewport.
- The Activity icons use the action’s real power or command state instead of illustrative symbols.

No material fixable mismatch remains in the initial desktop or mobile board.
