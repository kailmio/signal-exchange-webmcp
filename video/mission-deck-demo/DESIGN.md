# Mission Deck Video Design

## Overview

Mission Deck uses a near-black, single-canvas interface split between a spacious mission board and a narrow activity rail. Thin borders, precise spacing, and large tactile power cards keep it utilitarian while the amber, cyan, and violet accents add controlled drama. The visual identity should feel like a trusted mission-control surface crossed with a premium tabletop deck, never a generic AI dashboard.

## Colors

- **Primary Canvas**: `#070C10` — full-frame background.
- **Header Surface**: `#080D11` — quiet navigation band.
- **Raised Surface**: `#151E24` — preview and callout panels.
- **Primary Text**: `#F2F2ED` — headings and core labels.
- **Muted Text**: `#9AA4AA` — descriptions and secondary copy.
- **Quiet Text**: `#69757C` — disabled and timestamp detail.
- **Forge Amber**: `#F3A237` — action-making power and first recommendation.
- **Focus Cyan**: `#27B9EF` — prioritization power.
- **Wild Violet**: `#9B65EE` — surprise and hero reveal.
- **Agent Ready**: `#17C968` — live WebMCP connection.
- **Error Coral**: `#EF6B68` — rejected or unsafe action.

## Typography

- **Display**: Arial Narrow (700/800), with `Arial` as fallback. Use for power names, section labels, and compact uppercase typography with 0.08–0.18em tracking.
- **Interface**: Inter (400/520/550/560/600), with `Arial` as fallback. Use for narration cards, tool names, and supporting detail.
- Hero statements: 88–116px, compact leading, maximum two lines.
- Power names: 72–96px uppercase. Body copy: 24–34px. Labels: never below 18px in video.

## Elevation

Depth comes from one-pixel blue-gray borders (`#334048`), localized colored bloom, card rotation, and layered radial glows rather than broad drop shadows or full-screen gradients. Raised panels use `#151E24` over `#070C10`; card faces use a subtle surface texture and edge highlight. Foreground annotations may cast a soft black shadow, but the frame should remain crisp and low-gloss.

## Components

- **Mission Canvas**: the captured wide product screenshot framed as the source-of-truth interface.
- **Power Hand**: Forge, Focus, and Wild cards with distinct emblems, colors, fan angles, and recommendation labels.
- **Agent Status Pill**: green dot plus `Agent ready`, used as recurring proof of the live connection.
- **Tool Trace**: monospaced-ish stacked chips naming inspect, list, preview, commit, and undo calls.
- **Exact Preview Panel**: raised violet panel with `Nothing has changed yet`, outcome, rationale, and approval boundary.
- **Activity Spine**: thin vertical line and attributed WebMCP events ending at Undo.
- **Consent Stamp**: compact `PREVIEW ONLY`, `APPROVED`, or `RESTORED` label used as a foreground proof cue.

## Do's and Don'ts

### Do's

- Keep the product UI visible as evidence in the opening and closing beats.
- Use amber → cyan → violet as the story's progression.
- Favor precise path drawing, deterministic card movement, and tool-call typing.
- Use thin borders, generous negative space, and one dominant message per beat.
- Preserve the visual distinction between preview and committed state.

### Don'ts

- Do not use generic blue/purple AI gradients, robot imagery, or chat bubbles.
- Do not invent unsupported product features or claim the app calls a model API.
- Do not use random particles, rainbow color cycling, or infinite animation loops.
- Do not cover evidence with decorative overlays.
- Do not let text fall below 18px or rely on color alone to communicate state.
